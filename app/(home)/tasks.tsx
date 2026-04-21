import { View, Text, StyleSheet } from "react-native";
import { ListTodo } from "lucide-react-native";

export default function TasksScreen() {
  return (
    <View style={styles.container}>
      <ListTodo size={64} color="rgba(139, 92, 246, 0.3)" />
      <Text style={styles.title}>Tasks Management</Text>
      <Text style={styles.subtitle}>Your pending and active course generation tasks will securely appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A", justifyContent: "center", alignItems: "center", padding: 24 },
  title: { fontSize: 24, fontWeight: "800", color: "#F8FAFC", marginTop: 24, marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#94A3B8", textAlign: "center", lineHeight: 24 },
});
