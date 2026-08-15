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
import { Ionicons } from "@expo/vector-icons";
import { getAllJourneys, getAllServices } from "../firebase/firestore";
import { askAboutLifeEvent } from "../ai/groq";
import { useTheme } from "../theme/ThemeContext";

// Renders a journey's checklist as a chat bubble, with a button to open
// the full tracked checklist screen.
function JourneyAnswerCard({ journey, onOpen, styles, colors }) {
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
      <TouchableOpacity style={styles.journeyCardBtnRow} onPress={onOpen}>
        <Text style={styles.journeyCardBtnText}>Open full checklist</Text>
        <Ionicons name="arrow-forward" size={14} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

export default function LifeEventsScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
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

    const matched = journeys.find(
      (j) => text.toLowerCase().includes(j.title.toLowerCase()) || j.title.toLowerCase().includes(text.toLowerCase())
    );

    if (matched) {
      setMessages((prev) => [...prev, { role: "assistant", content: "", journey: matched }]);
      scrollToEnd();
      return;
    }

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
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>What's happening in your life right now?</Text>
      </View>

      {!ready ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
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
                  styles={styles}
                  colors={colors}
                />
              ) : (
                <View style={[styles.bubble, item.role === "user" ? styles.userBubble : styles.aiBubble]}>
                  <Text style={item.role === "user" ? styles.userText : styles.aiText}>{item.content}</Text>
                </View>
              )
            }
            onContentSizeChange={scrollToEnd}
          />

          {loading && (
            <View style={{ paddingBottom: 8 }}>
              <ActivityIndicator color={colors.primary} />
            </View>
          )}

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="e.g. I just got married..."
              placeholderTextColor={colors.textMuted}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={() => handleSend()}
              multiline
            />
            <TouchableOpacity style={styles.sendBtn} onPress={() => handleSend()} disabled={loading}>
              <Ionicons name="arrow-up" size={18} color={colors.onPrimary} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
}

function getStyles(c) {
  return StyleSheet.create({
    center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: c.bg },
    header: { padding: 20, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: c.border },
    headerSubtitle: { fontSize: 13, color: c.textSecondary, marginTop: 4 },
    suggestionsList: { maxHeight: 44, flexGrow: 0 },
    suggestionRow: { paddingHorizontal: 16, paddingVertical: 6, alignItems: "center" },
    suggestionChip: {
      backgroundColor: c.primarySoft,
      borderRadius: 18,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginRight: 8,
      height: 36,
      justifyContent: "center",
    },
    suggestionChipText: { color: c.primary, fontWeight: "600", fontSize: 12 },
    bubble: { padding: 12, borderRadius: 16, marginBottom: 10, maxWidth: "85%" },
    userBubble: { backgroundColor: c.primary, alignSelf: "flex-end" },
    aiBubble: { backgroundColor: c.surface, borderWidth: 1, borderColor: c.border, alignSelf: "flex-start" },
    userText: { color: c.onPrimary },
    aiText: { color: c.text },
    journeyCard: {
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 16,
      padding: 16,
      marginBottom: 10,
      maxWidth: "90%",
    },
    journeyCardTitle: { fontSize: 15, fontWeight: "700", marginBottom: 4, color: c.text },
    journeyCardDesc: { fontSize: 12, color: c.textSecondary, marginBottom: 8, lineHeight: 17 },
    journeyCardStep: { fontSize: 13, color: c.textSecondary, marginBottom: 2 },
    journeyCardBtnRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10 },
    journeyCardBtnText: { color: c.primary, fontWeight: "700", fontSize: 13 },
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
