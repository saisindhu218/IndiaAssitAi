import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebase/config";
import RootNavigator from "./src/navigation/RootNavigator";
import LoginScreen from "./src/screens/LoginScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import { StateFilterProvider } from "./src/context/StateFilterContext";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";
import ErrorBoundary from "./src/components/ErrorBoundary";
import ProfileStateSync from "./src/components/ProfileStateSync";

function AppInner() {
  const { colors } = useTheme();
  const [user, setUser] = useState(undefined); // undefined = still checking
  const [initializing, setInitializing] = useState(true);
  const [onboarded, setOnboarded] = useState(undefined); // undefined = still checking

  useEffect(() => {
    AsyncStorage.getItem("indiaassist:onboarded:v1")
      .then((value) => setOnboarded((already) => already === true || value === "yes"))
      .catch(() => setOnboarded(true)); // never trap someone on this screen
  }, []);

  function finishOnboarding() {
    setOnboarded(true);
    AsyncStorage.setItem("indiaassist:onboarded:v1", "yes").catch(() => {});
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setInitializing(false);
      // Someone who is already signed in doesn't need the welcome screens
      // (and shouldn't get them after signing out).
      if (u) {
        setOnboarded(true);
        AsyncStorage.setItem("indiaassist:onboarded:v1", "yes").catch(() => {});
      }
    });
    return unsubscribe;
  }, []);

  if (initializing || onboarded === undefined) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.bg }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <StateFilterProvider>
      <StatusBar style={colors.statusBar} />
      {user && <ProfileStateSync uid={user.uid} />}
      {user ? (
        <RootNavigator />
      ) : onboarded ? (
        <LoginScreen />
      ) : (
        <OnboardingScreen onDone={finishOnboarding} />
      )}
    </StateFilterProvider>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppInner />
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}