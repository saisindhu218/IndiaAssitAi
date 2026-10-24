import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Share,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getServiceById, mergeServiceForState } from "../firebase/firestore";
import ChatBox from "../components/ChatBox";
import StateFilterBar from "../components/StateFilterBar";
import { useStateFilter } from "../context/StateFilterContext";
import { useTheme } from "../theme/ThemeContext";

function Section({ title, children, styles }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function BulletList({ items, styles }) {
  return (
    <View>
      {(items || []).map((item, i) => (
        <Text key={i} style={styles.bullet}>
          •  {item}
        </Text>
      ))}
    </View>
  );
}

function LinkList({ items, styles }) {
  async function open(url) {
    try {
      await Linking.openURL(url);
    } catch (e) {
      Alert.alert("Couldn't open link", url);
    }
  }
  return (
    <View>
      {(items || []).map((url, i) => (
        <TouchableOpacity key={i} onPress={() => open(url)} style={styles.linkRow} activeOpacity={0.7}>
          <Ionicons name="open-outline" size={16} color={styles.linkText.color} style={{ marginRight: 8 }} />
          <Text style={styles.linkText} numberOfLines={1}>
            {String(url).replace(/^https?:\/\//, "")}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// "YYYY-MM-DD" or any parseable date -> whole days since then (null if unknown)
function daysSince(dateStr) {
  const t = new Date(dateStr).getTime();
  if (!dateStr || Number.isNaN(t)) return null;
  return Math.floor((Date.now() - t) / (24 * 60 * 60 * 1000));
}

function buildShareText(service) {
  const lines = [
    `${service.name} (${service.department})`,
    "",
    service.overview,
    "",
    `Documents: ${(service.documents || []).slice(0, 6).join(", ")}`,
  ];
  if (service.officialLinks?.[0]) lines.push("", `Official site: ${service.officialLinks[0]}`);
  lines.push("", "Shared from IndiaAssist AI. Always verify on the official website.");
  return lines.join("\n");
}

export default function ServiceDetailScreen({ route }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { serviceId } = route.params;
  const [rawService, setRawService] = useState(null);
  const [loading, setLoading] = useState(true);
  const { selectedState } = useStateFilter();

  useEffect(() => {
    (async () => {
      const s = await getServiceById(serviceId);
      setRawService(s);
      setLoading(false);
    })();
  }, [serviceId]);

  const service = mergeServiceForState(rawService, selectedState);

  async function handleShare() {
    try {
      await Share.share({ message: buildShareText(service) });
    } catch (e) {
      // user dismissed the share sheet -- nothing to do
    }
  }
  const ageDays = daysSince(service?.lastUpdated);
  const maybeOutdated = ageDays !== null && ageDays > 180;
  const hasStateOverride = !!rawService?.stateOverrides?.[selectedState];

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!service) {
    return (
      <View style={styles.center}>
        <Text style={{ color: colors.text }}>Service not found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { flex: 1 }]}>{service.name}</Text>
          <TouchableOpacity onPress={handleShare} hitSlop={10} style={styles.shareBtn}>
            <Ionicons name="share-social-outline" size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.department}>{service.department}</Text>

        <View style={{ marginHorizontal: -20, marginBottom: 8 }}>
          <StateFilterBar />
        </View>
        {hasStateOverride && (
          <Text style={styles.stateNote}>
            Showing details specific to {selectedState}. Other states may use a different portal or fee.
          </Text>
        )}

        <Section title="Overview" styles={styles}>
          <Text style={styles.text}>{service.overview}</Text>
        </Section>

        <Section title="Eligibility" styles={styles}>
          <Text style={styles.text}>{service.eligibility}</Text>
        </Section>

        <Section title="Required Documents" styles={styles}>
          <BulletList items={service.documents} styles={styles} />
        </Section>

        <Section title="Fees" styles={styles}>
          {Object.entries(service.fees || {}).map(([k, v]) => (
            <Text key={k} style={styles.text}>
              {k.charAt(0).toUpperCase() + k.slice(1)}: {v}
            </Text>
          ))}
        </Section>

        <Section title="Processing Time" styles={styles}>
          <Text style={styles.text}>{service.processingTime}</Text>
        </Section>

        <Section title="Online Process" styles={styles}>
          {(service.onlineSteps || []).map((step, i) => (
            <Text key={i} style={styles.step}>
              {i + 1}. {step}
            </Text>
          ))}
        </Section>

        <Section title="Offline Process" styles={styles}>
          {(service.offlineSteps || []).map((step, i) => (
            <Text key={i} style={styles.step}>
              {i + 1}. {step}
            </Text>
          ))}
        </Section>

        <Section title="Common Mistakes to Avoid" styles={styles}>
          <BulletList items={service.commonMistakes} styles={styles} />
        </Section>

        <Section title="FAQs" styles={styles}>
          {(service.faqs || []).map((f, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <Text style={styles.faqQ}>Q: {f.q}</Text>
              <Text style={styles.faqA}>A: {f.a}</Text>
            </View>
          ))}
        </Section>

        <Section title="Official Links" styles={styles}>
          <LinkList items={service.officialLinks} styles={styles} />
        </Section>

        <Text style={styles.updated}>Last updated: {service.lastUpdated}</Text>
        {maybeOutdated && (
          <Text style={styles.outdated}>
            This information was last checked over {Math.floor(ageDays / 30)} months ago. Fees and
            rules can change -- please confirm on the official website above.
          </Text>
        )}
        <View style={styles.disclaimer}>
          <Ionicons name="shield-checkmark-outline" size={16} color={colors.textMuted} style={{ marginRight: 8, marginTop: 2 }} />
          <Text style={styles.disclaimerText}>
            IndiaAssist AI is not an official government app. Information is gathered from official
            sources to help you prepare, but always verify fees and rules on the official website.
            Never share OTPs or passwords with anyone.
          </Text>
        </View>
      </ScrollView>

      {/* Context-aware assistant, scoped to this exact service */}
      <ChatBox service={service} />
    </View>
  );
}

function getStyles(c) {
  return StyleSheet.create({
    container: { padding: 20, paddingBottom: 100 },
    center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: c.bg },
    title: { fontSize: 22, fontWeight: "700", color: c.text },
    department: { fontSize: 13, color: c.primary, fontWeight: "600", marginTop: 4, marginBottom: 16 },
    stateNote: {
      fontSize: 12,
      color: c.primary,
      backgroundColor: c.primarySoft,
      padding: 10,
      borderRadius: 10,
      marginBottom: 16,
    },
    section: { marginBottom: 18 },
    sectionTitle: { fontSize: 15, fontWeight: "700", marginBottom: 6, color: c.text },
    text: { fontSize: 14, color: c.textSecondary, lineHeight: 21 },
    bullet: { fontSize: 14, color: c.textSecondary, lineHeight: 22 },
    step: { fontSize: 14, color: c.textSecondary, lineHeight: 22 },
    faqQ: { fontSize: 14, fontWeight: "600", color: c.text },
    faqA: { fontSize: 14, color: c.textSecondary, marginTop: 2 },
    updated: { fontSize: 11, color: c.textMuted, marginTop: 10 },
    titleRow: { flexDirection: "row", alignItems: "flex-start" },
    shareBtn: { paddingLeft: 12, paddingTop: 2 },
    linkRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
    linkText: { fontSize: 14, color: c.primary, textDecorationLine: "underline", flexShrink: 1 },
    outdated: {
      fontSize: 12,
      color: c.danger,
      backgroundColor: c.primarySoft,
      padding: 10,
      borderRadius: 10,
      marginTop: 10,
      lineHeight: 18,
    },
    disclaimer: {
      flexDirection: "row",
      marginTop: 14,
      padding: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: c.border,
    },
    disclaimerText: { flex: 1, fontSize: 11, color: c.textMuted, lineHeight: 16 },
  });
}