import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
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
        <Text style={styles.title}>{service.name}</Text>
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
          <BulletList items={service.officialLinks} styles={styles} />
        </Section>

        <Text style={styles.updated}>Last updated: {service.lastUpdated}</Text>
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
  });
}
