// Local reminder notifications (no server needed).
// When a reminder is saved we schedule two phone notifications:
//   - 9:00 AM the day before the due date
//   - 9:00 AM on the due date
// Scheduled ids are remembered on the phone so they can be cancelled when a
// reminder is deleted.
//
// Expo Go on Android (SDK 53+) cannot load expo-notifications at all -- merely
// importing it crashes the app. So the package is loaded lazily and skipped in
// Expo Go; reminders still save normally, they just don't ring. In an
// installed build (APK/AAB or development build) alerts work fully.

import { Platform } from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MAP_KEY = "indiaassist:reminderNotifs:v1";
const CHANNEL_ID = "reminders";
const NOTIFY_HOUR = 9;

const IS_EXPO_GO =
  Constants.executionEnvironment === "storeClient" || Constants.appOwnership === "expo";

let Notifications = null;
let triedLoading = false;

function getNotifications() {
  if (triedLoading) return Notifications;
  triedLoading = true;
  if (IS_EXPO_GO && Platform.OS === "android") return null;
  try {
    // eslint-disable-next-line global-require
    Notifications = require("expo-notifications");
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  } catch (e) {
    console.warn("expo-notifications unavailable:", e.message);
    Notifications = null;
  }
  return Notifications;
}

async function readMap() {
  try {
    return JSON.parse((await AsyncStorage.getItem(MAP_KEY)) || "{}");
  } catch (e) {
    return {};
  }
}

async function writeMap(map) {
  try {
    await AsyncStorage.setItem(MAP_KEY, JSON.stringify(map));
  } catch (e) {
    // non-critical
  }
}

async function ensureSetup(N) {
  if (Platform.OS === "android") {
    await N.setNotificationChannelAsync(CHANNEL_ID, {
      name: "Reminders",
      importance: N.AndroidImportance.HIGH,
    });
  }
  const current = await N.getPermissionsAsync();
  if (current.granted) return true;
  const asked = await N.requestPermissionsAsync();
  return !!asked.granted;
}

function atNine(dateStr, offsetDays = 0) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d + offsetDays, NOTIFY_HOUR, 0, 0);
}

/**
 * Schedule notifications for a reminder.
 * Returns { scheduled, permissionDenied, unsupported }.
 */
export async function scheduleReminderNotifications(reminderId, { title, dueDate, note }) {
  const N = getNotifications();
  if (!N) return { scheduled: 0, permissionDenied: false, unsupported: true };

  try {
    const allowed = await ensureSetup(N);
    if (!allowed) return { scheduled: 0, permissionDenied: true, unsupported: false };

    const now = Date.now();
    const plan = [
      { when: atNine(dueDate, -1), heading: "Due tomorrow", body: title },
      { when: atNine(dueDate, 0), heading: "Due today", body: title },
    ].filter((p) => p.when.getTime() > now);

    const triggerType = N.SchedulableTriggerInputTypes?.DATE ?? "date";
    const ids = [];
    for (const p of plan) {
      const id = await N.scheduleNotificationAsync({
        content: {
          title: `Reminder: ${p.heading}`,
          body: note ? `${p.body} -- ${note}` : p.body,
        },
        trigger: { type: triggerType, date: p.when, channelId: CHANNEL_ID },
      });
      ids.push(id);
    }

    if (ids.length) {
      const map = await readMap();
      map[reminderId] = ids;
      await writeMap(map);
    }
    return { scheduled: ids.length, permissionDenied: false, unsupported: false };
  } catch (e) {
    console.warn("Could not schedule notifications:", e.message);
    return { scheduled: 0, permissionDenied: false, unsupported: false };
  }
}

export async function cancelReminderNotifications(reminderId) {
  const N = getNotifications();
  if (!N) return;
  try {
    const map = await readMap();
    const ids = map[reminderId] || [];
    await Promise.all(ids.map((id) => N.cancelScheduledNotificationAsync(id)));
    delete map[reminderId];
    await writeMap(map);
  } catch (e) {
    console.warn("Could not cancel notifications:", e.message);
  }
}

export async function cancelAllReminderNotifications() {
  const N = getNotifications();
  if (!N) return;
  try {
    await N.cancelAllScheduledNotificationsAsync();
    await AsyncStorage.removeItem(MAP_KEY);
  } catch (e) {
    // non-critical
  }
}