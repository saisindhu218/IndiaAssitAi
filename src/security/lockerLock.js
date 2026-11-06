// Optional lock for the Document Locker.
// When switched on (Profile -> menu -> "Lock Document Locker"), documents stay
// hidden until the person unlocks with their fingerprint / face / phone PIN.
// It re-locks automatically whenever the app goes to the background.
//
// Requires:  npx expo install expo-local-authentication

import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "indiaassist:lockerLock:v1";

export async function isLockEnabled() {
  try {
    return (await AsyncStorage.getItem(KEY)) === "on";
  } catch (e) {
    return false;
  }
}

export async function setLockEnabled(on) {
  try {
    if (on) await AsyncStorage.setItem(KEY, "on");
    else await AsyncStorage.removeItem(KEY);
  } catch (e) {
    // non-critical
  }
}

// True if the phone has a screen lock (PIN / pattern / password / biometrics).
export async function canUseDeviceAuth() {
  try {
    const level = await LocalAuthentication.getEnrolledLevelAsync();
    return level > LocalAuthentication.SecurityLevel.NONE;
  } catch (e) {
    return false;
  }
}

// Shows the system fingerprint / face / PIN prompt. Resolves true on success.
export async function authenticate(promptMessage) {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage,
      cancelLabel: "Cancel",
      disableDeviceFallback: false, // allow the phone PIN if the fingerprint fails
    });
    return !!result.success;
  } catch (e) {
    return false;
  }
}