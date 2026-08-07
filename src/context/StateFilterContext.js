import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { INDIAN_STATES } from "../data/indianStates";

const STORAGE_KEY = "indiaassist:selectedState";

const StateFilterContext = createContext(null);

export function StateFilterProvider({ children }) {
  const [selectedState, setSelectedStateRaw] = useState(null);
  const [ready, setReady] = useState(false);
  const [detecting, setDetecting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setSelectedStateRaw(saved);
      } catch (e) {
        console.warn("Could not load saved state filter:", e.message);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const setSelectedState = useCallback(async (state) => {
    setSelectedStateRaw(state);
    try {
      if (state) await AsyncStorage.setItem(STORAGE_KEY, state);
      else await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Could not save state filter:", e.message);
    }
  }, []);

  /**
   * Try to detect the user's state from device location. Returns the
   * detected state name on success, or throws with a human-readable
   * message on failure (permission denied, no GPS, region not
   * recognized, etc.) so the caller can show it and fall back to the
   * manual picker.
   */
  const detectFromLocation = useCallback(async () => {
    setDetecting(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Location permission was denied. Pick your state manually instead.");
      }

      const position = await Location.getCurrentPositionAsync({});
      const results = await Location.reverseGeocodeAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      const region = results?.[0]?.region;
      if (!region) {
        throw new Error("Couldn't determine your state from location. Pick it manually instead.");
      }

      // The device's reverse-geocoder usually returns the state name
      // directly, but match it against our known list defensively in
      // case of minor naming differences.
      const match = INDIAN_STATES.find(
        (s) => s.toLowerCase() === region.toLowerCase() || region.toLowerCase().includes(s.toLowerCase())
      );
      const finalState = match || region;

      await setSelectedState(finalState);
      return finalState;
    } finally {
      setDetecting(false);
    }
  }, [setSelectedState]);

  return (
    <StateFilterContext.Provider
      value={{ selectedState, setSelectedState, ready, detecting, detectFromLocation }}
    >
      {children}
    </StateFilterContext.Provider>
  );
}

export function useStateFilter() {
  const ctx = useContext(StateFilterContext);
  if (!ctx) throw new Error("useStateFilter must be used within a StateFilterProvider");
  return ctx;
}
