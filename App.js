import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebase/config";
import RootNavigator from "./src/navigation/RootNavigator";
import LoginScreen from "./src/screens/LoginScreen";
import { StateFilterProvider } from "./src/context/StateFilterContext";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";

function AppInner() {
  const { colors } = useTheme();
  const [user, setUser] = useState(undefined); // undefined = still checking
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.bg }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <StateFilterProvider>
      <StatusBar style={colors.statusBar} />
      {user ? <RootNavigator /> : <LoginScreen />}
    </StateFilterProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
