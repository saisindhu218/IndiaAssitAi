import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";

// Bottom sheet that asks "what is wrong?" with a few tappable reasons.
// Used to report a bad AI answer or incorrect service information.
//
// Normally it opens as its own Modal. Pass `asOverlay` when it is shown from
// INSIDE another Modal (e.g. the service chat) so two Modals don't stack.
export default function ReportSheet({ visible, title, subtitle, reasons, onSelect, onClose, asOverlay = false }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getStyles(colors);
  if (!visible) return null;

  const sheet = (
    <View style={styles.backdrop}>
      <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />
      <View style={[styles.sheet, { paddingBottom: 16 + insets.bottom }]}>
        <Text style={styles.title}>{title}</Text>
        {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        {reasons.map((reason) => (
          <TouchableOpacity
            key={reason}
            style={styles.row}
            activeOpacity={0.7}
            onPress={() => onSelect(reason)}
            accessibilityRole="button"
          >
            <Text style={styles.rowText}>{reason}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.cancel} onPress={onClose} accessibilityRole="button">
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (asOverlay) {
    return <View style={StyleSheet.absoluteFill}>{sheet}</View>;
  }
  return (
    <Modal visible transparent animationType="slide" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      {sheet}
    </Modal>
  );
}

function getStyles(c) {
  return StyleSheet.create({
    backdrop: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" },
    sheet: {
      backgroundColor: c.bgElevated,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 16,
    },
    title: { fontSize: 17, fontWeight: "700", color: c.text },
    subtitle: { fontSize: 12, color: c.textMuted, marginTop: 4, marginBottom: 6, lineHeight: 17 },
    row: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: c.border },
    rowText: { fontSize: 15, color: c.text },
    cancel: { paddingVertical: 14, alignItems: "center", marginTop: 4 },
    cancelText: { fontSize: 15, fontWeight: "600", color: c.textMuted },
  });
}