import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { getServiceById, mergeServiceForState } from "../firebase/firestore";
import ChatBox from "../components/ChatBox";
import StateFilterBar from "../components/StateFilterBar";
import { useStateFilter } from "../context/StateFilterContext";

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function BulletList({ items }) {
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
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!service) {
    return (
      <View style={styles.center}>
        <Text>Service not found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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

        <Section title="Overview">
          <Text style={styles.text}>{service.overview}</Text>
        </Section>

        <Section title="Eligibility">
          <Text style={styles.text}>{service.eligibility}</Text>
        </Section>

        <Section title="Required Documents">
          <BulletList items={service.documents} />
        </Section>

        <Section title="Fees">
          {Object.entries(service.fees || {}).map(([k, v]) => (
            <Text key={k} style={styles.text}>
              {k.charAt(0).toUpperCase() + k.slice(1)}: {v}
            </Text>
          ))}
        </Section>

        <Section title="Processing Time">
          <Text style={styles.text}>{service.processingTime}</Text>
        </Section>

        <Section title="Online Process">
          {(service.onlineSteps || []).map((step, i) => (
            <Text key={i} style={styles.step}>
              {i + 1}. {step}
            </Text>
          ))}
        </Section>

        <Section title="Offline Process">
          {(service.offlineSteps || []).map((step, i) => (
            <Text key={i} style={styles.step}>
              {i + 1}. {step}
            </Text>
          ))}
        </Section>

        <Section title="Common Mistakes to Avoid">
          <BulletList items={service.commonMistakes} />
        </Section>

        <Section title="FAQs">
          {(service.faqs || []).map((f, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <Text style={styles.faqQ}>Q: {f.q}</Text>
              <Text style={styles.faqA}>A: {f.a}</Text>
            </View>
          ))}
        </Section>

        <Section title="Official Links">
          <BulletList items={service.officialLinks} />
        </Section>

        <Text style={styles.updated}>Last updated: {service.lastUpdated}</Text>
      </ScrollView>

      {/* Context-aware assistant, scoped to this exact service */}
      <ChatBox service={service} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 100 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "700" },
  department: { fontSize: 13, color: "#0B5FFF", fontWeight: "600", marginTop: 4, marginBottom: 16 },
  stateNote: { fontSize: 12, color: "#0B5FFF", backgroundColor: "#EAF1FF", padding: 10, borderRadius: 10, marginBottom: 16 },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 15, fontWeight: "700", marginBottom: 6, color: "#111" },
  text: { fontSize: 14, color: "#333", lineHeight: 21 },
  bullet: { fontSize: 14, color: "#333", lineHeight: 22 },
  step: { fontSize: 14, color: "#333", lineHeight: 22 },
  faqQ: { fontSize: 14, fontWeight: "600", color: "#111" },
  faqA: { fontSize: 14, color: "#555", marginTop: 2 },
  updated: { fontSize: 11, color: "#999", marginTop: 10 },
});
