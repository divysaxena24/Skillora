import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeDashboard() {
  const { user, isLoaded } = useUser();

  // Background Database Sync: Triggers solely when verified users mount the dashboard
  useEffect(() => {
    if (isLoaded && user) {
      // Platform URL inference because bare `/api` requests fail natively
      const baseUrl = Platform.OS === 'web' 
        ? '' 
        : (process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8081');
      
      fetch(`${baseUrl}/api/user/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName || user.firstName || 'Creator',
        })
      })
      .then(res => res.json())
      .then(data => console.log('Client DB Sync Log:', data))
      .catch(err => console.error('Database API Synchronization failed:', err));
    }
  }, [isLoaded, user]);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.welcomeCard}>
        <Text style={styles.greeting}>Hello, {user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] || 'Creator'} 👋</Text>
        <Text style={styles.subGreeting}>Your AI courses await. What are we building today?</Text>
      </View>
      
      <View style={styles.emptyState}>
        <Ionicons name="book-outline" size={64} color="rgba(139, 92, 246, 0.3)" />
        <Text style={styles.emptyStateTitle}>No Courses Yet</Text>
        <Text style={styles.emptyStateSub}>Click below to generate your first curriculum.</Text>
        <TouchableOpacity style={styles.generateBtn}>
          <Text style={styles.generateBtnText}>+ Create New Course</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
  },
  welcomeCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  subGreeting: {
    fontSize: 16,
    color: '#94A3B8',
    lineHeight: 24,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F8FAFC',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSub: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 24,
  },
  generateBtn: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
  },
  generateBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
