import React, { useState, useMemo } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStateFilter } from "../context/StateFilterContext";
import { INDIAN_STATES } from "../data/indianStates";
import { useTheme } from "../theme/ThemeContext";

export default function StateFilterBar() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { selectedState, setSelectedState, detecting, detectFromLocation } = useStateFilter();
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  const filteredStates = useMemo(
    () => INDIAN_STATES.filter((s) => s.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  async function handleUseLocation() {
    try {
      const state = await detectFromLocation();
      setModalVisible(false);
      Alert.alert("State detected", `Showing results for ${state}.`);
    } catch (e) {
      Alert.alert("Couldn't detect location", e.message);
    }
  }

  function handlePick(state) {
    setSelectedState(state);
    setSearch("");
    setModalVisible(false);
  }

  return (
    <>
      <TouchableOpacity style={styles.bar} onPress={() => setModalVisible(true)}>
        <Ionicons name="location-outline" size={16} color={colors.primary} />
        <Text style={styles.barText} numberOfLines={1}>
          {selectedState ? `Showing for: ${selectedState}` : "Set your state for accurate fees & links"}
        </Text>
        <Ionicons name="chevron-down" size={14} color={colors.primary} />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose your state</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.locationBtn} onPress={handleUseLocation} disabled={detecting}>
              {detecting ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Ionicons name="navigate-outline" size={16} color={colors.primary} />
              )}
              <Text style={styles.locationBtnText}>{detecting ? "Detecting..." : "Use my current location"}</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.search}
              placeholder="Search states..."
              placeholderTextColor={colors.textMuted}
              value={search}
              onChangeText={setSearch}
            />

            <FlatList
              data={filteredStates}
              keyExtractor={(item) => item}
              style={{ maxHeight: 360 }}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.stateRow} onPress={() => handlePick(item)}>
                  <Text style={styles.stateRowText}>{item}</Text>
                  {selectedState === item && <Ionicons name="checkmark" size={18} color={colors.primary} />}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

function getStyles(c) {
  return StyleSheet.create({
    bar: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: c.primarySoft,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginHorizontal: 16,
      marginBottom: 8,
      gap: 6,
    },
    barText: { flex: 1, fontSize: 12, color: c.primary, fontWeight: "600" },
    modalBackdrop: { flex: 1, backgroundColor: c.overlay, justifyContent: "flex-end" },
    modalCard: { backgroundColor: c.bgElevated, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: "80%" },
    modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
    modalTitle: { fontSize: 18, fontWeight: "700", color: c.text },
    locationBtn: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: c.primarySoft,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 14,
      marginBottom: 12,
      gap: 8,
    },
    locationBtnText: { color: c.primary, fontWeight: "700", fontSize: 13 },
    search: {
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 15,
      marginBottom: 10,
      color: c.text,
    },
    stateRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: c.borderSoft,
    },
    stateRowText: { fontSize: 15, color: c.text },
  });
}
