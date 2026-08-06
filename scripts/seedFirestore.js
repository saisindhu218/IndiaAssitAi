// Run with: npm run seed
// Pushes the sample services/journeys into Firestore so the app reads real
// data instead of the local fallback. Re-run any time after editing the
// sample data files, or after you add your own services there.
//
// Requires the same Firebase env vars as the app (loaded from .env via
// the `dotenv` package, installed as a dev dependency).

require("dotenv").config();
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");

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

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

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

  console.log("Done. Set USE_LOCAL_FALLBACK = false in src/firebase/firestore.js once you trust Firestore has taken over.");
  process.exit(0);
}

seed().catch((e) => {
  console.error("Seeding failed:", e);
  process.exit(1);
});
