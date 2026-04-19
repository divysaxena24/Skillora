import { Text, View, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Custom Navbar Component
function Navbar() {
  return (
    <View style={styles.navbar}>
      <View style={styles.navLeft}>
        <View style={styles.logoBadge}>
          <Ionicons name="planet" size={20} color="#FFFFFF" />
        </View>
        <Text style={styles.navBrand}>Skillora</Text>
      </View>
      <TouchableOpacity style={styles.menuButton} activeOpacity={0.7} onPress={() => console.log('Menu opened')}>
        <Ionicons name="grid-outline" size={26} color="#F8FAFC" />
      </TouchableOpacity>
    </View>
  );
}

export default function Index() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  // Dynamically size background circles to be relative to the window size
  const circleSize1 = Math.max(width, height) * 1.2;
  const circleSize2 = Math.max(width, height) * 0.9;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      
      {/* Dynamic Background Decor - updating continuously on resize */}
      <View style={[
        styles.circle1, 
        { 
          width: circleSize1, 
          height: circleSize1, 
          borderRadius: circleSize1 / 2,
          top: -circleSize1 * 0.3,
          left: -circleSize1 * 0.2
        }
      ]} />
      <View style={[
        styles.circle2, 
        { 
          width: circleSize2, 
          height: circleSize2, 
          borderRadius: circleSize2 / 2,
          bottom: -circleSize2 * 0.2,
          right: -circleSize2 * 0.2
        }
      ]} />
      
      <Navbar />

      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View style={styles.responsiveContentWrapper}>
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Ionicons name="sparkles" size={42} color="#A78BFA" />
            </View>

            <Text style={styles.title}>Welcome to <Text style={styles.brand}>Skillora</Text></Text>
            <Text style={styles.subtitle}>
              The smartest AI-powered course builder. Design, create, and launch intelligent courses in minutes.
            </Text>

            <View style={styles.features}>
              <FeatureItem icon="flash" title="Quick AI Generation" />
              <FeatureItem icon="school" title="Smart Curriculum" />
              <FeatureItem icon="stats-chart" title="Deep Analytics" />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => console.log("Get Started!")}>
              <Text style={styles.buttonText}>Get Started Now</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureItem({ icon, title }: { icon: any, title: string }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIcon}>
        <Ionicons name={icon} size={22} color="#A78BFA" />
      </View>
      <Text style={styles.featureText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  // Navbar Styles
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 16,
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  navLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  navBrand: {
    fontSize: 22,
    fontWeight: "800",
    color: "#F8FAFC",
    letterSpacing: -0.5,
  },
  menuButton: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  // Main Layout Styles
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  responsiveContentWrapper: {
    flex: 1,
    width: "100%",
    maxWidth: 480, // Restricts width on larger tablets and web browsers
    justifyContent: "space-between", 
  },
  circle1: {
    position: "absolute",
    backgroundColor: "rgba(139, 92, 246, 0.08)",
  },
  circle2: {
    position: "absolute",
    backgroundColor: "rgba(56, 189, 248, 0.06)",
  },
  content: {
    alignItems: "center",
    marginTop: Platform.OS === 'web' ? 20 : 30, // Adjusted margins since navbar takes space
    zIndex: 1,
    width: "100%",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "rgba(139, 92, 246, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.3)",
  },
  title: {
    fontSize: Platform.OS === 'web' ? 46 : 40,
    fontWeight: "800",
    color: "#F8FAFC",
    textAlign: "center",
    letterSpacing: -1,
    marginBottom: 16,
  },
  brand: {
    color: "#A78BFA",
  },
  subtitle: {
    fontSize: Platform.OS === 'web' ? 18 : 16,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  features: {
    alignSelf: "stretch",
    gap: 16,
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(30, 41, 59, 0.6)",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(139, 92, 246, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#E2E8F0",
  },
  buttonContainer: {
    width: "100%",
    paddingBottom: 20,
    zIndex: 1,
    marginTop: "auto",
  },
  button: {
    backgroundColor: "#8B5CF6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 100,
    width: "100%",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 8,
  },
});
