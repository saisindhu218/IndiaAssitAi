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

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  async function handleSearch(text) {
    setQuery(text);
    if (text.trim().length < 2) {
      setResults([]);
      return;
    }
    setSearching(true);
    const found = await searchServices(text);
    setResults(found);
    setSearching(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.greeting}>👋 Welcome</Text>
        <Text style={styles.subGreeting}>How can I help you today?</Text>

        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Ask anything... e.g. 'I lost my driving licence'"
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

        <TouchableOpacity
          style={[styles.card, styles.journeyCard]}
          onPress={() => navigation.navigate("Journey")}
        >
          <Text style={styles.cardIcon}>💬</Text>
          <Text style={styles.cardTitle}>Life Events</Text>
          <Text style={styles.cardDesc}>
            Tell us what's happening in your life -- starting a job, buying a
            vehicle, travelling abroad -- and chat with us to get everything
            you need, step by step.
          </Text>
          <Text style={styles.cardCta}>Start chatting →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.servicesCard]}
          onPress={() => navigation.navigate("Services")}
        >
          <Text style={styles.cardIcon}>🏛</Text>
          <Text style={styles.cardTitle}>Government Services</Text>
          <Text style={styles.cardDesc}>
            Browse every government service organized by department --
            Identity, Banking, Transport, Property, and more.
          </Text>
          <Text style={styles.cardCta}>Browse services →</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Global assistant -- not scoped to any single service */}
      <ChatBox service={null} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 100 },
  greeting: { fontSize: 26, fontWeight: "700" },
  subGreeting: { fontSize: 15, color: "#666", marginTop: 4, marginBottom: 20 },
  searchBox: { marginBottom: 8 },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
  },
  resultsBox: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
  },
  resultRow: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  resultText: { fontSize: 15, fontWeight: "600" },
  resultSub: { fontSize: 12, color: "#888", marginTop: 2 },
  card: {
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  journeyCard: { backgroundColor: "#EAF1FF" },
  servicesCard: { backgroundColor: "#F1F3F6" },
  cardIcon: { fontSize: 32, marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  cardDesc: { fontSize: 13, color: "#555", lineHeight: 19 },
  cardCta: { fontSize: 13, fontWeight: "700", color: "#0B5FFF", marginTop: 10 },
});
