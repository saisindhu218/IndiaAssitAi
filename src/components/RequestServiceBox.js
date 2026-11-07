import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { addRequest } from "../firebase/firestore";
import { auth } from "../firebase/config";
import { useTheme } from "../theme/ThemeContext";

// Shown under the search box when nothing matched. One tap tells the admin which
// service people want next (the dashboard ranks requests by how often they appear).
export default function RequestServiceBox({ query }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  // a new search means a new request
  useEffect(() => {
    setSent(false);
  }, [query]);

  async function send() {
    setSending(true);
    try {
      await addRequest(auth.currentUser?.uid, query);
      setSent(true);
    } catch (e) {
      Alert.alert("Couldn't send request", "Please check your internet connection and try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <View style={styles.box}>
      <Ionicons name={sent ? "checkmark-circle" : "help-circle-outline"} size={22} color={colors.primary} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        {sent ? (
          <Text style={styles.text}>Thanks! We'll look into adding it. Popular requests are added first.</Text>
        ) : (
          <>
            <Text style={styles.text}>
              No service found for "{query.trim()}". Want us to add it?
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={send}
              disabled={sending}
              accessibilityRole="button"
              accessibilityLabel="Request this service"
            >
              <Text style={styles.buttonText}>{sending ? "Sending..." : "Request this service"}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

function getStyles(c) {
  return StyleSheet.create({
    box: {
      flexDirection: "row",
      alignItems: "flex-start",
      backgroundColor: c.primarySoft,
      borderRadius: 12,
      padding: 14,
      marginTop: 10,
      marginBottom: 6,
    },
    text: { fontSize: 13, color: c.text, lineHeight: 19 },
    button: {
      alignSelf: "flex-start",
      marginTop: 10,
      backgroundColor: c.primary,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 8,
    },
    buttonText: { color: c.onPrimary, fontWeight: "700", fontSize: 13 },
  });
}
