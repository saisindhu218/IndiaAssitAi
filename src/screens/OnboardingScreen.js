import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";

const PAGES = [
  {
    icon: "business-outline",
    title: "Your guide to government services",
    body: "Find documents, fees, steps and official links for 180+ services -- from Aadhaar and PAN to passports, licences, pensions and farmer schemes.",
  },
  {
    icon: "chatbubbles-outline",
    title: "Ask in your own language",
    body: "Describe what's happening in your life -- a new job, a baby, a lost document -- in English, Hindi or your own language, and get a clear plan.",
  },
  {
    icon: "shield-checkmark-outline",
    title: "Not an official government app",
    body: "We gather information from official sources to help you prepare, but fees and rules change. Always confirm on the official website (.gov.in) before you pay or apply.\n\nNever share OTPs or passwords with anyone -- no government office will ask for them.",
  },
];

export default function OnboardingScreen({ onDone }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const styles = getStyles(colors);
  const [index, setIndex] = useState(0);
  const listRef = useRef(null);
  const isLast = index === PAGES.length - 1;

  function next() {
    if (isLast) {
      onDone();
    } else {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 20 }]}>
      <View style={styles.skipRow}>
        {!isLast ? (
          <TouchableOpacity onPress={onDone} accessibilityRole="button" hitSlop={10}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>

      <FlatList
        ref={listRef}
        data={PAGES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(p) => p.title}
        onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        renderItem={({ item }) => (
          <View style={[styles.page, { width }]}>
            <View style={styles.iconWrap}>
              <Ionicons name={item.icon} size={56} color={colors.primary} />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
      />

      <View style={styles.dots}>
        {PAGES.map((p, i) => (
          <View key={p.title} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={next} accessibilityRole="button">
        <Text style={styles.buttonText}>{isLast ? "I understand -- Get started" : "Next"}</Text>
      </TouchableOpacity>
    </View>
  );
}

function getStyles(c) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: c.bg },
    skipRow: { height: 32, paddingHorizontal: 24, alignItems: "flex-end", justifyContent: "center" },
    skipText: { color: c.textSecondary, fontSize: 14, fontWeight: "600" },
    page: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32 },
    iconWrap: {
      width: 120,
      height: 120,
      borderRadius: 36,
      backgroundColor: c.primarySoft,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 32,
    },
    title: { fontSize: 24, fontWeight: "800", color: c.text, textAlign: "center", marginBottom: 14 },
    body: { fontSize: 15, color: c.textSecondary, textAlign: "center", lineHeight: 23 },
    dots: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: c.border, marginHorizontal: 4 },
    dotActive: { width: 22, backgroundColor: c.primary },
    button: {
      marginHorizontal: 24,
      backgroundColor: c.primary,
      borderRadius: 14,
      paddingVertical: 15,
      alignItems: "center",
    },
    buttonText: { color: c.onPrimary, fontWeight: "700", fontSize: 15 },
  });
}