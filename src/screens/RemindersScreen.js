import React from "react";
import { View, Text, StyleSheet } from "react-native";

// v1 placeholder. Wire this up to Firestore once you add a `reminders`
// collection per user (e.g. { userId, title, dueDate, serviceId }) and a
// notification scheduler (expo-notifications).
export default function RemindersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔔 Reminders</Text>
      <Text style={styles.text}>
        No reminders set yet. This screen is scaffolded and ready -- once you
        add document/licence expiry dates to a user's profile, this screen
        can list them and (with expo-notifications) send local push alerts
        before passport, DL, insurance, or PUC expiry.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  text: { fontSize: 14, color: "#666", lineHeight: 21 },
});
