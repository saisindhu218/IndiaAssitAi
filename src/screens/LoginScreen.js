import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useTheme } from "../theme/ThemeContext";

export default function LoginScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !password) {
      Alert.alert("Missing info", "Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (e) {
      Alert.alert("Authentication error", e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <Text style={styles.logo}>🇮🇳</Text>
      </View>
      <Text style={styles.title}>IndiaAssist AI</Text>
      <Text style={styles.subtitle}>One app for every government & public service in India.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.textMuted}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{mode === "login" ? "Log In" : "Sign Up"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setMode(mode === "login" ? "signup" : "login")}>
        <Text style={styles.switchText}>
          {mode === "login" ? "New here? Create an account" : "Already have an account? Log in"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function getStyles(c) {
  return StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: c.bg },
    logoWrap: {
      width: 76,
      height: 76,
      borderRadius: 22,
      backgroundColor: c.primarySoft,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
    },
    logo: { fontSize: 38 },
    title: { fontSize: 24, fontWeight: "800", textAlign: "center", color: c.text },
    subtitle: { fontSize: 13, color: c.textSecondary, textAlign: "center", marginTop: 6, marginBottom: 32 },
    input: {
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginBottom: 12,
      fontSize: 15,
      color: c.text,
    },
    button: {
      backgroundColor: c.primary,
      borderRadius: 14,
      paddingVertical: 15,
      alignItems: "center",
      marginTop: 8,
    },
    buttonText: { color: c.onPrimary, fontWeight: "700", fontSize: 15 },
    switchText: { textAlign: "center", color: c.primary, marginTop: 18, fontWeight: "600" },
  });
}
