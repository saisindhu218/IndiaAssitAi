import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { matchStates } from "../data/indianStates";

// A text box that suggests Indian states as you type.
//   typing "a"  -> every state starting with A, then the other matches
//   tap a state -> it fills the box
// `value` is the text in the box; `onChange` receives the new text.
export default function StatePicker({ value, onChange, placeholder = "Type to search, e.g. Kar..." }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [focused, setFocused] = useState(false);

  const suggestions = matchStates(value);
  const isExact = suggestions.length === 1 && suggestions[0].toLowerCase() === String(value || "").trim().toLowerCase();
  const showList = focused && !isExact;

  function pick(state) {
    onChange(state);
    setFocused(false);
    Keyboard.dismiss();
  }

  return (
    <View>
      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)} // lets a tap on a suggestion register first
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          autoCapitalize="words"
          autoCorrect={false}
          accessibilityLabel="State"
        />
        {!!value && (
          <TouchableOpacity
            style={styles.clear}
            onPress={() => {
              onChange("");
              setFocused(true);
            }}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Clear state"
          >
            <Ionicons name="close-circle" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {showList && (
        <View style={styles.list}>
          {suggestions.length === 0 ? (
            <Text style={styles.empty}>No state matches "{String(value).trim()}"</Text>
          ) : (
            <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled" style={{ maxHeight: 220 }}>
              {suggestions.map((state) => (
                <TouchableOpacity key={state} style={styles.row} onPress={() => pick(state)} accessibilityRole="button">
                  <Ionicons name="location-outline" size={15} color={colors.primary} style={{ marginRight: 8 }} />
                  <Text style={styles.rowText}>{state}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
}

function getStyles(c) {
  return StyleSheet.create({
    inputWrap: { position: "relative" },
    input: {
      backgroundColor: c.bg,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      paddingRight: 40,
      fontSize: 15,
      color: c.text,
    },
    clear: { position: "absolute", right: 12, top: 13 },
    list: {
      marginTop: 6,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 12,
      backgroundColor: c.bgElevated,
      overflow: "hidden",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 14,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
    },
    rowText: { fontSize: 14, color: c.text },
    empty: { padding: 14, fontSize: 13, color: c.textMuted },
  });
}
