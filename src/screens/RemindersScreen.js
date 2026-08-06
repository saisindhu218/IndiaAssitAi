import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase/config";
import { getUserReminders, addUserReminder, deleteUserReminder } from "../firebase/firestore";

function isOverdue(dueDate) {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
}

export default function RemindersScreen() {
  const user = auth.currentUser;
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setReminders(await getUserReminders(user.uid));
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAdd() {
    if (!title.trim() || !dueDate.trim()) {
      Alert.alert("Missing info", "Please enter at least a title and a due date (YYYY-MM-DD).");
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate.trim())) {
      Alert.alert("Date format", "Please use the format YYYY-MM-DD, e.g. 2026-12-31.");
      return;
    }
    setSaving(true);
    try {
      await addUserReminder(user.uid, { title: title.trim(), dueDate: dueDate.trim(), note: note.trim() });
      setTitle("");
      setDueDate("");
      setNote("");
      setModalVisible(false);
      await load();
    } catch (e) {
      Alert.alert("Couldn't save reminder", e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    await deleteUserReminder(user.uid, id);
    setReminders((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="notifications-outline" size={22} color="#111" style={{ marginRight: 6 }} />
          <Text style={styles.headerTitle}>Reminders</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={16} color="#fff" />
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={reminders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20, paddingTop: 8 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={[styles.cardDate, isOverdue(item.dueDate) && styles.overdue]}>
                  Due {item.dueDate}
                  {isOverdue(item.dueDate) ? " -- overdue" : ""}
                </Text>
                {!!item.note && <Text style={styles.cardNote}>{item.note}</Text>}
              </View>
              <TouchableOpacity onPress={() => handleDelete(item.id)} hitSlop={8}>
                <Ionicons name="trash-outline" size={18} color="#D33" />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No reminders yet. Tap "+ Add" to track things like passport, DL, or insurance expiry.
            </Text>
          }
        />
      )}

      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>New Reminder</Text>

            <Text style={styles.fieldLabel}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Passport renewal"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.fieldLabel}>Due date (YYYY-MM-DD)</Text>
            <TextInput
              style={styles.input}
              placeholder="2026-12-31"
              value={dueDate}
              onChangeText={setDueDate}
              keyboardType="numbers-and-punctuation"
            />

            <Text style={styles.fieldLabel}>Note (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Any extra detail"
              value={note}
              onChangeText={setNote}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleAdd} disabled={saving}>
                <Text style={styles.saveBtnText}>{saving ? "Saving..." : "Save"}</Text>
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
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B5FFF",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  addBtnText: { color: "#fff", fontWeight: "700", fontSize: 13, marginLeft: 2 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F8FA",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  cardTitle: { fontSize: 15, fontWeight: "700" },
  cardDate: { fontSize: 12, color: "#666", marginTop: 3 },
  overdue: { color: "#D33", fontWeight: "700" },
  cardNote: { fontSize: 12, color: "#888", marginTop: 3 },
  empty: { color: "#888", marginTop: 20, textAlign: "center", lineHeight: 20 },
  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  modalCard: { backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 16 },
  fieldLabel: { fontSize: 12, color: "#777", fontWeight: "600", marginBottom: 4, marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  modalActions: { flexDirection: "row", justifyContent: "flex-end", marginTop: 20, gap: 10 },
  cancelBtn: { paddingVertical: 12, paddingHorizontal: 16 },
  cancelBtnText: { color: "#666", fontWeight: "600" },
  saveBtn: { backgroundColor: "#0B5FFF", borderRadius: 10, paddingVertical: 12, paddingHorizontal: 20 },
  saveBtnText: { color: "#fff", fontWeight: "700" },
});
