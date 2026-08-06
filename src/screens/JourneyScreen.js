import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { getAllJourneys } from "../firebase/firestore";

export default function JourneyScreen({ navigation }) {
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setJourneys(await getAllJourneys());
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Journey Mode</Text>
      <Text style={styles.subHeader}>Tell us what's happening in your life -- we'll line up everything you need.</Text>
      <FlatList
        data={journeys}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("JourneyDetail", { journeyId: item.id })}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.count}>{item.steps.length} step{item.steps.length !== 1 ? "s" : ""}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No journeys yet -- add some to the "journeys" collection.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: { fontSize: 22, fontWeight: "700" },
  subHeader: { fontSize: 13, color: "#777", marginTop: 4, marginBottom: 16 },
  card: {
    flexDirection: "row",
    backgroundColor: "#F7F8FA",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  icon: { fontSize: 28, marginRight: 14 },
  title: { fontSize: 16, fontWeight: "700" },
  desc: { fontSize: 12, color: "#666", marginTop: 4, lineHeight: 17 },
  count: { fontSize: 11, color: "#0B5FFF", marginTop: 6, fontWeight: "600" },
  empty: { color: "#888", marginTop: 20, textAlign: "center" },
});
