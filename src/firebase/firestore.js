// Generic data-access layer.
// IMPORTANT: There is exactly ONE code path for reading/writing a "service",
// no matter which of the 100+ services it is. Adding a new service later
// means adding a Firestore document -- never writing new screens or code.

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "./config";
import { SAMPLE_SERVICES } from "../data/sampleServices";
import { SAMPLE_JOURNEYS } from "../data/sampleJourneys";

const USE_LOCAL_FALLBACK = true; // flips to false once you've seeded Firestore

// ---- Services ----

export async function getAllServices() {
  try {
    const snap = await getDocs(collection(db, "services"));
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    }
  } catch (e) {
    console.warn("Falling back to local sample services:", e.message);
  }
  if (USE_LOCAL_FALLBACK) return SAMPLE_SERVICES;
  return [];
}

export async function getServicesByCategory(category) {
  const all = await getAllServices();
  return all.filter((s) => s.category === category);
}

export async function getServiceById(serviceId) {
  try {
    const ref = doc(db, "services", serviceId);
    const snap = await getDoc(ref);
    if (snap.exists()) return { id: snap.id, ...snap.data() };
  } catch (e) {
    console.warn("Falling back to local sample service:", e.message);
  }
  if (USE_LOCAL_FALLBACK) {
    return SAMPLE_SERVICES.find((s) => s.id === serviceId) || null;
  }
  return null;
}

export async function getCategories() {
  const all = await getAllServices();
  const seen = new Map();
  all.forEach((s) => {
    if (!seen.has(s.category)) {
      seen.set(s.category, { name: s.category, icon: s.categoryIcon || "📁" });
    }
  });
  return Array.from(seen.values());
}

/**
 * Apply a state's overrides (if any) on top of a service's generic,
 * India-wide content. Services that vary by state can carry an optional
 * `stateOverrides` object keyed by state name, e.g.:
 *   stateOverrides: { "Karnataka": { fees: {...}, officialLinks: [...] } }
 * Fields not present in the override fall back to the generic values, so
 * a state only needs to specify what's actually different there.
 */
export function mergeServiceForState(service, state) {
  if (!service || !state || !service.stateOverrides?.[state]) return service;
  return { ...service, ...service.stateOverrides[state] };
}

// ---- Journeys ----

export async function getAllJourneys() {
  try {
    const snap = await getDocs(collection(db, "journeys"));
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    }
  } catch (e) {
    console.warn("Falling back to local sample journeys:", e.message);
  }
  if (USE_LOCAL_FALLBACK) return SAMPLE_JOURNEYS;
  return [];
}

export async function getJourneyById(journeyId) {
  const all = await getAllJourneys();
  return all.find((j) => j.id === journeyId) || null;
}

// ---- User Profile ----
// Personal, non-sensitive profile fields only (name/age/state/occupation).
// Do NOT extend this with Aadhaar/PAN numbers -- see README's DPDP Act note.

export async function getUserProfile(uid) {
  if (!uid) return null;
  try {
    const ref = doc(db, "profiles", uid);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null;
  } catch (e) {
    console.warn("Could not load profile:", e.message);
    return null;
  }
}

export async function saveUserProfile(uid, data) {
  if (!uid) throw new Error("No signed-in user.");
  const ref = doc(db, "profiles", uid);
  await setDoc(ref, data, { merge: true });
  return data;
}

// ---- Reminders ----
// Stored as a subcollection per user: profiles/{uid}/reminders/{id}

export async function getUserReminders(uid) {
  if (!uid) return [];
  try {
    const snap = await getDocs(collection(db, "profiles", uid, "reminders"));
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    list.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    return list;
  } catch (e) {
    console.warn("Could not load reminders:", e.message);
    return [];
  }
}

export async function addUserReminder(uid, { title, dueDate, note }) {
  if (!uid) throw new Error("No signed-in user.");
  const ref = await addDoc(collection(db, "profiles", uid, "reminders"), {
    title,
    dueDate, // stored as "YYYY-MM-DD" string
    note: note || "",
    createdAt: new Date().toISOString(),
  });
  return ref.id;
}

export async function deleteUserReminder(uid, reminderId) {
  if (!uid) throw new Error("No signed-in user.");
  await deleteDoc(doc(db, "profiles", uid, "reminders", reminderId));
}

// ---- Documents (Document Locker) ----
// Stored as a subcollection per user: profiles/{uid}/documents/{id}
// Firestore holds only metadata; the actual file bytes live on-device
// (see src/storage/documentStorage.js).

export async function getUserDocuments(uid) {
  if (!uid) return [];
  try {
    const snap = await getDocs(collection(db, "profiles", uid, "documents"));
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    list.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    return list;
  } catch (e) {
    console.warn("Could not load documents:", e.message);
    return [];
  }
}

export async function addUserDocument(uid, { name, url, storagePath, fileType }) {
  if (!uid) throw new Error("No signed-in user.");
  const ref = await addDoc(collection(db, "profiles", uid, "documents"), {
    name,
    url,
    storagePath,
    fileType, // "image" | "pdf"
    uploadedAt: new Date().toISOString(),
  });
  return ref.id;
}

export async function renameUserDocument(uid, documentId, newName) {
  if (!uid) throw new Error("No signed-in user.");
  await updateDoc(doc(db, "profiles", uid, "documents", documentId), { name: newName });
}

export async function deleteUserDocument(uid, documentId) {
  if (!uid) throw new Error("No signed-in user.");
  await deleteDoc(doc(db, "profiles", uid, "documents", documentId));
}

// ---- Search (simple client-side keyword match; swap for Algolia/Meilisearch later) ----

export async function searchServices(queryText) {
  const all = await getAllServices();
  const q = queryText.trim().toLowerCase();
  if (!q) return [];
  return all.filter((s) => {
    const haystack = [s.name, s.department, s.category, ...(s.faqs || []).map((f) => f.q)]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
