# IndiaAssist AI

A React Native (Expo) scaffold for "one app for every government & public
service in India" — built as a **data-driven engine**: one generic screen
renders any service from a Firestore document, so adding a new service is a
content task, not a coding task.

This is a working v1 scaffold with 3 sample services fully filled in
(Driving Licence Renewal, PAN Correction, Passport Renewal) and 3 sample
journeys, so you can run it end-to-end immediately, then grow the catalog.

## What's included

- **Home screen** with the two entry points (Life Events / Government
  Services) plus a global search bar, per the "operating system for Indian
  citizens" design.
- **Services**: category grid → service list → generic service detail page
  (overview, eligibility, documents, fees, processing time, online/offline
  steps, common mistakes, FAQs, official links).
- **Life Events** (formerly "Journey Mode"): an open chat screen with
  tappable suggestion chips for each pre-built journey. Tap a suggestion (or
  type your own situation, e.g. "I just got married") and it either shows
  the matching journey's checklist instantly, or asks the AI to point you to
  the closest matching journey/service -- the AI is grounded only in the
  journeys/services that actually exist in the app, so it routes you rather
  than inventing a procedure it can't back up.
- **Context-aware AI chat** (floating 💬 button) on every service page,
  scoped ONLY to that service's verified content — it won't invent
  procedures. A global, unscoped version lives on the Home screen.
- **Editable Profile screen**: name, age, state, occupation, senior-citizen
  toggle, edited via a top-right ⋮ menu (Edit Profile / Sign Out), saved to
  Firestore per user.
- **Document Locker** (on the Profile screen): upload photos or PDFs of
  documents you use often, give each one a custom name, rename or delete
  them later, and reopen/download them anytime via the device browser.
  Files live in Firebase Storage; only the signed-in owner can see their
  own documents (once you lock down security rules -- see step 6 below).
- **Reminders**: add/delete simple due-date reminders (e.g. passport
  renewal), shown in a list with overdue items flagged. This is manual
  entry for now -- local push notifications are a natural next step via
  `expo-notifications`.
- **Firebase Auth** (email/password) + **Firestore** + **Firebase Storage**
  as the backend.
- **Groq** (free tier) as the LLM — no OpenAI/Anthropic billing required to
  get started.

## What's intentionally NOT included yet (see the caution below)

- "My Life Locker" (storing Aadhaar/PAN numbers) — this triggers India's
  DPDP Act 2023 obligations (consent flows, breach handling, security
  audits). Don't add it until you're ready to implement that properly.
- Push notifications for reminders (needs `expo-notifications` + a
  scheduling strategy).
- Multi-language support.
- Full-text/fuzzy search (current search is a simple client-side keyword
  match — fine for tens of services, replace with Algolia/Meilisearch once
  you have hundreds).

---

## 1. Prerequisites

- **Node.js** LTS (18 or 20) — https://nodejs.org
- **VS Code** (or any editor)
- **Expo Go** app on your phone (free, from Play Store / App Store) — this
  is what lets you run the app with no Android Studio / Xcode install.
- A free **Firebase** account — https://console.firebase.google.com
- A free **Groq** API key — https://console.groq.com/keys

No Android Studio, no Xcode, no emulator required.

## 2. Install dependencies

Unzip this project, open the folder in VS Code, then in the terminal:

```bash
npm install
```

Then let Expo double-check the two new packages (`expo-image-picker`,
`expo-document-picker`, used by the Document Locker) are on the exact
version your Expo SDK expects:

```bash
npx expo install expo-image-picker expo-document-picker
```

## 3. Set up Firebase

1. Go to https://console.firebase.google.com → **Add project** (free Spark
   plan is enough to start).
2. Inside the project, click the **Web (</>)** icon to register a web app —
   you don't need Android/iOS native apps for Expo Go development.
3. Copy the config values it gives you (apiKey, authDomain, etc).
4. In the Firebase console, enable:
   - **Authentication** → Sign-in method → **Email/Password** → Enable.
   - **Firestore Database** → Create database → start in **test mode**
     (fine for development; lock down rules before any real launch).
   - **Storage** → Get started → start in **test mode** too (this backs the
     Document Locker on the Profile screen).
5. In this project, copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

   Paste your Firebase values into it.

6. **Lock down security rules before any real users touch this.** Test mode
   is wide open -- anyone can read/write anything. At minimum, scope
   Firestore and Storage so users can only touch their own data:

   Firestore rules (Firestore Database → Rules):
   ```
   match /profiles/{userId} {
     allow read, write: if request.auth != null && request.auth.uid == userId;
     match /{subcollection}/{docId} {
       allow read, write: if request.auth != null && request.auth.uid == userId;
     }
   }
   match /services/{serviceId} {
     allow read: if true; // public content
   }
   match /journeys/{journeyId} {
     allow read: if true;
   }
   ```

   Storage rules (Storage → Rules):
   ```
   match /users/{userId}/{allPaths=**} {
     allow read, write: if request.auth != null && request.auth.uid == userId;
   }
   ```

## 4. Set up Groq (free AI)

1. Create a key at https://console.groq.com/keys.
2. Add it to `.env` as `EXPO_PUBLIC_GROQ_API_KEY`.
3. Leave `EXPO_PUBLIC_GROQ_MODEL` as-is, or swap to another Groq-hosted
   model later.

