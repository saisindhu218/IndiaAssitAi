import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { searchServices } from "../firebase/firestore";
import ChatBox from "../components/ChatBox";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch(text) {
    setQuery(text);
    if (text.trim().length < 2) {
      setResults([]);
      return;
    }
    const found = await searchServices(text);
    setResults(found);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.greeting}>
          Welcome<Text style={{ color: colors.secondary }}>.</Text>
        </Text>
        <Text style={styles.subGreeting}>How can I help you today?</Text>

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color={colors.textMuted} style={{ marginLeft: 14 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Ask anything... e.g. 'I lost my driving licence'"
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={handleSearch}
          />
        </View>

        {results.length > 0 && (
          <View style={styles.resultsBox}>
            <FlatList
              data={results}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.resultRow}
                  onPress={() => {
                    setQuery("");
                    setResults([]);
                    navigation.navigate("ServiceDetail", { serviceId: item.id });
                  }}
                >
                  <Text style={styles.resultText}>{item.name}</Text>
                  <Text style={styles.resultSub}>{item.department}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Journey")}>
          <View style={[styles.cardIconWrap, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name="chatbubbles-outline" size={26} color={colors.primary} />
          </View>
          <Text style={styles.cardTitle}>Life Events</Text>
          <Text style={styles.cardDesc}>
            Tell us what's happening in your life -- starting a job, buying a
            vehicle, travelling abroad -- and chat with us to get everything
            you need, step by step.
          </Text>
          <View style={styles.cardCtaRow}>
            <Text style={[styles.cardCta, { color: colors.primary }]}>Start chatting</Text>
            <Ionicons name="arrow-forward" size={14} color={colors.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Services")}>
          <View style={[styles.cardIconWrap, { backgroundColor: colors.secondarySoft }]}>
            <Ionicons name="business-outline" size={26} color={colors.secondary} />
          </View>
          <Text style={styles.cardTitle}>Government Services</Text>
          <Text style={styles.cardDesc}>
            Browse every government service organized by department --
            Identity, Banking, Transport, Property, and more.
          </Text>
          <View style={styles.cardCtaRow}>
            <Text style={[styles.cardCta, { color: colors.secondary }]}>Browse services</Text>
            <Ionicons name="arrow-forward" size={14} color={colors.secondary} />
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Global assistant -- not scoped to any single service */}
      <ChatBox service={null} />
    </View>
  );
}

function getStyles(c) {
  return StyleSheet.create({
    container: { padding: 20, paddingBottom: 100 },
    greeting: { fontSize: 30, fontWeight: "700", color: c.text },
    subGreeting: { fontSize: 15, color: c.textSecondary, marginTop: 4, marginBottom: 20 },
    searchBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 14,
      marginBottom: 8,
    },
    searchInput: { flex: 1, paddingHorizontal: 10, paddingVertical: 14, fontSize: 15, color: c.text },
    resultsBox: {
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 14,
      marginBottom: 20,
      overflow: "hidden",
    },
    resultRow: { padding: 14, borderBottomWidth: 1, borderBottomColor: c.borderSoft },
    resultText: { fontSize: 15, fontWeight: "600", color: c.text },
    resultSub: { fontSize: 12, color: c.textMuted, marginTop: 2 },
    card: {
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 20,
      padding: 20,
      marginTop: 16,
    },
    cardIconWrap: {
      width: 52,
      height: 52,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
    },
    cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 6, color: c.text },
    cardDesc: { fontSize: 13, color: c.textSecondary, lineHeight: 19 },
    cardCtaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 12 },
    cardCta: { fontSize: 13, fontWeight: "700" },
  });
}
