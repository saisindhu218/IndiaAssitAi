import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "indiaassist:themeMode"; // "light" | "dark"

// Two coherent palettes sharing the same accent DNA (a cyan + warm-orange
// duo) so switching modes doesn't change the app's personality, just its
// brightness. Dark is the "cyber-corporate" look; light keeps the same
// accents deepened for contrast on a white background.
const PALETTES = {
  dark: {
    mode: "dark",
    bg: "#0B1120",
    bgElevated: "#0F1729",
    surface: "#141D2E",
    surfaceAlt: "#1B2740",
    border: "#243146",
    borderSoft: "#1A2436",
    text: "#F1F5F9",
    textSecondary: "#C3CCDA",
    textMuted: "#8895AB",
    primary: "#22D3EE",
    primarySoft: "rgba(34,211,238,0.14)",
    onPrimary: "#062024",
    secondary: "#F4A261",
    secondarySoft: "rgba(244,162,97,0.16)",
    onSecondary: "#2B1500",
    danger: "#F87171",
    dangerSoft: "rgba(248,113,113,0.14)",
    success: "#34D399",
    successSoft: "rgba(52,211,153,0.14)",
    statusBar: "light",
    overlay: "rgba(0,0,0,0.55)",
  },
  light: {
    mode: "light",
    bg: "#F6F8FB",
    bgElevated: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceAlt: "#F0F4F8",
    border: "#E2E8F0",
    borderSoft: "#EDF1F5",
    text: "#0F172A",
    textSecondary: "#475569",
    textMuted: "#94A3B8",
    primary: "#0891B2",
    primarySoft: "rgba(8,145,178,0.10)",
    onPrimary: "#FFFFFF",
    secondary: "#EA7317",
    secondarySoft: "rgba(234,115,23,0.10)",
    onSecondary: "#FFFFFF",
    danger: "#DC2626",
    dangerSoft: "rgba(220,38,38,0.08)",
    success: "#059669",
    successSoft: "rgba(5,150,105,0.08)",
    statusBar: "dark",
    overlay: "rgba(15,23,42,0.45)",
  },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(Appearance.getColorScheme() === "light" ? "light" : "dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === "light" || saved === "dark") setMode(saved);
      } catch (e) {
        console.warn("Could not load saved theme:", e.message);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const toggleTheme = useCallback(() => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ mode, colors: PALETTES[mode], toggleTheme, ready }),
    [mode, toggleTheme, ready]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
