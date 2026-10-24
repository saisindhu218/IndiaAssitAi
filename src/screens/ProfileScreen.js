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
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { signOut, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../firebase/config";
import {
  getUserProfile,
  saveUserProfile,
  getUserDocuments,
  addUserDocument,
  renameUserDocument,
  deleteUserDocument,
  deleteAllUserData,
} from "../firebase/firestore";
import { uploadUserDocument, deleteUserDocumentFile, openUserDocument } from "../storage/documentStorage";
import { useTheme } from "../theme/ThemeContext";
import useKeyboardOverlap from "../hooks/useKeyboardOverlap";
import { cancelAllReminderNotifications } from "../notifications";

// Change this to the address people can write to for help or data requests.
const SUPPORT_EMAIL = "rssindhu48@gmail.com";

const EMPTY_PROFILE = { name: "", age: "", state: "", occupation: "", isSeniorCitizen: false };

function DetailRow({ label, value, styles }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value || "Not set"}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const { colors, mode, toggleTheme } = useTheme();
  const styles = getStyles(colors);
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
  const [actionsTarget, setActionsTarget] = useState(null); // doc whose ⋮ menu is open
  const [aboutVisible, setAboutVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { ref: kbRef, overlap, onLayout: onKbLayout } = useKeyboardOverlap();
  const [previewImage, setPreviewImage] = useState(null); // doc being shown full-screen

  const loadProfile = useCallback(async () => {
    if (!user) return;
    const p = await getUserProfile(user.uid);
    if (p) setProfile({ ...EMPTY_PROFILE, ...p });
    if (!p) setEditVisible(true);
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

  async function handleDeleteAccount() {
    if (!user) return;
    if (!deletePassword) {
      Alert.alert("Password needed", "Please enter your password to confirm.");
      return;
    }
    setDeleting(true);
    try {
      // Firebase requires a recent sign-in before an account can be deleted.
      await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, deletePassword));
      const docs = await getUserDocuments(user.uid);
      await Promise.all(docs.map((d) => deleteUserDocumentFile(d.storagePath)));
      await cancelAllReminderNotifications();
      await deleteAllUserData(user.uid);
      await deleteUser(user); // the app returns to the login screen automatically
      setDeleteVisible(false);
      setDeletePassword("");
    } catch (e) {
      const wrongPassword = e.code === "auth/wrong-password" || e.code === "auth/invalid-credential";
      Alert.alert(
        "Couldn't delete account",
        wrongPassword ? "That password isn't correct." : e.message
      );
    } finally {
      setDeleting(false);
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

  async function handleShareDocument(item) {
    try {
      await openUserDocument(item.url);
    } catch (e) {
      Alert.alert("Couldn't open", e.message);
    }
  }

  // Tapping a document now directly shows it -- images open full-screen in
  // the app; PDFs still go through the share sheet since a real in-app PDF
  // renderer would need a new native dependency (see chat for why that's
  // deliberately not added right now).
  function handleViewDocument(item) {
    if (item.fileType === "image") {
      setPreviewImage(item);
    } else {
      handleShareDocument(item);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="person-circle-outline" size={24} color={colors.text} style={{ marginRight: 6 }} />
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <TouchableOpacity onPress={() => setMenuVisible(true)} hitSlop={10}>
          <Ionicons name="ellipsis-vertical" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.email}>{user?.email || "Not signed in"}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your details</Text>
          <DetailRow label="Name" value={profile.name} styles={styles} />
          <DetailRow label="Age" value={profile.age} styles={styles} />
          <DetailRow label="State" value={profile.state} styles={styles} />
          <DetailRow label="Occupation" value={profile.occupation} styles={styles} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Senior citizen</Text>
            <Text style={styles.detailValue}>{profile.isSeniorCitizen ? "Yes" : "No"}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.headerLeft}>
              <Ionicons name="folder-open-outline" size={18} color={colors.text} style={{ marginRight: 6 }} />
              <Text style={styles.cardTitle}>Document Locker</Text>
            </View>
            <TouchableOpacity style={styles.addDocBtn} onPress={() => setMenuVisible("add")}>
              <Ionicons name="add" size={16} color={colors.onPrimary} />
              <Text style={styles.addDocBtnText}>Add</Text>
            </TouchableOpacity>
          </View>

          {docsLoading ? (
            <ActivityIndicator style={{ marginTop: 10 }} color={colors.primary} />
          ) : documents.length === 0 ? (
            <Text style={styles.lockerHint}>
              Store copies of documents you often need, as photos or PDFs. Rename them however
              makes sense to you, and open or re-share them anytime.
            </Text>
          ) : (
            documents.map((item) => (
              <View key={item.id} style={styles.docRow}>
                <TouchableOpacity style={styles.docTapArea} onPress={() => handleViewDocument(item)}>
                  <Ionicons
                    name={item.fileType === "pdf" ? "document-text-outline" : "image-outline"}
                    size={18}
                    color={colors.textSecondary}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.docName} numberOfLines={1}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActionsTarget(item)} hitSlop={10} style={{ paddingLeft: 8 }}>
                  <Ionicons name="ellipsis-vertical" size={16} color={colors.textMuted} />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        <View style={styles.noticeBox}>
          <Ionicons name="information-circle-outline" size={18} color={colors.primary} />
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
              <Ionicons name="create-outline" size={18} color={colors.text} style={{ marginRight: 10 }} />
              <Text style={styles.menuItemText}>Edit Profile</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <View style={styles.menuItem}>
              <Ionicons
                name={mode === "dark" ? "moon-outline" : "sunny-outline"}
                size={18}
                color={colors.text}
                style={{ marginRight: 10 }}
              />
              <Text style={[styles.menuItemText, { flex: 1 }]}>{mode === "dark" ? "Dark Mode" : "Light Mode"}</Text>
              <Switch value={mode === "dark"} onValueChange={toggleTheme} trackColor={{ true: colors.primary }} />
            </View>
            <View style={styles.menuDivider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                setAboutVisible(true);
              }}
            >
              <Ionicons name="shield-checkmark-outline" size={18} color={colors.text} style={{ marginRight: 10 }} />
              <Text style={styles.menuItemText}>About & Privacy</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                signOut(auth);
              }}
            >
              <Ionicons name="log-out-outline" size={18} color={colors.danger} style={{ marginRight: 10 }} />
              <Text style={[styles.menuItemText, { color: colors.danger }]}>Sign Out</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                setDeleteVisible(true);
              }}
            >
              <Ionicons name="trash-outline" size={18} color={colors.danger} style={{ marginRight: 10 }} />
              <Text style={[styles.menuItemText, { color: colors.danger }]}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* About & Privacy */}
      <Modal visible={aboutVisible} transparent animationType="slide" onRequestClose={() => setAboutVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { maxHeight: "80%" }]}>
            <Text style={styles.modalTitle}>About & Privacy</Text>
            <ScrollView>
              <Text style={styles.aboutHeading}>Not an official government app</Text>
              <Text style={styles.aboutText}>
                IndiaAssist AI helps you understand government services. It is not run by or
                affiliated with any government body. Fees, rules and portals change, so always
                confirm on the official website (.gov.in / .nic.in) before you pay or apply.
              </Text>

              <Text style={styles.aboutHeading}>What we store</Text>
              <Text style={styles.aboutText}>
                Your email (for login), the profile details you enter (name, age, state,
                occupation), your reminders, and the names of documents you add. Document files
                themselves stay only on this phone and are never uploaded.
              </Text>

              <Text style={styles.aboutHeading}>AI chat</Text>
              <Text style={styles.aboutText}>
                Questions you type in the assistant are sent to an AI service (Groq) to generate
                answers. Do not type Aadhaar/PAN numbers, OTPs, passwords or bank details in chats.
              </Text>

              <Text style={styles.aboutHeading}>Stay safe</Text>
              <Text style={styles.aboutText}>
                No government office will ask for your OTP over phone, SMS or chat. Only trust
                websites ending in .gov.in or .nic.in.
              </Text>

              <Text style={styles.aboutHeading}>Your data, your control</Text>
              <Text style={styles.aboutText}>
                You can delete your account and all your data any time from the ⋮ menu (Delete
                Account). Questions or requests: {SUPPORT_EMAIL}
              </Text>
            </ScrollView>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.saveBtnSmall} onPress={() => setAboutVisible(false)}>
                <Text style={styles.saveBtnText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete account */}
      <Modal
        visible={deleteVisible}
        transparent
        animationType="slide"
        statusBarTranslucent
        navigationBarTranslucent
        onRequestClose={() => setDeleteVisible(false)}
      >
        <View
          ref={kbRef}
          onLayout={onKbLayout}
          collapsable={false}
          style={[styles.modalBackdrop, { paddingBottom: overlap }]}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Delete account?</Text>
            <Text style={styles.aboutText}>
              This permanently deletes your profile, reminders and saved document files from this
              phone. It cannot be undone. Enter your password to confirm.
            </Text>
            <TextInput
              style={[styles.input, { marginTop: 14 }]}
              placeholder="Password"
              placeholderTextColor={colors.textMuted}
              secureTextEntry
              autoCapitalize="none"
              value={deletePassword}
              onChangeText={setDeletePassword}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setDeleteVisible(false);
                  setDeletePassword("");
                }}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveBtnSmall, { backgroundColor: colors.danger }]}
                onPress={handleDeleteAccount}
                disabled={deleting}
              >
                <Text style={styles.saveBtnText}>{deleting ? "Deleting..." : "Delete everything"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* + Add document: choose source */}
      <Modal visible={menuVisible === "add"} transparent animationType="fade" onRequestClose={() => setMenuVisible(false)}>
        <TouchableOpacity style={styles.menuBackdrop} activeOpacity={1} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem} onPress={pickPhoto}>
              <Ionicons name="camera-outline" size={18} color={colors.text} style={{ marginRight: 10 }} />
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
              <Ionicons name="document-outline" size={18} color={colors.text} style={{ marginRight: 10 }} />
              <Text style={styles.menuItemText}>Upload PDF / File</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ⋮ per-document actions: rename / share / delete */}
      <Modal visible={!!actionsTarget} transparent animationType="fade" onRequestClose={() => setActionsTarget(null)}>
        <TouchableOpacity style={styles.floatingBackdrop} activeOpacity={1} onPress={() => setActionsTarget(null)}>
          <View style={styles.floatingCard}>
            <Text style={styles.floatingTitle} numberOfLines={2}>
              {actionsTarget?.name}
            </Text>
            <View style={styles.menuDivider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                const target = actionsTarget;
                setActionsTarget(null);
                handleShareDocument(target);
              }}
            >
              <Ionicons name="share-outline" size={18} color={colors.text} style={{ marginRight: 10 }} />
              <Text style={styles.menuItemText}>Share / Open Externally</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setRenameTarget(actionsTarget);
                setRenameValue(actionsTarget.name);
                setActionsTarget(null);
              }}
            >
              <Ionicons name="create-outline" size={18} color={colors.text} style={{ marginRight: 10 }} />
              <Text style={styles.menuItemText}>Rename</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                const target = actionsTarget;
                setActionsTarget(null);
                handleDeleteDocument(target);
              }}
            >
              <Ionicons name="trash-outline" size={18} color={colors.danger} style={{ marginRight: 10 }} />
              <Text style={[styles.menuItemText, { color: colors.danger }]}>Delete</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => setActionsTarget(null)}>
              <Ionicons name="close-outline" size={18} color={colors.textSecondary} style={{ marginRight: 10 }} />
              <Text style={[styles.menuItemText, { color: colors.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Full-screen image preview -- opened by directly tapping an image document */}
      <Modal visible={!!previewImage} animationType="fade" onRequestClose={() => setPreviewImage(null)}>
        <View style={styles.previewContainer}>
          <View style={styles.previewHeader}>
            <Text style={styles.previewTitle} numberOfLines={1}>
              {previewImage?.name}
            </Text>
            <TouchableOpacity onPress={() => setPreviewImage(null)} hitSlop={10}>
              <Ionicons name="close" size={26} color="#fff" />
            </TouchableOpacity>
          </View>
          {previewImage && (
            <Image source={{ uri: previewImage.url }} style={styles.previewImage} resizeMode="contain" />
          )}
          <View style={styles.previewActions}>
            <TouchableOpacity
              style={styles.previewActionBtn}
              onPress={() => handleShareDocument(previewImage)}
            >
              <Ionicons name="share-outline" size={20} color="#fff" />
              <Text style={styles.previewActionText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.previewActionBtn}
              onPress={() => {
                setRenameTarget(previewImage);
                setRenameValue(previewImage.name);
                setPreviewImage(null);
              }}
            >
              <Ionicons name="create-outline" size={20} color="#fff" />
              <Text style={styles.previewActionText}>Rename</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.previewActionBtn}
              onPress={() => {
                const target = previewImage;
                setPreviewImage(null);
                handleDeleteDocument(target);
              }}
            >
              <Ionicons name="trash-outline" size={20} color="#F87171" />
              <Text style={[styles.previewActionText, { color: "#F87171" }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Edit Profile -- its own modal, not inline on the page */}
      <Modal visible={editVisible} transparent animationType="slide" onRequestClose={() => setEditVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <Text style={styles.fieldLabel}>Name</Text>
            <TextInput style={styles.input} value={draft.name} onChangeText={(v) => setDraft((p) => ({ ...p, name: v }))} placeholderTextColor={colors.textMuted} />

            <Text style={styles.fieldLabel}>Age</Text>
            <TextInput
              style={styles.input}
              value={draft.age}
              keyboardType="number-pad"
              onChangeText={(v) => setDraft((p) => ({ ...p, age: v.replace(/[^0-9]/g, "") }))}
              placeholderTextColor={colors.textMuted}
            />

            <Text style={styles.fieldLabel}>State</Text>
            <TextInput style={styles.input} value={draft.state} onChangeText={(v) => setDraft((p) => ({ ...p, state: v }))} placeholderTextColor={colors.textMuted} />

            <Text style={styles.fieldLabel}>Occupation</Text>
            <TextInput
              style={styles.input}
              value={draft.occupation}
              onChangeText={(v) => setDraft((p) => ({ ...p, occupation: v }))}
              placeholderTextColor={colors.textMuted}
            />

            <View style={styles.switchRow}>
              <Text style={styles.fieldLabel}>Senior citizen</Text>
              <Switch
                value={draft.isSeniorCitizen}
                onValueChange={(v) => setDraft((p) => ({ ...p, isSeniorCitizen: v }))}
                trackColor={{ true: colors.primary }}
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
              placeholderTextColor={colors.textMuted}
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
            <TextInput style={styles.input} value={renameValue} onChangeText={setRenameValue} autoFocus placeholderTextColor={colors.textMuted} />
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

function getStyles(c) {
  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: c.bg },
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
    },
    headerLeft: { flexDirection: "row", alignItems: "center" },
    headerTitle: { fontSize: 20, fontWeight: "700", color: c.text },
    container: { padding: 20, paddingBottom: 60 },
    email: { fontSize: 14, color: c.textSecondary, marginBottom: 16 },
    card: { backgroundColor: c.surface, borderWidth: 1, borderColor: c.border, borderRadius: 16, padding: 16, marginBottom: 16 },
    cardHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    cardTitle: { fontSize: 15, fontWeight: "700", marginBottom: 8, color: c.text },
    addDocBtn: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: c.primary,
      borderRadius: 16,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    addDocBtnText: { color: c.onPrimary, fontWeight: "700", fontSize: 12, marginLeft: 2 },
    lockerHint: { fontSize: 12, color: c.textMuted, lineHeight: 17, marginTop: 4 },
    detailRow: { paddingVertical: 8, borderTopWidth: 1, borderTopColor: c.borderSoft },
    detailLabel: { fontSize: 12, color: c.textMuted, fontWeight: "600", marginBottom: 2 },
    detailValue: { fontSize: 15, color: c.text },
    docRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: c.borderSoft,
    },
    docTapArea: { flexDirection: "row", alignItems: "center", flex: 1 },
    docName: { flex: 1, fontSize: 14, fontWeight: "600", color: c.text },
    empty: { color: c.textMuted, fontSize: 13, marginTop: 8 },
    noticeBox: {
      flexDirection: "row",
      alignItems: "flex-start",
      backgroundColor: c.primarySoft,
      borderRadius: 14,
      padding: 12,
      gap: 8,
    },
    noticeText: { flex: 1, fontSize: 12, color: c.textSecondary, lineHeight: 18 },
    menuBackdrop: { flex: 1, backgroundColor: c.overlay, justifyContent: "flex-start", alignItems: "flex-end" },
    menuCard: {
      marginTop: 60,
      marginRight: 16,
      backgroundColor: c.bgElevated,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 14,
      paddingVertical: 6,
      minWidth: 220,
    },
    menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingHorizontal: 16 },
    menuItemText: { fontSize: 15, fontWeight: "600", color: c.text },
    menuDivider: { height: 1, backgroundColor: c.borderSoft },
    floatingBackdrop: { flex: 1, backgroundColor: c.overlay, justifyContent: "center", alignItems: "center", padding: 24 },
    floatingCard: {
      width: "100%",
      maxWidth: 320,
      backgroundColor: c.bgElevated,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 16,
      paddingVertical: 6,
      overflow: "hidden",
    },
    floatingTitle: { fontSize: 15, fontWeight: "700", color: c.text, padding: 16, paddingBottom: 12 },
    previewContainer: { flex: 1, backgroundColor: "#000" },
    previewHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 14,
      paddingTop: 50,
    },
    previewTitle: { color: "#fff", fontSize: 15, fontWeight: "600", flex: 1, marginRight: 12 },
    previewImage: { flex: 1, width: "100%" },
    previewActions: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: 18,
      paddingBottom: 30,
      backgroundColor: "rgba(255,255,255,0.06)",
    },
    previewActionBtn: { alignItems: "center", gap: 4 },
    previewActionText: { color: "#fff", fontSize: 12, fontWeight: "600" },
    modalBackdrop: { flex: 1, backgroundColor: c.overlay, justifyContent: "flex-end" },
    modalCard: { backgroundColor: c.bgElevated, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 },
    modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 16, color: c.text },
    fieldLabel: { fontSize: 12, color: c.textMuted, fontWeight: "600", marginBottom: 4, marginTop: 10 },
    input: {
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 15,
      color: c.text,
    },
    switchRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 14 },
    modalActions: { flexDirection: "row", justifyContent: "flex-end", marginTop: 20, gap: 10 },
    cancelBtn: { paddingVertical: 12, paddingHorizontal: 16 },
    cancelBtnText: { color: c.textSecondary, fontWeight: "600" },
    saveBtnSmall: { backgroundColor: c.primary, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 20 },
    saveBtnText: { color: c.onPrimary, fontWeight: "700" },
    aboutHeading: { fontSize: 14, fontWeight: "700", color: c.text, marginTop: 12, marginBottom: 4 },
    aboutText: { fontSize: 13, color: c.textSecondary, lineHeight: 19 },
  });
}