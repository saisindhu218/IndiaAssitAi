import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { getAllJourneys, getAllServices } from "../firebase/firestore";
import { askAboutLifeEvent } from "../ai/groq";

// Renders a journey's checklist as a chat bubble, with a button to open
// the full tracked checklist screen.
function JourneyAnswerCard({ journey, onOpen }) {
  return (
    <View style={styles.journeyCard}>
      <Text style={styles.journeyCardTitle}>
        {journey.icon} {journey.title}
      </Text>
      <Text style={styles.journeyCardDesc}>{journey.description}</Text>
      {journey.steps.slice(0, 4).map((s, i) => (
        <Text key={i} style={styles.journeyCardStep}>
          {i + 1}. {s.note || s.serviceId}
        </Text>
      ))}
      <TouchableOpacity style={styles.journeyCardBtn} onPress={onOpen}>
        <Text style={styles.journeyCardBtnText}>Open full checklist →</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function LifeEventsScreen({ navigation }) {
  const [journeys, setJourneys] = useState([]);
  const [services, setServices] = useState([]);
  const [ready, setReady] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Tell me what's going on in your life -- starting a job, buying a vehicle, travelling abroad -- and I'll point you to what you need. Or tap a suggestion below.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    (async () => {
      const [j, s] = await Promise.all([getAllJourneys(), getAllServices()]);
      setJourneys(j);
      setServices(s);
      setReady(true);
    })();
  }, []);

  function scrollToEnd() {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  }

  async function handleSend(rawText) {
    const text = (rawText ?? input).trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    scrollToEnd();

    // If the text matches a known journey title closely, answer instantly
    // and deterministically instead of calling the AI -- faster and can't
    // hallucinate for the cases we already have curated data for.
    const matched = journeys.find(
      (j) => text.toLowerCase().includes(j.title.toLowerCase()) || j.title.toLowerCase().includes(text.toLowerCase())
    );

    if (matched) {
      setMessages((prev) => [...prev, { role: "assistant", content: "", journey: matched }]);
      scrollToEnd();
      return;
    }

    // Otherwise, ask the AI -- but grounded only in what the app actually covers.
    setLoading(true);
    try {
      const history = nextMessages.slice(-8).map((m) => ({ role: m.role, content: m.content }));
      const reply = await askAboutLifeEvent(text, journeys, services, history.slice(0, -1));
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Sorry, I couldn't reach the assistant (${e.message}).` },
      ]);
    } finally {
      setLoading(false);
      scrollToEnd();
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>What's happening in your life right now?</Text>
      </View>

      {!ready ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <FlatList
            key="suggestions-row"
            data={journeys}
            keyExtractor={(item) => item.id}
            horizontal
            style={styles.suggestionsList}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestionRow}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.suggestionChip} onPress={() => handleSend(item.title)}>
                <Text style={styles.suggestionChipText} numberOfLines={1}>
                  {item.icon} {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />

          <FlatList
            key="chat-messages"
            ref={listRef}
            data={messages}
            keyExtractor={(_, i) => String(i)}
            contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
            renderItem={({ item }) =>
              item.journey ? (
                <JourneyAnswerCard
                  journey={item.journey}
                  onOpen={() => navigation.navigate("JourneyDetail", { journeyId: item.journey.id })}
                />
              ) : (
                <View
                  style={[styles.bubble, item.role === "user" ? styles.userBubble : styles.aiBubble]}
                >
                  <Text style={item.role === "user" ? styles.userText : styles.aiText}>
                    {item.content}
                  </Text>
                </View>
              )
            }
            onContentSizeChange={scrollToEnd}
          />

          {loading && (
            <View style={{ paddingBottom: 8 }}>
              <ActivityIndicator />
            </View>
          )}

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="e.g. I just got married..."
              value={input}
              onChangeText={setInput}
              onSubmitEditing={() => handleSend()}
              multiline
            />
            <TouchableOpacity style={styles.sendBtn} onPress={() => handleSend()} disabled={loading}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: { padding: 20, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  headerTitle: { fontSize: 22, fontWeight: "700" },
  headerSubtitle: { fontSize: 13, color: "#777", marginTop: 4 },
  suggestionsList: { maxHeight: 44, flexGrow: 0 },
  suggestionRow: { paddingHorizontal: 16, paddingVertical: 6, alignItems: "center" },
  suggestionChip: {
    backgroundColor: "#EAF1FF",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    height: 36,
    justifyContent: "center",
  },
  suggestionChipText: { color: "#0B5FFF", fontWeight: "600", fontSize: 12 },
  bubble: { padding: 12, borderRadius: 12, marginBottom: 10, maxWidth: "85%" },
  userBubble: { backgroundColor: "#0B5FFF", alignSelf: "flex-end" },
  aiBubble: { backgroundColor: "#F1F3F6", alignSelf: "flex-start" },
  userText: { color: "#fff" },
  aiText: { color: "#111" },
  journeyCard: {
    backgroundColor: "#F7F8FA",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    maxWidth: "90%",
  },
  journeyCardTitle: { fontSize: 15, fontWeight: "700", marginBottom: 4 },
  journeyCardDesc: { fontSize: 12, color: "#666", marginBottom: 8, lineHeight: 17 },
  journeyCardStep: { fontSize: 13, color: "#333", marginBottom: 2 },
  journeyCardBtn: { marginTop: 10 },
  journeyCardBtnText: { color: "#0B5FFF", fontWeight: "700", fontSize: 13 },
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
  sendBtn: { backgroundColor: "#0B5FFF", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10 },
  sendText: { color: "#fff", fontWeight: "600" },
});
