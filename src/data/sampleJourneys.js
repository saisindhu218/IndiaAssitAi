// Journeys are just curated lists that reference existing service ids.
// Adding a journey never requires new content-writing for services --
// it just points at services that already exist in the catalog.

export const SAMPLE_JOURNEYS = [
  {
    id: "starting-first-job",
    title: "Starting My First Job",
    icon: "👨‍💼",
    description: "Everything you typically need sorted when you start working for the first time.",
    steps: [
      { serviceId: "pan-card-correction", note: "Make sure your PAN details are correct and up to date." },
      // Add more service ids here as you build out: bank account, EPFO, DigiLocker, etc.
    ],
  },
  {
    id: "buying-a-vehicle",
    title: "Buying a Vehicle",
    icon: "🚗",
    description: "Steps to take once you've bought a new or used vehicle.",
    steps: [
      { serviceId: "driving-licence-renewal", note: "Make sure your driving licence is valid before you drive it home." },
      // Add: RC transfer, insurance, PUC, FASTag services here as they're written
    ],
  },
  {
    id: "travelling-abroad",
    title: "Travelling Abroad",
    icon: "✈",
    description: "Make sure your travel documents are in order before an international trip.",
    steps: [
      { serviceId: "passport-renewal", note: "Check your passport has at least 6 months validity left." },
    ],
  },
];
