import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getJourneyById, getServiceById } from "../firebase/firestore";
import { useTheme } from "../theme/ThemeContext";

export default function JourneyDetailScreen({ route, navigation }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
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
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!journey) {
    return (
      <View style={styles.center}>
        <Text style={{ color: colors.text }}>Journey not found.</Text>
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
            onPress={() => item.service && navigation.navigate("ServiceDetail", { serviceId: item.serviceId })}
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
            {item.service && <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function getStyles(c) {
  return StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: c.bg },
    center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: c.bg },
    icon: { fontSize: 36 },
    title: { fontSize: 22, fontWeight: "700", marginTop: 6, color: c.text },
    desc: { fontSize: 13, color: c.textSecondary, marginTop: 6, lineHeight: 19 },
    stepRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 14,
      marginBottom: 10,
    },
    stepNumber: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: c.primarySoft,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    stepNumberText: { color: c.primary, fontWeight: "700", fontSize: 12 },
    stepTitle: { fontSize: 15, fontWeight: "600", color: c.text },
    stepNote: { fontSize: 12, color: c.textMuted, marginTop: 2 },
  });
}
