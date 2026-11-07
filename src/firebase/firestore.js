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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "./config";
import { SAMPLE_SERVICES } from "../data/sampleServices";
import { SAMPLE_JOURNEYS } from "../data/sampleJourneys";

const USE_LOCAL_FALLBACK = true; // flips to false once you've seeded Firestore

// ---- Catalog loading: version check + offline cache ----
// Services and journeys are downloaded ONCE and saved on the phone.
// A tiny document, meta/catalog, holds a version number that the admin
// dashboard changes every time something is published. On each app start we
// read just that one document:
//   - same version as the saved copy  -> use the saved copy (no download at all)
//   - different version               -> download the catalog again (new content!)
//   - can't reach Firestore (offline) -> use whatever is saved on the phone
//   - no version document yet         -> fall back to a 6-hour timer
// Last resort for a first launch with no network: the catalog bundled in the app.
// Result: about 1 read per app start instead of ~184, and edits reach phones
// within minutes.

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // only used when there is no version document
const NETWORK_TIMEOUT_MS = 8000;
const memory = {};
const inflight = {};
let versionPromise = null; // one version check per app session

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("Network timeout")), ms)),
  ]);
}

// -> { status: "ok", version } | { status: "missing" } | { status: "error" }
function getRemoteVersion() {
  if (!versionPromise) {
    versionPromise = withTimeout(getDoc(doc(db, "meta", "catalog")), 5000)
      .then((snap) =>
        snap.exists() && typeof snap.data().version === "number"
          ? { status: "ok", version: snap.data().version }
          : { status: "missing" }
      )
      .catch(() => ({ status: "error" }));
  }
  return versionPromise;
}

async function loadCollection(name, fallback) {
  if (memory[name]) return memory[name];
  if (inflight[name]) return inflight[name];

  inflight[name] = (async () => {
    const cacheKey = `indiaassist:cache:${name}:v1`;
    let cached = null;
    try {
      const raw = await AsyncStorage.getItem(cacheKey);
      if (raw) cached = JSON.parse(raw);
    } catch (e) {
      cached = null;
    }
    const hasCache = !!(cached && cached.data && cached.data.length);

    const remote = await getRemoteVersion();

    if (hasCache) {
      const upToDate = remote.status === "ok" && cached.version === remote.version;
      const timerFresh = remote.status === "missing" && Date.now() - cached.savedAt < CACHE_TTL_MS;
      const offline = remote.status === "error";
      if (upToDate || timerFresh || offline) {
        memory[name] = cached.data;
        return cached.data;
      }
    }

    try {
      const snap = await withTimeout(getDocs(collection(db, name)), NETWORK_TIMEOUT_MS);
      if (!snap.empty) {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        memory[name] = data;
        AsyncStorage.setItem(
          cacheKey,
          JSON.stringify({ savedAt: Date.now(), version: remote.status === "ok" ? remote.version : null, data })
        ).catch(() => {});
        return data;
      }
    } catch (e) {
      console.warn(`Could not load ${name} from Firestore:`, e.message);
    }

    if (hasCache) {
      memory[name] = cached.data;
      return cached.data;
    }
    if (USE_LOCAL_FALLBACK) {
      memory[name] = fallback;
      return fallback;
    }
    return [];
  })();

  try {
    return await inflight[name];
  } finally {
    delete inflight[name];
  }
}

/** Forget cached catalog data (e.g. for a "refresh" action). */
export async function clearCatalogCache() {
  delete memory.services;
  delete memory.journeys;
  versionPromise = null;
  await AsyncStorage.multiRemove([
    "indiaassist:cache:services:v1",
    "indiaassist:cache:journeys:v1",
  ]).catch(() => {});
}

// ---- Services ----

export async function getAllServices() {
  return loadCollection("services", SAMPLE_SERVICES);
}

export async function getServicesByCategory(category) {
  const all = await getAllServices();
  return all.filter((s) => s.category === category);
}

