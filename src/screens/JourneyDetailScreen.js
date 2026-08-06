import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { getJourneyById, getServiceById } from "../firebase/firestore";

export default function JourneyDetailScreen({ route, navigation }) {
  const { journeyId } = route.params;
  const [journey, setJourney] = useState(null);
  const [stepServices, setStepServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const j = await getJourneyById(journeyId);
      setJourney(j);
      if (j) {
        const resolved = await Promise.all(
          j.steps.map(async (step) => ({
            ...step,
            service: await getServiceById(step.serviceId),
          }))
        );
        setStepServices(resolved);
      }
      setLoading(false);
    })();
  }, [journeyId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!journey) {
    return (
      <View style={styles.center}>
        <Text>Journey not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{journey.icon}</Text>
      <Text style={styles.title}>{journey.title}</Text>
      <Text style={styles.desc}>{journey.description}</Text>

      <FlatList
        data={stepServices}
        keyExtractor={(item, i) => item.serviceId + i}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 40 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.stepRow}
            disabled={!item.service}
            onPress={() =>
              item.service &&
              navigation.navigate("ServiceDetail", { serviceId: item.serviceId })
            }
          >
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.stepTitle}>
                {item.service ? item.service.name : "(service content coming soon)"}
              </Text>
              {!!item.note && <Text style={styles.stepNote}>{item.note}</Text>}
            </View>
            {item.service && <Text style={styles.arrow}>›</Text>}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  icon: { fontSize: 36 },
  title: { fontSize: 22, fontWeight: "700", marginTop: 6 },
  desc: { fontSize: 13, color: "#666", marginTop: 6, lineHeight: 19 },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EAF1FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  stepNumberText: { color: "#0B5FFF", fontWeight: "700", fontSize: 12 },
  stepTitle: { fontSize: 15, fontWeight: "600" },
  stepNote: { fontSize: 12, color: "#777", marginTop: 2 },
  arrow: { fontSize: 20, color: "#999" },
});
