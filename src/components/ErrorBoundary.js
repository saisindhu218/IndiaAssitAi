import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Catches unexpected crashes in any screen and shows a friendly message with a
// "Try again" button instead of a blank or red screen.
// (Plain colours on purpose: this must work even if the theme itself fails.)
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Hook for crash reporting later (e.g. Sentry.captureException(error)).
    console.warn("App error:", error?.message, info?.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <View style={styles.container}>
        <Text style={styles.emoji}>😕</Text>
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.body}>
          Sorry about that. Your data is safe. Please try again, and if it keeps happening, close and
          reopen the app.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.setState({ hasError: false })}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, backgroundColor: "#F5F9FB" },
  emoji: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: "800", color: "#0F172A", marginBottom: 8 },
  body: { fontSize: 14, color: "#475569", textAlign: "center", lineHeight: 21, marginBottom: 24 },
  button: { backgroundColor: "#0891B2", paddingHorizontal: 28, paddingVertical: 13, borderRadius: 14 },
  buttonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 15 },
});