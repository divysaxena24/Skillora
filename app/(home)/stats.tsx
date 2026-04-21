import { View, Text, StyleSheet } from "react-native";
import { BarChart2 } from "lucide-react-native";

export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <BarChart2 size={64} color="rgba(139, 92, 246, 0.3)" />
      <Text style={styles.title}>Course Statistics</Text>
      <Text style={styles.subtitle}>Deep analytical insights regarding your user progress and active enrollee growth.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A", justifyContent: "center", alignItems: "center", padding: 24 },
  title: { fontSize: 24, fontWeight: "800", color: "#F8FAFC", marginTop: 24, marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#94A3B8", textAlign: "center", lineHeight: 24 },
});
