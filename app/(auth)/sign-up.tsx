import { useSignUp, useOAuth } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  useWarmUpBrowser();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      setError("");
    } catch (err: any) {
      setError(err.errors[0]?.message || "Failed to sign up.");
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/(home)');
      } else {
        setError("Verification pending step required.");
      }
    } catch (err: any) {
      setError(err.errors[0]?.message || "Failed to verify code.");
    }
  };

  const onGoogleAuthPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.replace('/(home)');
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inner}>
        
        {/* Clerk's Web Smart CAPTCHA div anchor */}
        {Platform.OS === 'web' && <View nativeID="clerk-captcha" />}

        {!pendingVerification && (
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#F8FAFC" />
          </TouchableOpacity>
        )}

        <View style={styles.header}>
          <Text style={styles.title}>{pendingVerification ? "Verify Email" : "Create Account"}</Text>
          <Text style={styles.subtitle}>
            {pendingVerification 
              ? `We sent a code to ${emailAddress}`
              : "Join Skillora to build amazing courses"}
          </Text>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {!pendingVerification && (
          <View style={styles.form}>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              placeholderTextColor="#64748B"
              onChangeText={setEmailAddress}
              style={styles.input}
            />
            <TextInput
              value={password}
              placeholder="Password..."
              placeholderTextColor="#64748B"
              secureTextEntry={true}
              onChangeText={setPassword}
              style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.separatorContainer}>
              <View style={styles.separator} />
              <Text style={styles.separatorText}>OR</Text>
              <View style={styles.separator} />
            </View>

            <TouchableOpacity style={styles.googleButton} onPress={onGoogleAuthPress}>
              <Ionicons name="logo-google" size={20} color="#F8FAFC" />
              <Text style={styles.googleButtonText}>Sign up with Google</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <Link href="/(auth)/sign-in" asChild>
                <TouchableOpacity><Text style={styles.linkText}>Sign In</Text></TouchableOpacity>
              </Link>
            </View>
          </View>
        )}

        {pendingVerification && (
          <View style={styles.form}>
            <TextInput
              value={code}
              placeholder="Verification Code..."
              placeholderTextColor="#64748B"
              onChangeText={setCode}
              style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={onPressVerify}>
              <Text style={styles.buttonText}>Verify & Login</Text>
            </TouchableOpacity>
          </View>
        )}

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  inner: { flex: 1, padding: 24, justifyContent: "center" },
  backBtn: { position: 'absolute', top: 20, left: 24, padding: 8, zIndex: 10 },
  header: { marginBottom: 32, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: '800', color: '#F8FAFC', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#94A3B8' },
  errorText: { color: '#EF4444', textAlign: 'center', marginBottom: 16 },
  form: { gap: 16 },
  input: {
    backgroundColor: "rgba(30, 41, 59, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    color: "#F8FAFC",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#8B5CF6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  separatorContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  separator: { flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' },
  separatorText: { color: '#94A3B8', marginHorizontal: 8, fontWeight: '600' },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    gap: 12,
  },
  googleButtonText: { color: '#F8FAFC', fontSize: 16, fontWeight: '700' },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 16, gap: 8 },
  footerText: { color: "#94A3B8", fontSize: 16 },
  linkText: { color: "#8B5CF6", fontSize: 16, fontWeight: "600" },
});
