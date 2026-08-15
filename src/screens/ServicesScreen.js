import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getCategories, searchServices } from "../firebase/firestore";
import StateFilterBar from "../components/StateFilterBar";
import { useTheme } from "../theme/ThemeContext";

export default function ServicesScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
      setLoading(false);
    })();
  }, []);

  async function handleSearch(text) {
    setQuery(text);
    if (text.trim().length < 2) {
      setResults([]);
      return;
    }
    setResults(await searchServices(text));
  }

  function goToService(serviceId) {
    setQuery("");
    setResults([]);
    navigation.navigate("ServiceDetail", { serviceId });
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Government Services</Text>
      <Text style={styles.subHeader}>Browse by department, or search directly below.</Text>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color={colors.textMuted} style={{ marginLeft: 12 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search services, e.g. 'Voter ID'"
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={handleSearch}
        />
      </View>

      {results.length > 0 && (
        <View style={styles.resultsBox}>
          {results.map((item) => (
            <TouchableOpacity key={item.id} style={styles.resultRow} onPress={() => goToService(item.id)}>
              <Text style={styles.resultText}>{item.name}</Text>
              <Text style={styles.resultSub}>{item.department}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={{ marginHorizontal: -20 }}>
        <StateFilterBar />
      </View>

      <FlatList
        key="categories-grid"
        data={categories}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate("CategoryServices", { category: item.name })}
          >
            <Text style={styles.categoryIcon}>{item.icon}</Text>
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No services yet -- seed some via `npm run seed` or add documents to Firestore's "services" collection.
          </Text>
        }
      />
    </View>
  );
}

function getStyles(c) {
  return StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: c.bg },
    center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: c.bg },
    header: { fontSize: 24, fontWeight: "700", marginBottom: 4, color: c.text },
    subHeader: { fontSize: 14, color: c.textSecondary, marginBottom: 14 },
    searchBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 14,
      marginBottom: 8,
    },
    searchInput: { flex: 1, paddingHorizontal: 10, paddingVertical: 12, fontSize: 15, color: c.text },
    resultsBox: {
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 14,
      marginBottom: 8,
      overflow: "hidden",
    },
    resultRow: { padding: 12, borderBottomWidth: 1, borderBottomColor: c.borderSoft },
    resultText: { fontSize: 15, fontWeight: "600", color: c.text },
    resultSub: { fontSize: 12, color: c.textMuted, marginTop: 2 },
    categoryCard: {
      flex: 1,
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 16,
      padding: 16,
      margin: 6,
      alignItems: "center",
      minHeight: 100,
      justifyContent: "center",
    },
    categoryIcon: { fontSize: 28, marginBottom: 6 },
    categoryName: { fontSize: 14, fontWeight: "600", textAlign: "center", color: c.text },
    empty: { color: c.textMuted, marginTop: 20, textAlign: "center" },
  });
}
