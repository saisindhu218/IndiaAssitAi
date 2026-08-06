import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import {
  getUserProfile,
  saveUserProfile,
  getUserDocuments,
  addUserDocument,
  renameUserDocument,
  deleteUserDocument,
} from "../firebase/firestore";
import { uploadUserDocument, deleteUserDocumentFile, openUserDocument } from "../storage/documentStorage";

const EMPTY_PROFILE = { name: "", age: "", state: "", occupation: "", isSeniorCitizen: false };

function DetailRow({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value || "Not set"}</Text>
    </View>
  );
}

function IconButton({ name, onPress, color = "#555" }) {
  return (
    <TouchableOpacity style={styles.iconBtn} onPress={onPress} hitSlop={8}>
      <Ionicons name={name} size={18} color={color} />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const user = auth.currentUser;

  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [draft, setDraft] = useState(EMPTY_PROFILE);
  const [editVisible, setEditVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false); // false | true | "add"

  const [documents, setDocuments] = useState([]);
  const [docsLoading, setDocsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [pendingName, setPendingName] = useState("");
  const [renameTarget, setRenameTarget] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const loadProfile = useCallback(async () => {
    if (!user) return;
    const p = await getUserProfile(user.uid);
    if (p) setProfile({ ...EMPTY_PROFILE, ...p });
    if (!p) setEditVisible(true); // no profile yet -- go straight to the edit form
    setLoading(false);
  }, [user]);

  const loadDocuments = useCallback(async () => {
    if (!user) return;
    setDocsLoading(true);
    setDocuments(await getUserDocuments(user.uid));
    setDocsLoading(false);
  }, [user]);

  useEffect(() => {
    loadProfile();
    loadDocuments();
  }, [loadProfile, loadDocuments]);

  function openEdit() {
    setDraft(profile);
    setMenuVisible(false);
    setEditVisible(true);
  }

  async function handleSaveProfile() {
    if (!user) return;
    setSaving(true);
    try {
      await saveUserProfile(user.uid, draft);
      setProfile(draft);
      setEditVisible(false);
    } catch (e) {
      Alert.alert("Couldn't save", e.message);
    } finally {
      setSaving(false);
    }
  }

  // ---- Document Locker ----

  async function pickPhoto() {
    setMenuVisible(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (result.canceled) return;
    const asset = result.assets[0];
    setPendingFile({ uri: asset.uri, fileType: "image" });
    setPendingName(asset.fileName || `Photo ${new Date().toLocaleDateString()}`);
  }

  async function pickDocument() {
    setMenuVisible(false);
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/*"],
      copyToCacheDirectory: true,
    });
    if (result.canceled) return;
    const asset = result.assets[0];
    setPendingFile({ uri: asset.uri, fileType: asset.mimeType?.includes("pdf") ? "pdf" : "image" });
    setPendingName(asset.name || "Document");
  }

  async function confirmUpload() {
    if (!user || !pendingFile || !pendingName.trim()) return;
    setUploading(true);
    try {
      const { url, storagePath } = await uploadUserDocument(user.uid, pendingFile.uri, pendingName.trim());
      await addUserDocument(user.uid, {
        name: pendingName.trim(),
        url,
        storagePath,
        fileType: pendingFile.fileType,
      });
      setPendingFile(null);
      setPendingName("");
      await loadDocuments();
    } catch (e) {
      Alert.alert("Upload failed", e.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleDeleteDocument(item) {
    Alert.alert("Delete document?", `"${item.name}" will be permanently removed.`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteUserDocumentFile(item.storagePath);
          await deleteUserDocument(user.uid, item.id);
          setDocuments((prev) => prev.filter((d) => d.id !== item.id));
        },
      },
    ]);
  }

  async function confirmRename() {
    if (!renameTarget || !renameValue.trim()) return;
    await renameUserDocument(user.uid, renameTarget.id, renameValue.trim());
    setDocuments((prev) =>
      prev.map((d) => (d.id === renameTarget.id ? { ...d, name: renameValue.trim() } : d))
    );
    setRenameTarget(null);
    setRenameValue("");
  }

  async function handleOpenDocument(item) {
    try {
      await openUserDocument(item.url);
    } catch (e) {
      Alert.alert("Couldn't open", e.message);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="person-circle-outline" size={24} color="#111" style={{ marginRight: 6 }} />
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <TouchableOpacity onPress={() => setMenuVisible(true)} hitSlop={10}>
          <Ionicons name="ellipsis-vertical" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.email}>{user?.email || "Not signed in"}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your details</Text>
          <DetailRow label="Name" value={profile.name} />
          <DetailRow label="Age" value={profile.age} />
          <DetailRow label="State" value={profile.state} />
          <DetailRow label="Occupation" value={profile.occupation} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Senior citizen</Text>
            <Text style={styles.detailValue}>{profile.isSeniorCitizen ? "Yes" : "No"}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.headerLeft}>
              <Ionicons name="folder-open-outline" size={18} color="#111" style={{ marginRight: 6 }} />
              <Text style={styles.cardTitle}>Document Locker</Text>
            </View>
            <TouchableOpacity style={styles.addDocBtn} onPress={() => setMenuVisible("add")}>
              <Ionicons name="add" size={16} color="#fff" />
              <Text style={styles.addDocBtnText}>Add</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.lockerHint}>
            Store copies of documents you often need, as photos or PDFs. Rename them however makes
            sense to you, and open or re-share them anytime.
          </Text>

          {docsLoading ? (
            <ActivityIndicator style={{ marginTop: 10 }} />
          ) : documents.length === 0 ? (
            <Text style={styles.empty}>No documents saved yet.</Text>
          ) : (
            documents.map((item) => (
              <View key={item.id} style={styles.docRow}>
                <Ionicons
                  name={item.fileType === "pdf" ? "document-text-outline" : "image-outline"}
                  size={18}
                  color="#555"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.docName} numberOfLines={1}>
                  {item.name}
                </Text>
                <IconButton
                  name="create-outline"
                  onPress={() => {
                    setRenameTarget(item);
                    setRenameValue(item.name);
                  }}
                />
                <IconButton name="download-outline" onPress={() => handleOpenDocument(item)} />
                <IconButton name="trash-outline" color="#D33" onPress={() => handleDeleteDocument(item)} />
              </View>
            ))
          )}
        </View>

        <View style={styles.noticeBox}>
          <Ionicons name="information-circle-outline" size={18} color="#0B5FFF" />
          <Text style={styles.noticeText}>
            This stays private to your account. Avoid storing bare Aadhaar/PAN numbers as document
            names -- only the file itself needs to show that.
          </Text>
        </View>
      </ScrollView>

      {/* ⋮ account menu */}
      <Modal visible={menuVisible === true} transparent animationType="fade" onRequestClose={() => setMenuVisible(false)}>
        <TouchableOpacity style={styles.menuBackdrop} activeOpacity={1} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem} onPress={openEdit}>
              <Ionicons name="create-outline" size={18} color="#111" style={{ marginRight: 10 }} />
              <Text style={styles.menuItemText}>Edit Profile</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                signOut(auth);
              }}
            >
              <Ionicons name="log-out-outline" size={18} color="#D33" style={{ marginRight: 10 }} />
              <Text style={[styles.menuItemText, { color: "#D33" }]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* + Add document: choose source */}
      <Modal visible={menuVisible === "add"} transparent animationType="fade" onRequestClose={() => setMenuVisible(false)}>
        <TouchableOpacity style={styles.menuBackdrop} activeOpacity={1} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem} onPress={pickPhoto}>
              <Ionicons name="camera-outline" size={18} color="#111" style={{ marginRight: 10 }} />
              <Text style={styles.menuItemText}>Upload Photo</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                pickDocument();
              }}
            >
              <Ionicons name="document-outline" size={18} color="#111" style={{ marginRight: 10 }} />
              <Text style={styles.menuItemText}>Upload PDF / File</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Edit Profile -- its own modal, not inline on the page */}
      <Modal visible={editVisible} transparent animationType="slide" onRequestClose={() => setEditVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <Text style={styles.fieldLabel}>Name</Text>
            <TextInput style={styles.input} value={draft.name} onChangeText={(v) => setDraft((p) => ({ ...p, name: v }))} />

            <Text style={styles.fieldLabel}>Age</Text>
            <TextInput
              style={styles.input}
              value={draft.age}
              keyboardType="number-pad"
              onChangeText={(v) => setDraft((p) => ({ ...p, age: v.replace(/[^0-9]/g, "") }))}
            />

            <Text style={styles.fieldLabel}>State</Text>
            <TextInput style={styles.input} value={draft.state} onChangeText={(v) => setDraft((p) => ({ ...p, state: v }))} />

            <Text style={styles.fieldLabel}>Occupation</Text>
            <TextInput
              style={styles.input}
              value={draft.occupation}
              onChangeText={(v) => setDraft((p) => ({ ...p, occupation: v }))}
            />

            <View style={styles.switchRow}>
              <Text style={styles.fieldLabel}>Senior citizen</Text>
              <Switch
                value={draft.isSeniorCitizen}
                onValueChange={(v) => setDraft((p) => ({ ...p, isSeniorCitizen: v }))}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtnSmall} onPress={handleSaveProfile} disabled={saving}>
                <Text style={styles.saveBtnText}>{saving ? "Saving..." : "Save"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Name the file before uploading */}
      <Modal visible={!!pendingFile} transparent animationType="slide" onRequestClose={() => setPendingFile(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Name this document</Text>
            <TextInput
              style={styles.input}
              value={pendingName}
              onChangeText={setPendingName}
              placeholder="e.g. Driving Licence (front)"
              autoFocus
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setPendingFile(null)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtnSmall} onPress={confirmUpload} disabled={uploading}>
                <Text style={styles.saveBtnText}>{uploading ? "Uploading..." : "Upload"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Rename an existing document */}
      <Modal visible={!!renameTarget} transparent animationType="slide" onRequestClose={() => setRenameTarget(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Rename document</Text>
            <TextInput style={styles.input} value={renameValue} onChangeText={setRenameValue} autoFocus />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setRenameTarget(null)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtnSmall} onPress={confirmRename}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  headerTitle: { fontSize: 20, fontWeight: "700" },
  container: { padding: 20, paddingBottom: 60 },
  email: { fontSize: 14, color: "#333", marginBottom: 16 },
  card: { backgroundColor: "#F7F8FA", borderRadius: 14, padding: 16, marginBottom: 16 },
  cardHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardTitle: { fontSize: 15, fontWeight: "700", marginBottom: 8 },
  addDocBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B5FFF",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  addDocBtnText: { color: "#fff", fontWeight: "700", fontSize: 12, marginLeft: 2 },
  lockerHint: { fontSize: 12, color: "#777", lineHeight: 17, marginBottom: 10 },
  detailRow: { paddingVertical: 8, borderTopWidth: 1, borderTopColor: "#eee" },
  detailLabel: { fontSize: 12, color: "#777", fontWeight: "600", marginBottom: 2 },
  detailValue: { fontSize: 15, color: "#111" },
  docRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#eee" },
  docName: { flex: 1, fontSize: 14, fontWeight: "600", color: "#111" },
  iconBtn: { paddingHorizontal: 6 },
  empty: { color: "#888", fontSize: 13, marginTop: 8 },
  noticeBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#EAF1FF",
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  noticeText: { flex: 1, fontSize: 12, color: "#334", lineHeight: 18 },
  menuBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.2)", justifyContent: "flex-start", alignItems: "flex-end" },
  menuCard: { marginTop: 60, marginRight: 16, backgroundColor: "#fff", borderRadius: 12, paddingVertical: 6, minWidth: 190, elevation: 4 },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingHorizontal: 16 },
  menuItemText: { fontSize: 15, fontWeight: "600", color: "#111" },
  menuDivider: { height: 1, backgroundColor: "#eee" },
  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  modalCard: { backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 16 },
  fieldLabel: { fontSize: 12, color: "#777", fontWeight: "600", marginBottom: 4, marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15 },
  switchRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 14 },
  modalActions: { flexDirection: "row", justifyContent: "flex-end", marginTop: 20, gap: 10 },
  cancelBtn: { paddingVertical: 12, paddingHorizontal: 16 },
  cancelBtnText: { color: "#666", fontWeight: "600" },
  saveBtnSmall: { backgroundColor: "#0B5FFF", borderRadius: 10, paddingVertical: 12, paddingHorizontal: 20 },
  saveBtnText: { color: "#fff", fontWeight: "700" },
});
