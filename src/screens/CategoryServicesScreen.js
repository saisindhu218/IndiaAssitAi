import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { getServicesByCategory } from "../firebase/firestore";

export default function CategoryServicesScreen({ route, navigation }) {
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
        <ActivityIndicator size="large" />
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
            <Text style={styles.serviceArrow}>›</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No services in this category yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  serviceName: { fontSize: 16, fontWeight: "600", flex: 1 },
  serviceArrow: { fontSize: 22, color: "#999" },
  empty: { color: "#888", marginTop: 20, textAlign: "center" },
});
