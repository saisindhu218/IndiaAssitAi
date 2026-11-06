import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Keyboard,
  Platform,
  Linking,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useTheme } from "../theme/ThemeContext";

// Paste the public link to your hosted privacy policy here (needed for Google
// Play too). While it is empty, tapping "Privacy Policy" shows a short summary.
const PRIVACY_POLICY_URL = "";

const MIN_PASSWORD_LENGTH = 8;

// Turns Firebase's technical errors into messages people understand.
function friendlyAuthError(e) {
  switch (e?.code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "The email or password is incorrect. If you forgot your password, tap \"Forgot password?\".";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try logging in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return `Please choose a stronger password (at least ${MIN_PASSWORD_LENGTH} characters).`;
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a few minutes or reset your password.";
    case "auth/network-request-failed":
      return "No internet connection. Please check your network and try again.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export default function LoginScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Adds scrollable space under the form while the keyboard is open, so every
  // field and button can be scrolled above it on any phone.
  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const showSub = Keyboard.addListener(showEvent, (e) => setKeyboardHeight(e.endCoordinates.height));
    const hideSub = Keyboard.addListener(hideEvent, () => setKeyboardHeight(0));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  function showPrivacy() {
    if (PRIVACY_POLICY_URL) {
      Linking.openURL(PRIVACY_POLICY_URL).catch(() => {});
      return;
    }
    Alert.alert(
      "Privacy Policy",
      "We store your email, the profile details you enter, your reminders and document names. Document files stay only on your phone. AI questions are sent to an AI service to generate answers, so never type OTPs, passwords, or Aadhaar/PAN numbers in chats. You can delete your account and data any time from Profile > Delete Account."
    );
  }

  async function handleSubmit() {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      Alert.alert("Missing info", "Please enter both email and password.");
      return;
    }
    if (mode === "signup") {
      if (password.length < MIN_PASSWORD_LENGTH) {
        Alert.alert("Weak password", `Please use at least ${MIN_PASSWORD_LENGTH} characters.`);
        return;
      }
      if (!agreed) {
        Alert.alert("One more step", "Please tick the box to confirm you understand and agree.");
        return;
      }
    }
    Keyboard.dismiss();
    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, cleanEmail, password);
      } else {
        await createUserWithEmailAndPassword(auth, cleanEmail, password);
      }
    } catch (e) {
      Alert.alert(mode === "login" ? "Couldn't log in" : "Couldn't create account", friendlyAuthError(e));
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      Alert.alert("Enter your email", "Type your email address above first, then tap \"Forgot password?\" again.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, cleanEmail);
    } catch (e) {
      if (e?.code === "auth/network-request-failed" || e?.code === "auth/invalid-email") {
        Alert.alert("Couldn't send email", friendlyAuthError(e));
        return;
      }
      // for any other result, don't reveal whether the account exists
    }
    Alert.alert(
      "Check your email",
      "If an account exists for that address, we've sent a link to reset your password. Check your spam folder too."
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={[styles.container, { paddingBottom: 24 + keyboardHeight }]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
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
        autoCorrect={false}
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        accessibilityLabel="Email address"
      />

      <View style={styles.passwordWrap}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder={mode === "signup" ? `Password (min ${MIN_PASSWORD_LENGTH} characters)` : "Password"}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          textContentType={mode === "signup" ? "newPassword" : "password"}
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handleSubmit}
          accessibilityLabel="Password"
        />
        <TouchableOpacity
          style={styles.eyeBtn}
          onPress={() => setShowPassword((v) => !v)}
          accessibilityRole="button"
          accessibilityLabel={showPassword ? "Hide password" : "Show password"}
          hitSlop={10}
        >
          <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      {mode === "login" && (
        <TouchableOpacity onPress={handleForgotPassword} accessibilityRole="button" style={styles.forgotWrap}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      )}

      {mode === "signup" && (
        <TouchableOpacity
          style={styles.consentRow}
          onPress={() => setAgreed((v) => !v)}
          activeOpacity={0.7}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: agreed }}
          accessibilityLabel="I understand this is not an official government app and I agree to the Privacy Policy"
        >
          <Ionicons
            name={agreed ? "checkbox" : "square-outline"}
            size={22}
            color={agreed ? colors.primary : colors.textMuted}
            style={{ marginRight: 10, marginTop: 1 }}
          />
          <Text style={styles.consentText}>
            I understand IndiaAssist AI is <Text style={{ fontWeight: "700" }}>not an official government app</Text> and
            that I should verify details on official websites. I agree to the{" "}
            <Text style={styles.consentLink} onPress={showPrivacy}>
              Privacy Policy
            </Text>
            .
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleSubmit}
        disabled={loading}
        accessibilityRole="button"
      >
        {loading ? (
          <ActivityIndicator color={colors.onPrimary} />
        ) : (
          <Text style={styles.buttonText}>{mode === "login" ? "Log In" : "Sign Up"}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setMode(mode === "login" ? "signup" : "login");
          setAgreed(false);
        }}
        accessibilityRole="button"
      >
        <Text style={styles.switchText}>
          {mode === "login" ? "New here? Create an account" : "Already have an account? Log in"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function getStyles(c) {
  return StyleSheet.create({
    container: { flexGrow: 1, justifyContent: "center", padding: 24 },
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
    subtitle: { fontSize: 13, color: c.textSecondary, textAlign: "center", marginTop: 6, marginBottom: 28 },
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
    passwordWrap: { position: "relative" },
    passwordInput: { paddingRight: 48 },
    eyeBtn: { position: "absolute", right: 14, top: 15 },
    forgotWrap: { alignSelf: "flex-end", marginBottom: 4, paddingVertical: 4 },
    forgotText: { color: c.primary, fontWeight: "600", fontSize: 13 },
    consentRow: { flexDirection: "row", alignItems: "flex-start", marginVertical: 8 },
    consentText: { flex: 1, fontSize: 12, color: c.textSecondary, lineHeight: 18 },
    consentLink: { color: c.primary, fontWeight: "700", textDecorationLine: "underline" },
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