## 5. Seed sample data into Firestore (optional but recommended)

Without this step, the app still works using local sample data as a
fallback — good enough to click around immediately. To actually populate
Firestore (so you can edit content without touching code):

```bash
npm run seed
```

This pushes the 3 sample services and 3 sample journeys into your Firestore
`services` and `journeys` collections. After confirming it worked (check the
Firestore console), open `src/firebase/firestore.js` and set
`USE_LOCAL_FALLBACK = false` so the app only trusts Firestore going forward.

## 6. Run the app

```bash
npm start
```

This opens the Expo dev tools in your terminal/browser with a QR code.

- **On your phone**: open the Expo Go app and scan the QR code. The app
  loads directly — no build step, no cable required (same Wi-Fi network).
- **On web** (quick preview only, some native bits won't apply):
  `npm run web`

## 7. Adding a new service (this is the whole point of the architecture)

You never need to write a new screen. Just add a new object to
`src/data/sampleServices.js` (for local dev) and/or push it to Firestore's
`services` collection directly, following the exact same shape as the
existing 3 entries:

```js
{
  id: "unique-id",
  name: "Service Name",
  department: "Department Name",
  category: "Category Name",   // groups it on the Services screen
  categoryIcon: "📁",
  overview: "...",
  eligibility: "...",
  documents: ["...", "..."],
  fees: { application: "₹...", late: "..." },
  processingTime: "...",
  onlineSteps: ["...", "..."],
  offlineSteps: ["...", "..."],
  commonMistakes: ["...", "..."],
  faqs: [{ q: "...", a: "..." }],
  officialLinks: ["https://..."],
  lastUpdated: "YYYY-MM-DD",
}
```

The Services screen, the service detail page, search, and the AI chat all
pick it up automatically.

To add a **journey**, add an entry to `src/data/sampleJourneys.js`
referencing existing service ids — no new content-writing needed there.

## 8. A serious, non-optional caution

The AI is deliberately restricted to answer only from the `service` object
you pass it (see `src/ai/groq.js`) — it's told not to invent fees, documents,
or steps. **This only works if the content you write is accurate and kept
up to date.** Government fees, forms, and rules change, and some vary by
state. Verify every service's content against the official portal before
publishing it, and revisit it periodically. Treat content writing as the
core, ongoing work of this project — the app itself is "done" architecturally
once you're happy with the screens here.

Do not add real-user PII storage (Aadhaar, PAN numbers, etc.) without first
implementing proper DPDP Act–compliant consent, encryption, and data-handling
practices — this is a legal requirement, not a nice-to-have.

## 9. Troubleshooting notes (fixes already applied in this version)

These were real issues hit during setup on Windows + Expo SDK 54. They're
already fixed in this version of the project, documented here so you know
why these files look the way they do if you ever touch them again:

- **`Cannot find module 'babel-preset-expo'`** — it must be an explicit
  `devDependency`, not just pulled in transitively. Already added, pinned to
  `~54.0.10` to match Expo SDK 54 (installing the bare latest version, e.g.
  57.x, causes a `private properties are not supported` syntax error on
  older Expo Go clients because it compiles JS the runtime can't execute).
  Always install Expo-related packages with `npx expo install <package>`
  rather than plain `npm install`, so the compatible version is selected
  automatically.
- **`Component auth has not been registered yet`** — Firebase's package
  doesn't declare a React Native export condition, so Metro's default
  package-exports resolution (on since Expo SDK 52) loads the wrong build.
  Fixed via `metro.config.js`, which disables that resolution mode.
- **`firebase` pinned to exactly `10.7.1`** (no `^`) — newer 10.x builds
  triggered the same auth registration error independently of the Metro fix
  above on this setup. If you want to try bumping it later, test thoroughly
  after any version change.
- **`Failed to download remote update` / "Something went wrong" in Expo Go`**
  — almost always phone-can't-reach-PC over LAN. Run `expo start --tunnel`
  instead of the default LAN mode; if tunnel also fails, check Windows
  Firewall isn't blocking Node.js on Private networks.
- **`Fatal process out of memory` / `ENOMEM` during bundling** — Node's
  default heap size is too small for a ~900+ module bundle on some Windows
  setups. Set `NODE_OPTIONS=--max-old-space-size=4096` (or higher) in your
  shell before running `expo start`, and close other memory-heavy apps.
- **`Changing numColumns on the fly is not supported`** — two different
  `FlatList`s in `ServicesScreen.js` need distinct `key` props so React
  treats them as separate instances instead of trying to reconfigure one
  FlatList's column count. Already fixed.

## 10. Suggested next milestones

1. Replace the 3 sample services with 5-10 real, fully verified ones for
   your state.
2. Get a few real users to actually try completing a task using only the
   app + AI chat; fix whatever confuses them.
3. Add more services incrementally (content work, not code work).
4. Build out Reminders with `expo-notifications`.
5. Only then consider Life Locker, multi-state support, and multi-language.

---

Built as a scaffold — extend, restyle, and reorganize as needed. The
important structural decision already made for you is: **one generic
schema and screen for all services**, so "supporting all of them" is a
content roadmap, not a rewrite.
