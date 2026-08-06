import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  Alert,
  ActivityIndicator,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { getUserProfile, saveUserProfile } from "../firebase/firestore";

const EMPTY_PROFILE = {
  name: "",
  age: "",
  state: "",
  occupation: "",
  isSeniorCitizen: false,
};

function Field({ label, value, onChangeText, editable, keyboardType }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {editable ? (
        <TextInput
          style={styles.fieldInput}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType || "default"}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      ) : (
        <Text style={styles.fieldValue}>{value || "Not set"}</Text>
      )}
    </View>
  );
}

export default function ProfileScreen() {
  const user = auth.currentUser;
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      if (user) {
        const p = await getUserProfile(user.uid);
        if (p) setProfile({ ...EMPTY_PROFILE, ...p });
        // If there's no saved profile yet, drop straight into edit mode.
        if (!p) setEditing(true);
      }
      setLoading(false);
    })();
  }, [user]);

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    try {
      await saveUserProfile(user.uid, profile);
      setEditing(false);
    } catch (e) {
      Alert.alert("Couldn't save", e.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>👤 Profile</Text>
      <Text style={styles.email}>{user?.email || "Not signed in"}</Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Your details</Text>
          {!editing && (
            <TouchableOpacity onPress={() => setEditing(true)}>
              <Text style={styles.editLink}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        <Field
          label="Name"
          value={profile.name}
          editable={editing}
          onChangeText={(v) => setProfile((p) => ({ ...p, name: v }))}
        />
        <Field
          label="Age"
          value={profile.age}
          editable={editing}
          keyboardType="number-pad"
          onChangeText={(v) => setProfile((p) => ({ ...p, age: v.replace(/[^0-9]/g, "") }))}
        />
        <Field
          label="State"
          value={profile.state}
          editable={editing}
          onChangeText={(v) => setProfile((p) => ({ ...p, state: v }))}
        />
        <Field
          label="Occupation"
          value={profile.occupation}
          editable={editing}
          onChangeText={(v) => setProfile((p) => ({ ...p, occupation: v }))}
        />

        <View style={styles.switchRow}>
          <Text style={styles.fieldLabel}>Senior citizen</Text>
          <Switch
            value={profile.isSeniorCitizen}
            disabled={!editing}
            onValueChange={(v) => setProfile((p) => ({ ...p, isSeniorCitizen: v }))}
          />
        </View>

        {editing && (
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={saving}>
            <Text style={styles.saveBtnText}>{saving ? "Saving..." : "Save"}</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.note}>
        This information stays with your account and will later power
        personalized scheme recommendations and Life Events suggestions.
        Do not enter Aadhaar/PAN numbers here -- see the README for why.
      </Text>

      {user && (
        <TouchableOpacity style={styles.signOutBtn} onPress={() => signOut(auth)}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 60 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 4 },
  email: { fontSize: 14, color: "#333", marginBottom: 20 },
  card: { backgroundColor: "#F7F8FA", borderRadius: 14, padding: 16, marginBottom: 20 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  cardTitle: { fontSize: 15, fontWeight: "700" },
  editLink: { color: "#0B5FFF", fontWeight: "700" },
  field: { marginBottom: 14 },
  fieldLabel: { fontSize: 12, color: "#777", marginBottom: 4, fontWeight: "600" },
  fieldValue: { fontSize: 15, color: "#111" },
  fieldInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  saveBtn: { backgroundColor: "#0B5FFF", borderRadius: 10, paddingVertical: 12, alignItems: "center", marginTop: 10 },
  saveBtnText: { color: "#fff", fontWeight: "700" },
  note: { fontSize: 12, color: "#888", lineHeight: 18, marginBottom: 24 },
  signOutBtn: { backgroundColor: "#FFEAEA", borderRadius: 10, paddingVertical: 12, alignItems: "center" },
  signOutText: { color: "#D33", fontWeight: "700" },
});
