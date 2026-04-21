import { Tabs } from "expo-router";
import Navbar from "../../components/Navbar";
import { LayoutDashboard, ListTodo, BarChart2, User } from "lucide-react-native";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function HomeLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#0F172A" }}>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          header: () => <Navbar />,
          tabBarActiveTintColor: "#8B5CF6",
          tabBarInactiveTintColor: "#64748B",
          sceneStyle: { backgroundColor: "#0F172A" },
          tabBarStyle: {
            backgroundColor: "#0F172A",
            borderTopColor: "rgba(255, 255, 255, 0.05)",
            borderTopWidth: 1,
            elevation: 0,
            shadowOpacity: 0,
            height: 64,
            paddingBottom: 10,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            marginBottom: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color }) => <LayoutDashboard size={24} color={color} strokeWidth={2.5} />,
          }}
        />
        <Tabs.Screen
          name="tasks"
          options={{
            title: "Tasks",
            tabBarIcon: ({ color }) => <ListTodo size={24} color={color} strokeWidth={2.5} />,
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            title: "Stats",
            tabBarIcon: ({ color }) => <BarChart2 size={24} color={color} strokeWidth={2.5} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <User size={24} color={color} strokeWidth={2.5} />,
          }}
        />
      </Tabs>
    </View>
  );
}
