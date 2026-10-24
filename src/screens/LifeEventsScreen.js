import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Keyboard,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getAllJourneys, getAllServices } from "../firebase/firestore";
import { askAboutLifeEvent } from "../ai/groq";
import { useTheme } from "../theme/ThemeContext";
import FormattedText from "../components/FormattedText";
import useKeyboardOverlap from "../hooks/useKeyboardOverlap";

// Extra one-tap suggestions. These are sent to the AI as a normal question
// (the 3 checklist journeys come from Firestore and are shown first).
const EXTRA_SUGGESTIONS = [
  { id: "x-married", icon: "💍", title: "Getting Married", prompt: "I'm getting married. Which documents and government services do I need to take care of?" },
  { id: "x-baby", icon: "👶", title: "Having a Baby", prompt: "We are expecting a baby. What registrations, documents and schemes should we know about?" },
  { id: "x-lost", icon: "🆔", title: "Lost My Documents", prompt: "I lost my important documents like Aadhaar, PAN or driving licence. What should I do step by step?" },
  { id: "x-home", icon: "🏠", title: "Buying a Home", prompt: "I'm buying a home. What documents, registrations and government services are involved?" },
  { id: "x-business", icon: "🏢", title: "Starting a Business", prompt: "I want to start a small business. Which registrations, licences and schemes do I need?" },
  { id: "x-college", icon: "🎓", title: "Starting College", prompt: "I'm starting college. Which documents, scholarships and services should I look at?" },
  { id: "x-move", icon: "🚚", title: "Moving to a New City", prompt: "I'm moving to a new city. Which address updates and documents should I handle?" },
  { id: "x-job-loss", icon: "💼", title: "Lost My Job", prompt: "I lost my job. What government support, schemes and services can help me?" },
  { id: "x-medical", icon: "🏥", title: "Medical Emergency", prompt: "There is a medical emergency in my family. Which health schemes and services can help with costs?" },
  { id: "x-retire", icon: "🧓", title: "Retiring", prompt: "I'm about to retire. What pensions, benefits and services should I set up?" },
  { id: "x-death", icon: "🕊️", title: "Death in the Family", prompt: "A family member passed away. What certificates and legal steps do we need to complete?" },
  { id: "x-farmer", icon: "🌾", title: "Farming Support", prompt: "I'm a farmer. Which government schemes, subsidies and services are available to me?" },
];

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

  const insets = useSafeAreaInsets();
  const { ref: kbRef, overlap, onLayout: onKbLayout } = useKeyboardOverlap();
  const [composerOpen, setComposerOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
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

      // Find which exact catalog services the AI actually named in its reply,
      // so we can render them as real tappable links instead of leaving the
      // person to manually search for a page the assistant only described.
      const lowerReply = reply.toLowerCase();
      const relatedServices = services.filter((s) => lowerReply.includes(s.name.toLowerCase())).slice(0, 4);

      setMessages((prev) => [...prev, { role: "assistant", content: reply, relatedServices }]);
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
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
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
            data={[...journeys, { id: "more-chip", isMore: true }]}
            keyExtractor={(item) => item.id}
            horizontal
            style={styles.suggestionsList}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestionRow}
            renderItem={({ item }) =>
              item.isMore ? (
                <TouchableOpacity
                  style={[styles.suggestionChip, { backgroundColor: colors.primary }]}
                  onPress={() => setMoreOpen(true)}
                >
                  <Text style={[styles.suggestionChipText, { color: colors.onPrimary }]}>
                    More ▾
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.suggestionChip}
                  onPress={() => handleSend(item.prompt || item.title)}
                >
                  <Text style={styles.suggestionChipText} numberOfLines={1}>
                    {item.icon} {item.title}
                  </Text>
                </TouchableOpacity>
              )
            }
          />

          {/* flex: 1 here is important -- without it this list can overflow
              the shrunk (post-keyboard) container and push the input row
              off-screen instead of sitting neatly above the keyboard. */}
          <FlatList
            key="chat-messages"
            ref={listRef}
            style={{ flex: 1 }}
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
                <View style={{ marginBottom: 10 }}>
                  <View
                    style={[
                      styles.bubble,
                      item.role === "user" ? styles.userBubble : styles.aiBubble,
                      { marginBottom: item.relatedServices?.length ? 6 : 0 },
                    ]}
                  >
                    {item.role === "user" ? (
                      <Text style={styles.userText}>{item.content}</Text>
                    ) : (
                      <FormattedText style={styles.aiText} text={item.content} linkColor={colors.primary} />
                    )}
                  </View>
                  {!!item.relatedServices?.length && (
                    <View style={styles.relatedRow}>
                      {item.relatedServices.map((s) => (
                        <TouchableOpacity
                          key={s.id}
                          style={styles.relatedChip}
                          onPress={() => navigation.navigate("ServiceDetail", { serviceId: s.id })}
                        >
                          <Text style={styles.relatedChipText} numberOfLines={1}>
                            {s.name}
                          </Text>
                          <Ionicons name="arrow-forward" size={12} color={colors.primary} />
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
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

          {/* "More" menu: every extra life-event suggestion in one sheet. */}
          <Modal
            visible={moreOpen}
            transparent
            animationType="slide"
            statusBarTranslucent
            navigationBarTranslucent
            onRequestClose={() => setMoreOpen(false)}
          >
            <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.35)" }}>
              <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={1}
                onPress={() => setMoreOpen(false)}
              />
              <View
                style={{
                  backgroundColor: colors.bgElevated,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  maxHeight: "70%",
                  paddingBottom: 12 + insets.bottom,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 16,
                    paddingBottom: 8,
                  }}
                >
                  <Text style={{ fontSize: 17, fontWeight: "700", color: colors.text }}>
                    More life events
                  </Text>
                  <TouchableOpacity onPress={() => setMoreOpen(false)}>
                    <Ionicons name="close" size={24} color={colors.text} />
                  </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={{ paddingHorizontal: 12 }}>
                  {EXTRA_SUGGESTIONS.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.7}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 12,
                        paddingHorizontal: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                      }}
                      onPress={() => {
                        setMoreOpen(false);
                        handleSend(item.prompt);
                      }}
                    >
                      <Text style={{ fontSize: 22, marginRight: 14 }}>{item.icon}</Text>
                      <Text style={{ flex: 1, fontSize: 15, fontWeight: "600", color: colors.text }}>
                        {item.title}
                      </Text>
                      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Modal>

          {/* Tapping the bar opens a full-screen composer (a Modal, same as the
              service chat) so the keyboard can never cover what you type. */}
          <View style={styles.inputRow}>
            <TouchableOpacity
              style={[styles.input, { justifyContent: "center" }]}
              activeOpacity={0.8}
              onPress={() => setComposerOpen(true)}
            >
              <Text
                numberOfLines={1}
                style={{ color: input ? colors.text : colors.textMuted }}
              >
                {input || "e.g. I just got married..."}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={() => (input.trim() ? handleSend() : setComposerOpen(true))}
              disabled={loading}
            >
              <Ionicons name="arrow-up" size={18} color={colors.onPrimary} />
            </TouchableOpacity>
          </View>

          <Modal
            visible={composerOpen}
            transparent
            animationType="fade"
            statusBarTranslucent
            navigationBarTranslucent
            onRequestClose={() => setComposerOpen(false)}
          >
            <View
              ref={kbRef}
              onLayout={onKbLayout}
              collapsable={false}
              style={{
                flex: 1,
                justifyContent: "flex-end",
                backgroundColor: "rgba(0,0,0,0.35)",
                paddingBottom: overlap,
              }}
            >
              <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={1}
                onPress={() => {
                  Keyboard.dismiss();
                  setComposerOpen(false);
                }}
              />
              <View
                style={[
                  styles.inputRow,
                  { paddingBottom: 10 + (overlap > 0 ? 0 : insets.bottom) },
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="e.g. I just got married..."
                  placeholderTextColor={colors.textMuted}
                  value={input}
                  onChangeText={setInput}
                  autoFocus
                  multiline
                />
                <TouchableOpacity
                  style={styles.sendBtn}
                  disabled={loading || !input.trim()}
                  onPress={() => {
                    const text = input.trim();
                    if (!text) return;
                    Keyboard.dismiss();
                    setComposerOpen(false);
                    handleSend(text);
                  }}
                >
                  <Ionicons name="arrow-up" size={18} color={colors.onPrimary} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
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
    bubble: { padding: 12, borderRadius: 16, maxWidth: "85%" },
    userBubble: { backgroundColor: c.primary, alignSelf: "flex-end" },
    aiBubble: { backgroundColor: c.surface, borderWidth: 1, borderColor: c.border, alignSelf: "flex-start" },
    userText: { color: c.onPrimary },
    aiText: { color: c.text },
    relatedRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
    relatedChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: c.primarySoft,
      borderRadius: 14,
      paddingHorizontal: 10,
      paddingVertical: 7,
      maxWidth: "100%",
    },
    relatedChipText: { color: c.primary, fontWeight: "700", fontSize: 12, flexShrink: 1 },
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