// Run with: npm run seed
// Pushes the sample services/journeys into Firestore so the app reads real
// data instead of the local fallback. Re-run any time after editing the
// sample data files, or after you add your own services there.
//
// Requires the same Firebase env vars as the app (loaded from .env via
// the `dotenv` package), PLUS a login so it satisfies the Firestore rules
// that now require request.auth != null for writes.

require("dotenv").config();
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

const { SAMPLE_SERVICES } = require("../src/data/sampleServices");
const { SAMPLE_JOURNEYS } = require("../src/data/sampleJourneys");

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

async function seed() {
  if (!firebaseConfig.apiKey) {
    console.error("Missing Firebase env vars. Copy .env.example to .env and fill it in first.");
    process.exit(1);
  }
  if (!process.env.SEED_ADMIN_EMAIL || !process.env.SEED_ADMIN_PASSWORD) {
    console.error("Add SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD to .env -- the seed script must log in now that Firestore rules require authentication.");
    process.exit(1);
  }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  console.log("Logging in as", process.env.SEED_ADMIN_EMAIL, "...");
  await signInWithEmailAndPassword(auth, process.env.SEED_ADMIN_EMAIL, process.env.SEED_ADMIN_PASSWORD);
  console.log("Logged in.");

  console.log(`Seeding ${SAMPLE_SERVICES.length} services...`);
  for (const service of SAMPLE_SERVICES) {
    const { id, ...data } = service;
    await setDoc(doc(db, "services", id), data);
    console.log(`  ✓ ${id}`);
  }

  console.log(`Seeding ${SAMPLE_JOURNEYS.length} journeys...`);
  for (const journey of SAMPLE_JOURNEYS) {
    const { id, ...data } = journey;
    await setDoc(doc(db, "journeys", id), data);
    console.log(`  ✓ ${id}`);
  }

  console.log("Done.");
  process.exit(0);
}

seed().catch((e) => {
  console.error("Seeding failed:", e);
  process.exit(1);
});