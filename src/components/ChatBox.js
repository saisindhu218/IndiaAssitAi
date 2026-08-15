import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { askIndiaAssist } from "../ai/groq";
import { useTheme } from "../theme/ThemeContext";

/**
 * Floating "Ask AI" button + chat modal.
 * Pass `service` (the currently open service doc) to scope answers to it.
 * Pass nothing (or null) for a global, unscoped assistant.
 */
export default function ChatBox({ service = null }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: service
        ? `Hi! Ask me anything about "${service.name}" -- documents, fees, steps, or common problems.`
        : "Hi! Ask me about any government service, or open a service page first for more specific help.",
    },
  ]);
  const listRef = useRef(null);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;
    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    try {
      const history = nextMessages
        .slice(-8)
        .map((m) => ({ role: m.role, content: m.content }));
      const reply = await askIndiaAssist(text, service, history.slice(0, -1));
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't reach the AI assistant right now (" +
            e.message +
            "). Please check your internet connection or try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={() => setOpen(true)}>
        <Ionicons name="chatbubble-ellipses" size={24} color={colors.onPrimary} />
      </TouchableOpacity>

      <Modal visible={open} animationType="slide" onRequestClose={() => setOpen(false)}>
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{service ? `Ask about: ${service.name}` : "Ask IndiaAssist"}</Text>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Ionicons name="close" size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <FlatList
            ref={listRef}
            data={messages}
            keyExtractor={(_, i) => String(i)}
            contentContainerStyle={{ padding: 12 }}
            renderItem={({ item }) => (
              <View style={[styles.bubble, item.role === "user" ? styles.userBubble : styles.aiBubble]}>
                <Text style={item.role === "user" ? styles.userText : styles.aiText}>{item.content}</Text>
              </View>
            )}
            onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          />

          {loading && (
            <View style={{ paddingBottom: 8 }}>
              <ActivityIndicator color={colors.primary} />
            </View>
          )}

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Type your question..."
              placeholderTextColor={colors.textMuted}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleSend}
              multiline
            />
            <TouchableOpacity style={styles.sendBtn} onPress={handleSend} disabled={loading}>
              <Ionicons name="arrow-up" size={18} color={colors.onPrimary} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

function getStyles(c) {
  return StyleSheet.create({
    fab: {
      position: "absolute",
      bottom: 24,
      right: 20,
      backgroundColor: c.primary,
      width: 56,
      height: 56,
      borderRadius: 28,
      alignItems: "center",
      justifyContent: "center",
      elevation: 4,
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
    },
    container: { flex: 1, backgroundColor: c.bg },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
      backgroundColor: c.bgElevated,
    },
    headerTitle: { fontSize: 16, fontWeight: "600", flex: 1, paddingRight: 8, color: c.text },
    bubble: { padding: 12, borderRadius: 16, marginBottom: 8, maxWidth: "85%" },
    userBubble: { backgroundColor: c.primary, alignSelf: "flex-end" },
    aiBubble: { backgroundColor: c.surface, borderWidth: 1, borderColor: c.border, alignSelf: "flex-start" },
    userText: { color: c.onPrimary },
    aiText: { color: c.text },
    inputRow: {
      flexDirection: "row",
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: c.border,
      alignItems: "flex-end",
      backgroundColor: c.bgElevated,
    },
    input: {
      flex: 1,
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 20,
      paddingHorizontal: 14,
      paddingVertical: 10,
      maxHeight: 100,
      marginRight: 8,
      color: c.text,
    },
    sendBtn: {
      backgroundColor: c.primary,
      borderRadius: 20,
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
  });
}
