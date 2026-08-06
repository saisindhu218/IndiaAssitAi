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
import { askIndiaAssist } from "../ai/groq";

/**
 * Floating "Ask AI" button + chat modal.
 * Pass `service` (the currently open service doc) to scope answers to it.
 * Pass nothing (or null) for a global, unscoped assistant.
 */
export default function ChatBox({ service = null }) {
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
        .slice(-8) // keep last few turns to bound token usage
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
        <Text style={styles.fabText}>💬</Text>
      </TouchableOpacity>

      <Modal visible={open} animationType="slide" onRequestClose={() => setOpen(false)}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {service ? `Ask about: ${service.name}` : "Ask IndiaAssist"}
            </Text>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            ref={listRef}
            data={messages}
            keyExtractor={(_, i) => String(i)}
            contentContainerStyle={{ padding: 12 }}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.bubble,
                  item.role === "user" ? styles.userBubble : styles.aiBubble,
                ]}
              >
                <Text style={item.role === "user" ? styles.userText : styles.aiText}>
                  {item.content}
                </Text>
              </View>
            )}
            onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          />

          {loading && (
            <View style={{ paddingBottom: 8 }}>
              <ActivityIndicator />
            </View>
          )}

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Type your question..."
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleSend}
              multiline
            />
            <TouchableOpacity style={styles.sendBtn} onPress={handleSend} disabled={loading}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 24,
    right: 20,
    backgroundColor: "#0B5FFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  fabText: { fontSize: 24 },
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 16, fontWeight: "600", flex: 1, paddingRight: 8 },
  close: { fontSize: 20, color: "#666" },
  bubble: { padding: 12, borderRadius: 12, marginBottom: 8, maxWidth: "85%" },
  userBubble: { backgroundColor: "#0B5FFF", alignSelf: "flex-end" },
  aiBubble: { backgroundColor: "#F1F3F6", alignSelf: "flex-start" },
  userText: { color: "#fff" },
  aiText: { color: "#111" },
  inputRow: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    maxHeight: 100,
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: "#0B5FFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sendText: { color: "#fff", fontWeight: "600" },
});
