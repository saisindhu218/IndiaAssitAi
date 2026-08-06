import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { getCategories, getServicesByCategory } from "../firebase/firestore";

export default function ServicesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const cats = await getCategories();
      setCategories(cats);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!activeCategory) return;
    (async () => {
      setLoading(true);
      const list = await getServicesByCategory(activeCategory);
      setServices(list);
      setLoading(false);
    })();
  }, [activeCategory]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Category list view
  if (!activeCategory) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Government Services</Text>
        <Text style={styles.subHeader}>Browse by department. New categories appear automatically as you add services.</Text>
        <FlatList
          key="categories-grid"
          data={categories}
          keyExtractor={(item) => item.name}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryCard} onPress={() => setActiveCategory(item.name)}>
              <Text style={styles.categoryIcon}>{item.icon}</Text>
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No services yet -- seed some via `npm run seed` or add documents to Firestore's "services" collection.</Text>
          }
        />
      </View>
    );
  }

  // Service list within a category
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setActiveCategory(null)}>
        <Text style={styles.backLink}>← All categories</Text>
      </TouchableOpacity>
      <Text style={styles.header}>{activeCategory}</Text>
      <FlatList
        key="services-list"
        data={services}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
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
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 4 },
  subHeader: { fontSize: 13, color: "#777", marginBottom: 16 },
  backLink: { color: "#0B5FFF", marginBottom: 8, fontWeight: "600" },
  categoryCard: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    borderRadius: 14,
    padding: 16,
    margin: 6,
    alignItems: "center",
    minHeight: 100,
    justifyContent: "center",
  },
  categoryIcon: { fontSize: 28, marginBottom: 6 },
  categoryName: { fontSize: 13, fontWeight: "600", textAlign: "center" },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  serviceName: { fontSize: 15, fontWeight: "600", flex: 1 },
  serviceArrow: { fontSize: 20, color: "#999" },
  empty: { color: "#888", marginTop: 20, textAlign: "center" },
});
