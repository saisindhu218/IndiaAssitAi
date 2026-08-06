// Sample services used as a local fallback (and for `npm run seed`).
// Every service follows the SAME shape -- this is what lets the app support
// "all services" from one generic screen. Add more objects to this array
// (or directly in Firestore) to grow the catalog; no code changes needed.

export const SAMPLE_SERVICES = [
  {
    id: "driving-licence-renewal",
    name: "Driving Licence Renewal",
    department: "Transport & RTO",
    category: "Transport & RTO",
    categoryIcon: "🚗",
    overview:
      "Renewal of an existing driving licence (DL) that has expired or is nearing expiry, done via the Parivahan Sewa portal or your local RTO.",
    eligibility:
      "Holder of a valid or recently expired (within grace period) driving licence. If expired more than 5 years, a fresh driving test may be required.",
    documents: [
      "Aadhaar card",
      "Existing driving licence",
      "Passport-size photograph",
      "Medical certificate (Form 1A, required if age 40+ or applying for transport licence)",
      "Address proof (if changed since original DL)",
    ],
    fees: { application: "₹200", service: "₹200", late: "₹50 per year of delay" },
    processingTime: "3–7 working days (online), 1–2 weeks (offline via RTO)",
    onlineSteps: [
      "Visit parivahan.gov.in and select 'Driving Licence' > 'Renewal'",
      "Enter DL number and date of birth to fetch existing record",
      "Upload required documents and photograph",
      "Pay the applicable fee online",
      "Book an RTO slot if biometric verification is required",
      "Track application status using the acknowledgment number",
    ],
    offlineSteps: [
      "Visit your jurisdictional RTO with original documents",
      "Collect and fill Form LLD (renewal form)",
      "Submit form with documents and fee at the counter",
      "Complete biometric/photo capture if requested",
      "Collect receipt and track status or collect DL by post",
    ],
    commonMistakes: [
      "Uploading an expired or blurry medical certificate",
      "Mismatched address between Aadhaar and DL",
      "Applying after the 5-year expiry grace period without realizing a retest is needed",
      "Wrong RTO selected (must match jurisdiction of original DL or current address)",
    ],
    faqs: [
      {
        q: "My Aadhaar address is different from my current address, can I still renew?",
        a: "Yes, but you'll need to submit a separate address proof (utility bill, rent agreement, etc.) along with your application since the RTO will use it to update your record.",
      },
      {
        q: "Can I renew if my licence expired 6 years ago?",
        a: "If your DL has been expired for more than 5 years, most RTOs will require you to retake the driving test as if applying fresh. Check with your local RTO for the exact rule, as this can vary slightly by state.",
      },
      {
        q: "Is the medical certificate mandatory?",
        a: "It's mandatory if you are above 40 years of age, or if you hold/are applying for a transport (commercial) vehicle licence.",
      },
    ],
    officialLinks: ["https://parivahan.gov.in"],
    lastUpdated: "2026-06-01",
  },
  {
    id: "pan-card-correction",
    name: "PAN Card Correction / Update",
    department: "Income Tax",
    category: "Income Tax",
    categoryIcon: "💰",
    overview:
      "Correcting details (name, date of birth, address, photo, signature) on an existing PAN card, or reprinting a lost/damaged PAN.",
    eligibility: "Any existing PAN holder needing to correct or update their PAN details.",
    documents: [
      "Existing PAN card copy",
      "Aadhaar card",
      "Proof of the corrected detail (e.g. marriage certificate for name change)",
      "Passport-size photograph",
    ],
    fees: { application: "₹107 (with Aadhaar e-KYC, physical card in India)", late: "N/A" },
    processingTime: "15–20 working days for physical card dispatch; e-PAN typically within 48 hours",
    onlineSteps: [
      "Go to the NSDL/Protean or UTIITSL PAN portal",
      "Select 'Changes or Correction in PAN Data'",
      "Fill the online form with corrected details",
      "Upload supporting documents and photo/signature",
      "Complete e-KYC via Aadhaar OTP",
      "Pay the fee and note the acknowledgment number",
    ],
    offlineSteps: [
      "Download and print Form 49A (correction form)",
      "Fill in the corrected fields and attach documents",
      "Submit at the nearest PAN service center with the fee",
      "Collect acknowledgment receipt for tracking",
    ],
    commonMistakes: [
      "Not attaching valid proof for the specific field being changed (e.g., only Aadhaar for a name change after marriage, when a marriage certificate is needed)",
      "Signature mismatch across documents",
      "Selecting 'new PAN' instead of 'correction' by mistake, resulting in a duplicate PAN, which is a legal issue",
    ],
    faqs: [
      {
        q: "I got married and changed my surname, what proof do I need?",
        a: "You'll need your marriage certificate (or gazette notification for name change) as proof of the new surname, in addition to your existing PAN and Aadhaar.",
      },
      {
        q: "Can I have two PAN cards?",
        a: "No. Holding more than one PAN is against the law and can attract a penalty. If you've accidentally been issued two, you should surrender the extra one via the correction form.",
      },
    ],
    officialLinks: ["https://www.onlineservices.nsdl.com", "https://www.protean-tinpan.com"],
    lastUpdated: "2026-05-15",
  },
  {
    id: "passport-renewal",
    name: "Passport Renewal",
    department: "Travel Services",
    category: "Travel Services",
    categoryIcon: "✈",
    overview:
      "Renewal of an Indian passport nearing or past its expiry date, done through the Passport Seva portal.",
    eligibility: "Existing passport holders. Different process applies if passport expired more than 3 years ago.",
    documents: [
      "Existing passport (original + copy of first & last pages)",
      "Aadhaar card",
      "Passport-size photograph (as per specification)",
      "Proof of address, if changed",
    ],
    fees: { application: "₹1,500 (normal, 36-page, 10 yr validity)", tatkal: "₹3,500" },
    processingTime: "Normal: 7–15 working days after police verification (if required); Tatkal: 1–3 working days",
    onlineSteps: [
      "Register/login at passportindia.gov.in",
      "Select 'Apply for Fresh Passport/Reissue of Passport'",
      "Fill the reissue form and upload documents",
      "Pay the fee online",
      "Book an appointment at your nearest Passport Seva Kendra (PSK)",
      "Visit PSK for document verification and biometrics",
    ],
    offlineSteps: [
      "Passport applications generally require the online appointment step even for in-person visits",
      "Carry originals and self-attested copies of all documents to the PSK appointment",
    ],
    commonMistakes: [
      "Photo not meeting the official specification (background, size)",
      "Applying without booking a PSK appointment slot",
      "Missing address proof after a recent house move",
    ],
    faqs: [
      {
        q: "I don't have my birth certificate, can I still apply?",
        a: "For renewals, your existing passport itself usually serves as sufficient proof of date of birth, so a separate birth certificate typically isn't required. This can vary by case, so check the latest document checklist on passportindia.gov.in before your appointment.",
      },
      {
        q: "My passport expired more than 3 years ago, is the process different?",
        a: "Yes, if your passport has been expired for more than 3 years, it is treated closer to a fresh application and may need additional documents. Check the current rule on the official portal, as this detail is not fully covered here.",
      },
    ],
    officialLinks: ["https://www.passportindia.gov.in"],
    lastUpdated: "2026-04-20",
  },
];