export async function getServiceById(serviceId) {
  const all = await getAllServices();
  const found = all.find((x) => x.id === serviceId);
  if (found) return found;
  try {
    const snap = await withTimeout(getDoc(doc(db, "services", serviceId)), NETWORK_TIMEOUT_MS);
    if (snap.exists()) return { id: snap.id, ...snap.data() };
  } catch (e) {
    console.warn("Could not load service:", e.message);
  }
  return SAMPLE_SERVICES.find((x) => x.id === serviceId) || null;
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
  return loadCollection("journeys", SAMPLE_JOURNEYS);
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

// ---- Search ----
// Understands everyday sentences ("I lost my driving licence"), common
// spellings (license/licence, aadhar/aadhaar) and a few Hindi words, and
// ranks results by relevance. Runs fully on the phone (works offline).

const STOP_WORDS = new Set([
  "i","my","me","we","our","the","a","an","to","for","of","in","on","at","and","or","is","are","am",
  "how","do","does","can","could","should","what","which","where","when","why","want","need","get",
  "please","help","about","with","from","it","this","that","have","has","had","be","will","just",
  "new","apply","application","service","services","card","kaise","kya","mera","meri","mujhe","hai",
]);

// word -> extra words that mean the same thing
const SYNONYMS = {
  license: ["licence"], dl: ["driving", "licence"], aadhar: ["aadhaar"], adhar: ["aadhaar"],
  adhaar: ["aadhaar"], pancard: ["pan"], lost: ["duplicate", "lost", "replacement"],
  stolen: ["duplicate", "lost"], missing: ["duplicate", "lost"], damaged: ["duplicate", "replacement"],
  duplicate: ["lost", "replacement"], renew: ["renewal"], renewing: ["renewal"],
  expired: ["renewal"], expiry: ["renewal"], cheque: ["bank"],
  tax: ["income", "tax"], itr: ["income", "tax", "return"],
  vehicle: ["vehicle", "rc"], car: ["vehicle"], bike: ["vehicle"], scooter: ["vehicle"],
  married: ["marriage"], wedding: ["marriage"], shaadi: ["marriage"],
  baby: ["birth", "child"], newborn: ["birth"], born: ["birth"], died: ["death"],
  passed: ["death"], dead: ["death"], retire: ["pension", "senior"], retired: ["pension", "senior"],
  elderly: ["senior"], old: ["senior"], farmer: ["farmers", "kisan"], farming: ["farmers", "kisan"],
  crop: ["farmers", "kisan"], student: ["education", "scholarship"], college: ["education", "scholarship"],
  school: ["education"], hospital: ["health", "ayushman"], medical: ["health", "ayushman"],
  job: ["employment"], unemployed: ["employment"], jobless: ["employment"],
  disabled: ["disability"], handicapped: ["disability"],
  gas: ["lpg", "gas"], cylinder: ["lpg"], complaint: ["consumer", "grievance"],
  theft: ["police", "fir"], abroad: ["passport", "visa"], travel: ["passport"],
  "आधार": ["aadhaar"], "पैन": ["pan"], "पासपोर्ट": ["passport"], "राशन": ["ration"],
  "पेंशन": ["pension"], "लाइसेंस": ["licence", "driving"], "वोटर": ["voter"], "बैंक": ["bank"],
  "बीमा": ["insurance"], "जन्म": ["birth"], "मृत्यु": ["death"], "शादी": ["marriage"], "विवाह": ["marriage"],
  "किसान": ["farmers", "kisan"], "छात्रवृत्ति": ["scholarship"], "स्वास्थ्य": ["health"],
};

function tokenize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\p{M}\s]/gu, " ")
    .split(/\s+/)
    .filter((t) => t && !STOP_WORDS.has(t));
}

function expandTokens(tokens) {
  const out = new Set();
  tokens.forEach((t) => {
    out.add(t);
    (SYNONYMS[t] || []).forEach((x) => out.add(x));
  });
  return Array.from(out);
}

function scoreService(service, tokens, phrase) {
  const name = (service.name || "").toLowerCase();
  const dept = `${service.department || ""} ${service.category || ""}`.toLowerCase();
  const rest = [
    service.overview,
    service.eligibility,
    ...(service.faqs || []).map((f) => f.q),
  ]
    .join(" ")
    .toLowerCase();

  let score = 0;
  if (phrase && name.includes(phrase)) score += 12;
  tokens.forEach((t) => {
    if (name.includes(t)) score += 5;
    if (dept.includes(t)) score += 2;
    if (t.length > 2 && rest.includes(t)) score += 1;
  });
  return score;
}

/** Ranked list of services matching a typed query or a whole sentence. */
export async function searchServices(queryText) {
  const q = (queryText || "").trim().toLowerCase();
  if (!q) return [];
  const all = await getAllServices();
  const tokens = expandTokens(tokenize(q));
  if (!tokens.length) {
    return all.filter((s) => (s.name || "").toLowerCase().includes(q));
  }
  return all
    .map((s) => ({ s, score: scoreService(s, tokens, q) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.s);
}

/** Top few services relevant to a question (used to ground the AI). */
export async function findRelevantServices(text, limit = 4) {
  const results = await searchServices(text);
  return results.slice(0, limit);
}

// ---- Delete everything stored for a user (used by "Delete account") ----

export async function deleteAllUserData(uid) {
  if (!uid) return;
  for (const sub of ["reminders", "documents"]) {
    const snap = await getDocs(collection(db, "profiles", uid, sub));
    await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
  }
  await deleteDoc(doc(db, "profiles", uid)).catch(() => {});
}

// ---- Reports (bad AI answers / incorrect service info) ----
// Saved to the "reports" collection so you can review them in the Firebase
// console. Only the signed-in user can create a report; only the admin can read.

export async function addReport(uid, { type, reason, question, answer, serviceId, serviceName }) {
  const clip = (value, max) => String(value || "").slice(0, max);
  await addDoc(collection(db, "reports"), {
    uid,
    type: clip(type, 20),
    reason: clip(reason, 80),
    question: clip(question, 1000),
    answer: clip(answer, 3000),
    serviceId: clip(serviceId, 100),
    serviceName: clip(serviceName, 200),
    createdAt: Date.now(),
  });
}

// ---- Service requests ("I couldn't find this service") ----
// Saved to the "requests" collection. The admin dashboard ranks them so the
// most-wanted missing services get added first.

export async function addRequest(uid, queryText) {
  const text = String(queryText || "").trim().slice(0, 200);
  if (!uid || text.length < 3) throw new Error("Please type what you were looking for.");
  await addDoc(collection(db, "requests"), { uid, query: text, createdAt: Date.now() });
}
