import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getServicesByCategory } from "../firebase/firestore";
import { useTheme } from "../theme/ThemeContext";

export default function CategoryServicesScreen({ route, navigation }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { category } = route.params;
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setServices(await getServicesByCategory(category));
      setLoading(false);
    })();
  }, [category]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceRow}
            onPress={() => navigation.navigate("ServiceDetail", { serviceId: item.id })}
          >
            <Text style={styles.serviceName}>{item.name}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No services in this category yet.</Text>}
      />
    </View>
  );
}

function getStyles(c) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: c.bg },
    center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: c.bg },
    serviceRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 14,
      paddingVertical: 16,
      paddingHorizontal: 16,
      marginBottom: 10,
    },
    serviceName: { fontSize: 15, fontWeight: "600", flex: 1, color: c.text },
    empty: { color: c.textMuted, marginTop: 20, textAlign: "center" },
  });
}
