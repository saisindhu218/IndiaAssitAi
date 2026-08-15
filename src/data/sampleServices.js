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
    fees: { application: "₹2,500 (normal, 36-page, adult) / ₹3,500 (60-page) -- revised upward effective 1 July 2026, more than the older ₹1,500 many people still expect", tatkal: "₹5,000 (36-page) / ₹6,000 (60-page), plus the base application fee already reflected in these totals" },
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
      "Budgeting for the older, lower passport fees -- fees increased notably from 1 July 2026, so double-check the current amount on passportindia.gov.in before paying",
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
    lastUpdated: "2026-08-01",
  },

  // ---- Identity Documents ----

  {
    id: "aadhaar-enrolment",
    name: "Aadhaar Enrolment (New)",
    department: "Identity Documents",
    category: "Identity Documents",
    categoryIcon: "🪪",
    overview:
      "First-time Aadhaar registration for residents who don't yet have an Aadhaar number, done in person at an Aadhaar Enrolment Centre since biometric capture (fingerprints, iris scan, photo) is required.",
    eligibility:
      "Any Indian resident, including children (enrolled with a parent/guardian; biometrics are recaptured at ages 5 and 15).",
    documents: [
      "One Proof of Identity document (e.g. PAN, Voter ID, Passport, ration card)",
      "One Proof of Address document (e.g. utility bill, bank passbook, rent agreement)",
      "Proof of Date of Birth (e.g. birth certificate, passport, school certificate) if available",
      "For children: parent/guardian's Aadhaar number",
    ],
    fees: { enrolment: "Free" },
    processingTime: "Aadhaar is typically generated within 90 days of enrolment; often much faster in practice",
    onlineSteps: [
      "Aadhaar enrolment itself cannot be done fully online -- book a slot via the Aadhaar Seva Kendra locator on myaadhaar.uidai.gov.in or your nearest enrolment centre (banks/post offices often host one)",
      "Fill and submit the enrolment form with your documents at the centre",
      "Complete biometric capture (fingerprints, iris, photo)",
      "Collect your Enrolment ID (EID) slip and track status on myaadhaar.uidai.gov.in",
    ],
    offlineSteps: [
      "Locate your nearest Aadhaar Enrolment Centre (banks, post offices, and dedicated centres)",
      "Carry original + photocopy of your Proof of Identity and Proof of Address documents",
      "Fill the enrolment form on the spot and complete biometric capture",
      "Keep your acknowledgment slip -- you'll need the Enrolment ID to check status and download Aadhaar once ready",
    ],
    commonMistakes: [
      "Address mismatch between the proof document and what's entered on the form",
      "Photocopies without originals for verification at the centre",
      "Losing the acknowledgment slip, which makes tracking status harder (though status can still be checked via registered mobile number)",
    ],
    faqs: [
      {
        q: "Can I enrol for Aadhaar completely online?",
        a: "No -- because Aadhaar enrolment requires biometric capture, you must visit an enrolment centre in person at least once. Updates to an existing Aadhaar can often be done online instead.",
      },
      {
        q: "Is there a fee for new Aadhaar enrolment?",
        a: "New enrolment is free. Fees only apply to certain updates and reprints (see the Aadhaar Update & Correction service).",
      },
    ],
    officialLinks: ["https://myaadhaar.uidai.gov.in", "https://uidai.gov.in"],
    lastUpdated: "2026-07-01",
  },

  {
    id: "aadhaar-update",
    name: "Aadhaar Update & Correction",
    department: "Identity Documents",
    category: "Identity Documents",
    categoryIcon: "🪪",
    overview:
      "Updating or correcting details on an existing Aadhaar -- name, address, date of birth, gender, or mobile number -- through the myAadhaar portal or an Aadhaar Seva Kendra.",
    eligibility: "Any existing Aadhaar holder.",
    documents: [
      "Aadhaar number",
      "Proof supporting the change (e.g. utility bill for address, marriage certificate for name change)",
      "Access to your Aadhaar-registered mobile number for OTP (for online updates)",
    ],
    fees: {
      onlineDemographicUpdate: "Free (UIDAI has periodically waived this fee for online updates -- confirm current status on myaadhaar.uidai.gov.in before paying anything)",
      centreUpdate: "₹50 (approximate, for updates done at an Aadhaar Seva Kendra)",
      biometricUpdate: "Must be done in person at a centre (mobile number update also requires an in-person visit)",
    },
    processingTime: "Online demographic updates: a few days once submitted; centre-based updates: similar, tracked via Update Request Number (URN)",
    onlineSteps: [
      "Go to myaadhaar.uidai.gov.in and log in with your Aadhaar number and OTP",
      "Select 'Address Update' or 'Document Update' depending on what needs changing",
      "Upload clear scans of your supporting proof document",
      "Submit and note your Update Request Number (URN) to track status",
      "Check status anytime under 'Check Aadhaar Update Status' using your URN or EID",
    ],
    offlineSteps: [
      "Visit any Aadhaar Seva Kendra (required for biometric updates or mobile number changes)",
      "Carry your Aadhaar number and the supporting proof document",
      "Complete the update form and any required biometric capture",
      "Pay the applicable fee and keep your URN for tracking",
    ],
    commonMistakes: [
      "Uploading a proof document that doesn't clearly show the new detail being updated",
      "Trying to update mobile number online -- this specifically requires an in-person visit",
      "Not checking the current fee before paying, since UIDAI has changed free-update windows more than once",
    ],
    faqs: [
      {
        q: "Can I update my mobile number online?",
        a: "No -- mobile number updates require biometric verification and must be done in person at an Aadhaar Seva Kendra.",
      },
      {
        q: "How do I check if my update was successful?",
        a: "On myaadhaar.uidai.gov.in, use 'Check Aadhaar Update Status' with your Update Request Number (URN) or Enrolment ID (EID).",
      },
    ],
    officialLinks: ["https://myaadhaar.uidai.gov.in"],
    lastUpdated: "2026-07-01",
  },

  {
    id: "voter-id-registration",
    name: "Voter ID (New Registration)",
    department: "Identity Documents",
    category: "Identity Documents",
    categoryIcon: "🪪",
    overview:
      "Registering as a new voter and getting an Elector's Photo Identity Card (EPIC / Voter ID), done through the Election Commission of India's citizen portal.",
    eligibility: "Indian citizens aged 18 or above as of the qualifying date, ordinarily resident in the constituency they're registering in.",
    documents: [
      "Proof of age (e.g. birth certificate, PAN, passport, Aadhaar)",
      "Proof of residence (e.g. utility bill, rent agreement, ration card)",
      "Recent passport-size photograph",
      "Aadhaar number (for linking, where available)",
    ],
    fees: { registration: "Free" },
    processingTime: "Typically a few weeks; an Electoral Registration Officer verifies the application, sometimes with a field visit",
    onlineSteps: [
      "Go to voters.eci.gov.in (services formerly on nvsp.in now redirect here)",
      "Register for an account and fill Form 6 for new voter registration",
      "Upload your proof of age, proof of residence, and photograph",
      "Submit and note your Reference ID to track application status",
      "Once approved, download your e-EPIC or track physical card delivery",
    ],
    offlineSteps: [
      "Collect Form 6 from your local Electoral Registration Officer (ERO) office or Booth Level Officer (BLO)",
      "Fill and submit with supporting documents",
      "A BLO may visit for verification before approval",
    ],
    commonMistakes: [
      "Address proof not matching current residence, causing verification delays",
      "Applying in the wrong constituency for your current address",
      "Not tracking the Reference ID, making status follow-up harder",
    ],
    faqs: [
      {
        q: "I recently moved to another state -- do I need a new Voter ID?",
        a: "You'll need to register afresh in your new constituency (this also removes your old entry once processed) -- use Form 6 with your new address proof on voters.eci.gov.in.",
      },
      {
        q: "Is there a fee for a new Voter ID?",
        a: "No, voter registration is free. Be cautious of any third-party site asking for payment for basic registration.",
      },
    ],
    officialLinks: ["https://voters.eci.gov.in"],
    lastUpdated: "2026-06-15",
  },

  {
    id: "voter-id-correction",
    name: "Voter ID Correction",
    department: "Identity Documents",
    category: "Identity Documents",
    categoryIcon: "🪪",
    overview:
      "Correcting details on an existing Voter ID/EPIC -- name, age, address, or photo -- or transferring your registration after moving constituencies.",
    eligibility: "Existing registered voters needing to correct their record.",
    documents: [
      "Existing EPIC number",
      "Proof supporting the correction (e.g. Aadhaar for name/age, utility bill for address)",
      "Passport-size photo (if updating photo)",
    ],
    fees: { correction: "Free" },
    processingTime: "A few weeks, similar to new registration, pending ERO verification",
    onlineSteps: [
      "Log in at voters.eci.gov.in with your existing credentials",
      "Select Form 8 for correction of entries, or the relevant transposition/deletion form if you've moved",
      "Upload supporting proof for the specific correction",
      "Submit and track using your Reference ID",
    ],
    offlineSteps: [
      "Collect the relevant form (Form 8 for corrections) from your local ERO/BLO office",
      "Submit with supporting documents",
    ],
    commonMistakes: [
      "Using the wrong form -- correction (Form 8) is different from moving-constituency transfer forms",
      "Submitting proof that doesn't match the exact field being corrected",
    ],
    faqs: [
      {
        q: "My name is spelled wrong on my Voter ID -- how do I fix it?",
        a: "Use Form 8 (correction of entries) on voters.eci.gov.in, uploading a document like your Aadhaar or PAN showing the correct spelling.",
      },
    ],
    officialLinks: ["https://voters.eci.gov.in"],
    lastUpdated: "2026-06-15",
  },

  {
    id: "birth-certificate",
    name: "Birth Certificate",
    department: "Identity Documents",
    category: "Identity Documents",
    categoryIcon: "🪪",
    overview:
      "Registering a birth and obtaining a birth certificate through India's Civil Registration System (CRS), or requesting one for an already-registered birth.",
    eligibility: "Parents/guardians of a newborn (register within 21 days for the simplest process), or anyone needing a certificate for an already-registered birth.",
    documents: [
      "Hospital-issued birth proof/discharge summary (for new registrations)",
      "Parents' Aadhaar numbers",
      "Parents' address proof",
      "Marriage certificate of parents, if applicable in your state's form",
    ],
    fees: {
      within21Days: "Usually free or a nominal fee",
      afterDelay: "A late fee applies for registration after 21 days, and after 1 year may require an affidavit and magistrate's order -- amount varies by state",
    },
    processingTime: "A few days to a few weeks depending on state and registration timeliness",
    onlineSteps: [
      "Registration is typically initiated by the hospital directly with the local municipal/registrar office at birth",
      "For online applications, use the Civil Registration System at crsorgi.gov.in, or your state/city's dedicated portal (e.g. major cities often have their own municipal portal)",
      "Track your application and download the digital certificate once approved -- it carries a QR code for verification",
      "Certificates for children born after August 2015 are often also available via DigiLocker",
    ],
    offlineSteps: [
      "Visit your local municipal corporation / registrar of births and deaths office",
      "Submit the registration or request form with supporting documents",
      "Collect the certificate once processed, or request a certified copy for an existing record",
    ],
    commonMistakes: [
      "Registering after 21 days without realizing a late fee or extra documentation applies",
      "Using a lookalike third-party website instead of the official crsorgi.gov.in or your state's official municipal portal -- several scam sites mimicking government birth certificate portals exist, so always check the URL carefully and never pay unusual fees to an unfamiliar site",
      "Name spelling mismatches between the birth certificate and Aadhaar/school records causing issues later",
    ],
    faqs: [
      {
        q: "How do I know if a birth certificate website is genuine?",
        a: "Stick to crsorgi.gov.in (the official Civil Registration System) or your specific state/municipal government's official portal. Be wary of sites with unofficial-looking domains, especially ones demanding payment for what should be a low-cost or free government service.",
      },
      {
        q: "What if I missed the 21-day window?",
        a: "You can still register, but expect a late fee and possibly additional documentation (an affidavit, and after 1 year, often a magistrate/executive order) -- the exact process varies by state, so check with your local registrar.",
      },
    ],
    officialLinks: ["https://crsorgi.gov.in"],
    lastUpdated: "2026-07-10",
  },

  {
    id: "death-certificate",
    name: "Death Certificate",
    department: "Identity Documents",
    category: "Identity Documents",
    categoryIcon: "🪪",
    overview:
      "Registering a death and obtaining a death certificate through India's Civil Registration System, needed for settling estates, insurance claims, and closing accounts.",
    eligibility: "Family members or the person who reports the death (registration is legally required within 21 days).",
    documents: [
      "Hospital-issued death proof/discharge summary, or a medical certificate of cause of death",
      "Deceased's identity proof (Aadhaar, etc.)",
      "Informant's identity proof",
    ],
    fees: {
      within21Days: "Usually free or a nominal fee",
      afterDelay: "Late fee applies; after 1 year typically requires an affidavit and magistrate's order",
    },
    processingTime: "A few days to a few weeks depending on state and registration timeliness",
    onlineSteps: [
      "For deaths in a hospital, registration is usually initiated by the hospital with the local registrar",
      "Apply or track via crsorgi.gov.in or your state/city's dedicated civil registration portal",
      "Download the digital certificate (QR-coded) once approved",
    ],
    offlineSteps: [
      "Visit your local municipal corporation / registrar of births and deaths office",
      "Submit the registration form with supporting documents",
      "Collect the certificate once processed",
    ],
    commonMistakes: [
      "Missing the 21-day window, requiring extra paperwork and delay",
      "Using unofficial lookalike websites -- same caution as with birth certificates applies here",
      "Not obtaining enough certified copies upfront -- banks, insurers, and property offices each typically want their own copy",
    ],
    faqs: [
      {
        q: "How many copies of the death certificate should I get?",
        a: "It's practical to request several certified copies at once (for banks, insurance claims, property transfer, pension closure, etc.) since each institution usually wants its own physical or certified copy.",
      },
    ],
    officialLinks: ["https://crsorgi.gov.in"],
    lastUpdated: "2026-07-10",
  },

  {
    id: "marriage-certificate",
    name: "Marriage Certificate",
    department: "Identity Documents",
    category: "Identity Documents",
    categoryIcon: "🪪",
    overview:
      "Registering a marriage and obtaining a legal marriage certificate, done under either the Hindu Marriage Act or the Special Marriage Act depending on the couple's circumstances, through your state/city's marriage registrar.",
    eligibility: "Married couples (or those intending to marry under the Special Marriage Act, which also covers inter-religious/civil marriages) -- minimum age 21 for the groom and 18 for the bride under most current requirements.",
    documents: [
      "Age and identity proof for both parties (Aadhaar, PAN, passport, etc.)",
      "Address proof for both parties",
      "Passport-size photographs",
      "Marriage invitation card or proof of the marriage ceremony (for Hindu Marriage Act registration)",
      "Witnesses' identity proof",
    ],
    fees: { registration: "A nominal registration fee applies, exact amount set by your state/municipal registrar" },
    processingTime: "Varies by state -- some allow same-day registration with complete documents, others take a few weeks, especially under the Special Marriage Act which has a mandatory notice period",
    onlineSteps: [
      "Most states/cities have a dedicated online marriage registration portal (search for your state or city's official marriage registration portal, e.g. major metro municipal corporations often run their own)",
      "Fill the application, upload documents, and book an appointment slot with the registrar",
      "Attend in person with both parties and witnesses for the registrar to finalize registration",
    ],
    offlineSteps: [
      "Visit your local Sub-Registrar or Marriage Registrar's office",
      "Submit the application with supporting documents and witnesses",
      "Complete verification and registration in person",
    ],
    commonMistakes: [
      "Applying under the wrong Act for your situation (Hindu Marriage Act vs Special Marriage Act have different document and notice requirements)",
      "Missing the Special Marriage Act's mandatory notice period, which can delay registration by weeks",
      "Witness documents not matching the form's requirements",
    ],
    faqs: [
      {
        q: "Which Act should we register under?",
        a: "The Hindu Marriage Act generally applies when both parties are Hindu, Buddhist, Jain, or Sikh and have already had a religious ceremony. The Special Marriage Act is used for inter-religious marriages or when a civil registration is preferred without a religious ceremony, and involves a notice period before registration.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "domicile-certificate",
    name: "Domicile Certificate",
    department: "Identity Documents",
    category: "Identity Documents",
    categoryIcon: "🪪",
    overview:
      "A certificate proving you're a permanent resident of a particular state, commonly needed for state government jobs, state quota college admissions, and certain state scholarships.",
    eligibility: "Residents who have lived in the state for the minimum duration set by that state (commonly several years; exact rule varies by state).",
    documents: [
      "Proof of residence for the required duration (ration card, voter ID, property documents, school records showing years of study in-state)",
      "Aadhaar card",
      "Birth certificate or school leaving certificate",
    ],
    fees: { application: "Usually a small nominal fee (a few hundred rupees or less), varies by state" },
    processingTime: "1-4 weeks typically, depending on state and verification requirements",
    onlineSteps: [
      "Apply via your state's e-district or citizen services portal (each state runs its own -- search for '[your state] e-district domicile certificate')",
      "Upload proof of residence duration and identity documents",
      "Track application status on the same portal",
    ],
    offlineSteps: [
      "Visit your local Tahsildar/Revenue office or Common Service Centre (CSC)",
      "Submit the application form with supporting documents",
      "Collect the certificate once verification is complete",
    ],
    commonMistakes: [
      "Not having enough documentation to prove the state's specific minimum residency duration",
      "Applying through the wrong district office relative to your registered address",
    ],
    faqs: [
      {
        q: "How long do I need to have lived in a state to get its domicile certificate?",
        a: "This varies by state -- some require continuous residence of several years, others link it to owning property or completing schooling there. Check your specific state's e-district portal for the exact rule.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
    stateOverrides: {
      Karnataka: {
        officialLinks: ["https://nadakacheri.karnataka.gov.in", "https://sevasindhu.karnataka.gov.in"],
        onlineSteps: [
          "Apply via the Nadakacheri portal (nadakacheri.karnataka.gov.in) -- login with your Aadhaar-linked mobile number and OTP, no separate account needed",
          "Select 'New Request' > the relevant residence/domicile certificate service",
          "Fill in your details and upload supporting documents",
          "Alternatively, apply via Seva Sindhu (sevasindhu.karnataka.gov.in), which also offers over-the-counter issuance in some cases",
          "Track using your acknowledgment (RD) number",
        ],
      },
    },
  },

  {
    id: "income-certificate",
    name: "Income Certificate",
    department: "Identity Documents",
    category: "Identity Documents",
    categoryIcon: "🪪",
    overview:
      "A certificate stating your (or your family's) annual income, commonly required for scholarships, fee concessions, EWS/reservation benefits, and various welfare scheme applications.",
    eligibility: "Any resident needing to declare income for an official purpose; issued by the Revenue Department based on declared income and local verification.",
    documents: [
      "Aadhaar card",
      "Proof of income (salary slip, IT return, or self-declaration for informal income)",
      "Address proof",
      "Passport-size photo (in some states)",
    ],
    fees: { application: "A small nominal fee, typically ₹20-50, varies by state" },
    processingTime: "Generally 1-3 weeks, can be faster in states with instant e-KYC-based issuance",
    onlineSteps: [
      "Apply via your state's e-district or citizen services portal (each state runs its own -- search for '[your state] e-district income certificate')",
      "Fill in income details for all earning family members and upload supporting documents",
      "Track status and download once approved",
    ],
    offlineSteps: [
      "Visit your local Tahsildar/Revenue office or Common Service Centre (CSC)",
      "Submit the application with supporting income and identity documents",
      "Collect the certificate once verification is complete",
    ],
    commonMistakes: [
      "Declaring only one family member's income when the form asks for total family income",
      "Missing income sources (agriculture, pension, informal work) that the form requires you to declare",
    ],
    faqs: [
      {
        q: "How long is an income certificate valid for?",
        a: "Most states treat it as valid for about a year for scheme/scholarship purposes, but always check the specific requirement of whatever you're applying for -- some ask for a certificate issued within the last 6 months.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-07-05",
    stateOverrides: {
      Karnataka: {
        fees: { application: "₹25" },
        processingTime: "Often same-day to a few days via Nadakacheri; Deputy Tahsildar is the issuing authority",
        officialLinks: ["https://nadakacheri.karnataka.gov.in", "https://sevasindhu.karnataka.gov.in"],
        onlineSteps: [
          "Go to nadakacheri.karnataka.gov.in and log in with your Aadhaar-linked mobile number and OTP (no separate account/password needed)",
          "Select 'New Request' > 'Income Certificate'",
          "Enter applicant details, Aadhaar number, and income from all sources (salary, agriculture, business, pension, etc.) for all earning family members",
          "Upload supporting documents (PDF, under 200 KB each)",
          "Complete Aadhaar OTP e-sign and pay ₹25 online",
          "Note your RD (acknowledgment) number to track and download the certificate",
        ],
      },
    },
  },

  {
    id: "caste-certificate",
    name: "Caste Certificate",
    department: "Identity Documents",
    category: "Identity Documents",
    categoryIcon: "🪪",
    overview:
      "A certificate confirming an applicant's caste status (SC/ST/OBC), used for reservation benefits in education, employment, and various government schemes.",
    eligibility: "Applicants belonging to a caste recognized as SC, ST, or OBC in the applicant's state (the recognized list can vary somewhat by state).",
    documents: [
      "Aadhaar card",
      "Proof of caste from a blood relative (father's/grandfather's caste certificate, school records showing caste, or community records)",
      "Address proof establishing residency in the state",
      "Passport-size photo",
    ],
    fees: { application: "A small nominal fee, typically ₹20-50, varies by state" },
    processingTime: "2-4 weeks typically, as verification often involves local revenue officials confirming community records",
    onlineSteps: [
      "Apply via your state's e-district or citizen services portal (search '[your state] e-district caste certificate')",
      "Upload proof of caste and supporting documents",
      "Track application status on the same portal",
    ],
    offlineSteps: [
      "Visit your local Tahsildar/Revenue office",
      "Submit the application with supporting documents; a local verification/inquiry may follow",
      "Collect the certificate once approved",
    ],
    commonMistakes: [
      "Missing a blood-relative proof document, which most states require to substantiate the caste claim",
      "Applying in a state different from where your family's caste records are registered, which can complicate verification",
    ],
    faqs: [
      {
        q: "My father's caste certificate is from a different state -- can I still get one?",
        a: "It's more complex, since caste certificate validity and recognized categories can vary by state. Migration caste certificate rules exist in most states for this situation -- check your state's specific process, as it usually requires additional documentation.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
    stateOverrides: {
      Karnataka: {
        officialLinks: ["https://nadakacheri.karnataka.gov.in"],
        onlineSteps: [
          "Go to nadakacheri.karnataka.gov.in and log in with your Aadhaar-linked mobile number and OTP",
          "Select 'New Request' > 'Caste Certificate'",
          "Fill in applicant and caste details and upload supporting documents",
          "Track using your RD (acknowledgment) number",
        ],
      },
    },
  },

  {
    id: "ews-certificate",
    name: "EWS Certificate",
    department: "Identity Documents",
    category: "Identity Documents",
    categoryIcon: "🪪",
    overview:
      "Economically Weaker Section (EWS) certificate, used to claim the 10% EWS reservation in education and government jobs for those not covered by SC/ST/OBC reservations but meeting income/asset criteria.",
    eligibility:
      "Applicants not covered under existing SC/ST/OBC reservation, whose family's gross annual income is below ₹8 lakh and who don't exceed specified land/property thresholds (exact asset limits are set centrally but verify current figures, as these are periodically reviewed).",
    documents: [
      "Aadhaar card",
      "Income proof for all family members",
      "Land/property ownership documents (to confirm you're within the asset limits)",
      "Address proof",
    ],
    fees: { application: "A small nominal fee, typically ₹20-50, varies by state" },
    processingTime: "2-4 weeks typically",
    onlineSteps: [
      "Apply via your state's e-district or citizen services portal (search '[your state] e-district EWS certificate')",
      "Enter income and asset details for the whole family",
      "Upload supporting documents",
      "Track and download once approved",
    ],
    offlineSteps: [
      "Visit your local Tahsildar/Revenue office",
      "Submit the application with income and asset documentation",
      "Collect the certificate once verified",
    ],
    commonMistakes: [
      "Not declaring all family assets (agricultural land, residential property) that count toward the eligibility threshold",
      "Using an outdated certificate -- EWS certificates are typically valid only for the financial year they're issued in, so you'll often need a fresh one each year",
    ],
    faqs: [
      {
        q: "How often do I need to renew my EWS certificate?",
        a: "Most application processes (exams, admissions) require an EWS certificate issued within the current financial year, so plan to get a fresh one annually rather than reusing an old one.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  // ---- Banking ----

  {
    id: "open-savings-account",
    name: "Open a Savings Bank Account",
    department: "Banking",
    category: "Banking",
    categoryIcon: "🏦",
    overview:
      "Opening a new savings bank account, either in person at a branch or via a bank's video/online KYC process.",
    eligibility: "Any resident individual; minors can have accounts opened jointly with or guardianship by a parent.",
    documents: [
      "Aadhaar card (used for e-KYC by most banks)",
      "PAN card (or Form 60 declaration if you don't have one yet)",
      "Passport-size photograph",
      "Initial deposit, if the account type requires a minimum balance",
    ],
    fees: { accountOpening: "Free at most banks", minimumBalance: "Varies by bank and account type -- some offer zero-balance accounts" },
    processingTime: "Instant to same-day for video/e-KYC accounts; a few days for branch-based physical KYC",
    onlineSteps: [
      "Choose a bank and open their account-opening page or app",
      "Complete Aadhaar-based e-KYC (OTP or biometric) and enter PAN details",
      "Complete a video KYC call if the bank requires it for full-service accounts",
      "Fund the account and receive your account number, debit card, and net banking details",
    ],
    offlineSteps: [
      "Visit a bank branch with your documents and photograph",
      "Fill the account opening form and complete in-person KYC",
      "Make the initial deposit if required and collect your passbook/welcome kit",
    ],
    commonMistakes: [
      "Not checking minimum balance requirements before choosing an account type, leading to penalty charges later",
      "Address mismatch between Aadhaar and the address given on the form",
    ],
    faqs: [
      {
        q: "Can I open a bank account fully online without visiting a branch?",
        a: "Many banks now offer this via Aadhaar e-KYC plus a video KYC call, though some account types (or if your Aadhaar isn't linked to your current mobile number) may still require a branch visit.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-07-01",
  },

  {
    id: "bank-kyc-update",
    name: "Bank KYC / Re-KYC Update",
    department: "Banking",
    category: "Banking",
    categoryIcon: "🏦",
    overview:
      "Updating your KYC (Know Your Customer) details with your bank, either because something changed (address, phone) or because your bank has asked for periodic re-KYC as required by RBI rules.",
    eligibility: "Any existing bank account holder; RBI mandates periodic re-KYC (frequency depends on your risk category as assessed by the bank).",
    documents: [
      "Aadhaar card",
      "PAN card",
      "Updated address proof, if your address has changed",
      "Recent photograph, if requested",
    ],
    fees: { reKyc: "Free -- banks cannot charge for KYC updates" },
    processingTime: "Instant for online/video KYC; a few days if done via physical form at a branch",
    onlineSteps: [
      "Check your bank's app or net banking for a 'Re-KYC' or 'Update KYC' option",
      "Complete it via Aadhaar OTP e-KYC or a video KYC call if offered",
      "Some banks allow KYC document upload via email as an alternative -- check your specific bank's process",
    ],
    offlineSteps: [
      "Visit your branch with updated documents",
      "Fill the KYC update form and submit for verification",
    ],
    commonMistakes: [
      "Ignoring a re-KYC request, which can lead to the account being frozen for debit transactions until it's completed",
      "Not updating your registered mobile number, which blocks OTP-based KYC options and forces a branch visit",
    ],
    faqs: [
      {
        q: "What happens if I don't complete re-KYC when asked?",
        a: "Banks can restrict or freeze the account (typically for debits/withdrawals first) until KYC is completed, per RBI's periodic KYC update requirements. It's worth doing promptly once your bank notifies you.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-07-01",
  },

  {
    id: "bank-nominee-update",
    name: "Add or Update Bank Account Nominee",
    department: "Banking",
    category: "Banking",
    categoryIcon: "🏦",
    overview:
      "Adding, changing, or removing a nominee on your bank account, fixed deposit, locker, or safe custody item -- so it's clear who can claim it if something happens to you. RBI rules updated in late 2025 now allow up to four nominees per account instead of just one.",
    eligibility: "Any account holder; nomination is optional but strongly recommended by RBI, and banks must offer it and record a written declaration if you choose to opt out.",
    documents: [
      "Nominee's name, relationship, and date of birth",
      "Your account/FD/locker details",
      "Signature (physical form) or app-based e-KYC confirmation (digital nomination)",
    ],
    fees: { nomination: "Free" },
    processingTime: "Instant for digital nomination via app/net banking; a few days if submitted physically at a branch",
    onlineSteps: [
      "Log in to your bank's app or net banking and find 'Manage Nominee' or 'Update Nomination'",
      "Add up to four nominees and specify each one's share (percentages must total 100%), or set them as successive (one at a time) rather than simultaneous",
      "Confirm via OTP -- most banks now support fully digital nomination",
    ],
    offlineSteps: [
      "Submit Form DA1 at your branch to add or change nominees, or Form DA2 to cancel a nomination",
      "Specify nominee shares clearly if naming more than one",
    ],
    commonMistakes: [
      "Leaving nomination blank entirely -- while optional, it significantly slows down claim settlement for your family later",
      "Forgetting to update nominees after a major life event (marriage, birth of a child, divorce)",
      "Not specifying percentage shares when naming multiple nominees, which can cause disputes",
    ],
    faqs: [
      {
        q: "How many nominees can I add now?",
        a: "Under RBI's updated rules effective November 2025 (Banking Laws (Amendment) Act, 2025), you can nominate up to four people per account, locker, or safe-custody item, either as simultaneous nominees with defined shares or in a successive order.",
      },
      {
        q: "Is nomination compulsory?",
        a: "No, it's optional. But banks are now required to proactively offer it, and if you decline, they must record a written opt-out declaration from you.",
      },
    ],
    officialLinks: ["https://www.rbi.org.in"],
    lastUpdated: "2026-07-15",
  },

  {
    id: "bank-passbook-reissue",
    name: "Passbook Reissue / Update",
    department: "Banking",
    category: "Banking",
    categoryIcon: "🏦",
    overview: "Requesting a new or updated passbook for your savings/current account -- for a lost passbook, a full one, or just to print recent entries.",
    eligibility: "Any account holder.",
    documents: ["Account number", "Existing passbook (if requesting an update, not a replacement)", "Identity proof, if requesting a duplicate for a lost passbook"],
    fees: { update: "Free", duplicate: "A small charge may apply for a lost passbook, varies by bank" },
    processingTime: "Same-day at most branches",
    onlineSteps: [
      "Some banks offer passbook printing at self-service kiosks, or e-passbook via the app as an alternative",
      "For a physical reissue, this typically still requires a branch visit",
    ],
    offlineSteps: [
      "Visit your branch or a self-service passbook printer with your existing passbook (or ID proof if it's lost)",
      "Request an update or reissue at the counter or kiosk",
    ],
    commonMistakes: ["Assuming passbook update is available fully online -- most banks still require a branch visit or in-branch kiosk for the physical book"],
    faqs: [],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "bank-chequebook-request",
    name: "Request a New Chequebook",
    department: "Banking",
    category: "Banking",
    categoryIcon: "🏦",
    overview: "Ordering a new chequebook for your account, either because you've used up your current one or need one for a new account.",
    eligibility: "Any account holder whose account type includes cheque-book facility.",
    documents: ["Account number", "Existing chequebook requisition slip, if using the physical process"],
    fees: { chequebook: "Often free for a limited number per year, then a small per-book charge -- varies by bank and account type" },
    processingTime: "3-7 working days for delivery by post; some banks offer instant printing at select branches",
    onlineSteps: [
      "Log in to your bank's app or net banking and select 'Request Chequebook'",
      "Confirm delivery address and number of leaves (if the bank offers a choice)",
      "Track delivery status in the app",
    ],
    offlineSteps: [
      "Submit the requisition slip from your current chequebook at a branch or drop box",
      "Or request at the branch counter directly",
    ],
    commonMistakes: ["Requesting delivery to an outdated address without updating it first"],
    faqs: [],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "fixed-deposit-open",
    name: "Open a Fixed Deposit (FD)",
    department: "Banking",
    category: "Banking",
    categoryIcon: "🏦",
    overview: "Opening a fixed deposit with your bank to earn a fixed interest rate over a chosen tenure.",
    eligibility: "Any existing account holder (most banks require an existing savings/current account to link the FD to).",
    documents: ["Existing account details", "PAN card (mandatory for FDs above a certain interest threshold to avoid higher TDS)"],
    fees: { premature_withdrawal_penalty: "Applies if you break the FD early -- rate varies by bank, typically 0.5-1% reduction in interest" },
    processingTime: "Instant via net banking/app; same-day if done at a branch",
    onlineSteps: [
      "Log in to your bank's app or net banking and select 'Open Fixed Deposit'",
      "Choose the amount, tenure, and whether interest is paid out periodically or reinvested (cumulative)",
      "Confirm -- the FD is usually created instantly, funded from your linked savings account",
    ],
    offlineSteps: [
      "Visit your branch with your account details and the deposit amount",
      "Fill the FD application form and choose your tenure/payout option",
    ],
    commonMistakes: [
      "Not submitting Form 15G/15H (if your total income is below the taxable limit) to avoid unnecessary TDS deduction on FD interest",
      "Breaking an FD early without checking the penalty, losing more interest than expected",
    ],
    faqs: [
      {
        q: "Is FD interest taxable?",
        a: "Yes, FD interest is added to your taxable income and TDS is deducted by the bank if it crosses the threshold in a financial year, unless you submit Form 15G/15H declaring your income is below the taxable limit.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "personal-loan-apply",
    name: "Apply for a Personal Loan",
    department: "Banking",
    category: "Banking",
    categoryIcon: "🏦",
    overview: "Applying for an unsecured personal loan from a bank or NBFC for personal expenses, medical needs, or debt consolidation.",
    eligibility: "Varies by lender -- generally salaried or self-employed individuals meeting minimum income and credit score requirements set by that lender.",
    documents: [
      "PAN card and Aadhaar card",
      "Income proof (salary slips or IT returns)",
      "Bank statements (typically last 3-6 months)",
      "Employment proof, for salaried applicants",
    ],
    fees: { processingFee: "Typically 1-3% of loan amount, varies by lender", interestRate: "Varies widely by lender and your credit profile -- compare before committing" },
    processingTime: "A few hours to a few days for approval, depending on lender and documentation completeness",
    onlineSteps: [
      "Apply via your bank's app/website or a lending platform",
      "Complete e-KYC and upload income/bank statement documents",
      "Review the loan offer (amount, tenure, interest rate) before accepting",
      "Funds are typically disbursed directly to your linked bank account once approved",
    ],
    offlineSteps: [
      "Visit a branch and submit a loan application with supporting documents",
      "A loan officer will review and communicate approval status",
    ],
    commonMistakes: [
      "Not comparing interest rates and processing fees across lenders before applying",
      "Applying to multiple lenders simultaneously, which can temporarily lower your credit score due to multiple hard inquiries",
    ],
    faqs: [
      {
        q: "What credit score do I need for a personal loan?",
        a: "This varies by lender, but a CIBIL score of 700+ generally improves approval odds and interest rate offers. Lenders with more flexible criteria exist for lower scores, often at higher interest rates.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "credit-card-apply",
    name: "Apply for a Credit Card",
    department: "Banking",
    category: "Banking",
    categoryIcon: "🏦",
    overview: "Applying for a credit card from a bank, based on income and credit history.",
    eligibility: "Varies by card and issuer -- generally requires minimum income and a reasonable credit score; some banks offer secured cards against a fixed deposit for those without a credit history.",
    documents: ["PAN card and Aadhaar card", "Income proof (salary slips or IT returns)", "Existing bank relationship details, if applying with your own bank"],
    fees: { annualFee: "Varies widely by card -- ranges from free/lifetime-free to several thousand rupees for premium cards", joiningFee: "Varies by card" },
    processingTime: "Instant approval in principle is common; physical card delivery typically takes 5-10 working days",
    onlineSteps: [
      "Apply via your bank's app/website or a card comparison platform",
      "Complete e-KYC and upload income documents",
      "Get an in-principle approval, often instantly, followed by final approval and dispatch",
    ],
    offlineSteps: ["Visit a branch and apply with supporting income documents"],
    commonMistakes: [
      "Not comparing annual fees and reward structures against your actual spending pattern",
      "Applying for multiple cards in a short span, which can affect your credit score",
    ],
    faqs: [
      {
        q: "I don't have a credit history -- can I still get a credit card?",
        a: "Yes, many banks offer secured credit cards backed by a fixed deposit, which is a common way to build credit history if you're new to credit.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "block-lost-atm-card",
    name: "Block a Lost or Stolen ATM/Debit Card",
    department: "Banking",
    category: "Banking",
    categoryIcon: "🏦",
    overview: "Immediately blocking a lost, stolen, or compromised ATM/debit card to prevent unauthorized transactions, and requesting a replacement.",
    eligibility: "Any cardholder.",
    documents: ["Card/account number (or registered mobile number, which most banks can use to identify your account)"],
    fees: { blocking: "Free", replacementCard: "A nominal fee typically applies for a replacement card, varies by bank" },
    processingTime: "Blocking is instant; replacement card delivery typically 5-10 working days",
    onlineSteps: [
      "Use your bank's app or net banking to block the card instantly (usually under 'Card Services' or 'Block Card')",
      "Alternatively, call your bank's 24x7 customer care number to block it immediately over the phone",
      "Request a replacement card through the same app/portal",
    ],
    offlineSteps: ["Call your bank's helpline immediately, or visit a branch to block the card and request a replacement"],
    commonMistakes: [
      "Delaying blocking the card while trying to locate it -- block first, look for it after, since unauthorized transactions can happen quickly",
      "Not also changing your UPI PIN/net banking password if you suspect broader compromise, not just the physical card",
    ],
    faqs: [
      {
        q: "Am I liable for unauthorized transactions before I blocked the card?",
        a: "RBI's customer liability rules generally limit your liability if you report the loss/unauthorized transaction promptly (within 3 working days for zero liability in most cases) -- report immediately and follow up in writing with your bank.",
      },
    ],
    officialLinks: ["https://www.rbi.org.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "upi-failed-transaction",
    name: "Resolve a Failed or Disputed UPI Transaction",
    department: "Banking",
    category: "Banking",
    categoryIcon: "🏦",
    overview: "Getting a refund or resolution for a UPI payment that failed, was debited but not credited to the recipient, or wasn't authorized by you.",
    eligibility: "Any UPI user.",
    documents: ["Transaction reference/UTR number", "Screenshot of the transaction", "Registered mobile number linked to the UPI ID"],
    fees: { dispute: "Free" },
    processingTime: "Most failed-transaction auto-reversals happen within a few hours to a few days (T+1 typically); formal disputes can take up to a few weeks",
    onlineSteps: [
      "Open your UPI app (PhonePe, Google Pay, Paytm, etc.) and find the transaction in history",
      "Use the 'Raise a complaint' or 'Report issue' option against that specific transaction",
      "If unresolved after your UPI app's process, file a complaint via the NPCI's UPI complaint portal or your bank's UPI grievance channel",
      "Note your complaint reference number to track resolution",
    ],
    offlineSteps: ["Contact your bank's customer care or visit a branch with the transaction details if the app-based process doesn't resolve it"],
    commonMistakes: [
      "Not noting the transaction reference/UTR number, which is needed to trace and resolve the issue",
      "Waiting too long to raise a dispute -- most schemes have a window (often 30 days) within which to report",
    ],
    faqs: [
      {
        q: "Money was debited from my account but the recipient didn't get it -- what do I do?",
        a: "This usually auto-reverses within T+1 working day. If it doesn't, raise a complaint in your UPI app against that transaction, or escalate to NPCI's UPI complaint portal with your UTR number.",
      },
    ],
    officialLinks: ["https://www.npci.org.in"],
    lastUpdated: "2026-06-01",
  },

  // ---- Income Tax (additional services) ----

  {
    id: "pan-new-application",
    name: "New PAN Card Application",
    department: "Income Tax",
    category: "Income Tax",
    categoryIcon: "💰",
    overview: "Applying for a first-time PAN (Permanent Account Number), required for filing taxes and most financial transactions in India.",
    eligibility: "Any individual, HUF, or entity without an existing PAN.",
    documents: ["Aadhaar card (for e-KYC based instant PAN)", "Proof of identity, address, and date of birth if not using Aadhaar e-KYC"],
    fees: { ePan: "Free (instant e-PAN via Aadhaar e-KYC)", physicalCard: "₹107 for a physical card delivered within India" },
    processingTime: "e-PAN: typically within 10 minutes to 48 hours via instant e-KYC; physical card: 15-20 working days",
    onlineSteps: [
      "Go to the Income Tax e-filing portal (incometax.gov.in) and use 'Instant e-PAN' for a free, Aadhaar-OTP-based PAN if you meet the criteria (valid Aadhaar with linked mobile number, not already having a PAN)",
      "Alternatively, apply via the NSDL/Protean or UTIITSL PAN portals for a physical card, filling Form 49A",
      "Complete e-KYC and pay the fee if opting for a physical card",
      "Track status using your acknowledgment number",
    ],
    offlineSteps: [
      "Visit a PAN service center (Protean/UTIITSL) with Form 49A and supporting documents",
      "Submit and pay the applicable fee",
    ],
    commonMistakes: [
      "Applying for a new PAN without realizing you already have one (holding two PANs is illegal and penalized)",
      "Name mismatch between Aadhaar and the application form",
    ],
    faqs: [
      {
        q: "Is instant e-PAN really free?",
        a: "Yes -- if you have a valid Aadhaar with a linked mobile number and don't already have a PAN, the Income Tax Department's Instant e-PAN facility on incometax.gov.in issues a free e-PAN, usually very quickly.",
      },
    ],
    officialLinks: ["https://www.incometax.gov.in", "https://www.onlineservices.nsdl.com", "https://www.protean-tinpan.com"],
    lastUpdated: "2026-07-01",
  },

  {
    id: "pan-aadhaar-linking",
    name: "Link PAN with Aadhaar (Reactivate Inoperative PAN)",
    department: "Income Tax",
    category: "Income Tax",
    categoryIcon: "💰",
    overview:
      "Linking your PAN with Aadhaar, which is mandatory. The original free-linking deadlines have passed (31 May 2024 for most PAN holders; 31 December 2025 for those whose PAN was issued using an Aadhaar Enrolment ID). If your PAN isn't linked, it's currently 'inoperative' and this service walks through reactivating it.",
    eligibility: "Any PAN holder eligible for Aadhaar whose PAN is not yet linked -- if you're unsure, check your status first (see FAQs).",
    documents: ["PAN number", "Aadhaar number", "Mobile number registered with Aadhaar (for OTP)"],
    fees: { lateLinkingFee: "₹1,000 flat fee, paid via e-Pay Tax under Minor Head 500 ('Other Receipts')" },
    processingTime: "The fee payment must be credited first (a few working days), after which the Link Aadhaar request can be submitted; PAN reactivation after successful linking typically takes up to 30 days",
    onlineSteps: [
      "Go to the e-filing portal (incometax.gov.in) and use the 'e-Pay Tax' option",
      "Select the appropriate option for PAN-Aadhaar linking payment (Minor Head 500) and pay the ₹1,000 fee",
      "Once payment is confirmed (allow a few days), go to 'Link Aadhaar' on the e-filing portal home page",
      "Enter PAN and Aadhaar numbers, verify via Aadhaar OTP, and submit",
      "Check status anytime via 'Link Aadhaar Status' on the same portal",
    ],
    offlineSteps: [
      "If online linking fails due to a name/DOB/mobile number mismatch between PAN and Aadhaar, you may need biometric-based authentication at a PAN Service Provider center (Protean or UTIITSL), carrying your PAN, Aadhaar, and the ₹1,000 fee payment challan",
    ],
    commonMistakes: [
      "Trying to submit the Link Aadhaar request before the ₹1,000 fee payment has actually been credited -- wait a few days after payment",
      "Not realizing a mismatch in name/DOB between PAN and Aadhaar records will block the automated linking, requiring correction of one of the two records first",
    ],
    faqs: [
      {
        q: "How do I check if my PAN is already linked to Aadhaar?",
        a: "Use the 'Link Aadhaar Status' checker on the Income Tax e-filing portal (incometax.gov.in) -- enter your PAN and Aadhaar number to see if it's already linked, pending, or not linked.",
      },
      {
        q: "What happens if my PAN stays inoperative?",
        a: "An inoperative PAN blocks ITR filing and refunds, triggers TDS/TCS at a higher rate (20% under Section 206AA/206CC), and can disrupt PAN-based transactions like opening bank accounts or buying mutual funds, until it's reactivated.",
      },
    ],
    officialLinks: ["https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/link-aadhaar"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "itr-filing",
    name: "File Income Tax Return (ITR)",
    department: "Income Tax",
    category: "Income Tax",
    categoryIcon: "💰",
    overview:
      "Filing your annual income tax return. For the current filing season (Assessment Year 2026-27, covering income earned in FY 2025-26, i.e. before 1 April 2026), filing continues entirely under the earlier Income Tax Act, 1961 rules and forms, even though the new Income Tax Act, 2025 has come into force for income earned afterward.",
    eligibility: "Mandatory if your income exceeds the basic exemption limit, or in several other specified situations (e.g. foreign asset holders, certain high-value transactions) -- optional but often beneficial otherwise (for refunds, loan/visa applications, carrying forward losses).",
    documents: [
      "PAN and Aadhaar (linked)",
      "Form 16 (for salaried individuals)",
      "Bank statements and interest certificates",
      "Form 26AS / Annual Information Statement (AIS) for a summary of your income and TDS",
      "Investment proofs for deductions claimed (80C, 80D, etc.)",
    ],
    fees: { filing: "Free to file yourself on the e-filing portal", lateFilingFee: "Up to ₹5,000 under Section 234F if filed after the due date (as a belated return)" },
    processingTime: "Filing itself takes minutes to a couple of hours depending on complexity; processing/refund by the department typically takes a few weeks to a few months after filing",
    onlineSteps: [
      "Log in to the e-filing portal (incometax.gov.in) with your PAN",
      "Select 'File Income Tax Return', choose Assessment Year 2026-27, and pick the correct ITR form based on your income sources",
      "Much of your data (salary, TDS, interest) is pre-filled from Form 26AS/AIS -- review it carefully against your own records",
      "Claim eligible deductions, verify the computed tax/refund, and submit",
      "Complete e-verification (Aadhaar OTP, net banking, or other methods) -- your return isn't considered filed until verified",
    ],
    offlineSteps: [
      "For those without easy internet access, filing assistance is available at Income Tax Department help centers or via a tax professional, though the return itself is ultimately submitted through the same online portal",
    ],
    commonMistakes: [
      "Missing the due date -- for salaried/ITR-1/2 filers this is typically 31 July, and 31 August for non-audit ITR-3/4 filers, for the current AY 2026-27 season; missing it means a belated return with a late fee",
      "Forgetting to e-verify after submitting -- an unverified return is treated as not filed",
      "Not cross-checking pre-filled data against your own Form 16/AIS, since pre-filled figures can occasionally be incomplete or wrong",
    ],
    faqs: [
      {
        q: "Which Income Tax Act applies to my return this year?",
        a: "For Assessment Year 2026-27 (income earned in FY 2025-26, before April 2026), your return is filed entirely under the earlier Income Tax Act, 1961 -- the new Income Tax Act, 2025 only applies to income earned from April 2026 onward (Tax Year 2026-27), which won't be due for filing until 2027.",
      },
      {
        q: "What if I miss the due date?",
        a: "You can still file a belated return, typically until 31 December of the assessment year, but you'll pay a late fee under Section 234F (up to ₹5,000) plus interest on any unpaid tax, and lose the option to switch to the old tax regime for that year.",
      },
    ],
    officialLinks: ["https://www.incometax.gov.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "form-26as-ais-view",
    name: "View Form 26AS / Annual Information Statement (AIS)",
    department: "Income Tax",
    category: "Income Tax",
    categoryIcon: "💰",
    overview:
      "Viewing your tax credit statement (Form 26AS) and the more detailed Annual Information Statement (AIS), which summarize TDS/TCS deducted, taxes paid, and financial transactions reported against your PAN -- essential for checking before filing your ITR.",
    eligibility: "Any PAN holder.",
    documents: ["PAN number", "Access to the e-filing portal login"],
    fees: { viewing: "Free" },
    processingTime: "Instant -- viewable anytime online",
    onlineSteps: [
      "Log in to the e-filing portal (incometax.gov.in)",
      "For Form 26AS: go to 'e-File' > 'Income Tax Returns' > 'View Form 26AS', which redirects to the TRACES portal",
      "For AIS: go to the 'AIS' section directly on the e-filing portal for a more detailed breakdown of income and transactions reported by banks, employers, and other entities",
      "Cross-check both against your own records before filing your ITR",
    ],
    offlineSteps: [],
    commonMistakes: [
      "Only checking Form 26AS and skipping AIS -- AIS often has more detail (e.g. dividend income, mutual fund transactions) worth reviewing separately",
      "Not raising feedback on AIS for incorrect entries -- the portal has a feedback mechanism to flag discrepancies before you file",
    ],
    faqs: [
      {
        q: "What's the difference between Form 26AS and AIS?",
        a: "Form 26AS mainly shows tax deducted/collected against your PAN. AIS is broader, additionally covering things like dividend income, mutual fund and securities transactions, and foreign remittances reported by various institutions.",
      },
    ],
    officialLinks: ["https://www.incometax.gov.in", "https://www.tdscpc.gov.in"],
    lastUpdated: "2026-07-01",
  },

  {
    id: "form-16-download",
    name: "Download Form 16",
    department: "Income Tax",
    category: "Income Tax",
    categoryIcon: "💰",
    overview: "Obtaining Form 16, the TDS certificate your employer issues showing salary paid and tax deducted, needed to file your ITR.",
    eligibility: "Salaried employees whose employer has deducted TDS on salary.",
    documents: ["None -- this is issued by your employer, not applied for on a government portal"],
    fees: { issuance: "Free -- employers are required to issue this" },
    processingTime: "Employers typically issue Form 16 by 15 June following the end of the financial year",
    onlineSteps: [
      "Most employers provide Form 16 through their HR/payroll portal -- check there first",
      "If unavailable, request it directly from your employer's HR/finance team",
    ],
    offlineSteps: ["Request a physical copy from your employer's HR department if a digital copy isn't provided"],
    commonMistakes: ["Waiting until the ITR deadline to request Form 16 from an employer who's delayed issuing it -- follow up early in the filing season"],
    faqs: [
      {
        q: "What if my employer hasn't issued Form 16?",
        a: "You can still file your ITR using your payslips, Form 26AS, and AIS to reconstruct your income and TDS details, though Form 16 makes the process considerably easier -- follow up with your employer's HR/finance team, as they're required to issue it.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "itr-refund-status",
    name: "Check Income Tax Refund Status",
    department: "Income Tax",
    category: "Income Tax",
    categoryIcon: "💰",
    overview: "Checking the status of an income tax refund after filing your ITR.",
    eligibility: "Anyone who has filed an ITR showing a refund due.",
    documents: ["PAN number", "Acknowledgment number from your filed ITR"],
    fees: { checking: "Free" },
    processingTime: "Refunds are typically processed within a few weeks to a few months after e-verification, depending on return complexity and any scrutiny",
    onlineSteps: [
      "Log in to the e-filing portal (incometax.gov.in)",
      "Go to 'e-File' > 'Income Tax Returns' > 'View Filed Returns' to see processing and refund status",
      "Alternatively, check via the NSDL refund status tracker using your PAN and assessment year",
    ],
    offlineSteps: [],
    commonMistakes: [
      "Not e-verifying the return, which stalls processing entirely -- refund status won't move until verification is complete",
      "Bank account not pre-validated on the e-filing portal, which can delay or block refund credit",
    ],
    faqs: [
      {
        q: "My refund status shows 'processed' but I haven't received the money -- why?",
        a: "This is often because your bank account isn't pre-validated on the e-filing portal, or the account/IFSC details don't match. Check and pre-validate your bank account under 'Profile' > 'My Bank Account' on the portal.",
      },
    ],
    officialLinks: ["https://www.incometax.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "epay-tax-challan",
    name: "Pay Income Tax Online (e-Pay Tax / Challan)",
    department: "Income Tax",
    category: "Income Tax",
    categoryIcon: "💰",
    overview: "Paying income tax dues online -- advance tax, self-assessment tax, or any other tax payment -- through the e-Pay Tax facility on the Income Tax portal.",
    eligibility: "Any taxpayer needing to make a tax payment.",
    documents: ["PAN number", "Details of the tax type/purpose (advance tax, self-assessment tax, PAN-Aadhaar late fee, etc.)"],
    fees: { paymentProcessing: "Free -- you only pay the actual tax/fee amount due, no separate service charge from the department" },
    processingTime: "Instant confirmation; the paid challan typically reflects in Form 26AS/AIS within a few days",
    onlineSteps: [
      "Log in to the e-filing portal (incometax.gov.in) and go to 'e-Pay Tax'",
      "Select the correct tax type and Minor Head (e.g. Advance Tax, Self-Assessment Tax, or Other Receipts for specific fees like PAN-Aadhaar linking)",
      "Enter the amount and complete payment via net banking, debit card, UPI, or NEFT/RTGS",
      "Save the generated challan (CIN) for your records -- you'll need it when filing your return or for any correspondence",
    ],
    offlineSteps: ["Tax payments can also be made at authorized bank branches using the appropriate challan form, though the online route is faster and more commonly used now"],
    commonMistakes: [
      "Selecting the wrong Minor Head/tax type, which can misclassify the payment and cause confusion when it's not reflected where expected",
      "Losing the challan receipt (CIN) -- keep it, since you'll need to quote it later",
    ],
    faqs: [
      {
        q: "How long after payment does it show up in Form 26AS?",
        a: "Usually within a few days, though it can occasionally take longer. If it's been more than a week and it's still not reflecting, verify the payment went through correctly with your bank before assuming an error on the department's end.",
      },
    ],
    officialLinks: ["https://www.incometax.gov.in"],
    lastUpdated: "2026-07-01",
  },

  // ---- Government Schemes ----

  {
    id: "pm-kisan",
    name: "PM Kisan Samman Nidhi",
    department: "Government Schemes",
    category: "Government Schemes",
    categoryIcon: "🎯",
    overview:
      "A central scheme providing landholding farmer families with direct income support of ₹6,000 per year, paid in three equal installments of ₹2,000 every four months, directly to Aadhaar-linked bank accounts via Direct Benefit Transfer.",
    eligibility:
      "Landholding farmer families (husband, wife, and minor children) who collectively own cultivable land as per state/UT land records -- there is no land-size ceiling; small, marginal, and larger landholding farmers are all covered. Certain categories (e.g. institutional landholders, some government employees/pensioners above a certain level) are excluded -- check the exclusion list on the portal.",
    documents: [
      "Aadhaar card (mandatory, linked to bank account)",
      "Land ownership records as per state revenue records",
      "Bank account details",
    ],
    fees: { application: "Free" },
    processingTime: "Registration verification by state/local revenue authorities can take a few weeks; once approved, payment follows in the next scheduled installment cycle",
    onlineSteps: [
      "Go to pmkisan.gov.in and select 'New Farmer Registration'",
      "Enter Aadhaar number and complete OTP verification",
      "Fill in land and bank account details",
      "Complete mandatory Aadhaar-based e-KYC (OTP-based online, or biometric at a nearby Common Service Centre)",
      "Track status anytime using 'Beneficiary Status' on the portal with your Aadhaar/registration number",
    ],
    offlineSteps: [
      "Approach your local Patwari/Revenue Officer, Agriculture Officer, or nearest Common Service Centre (CSC) to register",
      "Provide land records and Aadhaar-linked bank details",
    ],
    commonMistakes: [
      "Not completing mandatory e-KYC, which stops future installments even for already-registered farmers",
      "Bank account not Aadhaar-seeded, causing payment failures",
      "Land records not updated/matching current revenue records, delaying verification",
    ],
    faqs: [
      {
        q: "How do I check my payment status?",
        a: "Use 'Beneficiary Status' or 'Know Your Status' on pmkisan.gov.in with your Aadhaar number, mobile number, or bank account number.",
      },
      {
        q: "Is there a land ceiling to be eligible?",
        a: "No -- since a 2019 revision, all landholding farmer families are eligible regardless of the size of their landholding, subject to the scheme's exclusion criteria (e.g. institutional landholders, certain higher-income categories).",
      },
    ],
    officialLinks: ["https://pmkisan.gov.in"],
    lastUpdated: "2026-07-20",
  },

  {
    id: "ayushman-bharat-pmjay",
    name: "Ayushman Bharat (PM-JAY) Health Card",
    department: "Government Schemes",
    category: "Government Schemes",
    categoryIcon: "🎯",
    overview:
      "India's national health assurance scheme, providing cashless health cover of up to ₹5 lakh per family per year for secondary and tertiary hospital care at empanelled hospitals nationwide -- with no restriction on family size and no waiting period for pre-existing conditions. Since 2024, all senior citizens aged 70+ are eligible regardless of income, via the Ayushman Vay Vandana card.",
    eligibility:
      "Rural families meeting SECC 2011 deprivation criteria (e.g. kutcha house, no adult earning member, disabled member) are auto-included. Urban families in specified occupational categories (e.g. construction workers, domestic workers, street vendors, and other listed informal occupations) are covered. Separately, ALL citizens aged 70 and above are eligible regardless of income or SECC status, and receive a distinct Ayushman Vay Vandana card -- those already in a PM-JAY family get an additional ₹5 lakh top-up just for themselves.",
    documents: ["Aadhaar card", "Ration card or family ID, if applicable", "Mobile number for OTP verification"],
    fees: { enrolment: "Free", treatment: "Cashless at empanelled hospitals for covered procedures -- no deposit or co-payment for eligible treatment" },
    processingTime: "Card issuance can often be completed the same day online if your family is found in the beneficiary database; otherwise verification may take longer",
    onlineSteps: [
      "Check eligibility and enrol at the Beneficiary Identification System portal (beneficiary.nha.gov.in) or via the Ayushman App",
      "Enter your mobile number, verify via OTP, and search using your Aadhaar/ration card details",
      "If found eligible, complete Aadhaar e-KYC to generate your Ayushman card",
      "For senior citizens 70+, use the same portal's dedicated Ayushman Vay Vandana enrolment flow",
    ],
    offlineSteps: [
      "Visit your nearest Common Service Centre (CSC), empanelled hospital's Ayushman Mitra desk, or Ayushman Arogya Mandir (health & wellness centre) for assisted enrolment",
    ],
    commonMistakes: [
      "Assuming you're not eligible without checking -- eligibility criteria are specific and many households qualify without realizing it, especially now with the universal 70+ coverage",
      "Not knowing your nearest empanelled hospital -- check the hospital list on the portal before a medical need arises",
    ],
    faqs: [
      {
        q: "I'm 70 or older -- do I need to be poor or in the SECC list to qualify?",
        a: "No. Since the September 2024 expansion, all citizens aged 70 and above are eligible regardless of income or socio-economic status, through the Ayushman Vay Vandana card.",
      },
      {
        q: "I already have CGHS/ECHS or private health insurance -- can I still use PM-JAY?",
        a: "If you're 70+ and on CGHS, ECHS, or Ayushman CAPF, you can choose to continue your existing scheme or switch to PM-JAY. Those with private health insurance or ESI can use PM-JAY benefits alongside their existing coverage.",
      },
    ],
    officialLinks: ["https://pmjay.gov.in", "https://beneficiary.nha.gov.in"],
    lastUpdated: "2026-07-20",
  },

  {
    id: "pm-awas-yojana",
    name: "PM Awas Yojana (Housing Scheme)",
    department: "Government Schemes",
    category: "Government Schemes",
    categoryIcon: "🎯",
    overview:
      "The central 'Housing for All' scheme providing financial assistance for building or buying a pucca house, running as two verticals: PMAY-Gramin (rural) and PMAY-Urban 2.0 (cities/towns, running 2024-2029).",
    eligibility:
      "PMAY-Gramin: households without a pucca house, or living in a kutcha/dilapidated house, listed in the SECC 2011 or Awaas+ survey data. PMAY-Urban 2.0: families in EWS, LIG, or MIG income categories who don't already own a pucca house anywhere in India (MIG income limit is currently up to ₹9 lakh/year).",
    documents: [
      "Aadhaar card",
      "Bank account details",
      "Income proof (for Urban categories)",
      "Land/house documents, where applicable",
    ],
    fees: {
      application: "Free",
      urbanSubsidy: "Up to ₹1.80 lakh interest subsidy (on loans up to ₹8 lakh, over 12 years)",
      graminAssistance: "₹1.20 lakh (plain areas) or ₹1.30 lakh (hilly/difficult areas), paid directly to your bank account in construction-linked installments",
    },
    processingTime: "Varies significantly -- Gramin assistance is released in stages tied to construction progress verified with geo-tagged photos; Urban applications depend on your Urban Local Body's processing timelines",
    onlineSteps: [
      "Gramin: confirm your name is in the Awaas+/SECC beneficiary list -- verify at your Gram Panchayat, or check on pmayg.nic.in under Awaassoft > Reports",
      "Urban: apply through your Urban Local Body, or check current application windows on pmay-urban.gov.in",
      "Keep Aadhaar, bank details, and income/land documents ready for either route",
      "Track your application using your registration number on the respective portal",
    ],
    offlineSteps: [
      "Gramin: contact your Gram Panchayat or Block Development Office (BDO) if you're not on the beneficiary list, to request inclusion in the ongoing Awaas+ survey",
      "Urban: visit your Urban Local Body office directly for application assistance",
    ],
    commonMistakes: [
      "Assuming Gramin works like a loan subsidy -- it doesn't; assistance is paid directly via DBT, not through a bank loan",
      "Not realizing PMAY-Urban 2.0 properties have a 5-year lock-in period during which they can't be sold or transferred",
      "Missing that MIG income eligibility was reduced to ₹9 lakh/year under Urban 2.0 (previously higher), assuming an old income limit still applies",
    ],
    faqs: [
      {
        q: "My name isn't on the PMAY-Gramin beneficiary list -- what can I do?",
        a: "Contact your Gram Panchayat or Block Development Office to request inclusion in the ongoing Awaas+ survey, which is used to identify and add eligible households not already captured in SECC 2011 data.",
      },
      {
        q: "Can I sell my PMAY-Urban 2.0 house right after getting it?",
        a: "No -- a 5-year lock-in period applies under central guidelines, during which the property can't be sold or transferred.",
      },
    ],
    officialLinks: ["https://pmayg.nic.in", "https://pmay-urban.gov.in"],
    lastUpdated: "2026-07-20",
  },

  {
    id: "sukanya-samriddhi-yojana",
    name: "Sukanya Samriddhi Yojana",
    department: "Government Schemes",
    category: "Government Schemes",
    categoryIcon: "🎯",
    overview:
      "A government-backed savings scheme for a girl child's future education and marriage expenses, offering a high, government-guaranteed interest rate reviewed quarterly (currently 8.2% per annum), opened at a post office or authorized bank.",
    eligibility: "A girl child from birth up to age 10; opened and operated by a parent or legal guardian on her behalf. One account per girl child, up to two girl children per family (with some exceptions for twins/triplets).",
    documents: ["Girl child's birth certificate", "Aadhaar card of the girl child and parent/guardian", "Address proof"],
    fees: { minimumDeposit: "₹250 per financial year", maximumDeposit: "₹1.5 lakh per financial year" },
    processingTime: "Account opening is typically same-day at a post office or bank branch",
    onlineSteps: [
      "Many banks now allow opening an SSY account via their net banking/app if you're an existing customer -- check your bank's offerings",
      "Otherwise, download and print the SSY account opening form from India Post or your bank's website, then submit in person",
    ],
    offlineSteps: [
      "Visit a post office or an authorized bank branch with the girl child's birth certificate and identity/address proof",
      "Fill the account opening form and make the initial deposit (minimum ₹250)",
      "Deposits can continue for 15 years from account opening; the account matures 21 years from opening",
    ],
    commonMistakes: [
      "Missing the minimum ₹250/year deposit, which makes the account go inactive (it can be reactivated later with a small penalty)",
      "Not knowing partial withdrawal is allowed (up to 50%) once the girl turns 18, for higher education expenses",
    ],
    faqs: [
      {
        q: "What's the current interest rate?",
        a: "8.2% per annum as of the most recent quarter, compounded annually. The rate is reviewed and notified quarterly by the government based on government security yields, so it can change over time.",
      },
      {
        q: "When can the account be closed?",
        a: "It matures 21 years after opening. It can also be closed prematurely for the girl's marriage once she turns 18, or partially withdrawn for higher education expenses.",
      },
    ],
    officialLinks: ["https://www.indiapost.gov.in"],
    lastUpdated: "2026-07-25",
  },

  {
    id: "mudra-loan",
    name: "PM Mudra Loan (PMMY)",
    department: "Government Schemes",
    category: "Government Schemes",
    categoryIcon: "🎯",
    overview:
      "Collateral-free loans for small and micro non-farm businesses, offered by banks, NBFCs, and MFIs under four categories based on the amount needed: Shishu, Kishor, Tarun, and the newer Tarun Plus (added for growth-stage businesses that have already repaid a Tarun loan).",
    eligibility: "Non-corporate, non-farm small/micro enterprises -- including manufacturing, trading, services, and allied agricultural activities like dairy or beekeeping. Tarun Plus specifically requires having previously availed and successfully repaid a Tarun category loan.",
    documents: [
      "Aadhaar and PAN card",
      "Business proof/plan",
      "Bank statements",
      "Category-specific documents depending on business type and loan tier",
    ],
    fees: {
      shishu: "Up to ₹50,000",
      kishor: "₹50,001 to ₹5 lakh",
      tarun: "₹5,00,001 to ₹10 lakh",
      tarunPlus: "₹10 lakh to ₹20 lakh (for businesses that have already repaid a Tarun loan)",
      collateral: "None required -- covered under the Credit Guarantee Fund for Micro Units (CGFMU)",
      interestRate: "Not fixed by government; set by the lending bank/NBFC based on their MCLR and your credit profile",
    },
    processingTime: "Varies by lender -- from a few days for smaller Shishu loans to a few weeks for larger Tarun/Tarun Plus loans requiring fuller appraisal",
    onlineSteps: [
      "Apply via the Jan Samarth portal (a unified government lending portal covering Mudra loans) or directly through your bank/NBFC's digital lending channel",
      "Fill in business details, upload documents, and submit",
      "Track status on the portal or with your chosen lender",
    ],
    offlineSteps: [
      "Visit a bank branch, RRB, small finance bank, or MFI offering Mudra loans",
      "Submit your application with business and identity documents",
    ],
    commonMistakes: [
      "Applying for the wrong tier -- Tarun Plus specifically requires a track record of an already-repaid Tarun loan, it's not open to first-time applicants",
      "Not comparing interest rates across lenders, since these aren't fixed by the government and vary by bank",
    ],
    faqs: [
      {
        q: "What is Tarun Plus and who can apply?",
        a: "Tarun Plus is a newer category offering loans from ₹10 lakh up to ₹20 lakh, introduced for businesses that have successfully repaid an earlier Tarun-category loan (₹5-10 lakh) -- it's meant for growth-stage businesses ready to scale further.",
      },
      {
        q: "Do I need collateral for a Mudra loan?",
        a: "No -- Mudra loans are collateral-free, backed instead by the Credit Guarantee Fund for Micro Units (CGFMU), which covers the lender's risk instead of requiring you to pledge assets.",
      },
    ],
    officialLinks: ["https://www.mudra.org.in", "https://www.jansamarth.in"],
    lastUpdated: "2026-07-25",
  },

  {
    id: "pmegp",
    name: "PMEGP (Employment Generation Programme)",
    department: "Government Schemes",
    category: "Government Schemes",
    categoryIcon: "🎯",
    overview:
      "A credit-linked subsidy scheme (Prime Minister's Employment Generation Programme) to help set up new micro-enterprises, where a portion of the project cost is given as margin-money subsidy and the rest financed through a bank loan.",
    eligibility: "Individuals aged 18 and above setting up a new (not existing/expanded) micro-enterprise; applications are routed through KVIC, KVIB, or the District Industries Centre (DIC) depending on location and sector. Existing units that already received subsidy under PMEGP or a similar government scheme are not eligible.",
    documents: [
      "Aadhaar card (used for OTP-based authentication on the portal)",
      "Detailed Project Report (DPR) covering business plan, investment, and expected employment generated",
      "Educational qualification proof, where applicable to the project cost slab",
      "Caste/category certificate, if applying under a reserved category for enhanced subsidy",
    ],
    fees: {
      maxProjectCost: "₹25 lakh for a manufacturing unit; ₹10 lakh for a service unit",
      subsidy: "15-35% of project cost as margin-money subsidy, varying by category (general/reserved) and location (urban/rural) -- higher subsidy rates apply to rural areas and to SC/ST/OBC/women/ex-servicemen/persons with disabilities categories",
      collateral: "Projects up to ₹10 lakh are collateral-free under RBI guidelines; CGTMSE provides collateral guarantee for the ₹10-25 lakh range",
    },
    processingTime: "Application review by the District Level Task Force, followed by bank appraisal -- can take several weeks to a few months depending on documentation completeness and bank processing",
    onlineSteps: [
      "Go to kviconline.gov.in and open the PMEGP e-Portal section",
      "Check eligibility and authenticate via Aadhaar OTP",
      "A User ID and password are generated and sent by SMS -- log back in to complete the full application",
      "Fill in project details, upload your DPR and required documents, complete the score card, and submit",
      "Track status through to final disbursement on the same portal",
    ],
    offlineSteps: [
      "Approach your nearest KVIC/KVIB office or District Industries Centre (DIC) for application assistance",
    ],
    commonMistakes: [
      "Exaggerating the project cost to claim a higher subsidy -- applications are scrutinized against a standardized score card and this can lead to rejection",
      "Not completing the mandatory Entrepreneurship Development Programme (EDP) training before the margin-money claim -- required before final subsidy disbursement",
      "Submitting an incomplete or vague DPR, which is one of the most common reasons for delay or rejection",
    ],
    faqs: [
      {
        q: "What's the maximum project cost covered?",
        a: "₹25 lakh for manufacturing units and ₹10 lakh for service units, as per current PMEGP guidelines -- always confirm the current cap on kviconline.gov.in since scheme parameters are periodically revised.",
      },
      {
        q: "Do I need collateral for a PMEGP loan?",
        a: "No collateral is required for projects up to ₹10 lakh under RBI guidelines. For projects between ₹10-25 lakh, the loan is covered by a CGTMSE guarantee instead of requiring you to pledge assets.",
      },
    ],
    officialLinks: ["https://www.kviconline.gov.in/pmegpeportal"],
    lastUpdated: "2026-07-25",
  },

  {
    id: "jan-dhan-yojana",
    name: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
    department: "Government Schemes",
    category: "Government Schemes",
    categoryIcon: "🎯",
    overview:
      "India's flagship financial inclusion scheme -- a zero-balance savings bank account for every unbanked adult, bundled with a free RuPay debit card, accident insurance, and access to an overdraft facility and pension/insurance micro-schemes.",
    eligibility: "Any Indian resident aged 10 or above without an existing bank account (a regular savings account can also be converted); no minimum balance is required.",
    documents: ["Aadhaar card (if available, no other document is typically needed)", "If no Aadhaar or other officially valid document exists, a 'Small Account' can still be opened with a self-attested photo and signature/thumbprint, per RBI rules"],
    fees: { accountOpening: "Free, zero minimum balance" },
    processingTime: "Same-day account opening at any participating bank branch",
    onlineSteps: [
      "This is primarily opened in person at a bank branch, though some banks now offer a digital pre-application via their app before an in-branch/video KYC completion step",
    ],
    offlineSteps: [
      "Visit any public or private sector bank branch, or Business Correspondent (BC) point, with your Aadhaar card",
      "Fill the PMJDY account opening form and complete KYC",
      "Receive your RuPay debit card (with ₹2 lakh accidental insurance cover) typically within 7-10 working days",
    ],
    commonMistakes: [
      "Not realizing the overdraft facility (up to ₹10,000) only becomes available after 6 months of satisfactory account operation -- it's not available immediately",
      "Letting the account go inactive, which can affect eligibility for the accident insurance and overdraft benefits",
    ],
    faqs: [
      {
        q: "How does the overdraft facility work?",
        a: "After 6 months of satisfactory account operation, one account holder per household (women given priority) can access an overdraft of up to ₹10,000, with the first ₹2,000 available without additional conditions.",
      },
      {
        q: "Is there really no minimum balance requirement?",
        a: "Correct -- PMJDY accounts have no minimum balance requirement, unlike many regular savings accounts.",
      },
    ],
    officialLinks: ["https://pmjdy.gov.in"],
    lastUpdated: "2026-07-25",
  },

  {
    id: "atal-pension-yojana",
    name: "Atal Pension Yojana (APY)",
    department: "Government Schemes",
    category: "Government Schemes",
    categoryIcon: "🎯",
    overview:
      "A government-backed pension scheme for workers in the unorganized sector, offering a guaranteed monthly pension of ₹1,000 to ₹5,000 after age 60, based on fixed monthly contributions made until then -- the earlier you join, the lower your monthly contribution for the same pension amount.",
    eligibility: "Any Indian citizen aged 18 to 40 with a bank/post office savings account. Income tax payers are not eligible to join.",
    documents: ["Aadhaar card", "Bank account details (contributions are auto-debited)", "Mobile number"],
    fees: {
      contribution: "Varies by age at joining and chosen pension slab -- e.g. an 18-year-old aiming for a ₹5,000/month pension pays roughly ₹210/month; contribution is higher the later you join",
    },
    processingTime: "Enrolment is typically completed same-day through your bank",
    onlineSteps: [
      "Log in to your bank's net banking or app (most major banks support APY enrolment digitally)",
      "Select 'Atal Pension Yojana', choose your desired monthly pension amount (₹1,000/2,000/3,000/4,000/5,000), and confirm",
      "Auto-debit is set up from your linked savings account for the calculated monthly contribution",
    ],
    offlineSteps: [
      "Visit your bank or post office branch where you hold a savings account",
      "Fill the APY subscription form, nominate a beneficiary, and set up auto-debit",
    ],
    commonMistakes: [
      "Joining without realizing income tax payers are excluded from the scheme -- check your eligibility before enrolling",
      "Insufficient balance for the auto-debit, which leads to penalty charges and can eventually cause the account to be deactivated",
    ],
    faqs: [
      {
        q: "Can income tax payers join APY?",
        a: "No -- as per current rules, individuals who pay income tax are not eligible to enrol in the Atal Pension Yojana.",
      },
      {
        q: "What happens if I miss a contribution?",
        a: "A small penalty is added to catch-up contributions. Continued default can lead to account freezing and eventually deactivation, so it's worth ensuring sufficient balance for the auto-debit date each month.",
      },
    ],
    officialLinks: ["https://npscra.nsdl.co.in/scheme-details.php"],
    lastUpdated: "2026-07-25",
  },

  {
    id: "national-pension-system",
    name: "National Pension System (NPS)",
    department: "Government Schemes",
    category: "Government Schemes",
    categoryIcon: "🎯",
    overview:
      "A voluntary, market-linked retirement savings scheme regulated by the PFRDA, open to all Indian citizens, offering additional tax benefits beyond standard 80C deductions and a choice of investment mix between equity, corporate bonds, and government securities.",
    eligibility: "Any Indian citizen aged 18 to 70 (also available to NRIs) can open an NPS account.",
    documents: ["PAN card", "Aadhaar card", "Bank account details", "Passport-size photograph"],
    fees: {
      accountOpening: "A small nominal charge applies (varies by Point of Presence/POP), typically under ₹500",
      minimumContribution: "₹500 per contribution / ₹1,000 per year for a Tier I account to keep it active",
    },
    processingTime: "Account opening is typically instant to a few days via the online eNPS process",
    onlineSteps: [
      "Go to enps.nsdl.com or the CRA (Central Recordkeeping Agency) portal and select 'Registration'",
      "Complete Aadhaar or PAN-based e-KYC",
      "Choose your investment option (Active choice or Auto choice, allocating between equity, corporate debt, and government securities)",
      "Make your initial contribution to activate the account and receive your PRAN (Permanent Retirement Account Number)",
    ],
    offlineSteps: [
      "Visit a bank or Point of Presence (POP) branch offering NPS services",
      "Fill the subscription form and submit KYC documents",
    ],
    commonMistakes: [
      "Not contributing the minimum amount each year to Tier I, which can make the account go dormant",
      "Confusing Tier I (the main retirement account, with withdrawal restrictions and tax benefits) with Tier II (a more flexible, voluntary savings account with fewer tax benefits)",
    ],
    faqs: [
      {
        q: "What additional tax benefit does NPS offer?",
        a: "Beyond the standard Section 80C deduction, NPS offers an additional deduction of up to ₹50,000 under Section 80CCD(1B), specifically for NPS contributions -- this is over and above the general 80C limit.",
      },
      {
        q: "When can I withdraw from NPS?",
        a: "Tier I is primarily a retirement account -- partial withdrawal is allowed only for specific circumstances (e.g. higher education, medical treatment) subject to conditions, with full withdrawal available at age 60 (part as lump sum, part mandatorily used to purchase an annuity for regular pension income).",
      },
    ],
    officialLinks: ["https://enps.nsdl.com", "https://npscra.nsdl.co.in"],
    lastUpdated: "2026-07-25",
  },

  // ---- Vehicles (grouped under the existing Transport & RTO department) ----

  {
    id: "vehicle-registration-new",
    name: "New Vehicle Registration (RC)",
    department: "Transport & RTO",
    category: "Transport & RTO",
    categoryIcon: "🚗",
    overview: "Registering a newly purchased vehicle with the RTO to obtain a Registration Certificate (RC), which is mandatory before the vehicle can legally be driven on public roads.",
    eligibility: "Any buyer of a new vehicle; dealers typically handle the initial application, but the process runs through the Vahan portal either way.",
    documents: [
      "Sales certificate/invoice from the dealer (Form 21)",
      "Temporary registration number (if issued)",
      "Roadworthiness certificate (Form 22) from the manufacturer",
      "Address and identity proof of the owner",
      "Valid insurance",
      "PAN card or Form 60",
    ],
    fees: { registration: "Varies by vehicle class and state -- typically a few hundred to a few thousand rupees, plus applicable road tax", smartCardFee: "Approximately ₹200 for the RC smart card" },
    processingTime: "A few days to a couple of weeks, depending on RTO workload and document completeness",
    onlineSteps: [
      "Most dealers now submit the registration application directly via vahan.parivahan.gov.in on the buyer's behalf",
      "You can track your application status on the Vahan portal using your application/temporary registration number",
      "Once approved, the RC is available digitally via the mParivahan app or DigiLocker, with a physical smart card following by post",
    ],
    offlineSteps: [
      "If not handled by the dealer, visit your local RTO with the required documents",
      "Submit Form 20 (application for registration) along with supporting documents",
    ],
    commonMistakes: [
      "Driving beyond the temporary registration's validity period (usually 30 days) without the permanent RC being issued yet",
      "Address mismatch between the buyer's ID proof and the registration application",
    ],
    faqs: [
      {
        q: "Can I drive my new vehicle before the permanent RC arrives?",
        a: "Yes, using the temporary registration number issued at purchase, which is valid for a limited period (commonly 30 days) -- don't drive beyond that window without your permanent RC.",
      },
    ],
    officialLinks: ["https://vahan.parivahan.gov.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "rc-renewal",
    name: "RC Renewal",
    department: "Transport & RTO",
    category: "Transport & RTO",
    categoryIcon: "🚗",
    overview: "Renewing your vehicle's Registration Certificate once its validity period expires (private vehicles are typically registered for 15 years, after which renewal is required every 5 years).",
    eligibility: "Any registered vehicle owner whose RC validity is nearing expiry or has expired.",
    documents: ["Original RC", "Valid PUC certificate", "Valid insurance", "Address proof", "Vehicle fitness certificate (for older vehicles, may require a physical inspection)"],
    fees: { renewal: "Varies by vehicle age and state -- older vehicles (especially those beyond 15 years) often attract a significantly higher 'green tax'/renewal fee" },
    processingTime: "A few days to a couple of weeks; a physical vehicle inspection may be required for older vehicles",
    onlineSteps: [
      "Go to vahan.parivahan.gov.in and select RC-related services > 'Renewal of Registration'",
      "Enter your vehicle and chassis number to fetch your record",
      "Upload PUC, insurance, and other required documents",
      "Pay the applicable fee -- a physical inspection slot may be booked for older vehicles",
    ],
    offlineSteps: ["Visit your RTO with the original RC and supporting documents if online renewal isn't available for your vehicle category/state"],
    commonMistakes: [
      "Missing the renewal deadline and driving with an expired RC, which can attract fines (typically ₹2,000-5,000 depending on state, with escalating penalties for repeat offenses)",
      "Not realizing older vehicles may need a fitness/inspection check before renewal is approved",
    ],
    faqs: [
      {
        q: "What happens if my RC expires and I keep driving?",
        a: "Driving with an expired RC is a punishable offense with fines that vary by state (commonly ₹2,000-5,000), and repeated violations can escalate further. Renew promptly once you're notified of upcoming expiry.",
      },
    ],
    officialLinks: ["https://vahan.parivahan.gov.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "rc-transfer",
    name: "RC Transfer (Ownership Transfer)",
    department: "Transport & RTO",
    category: "Transport & RTO",
    categoryIcon: "🚗",
    overview: "Transferring vehicle ownership from seller to buyer in RTO records when a used vehicle changes hands -- a legally mandatory step, using Form 29 (Notice of Transfer) and Form 30 (Report of Transfer).",
    eligibility: "Buyer and seller of a used vehicle; both parties' cooperation is needed to complete the transfer.",
    documents: [
      "Original RC",
      "Form 29 and Form 30, signed by both parties",
      "Valid insurance (must be updated to reflect the new owner once transfer is complete)",
      "PUC certificate",
      "Buyer's address and identity proof, and Aadhaar for e-KYC",
      "No-objection certificate from the financier, if the vehicle has an active loan/hypothecation",
    ],
    fees: { rtoFee: "Roughly ₹300 for motorcycles to ₹500+ for cars, plus an approximately ₹200 smart card fee -- exact amount varies by vehicle class and state" },
    processingTime: "Application review starts within days, but final approval often depends on RTO verification workload -- can range from about a week to several weeks",
    onlineSteps: [
      "Go to vahan.parivahan.gov.in, enter the vehicle registration number and last 5 digits of the chassis number to authenticate",
      "Select 'Transfer of Ownership' (or 'Termination of Hypothecation' too, if applicable, using Form 35)",
      "Enter the new owner's details -- an OTP is sent to the buyer's Aadhaar-linked mobile for e-KYC",
      "Upload the signed Form 29/30 and pay the RTO fee online",
      "Most states still require submitting physical documents at the RTO for final verification even after the online application",
    ],
    offlineSteps: [
      "Visit the RTO with the original RC, signed Form 29/30, and both parties' documents",
      "RTO staff verify the chassis number and signatures before approving the transfer",
    ],
    commonMistakes: [
      "The Vahan portal will block the transfer application if the vehicle has unpaid traffic camera fines -- clear all pending challans first",
      "Not removing an existing loan/hypothecation before attempting a straightforward ownership transfer",
      "Until the transfer is officially approved, the seller can remain legally responsible for the vehicle -- don't delay completing the process after handing over the vehicle",
    ],
    faqs: [
      {
        q: "Am I still responsible for the vehicle after I sell it but before the RC transfer is approved?",
        a: "Yes, in most cases the registered owner on record remains legally responsible until the transfer is officially completed in RTO records -- so it's in the seller's interest to follow through and confirm the transfer status, not just hand over the vehicle and assume it's done.",
      },
      {
        q: "Why was my transfer application rejected or blocked?",
        a: "The most common reasons are unpaid traffic challans linked to the vehicle, an unresolved hypothecation/loan, or a document mismatch (like signatures or chassis number) -- check the specific rejection reason on the Vahan portal.",
      },
    ],
    officialLinks: ["https://vahan.parivahan.gov.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "vehicle-insurance",
    name: "Motor Insurance (New / Renewal)",
    department: "Transport & RTO",
    category: "Transport & RTO",
    categoryIcon: "🚗",
    overview: "Getting or renewing vehicle insurance -- third-party insurance is legally mandatory for every vehicle on Indian roads, while comprehensive insurance (covering your own vehicle's damage too) is optional but strongly recommended.",
    eligibility: "Any vehicle owner -- required at the time of registration and must be kept continuously valid afterward.",
    documents: ["RC copy", "Previous insurance policy (for renewal, and to claim any No-Claim Bonus)", "Driving licence"],
    fees: { thirdPartyPremium: "Rates are set/revised periodically by IRDAI based on vehicle type and engine capacity", comprehensivePremium: "Varies by insurer, vehicle value (IDV), and add-ons chosen" },
    processingTime: "Instant policy issuance is standard when buying or renewing online",
    onlineSteps: [
      "Compare policies via an insurer's website/app or an insurance aggregator",
      "Enter vehicle and RC details, choose third-party-only or comprehensive cover, and any add-ons (zero depreciation, engine protection, etc.)",
      "Pay online and receive your policy document instantly by email, also viewable via DigiLocker/mParivahan",
    ],
    offlineSteps: ["Visit an insurance agent or company branch to purchase or renew a policy in person"],
    commonMistakes: [
      "Letting the policy lapse -- driving without valid insurance is a legal offense with fines, on top of leaving you financially exposed for accident costs",
      "Not disclosing modifications or claims history accurately, which can cause claim rejection later",
      "Forgetting to transfer/update the insurance when a vehicle changes ownership -- it needs to reflect the new owner",
    ],
    faqs: [
      {
        q: "Is third-party insurance really mandatory?",
        a: "Yes -- under the Motor Vehicles Act, driving without at least third-party insurance is illegal and attracts fines, regardless of whether you also have comprehensive cover.",
      },
    ],
    officialLinks: ["https://irdai.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "puc-certificate",
    name: "Pollution Under Control (PUC) Certificate",
    department: "Transport & RTO",
    category: "Transport & RTO",
    categoryIcon: "🚗",
    overview: "Getting or renewing your vehicle's PUC certificate, which confirms your vehicle's emissions are within permitted limits -- required to be carried at all times and checked at various compliance points (insurance renewal, RC renewal, and traffic stops).",
    eligibility: "Any vehicle owner; new vehicles typically get an initial PUC validity of about a year, after which it needs periodic renewal (commonly every 3-6 months for older vehicles).",
    documents: ["Vehicle registration number (no other documents typically required at the testing center itself)"],
    fees: { testingFee: "A small nominal fee, typically ₹60-100, varies by state and vehicle type" },
    processingTime: "A few minutes at any authorized PUC testing center",
    onlineSteps: [
      "PUC testing itself must be done in person, but you can check your current PUC validity online via the Vahan portal's 'PUC' section under Online Services",
      "Enter your vehicle registration number to view or download your current valid certificate",
    ],
    offlineSteps: [
      "Visit any authorized PUC testing center -- commonly found at fuel stations and dedicated emission testing centers",
      "The test takes a few minutes; you receive a printed certificate with the validity period stated",
    ],
    commonMistakes: [
      "Assuming a fine for an expired PUC is a one-time small cost and not bothering to renew promptly -- fines apply per instance detected and can escalate on repeat violations",
      "Not realizing PUC status is now linked to the Vahan database, meaning some other RTO services can be blocked if it's expired",
    ],
    faqs: [
      {
        q: "What's the fine for not having a valid PUC certificate?",
        a: "In most states, the first-time fine is around ₹1,000, though this varies by state and can be higher, with escalating penalties on repeat offenses -- pay any e-challan received for this promptly via echallan.parivahan.gov.in.",
      },
    ],
    officialLinks: ["https://vahan.parivahan.gov.in"],
    lastUpdated: "2026-07-01",
  },

  {
    id: "fastag",
    name: "FASTag (New / Recharge)",
    department: "Transport & RTO",
    category: "Transport & RTO",
    categoryIcon: "🚗",
    overview:
      "FASTag is the RFID-based electronic toll payment sticker required on all four-wheelers for cashless toll payment on national highways. New national toll rules effective March 2026 tightened enforcement: vehicles that pass a toll point without sufficient FASTag balance now get a 72-hour grace period to pay the original toll amount before being charged double, and some toll plazas have begun moving to fully barrier-free (no-stop) tolling using camera-based detection alongside FASTag.",
    eligibility: "Owners of four-wheelers (M and N category vehicles) -- effectively mandatory, since vehicles without a valid, sufficiently-funded FASTag are charged double toll at FASTag lanes.",
    documents: ["Vehicle RC", "Vehicle owner's ID proof (for KYC on the FASTag account)"],
    fees: { tagIssuance: "A one-time tag cost/security deposit applies (amounts vary by issuing bank), often bundled with a minimum initial recharge", tollDoubling: "Missing/insufficient FASTag balance at a toll leads to double the toll fee if not settled within the 72-hour grace window" },
    processingTime: "New tags: same-day activation at a toll plaza point-of-sale or a few days if ordered online/via bank app; recharges are instant",
    onlineSteps: [
      "Order or manage your FASTag via your bank's app/website, the NHAI 'MyFASTag' app, or Amazon/other authorized retailers",
      "Complete KYC by uploading RC and ID proof",
      "Recharge anytime via UPI, net banking, or auto-recharge linked to your bank account",
      "Check vehicle-linked FASTag status via the Vahan portal's 'Know Your Vehicle Details' as well",
    ],
    offlineSteps: ["Get a new FASTag at toll plaza point-of-sale counters or participating bank branches/petrol pumps"],
    commonMistakes: [
      "Letting the FASTag balance run low -- this now risks not just a single double-toll charge but an official e-notice under the new 2026 'unpaid user fee' framework if unresolved within 72 hours",
      "Not linking a valid mobile number/email to receive low-balance alerts or e-notices",
      "Ignoring an unpaid toll e-notice for more than 15 days, which can lead to restrictions on other Vahan-linked vehicle services",
    ],
    faqs: [
      {
        q: "What happens if my FASTag fails or has insufficient balance at a toll now?",
        a: "Under the National Highways Fee (Second Amendment) Rules, 2026 (effective March 2026), you get a 72-hour grace period to pay the original toll amount online via an e-notice sent by SMS/email. If unpaid within 72 hours, you're charged double the toll. Unresolved dues beyond 15 days can lead to restrictions on other vehicle-related services through the Vahan system.",
      },
      {
        q: "Can I dispute an incorrect toll charge or e-notice?",
        a: "Yes -- you can contest it through the same e-notice system/website within 72 hours of receiving it, and the relevant toll authority is required to respond within 5 days.",
      },
    ],
    officialLinks: ["https://www.ihmcl.co.in", "https://echallan.parivahan.gov.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "traffic-challan",
    name: "Check & Pay Traffic Challan",
    department: "Transport & RTO",
    category: "Transport & RTO",
    categoryIcon: "🚗",
    overview: "Checking whether you have any pending traffic violation fines (e-challans) and paying them online through the official Parivahan e-Challan portal.",
    eligibility: "Any vehicle owner or driver who may have received a traffic violation notice (signal jumping, speeding, no helmet/seatbelt, illegal parking, expired documents, etc.), typically detected via traffic cameras or issued in person by traffic police.",
    documents: ["Vehicle registration number, challan number, or driving licence number (any one is enough to search)"],
    fees: { challanAmount: "Varies entirely by the specific violation and applicable state fine schedule" },
    processingTime: "Payment is instant online; challans typically remain payable online for 60-90 days before being transferred to Virtual Court for adjudication",
    onlineSteps: [
      "Go to echallan.parivahan.gov.in and select 'Check Challan Status'",
      "Search using your vehicle number, challan number, or DL number, plus the captcha",
      "Review the challan details displayed, then pay via UPI, debit/credit card, or net banking",
      "Download and save the receipt as proof of payment",
    ],
    offlineSteps: [
      "Pay in person at a police station with the challan receipt, or on the spot with a traffic officer's e-challan handheld device",
    ],
    commonMistakes: [
      "Clicking payment links from SMS texts instead of navigating to echallan.parivahan.gov.in directly -- fake SMS messages with phishing links mimicking official challan notices are increasingly common; never enter payment details through an unfamiliar link",
      "Letting a challan sit unpaid past the online payment window (commonly 60-90 days), after which it moves to Virtual Court and becomes more complex to resolve",
      "Not checking 'Verify Payment' if a paid challan still shows as pending -- this can take 24-48 hours to sync between the treasury and Parivahan systems before assuming something went wrong",
    ],
    faqs: [
      {
        q: "I got an SMS about a challan -- is it safe to click the link?",
        a: "Be cautious -- fake SMS messages with phishing links that closely mimic official Parivahan challan notices are a known scam. Always type echallan.parivahan.gov.in directly into your browser rather than tapping a link from an SMS, and check the challan using your vehicle number there instead.",
      },
      {
        q: "What if I think a challan was issued incorrectly?",
        a: "You can raise a grievance through the eChallan portal's grievance/helpdesk section, or the matter may be handled through Virtual Courts for online adjudication in certain cases -- avoid paying in a hurry if you genuinely believe it's an error (e.g. wrong number plate reading).",
      },
    ],
    officialLinks: ["https://echallan.parivahan.gov.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "road-tax-payment",
    name: "Road Tax Payment",
    department: "Transport & RTO",
    category: "Transport & RTO",
    categoryIcon: "🚗",
    overview: "Paying road tax on your vehicle -- a one-time tax at registration for most private vehicles (varying by state), or periodic tax for commercial vehicles.",
    eligibility: "Any vehicle owner; specific rules and rates are set by each state government, so amounts vary considerably.",
    documents: ["RC", "Vehicle invoice (for new vehicle one-time tax calculation)", "Address proof, especially if paying road tax in a new state after relocating (revalidation)"],
    fees: { amount: "Varies significantly by state, vehicle type, engine capacity, and (for cars) ex-showroom price -- check your specific state's RTO tax calculator" },
    processingTime: "Typically completed alongside vehicle registration for new vehicles; standalone payments are usually instant online",
    onlineSteps: [
      "Go to vahan.parivahan.gov.in and select the road tax payment option under vehicle-related services",
      "Enter vehicle details and the calculated tax amount based on your state's rate structure",
      "Pay online and download the receipt",
    ],
    offlineSteps: ["Pay at your RTO counter if online payment isn't available for your specific case (e.g. certain commercial vehicle categories)"],
    commonMistakes: [
      "Not paying revalidation/re-registration road tax after moving a vehicle permanently to another state, which most states require within a specified window (commonly a few months)",
      "Assuming road tax is a recurring annual payment for private vehicles -- in most states it's a one-time payment at registration, unlike commercial vehicles which often pay periodically",
    ],
    faqs: [
      {
        q: "I moved to a new state with my car -- do I need to pay road tax again?",
        a: "Most states require you to get your vehicle re-registered (or at least revalidate/pay tax) if you're keeping it there beyond a certain period (commonly a few months to a year) -- check your destination state's specific rule, as this varies.",
      },
    ],
    officialLinks: ["https://vahan.parivahan.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "vehicle-noc",
    name: "Vehicle NOC (Interstate Transfer)",
    department: "Transport & RTO",
    category: "Transport & RTO",
    categoryIcon: "🚗",
    overview: "Getting a No-Objection Certificate (NOC) from your vehicle's registering RTO, needed when permanently moving a vehicle to another state for re-registration there.",
    eligibility: "Any vehicle owner relocating a vehicle to a different state on a long-term/permanent basis.",
    documents: ["Original RC", "Valid insurance and PUC", "Address proof of the new location", "No-objection from financier, if the vehicle has an active loan"],
    fees: { nocFee: "A nominal fee, varies by state" },
    processingTime: "A few days to a couple of weeks, depending on RTO verification (including confirming no pending challans or loan issues)",
    onlineSteps: [
      "Go to vahan.parivahan.gov.in and select the NOC application option under vehicle-related services",
      "Enter vehicle details and the destination state/RTO",
      "Upload supporting documents and submit",
      "Once issued, use the NOC to complete re-registration at the new state's RTO",
    ],
    offlineSteps: ["Visit your vehicle's registering RTO directly to apply for the NOC if the online option isn't available in your state"],
    commonMistakes: [
      "Applying for NOC with unpaid challans or an unresolved loan/hypothecation still on record -- these will block issuance",
      "Missing the new state's deadline to complete re-registration after the NOC is issued, which can require reapplying",
    ],
    faqs: [
      {
        q: "How long is a vehicle NOC valid for?",
        a: "This varies by state, but it's generally time-bound (commonly around 6 months) -- complete your re-registration in the new state within that window rather than delaying.",
      },
    ],
    officialLinks: ["https://vahan.parivahan.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "hypothecation-termination",
    name: "Hypothecation Addition / Termination",
    department: "Transport & RTO",
    category: "Transport & RTO",
    categoryIcon: "🚗",
    overview: "Adding a hypothecation (loan lien) to your RC when you finance a vehicle, or removing it (Form 35) once the loan is fully repaid -- an important step many people forget after loan closure.",
    eligibility: "Vehicle owners taking or having taken a loan against their vehicle.",
    documents: ["Original RC", "No-Objection Certificate (NOC) from the financier confirming loan closure (for termination)", "Loan agreement details (for addition, usually handled by the financier)"],
    fees: { termination: "A nominal RTO fee applies, varies by state" },
    processingTime: "A few days to a couple of weeks once the financier's NOC is submitted",
    onlineSteps: [
      "For termination: go to vahan.parivahan.gov.in, select 'Termination of Hypothecation' (Form 35)",
      "Upload the financier's NOC confirming loan closure and vehicle details",
      "Submit and pay the applicable fee",
    ],
    offlineSteps: ["Submit Form 35 with the financier's NOC at your RTO if the online option isn't available"],
    commonMistakes: [
      "Forgetting to remove hypothecation after fully repaying a vehicle loan -- this can complicate a future sale, since buyers and the RC transfer process both need it cleared first",
      "Losing the financier's NOC letter, which then needs to be requested again, sometimes with delays",
    ],
    faqs: [
      {
        q: "I finished paying off my car loan years ago -- do I still need to do this?",
        a: "Yes, if you never formally removed the hypothecation from your RC, it's worth doing now (using your financier's loan closure NOC) -- it will otherwise cause complications if you ever try to sell the vehicle.",
      },
    ],
    officialLinks: ["https://vahan.parivahan.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "duplicate-rc",
    name: "Duplicate RC",
    department: "Transport & RTO",
    category: "Transport & RTO",
    categoryIcon: "🚗",
    overview: "Getting a duplicate Registration Certificate if the original is lost, stolen, or damaged beyond legibility.",
    eligibility: "Any registered vehicle owner.",
    documents: ["FIR copy or police complaint acknowledgment (for a lost RC)", "Damaged original RC (if applicable)", "Identity and address proof", "Valid insurance and PUC"],
    fees: { duplicateRc: "A nominal RTO fee applies, similar to standard RC issuance charges" },
    processingTime: "A few days to a couple of weeks",
    onlineSteps: [
      "Go to vahan.parivahan.gov.in and select 'Duplicate RC' under vehicle-related services",
      "Enter vehicle details and upload the FIR/police complaint copy (for a lost RC) or details of the damage",
      "Pay the fee and submit",
    ],
    offlineSteps: ["Visit your RTO with the FIR copy and supporting documents if the online option isn't available"],
    commonMistakes: [
      "Not filing a police complaint/FIR first for a lost RC -- most RTOs require this as proof before issuing a duplicate",
      "Continuing to drive without any RC proof while waiting for the duplicate -- keep a copy of your application acknowledgment and the digital RC (via mParivahan/DigiLocker) as interim proof",
    ],
    faqs: [
      {
        q: "Can I use my digital RC (via DigiLocker/mParivahan) while waiting for a physical duplicate?",
        a: "Yes, a digital RC accessed via DigiLocker or the mParivahan app is legally valid and can serve as proof while your physical duplicate card is being processed.",
      },
    ],
    officialLinks: ["https://vahan.parivahan.gov.in"],
    lastUpdated: "2026-06-01",
  },

  // ---- Filling gaps: Driving Licence (new/duplicate/update/IDP) ----

  {
    id: "driving-licence-new",
    name: "New Driving Licence (Learner's + Permanent)",
    department: "Transport & RTO",
    category: "Transport & RTO",
    categoryIcon: "🚗",
    overview:
      "Getting a driving licence for the first time -- a two-stage process: first a Learner's Licence (LL), then, after a minimum practice period, the permanent Driving Licence (DL) itself. Both are applied for on the Sarathi Parivahan portal.",
    eligibility: "Minimum age 18 for a licence to drive a car (gearless two-wheelers up to 50cc allow 16+ with guardian consent). A Learner's Licence must be held for at least 30 days before applying for the permanent DL, and it remains valid for 6 months.",
    documents: [
      "Aadhaar card",
      "Address proof",
      "Passport-size photograph",
      "Medical certificate (Form 1A) if aged 40 or above; a self-declaration (Form 1) otherwise",
    ],
    fees: {
      learnersLicence: "Approximately ₹200 total (₹50 test fee + ₹150 issue fee)",
      drivingTest: "₹300",
      permanentLicenceIssue: "₹200",
      totalApprox: "Roughly ₹700-1,000 for one vehicle class, per Central Motor Vehicles Rules -- states may add small local charges on top",
    },
    processingTime: "Learner's Licence: often same-day to a few days if the online LL test is passed; permanent DL: issued after the driving test is passed, at least 30 days after the LL was issued",
    onlineSteps: [
      "Go to sarathi.parivahan.gov.in, select your state, and choose 'Application for New Learner's Licence'",
      "Fill the form, complete Form 1/1A, and take the LL test (many states now offer this online/AI-proctored; others require an RTO visit)",
      "Pay the fee and download your Learner's Licence (Form 3)",
      "After at least 30 days (and within the LL's 6-month validity), apply for the permanent DL on the same portal, book a driving test slot at your RTO",
      "Pass the driving test, pay the issue fee, and your permanent DL is generated -- accessible digitally via mParivahan/DigiLocker, with a physical card following by post",
    ],
    offlineSteps: [
      "Visit your local RTO for both LL and DL stages if online testing isn't available in your state or you prefer an in-person process",
    ],
    commonMistakes: [
      "Applying for the permanent DL before the mandatory 30-day gap after getting the LL",
      "Letting the Learner's Licence expire (6-month validity) without completing the permanent DL application",
      "Using an unofficial agent -- the entire process can be completed independently online for the official fees listed above; agents commonly charge ₹1,000-3,000 extra for no real added value",
    ],
    faqs: [
      {
        q: "How soon after getting my Learner's Licence can I apply for a permanent DL?",
        a: "You must wait at least 30 days after your LL is issued, and apply within its 6-month validity window -- if it lapses, you'll need to reapply for a fresh Learner's Licence.",
      },
      {
        q: "Do I need to use an agent?",
        a: "No -- the entire process, from LL to permanent DL, can be completed independently through sarathi.parivahan.gov.in. Agents typically add ₹1,000-3,000 on top of official fees for work you can do yourself.",
      },
    ],
    officialLinks: ["https://sarathi.parivahan.gov.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "duplicate-dl",
    name: "Duplicate Driving Licence",
    department: "Transport & RTO",
    category: "Transport & RTO",
    categoryIcon: "🚗",
    overview: "Getting a duplicate Driving Licence if the original is lost, stolen, or damaged.",
    eligibility: "Any DL holder.",
    documents: ["FIR copy or police complaint acknowledgment (for a lost DL)", "Damaged original DL, if applicable", "Identity and address proof"],
    fees: { duplicateDl: "A nominal fee applies, broadly similar to standard DL issuance charges" },
    processingTime: "A few days to a couple of weeks",
    onlineSteps: [
      "Go to sarathi.parivahan.gov.in, select your state, and choose the duplicate DL service under DL-related services",
      "Upload the FIR/police complaint copy (for a lost licence) or damage details, and your identity/address proof",
      "Pay the fee and submit",
    ],
    offlineSteps: ["Visit your RTO with the FIR copy and supporting documents if the online option isn't available in your state"],
    commonMistakes: ["Not filing a police complaint first for a lost DL -- most states require this as supporting proof"],
    faqs: [
      {
        q: "Can I drive while waiting for my duplicate DL?",
        a: "Your digital DL, accessible via DigiLocker or the mParivahan app, is legally valid and can serve as proof while a physical duplicate card is being processed.",
      },
    ],
    officialLinks: ["https://sarathi.parivahan.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "dl-address-update",
    name: "Update Address / Details on Driving Licence",
    department: "Transport & RTO",
    category: "Transport & RTO",
    categoryIcon: "🚗",
    overview: "Updating your address or other personal details on an existing Driving Licence.",
    eligibility: "Any DL holder needing to correct or update their record.",
    documents: ["Existing DL", "Proof of the new address or the corrected detail", "Aadhaar card"],
    fees: { update: "A nominal fee applies, varies by state" },
    processingTime: "A few days to a couple of weeks",
    onlineSteps: [
      "Go to sarathi.parivahan.gov.in, select your state, and choose 'Change of Address' or the relevant update service under DL-related services",
      "Upload your new address proof or other supporting document",
      "Pay the fee and submit -- some states require a follow-up RTO visit for verification",
    ],
    offlineSteps: ["Visit your RTO with the existing DL and supporting proof if online update isn't available in your state"],
    commonMistakes: ["Not updating the DL after moving states -- while not always immediately mandatory, it matters for verification, challans, and renewal notices reaching you correctly"],
    faqs: [],
    officialLinks: ["https://sarathi.parivahan.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "international-driving-permit",
    name: "International Driving Permit (IDP)",
    department: "Transport & RTO",
    category: "Transport & RTO",
    categoryIcon: "🚗",
    overview: "An International Driving Permit lets you drive in many foreign countries using your Indian licence as the underlying basis, typically needed for a limited period while traveling or living abroad short-term.",
    eligibility: "Holders of a valid Indian driving licence, planning international travel where an IDP is recognized (check the requirement of your specific destination country).",
    documents: ["Valid Indian driving licence", "Passport copy and visa (if applicable)", "Passport-size photographs", "Address proof"],
    fees: { idp: "Approximately ₹1,000" },
    processingTime: "Typically a few days to about 2 weeks, depending on your RTO",
    onlineSteps: [
      "Go to sarathi.parivahan.gov.in, select your state, and choose 'International Driving Permit' under DL-related services",
      "Upload your DL, passport, visa, and photograph",
      "Pay the fee -- some states still require a subsequent RTO visit to collect the IDP booklet",
    ],
    offlineSteps: ["Visit your RTO directly to apply if the online option isn't available in your state"],
    commonMistakes: [
      "Applying too close to your travel date -- processing can take one to two weeks, so apply well in advance",
      "Assuming an IDP alone is sufficient everywhere -- some countries have their own additional requirements (age limits, local permits) even with a valid IDP",
    ],
    faqs: [
      {
        q: "How long is an IDP valid for?",
        a: "Typically 1 year from issue, or until your underlying Indian DL expires, whichever comes first -- check the specific validity stated on your IDP booklet.",
      },
    ],
    officialLinks: ["https://sarathi.parivahan.gov.in"],
    lastUpdated: "2026-06-01",
  },

  // ---- Filling gaps: Passport (new application, Tatkal) ----

  {
    id: "passport-new-application",
    name: "New Passport Application",
    department: "Travel Services",
    category: "Travel Services",
    categoryIcon: "✈",
    overview: "Applying for an Indian passport for the first time, through the Passport Seva portal and a Passport Seva Kendra (PSK) appointment.",
    eligibility: "Any Indian citizen without an existing passport.",
    documents: [
      "Proof of Date of Birth (birth certificate, or as per current Passport Seva document list)",
      "Proof of address (from the notified list -- Aadhaar, utility bill, bank statement, etc.)",
      "Aadhaar card (recommended, speeds up verification)",
      "Passport-size photograph as per specification",
    ],
    fees: {
      normal36Page: "₹2,500 (adult, effective 1 July 2026)",
      normal60Page: "₹3,500",
      tatkal36Page: "₹5,000",
      tatkal60Page: "₹6,000",
      concession: "Children up to 8 years and senior citizens above 60 get a 10% fee concession on fresh applications",
    },
    processingTime: "Normal: typically 15-30 working days including police verification; Tatkal: 1-3 working days, with police verification done after issuance in most cases",
    onlineSteps: [
      "Register at passportindia.gov.in and fill the online application form",
      "Choose Normal or Tatkal, pay the fee, and book a Passport Seva Kendra (PSK) appointment",
      "Visit the PSK in person with originals of your documents (typically 3 documents from the notified list, plus 2 photo IDs)",
      "Complete biometrics and document verification at the PSK",
      "Track your application status and police verification progress online",
    ],
    offlineSteps: [
      "The appointment/document-verification step is always in person at a PSK, even though the application itself is submitted online first",
    ],
    commonMistakes: [
      "Not having sufficient address proof documents ready, which can require a second PSK visit",
      "Underestimating current fees -- passport fees increased notably from 1 July 2026, so confirm the current amount before applying rather than relying on an older figure",
      "For Tatkal, not checking eligibility restrictions -- Tatkal isn't open to every applicant category, and some face additional scrutiny",
    ],
    faqs: [
      {
        q: "How is Tatkal different from a normal application?",
        a: "Tatkal is a fast-track service (passport typically ready in 1-3 working days) that mostly relies on document verification for eligibility, with police verification usually completed after the passport is issued rather than before -- normal applications generally wait for police verification first.",
      },
    ],
    officialLinks: ["https://www.passportindia.gov.in"],
    lastUpdated: "2026-08-01",
  },

  // ---- New department: Employment ----

  {
    id: "epfo-uan-services",
    name: "EPFO / PF Account Services (UAN)",
    department: "Employment",
    category: "Employment",
    categoryIcon: "💼",
    overview:
      "Managing your Employees' Provident Fund (EPF) account through your Universal Account Number (UAN) -- checking your balance/passbook, updating KYC, and filing withdrawal or transfer claims. EPFO 3.0 (rolling out through 2026) is adding UPI/ATM-based withdrawal and faster auto-settlement for smaller claims.",
    eligibility: "Salaried employees in organizations covered under the EPF Act, where both employer and employee contribute monthly to the PF account.",
    documents: ["UAN (usually on your salary slip, or obtainable from HR)", "Aadhaar card (linking is mandatory for most services)", "Bank account details linked to Aadhaar"],
    fees: { allServices: "Free -- EPFO charges no fee for passbook access, claims, or KYC updates" },
    processingTime: "Passbook/balance checks are instant online; smaller withdrawal/advance claims (up to ₹5 lakh) are targeted for settlement within about 72 hours under EPFO 3.0, larger claims can take 3-7 working days or longer",
    onlineSteps: [
      "Go to unifiedportal-mem.epfindia.gov.in -- this is the only official EPFO member portal; be cautious of lookalike unofficial sites",
      "Log in with your UAN and password (use 'Forgot Password' with OTP if logging in for the first time)",
      "For passbook: after logging into the main portal, follow the link to the passbook section (a separate linked system)",
      "For KYC: go to 'Manage' > 'KYC' to link/update Aadhaar, PAN, and bank details (employer approval is typically required)",
      "For claims: use the 'Online Services' > 'Claim' section to file withdrawal, transfer, or advance requests",
      "Check balance without logging in via a missed call to the registered EPFO number, or by SMS, from your UAN-linked mobile",
    ],
    offlineSteps: ["Contact your employer's HR/payroll team for UAN-related issues, since many KYC and linking steps require employer-side approval"],
    commonMistakes: [
      "Using an unofficial lookalike website instead of unifiedportal-mem.epfindia.gov.in -- several imitation sites exist; EPFO never asks for your password/OTP over a phone call",
      "Not linking Aadhaar, which blocks most services including withdrawal and transfer",
      "Assuming a new UAN each time you change jobs -- your UAN stays the same for life; only your Member ID changes with each employer",
    ],
    faqs: [
      {
        q: "How do I find my UAN?",
        a: "It's usually printed on your monthly salary slip. If not, ask your employer's HR department, or retrieve it via the 'Forgot UAN' option on the EPFO portal using your Aadhaar or Member ID.",
      },
      {
        q: "What's the current EPF interest rate?",
        a: "Rates are declared annually by EPFO's Central Board of Trustees and are subject to final government ratification -- check the current confirmed rate on the EPFO portal rather than relying on a figure from a previous year, since it changes each financial year.",
      },
    ],
    officialLinks: ["https://unifiedportal-mem.epfindia.gov.in", "https://www.epfindia.gov.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "esic-services",
    name: "ESIC (Employee State Insurance)",
    department: "Employment",
    category: "Employment",
    categoryIcon: "💼",
    overview: "Employee State Insurance provides medical care and cash benefits (sickness, maternity, disability, dependent benefits) to employees earning below a specified wage ceiling, funded jointly by employer and employee contributions.",
    eligibility: "Employees of ESIC-covered establishments earning up to the current wage ceiling (check the current threshold on the ESIC portal, as it's periodically revised).",
    documents: ["Aadhaar card", "Bank account details", "Employer's ESIC registration details (handled by your employer for enrolment)"],
    fees: { enrolment: "Free for employees -- contributions are deducted from salary and matched by the employer as per ESIC contribution rates" },
    processingTime: "e-Pehchan card (ESIC ID) is typically issued within a few days of employer registration",
    onlineSteps: [
      "Your employer registers you on the ESIC portal (esic.gov.in) at the time of joining -- this isn't something you self-register for independently",
      "Once registered, log in to the ESIC portal with your Insurance Number to download your e-Pehchan card, view contribution history, and access empanelled hospital lists",
      "File for cash benefits (sickness, maternity, etc.) through the portal or your local ESIC branch office as applicable",
    ],
    offlineSteps: ["Visit your nearest ESIC branch office or dispensary for medical treatment or benefit claims requiring in-person processing"],
    commonMistakes: [
      "Not confirming with HR whether you're enrolled -- if your salary is near the wage ceiling, verify your ESIC status directly rather than assuming",
      "Losing your e-Pehchan card without downloading a digital copy, which is needed to access ESIC hospitals/dispensaries",
    ],
    faqs: [
      {
        q: "Can I choose not to be covered under ESIC?",
        a: "No -- if your establishment is covered under the ESI Act and your wages are within the eligibility ceiling, coverage is mandatory, not optional.",
      },
    ],
    officialLinks: ["https://www.esic.gov.in"],
    lastUpdated: "2026-07-01",
  },

  {
    id: "e-shram-labour-card",
    name: "e-Shram / Labour Card (Unorganized Workers)",
    department: "Employment",
    category: "Employment",
    categoryIcon: "💼",
    overview:
      "A free national registration for unorganized-sector workers (construction workers, gig/platform workers, domestic workers, street vendors, daily wage labourers, etc.), issuing a lifelong 12-digit UAN (distinct from the EPFO UAN) that links you to social security schemes like accident insurance and pension.",
    eligibility: "Any unorganized-sector worker aged 16-59, who is NOT a member of EPFO or ESIC and NOT an income tax payer. (Note: this e-Shram UAN is a completely different number from the EPFO UAN despite the similar name -- you cannot hold both, since EPFO/ESIC members aren't eligible.)",
    documents: ["Aadhaar card with a linked mobile number (or visit a CSC for biometric registration if your mobile isn't Aadhaar-linked)", "Bank account details"],
    fees: { registration: "Free -- self-registration online has no fee; a CSC may charge a small assisted-service fee, but never for the card itself" },
    processingTime: "Instant -- your UAN and e-Shram Card are generated immediately upon successful registration",
    onlineSteps: [
      "Go to eshram.gov.in and start registration with your Aadhaar-linked mobile number",
      "Verify via OTP and confirm you're not registered with EPFO/ESIC and not an income tax payer",
      "Complete your profile: personal info, address, education, occupation (use the NCO code search if your occupation isn't listed directly), and bank details",
      "Review and submit -- your 12-digit UAN and downloadable e-Shram Card (PDF) are generated instantly",
    ],
    offlineSteps: [
      "Visit your nearest Common Service Centre (CSC) for free assisted registration using biometric verification, useful if your mobile isn't Aadhaar-linked",
    ],
    commonMistakes: [
      "Confusing this with the EPFO UAN -- they're separate systems and you can't register for e-Shram if you're already an EPFO/ESIC member",
      "Entering incorrect bank/IFSC details, which blocks Direct Benefit Transfer for any linked scheme benefits",
      "Believing claims of automatic monthly cash payments to all cardholders -- this isn't accurate; benefits like the PM-SYM pension require separately enrolling and contributing to that specific scheme",
    ],
    faqs: [
      {
        q: "What benefits does the e-Shram card actually give me automatically?",
        a: "Registration itself includes accident insurance coverage (typically ₹2 lakh for death/permanent disability). Other linked benefits like PM-SYM pension require a separate enrolment and monthly contribution -- the card alone doesn't automatically enroll you in every scheme.",
      },
      {
        q: "I'm an EPFO member -- can I also get an e-Shram card?",
        a: "No, e-Shram is specifically for unorganized workers not covered by EPFO or ESIC. If you're an active EPFO/ESIC member, you're not eligible to register.",
      },
    ],
    officialLinks: ["https://eshram.gov.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "ncs-job-portal",
    name: "National Career Service (Job Search & Registration)",
    department: "Employment",
    category: "Employment",
    categoryIcon: "💼",
    overview: "The government's official job portal connecting job seekers with employers (private and government), along with career counselling and skill-linked services.",
    eligibility: "Any job seeker; employers can also register to post vacancies.",
    documents: ["Aadhaar card", "Educational certificates and resume/work history for your profile", "Photograph"],
    fees: { registration: "Free" },
    processingTime: "Instant registration; job matching is ongoing based on your profile",
    onlineSteps: [
      "Go to ncs.gov.in and register as a job seeker",
      "Complete your profile: education, skills, work experience, and preferred job categories/locations",
      "Search and apply to listed vacancies, or let employers find your profile through search",
      "Check the 'Career Guidance' section for counselling resources and skill-linked recommendations",
    ],
    offlineSteps: ["Visit a local Employment Exchange / Model Career Centre for in-person assistance with registration and job search"],
    commonMistakes: ["Leaving the profile incomplete -- employers search using specific skill/qualification filters, so a sparse profile reduces visibility"],
    faqs: [],
    officialLinks: ["https://www.ncs.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "skill-india-registration",
    name: "Skill India / PMKVY Training Registration",
    department: "Employment",
    category: "Employment",
    categoryIcon: "💼",
    overview: "Registering for free, government-funded short-term skill training under the Pradhan Mantri Kaushal Vikas Yojana (PMKVY) and related Skill India initiatives, often including a monetary reward on successful certification.",
    eligibility: "Indian citizens, typically school/college dropouts or unemployed youth, though specific age and eligibility criteria vary by training center and course.",
    documents: ["Aadhaar card", "Educational qualification proof (if any)", "Bank account details (for any linked incentive payment)"],
    fees: { training: "Free for PMKVY-recognized short-term training courses" },
    processingTime: "Registration is quick; course duration itself varies from a few weeks to a few months depending on the trade",
    onlineSteps: [
      "Go to the Skill India Digital portal or pmkvyofficial.org",
      "Register with your Aadhaar and browse available courses by trade/location",
      "Enrol at a recognized Pradhan Mantri Kaushal Kendra (PMKK) or training partner center near you",
      "Complete training and the certification exam to receive your certificate (and any applicable incentive)",
    ],
    offlineSteps: ["Visit your nearest PMKK or training partner center to enquire about available courses and enrol in person"],
    commonMistakes: ["Enrolling through an unrecognized/unaffiliated training center -- verify the center is an official PMKVY-empanelled partner before paying anything or committing time, since genuine PMKVY courses shouldn't charge tuition fees"],
    faqs: [
      {
        q: "Is this training really free?",
        a: "Yes, PMKVY-recognized short-term training courses are free for eligible candidates. Be cautious of centers charging tuition under the PMKVY name -- verify empanelment on the official portal first.",
      },
    ],
    officialLinks: ["https://www.pmkvyofficial.org"],
    lastUpdated: "2026-06-01",
  },

  // ---- New department: Education ----

  {
    id: "nsp-scholarship",
    name: "National Scholarship Portal (Scholarship Application)",
    department: "Education",
    category: "Education",
    categoryIcon: "🎓",
    overview:
      "A single unified platform hosting 140+ central and state scholarship schemes for students from Class 1 through PhD, covering pre-matric, post-matric, merit-cum-means, and minority/category-specific scholarships, with funds disbursed directly to Aadhaar-linked bank accounts.",
    eligibility: "Varies by specific scheme -- most require Indian citizenship, enrollment in a recognized institution, and often a family income ceiling or category (SC/ST/OBC/minority/disability) depending on the scheme.",
    documents: [
      "Aadhaar card (mandatory for One Time Registration)",
      "Bank account details, Aadhaar-seeded for Direct Benefit Transfer",
      "Income certificate, category certificate, or other proof depending on the specific scheme",
      "Institution/enrollment details",
    ],
    fees: { application: "Free" },
    processingTime: "Multi-stage verification (institute, district, state levels) after submission -- disbursal timing varies significantly by scheme, often taking a few weeks to a few months after the application window closes",
    onlineSteps: [
      "Go to scholarships.gov.in and complete One Time Registration (OTR) using Aadhaar-based e-KYC and face authentication via the NSP OTR app (required once; reused for your entire academic career)",
      "Log in and browse available scholarships matching your class/course and category",
      "Fill the application for the relevant scheme(s), upload supporting documents, and submit before the deadline",
      "Track verification status (institute, district, state) and eventual payment on your dashboard",
    ],
    offlineSteps: ["Contact your institution's scholarship/financial aid cell for help completing OTR or resolving verification issues, since institutions handle one stage of the verification chain"],
    commonMistakes: [
      "Missing the application deadline -- NSP schemes have fixed windows each academic year and don't typically accept late submissions",
      "Bank account not Aadhaar-seeded, which blocks Direct Benefit Transfer even after approval",
      "Applying for multiple central scholarships simultaneously when a scheme explicitly disallows combining -- check each scheme's exclusion rules",
    ],
    faqs: [
      {
        q: "Do I need to register every year?",
        a: "No -- One Time Registration (OTR) generates a permanent ID valid for your entire academic career. You log in with the same OTR each year rather than re-registering, though you do need to submit a fresh or renewal application for each academic year's scholarship.",
      },
    ],
    officialLinks: ["https://scholarships.gov.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "digilocker",
    name: "DigiLocker (Digital Document Wallet)",
    department: "Education",
    category: "Education",
    categoryIcon: "🎓",
    overview:
      "A government digital locker for storing and accessing official documents -- academic certificates, mark sheets, Aadhaar, PAN, vehicle RC/DL, and more -- issued directly by the source authority (school boards, universities, RTOs, UIDAI) and legally equivalent to physical originals.",
    eligibility: "Any Indian citizen with a mobile number (Aadhaar linking is optional but unlocks more auto-fetched documents).",
    documents: ["Mobile number for account creation", "Aadhaar number, to link and auto-fetch certain documents"],
    fees: { account: "Free" },
    processingTime: "Instant account creation; document availability depends on whether the issuing authority (school board, university, etc.) has uploaded records to DigiLocker",
    onlineSteps: [
      "Download the DigiLocker app or go to digilocker.gov.in",
      "Sign up with your mobile number and set a security PIN",
      "Link your Aadhaar to auto-fetch documents like your Aadhaar card, and search 'Issued Documents' for academic certificates by entering your board/roll number or similar identifiers",
      "Documents fetched this way are digitally signed and legally valid -- share via the app or download as needed",
    ],
    offlineSteps: [],
    commonMistakes: [
      "Assuming every document is automatically available -- not all state boards, universities, or older records have been digitized into DigiLocker yet; check availability for your specific institution",
      "Not knowing DigiLocker documents are legally accepted -- some people still carry only physical copies unnecessarily when the app version would suffice",
    ],
    faqs: [
      {
        q: "Are DigiLocker documents legally valid, or just a backup copy?",
        a: "Documents fetched directly from an issuing authority within DigiLocker are digitally signed and treated as legally equivalent to physical originals under the IT Act, 2000 -- not just a convenience copy.",
      },
    ],
    officialLinks: ["https://www.digilocker.gov.in"],
    lastUpdated: "2026-07-01",
  },

  {
    id: "education-loan-vidyalakshmi",
    name: "Education Loan (PM-Vidyalakshmi Portal)",
    department: "Education",
    category: "Education",
    categoryIcon: "🎓",
    overview:
      "A unified portal to apply for education loans from 45+ banks using a single Common Education Loan Application Form (CELAF). The PM-Vidyalakshmi scheme (launched November 2024) added collateral-free, guarantor-free loans up to ₹7.5 lakh with a government credit guarantee, plus a 3% interest subvention during study for students at 860+ Quality Higher Education Institutions (QHEIs, including IITs/NITs/IIMs) with family income up to ₹8 lakh.",
    eligibility:
      "Students admitted to a recognized institution for higher studies (India or abroad). The interest subvention specifically applies to admissions at listed QHEIs with family income up to ₹8 lakh; the underlying collateral-free loan facility (up to ₹7.5 lakh) is available more broadly regardless of income.",
    documents: [
      "Admission letter/proof of admission",
      "Academic records",
      "Identity and address proof",
      "Family income proof (for interest subvention eligibility)",
      "Course fee structure from the institution",
    ],
    fees: { applicationFee: "Free -- no charge for using the portal itself; individual bank processing fees, if any, follow that bank's standard terms" },
    processingTime: "Typically 15-30 working days for loan approval, depending on the bank and completeness of documents",
    onlineSteps: [
      "Go to pmvidyalaxmi.co.in and register as a student",
      "Complete the CELAF (Common Education Loan Application Form) with your academic, financial, and course details",
      "Compare and select up to a few banks to apply to simultaneously with the same form",
      "Track application status on your dashboard as each bank reviews it",
      "Once a bank approves, complete their specific documentation/disbursal formalities",
    ],
    offlineSteps: ["Loan disbursal formalities and any physical documentation are typically completed at the chosen bank's branch, even though the application itself starts online"],
    commonMistakes: [
      "Not checking whether your institution qualifies as a QHEI before assuming you'll get the 3% interest subvention -- it only applies to the specific listed institutions",
      "Applying to only one bank when the portal allows comparing and applying to multiple simultaneously",
    ],
    faqs: [
      {
        q: "Do I need collateral for an education loan through this portal?",
        a: "For loans up to ₹7.5 lakh, the PM-Vidyalakshmi scheme provides a government credit guarantee (covering banks for 75% of the loan), making these loans collateral-free and guarantor-free for eligible students, regardless of family income.",
      },
      {
        q: "What's the interest subvention benefit, and who qualifies?",
        a: "Students with family income up to ₹8 lakh, admitted to one of 860+ listed Quality Higher Education Institutions (including IITs, NITs, IIMs, and top-ranked state institutions), get a 3% interest subvention on loans up to ₹10 lakh during the study and moratorium period.",
      },
    ],
    officialLinks: ["https://www.pmvidyalaxmi.co.in"],
    lastUpdated: "2026-07-01",
  },

  {
    id: "cuet-jee-neet-registration",
    name: "Common Entrance Exam Registration (JEE / NEET / CUET)",
    department: "Education",
    category: "Education",
    categoryIcon: "🎓",
    overview:
      "Registration for India's major national entrance exams -- JEE Main (engineering), NEET (medical), and CUET (central university undergraduate admissions) -- all conducted by the National Testing Agency (NTA) through broadly similar online registration processes.",
    eligibility: "Varies by exam: JEE Main requires Class 12 (or equivalent) completion/appearance in the relevant stream; NEET requires Class 12 with Physics, Chemistry, and Biology; CUET requires Class 12 completion/appearance, with specific subject combinations depending on the university/course applied to.",
    documents: ["Class 10 and 12 mark sheets/certificates", "Category certificate, if applicable", "Recent photograph and signature as per NTA specifications", "Aadhaar or other accepted ID proof"],
    fees: { registration: "Varies by exam, category, and (for JEE/NEET) exam city choice -- check the current fee notification for each specific exam cycle, as amounts are revised periodically" },
    processingTime: "Registration windows are announced separately for each exam cycle, typically open for a few weeks; results are usually declared 3-6 weeks after the exam",
    onlineSteps: [
      "Go to the NTA's official website (nta.ac.in) or the specific exam portal (jeemain.nta.nic.in, neet.nta.nic.in, cuet.nta.nic.in) once registration opens for that cycle",
      "Register with basic details, then complete the full application form with academic and category details",
      "Upload photograph, signature, and required certificates as per specification",
      "Pay the registration fee and choose exam city preferences",
      "Download the admit card once released, closer to the exam date",
    ],
    offlineSteps: [],
    commonMistakes: [
      "Uploading photos/signatures that don't meet the exact size/format specification, causing application rejection",
      "Missing the registration window -- these exams have strict, non-extendable deadlines in almost all cases",
      "Not double-checking category/subject selections before final submission, since corrections are often only allowed during a specific short 'correction window'",
    ],
    faqs: [
      {
        q: "Can I register for more than one of these exams?",
        a: "Yes, JEE Main, NEET, and CUET are separate registrations with separate fees and often overlapping-but-distinct timelines -- you can register for multiple if you meet each one's eligibility criteria.",
      },
      {
        q: "What if I make a mistake in my application?",
        a: "NTA typically opens a short 'correction window' after the initial registration period for each exam, where limited fields can be edited -- check the specific exam's official notification for what's correctable and the exact dates.",
      },
    ],
    officialLinks: ["https://nta.ac.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "rte-admission",
    name: "RTE Admission (25% Reserved Quota)",
    department: "Education",
    category: "Education",
    categoryIcon: "🎓",
    overview:
      "Under the Right to Education (RTE) Act, private unaided schools must reserve 25% of entry-level seats for children from economically weaker sections (EWS) and disadvantaged groups, who then study free of cost through elementary education.",
    eligibility: "Children aged roughly 3-6 (varies by state, for entry-level admission) from families meeting the state's income/EWS or disadvantaged-group criteria, applying to a private unaided school within the prescribed neighborhood distance.",
    documents: ["Birth certificate", "Income certificate (EWS proof)", "Category certificate, if applicable for disadvantaged-group quota", "Address proof establishing neighborhood eligibility"],
    fees: { admission: "Free -- fees are reimbursed by the state government to the school for RTE-quota students" },
    processingTime: "Application windows are announced annually by each state's education department, typically a few months before the academic year starts; a lottery/draw is often used if applications exceed available seats",
    onlineSteps: [
      "Check your state's specific RTE admission portal (each state runs its own -- search '[your state] RTE admission portal')",
      "Register with your child's details, income/category proof, and preferred school choices within your neighborhood zone",
      "If applications exceed seats at a school, a computerized lottery/draw determines allocation",
      "Confirm admission at the allotted school within the specified window",
    ],
    offlineSteps: ["Contact your local Block Education Officer (BEO) or District Education Office for assistance if the online process isn't accessible to you"],
    commonMistakes: [
      "Applying outside the specified neighborhood distance criteria for a school, which can disqualify the application",
      "Missing the application window -- most states run this once annually with a fixed deadline",
    ],
    faqs: [
      {
        q: "Is admission guaranteed if I meet the eligibility criteria?",
        a: "Not automatically -- if eligible applications exceed available RTE-quota seats at a school, allocation is typically done via a computerized lottery, so eligibility gets you into the draw, not a guaranteed seat.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "school-transfer-certificate",
    name: "School Transfer / Leaving Certificate (TC)",
    department: "Education",
    category: "Education",
    categoryIcon: "🎓",
    overview: "Obtaining a Transfer Certificate (TC) from your current/previous school, required when enrolling in a new school.",
    eligibility: "Any student moving from one school to another.",
    documents: ["Student's admission/enrollment number at the current school", "Fee clearance from the current school (dues must typically be cleared first)"],
    fees: { issuance: "Usually free or a nominal administrative fee, varies by school" },
    processingTime: "A few days to about a week at most schools, once dues are cleared",
    onlineSteps: ["Some schools now issue TCs digitally or make them available via DigiLocker -- check with your current school's administration"],
    offlineSteps: [
      "Submit a written application to your current school's administration requesting a Transfer Certificate",
      "Clear any pending fees or library dues, which schools typically require before issuing the TC",
      "Collect the TC and submit it to your new school as part of admission formalities",
    ],
    commonMistakes: ["Not clearing pending dues before applying, which can delay TC issuance", "Losing the physical TC -- keep a scanned/digital copy immediately after receiving it"],
    faqs: [],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "migration-certificate",
    name: "Migration Certificate (University Transfer)",
    department: "Education",
    category: "Education",
    categoryIcon: "🎓",
    overview: "A certificate issued by a university/board confirming a student has completed or discontinued studies there, required when moving to a different university or board for further studies.",
    eligibility: "Students who have completed a course (or are transferring) and need to enroll at a different university/board.",
    documents: ["Final mark sheet/degree certificate from the issuing university", "Provisional certificate, if the final degree hasn't been conferred yet", "Identity proof"],
    fees: { application: "A nominal fee, typically a few hundred rupees, varies by university" },
    processingTime: "A few days to a few weeks, depending on the university's administrative processing time",
    onlineSteps: [
      "Check your university's student portal for an online migration certificate application option -- increasingly common but not yet universal",
      "Upload your final mark sheet/degree certificate and pay the fee",
      "Track and download once issued, or await postal delivery per the university's process",
    ],
    offlineSteps: [
      "Submit a written application to your university's examination/registrar section with the required documents and fee",
    ],
    commonMistakes: [
      "Applying too close to your new institution's admission deadline -- processing can take a few weeks, so apply as soon as your final results are out",
      "Requesting only one copy -- if you might need it for multiple purposes later, some universities charge extra or take longer for duplicate requests, so consider requesting more than one at the outset",
    ],
    faqs: [],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "abc-id",
    name: "Academic Bank of Credits (ABC ID)",
    department: "Education",
    category: "Education",
    categoryIcon: "🎓",
    overview:
      "A digital repository under the National Education Policy (NEP) 2020 that stores students' academic credits across institutions, enabling 'multiple entry-exit' -- allowing students to pause, resume, or switch programs/institutions while retaining and transferring earned credits.",
    eligibility: "Students enrolled in institutions that have adopted the Academic Bank of Credits framework (an increasing number of universities, particularly those following NEP 2020 reforms).",
    documents: ["Aadhaar card (used to generate the ABC ID)", "Institution/enrollment details"],
    fees: { registration: "Free" },
    processingTime: "Instant ID generation; credit crediting to your account depends on your institution uploading records after each term",
    onlineSteps: [
      "Go to the Academic Bank of Credits portal (abc.gov.in) or via DigiLocker, which also supports ABC ID creation",
      "Register using Aadhaar-based authentication to generate your unique ABC ID",
      "Share your ABC ID with your institution so they can credit your academic credits to it each term",
      "Use your ABC ID when transferring between institutions or resuming studies after a break, to carry your accumulated credits forward",
    ],
    offlineSteps: [],
    commonMistakes: ["Not sharing the ABC ID with your institution promptly, meaning credits from a term/course don't get logged to your account"],
    faqs: [
      {
        q: "What's the actual benefit of having an ABC ID?",
        a: "It lets you accumulate and carry forward academic credits across institutions and over time, supporting the NEP 2020 'multiple entry-exit' model -- useful if you pause your education, switch universities, or want credits from one program recognized toward another.",
      },
    ],
    officialLinks: ["https://www.abc.gov.in"],
    lastUpdated: "2026-06-01",
  },

  // ---- New department: Healthcare ----

  {
    id: "abha-health-id",
    name: "ABHA Health ID (Digital Health Account)",
    department: "Healthcare",
    category: "Healthcare",
    categoryIcon: "🏥",
    overview:
      "A free 14-digit digital health ID under the Ayushman Bharat Digital Mission (ABDM) that lets you build a consent-based digital health record, linking prescriptions, test reports, and treatment history from different hospitals/clinics that have adopted ABDM, without needing to carry physical files.",
    eligibility: "Any Indian citizen with Aadhaar or a mobile number.",
    documents: ["Aadhaar card (fastest route, auto-verified) or mobile number"],
    fees: { creation: "Free" },
    processingTime: "Instant, same-day issuance",
    onlineSteps: [
      "Go to abha.abdm.gov.in or download the ABHA app",
      "Choose to register via Aadhaar (OTP-based, fastest) or via mobile number",
      "Complete verification and your 14-digit ABHA ID is generated instantly",
      "Link it at participating hospitals/clinics so they can push your records to your account with your consent",
    ],
    offlineSteps: ["Many hospitals, clinics, and pharmacies that are ABDM-enrolled can help you create an ABHA ID at their registration desk"],
    commonMistakes: [
      "Assuming every hospital or clinic is ABDM-enrolled -- adoption is growing but many smaller clinics and tier-2/tier-3 city practitioners aren't on the network yet, so your records may not show up from every provider you visit",
      "Creating multiple ABHA IDs accidentally (e.g. once via Aadhaar, once via mobile) -- these can be merged through the portal if this happens",
    ],
    faqs: [
      {
        q: "Is my health data stored in one central government database?",
        a: "No -- records stay with the individual healthcare provider (hospital, lab, etc.) and are linked to your ABHA account. You control what's shared and with whom via consent, rather than everything being pooled into a single central repository.",
      },
      {
        q: "Does ABHA give me any medicine or treatment for free?",
        a: "No -- ABHA itself is just a digital health record system. Free treatment/medicines depend on separate scheme eligibility, such as Ayushman Bharat PM-JAY, not on having an ABHA ID.",
      },
    ],
    officialLinks: ["https://abha.abdm.gov.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "esanjeevani-telemedicine",
    name: "eSanjeevani (Free Online Doctor Consultation)",
    department: "Healthcare",
    category: "Healthcare",
    categoryIcon: "🏥",
    overview:
      "India's national telemedicine platform offering free online OPD consultations with doctors, plus doctor-to-doctor consultations at government Health & Wellness Centres in underserved areas -- useful for follow-ups, minor ailments, and prescriptions without an in-person visit.",
    eligibility: "Any citizen; free of charge for both registration and consultation.",
    documents: ["Mobile number for registration", "Aadhaar (optional, for linking to your ABHA-based health record)"],
    fees: { registration: "Free", consultation: "Free", prescription: "Free -- valid at any pharmacy, though free medicine dispensing specifically depends on the hospital/scheme you're linked to" },
    processingTime: "Same-day -- you can typically book a token and consult within hours during active OPD slots",
    onlineSteps: [
      "Go to the eSanjeevani OPD portal or app and register with your mobile number",
      "Book a token for an available OPD slot with a specialist",
      "Join the video/audio consultation at your scheduled time",
      "Receive a digital prescription, valid at any pharmacy",
      "Optionally link your ABHA ID from your eSanjeevani profile so the consultation record is saved to your health account -- ensure your name and mobile number match exactly between both profiles to avoid a linking error",
    ],
    offlineSteps: ["Visit a government Health & Wellness Centre (Ayushman Arogya Mandir), where health workers can connect you with a specialist doctor remotely via the AB-HWC variant of eSanjeevani"],
    commonMistakes: [
      "Mismatched name/mobile number between your ABHA profile and eSanjeevani registration, which causes an ABHA linking error -- keep both consistent",
      "Expecting free medicine automatically with every prescription -- the prescription is valid everywhere, but free dispensing depends on your specific eligibility (e.g. under PM-JAY) at that pharmacy/hospital",
    ],
    faqs: [
      {
        q: "Is eSanjeevani really completely free?",
        a: "Yes -- registration, the consultation itself, and the digital prescription are all free of cost.",
      },
    ],
    officialLinks: ["https://esanjeevani.mohfw.gov.in"],
    lastUpdated: "2026-07-15",
  },

  {
    id: "eraktkosh-blood-bank",
    name: "Blood Bank Search & Donation (eRaktKosh)",
    department: "Healthcare",
    category: "Healthcare",
    categoryIcon: "🏥",
    overview: "A national blood bank management portal to check real-time blood availability by group and location, find nearby blood banks/donation camps, and register as a voluntary blood donor.",
    eligibility: "Anyone searching for blood availability; donors must generally be aged 18-65, in good health, and meet standard eligibility criteria (weight, hemoglobin level, gap since last donation, etc.) checked at the donation point.",
    documents: ["Identity proof, for donor registration at a blood bank/camp"],
    fees: { searching: "Free" },
    processingTime: "Instant search results; actual blood availability depends on real-time stock reported by each blood bank",
    onlineSteps: [
      "Go to eraktkosh.mohfw.gov.in (or the eRaktKosh app)",
      "Search by blood group, component (whole blood, plasma, platelets, etc.), and your city/district to see nearby blood banks with current stock",
      "Register as a voluntary donor and find upcoming donation camps near you through the same portal",
    ],
    offlineSteps: ["Visit any government or Red Cross blood bank directly to donate or request blood in an emergency"],
    commonMistakes: [
      "Relying only on the online stock figure in a true emergency without also calling the blood bank directly to confirm, since stock can change quickly",
    ],
    faqs: [],
    officialLinks: ["https://eraktkosh.mohfw.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "organ-donation-notto",
    name: "Organ Donation Registration (NOTTO)",
    department: "Healthcare",
    category: "Healthcare",
    categoryIcon: "🏥",
    overview: "Registering your pledge to donate organs after death (or, for living donors, understanding the process) through the National Organ and Tissue Transplant Organisation (NOTTO), India's apex body coordinating organ donation and transplantation.",
    eligibility: "Any adult can pledge to be an organ donor after death. Living organ donation has separate, stricter eligibility and legal requirements typically involving close relatives, assessed case-by-case with hospital and authorization committee approval.",
    documents: ["Identity proof", "Aadhaar card, for registration"],
    fees: { pledge: "Free" },
    processingTime: "Pledge registration is quick; it records your intent but doesn't itself trigger any medical process until the relevant time",
    onlineSteps: [
      "Go to notto.abdm.gov.in (or notto.mohfw.gov.in) and register your organ donation pledge",
      "Fill in your details and specify which organs/tissues you wish to pledge",
      "Inform your family of your decision -- next of kin consent is typically still required at the actual time of donation in India, so this conversation matters as much as the registration itself",
    ],
    offlineSteps: ["Many hospitals and NGOs working on organ donation awareness can help you register a pledge in person"],
    commonMistakes: [
      "Registering a pledge without informing family -- since next-of-kin consent is generally required at the time of donation, an unaware family can override your registered wish",
    ],
    faqs: [
      {
        q: "If I register as an organ donor, is my family's consent still needed later?",
        a: "In practice, yes -- hospitals in India typically still seek family consent at the time of donation even if you've registered a pledge, so it's important to discuss your wishes with your family in advance, not just register online.",
      },
    ],
    officialLinks: ["https://notto.abdm.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "ors-hospital-registration",
    name: "Government Hospital OPD Registration (ORS)",
    department: "Healthcare",
    category: "Healthcare",
    categoryIcon: "🏥",
    overview: "The Online Registration System (ORS) lets you book an OPD appointment at participating government hospitals in advance, avoiding long queues for token registration on the day.",
    eligibility: "Any patient wanting to visit a participating government hospital's OPD.",
    documents: ["Aadhaar card or mobile number for registration", "Previous case papers/records, if it's a follow-up visit"],
    fees: { booking: "Free -- standard OPD consultation charges (if any) at that specific government hospital still apply as usual" },
    processingTime: "Instant booking; actual wait time at the hospital depends on that day's OPD load",
    onlineSteps: [
      "Go to ors.gov.in and search for your city/hospital and the department you need (general medicine, cardiology, etc.)",
      "Choose an available date and time slot",
      "Register with Aadhaar or mobile number and confirm your booking",
      "Arrive at the hospital with your booking confirmation to get priority in the queue",
    ],
    offlineSteps: ["Standard walk-in OPD registration remains available at the hospital if you haven't booked online, though it typically involves a longer queue"],
    commonMistakes: ["Not checking whether your specific hospital/department is actually listed on ORS -- not all government hospitals or every department within a hospital are covered yet"],
    faqs: [],
    officialLinks: ["https://ors.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "tele-manas-mental-health",
    name: "Mental Health Helpline (Tele MANAS)",
    department: "Healthcare",
    category: "Healthcare",
    categoryIcon: "🏥",
    overview: "A free, 24x7 national tele-mental-health helpline offering counselling and support, staffed by trained counsellors with escalation to specialists where needed, available in multiple languages.",
    eligibility: "Anyone in India seeking mental health support -- no eligibility restriction.",
    documents: [],
    fees: { call: "Free (toll-free)" },
    processingTime: "Immediate -- it's a live helpline, available 24x7",
    onlineSteps: ["Call the Tele MANAS toll-free number 14416 (or 1-800-891-4416) from anywhere in India, any time"],
    offlineSteps: [],
    commonMistakes: ["Hesitating to call because of stigma or assuming it's only for severe crises -- the service supports a wide range of concerns, from everyday stress to acute crisis situations"],
    faqs: [
      {
        q: "Is this only for emergencies?",
        a: "No -- Tele MANAS supports a broad range of mental health concerns, not just crises. It's staffed by trained counsellors who can also refer you to specialists or nearby facilities when needed.",
      },
    ],
    officialLinks: ["https://telemanas.mohfw.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "cowin-vaccination-certificate",
    name: "Vaccination Certificate Download (CoWIN)",
    department: "Healthcare",
    category: "Healthcare",
    categoryIcon: "🏥",
    overview: "Downloading your COVID-19 (or other CoWIN-recorded) vaccination certificate, needed for some travel, employment, or verification purposes.",
    eligibility: "Anyone vaccinated in India whose vaccination was recorded on CoWIN.",
    documents: ["Mobile number used during vaccination registration"],
    fees: { download: "Free" },
    processingTime: "Instant",
    onlineSteps: [
      "Go to cowin.gov.in and select 'Certificate' under the appointment/account section",
      "Log in with the mobile number used at the time of vaccination and verify via OTP",
      "Select the relevant vaccination record and download your certificate as a PDF",
      "Certificates are also accessible via DigiLocker and the Aarogya Setu app",
    ],
    offlineSteps: [],
    commonMistakes: ["Trying to log in with a different mobile number than the one originally used for registration -- the OTP will only work with the number tied to that vaccination record"],
    faqs: [],
    officialLinks: ["https://www.cowin.gov.in"],
    lastUpdated: "2026-06-01",
  },

  // ---- New department: Property ----

  {
    id: "property-registration",
    name: "Property Registration (Sale Deed)",
    department: "Property",
    category: "Property",
    categoryIcon: "🏠",
    overview:
      "Legally registering a property purchase (sale deed) with the state's Sub-Registrar Office, which is what actually transfers legal title -- an unregistered sale agreement alone does not make you the legal owner. Each state runs its own registration portal (Stamps & Registration is a state subject).",
    eligibility: "Buyer and seller of any immovable property.",
    documents: [
      "Sale deed / agreement drafted with correct property description",
      "Identity and address proof of both parties and witnesses",
      "PAN card of both parties",
      "Proof of stamp duty and registration fee payment",
      "Property tax receipts and previous title documents",
    ],
    fees: {
      stampDuty: "Varies significantly by state, typically 4-8% of property value",
      registrationFee: "Typically around 1% of property value, varies by state",
    },
    processingTime: "The registration appointment itself takes a few hours at the Sub-Registrar Office; the registered document is usually available within a few days to a couple of weeks afterward",
    onlineSteps: [
      "Search for your state's official Stamps & Registration portal (e.g. Karnataka's Kaveri Online Services, Maharashtra's IGR, Delhi's e-registration)",
      "Calculate applicable stamp duty and registration fee using the portal's calculator",
      "Pay stamp duty (often via e-stamping) and registration fee online",
      "Book an appointment at your Sub-Registrar Office (SRO) and upload draft documents in advance where supported",
      "Attend the SRO in person with both parties and witnesses to complete biometric/photo verification and sign the register",
    ],
    offlineSteps: ["Visit your Sub-Registrar Office directly to begin the process if your state's online booking isn't available or convenient"],
    commonMistakes: [
      "Relying only on an unregistered sale agreement, mistakenly believing it transfers ownership -- registration at the SRO is what legally transfers title in most cases",
      "Not verifying the seller's title and checking for existing encumbrances (via an Encumbrance Certificate) before finalizing the purchase",
      "Underpaying stamp duty by undervaluing the property below the government's 'guidance value'/circle rate, which can cause registration to be rejected or challenged later",
    ],
    faqs: [
      {
        q: "Is a notarized sale agreement enough to make me the legal owner?",
        a: "No -- for most property transactions, registering the sale deed at the Sub-Registrar Office is what legally transfers ownership. A notarized-only agreement does not substitute for registration.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-07-01",
    stateOverrides: {
      Karnataka: {
        officialLinks: ["https://kaverionline.karnataka.gov.in"],
        onlineSteps: [
          "Register/login at kaverionline.karnataka.gov.in (Kaveri 2.0)",
          "Use the stamp duty and registration fee calculator under 'Services for Guest User'",
          "Check the property's guidance value ('Know Your Property Valuation') to ensure your declared value isn't below it",
          "Complete e-stamping and pay the registration fee through the portal",
          "Book a Sub-Registrar Office (SRO) appointment for final document execution and biometric verification",
        ],
      },
    },
  },

  {
    id: "encumbrance-certificate",
    name: "Encumbrance Certificate (EC)",
    department: "Property",
    category: "Property",
    categoryIcon: "🏠",
    overview:
      "A certificate showing all registered transactions on a property over a chosen period -- sales, mortgages, loans -- used to confirm a property is free of legal/financial liabilities before purchase, or required by banks for a home loan.",
    eligibility: "Any property owner or prospective buyer (typically requested by whoever needs to verify the property's transaction history).",
    documents: ["Property's survey number, address, or previous registered document details"],
    fees: { ecFee: "A nominal fee, typically a few hundred rupees for a multi-year search, varies by state" },
    processingTime: "Instant to a few days, depending on whether your state's records are fully digitized for the period you're checking",
    onlineSteps: [
      "Search for your state's Stamps & Registration portal (e.g. Karnataka's Kaveri Online Services)",
      "Search using the property's survey number/address and select the years you want the EC to cover",
      "Pay the fee and download the digitally-signed EC if available online",
    ],
    offlineSteps: ["Visit the Sub-Registrar Office where the property is registered if older records aren't digitized, or if your state doesn't yet offer full online EC issuance"],
    commonMistakes: [
      "Requesting an EC for too short a period -- request enough years back to cover any potential undisclosed loans or disputes, commonly 13-30 years depending on the purpose (e.g. banks often want longer periods)",
      "Assuming a clean EC alone guarantees a property is dispute-free -- it only reflects what's been formally registered, not unregistered claims or disputes",
    ],
    faqs: [
      {
        q: "How many years should I request an EC for?",
        a: "This depends on the purpose -- a home loan lender may want 13-30 years of history. Ask your bank/lawyer for the specific requirement for your situation rather than assuming a shorter period is sufficient.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
    stateOverrides: {
      Karnataka: {
        officialLinks: ["https://kaverionline.karnataka.gov.in"],
        onlineSteps: [
          "Log in to kaverionline.karnataka.gov.in (Kaveri 2.0) and select 'Online EC' under services",
          "Enter district, SRO office, village/property details, and the search duration (e.g. last 10-30 years)",
          "Search and download the EC if available -- it's digitally signed and carries the same legal validity as a physical copy from the SRO",
        ],
      },
    },
  },

  {
    id: "property-tax-payment",
    name: "Property Tax Payment",
    department: "Property",
    category: "Property",
    categoryIcon: "🏠",
    overview: "Paying annual property tax to your municipal corporation/local body, based on your property's assessed value, size, and usage type.",
    eligibility: "Any property owner within a municipal corporation/local body's jurisdiction.",
    documents: ["Property ID / PID number / Khata number (as used by your local municipal body)", "Previous tax receipt, for reference"],
    fees: { propertyTax: "Calculated based on your municipal body's formula (property size, location, usage, age) -- varies significantly by city" },
    processingTime: "Instant online payment and receipt generation",
    onlineSteps: [
      "Go to your city/municipal corporation's official property tax portal (each city runs its own -- search '[your city] property tax online payment')",
      "Enter your Property ID/PID or search by owner name/address to fetch your assessment",
      "Verify the assessed tax amount and pay online via net banking, card, or UPI",
      "Download the receipt for your records",
    ],
    offlineSteps: ["Pay at your municipal corporation's ward office or designated bank branch collection counters if online payment isn't convenient"],
    commonMistakes: [
      "Missing early-payment rebate windows -- many municipal bodies offer a discount (commonly 5-10%) for paying the full year's tax within a specified early period",
      "Not updating property details (e.g. after renovation/change of use) with the municipal body, leading to incorrect tax assessment",
    ],
    faqs: [
      {
        q: "Is there a discount for paying early?",
        a: "Many municipal corporations offer a rebate (commonly around 5-10%) for paying the full year's property tax within an early window at the start of the financial year -- check your specific city's property tax portal for the current rebate window and rate.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "property-mutation",
    name: "Property Mutation (Records Transfer)",
    department: "Property",
    category: "Property",
    categoryIcon: "🏠",
    overview:
      "Updating land/property revenue records to reflect the current owner's name after a sale, inheritance, or gift -- distinct from (and done after) property registration. Mutation updates the municipal/revenue record used for property tax; it doesn't itself transfer legal title, but not doing it causes ongoing confusion about who's officially liable for tax and utility connections.",
    eligibility: "New property owners after a registered sale, inheritance, gift, or partition.",
    documents: ["Registered sale deed / inheritance documents / gift deed", "Latest property tax receipt", "Identity proof", "Death certificate and legal heir certificate, for inheritance-based mutation"],
    fees: { mutationFee: "A nominal fee, varies by municipal body/state" },
    processingTime: "A few weeks to a couple of months, depending on local verification workload",
    onlineSteps: [
      "Go to your city/state's municipal or land records portal (search '[your city/state] property mutation online')",
      "Upload the registered sale deed or inheritance documents and previous tax receipts",
      "Pay the mutation fee and track application status online",
    ],
    offlineSteps: ["Visit your municipal ward office or Tahsildar's office to apply for mutation with physical documents if online filing isn't available in your area"],
    commonMistakes: [
      "Assuming registration alone is enough and skipping mutation -- this leaves property tax records under the previous owner's name, which can cause complications later (e.g. when reselling, or getting utility connections transferred)",
      "Delaying mutation after inheritance, which can complicate matters if multiple legal heirs are involved and records aren't updated promptly",
    ],
    faqs: [
      {
        q: "If I've registered my property purchase, do I still need mutation?",
        a: "Yes -- registration transfers legal title, but mutation is a separate step that updates the municipal/revenue record (used for property tax billing and often required for future transactions) to reflect you as the current owner.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "land-records-ulpin",
    name: "Land Records & ULPIN (Bhu-Aadhaar)",
    department: "Property",
    category: "Property",
    categoryIcon: "🏠",
    overview:
      "Accessing digital land records and your land parcel's ULPIN (Unique Land Parcel Identification Number, popularly called 'Bhu-Aadhaar') -- a 14-digit ID assigned to a surveyed land parcel under the Digital India Land Records Modernization Programme (DILRMP), intended to reduce land disputes and streamline property verification. Coverage is uneven: some states (e.g. Andhra Pradesh) have close to full ULPIN coverage, others (including Delhi, which began rollout in February 2026) are still in early phases.",
    eligibility: "Any landowner; availability of ULPIN and digital land records depends on your state/UT's specific rollout progress.",
    documents: ["Survey number or existing land record reference (khata/patta/7-12 extract, depending on your state's terminology)"],
    fees: { viewingRecords: "Free or a nominal fee for a printed/certified copy, varies by state" },
    processingTime: "Instant for viewing digitized records; ULPIN assignment for a not-yet-covered parcel depends entirely on your state's ongoing survey timeline",
    onlineSteps: [
      "Go to your state's land records portal (each state runs its own -- e.g. Bhoomi for Karnataka, Dharani for Telangana, MahaBhulekh for Maharashtra, Bhulekh for Uttar Pradesh)",
      "Search using your survey number, khata number, or owner name to view your digitized land record",
      "Check whether a ULPIN has been assigned to your parcel yet -- this is noted on the record if your state/area has completed that stage of digitization",
    ],
    offlineSteps: ["Visit your local Revenue/Tahsildar office for certified copies of land records or to inquire about ULPIN assignment status for your parcel"],
    commonMistakes: [
      "Assuming ULPIN is available everywhere -- national coverage is still partial (roughly half of parcels nationally as of recent data), so don't be surprised if your parcel doesn't have one yet",
      "Relying solely on an old paper record without checking whether the state's digitized version has since been updated with more recent transactions",
    ],
    faqs: [
      {
        q: "What is ULPIN actually for?",
        a: "It's a permanent, geo-coordinate-based 14-digit ID for a specific land parcel, meant to create a single authoritative digital reference -- reducing disputes from duplicate or unclear records and eventually streamlining property transactions, taxation, and verification.",
      },
      {
        q: "My state hasn't assigned a ULPIN to my land yet -- what can I do?",
        a: "Not much directly -- ULPIN assignment depends on your state completing detailed surveys and geo-referenced mapping for your area. You can check your state's land records portal periodically, or ask your local Revenue office about the rollout timeline for your area.",
      },
    ],
    officialLinks: ["https://dolr.gov.in/en/ulpin"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "e-stamping",
    name: "e-Stamping / Stamp Duty Payment",
    department: "Property",
    category: "Property",
    categoryIcon: "🏠",
    overview: "Paying stamp duty electronically for property transactions and various legal documents, replacing physical stamp paper -- reduces fraud risk from counterfeit stamp papers and is faster to obtain.",
    eligibility: "Anyone needing to pay stamp duty for a property transaction or other stampable legal document.",
    documents: ["Document details (type of transaction, parties involved, property/transaction value)"],
    fees: { stampDuty: "Calculated based on the transaction type and value, per your state's stamp duty schedule" },
    processingTime: "Instant e-stamp certificate generation once payment is made",
    onlineSteps: [
      "Go to the Stock Holding Corporation of India (SHCIL) e-stamping portal (shcilestamp.com) if your state uses SHCIL, or your specific state's Stamps & Registration portal if it has its own integrated e-stamping (many states now do)",
      "Enter document/transaction details to calculate the applicable stamp duty",
      "Pay online and download your e-stamp certificate, which carries a unique certificate number for verification",
    ],
    offlineSteps: ["Authorized Collection Centres (ACCs) in your city can issue e-stamp certificates in person for a service charge"],
    commonMistakes: ["Using an unauthorized/unverified vendor for physical stamp paper instead of official e-stamping channels -- counterfeit stamp paper remains a real fraud risk"],
    faqs: [],
    officialLinks: ["https://www.shcilestamp.com"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "svamitva-property-card",
    name: "SVAMITVA Rural Property Card",
    department: "Property",
    category: "Property",
    categoryIcon: "🏠",
    overview:
      "A central scheme using drone-based surveys to map rural inhabited (abadi) land and issue property owners a legal 'Property Card', giving villagers formal proof of ownership for the first time in many cases -- helpful for accessing bank loans and reducing property disputes in rural areas.",
    eligibility: "Rural property owners in villages covered by the SVAMITVA survey (rollout is phased, village by village, across states).",
    documents: ["No application is typically needed -- surveys are conducted village-wide; property owners verify draft records during a public claims/objections period"],
    fees: { propertyCard: "Free" },
    processingTime: "Drone survey and mapping for a village can take a few months; property cards are issued after a claims/objections review period once draft records are published",
    onlineSteps: [
      "Check whether your village has been covered under SVAMITVA via your state's land records portal or Gram Panchayat notice board",
      "If a draft property record has been published for your village, review it during the public claims/objections window and raise any discrepancy with your Gram Panchayat/survey team",
      "Once finalized, download your Property Card via your state's land records portal, if digitally issued",
    ],
    offlineSteps: ["Contact your Gram Panchayat or local Revenue officials for survey status, or to raise a correction during the claims/objections period"],
    commonMistakes: [
      "Missing the claims/objections window during which discrepancies in the draft record can be raised -- once finalized, corrections become more difficult",
      "Assuming every village nationally has been covered -- rollout is phased and still ongoing in many states",
    ],
    faqs: [
      {
        q: "Does this scheme cover urban properties too?",
        a: "No -- SVAMITVA specifically targets rural inhabited (abadi) land. Urban land digitization efforts (like Delhi's Bhu-Aadhaar rollout) are separate initiatives, though they build on similar underlying technology and the same broader DILRMP goals.",
      },
    ],
    officialLinks: ["https://svamitva.nic.in"],
    lastUpdated: "2026-07-01",
  },

  // ---- New department: Utilities ----

  {
    id: "electricity-new-connection",
    name: "New Electricity Connection",
    department: "Utilities",
    category: "Utilities",
    categoryIcon: "⚡",
    overview: "Applying for a new electricity connection for a home or business from your local electricity distribution company (discom) -- each state/city has its own discom, so the exact portal differs by location.",
    eligibility: "Property owner or authorized occupant at the connection address.",
    documents: ["Address/ownership proof or rental agreement", "Identity proof", "Property tax receipt or building completion certificate, in some cases", "Load requirement details (for larger/commercial connections)"],
    fees: { connectionCharge: "Varies by discom, load requirement, and connection type (domestic/commercial)", securityDeposit: "Refundable deposit based on estimated consumption, varies by discom" },
    processingTime: "A few days to a few weeks depending on site inspection and infrastructure availability",
    onlineSteps: [
      "Go to your local discom's website (search '[your city/state] electricity board new connection')",
      "Fill the new connection application with property and load details",
      "Upload documents and pay the applicable charges/deposit online",
      "A site inspection is typically scheduled before the connection is energized",
    ],
    offlineSteps: ["Visit your local discom's sub-division office to apply in person if online application isn't available in your area"],
    commonMistakes: ["Underestimating the load requirement, which can require a costly upgrade application later if consumption regularly exceeds the sanctioned load"],
    faqs: [],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "electricity-bill-payment",
    name: "Electricity Bill Payment & Complaint",
    department: "Utilities",
    category: "Utilities",
    categoryIcon: "⚡",
    overview: "Paying your electricity bill online and raising complaints (billing disputes, outages, meter issues) with your local discom.",
    eligibility: "Any electricity connection holder.",
    documents: ["Consumer/account number (printed on your bill)"],
    fees: { billAmount: "As per your metered consumption and your discom's tariff structure", latePaymentSurcharge: "Applies if paid after the due date, varies by discom" },
    processingTime: "Bill payment is instant; complaint resolution timelines vary by discom and issue type",
    onlineSteps: [
      "Go to your discom's website or app, or a bill payment aggregator (many UPI apps also support this)",
      "Enter your consumer number to fetch your current bill",
      "Pay via UPI, card, or net banking",
      "For complaints, use the discom's grievance/complaint section, or call their helpline -- note your complaint reference number",
    ],
    offlineSteps: ["Pay at discom collection centers, authorized banks, or via CSC/CSP agents; register complaints in person at your local sub-division office"],
    commonMistakes: ["Not saving the payment receipt/transaction ID, which is needed if a payment doesn't reflect promptly", "Ignoring an unusually high bill without raising a query -- meter reading errors do happen and are correctable if flagged promptly"],
    faqs: [],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "lpg-gas-connection",
    name: "LPG Gas Connection (New / Ujjwala)",
    department: "Utilities",
    category: "Utilities",
    categoryIcon: "⚡",
    overview: "Getting a new LPG (cooking gas) connection, either a regular paid connection from an oil marketing company (Indane, Bharat Gas, HP Gas), or a free connection under the Pradhan Mantri Ujjwala Yojana (PMUY) for eligible low-income women.",
    eligibility: "Regular connection: any adult resident. PMUY: adult women from BPL/low-income households as per the scheme's eligibility criteria, who don't already have an LPG connection in their household.",
    documents: ["Aadhaar card", "Address proof", "Bank account details (for PMUY subsidy/DBT)", "Passport-size photograph"],
    fees: { regularConnection: "Security deposit for the cylinder and regulator applies, varies by distributor and cylinder size", ujjwala: "Free connection under PMUY -- deposit is waived for eligible beneficiaries" },
    processingTime: "A few days to about 2 weeks depending on distributor and documentation",
    onlineSteps: [
      "For a regular connection: go to your preferred provider's website (Indane, Bharat Gas, HP Gas) and apply online, selecting your nearest distributor",
      "For PMUY: go to pmuy.gov.in, check eligibility, and apply -- you'll be directed to your nearest distributor to complete the process",
      "Upload documents and complete any required e-KYC",
    ],
    offlineSteps: ["Visit your nearest LPG distributor directly to apply, with documents in hand"],
    commonMistakes: ["Applying for PMUY when your household already has an LPG connection under another family member's name, which typically disqualifies the application"],
    faqs: [
      {
        q: "Is the Ujjwala connection completely free?",
        a: "Eligible beneficiaries get a free connection (security deposit waived) plus a subsidized first refill and stove in many cases -- specific benefits have varied by scheme phase, so confirm current details on pmuy.gov.in or with your distributor.",
      },
    ],
    officialLinks: ["https://www.pmuy.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "water-connection",
    name: "New Water Connection",
    department: "Utilities",
    category: "Utilities",
    categoryIcon: "⚡",
    overview: "Applying for a new municipal water supply connection for a residential or commercial property, through your city's water board/municipal corporation.",
    eligibility: "Property owner or authorized occupant.",
    documents: ["Property ownership/rental proof", "Identity proof", "Property tax receipt or building plan approval, in some cases"],
    fees: { connectionCharge: "Varies significantly by city and connection size/type", securityDeposit: "May apply, varies by city" },
    processingTime: "A few weeks, depending on site inspection and pipeline availability in your area",
    onlineSteps: [
      "Go to your city's water board/municipal corporation website (search '[your city] water connection online')",
      "Fill the application with property details and upload documents",
      "Pay applicable charges online -- a site inspection is typically scheduled before connection",
    ],
    offlineSteps: ["Visit your city's water board office to apply in person if online application isn't available"],
    commonMistakes: ["Not checking whether a water pipeline already runs near your property -- if not, additional infrastructure charges or delays may apply"],
    faqs: [],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "broadband-telecom-complaint",
    name: "Broadband / Telecom Complaint",
    department: "Utilities",
    category: "Utilities",
    categoryIcon: "⚡",
    overview: "Raising a complaint about broadband, landline, or mobile service issues (billing disputes, poor service, unresolved outages) -- first with your provider, then escalating to TRAI/DoT if unresolved.",
    eligibility: "Any telecom/broadband service subscriber.",
    documents: ["Account/customer ID", "Details of the complaint and any prior complaint reference numbers with the provider"],
    fees: { complaint: "Free" },
    processingTime: "Providers are generally expected to resolve complaints within a defined window (commonly a few days to a few weeks depending on issue type); escalation to TRAI is a further step if unresolved",
    onlineSteps: [
      "First raise the issue directly with your provider's app/website/customer care -- note the complaint/ticket number",
      "If unresolved within the provider's stated timeline, escalate to the Appellate Authority within that same company (details are usually on your bill or their website)",
      "If still unresolved, you can approach TRAI's consumer complaint channels or the DoT's grievance portal for broader telecom grievances",
    ],
    offlineSteps: ["Visit your provider's local customer service center to register or escalate a complaint in person"],
    commonMistakes: ["Escalating to TRAI/DoT before giving the provider's own grievance/appellate process a chance to resolve it -- most complaints are expected to go through the provider first"],
    faqs: [],
    officialLinks: ["https://www.trai.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "mobile-number-portability",
    name: "Mobile Number Portability (MNP)",
    department: "Utilities",
    category: "Utilities",
    categoryIcon: "⚡",
    overview: "Switching your mobile network provider while keeping the same phone number, using a Unique Porting Code (UPC).",
    eligibility: "Any mobile subscriber whose number has been active for a minimum period (commonly 90 days) with the current operator and has no unresolved dues.",
    documents: ["Existing mobile number", "Identity proof (for the new SIM activation)", "Address proof, for the new connection's KYC"],
    fees: { porting: "A small porting fee applies, varies by new operator" },
    processingTime: "Typically 3-7 working days from requesting the UPC to the port completing",
    onlineSteps: [
      "SMS 'PORT <mobile number>' to 1900 from the number you want to port -- you'll receive a Unique Porting Code (UPC) via SMS",
      "Visit your chosen new operator's store or website with the UPC and complete KYC (Aadhaar-based e-KYC is common)",
      "The port typically completes within a few days -- your existing SIM stays active until the switch is finalized",
    ],
    offlineSteps: ["Visit the new operator's retail store directly with your UPC and ID proof to complete porting"],
    commonMistakes: ["Requesting the UPC too close to when you need the new SIM active -- porting takes a few days, so plan ahead", "Having unpaid dues with your current operator, which can block porting until cleared"],
    faqs: [
      {
        q: "Do I lose my number if I switch operators?",
        a: "No -- that's the entire point of MNP; you keep your existing mobile number while switching to a new operator/plan.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  // ---- New department: Police & Legal ----

  {
    id: "fir-filing",
    name: "Filing an FIR (First Information Report)",
    department: "Police & Legal",
    category: "Police & Legal",
    categoryIcon: "⚖",
    overview:
      "Filing a First Information Report with the police -- the formal record that starts a criminal investigation. Under CrPC Section 154, police must register an FIR for any cognizable offense you report, regardless of where it occurred (a 'Zero FIR' can be filed at any police station and later transferred to the jurisdictional one).",
    eligibility: "Any person who is a victim or witness to a cognizable offense.",
    documents: ["Identity proof", "Details of the incident (date, time, place, description)", "Any supporting evidence (photos, documents, witness details)"],
    fees: { filing: "Free" },
    processingTime: "Police are legally required to register a cognizable-offense FIR immediately upon report; a copy must be provided to you free of cost",
    onlineSteps: [
      "Many states now offer online/e-FIR filing for certain offense categories (commonly theft, lost items) via their state police portal (search '[your state] police e-FIR portal')",
      "For most serious or urgent matters, in-person reporting at a police station remains the standard and most reliable route",
      "You can also file a Zero FIR at any police station regardless of where the incident occurred, which is then transferred to the correct jurisdiction",
    ],
    offlineSteps: [
      "Visit the nearest police station and report the incident to the duty officer",
      "Ensure the FIR is read back to you before signing, and insist on receiving a free copy",
      "If police refuse to register a cognizable offense, you can approach the Superintendent of Police in writing, or a magistrate under CrPC Section 156(3)",
    ],
    commonMistakes: [
      "Not insisting on a copy of the FIR after filing -- you're legally entitled to one, free of cost",
      "Assuming you must go to the specific police station covering the incident location -- a Zero FIR can be filed at any police station first",
      "Not reviewing the FIR content before signing -- ensure it accurately reflects what you reported",
    ],
    faqs: [
      {
        q: "What if a police station refuses to register my FIR?",
        a: "For cognizable offenses, refusal to register an FIR is itself against the law. You can escalate in writing to the Superintendent of Police, or approach a magistrate under CrPC Section 156(3) to direct registration.",
      },
      {
        q: "What's a Zero FIR?",
        a: "It's an FIR that can be registered at any police station regardless of where the crime occurred, which is then transferred to the police station with actual jurisdiction -- useful when you need to report urgently but aren't near the relevant station.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "police-clearance-certificate",
    name: "Police Clearance Certificate (PCC)",
    department: "Police & Legal",
    category: "Police & Legal",
    categoryIcon: "⚖",
    overview: "A certificate confirming no criminal record exists against you in India, commonly required for overseas employment, immigration, long-term visas, or higher education abroad.",
    eligibility: "Indian citizens (and some categories of foreign nationals residing in India) needing to prove absence of a criminal record for a specific purpose abroad.",
    documents: ["Valid passport", "Proof of purpose (visa category, employment offer, admission letter, etc., depending on why you need the PCC)", "Address proof"],
    fees: { pcc: "₹500 (standard passport-related fee, consistent with other passport services)" },
    processingTime: "Often same-day to a few days if your passport address hasn't changed since issuance and no verification is pending; longer if a police verification needs to be freshly conducted",
    onlineSteps: [
      "Go to passportindia.gov.in and log in with your existing passport credentials",
      "Select 'Apply for Police Clearance Certificate' and specify the purpose",
      "Book an appointment at your nearest Passport Seva Kendra (PSK) if required, or the request may be processed directly if you're eligible for the online-only route",
      "Track and download your PCC once issued",
    ],
    offlineSteps: ["Visit a Passport Seva Kendra (PSK) in person if the online-only route isn't available for your specific situation"],
    commonMistakes: [
      "Applying with an address different from your passport's current address without realizing this typically triggers a fresh police verification, extending processing time",
      "Not clarifying the specific PCC format/requirement with the requesting country/employer beforehand -- some destinations have specific attestation or apostille requirements beyond just the PCC itself",
    ],
    faqs: [
      {
        q: "How long does a PCC take if my address hasn't changed?",
        a: "If your current address matches your passport and no fresh police verification is needed, PCC issuance can be same-day to a few days. If your address has changed, expect a longer timeline for verification.",
      },
    ],
    officialLinks: ["https://www.passportindia.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "cyber-crime-complaint",
    name: "Cyber Crime Complaint (1930 / cybercrime.gov.in)",
    department: "Police & Legal",
    category: "Police & Legal",
    categoryIcon: "⚖",
    overview:
      "Reporting cybercrime -- financial fraud, hacking, online harassment, identity theft -- through India's National Cyber Crime Reporting Portal and the 24x7 helpline 1930, which is specifically designed for fast action on financial fraud (bank account freezing). Since May 2025, an 'e-Zero FIR' is automatically registered for financial losses above ₹10 lakh reported through this system.",
    eligibility: "Anyone who is a victim of cybercrime -- financial fraud complaints are prioritized for urgent action.",
    documents: ["Transaction details (amount, time, UPI/account reference) for financial fraud", "Screenshots/evidence of the incident", "Identity proof"],
    fees: { reporting: "Free -- be very wary of anyone charging a fee to 'help' file a cybercrime complaint" },
    processingTime: "Call 1930 within the first hour for the best chance of freezing a fraudulent transaction; portal complaints are acknowledged immediately and triaged, with financial fraud prioritized",
    onlineSteps: [
      "For active financial fraud, call 1930 immediately (toll-free, 24x7) and provide transaction details -- this can trigger a bank freeze request on the recipient account within hours if reported quickly",
      "File a detailed complaint at cybercrime.gov.in under the relevant category (Financial Fraud, Women/Child Related Crime, or Other Cyber Crime)",
      "Upload evidence (screenshots, transaction records) and save your complaint/acknowledgment number",
      "For losses above ₹10 lakh, an e-Zero FIR is automatically generated and routed for investigation",
    ],
    offlineSteps: ["Visit your nearest cyber crime cell or police station to file a formal FIR if required for recovery/investigation beyond the portal complaint"],
    commonMistakes: [
      "Delaying the report -- recovery chances drop sharply after the first few hours as fraudulent funds move between accounts; reporting within 6 hours meaningfully improves outcomes",
      "Falling for 'digital arrest' scams -- no Indian government agency conducts arrests over video call or asks you to transfer money to a 'safe' or 'verification' account; hang up and report immediately if you receive such a call",
      "Not saving your complaint/acknowledgment number, which is needed for all follow-up",
    ],
    faqs: [
      {
        q: "Is an FIR always required for cybercrime?",
        a: "Not for every case -- portal complaints are often sufficient initially for smaller cases. An FIR becomes mandatory for losses above ₹10 lakh (triggering the automatic e-Zero FIR), for serious offenses, or when your bank specifically requires one for fund recovery.",
      },
      {
        q: "What's a 'digital arrest' scam?",
        a: "A common fraud where callers impersonate police/government officials and claim you're under investigation or 'digital arrest', pressuring you to transfer money. This is not a real legal process -- no genuine agency conducts arrests over a video call or demands money transfers for 'verification'. Disconnect and report via 1930 immediately.",
      },
    ],
    officialLinks: ["https://cybercrime.gov.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "consumer-complaint",
    name: "Consumer Complaint (National Consumer Helpline / e-Daakhil)",
    department: "Police & Legal",
    category: "Police & Legal",
    categoryIcon: "⚖",
    overview:
      "Resolving disputes with a seller, service provider, or e-commerce platform -- starting with the National Consumer Helpline for mediation, and escalating to a formal consumer forum complaint via the e-Daakhil portal if unresolved, under the Consumer Protection Act, 2019.",
    eligibility: "Any consumer who has a grievance against a seller/service provider regarding goods or services purchased.",
    documents: ["Purchase proof (invoice, order confirmation)", "Communication records with the seller/platform", "Details of the grievance and desired resolution"],
    fees: { helpline: "Free", eDaakhilFiling: "A nominal court fee applies for formal consumer forum complaints, scaled by the claim amount" },
    processingTime: "National Consumer Helpline mediation: days to a few weeks; formal consumer forum cases via e-Daakhil can take longer depending on case complexity and forum workload",
    onlineSteps: [
      "First, try resolving directly with the seller/platform's grievance officer, keeping a written record (email) of your escalation",
      "If unresolved within about 7 days, call the National Consumer Helpline (1915) or register your grievance on their portal/app (UMANG/NCH) for mediation assistance",
      "If still unresolved, file a formal complaint on the e-Daakhil portal, selecting the appropriate consumer forum based on your claim amount and jurisdiction",
      "Track your case status and hearing dates through the e-Daakhil portal",
    ],
    offlineSteps: ["You can file a physical complaint at your District Consumer Disputes Redressal Commission if you prefer not to use e-Daakhil"],
    commonMistakes: [
      "Not keeping written records of communication with the seller/platform -- these matter if you need to escalate",
      "Jumping straight to a formal consumer forum complaint without first trying the National Consumer Helpline's faster mediation route",
    ],
    faqs: [
      {
        q: "Can I hold an e-commerce platform responsible, not just the individual seller?",
        a: "Yes -- under the Consumer Protection Act, 2019, e-commerce platforms qualify as service providers and can be held accountable where they failed to verify a seller, had inadequate grievance policies, or failed to act on fraud reports.",
      },
    ],
    officialLinks: ["https://www.consumerhelpline.gov.in", "https://edaakhil.nic.in"],
    lastUpdated: "2026-07-01",
  },

  {
    id: "legal-aid-nalsa",
    name: "Free Legal Aid (NALSA)",
    department: "Police & Legal",
    category: "Police & Legal",
    categoryIcon: "⚖",
    overview: "Free legal representation and advice through the National Legal Services Authority (NALSA) and its state/district counterparts, for those who qualify -- covering both civil and criminal matters.",
    eligibility:
      "Automatically eligible categories include women, children, SC/ST members, persons with disabilities, industrial workmen, victims of trafficking/disaster, and those in custody -- others may qualify based on an income ceiling that varies by state.",
    documents: ["Identity proof", "Income certificate, if eligibility is being assessed on income grounds", "Case-related documents"],
    fees: { legalAid: "Free for eligible applicants" },
    processingTime: "Initial consultation can often be arranged within days at your District Legal Services Authority (DLSA)",
    onlineSteps: [
      "Go to nalsa.gov.in or your State Legal Services Authority's website for information and, in some states, online application forms",
      "Some states offer a 'Tele-Law' service for free legal advice over video call, accessible via Common Service Centres",
    ],
    offlineSteps: [
      "Visit your District Legal Services Authority (DLSA) office, typically located at your district court complex",
      "Explain your situation and provide supporting documents to establish eligibility",
      "If eligible, a legal aid counsel is assigned to your case free of cost",
    ],
    commonMistakes: ["Assuming legal aid is only for criminal cases -- it also covers civil matters like family disputes, consumer issues, and labor disputes for eligible applicants"],
    faqs: [
      {
        q: "Who automatically qualifies for free legal aid regardless of income?",
        a: "Women, children, SC/ST community members, persons with disabilities, industrial workmen, victims of trafficking or mass disaster, and persons in custody are automatically eligible under NALSA guidelines, regardless of income.",
      },
    ],
    officialLinks: ["https://nalsa.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "police-verification-tenant",
    name: "Police Verification (Tenant / Domestic Help)",
    department: "Police & Legal",
    category: "Police & Legal",
    categoryIcon: "⚖",
    overview: "Getting police verification done for a tenant or domestic help you're hiring -- a precaution recommended (and in some states legally required) for landlords and employers.",
    eligibility: "Landlords verifying tenants, or households/employers verifying domestic help.",
    documents: ["Tenant's/domestic help's identity proof (Aadhaar, etc.)", "Photograph", "Landlord's/employer's identity proof", "Rental agreement, if applicable"],
    fees: { verification: "Free in most states, though a small fee applies in some" },
    processingTime: "A few days to a few weeks, depending on the local police station's workload",
    onlineSteps: [
      "Many city police departments now offer online tenant/domestic help verification (search '[your city] police tenant verification online')",
      "Fill in the tenant's/domestic help's details and upload their identity documents",
      "Track verification status online; local police may conduct a background check and occasionally a home visit",
    ],
    offlineSteps: ["Visit your local police station with the tenant's/domestic help's details and identity proof to submit a verification request in person"],
    commonMistakes: ["Skipping this step entirely -- in several states it's a legal requirement for landlords, and even where it isn't mandatory, it's a reasonable safety precaution"],
    faqs: [],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "rti-application",
    name: "RTI (Right to Information) Application",
    department: "Police & Legal",
    category: "Police & Legal",
    categoryIcon: "⚖",
    overview: "Filing a Right to Information request to obtain information from a government department -- a powerful tool for getting status updates or explanations when an application, complaint, or service request seems stuck.",
    eligibility: "Any Indian citizen.",
    documents: ["Identity proof (for offline applications; online applications are linked to your registered account)", "A clear, specific description of the information sought"],
    fees: { application: "₹10 for central government RTIs (fee waived for BPL applicants); state government RTI fees vary slightly by state" },
    processingTime: "Public authorities are legally required to respond within 30 days (or 48 hours if the information concerns life or liberty)",
    onlineSteps: [
      "For central government departments, go to rtionline.gov.in, register, and submit your application specifying the department and your question(s)",
      "Pay the ₹10 fee online (waived for BPL category, with proof)",
      "For state government matters, check whether your state has its own RTI online portal, or apply offline to that state department",
      "Track your application status on the portal using your registration number",
    ],
    offlineSteps: [
      "Write your application on plain paper (no specific format is legally required) addressed to the Public Information Officer (PIO) of the relevant department",
      "Submit in person or by post along with the fee (via postal order/demand draft as specified by that department)",
    ],
    commonMistakes: [
      "Being too vague in your question, making it easy for the department to give an unhelpful response -- ask specific, answerable questions",
      "Not knowing you can escalate to the First Appellate Authority within the same department, and then to the Central/State Information Commission, if you get no response or an inadequate one",
    ],
    faqs: [
      {
        q: "What if I don't get a response within 30 days?",
        a: "You can file a First Appeal with the Appellate Authority in the same department, and if still unresolved, a Second Appeal to the Central or State Information Commission -- RTI has a structured escalation process built in.",
      },
    ],
    officialLinks: ["https://rtionline.gov.in"],
    lastUpdated: "2026-06-01",
  },

  // ---- New department: Business & GST ----

  {
    id: "gst-registration",
    name: "GST Registration",
    department: "Business & GST",
    category: "Business & GST",
    categoryIcon: "🏢",
    overview: "Registering for Goods and Services Tax (GST), mandatory once your business turnover crosses the applicable threshold, or if you're engaged in inter-state supply, e-commerce, or other categories requiring compulsory registration regardless of turnover.",
    eligibility: "Businesses crossing the GST turnover threshold (thresholds differ for goods vs. services and vary somewhat by state category), or those otherwise required to register regardless of turnover (inter-state suppliers, e-commerce sellers, casual taxable persons, etc.).",
    documents: ["PAN card of the business/proprietor", "Aadhaar card", "Business address proof", "Bank account details", "Photograph of proprietor/partners", "Business constitution proof (partnership deed, incorporation certificate, etc., as applicable)"],
    fees: { registration: "Free -- no government fee for GST registration itself" },
    processingTime: "Typically 3-7 working days if documents are in order; can take longer if additional verification/clarification is sought",
    onlineSteps: [
      "Go to the GST portal (gst.gov.in) and select 'New Registration' under Services",
      "Fill in business and applicant details, generating a Temporary Reference Number (TRN)",
      "Log back in with the TRN to complete the full application, uploading required documents",
      "Complete Aadhaar authentication (recommended, speeds up processing) or opt for physical verification",
      "Track application status and respond promptly to any query raised by the tax officer",
      "Receive your GSTIN (GST Identification Number) once approved",
    ],
    offlineSteps: ["GST registration is designed as an online-first process; a GST Suvidha Kendra or tax professional can assist if you're not comfortable doing it yourself, though this isn't a separate offline government channel"],
    commonMistakes: [
      "Not completing Aadhaar authentication, which can significantly slow down approval compared to the Aadhaar-authenticated route",
      "Providing an address proof that doesn't clearly establish your place of business, causing officer queries and delays",
      "Confusing GST registration with Udyam (MSME) registration -- these are separate systems for different purposes, though both feed into your compliance profile",
    ],
    faqs: [
      {
        q: "Is GST registration mandatory for every business?",
        a: "No -- it depends on your turnover crossing the applicable threshold (which differs for goods vs services, and by state category), or falling into categories requiring mandatory registration regardless of turnover, like inter-state suppliers or e-commerce operators. Check the current threshold on the GST portal for your specific situation.",
      },
    ],
    officialLinks: ["https://www.gst.gov.in"],
    lastUpdated: "2026-07-01",
  },

  {
    id: "gst-return-filing",
    name: "GST Return Filing",
    department: "Business & GST",
    category: "Business & GST",
    categoryIcon: "🏢",
    overview: "Filing periodic GST returns (GSTR-1 for outward supplies, GSTR-3B for summary/tax payment, and others depending on your registration type) to report your business's sales, purchases, and tax liability.",
    eligibility: "Every GST-registered business/individual, with filing frequency and specific forms depending on your registration category (regular taxpayer, composition scheme, etc.).",
    documents: ["Sales and purchase invoices for the period", "Details of input tax credit claimed", "Previous return filings, for reference"],
    fees: { filing: "Free to file yourself on the GST portal", lateFee: "Applies per day of delay if the due date is missed, capped at a maximum amount depending on the return type and turnover" },
    processingTime: "Filing itself takes from minutes to a few hours depending on transaction volume and whether you use accounting software integration",
    onlineSteps: [
      "Log in to the GST portal (gst.gov.in) with your GSTIN credentials",
      "Select the relevant return (commonly GSTR-1 for outward supplies, then GSTR-3B for the summary return and tax payment) for the filing period",
      "Enter or upload transaction details (many businesses use GST-compliant accounting software that auto-populates this)",
      "Reconcile input tax credit against GSTR-2B (auto-generated from your suppliers' filings)",
      "Pay any tax due and submit -- you'll receive an Acknowledgment Reference Number (ARN)",
    ],
    offlineSteps: ["GST return filing is an online-only process; a tax professional or GST Suvidha Provider (GSP) can assist with preparation, but final filing is always through the portal"],
    commonMistakes: [
      "Missing the due date, which triggers a late fee that accrues daily and can add up meaningfully over time",
      "Not reconciling input tax credit claims against GSTR-2B, which can lead to mismatches and notices",
      "Filing GSTR-1 without matching it to GSTR-3B figures, causing discrepancies that draw scrutiny",
    ],
    faqs: [
      {
        q: "What happens if I miss the GST filing deadline?",
        a: "A late fee accrues per day of delay (amount depends on the specific return and your turnover category), plus interest on any unpaid tax. Consistent non-filing can also affect your ability to claim input tax credit and your GST compliance rating.",
      },
    ],
    officialLinks: ["https://www.gst.gov.in"],
    lastUpdated: "2026-07-01",
  },

  {
    id: "udyam-registration",
    name: "Udyam Registration (MSME)",
    department: "Business & GST",
    category: "Business & GST",
    categoryIcon: "🏢",
    overview:
      "Free, self-declaration-based online registration to formally recognize your business as a Micro, Small, or Medium Enterprise (MSME), unlocking benefits like priority lending, protection against delayed payments, government tender exemptions, and eligibility for various MSME schemes. It replaced the older Udyog Aadhaar system in July 2020.",
    eligibility: "Businesses (manufacturing, services, trading, wholesale/retail) meeting current MSME investment and turnover thresholds for the micro/small/medium category -- check current thresholds on the portal, as they're periodically revised.",
    documents: ["Aadhaar number of the proprietor/authorized signatory (linked to a mobile number for OTP)", "PAN of the business/proprietor", "GSTIN, if your business requires GST registration"],
    fees: { registration: "Free -- the official portal charges nothing; be cautious of third-party sites charging a fee for what's a free government service" },
    processingTime: "Instant -- the Udyam Registration Number (URN) and e-certificate are generated immediately upon successful submission",
    onlineSteps: [
      "Go to udyamregistration.gov.in -- the only official portal; several lookalike/paid third-party sites exist, so verify the URL carefully",
      "Select 'For New Entrepreneurs' and enter your Aadhaar number, validating via OTP",
      "Fill in business details -- PAN and GST details (where applicable) are auto-validated against government records",
      "Submit to receive your Udyam Registration Number and downloadable e-certificate with a QR code instantly",
    ],
    offlineSteps: [],
    commonMistakes: [
      "Paying a third-party website for registration -- the official process is entirely free and takes about 10-15 minutes yourself",
      "Not updating turnover/investment figures annually as required -- missing this update can lead to suspension of your MSME status and associated benefits until it's corrected",
      "Selecting the wrong NIC code for your business activity, which can cause issues with loan applications or scheme eligibility later",
    ],
    faqs: [
      {
        q: "Do I have to pay for Udyam Registration?",
        a: "No -- registration, updates, and downloading your certificate are all completely free on the official portal (udyamregistration.gov.in). Be wary of any site or consultancy charging a fee for basic registration.",
      },
      {
        q: "Is Udyam registration mandatory?",
        a: "It's not legally mandatory to operate a business, but it's effectively essential for accessing MSME-specific government schemes, priority lending, delayed payment protection, and tender exemptions -- most eligible businesses register for these benefits.",
      },
    ],
    officialLinks: ["https://udyamregistration.gov.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "shop-establishment-registration",
    name: "Shop & Establishment Registration",
    department: "Business & GST",
    category: "Business & GST",
    categoryIcon: "🏢",
    overview: "Registering your shop, commercial establishment, or business premises under your state's Shops and Establishments Act -- a basic compliance requirement for most commercial operations, governing things like working hours and employee conditions.",
    eligibility: "Any shop, commercial establishment, or business premises, as defined under the relevant state's Act (specific thresholds and exemptions vary by state).",
    documents: ["Identity and address proof of the proprietor", "Proof of business premises (rental agreement/ownership document)", "PAN card", "Details of employees, if any"],
    fees: { registration: "A nominal fee applies, varies by state and often scales with number of employees" },
    processingTime: "A few days to a couple of weeks, depending on the state's process",
    onlineSteps: [
      "Go to your state's labour department or Shops & Establishments online portal (search '[your state] shops and establishment registration online')",
      "Fill in business and premises details",
      "Upload documents and pay the applicable fee",
      "Download your registration certificate once approved",
    ],
    offlineSteps: ["Visit your local labour department/municipal office if online registration isn't available in your state"],
    commonMistakes: ["Assuming this is optional for small shops -- most states require registration regardless of business size, though specific exemption thresholds do exist in some states"],
    faqs: [],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "import-export-code",
    name: "Import Export Code (IEC)",
    department: "Business & GST",
    category: "Business & GST",
    categoryIcon: "🏢",
    overview: "A 10-digit code issued by the DGFT (Directorate General of Foreign Trade), mandatory for any business or individual engaging in import or export of goods/services from India.",
    eligibility: "Any business entity or individual planning to import or export.",
    documents: ["PAN card of the business/individual", "Aadhaar card", "Bank account details and a canceled cheque/bank certificate", "Business address proof"],
    fees: { application: "₹500 (approximate, confirm current fee on the DGFT portal)" },
    processingTime: "Typically 1-2 working days if documents are in order",
    onlineSteps: [
      "Go to the DGFT portal (dgft.gov.in) and register for an account",
      "Select 'Apply for IEC' under Services, fill in business and bank details",
      "Upload required documents and pay the fee online",
      "Your IEC is typically issued digitally within a couple of working days",
    ],
    offlineSteps: [],
    commonMistakes: ["Not updating/confirming the IEC profile annually -- DGFT requires periodic online confirmation of IEC details, and failing to do so can deactivate the code"],
    faqs: [
      {
        q: "Do I need to renew my IEC?",
        a: "There's no traditional 'renewal', but DGFT requires you to confirm/update your IEC details annually online -- failing to do this can lead to deactivation, so don't ignore reminder notices from DGFT.",
      },
    ],
    officialLinks: ["https://www.dgft.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "startup-india-registration",
    name: "Startup India Registration (DPIIT Recognition)",
    department: "Business & GST",
    category: "Business & GST",
    categoryIcon: "🏢",
    overview: "Getting your startup officially recognized by the DPIIT (Department for Promotion of Industry and Internal Trade) under the Startup India initiative, unlocking benefits like tax exemptions, easier compliance, IPR fast-tracking, and access to the Fund of Funds for startups.",
    eligibility: "Private limited companies, LLPs, or registered partnership firms incorporated within a specified period (commonly up to 10 years), with turnover below a specified threshold, working on innovation/improvement of products, processes, or services (not formed by splitting up an existing business).",
    documents: ["Certificate of incorporation/registration", "PAN of the entity", "Details of directors/partners", "A brief write-up on how your business is innovative and scalable"],
    fees: { registration: "Free" },
    processingTime: "DPIIT recognition typically takes a few days to a few weeks after submission, depending on review",
    onlineSteps: [
      "Go to startupindia.gov.in and register your profile",
      "Fill in the application for DPIIT recognition, describing your business and its innovative aspect",
      "Upload incorporation and supporting documents",
      "Track application status on your dashboard -- recognition certificate is issued digitally once approved",
    ],
    offlineSteps: [],
    commonMistakes: [
      "Submitting a vague description of what makes the business innovative -- be specific about the product/process/service improvement",
      "Applying with a business structure that doesn't meet eligibility (e.g. a sole proprietorship isn't eligible; it must be a private limited company, LLP, or registered partnership)",
    ],
    faqs: [
      {
        q: "What benefits does DPIIT recognition actually give me?",
        a: "Recognized startups can access income tax exemption for 3 consecutive years (subject to conditions), self-certification for certain labour/environmental laws, easier public procurement norms, fast-tracked patent examination at reduced fees, and eligibility to apply for the government's Fund of Funds for Startups.",
      },
    ],
    officialLinks: ["https://www.startupindia.gov.in"],
    lastUpdated: "2026-06-01",
  },

  // ---- New department: Farmers ----

  {
    id: "kisan-credit-card",
    name: "Kisan Credit Card (KCC)",
    department: "Farmers",
    category: "Farmers",
    categoryIcon: "🌾",
    overview:
      "A revolving credit facility for farmers covering crop production, post-harvest expenses, and allied activities (dairy, poultry, fisheries), at concessional interest rates. Under the Modified Interest Subvention Scheme, loans up to ₹5 lakh (raised from ₹3 lakh in Budget 2025-26) carry a 7% interest rate, reduced to an effective 4% for farmers who repay on time (via a 3% Prompt Repayment Incentive).",
    eligibility: "Owner cultivators, tenant farmers, sharecroppers, and those engaged in allied activities like dairy, poultry, sheep/goat rearing, and fisheries.",
    documents: ["Aadhaar card and PAN", "Land ownership/cultivation proof (or lease/tenancy documents for tenant farmers)", "Passport-size photograph", "Bank account details"],
    fees: {
      interestRate: "7% per annum on loans up to ₹5 lakh, effectively 4% with the 3% Prompt Repayment Incentive for timely repayment",
      collateral: "Loans up to ₹2 lakh are collateral-free (up to ₹3 lakh in certain tie-up arrangements with crop/stock as security)",
    },
    processingTime: "A few days to a couple of weeks, depending on the bank and documentation",
    onlineSteps: [
      "PM Kisan beneficiaries can apply via a simplified KCC form available on pmkisan.gov.in",
      "Otherwise, apply through your bank's website/app if they offer digital KCC applications, or via the Kisan Rin Portal used to track KCC loans",
      "Upload land and identity documents and submit",
    ],
    offlineSteps: [
      "Visit your nearest bank branch (most nationalized banks, RRBs, and cooperative banks issue KCC) with land and identity documents",
      "Fill the KCC application form and submit for processing",
    ],
    commonMistakes: [
      "Not repaying on time, which forfeits the 3% Prompt Repayment Incentive, meaning you pay the full 7% instead of the effective 4%",
      "Not realizing KCC cardholders also get accidental death/disability insurance coverage (up to ₹50,000) bundled with the scheme -- check with your bank on claiming this if needed",
    ],
    faqs: [
      {
        q: "What's the actual interest rate I'll pay?",
        a: "The base rate is 7% per annum on loans up to ₹5 lakh, but if you repay on time, a 3% Prompt Repayment Incentive brings your effective rate down to 4% per annum -- one of the lowest institutional farm lending rates available.",
      },
      {
        q: "Do I need collateral for a KCC loan?",
        a: "No collateral is required for loans up to ₹2 lakh (up to ₹3 lakh in some tie-up arrangements using crop/stock as security) -- beyond that, collateral requirements depend on your bank's policy.",
      },
    ],
    officialLinks: ["https://pmkisan.gov.in", "https://www.kisanrin.gov.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "pmfby-crop-insurance",
    name: "Crop Insurance (PMFBY)",
    department: "Farmers",
    category: "Farmers",
    categoryIcon: "🌾",
    overview:
      "Pradhan Mantri Fasal Bima Yojana provides crop insurance at heavily subsidized premiums -- farmers pay only 2% of sum insured for Kharif crops, 1.5% for Rabi crops, and 5% for commercial/horticulture crops, with the government subsidizing the remaining actuarial premium. Enrollment has been voluntary for all farmers, including loanee farmers, since Kharif 2020.",
    eligibility: "Any farmer cultivating a notified crop in a notified area/season, as declared in your state's official PMFBY notification -- both the crop and village must be on that list. Tenant farmers and sharecroppers are eligible with a valid land lease/consent document.",
    documents: ["Aadhaar card (mandatory e-KYC)", "Land records or, for tenant farmers, a Land Lease Agreement/Consent Certificate from the landowner", "Bank account details", "Sowing declaration"],
    fees: {
      kharifPremium: "2% of sum insured",
      rabiPremium: "1.5% of sum insured",
      commercialHorticulturePremium: "5% of sum insured",
      note: "Loanee farmers with an active KCC/crop loan are typically auto-enrolled with premium deducted from their loan account, unless they opt out in writing before the cut-off",
    },
    processingTime: "Enrollment before the seasonal cut-off (commonly around 31 July for Kharif, 31 December for Rabi, though exact dates are announced each season) is essential; claims must be reported within 72 hours of crop damage",
    onlineSteps: [
      "Go to pmfby.gov.in (National Crop Insurance Portal) and use 'Farmer Corner - Apply for Crop Insurance by Yourself'",
      "Select 'Guest Farmer' if registering for the first time, complete Aadhaar e-KYC (mandatory), and fill in land, crop, and bank details",
      "Loanee farmers are typically auto-enrolled by their bank -- verify this shows on your passbook as 'Fasal Bima Premium Deducted', and check status via 'Know Your Application Status' on the portal",
      "In case of crop damage, report within 72 hours by calling the helpline (14447) or via the insurance company's app -- don't wait for the season to end",
    ],
    offlineSteps: ["Apply at your bank branch or nearest Common Service Centre (CSC) if you prefer not to self-register online"],
    commonMistakes: [
      "Missing the 72-hour damage reporting window -- this is strict, and late reporting can jeopardize your claim",
      "Missing the seasonal enrollment cut-off date -- non-loanee farmers especially need to actively register before the deadline, unlike loanee farmers who are auto-enrolled",
      "Not confirming both your crop and village are on that season's official notified list -- coverage only applies to notified crop-area combinations",
    ],
    faqs: [
      {
        q: "I have a KCC loan -- am I automatically covered?",
        a: "Yes, loanee farmers with an active KCC or crop loan are mandatorily enrolled by their bank, with premium auto-deducted from the loan account -- check your passbook for the deduction entry. You can opt out in writing before the seasonal cut-off if you don't want coverage.",
      },
      {
        q: "How quickly do I need to report crop damage to claim?",
        a: "Within 72 hours of the damage event -- call the helpline 14447 or report through the insurance company's app promptly; delayed reporting can affect your claim.",
      },
    ],
    officialLinks: ["https://pmfby.gov.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "soil-health-card",
    name: "Soil Health Card",
    department: "Farmers",
    category: "Farmers",
    categoryIcon: "🌾",
    overview: "A free scheme providing farmers with a report on their soil's nutrient status and specific fertilizer/crop recommendations, helping optimize fertilizer use and improve yield.",
    eligibility: "Any farmer with agricultural land.",
    documents: ["Land details (survey number/khata)", "Aadhaar card"],
    fees: { testing: "Free" },
    processingTime: "Soil sample collection to card issuance typically takes a few weeks, as it involves lab testing",
    onlineSteps: [
      "Check your Soil Health Card status or apply for testing via soilhealth.dac.gov.in",
      "Sample collection itself is done in person (see below) -- the portal is mainly for checking status and viewing/downloading your card once ready",
    ],
    offlineSteps: [
      "Contact your local Agriculture Department office or Krishi Vigyan Kendra to have a soil sample collected from your field",
      "Samples are sent to a soil testing lab; results and recommendations are compiled into your Soil Health Card",
      "Collect your card from the local agriculture office, or download it online once available",
    ],
    commonMistakes: ["Not following the recommended fertilizer guidance on the card -- the whole point is to correct over/under-use of specific nutrients based on your actual soil test results, not just to have the document"],
    faqs: [],
    officialLinks: ["https://soilhealth.dac.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "e-nam-agriculture-market",
    name: "e-NAM (National Agriculture Market)",
    department: "Farmers",
    category: "Farmers",
    categoryIcon: "🌾",
    overview: "An online trading platform connecting agricultural markets (mandis) across India, letting farmers get price discovery and sell produce to buyers beyond their local mandi, aiming for better prices through wider competition.",
    eligibility: "Any farmer, trader, or buyer registered with a participating e-NAM mandi.",
    documents: ["Aadhaar card", "Bank account details", "Land/farmer proof, for farmer registration"],
    fees: { registration: "Free" },
    processingTime: "Registration is typically quick; actual trading depends on market activity at your local participating mandi",
    onlineSteps: [
      "Go to enam.gov.in and register as a farmer",
      "Complete your profile with Aadhaar and bank details",
      "Once registered, you (or through your local mandi) can list produce for e-auction and view price trends across participating mandis",
    ],
    offlineSteps: ["Visit your local participating mandi's e-NAM help desk to register and get assistance with online trading"],
    commonMistakes: ["Not comparing prices across multiple participating mandis before committing to sell at your nearest one, missing out on the platform's core benefit of wider price discovery"],
    faqs: [],
    officialLinks: ["https://www.enam.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "pm-kusum-solar",
    name: "PM-KUSUM (Farmer Solar Scheme)",
    department: "Farmers",
    category: "Farmers",
    categoryIcon: "🌾",
    overview: "A scheme supporting farmers in installing solar pumps and setting up solar power plants on barren/agricultural land, reducing diesel dependency for irrigation and providing an additional income stream by selling surplus power back to the grid.",
    eligibility: "Individual farmers, farmer groups, cooperatives, or panchayats -- specific components (standalone solar pumps vs. grid-connected solar plants) have different eligibility details.",
    documents: ["Land ownership/lease documents", "Aadhaar card", "Bank account details", "Existing electricity connection details, if replacing a grid-based pump"],
    fees: { subsidy: "Central and state governments together typically subsidize a significant portion of the cost (commonly 60%+ combined, varying by component and state), with the farmer contributing the balance, sometimes partly through a bank loan" },
    processingTime: "Application review and installation can take a few months, subject to state-level implementation agency processing and site approval",
    onlineSteps: [
      "Check your state's specific PM-KUSUM implementation portal (state renewable energy agencies typically run this -- search '[your state] PM-KUSUM portal')",
      "Apply with land and identity documents, selecting the relevant component (solar pump or grid-connected plant)",
      "Pay your contribution share once approved, and coordinate installation with the empanelled vendor assigned",
    ],
    offlineSteps: ["Contact your state's renewable energy development agency or local agriculture department office for application assistance"],
    commonMistakes: ["Not checking your state's specific subsidy share and application window -- implementation details and funding availability vary by state and by year"],
    faqs: [],
    officialLinks: ["https://pmkusum.mnre.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "kisan-call-centre",
    name: "Kisan Call Centre (Agriculture Helpline)",
    department: "Farmers",
    category: "Farmers",
    categoryIcon: "🌾",
    overview: "A toll-free helpline where farmers can get expert agricultural advice -- crop management, pest control, government scheme queries -- in their local language, from agriculture experts.",
    eligibility: "Any farmer.",
    documents: [],
    fees: { call: "Free (toll-free)" },
    processingTime: "Immediate -- live call center support",
    onlineSteps: ["Call the toll-free Kisan Call Centre number 1800-180-1551 from anywhere in India"],
    offlineSteps: [],
    commonMistakes: ["Not using this free resource when facing an urgent crop/pest issue -- experts can often give same-call guidance rather than needing to wait for an in-person visit"],
    faqs: [],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  // ---- New department: Senior Citizens ----

  {
    id: "senior-citizen-pension",
    name: "Old Age Pension (NSAP / IGNOAPS)",
    department: "Senior Citizens",
    category: "Senior Citizens",
    categoryIcon: "👵",
    overview: "A monthly pension for elderly citizens below the poverty line, provided under the Indira Gandhi National Old Age Pension Scheme (IGNOAPS), part of the National Social Assistance Programme (NSAP) -- states often top up the central contribution, so actual pension amounts vary by state.",
    eligibility: "Indian citizens aged 60 and above, belonging to a BPL (Below Poverty Line) household as per state records.",
    documents: ["Age proof (Aadhaar, voter ID, etc.)", "BPL certificate/ration card", "Bank account details", "Address proof"],
    fees: { application: "Free" },
    processingTime: "A few weeks to a couple of months, depending on state verification processes",
    onlineSteps: [
      "Check your state's specific social welfare/NSAP portal (search '[your state] old age pension online application')",
      "Fill in the application with BPL and age proof",
      "Track application status on the same portal",
    ],
    offlineSteps: ["Visit your local Gram Panchayat, municipal ward office, or Social Welfare Department office to apply with supporting documents"],
    commonMistakes: ["Not having an updated BPL certificate/ration card, which is central to establishing eligibility", "Bank account not linked properly for DBT, delaying pension disbursal even after approval"],
    faqs: [
      {
        q: "How much is the pension amount?",
        a: "The central government contributes a base amount, but most states add a top-up, so the actual monthly pension varies significantly by state -- check your specific state's social welfare department for the current combined amount.",
      },
    ],
    officialLinks: ["https://nsap.nic.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "jeevan-pramaan-life-certificate",
    name: "Digital Life Certificate (Jeevan Pramaan)",
    department: "Senior Citizens",
    category: "Senior Citizens",
    categoryIcon: "👵",
    overview:
      "An Aadhaar-based biometric digital certificate that pensioners must submit annually to their pension disbursing agency to confirm they're still alive and continue receiving their pension -- Jeevan Pramaan lets you do this from home instead of visiting the pension office in person.",
    eligibility: "Any pensioner (central government, state government, EPFO, defence, or other pension schemes onboarded to the Jeevan Pramaan system) who isn't re-employed or remarried in a way requiring manual verification instead.",
    documents: ["Aadhaar number (linked to mobile)", "Pension Payment Order (PPO) number", "Pension account and bank details"],
    fees: { submission: "Free (a CSC may charge a small fee, commonly around ₹100, for a home-visit biometric capture if you're unable to travel)" },
    processingTime: "Instant once biometric authentication succeeds; the certificate is valid for one year from generation",
    onlineSteps: [
      "Download the Jeevan Pramaan app or visit jeevanpramaan.gov.in",
      "Register with your Aadhaar number, PPO number, and pension details",
      "Complete biometric authentication (fingerprint, iris, or face) using a compatible device -- many people now use their own phone's face authentication, or a biometric device at a CSC/bank",
      "Once approved, your Digital Life Certificate is stored in the central repository and automatically sent to your pension disbursing agency -- you don't need to separately submit it to your bank",
    ],
    offlineSteps: [
      "Visit a bank branch, post office, CSC, or dedicated Jeevan Pramaan Centre with biometric capture facilities",
      "For bedridden seniors, ask your bank about doorstep banking services (available from most public-sector banks for those above 70) or request a CSC home visit",
    ],
    commonMistakes: [
      "Missing the submission window -- this is commonly the pensioner's birth month for central government pensions, or November for many other schemes, though exact rules vary by pension category -- check your specific PPO or scheme rules",
      "Assuming someone else can submit on your behalf using your biometrics -- this is authentication fraud and is not permitted; only the pensioner can complete this themselves",
      "Forgetting a fresh DLC is needed every year -- last year's certificate doesn't roll over",
    ],
    faqs: [
      {
        q: "Do I need to separately give a copy to my bank?",
        a: "No -- once your Digital Life Certificate is generated and approved, it's automatically sent to your registered pension disbursing agency. You don't need to submit anything separately to your bank or post office.",
      },
      {
        q: "What if I'm bedridden and can't travel?",
        a: "Ask your bank about doorstep banking services (available from most public-sector banks for seniors above 70), or request a CSC agent to visit your home with a portable biometric device, often for a small additional fee.",
      },
    ],
    officialLinks: ["https://jeevanpramaan.gov.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "senior-citizen-savings-scheme",
    name: "Senior Citizen Savings Scheme (SCSS)",
    department: "Senior Citizens",
    category: "Senior Citizens",
    categoryIcon: "👵",
    overview: "A government-backed savings scheme offering a higher, quarterly-reviewed interest rate specifically for senior citizens, available at post offices and authorized banks, with quarterly interest payout.",
    eligibility: "Individuals aged 60 and above; those aged 55-60 who've taken voluntary retirement can also invest, subject to specific conditions (investing within a month of receiving retirement funds).",
    documents: ["Age proof", "Aadhaar and PAN card", "Address proof", "Retirement proof, if investing under the 55-60 VRS category"],
    fees: { minimumDeposit: "₹1,000", maximumDeposit: "₹30 lakh (per individual, across accounts)" },
    processingTime: "Same-day account opening at a post office or bank branch",
    onlineSteps: ["Some banks allow opening an SCSS account via net banking/app if you're an existing customer -- check your bank's offerings", "Otherwise, download the SCSS application form from India Post or your bank's website to fill in advance before an in-person visit"],
    offlineSteps: [
      "Visit a post office or authorized bank branch with your age proof and identity documents",
      "Fill the account opening form and make your deposit",
      "The account has a 5-year tenure, extendable once by 3 more years",
    ],
    commonMistakes: ["Withdrawing prematurely without checking the penalty -- early withdrawal before 1 year forfeits any interest paid, and reduces the payout for withdrawals between 1-2 years"],
    faqs: [
      {
        q: "What's the current interest rate?",
        a: "SCSS interest rates are reviewed and notified quarterly by the government, similar to other small savings schemes -- check the current rate on India Post's website or your bank, as it changes over time.",
      },
    ],
    officialLinks: ["https://www.indiapost.gov.in"],
    lastUpdated: "2026-07-01",
  },

  {
    id: "rashtriya-vayoshri-yojana",
    name: "Rashtriya Vayoshri Yojana (Free Aids & Assistive Devices)",
    department: "Senior Citizens",
    category: "Senior Citizens",
    categoryIcon: "👵",
    overview:
      "A scheme providing free assistive devices -- walking sticks, hearing aids, wheelchairs, spectacles, artificial dentures, and similar aids -- to senior citizens from economically weaker sections, distributed through camps organized by ALIMCO (Artificial Limbs Manufacturing Corporation of India). It's administered through the same ARJUN portal used for the disability aids scheme (ADIP), since both fall under the Ministry of Social Justice & Empowerment.",
    eligibility: "Senior citizens (60+) with monthly income from all sources not exceeding a specified threshold (check the current limit on the ARJUN portal, as income ceilings are periodically revised), with an age-related physical impairment assessed at a distribution camp.",
    documents: ["Age proof", "Income proof/certificate", "Aadhaar card"],
    fees: { devices: "Free" },
    processingTime: "Devices are typically assessed and distributed on the same day at organized camps, once your camp application is approved",
    onlineSteps: [
      "Check eligibility and apply/register via the ARJUN portal (adip.depwd.gov.in), which handles both the disability aids scheme (ADIP) and this senior citizens' scheme (RVY)",
      "Look for upcoming distribution camp announcements in your district via the portal or your district Social Welfare Department",
    ],
    offlineSteps: [
      "Attend an organized distribution camp in your district with age, income, and identity proof",
      "A medical assessment at the camp determines which assistive device(s) you're eligible for",
      "Receive the device(s) free of cost at the same camp",
    ],
    commonMistakes: [
      "Looking for this under an older/incorrect name ('Vayoshreshtha Yojana' is a separate national recognition award, not this aids-distribution scheme) -- the correct scheme name is Rashtriya Vayoshri Yojana (RVY)",
      "Missing camp announcements -- these aren't continuously available like an online application; check the ARJUN portal or your local Social Welfare Department periodically for scheduled camps",
    ],
    faqs: [
      {
        q: "Is this the same as 'Vayoshreshtha Samman'?",
        a: "No -- Vayoshreshtha Samman is a separate annual national awards scheme honoring eminent senior citizens and institutions, unrelated to this free assistive-devices program. This scheme is called Rashtriya Vayoshri Yojana (RVY).",
      },
    ],
    officialLinks: ["https://adip.depwd.gov.in", "https://www.alimco.in"],
    lastUpdated: "2026-08-11",
  },

  {
    id: "elderline-helpline",
    name: "Elder Helpline (Elderline 14567)",
    department: "Senior Citizens",
    category: "Senior Citizens",
    categoryIcon: "👵",
    overview: "A national toll-free helpline for senior citizens offering information, guidance, emotional support, and field-level intervention (in cases of abuse or distress), operated under the Ministry of Social Justice and Empowerment.",
    eligibility: "Any senior citizen (or someone calling on behalf of one) needing information, guidance, or help with elder abuse/distress situations.",
    documents: [],
    fees: { call: "Free (toll-free)" },
    processingTime: "Immediate -- live helpline support, with field visits arranged for distress cases as needed",
    onlineSteps: ["Call the toll-free number 14567 from anywhere in India"],
    offlineSteps: [],
    commonMistakes: ["Not using this resource for elder abuse concerns -- the helpline can arrange field-level intervention, not just provide information over the phone"],
    faqs: [],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "senior-citizen-legal-protection",
    name: "Legal Protection for Senior Citizens (Maintenance Tribunal)",
    department: "Senior Citizens",
    category: "Senior Citizens",
    categoryIcon: "👵",
    overview: "Legal recourse under the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, letting parents/senior citizens claim maintenance from children/relatives, and providing a simplified tribunal process (rather than a lengthy civil court case) for enforcement, including possible eviction of children who fail to maintain elderly parents from a property owned by the parent.",
    eligibility: "Parents or senior citizens (60+) unable to maintain themselves from their own income/property, seeking maintenance from children or relatives who would inherit their property.",
    documents: ["Age proof", "Proof of relationship with the respondent (child/relative)", "Proof of inability to self-maintain", "Property documents, if eviction is also being sought"],
    fees: { tribunalApplication: "Minimal or no fee -- designed to be an accessible, low-cost process" },
    processingTime: "The Act mandates tribunals dispose of applications within 90 days, extendable by a further 30 days in exceptional cases",
    onlineSteps: ["Some states offer online grievance registration for elder maintenance cases via their Social Welfare Department portal"],
    offlineSteps: [
      "File an application with the Maintenance Tribunal set up under the Act in your district (typically headed by the Sub-Divisional Magistrate)",
      "Present your case -- the process is designed to be simpler and faster than regular civil court proceedings",
      "The tribunal can order monthly maintenance and, in relevant cases, eviction of children/relatives who fail to maintain the parent from property owned by the parent",
    ],
    commonMistakes: ["Not knowing this simplified, faster tribunal route exists and instead pursuing a lengthy regular civil suit for the same matter"],
    faqs: [
      {
        q: "Can a senior citizen get their child evicted from their own property under this Act?",
        a: "Yes -- in relevant cases, where a child fails to maintain a parent and is residing in property owned by that parent, the Maintenance Tribunal can order eviction as part of enforcing the parent's right to maintenance, though this depends on specific case facts.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "senior-citizen-concessions-overview",
    name: "Senior Citizen Concessions -- What's Actually Active",
    department: "Senior Citizens",
    category: "Senior Citizens",
    categoryIcon: "👵",
    overview:
      "A quick reality check on which senior citizen concessions are currently active versus commonly misunderstood as available. The general railway fare concession (40% for men 60+, 50% for women 58+) has been suspended since March 2020 and, as of a Parliament response in early 2026, the Railway Ministry has stated it has no confirmed plans to restore it -- despite periodic media speculation ahead of each Union Budget. Other benefits do remain active.",
    eligibility: "Senior citizens (age thresholds vary by specific benefit).",
    documents: [],
    fees: {},
    processingTime: "Not applicable -- this is a reference/awareness entry, not an application",
    onlineSteps: [],
    offlineSteps: [],
    commonMistakes: [
      "Assuming railway fare concessions are available based on older information or budget speculation articles -- as of the most recent confirmation, they remain suspended for the general senior citizen category",
      "Not claiming benefits that ARE still active: automatic lower berth allocation priority on trains, higher fixed deposit interest rates at most banks, a higher income tax exemption threshold, and (in many states) local bus fare concessions, which vary by state transport corporation",
    ],
    faqs: [
      {
        q: "Is the railway senior citizen discount coming back?",
        a: "As of early 2026, the Railway Ministry told Parliament it has no confirmed plans to restore the general senior citizen concession, despite ongoing public demand and periodic pre-Budget speculation. Don't rely on articles suggesting it's confirmed to return -- check IRCTC/Indian Railways' official announcements before assuming otherwise.",
      },
      {
        q: "What senior citizen travel benefits ARE still active on trains?",
        a: "Automatic priority for lower berth allocation remains in place, along with station assistance for those needing it -- the fare discount specifically is what's suspended, not all senior-related provisions.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-08-01",
  },

  // ---- New department: Women & Child Welfare ----

  {
    id: "pm-matru-vandana-yojana",
    name: "Maternity Benefit (PM Matru Vandana Yojana)",
    department: "Women & Child Welfare",
    category: "Women & Child Welfare",
    categoryIcon: "👩",
    overview:
      "A cash incentive scheme for pregnant and lactating mothers -- ₹5,000 for the first living child (paid in installments tied to pregnancy registration, birth registration, and first vaccination), plus an additional ₹6,000 (under Mission Shakti) if the second child is a girl, bringing total possible benefit to ₹11,000 across both. This helps offset wage loss around childbirth and encourages timely health checkups.",
    eligibility: "Pregnant and lactating women aged 19 or above, for their first living child, and additionally for a second child if it's a girl. Women employed by central/state government or PSUs in regular positions (already receiving paid maternity leave) are generally not eligible.",
    documents: ["Aadhaar card", "Bank account linked to Aadhaar", "Pregnancy registration proof (Mother and Child Protection card)", "Child's birth certificate (for later installments)"],
    fees: { registration: "Free" },
    processingTime: "First installment (₹3,000) within about 30 days of registration and first ANC checkup; second installment (₹2,000) within 30 days of birth registration and first immunization round; the ₹6,000 for a second girl child is paid as a single installment after her birth and vaccination",
    onlineSteps: [
      "Registration is primarily done at your local Anganwadi Centre, but you can track status via pmmvy.wcd.gov.in or the PMMVY-CAS portal",
      "Register your pregnancy (Form 1A) within 150 days of your last menstrual period to remain eligible for the first installment -- this deadline matters",
      "After birth, submit birth registration and immunization proof (Form 1B and 1C) through the Anganwadi worker to trigger subsequent installments",
    ],
    offlineSteps: [
      "Visit your nearest Anganwadi Centre -- an Anganwadi Worker (AWW) or ASHA worker will guide you through registration and installment claims",
    ],
    commonMistakes: [
      "Registering pregnancy too late -- missing the 150-day window from your last menstrual period forfeits eligibility for the first installment",
      "Not realizing the second-child benefit only applies if that second child is a girl -- it doesn't apply for a second boy",
    ],
    faqs: [
      {
        q: "How much can I actually get in total?",
        a: "Up to ₹11,000 total: ₹5,000 for your first child (in two installments), plus an additional ₹6,000 (Mission Shakti) if your second child is a girl. This is separate from Janani Suraksha Yojana (JSY) institutional delivery cash assistance, which can be claimed alongside PMMVY.",
      },
    ],
    officialLinks: ["https://pmmvy.wcd.gov.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "women-helpline-181",
    name: "Women Helpline (181) / Domestic Violence Support",
    department: "Women & Child Welfare",
    category: "Women & Child Welfare",
    categoryIcon: "👩",
    overview: "A 24x7 national emergency helpline for women in distress -- domestic violence, harassment, or any situation requiring immediate support -- connecting callers to police, medical, legal, and counselling assistance as needed.",
    eligibility: "Any woman in distress, or someone calling on her behalf.",
    documents: [],
    fees: { call: "Free (toll-free)" },
    processingTime: "Immediate -- 24x7 live helpline, with emergency response coordination as needed",
    onlineSteps: ["Call 181 from anywhere in India, 24x7"],
    offlineSteps: ["In an immediate emergency, also call 100/112 for police response alongside or instead of 181"],
    commonMistakes: ["Hesitating to call due to fear or stigma -- the helpline is confidential and designed specifically to connect you with the support you need, including safe shelter referrals if required"],
    faqs: [],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "one-stop-centre-sakhi",
    name: "One Stop Centre (Sakhi) for Women in Distress",
    department: "Women & Child Welfare",
    category: "Women & Child Welfare",
    categoryIcon: "👩",
    overview: "Physical centres (also called Sakhi Centres) providing integrated support to women affected by violence -- medical aid, police assistance, legal aid, psychosocial counselling, and temporary shelter -- all under one roof, reducing the need to navigate multiple separate offices during a crisis.",
    eligibility: "Any woman affected by violence (domestic, sexual, or any form of abuse), regardless of caste, class, religion, or marital status.",
    documents: ["None required to access initial support -- documentation may follow depending on what legal/medical process is pursued"],
    fees: { services: "Free" },
    processingTime: "Immediate walk-in support; ongoing case support continues as needed",
    onlineSteps: ["Locate your nearest One Stop Centre via your state Women & Child Development Department's website, or call 181 for guidance to the nearest centre"],
    offlineSteps: ["Walk in directly to your district's One Stop Centre (most districts have one, often located at or near the district hospital) for immediate support"],
    commonMistakes: ["Not knowing this integrated option exists and instead trying to separately coordinate police, medical, and legal help on your own during a crisis"],
    faqs: [],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "anganwadi-icds-services",
    name: "Anganwadi / Child Nutrition Services (ICDS)",
    department: "Women & Child Welfare",
    category: "Women & Child Welfare",
    categoryIcon: "👩",
    overview: "Anganwadi Centres, under the Integrated Child Development Services (ICDS) scheme (now largely operating as Saksham Anganwadi), provide supplementary nutrition, health checkups, immunization referrals, and early childhood education for children under 6, plus nutrition support for pregnant/lactating mothers.",
    eligibility: "Children under 6 years, and pregnant/lactating women in the Anganwadi's coverage area.",
    documents: ["Aadhaar card of mother/child", "Address proof"],
    fees: { services: "Free" },
    processingTime: "Registration at your local Anganwadi is typically immediate",
    onlineSteps: ["Check services and track child growth/nutrition data via the Poshan Tracker app, used by Anganwadi Workers to record and monitor beneficiaries"],
    offlineSteps: [
      "Visit your local Anganwadi Centre to register your child or yourself (if pregnant/lactating)",
      "Access daily supplementary nutrition, regular health/growth monitoring, and pre-school activities for children",
    ],
    commonMistakes: ["Not utilizing the centre regularly -- growth monitoring and nutrition support work best with consistent attendance, not just one-time registration"],
    faqs: [],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "posh-workplace-complaint",
    name: "POSH Workplace Harassment Complaint",
    department: "Women & Child Welfare",
    category: "Women & Child Welfare",
    categoryIcon: "👩",
    overview: "Filing a workplace sexual harassment complaint under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 -- every workplace with 10+ employees is legally required to have an Internal Complaints Committee (ICC) to handle such complaints.",
    eligibility: "Any woman employee (including contract, temporary, and probationary staff) facing workplace sexual harassment.",
    documents: ["Written complaint describing the incident(s), dates, and any evidence/witnesses", "Identity proof"],
    fees: { complaint: "Free" },
    processingTime: "The ICC is required to complete inquiry within 90 days of the complaint",
    onlineSteps: ["Some larger organizations now offer an online/portal-based complaint submission to their ICC -- check your organization's POSH policy for the specific process"],
    offlineSteps: [
      "Submit a written complaint to your organization's Internal Complaints Committee (ICC) within 3 months of the incident (extendable in certain circumstances)",
      "If your workplace has fewer than 10 employees or the complaint is against the employer themselves, approach the Local Complaints Committee (LCC) set up at the district level instead",
    ],
    commonMistakes: [
      "Not knowing every organization with 10+ employees is legally required to have an ICC -- if yours doesn't, that's itself a compliance failure you can raise, and you can approach the district's LCC instead",
      "Delaying the complaint significantly beyond the 3-month window without a valid reason recognized by the Act, which can complicate the process",
    ],
    faqs: [
      {
        q: "What if my workplace doesn't have an Internal Complaints Committee?",
        a: "Every workplace with 10 or more employees is legally required to have one under the POSH Act. If yours doesn't, you can file your complaint with the Local Complaints Committee (LCC) constituted at the district level instead.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "widow-pension",
    name: "Widow Pension Scheme (NSAP)",
    department: "Women & Child Welfare",
    category: "Women & Child Welfare",
    categoryIcon: "👩",
    overview: "A monthly pension for widows from BPL households, provided under the Indira Gandhi National Widow Pension Scheme (part of NSAP) -- states typically add a top-up to the central contribution.",
    eligibility: "Widows aged 40-79 from BPL households (widows 80+ typically transition to the old age pension scheme instead, check your state's specific rule).",
    documents: ["Husband's death certificate", "Age proof", "BPL certificate/ration card", "Bank account details"],
    fees: { application: "Free" },
    processingTime: "A few weeks to a couple of months, depending on state verification",
    onlineSteps: ["Check your state's social welfare/NSAP portal (search '[your state] widow pension online application')"],
    offlineSteps: ["Visit your local Gram Panchayat, municipal ward office, or Social Welfare Department office with your husband's death certificate and BPL proof"],
    commonMistakes: ["Not transitioning correctly to the old-age pension scheme upon reaching the relevant age threshold in states where the widow pension scheme has an upper age limit"],
    faqs: [],
    officialLinks: ["https://nsap.nic.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "child-helpline-1098",
    name: "Child Helpline (1098 / CHILDLINE)",
    department: "Women & Child Welfare",
    category: "Women & Child Welfare",
    categoryIcon: "👩",
    overview: "A 24x7 national emergency helpline for children in need of care and protection -- abuse, abandonment, child labour, or any situation of distress -- connecting them to appropriate intervention and support services.",
    eligibility: "Any child in distress, or anyone reporting on behalf of a child.",
    documents: [],
    fees: { call: "Free (toll-free)" },
    processingTime: "Immediate -- 24x7 live helpline with field-level intervention as needed",
    onlineSteps: ["Call 1098 from anywhere in India, 24x7"],
    offlineSteps: [],
    commonMistakes: ["Hesitating to report suspected child abuse/exploitation out of uncertainty -- the helpline is set up to assess and respond appropriately, so reporting a genuine concern is always worthwhile even if you're unsure of all the details"],
    faqs: [],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  // ---- New department: Postal Services ----

  {
    id: "speed-post-tracking",
    name: "Speed Post & Parcel Tracking",
    department: "Postal Services",
    category: "Postal Services",
    categoryIcon: "📮",
    overview: "Sending and tracking Speed Post (India Post's expedited mail/parcel service) shipments, along with other India Post parcel and registered mail tracking.",
    eligibility: "Anyone sending or receiving mail/parcels via India Post.",
    documents: ["Recipient's complete address", "Content details (for parcels, per customs/content declaration rules where applicable)"],
    fees: { speedPost: "Based on weight and distance/zone -- check current rates on the India Post website" },
    processingTime: "Delivery timelines vary by distance and destination -- domestic Speed Post commonly delivers within 1-3 days for major routes",
    onlineSteps: [
      "Book Speed Post at your local post office counter (booking itself isn't typically done online for individuals, though bulk/business accounts have separate arrangements)",
      "Track any consignment using its tracking number at indiapost.gov.in under 'Track Consignment'",
    ],
    offlineSteps: ["Visit your local post office to book Speed Post or registered mail with the item and recipient details"],
    commonMistakes: ["Losing the tracking receipt/number -- keep it until delivery is confirmed, since it's needed for any tracking or complaint"],
    faqs: [],
    officialLinks: ["https://www.indiapost.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "post-office-savings-schemes",
    name: "Post Office Savings Schemes (RD, PPF, NSC, KVP)",
    department: "Postal Services",
    category: "Postal Services",
    categoryIcon: "📮",
    overview: "India Post offers a range of government-backed small savings schemes -- Recurring Deposit (RD), Public Provident Fund (PPF), National Savings Certificate (NSC), Kisan Vikas Patra (KVP), and more -- often with better guaranteed returns than typical bank savings accounts.",
    eligibility: "Any Indian resident; specific schemes may have their own minimum age or other conditions.",
    documents: ["Aadhaar card", "PAN card", "Address proof", "Passport-size photograph"],
    fees: { accountOpening: "Varies by scheme -- minimum deposit amounts range from a small amount for RD to specific minimums for PPF/NSC/KVP" },
    processingTime: "Same-day account opening at a post office",
    onlineSteps: ["India Post's DOP (Department of Posts) internet banking, where available, lets existing account holders manage deposits and view balances online"],
    offlineSteps: [
      "Visit your local post office with identity/address proof",
      "Choose the scheme that fits your goal (RD for regular monthly savings, PPF for long-term tax-advantaged savings, NSC/KVP for fixed-term certificates)",
      "Fill the account opening form and make your initial deposit",
    ],
    commonMistakes: ["Not comparing the specific scheme's lock-in period and premature withdrawal rules against your actual financial timeline before committing funds"],
    faqs: [
      {
        q: "How is interest on these schemes decided?",
        a: "Interest rates for small savings schemes (PPF, NSC, KVP, RD, etc.) are reviewed and notified quarterly by the government -- check India Post's current rate table before opening an account, since rates do change over time.",
      },
    ],
    officialLinks: ["https://www.indiapost.gov.in"],
    lastUpdated: "2026-07-01",
  },

  {
    id: "india-post-payments-bank",
    name: "India Post Payments Bank (IPPB)",
    department: "Postal Services",
    category: "Postal Services",
    categoryIcon: "📮",
    overview: "A digital-first bank operated by India Post, offering a zero/low-minimum-balance savings account, doorstep banking through postal staff (Postmen/Grameen Dak Sevaks) with handheld biometric devices, and bill payment/DBT services -- particularly useful in areas with limited traditional bank branch access.",
    eligibility: "Any Indian resident aged 18 or above (accounts for minors also available with a guardian).",
    documents: ["Aadhaar card (used for e-KYC)", "PAN card or Form 60"],
    fees: { accountOpening: "Free, zero minimum balance for the basic savings account" },
    processingTime: "Instant to same-day, especially via doorstep opening with a postal staff visit",
    onlineSteps: ["Download the IPPB Mobile Banking app and complete Aadhaar-based e-KYC registration"],
    offlineSteps: [
      "Request a doorstep account opening visit -- a local Postman/Grameen Dak Sevak can open your account at home using a handheld biometric device",
      "Alternatively, visit any post office offering IPPB services",
    ],
    commonMistakes: ["Not taking advantage of doorstep banking (cash deposit/withdrawal, bill payments) -- this is one of IPPB's core differentiators, especially useful for elderly or rural customers who'd otherwise need to travel to a branch"],
    faqs: [],
    officialLinks: ["https://www.ippbonline.com"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "post-office-passport-seva-kendra",
    name: "Post Office Passport Seva Kendra (POPSK)",
    department: "Postal Services",
    category: "Postal Services",
    categoryIcon: "📮",
    overview: "Post Office Passport Seva Kendras extend passport application services (submission, document verification, biometrics) to designated post offices, expanding access beyond dedicated Passport Seva Kendras, especially in smaller towns.",
    eligibility: "Any passport applicant whose nearest designated POPSK covers their area -- not every post office offers this; only specifically designated ones do.",
    documents: ["Same as standard passport application -- see the Passport Renewal / New Passport Application services for the full document list"],
    fees: { sameAsPassport: "Same fee structure as standard passport applications through passportindia.gov.in -- POPSK doesn't add extra cost, it's simply an alternate physical location for the same process" },
    processingTime: "Same as standard PSK processing timelines once your appointment is completed",
    onlineSteps: [
      "Apply as usual at passportindia.gov.in, and when booking your appointment, check whether a POPSK is available and more convenient than the nearest dedicated PSK",
    ],
    offlineSteps: ["Attend your booked appointment at the designated POPSK with your documents, same as you would at a regular PSK"],
    commonMistakes: ["Assuming every post office offers this service -- only specifically designated POPSKs do; check availability when booking your appointment"],
    faqs: [],
    officialLinks: ["https://www.passportindia.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "mail-redirection-address-change",
    name: "Mail Redirection / Address Change Service",
    department: "Postal Services",
    category: "Postal Services",
    categoryIcon: "📮",
    overview: "Redirecting your mail to a new address for a set period after you move, so post office deliveries reach you at your new location instead of the old one.",
    eligibility: "Any postal customer who has moved or is temporarily relocating.",
    documents: ["Old and new address proof", "Identity proof"],
    fees: { redirection: "A nominal fee applies, based on the redirection period requested" },
    processingTime: "Setup typically takes a few days to become effective",
    onlineSteps: ["Check availability of this service via your local post office or the India Post website, as it may need to be arranged directly with your servicing post office"],
    offlineSteps: [
      "Visit your local post office and submit a redirection request with your old and new address details",
      "Pay the applicable fee for the redirection period you need",
    ],
    commonMistakes: ["Forgetting to update your address directly with important senders (banks, government departments) as well -- mail redirection is a helpful stopgap, not a permanent substitute for updating your address on file everywhere"],
    faqs: [],
    officialLinks: ["https://www.indiapost.gov.in"],
    lastUpdated: "2026-06-01",
  },

  // ---- New department: Civic Services ----

  {
    id: "cpgrams-public-grievance",
    name: "Public Grievance Redressal (CPGRAMS)",
    department: "Civic Services",
    category: "Civic Services",
    categoryIcon: "🏙",
    overview: "The Centralized Public Grievance Redress and Monitoring System -- a single online platform to lodge grievances against any central government ministry/department (and many state departments too), when a specific service request seems stuck or a complaint hasn't been addressed through normal channels.",
    eligibility: "Any citizen with an unresolved grievance against a government department/ministry/public sector undertaking.",
    documents: ["Details of your original application/complaint (reference numbers, dates)", "Any supporting documents relevant to your grievance"],
    fees: { filing: "Free" },
    processingTime: "Departments are generally expected to respond within a defined window (commonly around 30 days), though this varies by the complexity and department",
    onlineSteps: [
      "Go to pgportal.gov.in and register with your basic details",
      "Select the relevant ministry/department/organization and describe your grievance clearly, referencing any prior application numbers",
      "Upload supporting documents and submit -- you'll receive a registration number to track status",
      "Check status anytime using your registration number; you can also file an appeal if unsatisfied with the resolution",
    ],
    offlineSteps: [],
    commonMistakes: [
      "Filing a vague complaint without referencing specific prior application/complaint numbers, making it harder for the department to locate and act on your case",
      "Not using CPGRAMS as a genuine escalation tool -- many people don't realize this exists as a formal, trackable channel when direct complaints to a department go unanswered",
    ],
    faqs: [
      {
        q: "Can I use CPGRAMS for state government matters too?",
        a: "CPGRAMS primarily covers central government ministries/departments, but many states have integrated their own grievance systems with it or link to it -- check whether your specific state department is covered, or use your state's own grievance portal if a separate one exists.",
      },
    ],
    officialLinks: ["https://pgportal.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "swachh-bharat-sanitation-complaint",
    name: "Sanitation / Garbage Complaint (Swachh Bharat)",
    department: "Civic Services",
    category: "Civic Services",
    categoryIcon: "🏙",
    overview: "Reporting sanitation issues -- uncollected garbage, overflowing bins, public urination spots needing attention, broken public toilets -- to your municipal corporation, often through apps linked to the Swachh Bharat Mission.",
    eligibility: "Any resident.",
    documents: ["Location details/photo of the issue (helps speed up resolution)"],
    fees: { complaint: "Free" },
    processingTime: "Varies by municipal corporation and issue severity -- commonly a few days for routine issues",
    onlineSteps: [
      "Many cities have their own municipal complaint app or portal (search '[your city] municipal corporation complaint app') -- some are also linked to the Swachhata app under Swachh Bharat Mission",
      "Submit the complaint with location and photo evidence",
      "Track resolution status on the same app/portal",
    ],
    offlineSteps: ["Call your municipal corporation's helpline or visit your local ward office to report the issue in person"],
    commonMistakes: ["Not including a photo/precise location, which can delay the responsible team's ability to act on the complaint"],
    faqs: [],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "trade-license",
    name: "Trade License (Municipal)",
    department: "Civic Services",
    category: "Civic Services",
    categoryIcon: "🏙",
    overview: "A license from your municipal corporation permitting you to run a specific trade/business at a location, ensuring it meets local health, safety, and zoning requirements -- distinct from Shop & Establishment registration, which is a separate labour-law compliance.",
    eligibility: "Any business operating a physical trade premises within municipal limits (specific trades and thresholds requiring a license vary by city).",
    documents: ["Business address/ownership or rental proof", "Identity proof of the owner", "Site plan, for certain categories of trade", "NOC from fire department, for specific higher-risk trade categories"],
    fees: { licenseFee: "Varies by trade category and municipal corporation, often scaled by premises size/type" },
    processingTime: "A few weeks, depending on inspection and category of trade",
    onlineSteps: [
      "Go to your municipal corporation's website (search '[your city] trade license online application')",
      "Fill in business and premises details, upload documents",
      "Pay the fee -- an inspection may be scheduled before final approval for certain trade categories",
    ],
    offlineSteps: ["Visit your municipal corporation's licensing department/ward office to apply in person if online application isn't available"],
    commonMistakes: ["Confusing this with Shop & Establishment registration -- they're separate requirements (trade license is municipal/health-safety focused, Shop & Establishment is a labour law compliance) and many businesses need both"],
    faqs: [
      {
        q: "Is a Trade License the same as Shop & Establishment registration?",
        a: "No -- they're separate requirements from different authorities. Trade License is issued by your municipal corporation focused on health/safety/zoning compliance; Shop & Establishment registration is a labour department requirement governing working conditions. Most commercial premises need both.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "civic-infra-complaint",
    name: "Civic Infrastructure Complaint (Streetlight / Pothole / Municipal Services)",
    department: "Civic Services",
    category: "Civic Services",
    categoryIcon: "🏙",
    overview: "Reporting civic infrastructure issues -- broken streetlights, potholes, damaged public property, stray animal concerns -- to your municipal corporation for repair/action.",
    eligibility: "Any resident.",
    documents: ["Location details/photo of the issue"],
    fees: { complaint: "Free" },
    processingTime: "Varies significantly by municipal corporation and issue type/severity",
    onlineSteps: [
      "Use your city's municipal complaint app/portal (most major cities now have one -- search '[your city] municipal corporation complaint')",
      "Select the relevant category (roads, streetlights, public property, etc.), add location and photo",
      "Track status via your complaint/ticket number",
    ],
    offlineSteps: ["Call your municipal corporation's helpline or visit your local ward office to report in person"],
    commonMistakes: ["Reporting to the wrong civic body -- some infrastructure (like state highways vs municipal roads) falls under different authorities, so double-check jurisdiction if your complaint isn't getting action"],
    faqs: [],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  // ---- Expanding Travel Services: actual travel/transport booking (was passport-only) ----

  {
    id: "irctc-train-booking",
    name: "Train Ticket Booking (IRCTC)",
    department: "Travel Services",
    category: "Travel Services",
    categoryIcon: "✈",
    overview:
      "Booking reserved train tickets through IRCTC (Indian Railway Catering and Tourism Corporation), India's official rail ticketing platform, via the website or the RailOne app. 2026 brought significant changes aimed at curbing bots and touting: Aadhaar-authenticated users get priority access, and a mandatory Face ID/photo-matching check now applies to unreserved/general ticket QR codes booked via RailOne (effective 15 July 2026).",
    eligibility: "Any traveler; a registered IRCTC account is required to book online.",
    documents: ["Valid photo ID for at least one adult passenger on the PNR at the time of travel (Aadhaar, PAN, Voter ID, Driving Licence, or Passport)", "IRCTC account with verified mobile number and email"],
    fees: {
      ticketFare: "As per distance, class, and train type",
      refundOnCancellation: "Tiered clerkage/cancellation charges apply based on how close to departure you cancel -- see FAQs",
    },
    processingTime: "Regular reserved ticket booking opens 08:00 AM IST on the opening day of the booking window (commonly a set number of days before travel -- check the current Advance Reservation Period, which was reduced in 2026)",
    onlineSteps: [
      "Log in to irctc.co.in or the RailOne app with your registered, Aadhaar-authenticated account for the best chance at seats on the opening day",
      "Search your train, select class, and enter passenger details from your saved Master List for faster checkout",
      "Pay via UPI, IRCTC iPay, card, or net banking",
      "Save your e-ticket PDF; carry the physical or digital original of the ID you'd listed (any adult passenger's ID on the PNR is acceptable at boarding, not necessarily the exact one entered during booking)",
      "Track PNR status via the app, website, or by SMS '<10-digit PNR>' to 139",
    ],
    offlineSteps: ["Book at any computerized Passenger Reservation System (PRS) counter, or via authorized ticketing agents/Common Service Centres"],
    commonMistakes: [
      "Not completing Aadhaar authentication on your IRCTC account -- since late 2025, the first 15 minutes of general reserved booking (and all Tatkal booking) is restricted to Aadhaar-authenticated users, so an unauthenticated account is at a real disadvantage",
      "Assuming a UPI debit without a confirmed ticket means lost money -- IRCTC's reconciliation typically auto-refunds failed-booking debits within 1-3 working days; if not, raise it via 'Contact Us' > 'Cancelled Ticket Refund Status' with your bank reference number",
      "Not knowing the exact cancellation refund tiers, and being surprised by a low refund on a late cancellation",
    ],
    faqs: [
      {
        q: "What are the cancellation refund rules?",
        a: "For confirmed tickets: more than 72 hours before departure, a flat clerkage fee is deducted; 72-24 hours before, 25% of fare is deducted; 24-8 hours before, 50% is deducted; less than 8 hours before departure, no refund is given. Cancel as early as possible if your plans change.",
      },
      {
        q: "Can I reschedule instead of canceling?",
        a: "Yes -- confirmed tickets can be rescheduled to a different date, train, or class, but this request must be placed online at least 48 hours before the original departure.",
      },
    ],
    officialLinks: ["https://www.irctc.co.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "irctc-tatkal-booking",
    name: "Tatkal Train Ticket",
    department: "Travel Services",
    category: "Travel Services",
    categoryIcon: "✈",
    overview:
      "Tatkal is Indian Railways' last-minute booking quota for travel starting the next day, at a premium fare, for when regular quota is full. Tatkal booking is now restricted to Aadhaar-authenticated IRCTC accounts, part of a 2026 crackdown on bots and touting.",
    eligibility: "Any traveler with an Aadhaar-authenticated IRCTC account; Tatkal opens exactly one day before the train's departure date from its originating station.",
    documents: ["Aadhaar-authenticated IRCTC account", "Valid photo ID for at least one adult passenger on the PNR"],
    fees: {
      tatkalCharge: "Roughly 10% of base fare for Sleeper class, up to 30% for AC classes (capped), on top of the regular fare -- exact amount depends on distance/class",
      refund: "Confirmed Tatkal tickets are generally non-refundable; waitlisted Tatkal tickets that don't confirm get a full refund minus minor charges",
    },
    processingTime: "Booking window opens the day before travel: 10:00 AM IST for AC classes (1A, 2A, 3A, CC, EC), 11:00 AM IST for Sleeper (SL) and Second Sitting (2S)",
    onlineSteps: [
      "Log in to irctc.co.in or RailOne with your Aadhaar-authenticated account a few minutes before the window opens",
      "Have your Master List of passengers and payment method (UPI/IRCTC iPay recommended for speed) pre-configured, since Tatkal quota fills within minutes on popular routes",
      "Search, select, and confirm as quickly as possible once the window opens",
      "Save your e-ticket; carry a valid photo ID for at least one adult passenger on the PNR while traveling",
    ],
    offlineSteps: ["Tatkal tickets can also be booked at railway reservation counters at the same opening times, though online is generally faster given the quota fills quickly"],
    commonMistakes: [
      "Trying to book with a non-Aadhaar-authenticated account -- this is no longer permitted for Tatkal as of the current rules",
      "Not having payment and passenger details pre-filled -- Tatkal seats on popular routes commonly sell out within the first few minutes",
      "Expecting a refund on a confirmed Tatkal ticket if plans change -- these are largely non-refundable, unlike regular tickets",
    ],
    faqs: [
      {
        q: "What time does Tatkal booking actually open?",
        a: "One day before the train's departure date (counted from the originating station): 10:00 AM IST for AC classes, and 11:00 AM IST for Sleeper/Second Sitting.",
      },
      {
        q: "Can I get a refund if my confirmed Tatkal ticket goes unused?",
        a: "Generally no -- confirmed Tatkal tickets are non-refundable. Only Tatkal tickets that remain waitlisted and don't confirm are eligible for a refund (minus minor charges).",
      },
    ],
    officialLinks: ["https://www.irctc.co.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "digi-yatra-airport",
    name: "Digi Yatra (Airport Facial Recognition Boarding)",
    department: "Travel Services",
    category: "Travel Services",
    categoryIcon: "✈",
    overview:
      "A free, voluntary facial-recognition system for domestic air travel that lets you move through airport entry, security, and boarding using just your face, instead of repeatedly showing your boarding pass and ID. As of 2026, it's live at 60+ Indian airports and growing. Your facial data is stored on your own phone (a decentralized/self-sovereign identity model), not a central government database -- the airport receives only a temporary token for your specific flight, deleted within 24 hours of departure.",
    eligibility: "Indian domestic air travelers with an Aadhaar card; entirely optional -- you can always use standard document checks instead.",
    documents: ["Aadhaar card, for one-time app registration", "Your flight's PNR/boarding details, added in the app before travel"],
    fees: { registration: "Free", usage: "Free" },
    processingTime: "One-time registration takes about 4-10 minutes; airport processing itself is near-instant once registered",
    onlineSteps: [
      "Download the official 'DigiYatra' app (published specifically by 'DigiYatra Foundation' -- verify the publisher, as lookalike apps exist)",
      "Register using Aadhaar-based validation and a self-image capture",
      "Before each trip, add your flight/PNR details to the app",
      "At the airport, look at the camera at entry, security, and boarding checkpoints -- no need to show your boarding pass or ID at each point",
    ],
    offlineSteps: ["Standard document-based check-in and boarding remains available at all times as a fallback -- Digi Yatra doesn't replace it, it's an optional faster lane"],
    commonMistakes: [
      "Downloading an unofficial lookalike app instead of the genuine one published by DigiYatra Foundation",
      "Assuming it's mandatory -- it's entirely voluntary; you can always use the standard document-check process instead",
      "Assuming it works at every airport -- while expanding quickly, it's not yet available everywhere, so check your specific departure airport",
    ],
    faqs: [
      {
        q: "Is my facial data stored on a government server?",
        a: "No -- Digi Yatra uses a decentralized model where your facial data stays encrypted on your own phone. The airport only receives a temporary, flight-specific token, which is deleted within 24 hours of your departure.",
      },
      {
        q: "Do I still need to carry ID if I use Digi Yatra?",
        a: "It's still wise to carry a physical/digital ID as a backup, since not every checkpoint or situation is guaranteed to be Digi Yatra-enabled, and you may occasionally still be asked for manual verification.",
      },
    ],
    officialLinks: ["https://www.digiyatra.com"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "metro-smart-card",
    name: "Metro Smart Card / NCMC",
    department: "Travel Services",
    category: "Travel Services",
    categoryIcon: "✈",
    overview: "Getting a rechargeable metro smart card (increasingly the National Common Mobility Card, or NCMC, which also works across select buses and other transit systems) for contactless metro travel in cities with a metro network.",
    eligibility: "Any metro rider.",
    documents: ["None required for a basic card; KYC (ID/address proof) may be needed for certain concessional or registered card variants"],
    fees: { cardIssuance: "A one-time card cost applies (varies by city's metro operator), separate from the travel balance you load", minimumRecharge: "Varies by city" },
    processingTime: "Instant issuance at metro station counters/kiosks",
    onlineSteps: ["Many metro systems now support recharging your card balance via their app or UPI-linked recharge at station kiosks -- check your specific city metro's app"],
    offlineSteps: [
      "Purchase a smart card at any metro station counter or ticket vending machine",
      "Load your desired balance and tap in/out at station gates for travel",
      "Recharge at station counters, kiosks, or via the metro's app where available",
    ],
    commonMistakes: ["Losing the card without registering it (where a registered-card option exists) -- an unregistered card's balance typically can't be recovered if lost, while some cities allow balance protection for registered cards"],
    faqs: [
      {
        q: "What's the difference between a regular metro card and NCMC?",
        a: "NCMC (National Common Mobility Card) is designed to work across multiple transit systems -- metro, select buses, and in some cities even parking/toll -- under one card, rather than needing a separate card for each city/system. Availability of NCMC vs a city-specific card depends on your metro operator.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "state-bus-booking",
    name: "State Road Transport Bus Booking",
    department: "Travel Services",
    category: "Travel Services",
    categoryIcon: "✈",
    overview: "Booking bus tickets on state-run road transport corporation buses (e.g. KSRTC, MSRTC, APSRTC, and similar state operators), for both intra-state and inter-state routes.",
    eligibility: "Any traveler.",
    documents: ["None required for booking itself; carry a valid photo ID for verification on some routes/services"],
    fees: { fare: "Varies by route, distance, and bus category (ordinary, express, AC/Volvo, sleeper, etc.)" },
    processingTime: "Instant online booking and confirmation",
    onlineSteps: [
      "Go to your specific state transport corporation's website/app (each state runs its own -- e.g. KSRTC for Karnataka, MSRTC for Maharashtra) or a private aggregator that lists government bus routes",
      "Search your route, select a bus/seat, and pay online",
      "Receive your e-ticket via SMS/email -- carry it (digital or printed) along with a photo ID",
    ],
    offlineSteps: ["Purchase tickets directly at the bus stand counter or from the conductor on board (where standing/available seats permit)"],
    commonMistakes: ["Not double-checking whether your route is operated by the state corporation directly or by a private operator listed on the same booking platform, which can affect refund/rescheduling policies"],
    faqs: [],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  // ---- New department: Digital Services ----

  {
    id: "umang-app",
    name: "UMANG App (All Government Services in One App)",
    department: "Digital Services",
    category: "Digital Services",
    categoryIcon: "⚙",
    overview:
      "UMANG (Unified Mobile Application for New-age Governance) is a single app aggregating hundreds of central and state government services -- from EPFO and gas booking to certificate applications and scheme information -- so citizens don't need a separate app for each department.",
    eligibility: "Any citizen with a smartphone.",
    documents: ["Aadhaar card, for services requiring identity verification within the app"],
    fees: { app: "Free" },
    processingTime: "Instant app access; individual service processing times follow that specific service's own timeline",
    onlineSteps: [
      "Download the UMANG app (Android/iOS) or visit web.umang.gov.in",
      "Register with your mobile number and set an MPIN",
      "Search for the specific service/department you need (e.g. EPFO, PAN, gas booking, various state services) within the app's aggregated directory",
      "Complete that service's specific process within the same app -- UMANG acts as a gateway, but final processing follows that department's own rules",
    ],
    offlineSteps: [],
    commonMistakes: ["Not realizing how broad UMANG's coverage is -- many people default to separate apps/websites for each service without checking whether UMANG already aggregates it in one place"],
    faqs: [],
    officialLinks: ["https://web.umang.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "csc-common-service-centre",
    name: "Common Service Centre (CSC)",
    department: "Digital Services",
    category: "Digital Services",
    categoryIcon: "⚙",
    overview:
      "Common Service Centres are government-authorized, physical assisted-access points (typically run by a local entrepreneur, called a Village Level Entrepreneur or VLE) offering help with digital government services -- useful when you don't have reliable internet access, aren't comfortable navigating a portal yourself, or need biometric-based services requiring in-person presence.",
    eligibility: "Anyone needing assistance with a digital government service.",
    documents: ["Depends entirely on the specific service you're seeking help with at the CSC"],
    fees: { csc: "A small service/assistance fee typically applies, on top of any official government fee for the underlying service" },
    processingTime: "Varies by the specific service being accessed",
    onlineSteps: ["Locate your nearest CSC via the 'Locate CSC' tool on csc.gov.in"],
    offlineSteps: [
      "Visit your nearest CSC with relevant documents for whatever service you need help with (Aadhaar update, PAN application, various certificates, banking services, insurance, and more are commonly available)",
      "Pay the applicable service fee to the VLE operating the centre",
    ],
    commonMistakes: ["Not clarifying the total cost (government fee + CSC service charge) upfront before proceeding, to avoid confusion about what you're actually paying for"],
    faqs: [
      {
        q: "What can I actually get done at a CSC?",
        a: "A wide range: Aadhaar enrolment/updates, PAN applications, various certificates, banking and insurance services, utility bill payments, and increasingly, IRCTC ticket booking and other digital services -- essentially, a physical helpdesk for many of the online services covered elsewhere in this app.",
      },
    ],
    officialLinks: ["https://www.csc.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "meri-pehchaan-sso",
    name: "MeriPehchaan (National Single Sign-On)",
    department: "Digital Services",
    category: "Digital Services",
    categoryIcon: "⚙",
    overview: "A single sign-on account that lets you log in to multiple government portals with one set of credentials, instead of creating and remembering separate logins for each department's website.",
    eligibility: "Any citizen wanting a unified login across participating government portals.",
    documents: ["Mobile number or Aadhaar, for account creation"],
    fees: { account: "Free" },
    processingTime: "Instant account creation",
    onlineSteps: [
      "Go to meripehchaan.gov.in and register using your mobile number or Aadhaar",
      "Once created, look for the 'Login with MeriPehchaan' or National Single Sign-On (NSSO) option on participating government portals to log in without creating a separate account each time",
    ],
    offlineSteps: [],
    commonMistakes: ["Not realizing this exists and continuing to maintain separate logins/passwords for each government portal individually"],
    faqs: [],
    officialLinks: ["https://meripehchaan.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "mobile-aadhaar-app",
    name: "mAadhaar App (Mobile Aadhaar)",
    department: "Digital Services",
    category: "Digital Services",
    categoryIcon: "⚙",
    overview: "UIDAI's official mobile app letting you carry a digital version of your Aadhaar on your phone, generate time-bound QR codes for verification without revealing your full Aadhaar number, and access basic Aadhaar services on the go.",
    eligibility: "Any Aadhaar holder.",
    documents: ["Aadhaar number and registered mobile number"],
    fees: { app: "Free" },
    processingTime: "Instant setup",
    onlineSteps: [
      "Download the mAadhaar app (Android/iOS) from an official app store listing published by UIDAI",
      "Register your Aadhaar using your registered mobile number and OTP",
      "Access your digital Aadhaar profile, generate a masked QR code for sharing (which hides your full Aadhaar number while still allowing verification), and check basic service status",
    ],
    offlineSteps: [],
    commonMistakes: ["Downloading a lookalike unofficial app instead of the genuine UIDAI-published mAadhaar app -- always verify the publisher before installing"],
    faqs: [
      {
        q: "Can I use mAadhaar instead of carrying a physical Aadhaar card?",
        a: "Yes, the digital Aadhaar shown in the app (or downloaded as e-Aadhaar/via DigiLocker) is treated as valid for most purposes where a physical card would be accepted, though carrying a backup is still sensible for situations where digital verification isn't set up.",
      },
    ],
    officialLinks: ["https://uidai.gov.in"],
    lastUpdated: "2026-06-01",
  },

  // ---- Filling gaps: Ration Card (Identity Documents) ----

  {
    id: "ration-card",
    name: "Ration Card (NFSA / One Nation One Ration Card)",
    department: "Identity Documents",
    category: "Identity Documents",
    categoryIcon: "🪪",
    overview:
      "A ration card lets eligible households buy subsidized food grains (rice, wheat, sugar, kerosene) through the Public Distribution System (PDS) under the National Food Security Act, 2013. Under 'One Nation One Ration Card' (ONORC), now implemented across all 36 states/UTs, cardholders can draw their entitlement from any Fair Price Shop in the country using Aadhaar/biometric authentication -- not just the shop they originally registered with, which matters a lot for migrant workers.",
    eligibility:
      "Indian residents meeting your state's income/category criteria -- common categories are Antyodaya Anna Yojana (AAY, poorest households), Priority Household (PHH, covers vulnerable groups like widows, seniors, persons with disabilities), and non-priority/APL categories with limited or no subsidy. A household should not hold more than one active ration card.",
    documents: ["Aadhaar card for all family members (mandatory e-KYC)", "Address proof", "Income proof matching your claimed category", "Family photograph"],
    fees: { application: "Free or a nominal fee, varies by state" },
    processingTime: "A few weeks, depending on state verification -- new applications are handled by the Food & Civil Supplies Department of your specific state",
    onlineSteps: [
      "Check nfsa.gov.in, which acts as a directory linking to your specific state's Food & Civil Supplies Department portal (the actual application is always submitted through your state's own site, not centrally)",
      "Register with family details, income category, and Aadhaar numbers for all members",
      "Track your application status on the same state portal",
      "Once issued, download the 'Mera Ration' app to check entitlements, nearby Fair Price Shops, and use ONORC portability while traveling or after relocating",
    ],
    offlineSteps: ["Visit your local Food & Civil Supplies office or Common Service Centre (CSC) to apply with physical documents"],
    commonMistakes: [
      "Applying for a new ration card in a new state without surrendering the old one first -- a household shouldn't hold more than one active card",
      "Not completing Aadhaar e-KYC for all family members, which is now mandatory and can block portability/benefits",
      "Not realizing you can draw your ration from any Fair Price Shop nationally via ONORC -- some long-term migrants still travel back to their home state unnecessarily",
    ],
    faqs: [
      {
        q: "I've moved to a different state for work -- do I need a new ration card there?",
        a: "Not necessarily -- under One Nation One Ration Card (ONORC), now active in all 36 states/UTs, you can use your existing ration card at any Fair Price Shop nationally via Aadhaar/biometric authentication, without needing a new card in your new state.",
      },
    ],
    officialLinks: ["https://nfsa.gov.in"],
    lastUpdated: "2026-08-01",
  },

  // ---- New department: Disability Services ----

  {
    id: "udid-disability-card",
    name: "UDID (Unique Disability ID) Card",
    department: "Disability Services",
    category: "Disability Services",
    categoryIcon: "♿",
    overview:
      "A single national identity card and disability certificate for Persons with Disabilities (PwDs), replacing the older system of separate state-issued disability certificates. It's used to access reservations, scholarships, travel concessions, tax exemptions, and other disability-related benefits with one recognized document nationwide. Over 1.33 crore cards have been issued as of 2026.",
    eligibility: "Any person with a recognized disability under the Rights of Persons with Disabilities Act, 2016 -- the disability percentage (assessed by a medical board) determines which of three card categories you receive: White (below 40% disability), Yellow (40-80%), or Blue (above 80%).",
    documents: ["Aadhaar card (or Aadhaar Enrolment Number)", "Passport-size photograph", "Existing disability certificate, if you have one from a state-issued system (for conversion)", "Address proof"],
    fees: { application: "Free" },
    processingTime: "Your application is reviewed and sent to a Chief Medical Officer (CMO) or Medical Board for disability assessment before the card is generated -- overall timeline varies by how quickly the medical assessment is scheduled and completed",
    onlineSteps: [
      "Go to swavlambancard.gov.in (the official DEPwD portal -- verify this exact URL, as many similar-sounding unofficial sites appear in search results)",
      "Click 'Apply for UDID Card' and choose to apply using your Aadhaar number or Aadhaar Enrolment Number",
      "Fill in personal, disability, employment, and identity details, and upload your photograph and any existing disability certificate",
      "Submit -- your application goes to a CMO/Medical Board for assessment",
      "Track status anytime using 'Track Application Status' with your enrollment number, date of birth, and captcha",
      "Once your status shows 'Card Generated', download your e-UDID card and certificate from the portal",
    ],
    offlineSteps: ["Visit your district hospital or a designated medical assessment center if your application requires an in-person disability assessment before the CMO/Medical Board can confirm your category"],
    commonMistakes: [
      "Using an unofficial lookalike website instead of the genuine swavlambancard.gov.in -- double-check the URL, and never share your OTP with anyone claiming to help you apply",
      "Not tracking application status and assuming nothing is happening -- checking regularly helps catch situations where the portal requests further medical documentation or clarification",
    ],
    faqs: [
      {
        q: "What are the three UDID card categories?",
        a: "White card: disability below 40%. Yellow card: disability 40-80%. Blue card: disability above 80%. Your specific category is determined by a CMO/Medical Board assessment during the application process, not self-declared.",
      },
      {
        q: "Does the UDID card work in every state?",
        a: "Yes -- it's designed as a single national identity valid across all states, replacing the earlier fragmented system where each state issued its own separate disability certificate.",
      },
    ],
    officialLinks: ["https://swavlambancard.gov.in"],
    lastUpdated: "2026-08-01",
  },

  // ---- Filling gaps: Business & GST (company registration, IPR) ----

  {
    id: "company-registration-spice",
    name: "Company Registration (SPICe+ / Private Limited)",
    department: "Business & GST",
    category: "Business & GST",
    categoryIcon: "🏢",
    overview:
      "Incorporating a company (Private Limited, One Person Company, Public Limited, or Section 8) in India through SPICe+, the integrated web form on the MCA V3 portal. SPICe+ bundles up to ten registrations into one filing -- name reservation, incorporation, DIN allotment, PAN, TAN, GSTIN, EPFO, ESIC, profession tax enrolment, and bank account opening -- avoiding separate applications for each.",
    eligibility: "Anyone forming a company under the Companies Act, 2013 -- Indian citizens, NRIs, foreign nationals, and overseas companies setting up an Indian subsidiary are all eligible, subject to specific director/subscriber requirements per company type.",
    documents: [
      "PAN and Aadhaar of all proposed directors/subscribers",
      "Voter ID/Passport, recent bank statements, and photographs of directors",
      "Registered office proof: rent agreement or ownership document, plus a No-Objection Certificate from the owner, and a recent utility bill",
      "Class-3 Digital Signature Certificates (DSC) for all proposed directors and subscribers",
    ],
    fees: {
      spicePartA_nameReservation: "₹1,000 (optional -- can be skipped by going directly through the integrated Part B route)",
      spicePartB_governmentFee: "₹0 for companies with authorized capital up to ₹15 lakh, under the Ease of Doing Business initiative",
      stampDuty: "Nominal state-specific stamp duty on MoA/AoA and the SPICe+ form still applies, varies by the state of your registered office",
    },
    processingTime: "Typically 2-10 working days for the Certificate of Incorporation (COI), if all documents and details are error-free",
    onlineSteps: [
      "Create a Business User account on the MCA V3 portal",
      "Optionally file SPICe+ Part A to reserve a company name (valid 20 days) -- or skip straight to the integrated Part B route",
      "Complete SPICe+ Part B with company details, director/subscriber information, and registered office details",
      "Attach linked forms: e-MOA (INC-33), e-AOA (INC-34), and AGILE-PRO-S (for GST/EPFO/ESIC/bank account) as needed",
      "All directors and subscribers digitally sign using their DSC; at least one independent witness must also sign the e-MOA/e-AOA",
      "Submit and pay applicable stamp duty -- the Registrar of Companies (ROC) reviews and issues the Certificate of Incorporation once approved",
    ],
    offlineSteps: [],
    commonMistakes: [
      "A rejected SPICe+ application cannot simply be corrected and resubmitted -- you must file an entirely fresh application with a new SRN and pay the filing fee again, so review every field carefully before submitting",
      "Missing the independent witness signature on e-MOA/e-AOA -- this is consistently one of the most common resubmission triggers",
      "Letting the MCA portal session expire (times out after 30 minutes of inactivity) without saving your draft -- save frequently while filling out Part B",
      "Proposing a company name too similar to an existing company/trademark, leading to rejection -- search the MCA name database and trademark registry before finalizing your choice",
    ],
    faqs: [
      {
        q: "Is registration really free?",
        a: "The MCA government filing fee for SPICe+ Part B is ₹0 for companies with authorized capital up to ₹15 lakh. However, state-specific stamp duty on your MoA/AoA still applies and varies by state, so it's not entirely cost-free.",
      },
      {
        q: "Can I register an LLP through SPICe+?",
        a: "No -- Limited Liability Partnerships use a separate incorporation form called FiLLiP, not SPICe+, which is specifically for companies under the Companies Act, 2013.",
      },
    ],
    officialLinks: ["https://www.mca.gov.in"],
    lastUpdated: "2026-08-01",
  },

  {
    id: "llp-registration",
    name: "LLP Registration (FiLLiP)",
    department: "Business & GST",
    category: "Business & GST",
    categoryIcon: "🏢",
    overview: "Registering a Limited Liability Partnership (LLP) -- a hybrid structure combining partnership flexibility with limited liability protection -- through the FiLLiP form on the MCA portal, a separate process from company incorporation (SPICe+).",
    eligibility: "Two or more partners (individuals or bodies corporate) forming a business together, seeking limited liability protection without the fuller compliance burden of a private limited company.",
    documents: ["PAN and Aadhaar of all designated partners", "Address proof of partners", "Registered office proof and NOC from the owner", "Digital Signature Certificates (DSC) for designated partners"],
    fees: { registration: "Government fees vary based on the LLP's total contribution amount -- generally lower than company incorporation costs for small contribution amounts" },
    processingTime: "Typically 7-15 working days, depending on document completeness and ROC processing",
    onlineSteps: [
      "Obtain DSCs for designated partners and apply for their DPIN/DIN if they don't already have one",
      "Reserve your LLP name via the RUN-LLP service on the MCA portal",
      "File the FiLLiP form with partner and registered office details",
      "Once approved, file the LLP Agreement (Form 3) within the specified period after incorporation",
    ],
    offlineSteps: [],
    commonMistakes: [
      "Forgetting to file the LLP Agreement (Form 3) after incorporation -- this is a separate, mandatory follow-up step with its own deadline, distinct from the initial FiLLiP filing",
      "Not understanding LLP vs Private Limited trade-offs before choosing -- LLPs have simpler compliance but can't raise equity funding from investors the way a private limited company can",
    ],
    faqs: [
      {
        q: "Should I register an LLP or a Private Limited Company?",
        a: "LLPs suit businesses wanting limited liability with simpler ongoing compliance and no plans to raise equity investment. Private Limited companies suit businesses planning to raise funding from investors or issue shares, since LLPs can't do this the same way -- consider your growth plans before choosing.",
      },
    ],
    officialLinks: ["https://www.mca.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "trademark-registration",
    name: "Trademark Registration",
    department: "Business & GST",
    category: "Business & GST",
    categoryIcon: "🏢",
    overview: "Registering a trademark (brand name, logo, slogan) to legally protect it and prevent others from using something confusingly similar, through the Indian Trademark Registry.",
    eligibility: "Any individual or business owning or intending to use a distinctive mark for goods/services.",
    documents: ["Logo/wordmark image, if applicable", "Applicant's identity/business proof", "Power of Attorney (Form TM-48), if filed through an agent/attorney"],
    fees: { governmentFee: "₹4,500 per class for individuals/startups/small enterprises (with applicable proof), ₹9,000 per class for other applicants -- fees are per class of goods/services and per mark" },
    processingTime: "Registration can take anywhere from 8 months to a couple of years depending on objections/oppositions raised; you can start using the ™ symbol immediately upon filing (before registration), and ® only after actual registration is granted",
    onlineSteps: [
      "Go to ipindia.gov.in and conduct a trademark search first, to check your proposed mark isn't already registered or too similar to an existing one",
      "File your application online, selecting the correct class(es) of goods/services",
      "Respond promptly to any examination report/objection raised by the Registry",
      "If published in the Trademark Journal without opposition (or opposition is resolved in your favor), the mark proceeds to registration",
    ],
    offlineSteps: ["Trademark applications can also be filed physically at a Trademark Registry office, though online filing is standard practice now"],
    commonMistakes: [
      "Skipping the prior search step and filing a mark too similar to an existing registered trademark, leading to objection/opposition and wasted time",
      "Not responding to examination reports/objections within the given deadline, which can lead to the application being treated as abandoned",
      "Using ® before registration is actually granted -- only use ™ until the certificate is issued",
    ],
    faqs: [
      {
        q: "How long does trademark registration take?",
        a: "It varies significantly -- commonly 8 months to 2 years, depending on whether objections or third-party oppositions are raised during the process. You can start using ™ (not ®) on your mark as soon as you file, even before registration completes.",
      },
    ],
    officialLinks: ["https://ipindia.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "patent-registration",
    name: "Patent Registration",
    department: "Business & GST",
    category: "Business & GST",
    categoryIcon: "🏢",
    overview: "Filing for a patent to protect a genuinely new invention, giving you exclusive rights to it for 20 years from the filing date, through the Indian Patent Office.",
    eligibility: "Inventors of a new, non-obvious, industrially applicable invention -- not applicable to mere discoveries, abstract ideas, or several other categories excluded under the Patents Act, 1970.",
    documents: ["Patent specification (provisional or complete) describing the invention", "Claims defining the scope of protection sought", "Applicant/inventor identity details", "Priority document, if claiming priority from an earlier foreign filing"],
    fees: {
      individualStartupSmallEntity: "Significantly reduced fees apply for individual inventors, startups, and small entities compared to large companies -- check the current fee schedule on ipindia.gov.in, as discounted rates for these categories are a deliberate policy choice to encourage filing",
    },
    processingTime: "Examination and grant can take a few years from filing under normal processing; DPIIT-recognized startups can access an expedited examination route with significantly faster timelines",
    onlineSteps: [
      "Go to ipindia.gov.in and file a provisional application first if your invention is still being finalized (locks in your priority date, gives 12 months to file the complete specification), or file the complete specification directly if ready",
      "Request examination (this is a separate, deliberate step -- filing alone doesn't trigger automatic examination)",
      "Respond to any objections raised in the examination report within the given timeline",
      "Once objections are resolved, the patent is granted and published",
    ],
    offlineSteps: ["Applications can be filed physically at a Patent Office branch, though online filing is now standard"],
    commonMistakes: [
      "Publicly disclosing or selling the invention before filing -- this can jeopardize 'novelty' and block patentability in many cases; file first, disclose after",
      "Not requesting examination -- simply filing the application doesn't automatically trigger review; you must separately request examination within the prescribed period",
      "Not utilizing the discounted fees and fast-track examination available to individual inventors and DPIIT-recognized startups",
    ],
    faqs: [
      {
        q: "How long does patent protection last?",
        a: "20 years from the date of filing, provided renewal fees are paid annually to keep it in force.",
      },
      {
        q: "Can startups get faster patent examination?",
        a: "Yes -- DPIIT-recognized startups (via Startup India registration) are eligible for expedited examination and significantly reduced fees, one of the concrete benefits of getting that recognition.",
      },
    ],
    officialLinks: ["https://ipindia.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "copyright-registration",
    name: "Copyright Registration",
    department: "Business & GST",
    category: "Business & GST",
    categoryIcon: "🏢",
    overview: "Registering copyright for original literary, artistic, musical, or software works through the Copyright Office -- copyright exists automatically upon creation, but formal registration provides stronger legal evidence of ownership if you ever need to enforce it.",
    eligibility: "Creators/owners of original literary, dramatic, musical, artistic works, sound recordings, or software.",
    documents: ["Copy or sample of the work being registered", "Details of authorship and, if applicable, prior publication", "NOC from other authors/publishers, where relevant"],
    fees: { registration: "Varies by category of work -- a nominal government fee applies, generally modest for literary/artistic works" },
    processingTime: "A few months typically, allowing for the mandatory objection window before registration is finalized",
    onlineSteps: [
      "Go to copyright.gov.in and file your application with details and a copy/sample of the work",
      "A statutory waiting period applies during which objections can be filed by third parties",
      "If no valid objection is raised (or objections are resolved), the Registrar processes and grants registration",
    ],
    offlineSteps: [],
    commonMistakes: [
      "Assuming registration is required to have copyright protection at all -- copyright exists automatically from the moment of creation; registration is about having stronger, easier-to-use evidence of your ownership, not about creating the right itself",
      "Not keeping dated proof of creation/authorship independent of the registration process, which is useful evidence regardless of registration status",
    ],
    faqs: [
      {
        q: "Do I need to register my work for it to be copyrighted?",
        a: "No -- copyright protection exists automatically as soon as you create an original work. Registration isn't mandatory, but it creates official, dated evidence of ownership that's very useful if you ever need to prove your rights in a dispute.",
      },
    ],
    officialLinks: ["https://copyright.gov.in"],
    lastUpdated: "2026-06-01",
  },

  // ---- Filling gaps: Government Schemes (recent additions) ----

  {
    id: "pm-svanidhi",
    name: "PM SVANidhi (Street Vendor Loan Scheme)",
    department: "Government Schemes",
    category: "Government Schemes",
    categoryIcon: "🎯",
    overview:
      "A microcredit scheme for street vendors, offering small collateral-free working capital loans -- starting at ₹10,000 for the first loan, rising to ₹20,000 and then ₹50,000 for subsequent loans as repayment history builds -- with an interest subsidy for timely repayment and a cashback incentive for digital transactions.",
    eligibility: "Street vendors who were vending as of/before a specified cutoff date (originally March 2020, with later provisions for those who started vending afterward too, subject to certification), holding a Certificate of Vending or identification issued by an urban local body.",
    documents: ["Certificate of Vending / vendor identification from your urban local body", "Aadhaar card", "Bank account details"],
    fees: { firstLoan: "Up to ₹10,000", secondLoan: "Up to ₹20,000 (after timely repayment of the first)", thirdLoan: "Up to ₹50,000 (after timely repayment of the second)", collateral: "None required", interestSubsidy: "7% per annum subsidy on timely repayment, credited quarterly" },
    processingTime: "A few weeks, depending on bank processing after urban local body verification",
    onlineSteps: [
      "Go to pmsvanidhi.mohua.gov.in and check/apply for your Certificate of Vending status if you don't already have one",
      "Apply for the loan through the portal, linked to a participating bank/NBFC/MFI",
      "Track application and disbursal status online",
    ],
    offlineSteps: ["Visit your Urban Local Body office or a participating bank branch for application assistance"],
    commonMistakes: [
      "Not repaying the first small loan on time -- this directly determines eligibility and amount for the next, larger loan tier",
      "Not using digital payment methods for vending transactions -- this scheme includes a cashback incentive specifically for digital transaction adoption, which some eligible vendors miss out on",
    ],
    faqs: [
      {
        q: "How does the loan amount grow?",
        a: "It's tiered based on repayment history: ₹10,000 for the first loan, up to ₹20,000 for the second (after timely repayment of the first), and up to ₹50,000 for the third (after timely repayment of the second) -- consistently repaying on time is what unlocks larger amounts.",
      },
    ],
    officialLinks: ["https://pmsvanidhi.mohua.gov.in"],
    lastUpdated: "2026-07-01",
  },

  {
    id: "pm-vishwakarma",
    name: "PM Vishwakarma Yojana (Artisans & Craftspeople)",
    department: "Government Schemes",
    category: "Government Schemes",
    categoryIcon: "🎯",
    overview:
      "A scheme supporting traditional artisans and craftspeople (18 trades including carpenters, blacksmiths, potters, tailors, and others) with skill training (with a daily stipend during training), a toolkit incentive, collateral-free credit support, and marketing assistance, aiming to strengthen traditional trade-based livelihoods.",
    eligibility: "Artisans and craftspeople engaged in one of the scheme's recognized traditional trades, working with their hands and tools (typically self-employed, in the informal sector).",
    documents: ["Aadhaar card", "Bank account details", "Details of your specific trade"],
    fees: {
      skillTrainingStipend: "₹500 per day during basic/advanced skill training",
      toolkitIncentive: "Up to ₹15,000 (e-voucher) for purchasing modern tools relevant to your trade",
      firstLoanTranche: "Up to ₹1 lakh (collateral-free) at a concessional interest rate",
      secondLoanTranche: "Up to ₹2 lakh (collateral-free), after successful repayment/utilization of the first tranche",
    },
    processingTime: "Registration and verification can take a few weeks; toolkit and loan disbursal follow after training completion where applicable",
    onlineSteps: [
      "Go to pmvishwakarma.gov.in and register with your trade details and Aadhaar",
      "Verification is done at the Gram Panchayat/Urban Local Body level",
      "Once verified, receive your PM Vishwakarma certificate and ID card, then access training, toolkit incentive, and credit support in sequence",
    ],
    offlineSteps: ["Visit your Common Service Centre (CSC) or local Gram Panchayat/Urban Local Body office for registration assistance"],
    commonMistakes: ["Not completing the skill training component before expecting toolkit/credit benefits -- the scheme's components are generally sequenced, not all available immediately upon registration"],
    faqs: [
      {
        q: "Which trades are covered under this scheme?",
        a: "18 traditional trades are covered, including (among others) carpenters, blacksmiths, goldsmiths, potters, cobblers, tailors, masons, and boat makers -- check the current full list on pmvishwakarma.gov.in, as it's specific to certain recognized craft/trade categories.",
      },
    ],
    officialLinks: ["https://pmvishwakarma.gov.in"],
    lastUpdated: "2026-07-01",
  },

  {
    id: "stand-up-india",
    name: "Stand Up India (SC/ST/Women Entrepreneur Loans)",
    department: "Government Schemes",
    category: "Government Schemes",
    categoryIcon: "🎯",
    overview: "A scheme facilitating bank loans between ₹10 lakh and ₹1 crore for setting up a new greenfield enterprise (manufacturing, services, trading, or agri-allied activities), specifically for SC/ST and women entrepreneurs, with each bank branch expected to support at least one SC/ST borrower and one woman borrower.",
    eligibility: "SC/ST individuals and women aged 18+, setting up a new (not existing) greenfield enterprise, with at least 51% shareholding/controlling stake in the enterprise for non-individual entities.",
    documents: ["Identity and address proof", "Category certificate (SC/ST), where applicable", "Detailed business project report", "Proof of enterprise being greenfield (new, not an expansion of an existing business)"],
    fees: { loanAmount: "₹10 lakh to ₹1 crore, covering up to 75% of the project cost (composite loan covering term loan + working capital)" },
    processingTime: "A few weeks to a couple of months, depending on bank appraisal of the project",
    onlineSteps: [
      "Go to standupmitra.in and register with your details and business plan",
      "Use the portal's handholding support (mentorship, application assistance) if needed",
      "Apply to a participating bank branch through the portal or directly",
      "Track application status through the portal",
    ],
    offlineSteps: ["Visit any Scheduled Commercial Bank branch directly -- each is expected to facilitate at least one SC/ST and one woman entrepreneur loan under this scheme"],
    commonMistakes: [
      "Applying for an existing/expanding business rather than a genuinely new (greenfield) enterprise -- this scheme specifically targets new ventures",
      "Not using the standupmitra.in portal's handholding support, which can help with project report preparation and connecting to the right bank",
    ],
    faqs: [
      {
        q: "What does 'greenfield enterprise' mean here?",
        a: "It means a genuinely new venture in manufacturing, services, trading, or agri-allied activities -- not an expansion or modification of an existing business you already run.",
      },
    ],
    officialLinks: ["https://www.standupmitra.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "pm-sym-unorganized-pension",
    name: "PM-SYM (Unorganized Workers' Pension)",
    department: "Government Schemes",
    category: "Government Schemes",
    categoryIcon: "🎯",
    overview: "Pradhan Mantri Shram Yogi Maan-dhan is a voluntary pension scheme for unorganized-sector workers, guaranteeing a fixed ₹3,000 monthly pension after age 60, with the government matching your monthly contribution equally.",
    eligibility: "Unorganized-sector workers aged 18-40 with monthly income up to ₹15,000, who are NOT covered by EPFO, ESIC, or NPS, and are not income tax payers.",
    documents: ["Aadhaar card", "Bank account/Jan Dhan account details", "Mobile number"],
    fees: { monthlyContribution: "Ranges from ₹55 to ₹200 per month depending on your age at entry (lower if you join younger), matched equally by the government into the fund" },
    processingTime: "Enrollment is typically completed same-day at a Common Service Centre",
    onlineSteps: ["Registration is primarily facilitated in person at a CSC, though you can check scheme details at maandhan.in beforehand"],
    offlineSteps: [
      "Visit your nearest Common Service Centre (CSC) with your Aadhaar and bank/Jan Dhan account details",
      "Complete registration with a designated CSC operator, who calculates your specific monthly contribution based on your entry age",
      "Contributions are auto-debited monthly from your linked account",
    ],
    commonMistakes: ["Confusing this with Atal Pension Yojana -- both are pension schemes for similar income groups, but eligibility, contribution amounts, and guaranteed pension amounts differ; check which one actually fits your situation rather than assuming they're interchangeable"],
    faqs: [
      {
        q: "How is PM-SYM different from Atal Pension Yojana?",
        a: "PM-SYM specifically targets unorganized workers with income up to ₹15,000/month and gives a fixed ₹3,000 pension with government-matched contributions. Atal Pension Yojana has broader eligibility (any citizen 18-40 with a bank account, except income tax payers) and offers a choice of pension amounts from ₹1,000-5,000/month. Check which fits your situation -- you can't enroll in both.",
      },
    ],
    officialLinks: ["https://maandhan.in"],
    lastUpdated: "2026-06-01",
  },

  // ---- Filling gaps: Employment (EPS pension), Education (anti-ragging), Travel (minor passport) ----

  {
    id: "eps-pension-claim",
    name: "EPS Pension (Employees' Pension Scheme) Claim",
    department: "Employment",
    category: "Employment",
    categoryIcon: "💼",
    overview: "Claiming your monthly pension under the Employees' Pension Scheme (EPS-95), a component of your EPF contributions specifically set aside for post-retirement pension, payable after age 58 (with options for reduced early pension from 50, or deferred pension up to 60 for a higher amount).",
    eligibility: "EPF members with at least 10 years of eligible service, reaching pensionable age (58 for full pension, with reduced/deferred options at other ages).",
    documents: ["UAN and PPO details, if already allotted", "Aadhaar card", "Bank account details", "Service history across employers, if applicable"],
    fees: { claiming: "Free" },
    processingTime: "A few weeks after your claim is submitted and verified",
    onlineSteps: [
      "Log in to unifiedportal-mem.epfindia.gov.in with your UAN",
      "Go to 'Online Services' > 'Claim (Form 31, 19, 10C & 10D)' and select the pension claim form (Form 10D) once you reach eligible age",
      "Fill in and submit -- eligibility and pensionable service are calculated from your EPF service history",
      "Track claim status and eventual monthly disbursal through the portal",
    ],
    offlineSteps: ["Visit your nearest EPFO regional office for claim assistance if you have complex service history across multiple employers or face portal issues"],
    commonMistakes: [
      "Not linking Aadhaar and ensuring KYC is complete before attempting to claim, which is a prerequisite for online pension processing",
      "Confusing EPS pension with your EPF corpus withdrawal (Form 19) -- these are related but distinct: EPF is your accumulated savings, EPS is the separate monthly pension component",
    ],
    faqs: [
      {
        q: "What's the difference between my EPF balance and my EPS pension?",
        a: "EPF is your accumulated provident fund savings (withdrawable as a lump sum via Form 19). EPS is a separate scheme funded by a portion of your employer's contribution, specifically providing a monthly pension after you reach eligible age -- they're related but claimed and used differently.",
      },
    ],
    officialLinks: ["https://unifiedportal-mem.epfindia.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "anti-ragging-helpline",
    name: "Anti-Ragging Helpline",
    department: "Education",
    category: "Education",
    categoryIcon: "🎓",
    overview: "A 24x7 national helpline and online complaint system for reporting ragging incidents at educational institutions, run under UGC anti-ragging regulations.",
    eligibility: "Any student or parent facing or witnessing ragging at a college/university.",
    documents: ["Details of the incident, institution, and those involved, if available"],
    fees: { helpline: "Free (toll-free)" },
    processingTime: "Immediate helpline response; formal complaint follow-up depends on the institution and UGC's process",
    onlineSteps: [
      "File a complaint at antiragging.in or call the toll-free helpline 1800-180-5522",
      "Complaints can also be filed anonymously if you're concerned about identification",
      "The UGC and the institution's Anti-Ragging Committee are required to act on registered complaints",
    ],
    offlineSteps: ["Report directly to your institution's Anti-Ragging Committee or local police if the situation is urgent"],
    commonMistakes: ["Not reporting due to fear of retaliation -- anonymous reporting is available specifically to address this concern"],
    faqs: [],
    officialLinks: ["https://www.antiragging.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "passport-minor",
    name: "Passport for Minor",
    department: "Travel Services",
    category: "Travel Services",
    categoryIcon: "✈",
    overview: "Applying for a passport for a child under 18 -- the process is similar to an adult's but requires parental documentation and consent, with different validity periods depending on the child's age.",
    eligibility: "Minors (under 18); application is made by a parent/legal guardian on the child's behalf.",
    documents: [
      "Child's birth certificate",
      "Both parents' passports (or valid ID if a parent doesn't hold a passport)",
      "Parental consent -- if applying with only one parent present, additional documentation (like Annexure forms) may be required, especially in cases of separated/divorced parents",
      "Passport-size photograph of the child meeting current specifications",
    ],
    fees: {
      minorPassport: "₹2,500 for a child up to 8 years old is not directly reduced under current fees, but a 10% concession may apply for children up to age 8 on the standard fee -- confirm exact current amount on passportindia.gov.in, as fees were revised 1 July 2026",
    },
    processingTime: "Similar to adult applications -- normal: 15-30 working days; Tatkal: 1-3 working days",
    onlineSteps: [
      "Register/log in at passportindia.gov.in and apply for a fresh passport, selecting the applicant as a minor",
      "Fill in parent/guardian details alongside the child's information",
      "Book a PSK appointment and attend with the child and required parental documentation",
      "Complete biometrics (for children old enough) and document verification",
    ],
    offlineSteps: [],
    commonMistakes: [
      "Only one parent's documentation being available in cases where both parents' consent/details are required, especially for separated or divorced parents -- check the specific Annexure requirements for your situation before your appointment",
      "Passport validity confusion -- passports for children under 15 are typically issued with shorter validity (commonly 5 years or until age 18, whichever is earlier) rather than the standard 10-year adult validity",
    ],
    faqs: [
      {
        q: "How long is a child's passport valid for?",
        a: "For children under 15, passports are typically issued with shorter validity (commonly 5 years, or until the child turns 18, whichever comes first) rather than the standard 10-year validity given to adults.",
      },
    ],
    officialLinks: ["https://www.passportindia.gov.in"],
    lastUpdated: "2026-08-01",
  },

  // ---- Filling gaps found on review: major 2024-2025 schemes and thin categories ----

  {
    id: "pm-surya-ghar",
    name: "PM Surya Ghar Muft Bijli Yojana (Free Rooftop Solar)",
    department: "Government Schemes",
    category: "Government Schemes",
    categoryIcon: "🎯",
    overview:
      "India's largest residential rooftop solar programme, launched February 2024 with a target of 1 crore (10 million) households. The government pays a direct subsidy toward installing rooftop solar, and a correctly-sized system (commonly 3kW) can generate roughly 300 units/month -- enough to cover many households' entire electricity bill.",
    eligibility: "Indian homeowner with an electricity connection in their name (or landlord's NOC for rented premises), suitable roof space, and no pre-existing rooftop solar system installed before the scheme's February 2024 launch (existing pre-scheme installations aren't eligible for this particular subsidy).",
    documents: [
      "Electricity bill / consumer number",
      "Aadhaar card",
      "Bank account details (subsidy is paid via DBT)",
      "Roof ownership proof, or landlord's NOC if renting",
    ],
    fees: {
      subsidy1kW: "₹30,000",
      subsidy2kW: "₹60,000",
      subsidy3kWPlus: "₹78,000 (maximum, for 3kW and above)",
      note: "Subsidy is paid via DBT to your bank account within about 30 days of commissioning, after net metering is installed. Several states add their own top-up subsidy on top of this central amount.",
    },
    processingTime: "Typically 30-90 days end-to-end: application to vendor assignment (7-15 days), installation (1-2 days), then DISCOM net meter installation (15-30 days) before commissioning and subsidy release",
    onlineSteps: [
      "Go to pmsuryaghar.gov.in and register with your state, DISCOM, and electricity consumer number",
      "Apply for rooftop solar -- your DISCOM will assess feasibility and issue a Feasibility Approval",
      "Once approved, choose an empanelled vendor listed on the portal (never pay a non-empanelled installer expecting this subsidy)",
      "After installation, apply for net metering through the same portal",
      "Once your DISCOM inspects and commissions the net meter, submit bank details -- the subsidy is credited via DBT within about 30 days",
    ],
    offlineSteps: ["Empanelled vendors and many DISCOM offices can assist with the application process in person if you're not comfortable doing it online yourself"],
    commonMistakes: [
      "Installing an inverter that isn't on the MNRE's ALMM (Approved List of Models and Manufacturers) -- this is one of the most common reasons a subsidy claim gets rejected after installation, so verify your inverter's compliance before purchase",
      "Assuming an existing solar installation from before February 2024 qualifies -- it doesn't; this subsidy is for new installations only",
      "Undersizing or oversizing the system relative to actual consumption -- a correctly-sized 3kW system is what typically delivers close to the advertised 300 free units, not an arbitrary size",
      "Paying a non-empanelled vendor expecting the subsidy to still apply -- only empanelled vendors listed on the portal qualify",
    ],
    faqs: [
      {
        q: "How is 'up to 300 free units' actually achieved?",
        a: "It's not a flat guarantee -- a properly sized system (commonly around 3kW under average Indian sunlight) generates roughly 300 units/month via net metering, which offsets a typical household's consumption. Your actual free units depend on your system size and how much electricity you use.",
      },
      {
        q: "Can I apply if I live in a rented house?",
        a: "Yes, with the landlord's No-Objection Certificate (NOC) for installing the system, though the electricity connection ideally should be in the applicant's name.",
      },
    ],
    officialLinks: ["https://pmsuryaghar.gov.in"],
    lastUpdated: "2026-08-11",
  },

  {
    id: "nps-vatsalya",
    name: "NPS Vatsalya (Pension Account for Children)",
    department: "Government Schemes",
    category: "Government Schemes",
    categoryIcon: "🎯",
    overview:
      "A pension savings account for minors, launched September 2024, letting a parent or legal guardian open and contribute to an NPS account on a child's behalf. The account automatically converts to a regular adult NPS account once the child turns 18, giving them an existing long-term retirement corpus and investment history from childhood.",
    eligibility: "Any Indian minor (under 18), account opened and operated by a parent or legal guardian until the child comes of age.",
    documents: ["Child's birth certificate or other age proof", "Aadhaar of the child and the parent/guardian", "Parent/guardian's PAN", "Bank account details"],
    fees: { minimumContribution: "₹1,000 per year to keep the account active (confirm current minimum on the portal, as scheme parameters can be revised)", accountOpening: "A small nominal charge may apply, similar to standard NPS account opening" },
    processingTime: "Account opening is typically instant to a few days via the online eNPS process",
    onlineSteps: [
      "Go to enps.nsdl.com or the CRA portal and select the NPS Vatsalya registration option",
      "Complete the guardian's e-KYC and enter the child's details",
      "Make the initial contribution to activate the account and receive the child's PRAN (Permanent Retirement Account Number)",
      "Continue periodic contributions -- the guardian manages the account until the child turns 18",
    ],
    offlineSteps: ["Visit a bank or Point of Presence (POP) branch offering NPS services to open an NPS Vatsalya account in person"],
    commonMistakes: [
      "Not understanding what happens at age 18 -- the account converts to a regular NPS account in the (now adult) child's own name, and they take over management of it themselves",
      "Confusing this with Sukanya Samriddhi Yojana -- SSY is specifically for a girl child's education/marriage savings with a fixed tenure, while NPS Vatsalya is a market-linked, gender-neutral, long-term retirement account continuing into adulthood",
    ],
    faqs: [
      {
        q: "What happens to the account when my child turns 18?",
        a: "It automatically converts into a standard adult NPS account under the child's own name and PAN, and they take over contributions and management themselves -- effectively giving them a head start on retirement savings from childhood.",
      },
    ],
    officialLinks: ["https://enps.nsdl.com"],
    lastUpdated: "2026-08-11",
  },

  {
    id: "gst-verify-gstin",
    name: "Verify a GSTIN (GST Search)",
    department: "Business & GST",
    category: "Business & GST",
    categoryIcon: "🏢",
    overview: "A free lookup tool to verify whether a GST Identification Number (GSTIN) is genuine and active -- useful before paying an invoice, onboarding a vendor, or checking your own registration status.",
    eligibility: "Anyone -- no login or registration required to search.",
    documents: ["The GSTIN you want to verify (15-character alphanumeric code)"],
    fees: { search: "Free" },
    processingTime: "Instant",
    onlineSteps: [
      "Go to the GST portal (gst.gov.in) and select 'Search Taxpayer' > 'Search by GSTIN/UIN'",
      "Enter the GSTIN and the captcha, then submit",
      "Review the result: legal name, registration status (active/cancelled/suspended), registration date, and business type",
    ],
    offlineSteps: [],
    commonMistakes: [
      "Not checking an unfamiliar vendor's GSTIN before making a large payment -- a quick free search can catch a cancelled or fake GSTIN before it becomes a compliance problem for you",
      "Assuming a GSTIN format looking correct means it's real -- always verify against the actual search tool, not just visual inspection of the number",
    ],
    faqs: [
      {
        q: "Why would I need to check someone else's GSTIN?",
        a: "If you're claiming input tax credit on a vendor's invoice, their GSTIN needs to be genuinely active and correctly registered -- an invalid or cancelled GSTIN can jeopardize your own tax credit claim, so it's worth a quick free check.",
      },
    ],
    officialLinks: ["https://www.gst.gov.in"],
    lastUpdated: "2026-07-01",
  },

  {
    id: "aadhaar-biometric-lock",
    name: "Aadhaar Biometric Lock / Unlock",
    department: "Identity Documents",
    category: "Identity Documents",
    categoryIcon: "🪪",
    overview: "A security feature letting you lock your Aadhaar biometrics (fingerprints and iris scan) so they can't be used for authentication, protecting against unauthorized biometric-based transactions -- and unlock them temporarily whenever you actually need to use biometric verification yourself.",
    eligibility: "Any Aadhaar holder.",
    documents: ["Aadhaar number or Virtual ID (VID)", "Registered mobile number for OTP"],
    fees: { locking: "Free" },
    processingTime: "Instant",
    onlineSteps: [
      "Go to myaadhaar.uidai.gov.in and log in, or use the mAadhaar app",
      "Select 'Aadhaar Lock/Unlock' under biometric services",
      "To lock: generate/use your 16-digit Virtual ID (VID) and confirm -- your demographic details remain usable, but biometric authentication is blocked until unlocked",
      "To unlock (temporarily, when you actually need biometric verification): unlock via OTP, complete your task, then it's worth re-locking afterward for ongoing protection",
    ],
    offlineSteps: ["This is an online-only self-service feature -- there's no offline/in-person process for locking or unlocking biometrics"],
    commonMistakes: [
      "Locking biometrics and then forgetting to unlock before an appointment that requires biometric verification (e.g. a bank e-KYC visit), causing an on-the-spot failure",
      "Not knowing your Virtual ID (VID) is needed for the lock/unlock process if biometrics are already locked -- generate and note it down before you need it in a hurry",
    ],
    faqs: [
      {
        q: "Does locking my biometrics affect anything else about my Aadhaar?",
        a: "No -- your demographic details (name, address, etc.) remain usable for non-biometric authentication like OTP-based verification. Locking specifically blocks fingerprint/iris-based authentication until you unlock it again.",
      },
    ],
    officialLinks: ["https://myaadhaar.uidai.gov.in"],
    lastUpdated: "2026-07-01",
  },

  {
    id: "adip-scheme",
    name: "ADIP Scheme (Assistive Devices for Persons with Disabilities)",
    department: "Disability Services",
    category: "Disability Services",
    categoryIcon: "♿",
    overview:
      "A central scheme providing free or subsidized assistive devices -- wheelchairs, hearing aids, artificial limbs, Braille kits, and similar aids -- to persons with disabilities, aimed at improving independent functioning. It's implemented through ALIMCO, National Institutes, and NGOs, and shares its application system (ARJUN portal) with the parallel senior-citizens scheme, Rashtriya Vayoshri Yojana.",
    eligibility:
      "Persons with disabilities holding a UDID card (or enrollment number) with a Disability Certificate showing at least 40% disability, with monthly income from all sources not exceeding a specified limit (check the current threshold on the ARJUN portal). Re-issuance of the same device generally requires at least 3 years since the last one received.",
    documents: [
      "UDID card or enrollment number, with Disability Certificate (40%+ disability)",
      "Income certificate/proof",
      "Aadhaar card",
      "Undertaking that the same aid hasn't been received from any source in the last 3 years",
    ],
    fees: { devices: "Free or subsidized, depending on income category" },
    processingTime: "Assessment and distribution commonly happen at organized camps; timeline depends on when a camp is scheduled in your district after your application is registered",
    onlineSteps: [
      "Go to the ARJUN portal (adip.depwd.gov.in) and register, uploading your UDID/Disability Certificate and income proof",
      "Look for scheduled distribution camps in your district through the portal",
    ],
    offlineSteps: [
      "Attend an organized distribution camp with your documents",
      "A medical assessment at the camp confirms which specific aid(s) you qualify for",
      "Receive the device at the camp, or through the assigned implementing agency",
    ],
    commonMistakes: [
      "Applying without a valid UDID card in hand -- get that first (see the UDID Card service) since it's a prerequisite here",
      "Requesting a replacement device before the 3-year re-issuance gap has passed, which will be declined",
    ],
    faqs: [
      {
        q: "Do I need a UDID card before applying for ADIP?",
        a: "Yes -- a UDID card (or at least its enrollment number) along with a Disability Certificate showing 40%+ disability is required. If you don't have one yet, apply for that first.",
      },
    ],
    officialLinks: ["https://adip.depwd.gov.in"],
    lastUpdated: "2026-08-11",
  },

  {
    id: "ecourts-case-status",
    name: "eCourts Case Status & Services",
    department: "Police & Legal",
    category: "Police & Legal",
    categoryIcon: "⚖",
    overview: "The national eCourts portal lets you check the real-time status of a court case, view orders and judgments, see cause lists (daily case listings), and access various citizen e-services for district and High Courts across India, without needing to visit the court in person just to check status.",
    eligibility: "Anyone with a case reference, or searching by party name/advocate/FIR number.",
    documents: ["Case Number Record (CNR) number, if known, or party name / FIR number / advocate name to search by"],
    fees: { search: "Free" },
    processingTime: "Instant for status/order lookups; actual case proceedings follow the court's own schedule",
    onlineSteps: [
      "Go to services.ecourts.gov.in and select 'Case Status'",
      "Search using CNR number (most precise), or by party name, FIR number, advocate, or case type plus court/state details",
      "View case status, next hearing date, and case history",
      "Separately, use the 'Judgments' or 'Orders' section to view and download court orders/judgments once available",
    ],
    offlineSteps: ["Court registries can also provide case status information in person if you're unable to use the online portal"],
    commonMistakes: [
      "Not knowing your case's CNR (Case Number Record) number, which is the most reliable single identifier -- it's usually mentioned on your case-related documents or can be obtained from your advocate",
      "Confusing the eCourts case-status portal with actually filing a case or appearing in court -- this is an information/tracking service, not a substitute for formal legal proceedings",
    ],
    faqs: [
      {
        q: "What's a CNR number and where do I find it?",
        a: "CNR (Case Number Record) is a unique 16-digit identifier assigned to a case, usable to search across any court in India regardless of case number format differences between states. Ask your advocate, or check case-related court documents, for your case's CNR.",
      },
    ],
    officialLinks: ["https://services.ecourts.gov.in", "https://ecourts.gov.in"],
    lastUpdated: "2026-07-01",
  },

  // ---- Second gap-fill pass: rounding out existing departments, no new categories ----

  {
    id: "vehicle-scrappage-certificate",
    name: "Vehicle Scrapping / Deregistration Certificate",
    department: "Transport & RTO",
    category: "Transport & RTO",
    categoryIcon: "🚗",
    overview:
      "Scrapping an old vehicle at a Registered Vehicle Scrapping Facility (RVSF) under India's Vehicle Scrappage Policy (effective April 2022), which issues a Certificate of Deposit (CoD) -- this deregisters the vehicle and can unlock incentives (road tax rebates, registration fee waivers) when buying a replacement vehicle. It's mandatory for government vehicles older than 15 years; voluntary for private owners, though older vehicles increasingly face fitness-test and green-tax hurdles that make scrapping the practical choice.",
    eligibility: "Any vehicle owner, particularly those with vehicles that have failed a fitness test, or are old enough that renewal costs/green tax make continued use impractical.",
    documents: ["Original RC", "Valid identity proof", "PUC and insurance details (if still valid)", "NOC from financier, if the vehicle has an active loan"],
    fees: { scrappingFee: "Facilities typically pay YOU a scrap value based on the vehicle's metal/parts worth, rather than charging a fee -- amounts vary by facility and vehicle condition" },
    processingTime: "A few days once you deliver the vehicle to a Registered Vehicle Scrapping Facility (RVSF)",
    onlineSteps: [
      "Check vahan.parivahan.gov.in for a list of RVSFs near you, or search '[your state] registered vehicle scrapping facility'",
      "Complete any pending hypothecation termination and clear outstanding challans before scrapping -- the Vahan portal will flag these",
      "After scrapping, the RVSF issues a Certificate of Deposit (CoD) and updates your vehicle's status to deregistered on Vahan",
    ],
    offlineSteps: ["Deliver the vehicle physically to an RVSF, complete the paperwork, and collect your Certificate of Deposit (CoD)"],
    commonMistakes: [
      "Scrapping at an unregistered/informal scrap dealer instead of an RVSF -- only a Registered Vehicle Scrapping Facility can issue the CoD needed to claim any related incentives",
      "Not clearing pending challans or hypothecation first, which can block the deregistration process",
    ],
    faqs: [
      {
        q: "What do I actually get for scrapping my old vehicle?",
        a: "Beyond the scrap value paid by the RVSF itself, your Certificate of Deposit (CoD) can unlock a road tax rebate and registration fee waiver on a new vehicle purchase in many states -- check your specific state's current incentive structure, as amounts and availability vary.",
      },
    ],
    officialLinks: ["https://vahan.parivahan.gov.in"],
    lastUpdated: "2026-08-11",
  },

  {
    id: "commercial-vehicle-permit",
    name: "National / State Permit for Commercial Vehicles",
    department: "Transport & RTO",
    category: "Transport & RTO",
    categoryIcon: "🚗",
    overview: "A permit authorizing a commercial vehicle (goods carrier or passenger transport) to operate within a state or across multiple states, required in addition to standard registration for any vehicle used commercially.",
    eligibility: "Owners of commercial vehicles (trucks, buses, taxis operating commercially) intending to ply within their home state (state permit) or across state lines (national permit).",
    documents: ["Vehicle RC", "Valid insurance and PUC", "Fitness certificate", "Tax payment receipts", "Route details for the permit application"],
    fees: { permitFee: "Varies by permit type, vehicle category, and validity period -- national permits typically involve a per-state authorization fee on top of the base permit fee" },
    processingTime: "A few days to a couple of weeks, depending on RTO processing and the number of states covered for a national permit",
    onlineSteps: [
      "Go to vahan.parivahan.gov.in and select the permit service relevant to your vehicle category",
      "Enter vehicle and route details, upload required documents",
      "Pay the applicable fee -- for national permits, this includes authorization fees for each additional state covered",
    ],
    offlineSteps: ["Apply at your RTO if the online option isn't fully available for your specific permit category"],
    commonMistakes: [
      "Operating outside your permit's authorized routes/states, which can result in fines and vehicle seizure at check posts",
      "Letting the permit lapse -- like registration, permits need periodic renewal and driving without a valid one is a punishable offense",
    ],
    faqs: [
      {
        q: "What's the difference between a national and state permit?",
        a: "A state permit authorizes operation only within your home state, while a national permit allows interstate operation across India, subject to per-state authorization fees -- choose based on your actual route needs.",
      },
    ],
    officialLinks: ["https://vahan.parivahan.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "income-tax-grievance",
    name: "Income Tax Grievance / Rectification Request",
    department: "Income Tax",
    category: "Income Tax",
    categoryIcon: "💰",
    overview: "Filing a grievance or rectification request with the Income Tax Department when there's an error in your processed return (like a mismatch in tax credit) or an unresolved issue with a filing, refund, or notice.",
    eligibility: "Any taxpayer with an e-filing account who has a genuine grievance or a processed return containing an apparent mistake.",
    documents: ["PAN", "Relevant assessment year and acknowledgment/order details", "Description of the specific error or grievance"],
    fees: { filing: "Free" },
    processingTime: "Rectification requests (Section 154) are typically processed within a few weeks to a couple of months; grievance resolution timelines vary by complexity",
    onlineSteps: [
      "For a rectification (correcting an apparent mistake in your processed return): log in to incometax.gov.in, go to 'Services' > 'Rectification', select the relevant order and reason, and submit",
      "For a broader grievance: use the 'e-Nivaran' / grievance section on the e-filing portal, describing the issue and referencing relevant order/notice numbers",
      "Track status on the same portal using your submitted request's reference number",
    ],
    offlineSteps: ["Grievances can also be escalated to your jurisdictional Assessing Officer if the online route doesn't resolve the issue"],
    commonMistakes: [
      "Filing a rectification request for something that actually requires a revised return instead (rectification is only for apparent/obvious mistakes, not for changing your originally reported income or claims)",
      "Not referencing the specific order/notice number, which slows down resolution",
    ],
    faqs: [
      {
        q: "What's the difference between rectification and a revised return?",
        a: "Rectification (Section 154) corrects an apparent mistake in an already-processed order -- like a tax credit mismatch the department made. A revised return is for when you need to correct or add information you yourself omitted or got wrong in your original filing -- these have different processes and eligibility windows.",
      },
    ],
    officialLinks: ["https://www.incometax.gov.in"],
    lastUpdated: "2026-07-01",
  },

  {
    id: "oci-card",
    name: "OCI Card (Overseas Citizen of India)",
    department: "Identity Documents",
    category: "Identity Documents",
    categoryIcon: "🪪",
    overview: "The Overseas Citizen of India (OCI) card is a lifelong visa-like document for foreign nationals of Indian origin (and their spouses/descendants meeting eligibility), letting them live, work, and travel to India without needing a separate visa each time -- though it does not confer Indian citizenship or voting rights.",
    eligibility: "Foreign nationals who were Indian citizens at some point, or are descended from someone who was, or are the spouse of an Indian citizen/OCI cardholder (subject to marriage duration and other conditions) -- citizens of Pakistan and Bangladesh are not eligible.",
    documents: [
      "Foreign passport",
      "Proof of Indian origin (own or parent's/grandparent's Indian passport, birth certificate, or similar)",
      "Marriage certificate, if applying on spousal grounds",
      "Passport-size photographs meeting specification",
    ],
    fees: { application: "Varies by country and processing category -- typically a notable fee in the applicant's local currency, higher than a standard visa; check the current fee on the specific consulate's OCI portal for your country" },
    processingTime: "Several weeks to a few months, depending on the processing consulate/VFS center and document verification complexity",
    onlineSteps: [
      "Go to ociservices.gov.in and register, selecting the Indian Mission/Consulate handling your region",
      "Fill in the application with personal, family, and Indian-origin proof details",
      "Upload required documents and pay the fee",
      "Submit biometrics at the designated VFS/consulate center as instructed",
      "Track application status on the same portal",
    ],
    offlineSteps: ["Applications ultimately require an in-person visit to a VFS/consulate center for biometrics, even though the form itself is submitted online"],
    commonMistakes: [
      "Not providing sufficient documentary proof of the Indian-origin ancestor's citizenship, which is the crux of most OCI applications",
      "Assuming OCI is equivalent to citizenship -- it isn't; OCI holders can't vote, hold Indian public office, or buy agricultural land, among other restrictions",
    ],
    faqs: [
      {
        q: "Is an OCI card the same as Indian citizenship?",
        a: "No -- OCI is a long-term, multiple-entry lifelong visa-equivalent status, not citizenship. OCI holders can't vote in Indian elections, hold most government positions, or purchase agricultural/farm land, among other restrictions that apply to full citizens only.",
      },
    ],
    officialLinks: ["https://ociservices.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "legal-heir-certificate",
    name: "Legal Heir Certificate / Succession Certificate",
    department: "Identity Documents",
    category: "Identity Documents",
    categoryIcon: "🪪",
    overview:
      "A certificate identifying the rightful legal heirs of a deceased person, needed to claim their property, bank accounts, insurance, pension, or other assets. A Legal Heir Certificate (issued by the local Tahsildar/Revenue office) is typically sufficient for smaller matters like transferring utility connections or claiming small dues, while a Succession Certificate (issued by a civil court) is generally required for larger matters like transferring immovable property, securities, or disputed claims.",
    eligibility: "Legal heirs (spouse, children, parents, as applicable) of a deceased person.",
    documents: ["Death certificate of the deceased", "Identity and address proof of all legal heirs", "Family tree/relationship proof", "Address proof of the deceased at time of death"],
    fees: { legalHeirCertificate: "A nominal fee, typically a few hundred rupees, varies by state", successionCertificate: "Court fees scaled by the value of the estate, typically a percentage of the asset value -- can be more significant for larger estates" },
    processingTime: "Legal Heir Certificate: a few weeks via the Revenue office; Succession Certificate: several months via civil court, given the court process involved",
    onlineSteps: [
      "For a Legal Heir Certificate: apply via your state's e-district portal (search '[your state] e-district legal heir certificate') if available, or in person",
      "For a Succession Certificate: this requires filing a formal petition in civil court -- typically done with a lawyer's assistance, not a simple online form",
    ],
    offlineSteps: [
      "Legal Heir Certificate: visit your local Tahsildar/Revenue office with the death certificate and family details",
      "Succession Certificate: file a petition at the civil court having jurisdiction over the deceased's last residence, typically with legal representation",
    ],
    commonMistakes: [
      "Assuming a Legal Heir Certificate is sufficient for every purpose -- banks, insurers, and property registrars often specifically require a Succession Certificate for larger-value claims, so check the specific institution's requirement before starting the wrong process",
      "Delaying this significantly after a death, which can complicate accessing time-sensitive benefits like insurance claims or pension continuation",
    ],
    faqs: [
      {
        q: "Which one do I actually need -- Legal Heir Certificate or Succession Certificate?",
        a: "It depends on what you're claiming. Smaller matters (utility transfer, some government benefits, employment dues) often accept a Legal Heir Certificate from the Revenue office. Larger or disputed matters -- especially property, securities, and significant bank balances -- often specifically require a court-issued Succession Certificate. Check directly with the institution you're claiming from, since requirements vary.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-08-11",
  },

  {
    id: "home-loan",
    name: "Home Loan",
    department: "Banking",
    category: "Banking",
    categoryIcon: "🏦",
    overview: "Applying for a home loan from a bank or housing finance company to purchase, construct, or renovate a residential property, typically the largest and longest-tenure loan most individuals take.",
    eligibility: "Salaried or self-employed individuals meeting the lender's income, age, and credit score requirements -- specific criteria vary by lender.",
    documents: [
      "PAN and Aadhaar",
      "Income proof (salary slips/IT returns)",
      "Bank statements (typically last 6 months)",
      "Property documents (sale agreement, title deeds, approved building plan)",
      "Employment proof",
    ],
    fees: {
      processingFee: "Typically 0.5-1% of loan amount, varies by lender",
      interestRate: "Varies by lender, loan amount, tenure, and your credit profile -- compare across banks/HFCs before committing",
    },
    processingTime: "A few weeks from application to disbursal, depending on property verification, legal due diligence, and documentation completeness",
    onlineSteps: [
      "Apply via your chosen bank/HFC's app or website, or a loan aggregator platform",
      "Complete e-KYC and upload income and property documents",
      "The lender conducts a technical (property) and legal verification of the property",
      "Review and accept the sanction letter, then complete disbursal formalities, often tied to your property registration",
    ],
    offlineSteps: ["Visit a bank/HFC branch to apply with physical documents if you prefer an in-person process"],
    commonMistakes: [
      "Not checking whether the property has clear title and necessary approvals before applying -- this is a common cause of loan rejection or delay during legal verification",
      "Not comparing interest rates/processing fees across multiple lenders, since even small rate differences compound significantly over a 15-20 year tenure",
      "Forgetting to claim available tax deductions on home loan principal (Section 80C) and interest (Section 24) once the loan is active",
    ],
    faqs: [
      {
        q: "What tax benefits does a home loan offer?",
        a: "Principal repayment can be claimed under Section 80C (within the overall 80C limit), and interest paid can be claimed under Section 24, subject to specified limits -- check current limits on the Income Tax portal, and note these benefits depend on which tax regime you choose.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "bank-locker",
    name: "Bank Locker Facility",
    department: "Banking",
    category: "Banking",
    categoryIcon: "🏦",
    overview: "Renting a bank safe deposit locker to securely store valuables, important documents, and jewelry -- note that banks are not insurers of locker contents, so RBI rules require banks to maintain their own liability framework and offer this only alongside a documented inventory understanding.",
    eligibility: "Existing or new bank account holders, subject to the bank's specific locker allotment availability (lockers are often in limited supply and may have a waitlist at busy branches).",
    documents: ["Existing account KYC", "Locker agreement (bank-provided)", "Nominee details for the locker"],
    fees: { annualRent: "Varies by locker size and branch location -- typically ranges from a few hundred to a few thousand rupees per year", termDeposit: "Some banks require a fixed deposit as security alongside locker rental, refundable when the locker is surrendered" },
    processingTime: "Same-day allotment if a locker is available; otherwise added to a waitlist",
    onlineSteps: ["Some banks allow you to check locker availability and register interest online, but actual allotment and the agreement signing require a branch visit"],
    offlineSteps: [
      "Visit your bank branch and request locker allotment",
      "Complete the locker agreement, nominate a nominee, and pay the applicable rent (and security deposit, if required)",
      "Access your locker during branch hours using your key/access credentials",
    ],
    commonMistakes: [
      "Not nominating anyone for the locker, which complicates access for family in case something happens to you",
      "Assuming locker contents are automatically insured by the bank -- banks are generally not liable for locker contents beyond specific limited circumstances under RBI's locker liability framework; consider separate insurance for high-value items",
    ],
    faqs: [
      {
        q: "Is everything in my locker insured by the bank?",
        a: "Not fully -- RBI's locker rules place some limited liability on banks in specific circumstances (like fire/theft due to the bank's negligence), but this isn't blanket insurance for locker contents. For high-value items, consider separate insurance coverage.",
      },
    ],
    officialLinks: ["https://www.rbi.org.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "pmjjby-life-insurance",
    name: "PM Jeevan Jyoti Bima Yojana (PMJJBY) -- Life Insurance",
    department: "Government Schemes",
    category: "Government Schemes",
    categoryIcon: "🎯",
    overview: "A government-backed term life insurance scheme offering ₹2 lakh cover for death from any cause, at an extremely low annual premium of ₹436, auto-renewed each year via your bank account.",
    eligibility: "Bank/post office account holders aged 18-50 (new enrollment); coverage can continue via annual renewal up to age 55.",
    documents: ["Bank/post office savings account", "Aadhaar (used as primary KYC, though not strictly mandatory for enrollment)", "Nominee details"],
    fees: { annualPremium: "₹436 per year, auto-debited from your linked account between 1 June and 31 May each policy year" },
    processingTime: "Enrollment is typically instant once your bank processes the consent form; coverage begins after a 30-day lien period for non-accidental death in the first year",
    onlineSteps: [
      "Log in to your bank's net banking or app and look for 'PMJJBY' under insurance/social security schemes",
      "Give consent and ensure your account has sufficient balance for the annual auto-debit",
      "Nominate a beneficiary if not already done",
    ],
    offlineSteps: ["Visit your bank or post office branch to enroll by filling a simple consent form"],
    commonMistakes: [
      "Insufficient account balance on the auto-debit date, which lapses your coverage for that year",
      "Not understanding the 30-day lien period for new enrollees -- non-accidental death within the first 30 days of enrollment isn't covered (accidental death is covered from day one)",
    ],
    faqs: [
      {
        q: "Can I have both PMJJBY and PMSBY?",
        a: "Yes -- they're separate, complementary schemes (PMJJBY for life cover from any cause, PMSBY for accidental death/disability specifically), and you can enroll in both if you meet each one's age criteria.",
      },
    ],
    officialLinks: ["https://financialservices.gov.in/beta/en/pmjjby", "https://jansuraksha.gov.in"],
    lastUpdated: "2026-08-11",
  },

  {
    id: "pmsby-accident-insurance",
    name: "PM Suraksha Bima Yojana (PMSBY) -- Accident Insurance",
    department: "Government Schemes",
    category: "Government Schemes",
    categoryIcon: "🎯",
    overview: "A government-backed accidental insurance scheme offering ₹2 lakh cover for accidental death or total disability (₹1 lakh for partial disability), at a remarkably low annual premium of just ₹20, auto-renewed via your bank account.",
    eligibility: "Bank/post office account holders aged 18-70.",
    documents: ["Bank/post office savings account", "Nominee details"],
    fees: { annualPremium: "₹20 per year, auto-debited from your linked account between 1 June and 31 May each policy year" },
    processingTime: "Enrollment is typically instant once consent is given; coverage is active immediately, with no lien period (unlike PMJJBY)",
    onlineSteps: [
      "Log in to your bank's net banking or app and look for 'PMSBY' under insurance/social security schemes",
      "Give consent and ensure sufficient account balance for the annual auto-debit",
      "Nominate a beneficiary",
    ],
    offlineSteps: ["Visit your bank or post office branch to enroll by filling a simple consent form"],
    commonMistakes: [
      "Insufficient account balance on the auto-debit date, lapsing coverage for that year",
      "Not filing a claim promptly after a qualifying accident -- claims require timely documentation (FIR/medical records as applicable), so don't delay",
    ],
    faqs: [
      {
        q: "What exactly does PMSBY cover?",
        a: "₹2 lakh for accidental death or total and irrecoverable loss of both eyes/hands/feet, and ₹1 lakh for partial disability (loss of one eye/hand/foot) -- it covers accidents specifically, not death from illness or natural causes, which is what PMJJBY is for instead.",
      },
    ],
    officialLinks: ["https://financialservices.gov.in/beta/en/pmsby", "https://jansuraksha.gov.in"],
    lastUpdated: "2026-08-11",
  },

  {
    id: "pm-kisan-maandhan",
    name: "PM Kisan Maandhan Yojana (Farmer Pension)",
    department: "Farmers",
    category: "Farmers",
    categoryIcon: "🌾",
    overview:
      "A voluntary pension scheme specifically for small and marginal farmers, guaranteeing a minimum ₹3,000 monthly pension after age 60, funded by matching monthly contributions from the farmer and the government during their working years. This is distinct from PM Kisan Samman Nidhi (the direct income-support scheme) -- Maandhan is a pension you contribute toward, not a direct cash transfer.",
    eligibility: "Small and marginal farmers aged 18-40, owning cultivable land up to 2 hectares as per state land records. Farmers already covered under other statutory social security schemes (like NPS, ESIC, EPFO) or who are income tax payers are generally not eligible.",
    documents: ["Aadhaar card", "Land ownership records (khatauni/khasra or equivalent)", "Bank/Jan Dhan account details", "Age proof"],
    fees: { monthlyContribution: "Ranges from ₹55 to ₹200 per month depending on your age at entry (lower if you join younger), matched equally by the government" },
    processingTime: "Enrollment is typically completed same-day through a Common Service Centre",
    onlineSteps: ["Existing PM Kisan Samman Nidhi beneficiaries can often self-enroll for Maandhan directly via pmkisan.gov.in using their existing beneficiary details, simplifying registration"],
    offlineSteps: [
      "Visit your nearest Common Service Centre (CSC) with your Aadhaar, land records, and bank details",
      "The CSC operator calculates your specific monthly contribution based on your entry age and completes registration",
      "Contributions are auto-debited monthly from your linked account",
    ],
    commonMistakes: [
      "Confusing this with PM Kisan Samman Nidhi -- Samman Nidhi is a direct ₹6,000/year cash transfer with no farmer contribution required, while Maandhan is a contributory pension scheme requiring you to pay in monthly until age 60",
      "Not realizing income tax payers and those covered by other formal pension schemes (EPFO, NPS, ESIC) aren't eligible",
    ],
    faqs: [
      {
        q: "How is this different from PM Kisan Samman Nidhi?",
        a: "PM Kisan Samman Nidhi (PM-KISAN) is direct, no-contribution income support of ₹6,000/year. PM Kisan Maandhan Yojana is a separate, voluntary, contributory pension scheme where you pay a monthly amount (matched by the government) to receive a guaranteed ₹3,000/month pension after turning 60. You can potentially benefit from both, since they serve different purposes.",
      },
      {
        q: "What happens if I die before turning 60?",
        a: "Your spouse can choose to continue the scheme by continuing contributions, or exit and receive the accumulated corpus with interest -- check current rules on the specific provisions for your situation.",
      },
    ],
    officialLinks: ["https://pmkisan.gov.in", "https://maandhan.in"],
    lastUpdated: "2026-08-11",
  },

  {
    id: "duplicate-marksheet-certificate",
    name: "Duplicate Marksheet / Degree Certificate",
    department: "Education",
    category: "Education",
    categoryIcon: "🎓",
    overview: "Obtaining a duplicate copy of a lost, damaged, or misplaced marksheet or degree certificate from your school board, university, or examining body.",
    eligibility: "Any student/alumnus of the issuing institution/board needing a replacement for a lost or damaged original.",
    documents: ["FIR copy or police complaint acknowledgment (for a lost certificate, required by most boards/universities)", "Original certificate, if damaged rather than lost", "Roll number / enrollment number / registration number from the original", "Identity proof"],
    fees: { duplicateIssuance: "A nominal fee, varies by board/university and sometimes scaled by how many years have passed since the original was issued" },
    processingTime: "A few weeks to a few months, depending on the board/university's record-retrieval and verification process -- older records can take longer to trace",
    onlineSteps: [
      "Check if your specific board/university offers online duplicate certificate applications (increasingly common -- search '[your board/university name] duplicate marksheet online')",
      "Upload the FIR copy, your original enrollment details, and identity proof",
      "Pay the fee and track your application",
      "Some boards also make certificates available via DigiLocker, which may be a faster alternative to a physical reissue",
    ],
    offlineSteps: [
      "Submit a written application to your board/university's examination section with the FIR copy and supporting documents",
      "Collect the duplicate certificate once processed, or await postal delivery",
    ],
    commonMistakes: [
      "Not filing a police complaint/FIR first -- most boards and universities require this as mandatory proof for a lost-certificate application",
      "Not checking DigiLocker first -- your certificate may already be available there instantly if your board/university has digitized older records, saving you the entire reissue process",
    ],
    faqs: [
      {
        q: "Can I get my certificate from DigiLocker instead of requesting a physical duplicate?",
        a: "Worth checking first -- many boards and universities (especially for more recent years) have uploaded certificates to DigiLocker, which would let you access a valid digital copy instantly, without going through the FIR-and-reissue process needed for a physical duplicate.",
      },
    ],
    officialLinks: [],
    lastUpdated: "2026-06-01",
  },

  {
    id: "health-insurance-claim",
    name: "Filing a Health Insurance Claim (Cashless / Reimbursement)",
    department: "Healthcare",
    category: "Healthcare",
    categoryIcon: "🏥",
    overview: "Filing a claim on a private or employer-provided health insurance policy -- either cashless (the hospital bills the insurer directly) or reimbursement (you pay first, then claim back), for a hospitalization or covered treatment.",
    eligibility: "Any policyholder or covered dependent with an active health insurance policy, for a treatment covered under their specific policy terms.",
    documents: [
      "Policy number and health ID card",
      "Hospital admission/discharge summary",
      "Original bills, prescriptions, and diagnostic reports (for reimbursement claims)",
      "Pre-authorization form (for cashless claims, filled by the hospital's insurance desk)",
    ],
    fees: { claimFiling: "Free -- insurers cannot charge you to file a claim" },
    processingTime: "Cashless pre-authorization: typically a few hours at network hospitals; reimbursement claims: commonly 15-30 days after complete document submission, per IRDAI's claim settlement timelines",
    onlineSteps: [
      "For cashless: inform your insurer/TPA (Third Party Administrator) as soon as hospitalization is planned or immediately in an emergency, and let the network hospital's insurance desk handle direct pre-authorization",
      "For reimbursement: log in to your insurer's app/portal, upload bills and discharge summary, and submit the claim within the policy's specified time limit (commonly 15-30 days from discharge)",
      "Track claim status through the same portal or your TPA's tracker",
    ],
    offlineSteps: ["Submit physical documents to your insurer's branch or via your employer's HR/insurance desk if it's a group policy"],
    commonMistakes: [
      "Not checking whether the hospital is in your insurer's network before admission -- non-network hospitals typically only allow reimbursement, not cashless",
      "Missing the claim submission deadline (commonly 15-30 days post-discharge for reimbursement) -- submit as soon as documents are ready rather than delaying",
      "Incomplete documentation causing repeated back-and-forth -- submit all required documents together the first time where possible",
    ],
    faqs: [
      {
        q: "What if my claim is rejected or I disagree with the settlement amount?",
        a: "First raise it with your insurer's grievance cell. If unresolved, you can escalate to the Insurance Ombudsman (a free, IRDAI-backed dispute resolution mechanism) or file a complaint via IRDAI's Integrated Grievance Management System (igms.irdai.gov.in).",
      },
    ],
    officialLinks: ["https://irdai.gov.in", "https://igms.irdai.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "msme-samadhaan",
    name: "MSME Samadhaan (Delayed Payment Recovery)",
    department: "Business & GST",
    category: "Business & GST",
    categoryIcon: "🏢",
    overview:
      "A statutory online portal letting registered micro and small enterprises file complaints against buyers -- government, PSU, or private -- who delay payment beyond the legally mandated 45 days (or 15 days if there's no written agreement). Complaints are routed to your state's Micro and Small Enterprise Facilitation Council (MSEFC), whose award carries the legal weight of a civil court decree, without needing to hire a lawyer or go through regular court proceedings. A 2026 amendment further strengthened enforcement, allowing awards to be recovered as arrears of land revenue.",
    eligibility: "Any Micro or Small Enterprise (not Medium) with a valid Udyam Registration, owed payment by a buyer beyond the statutory payment window.",
    documents: ["Udyam Registration certificate", "Invoice(s) and proof of delivery/acceptance of goods/services", "Correspondence with the buyer regarding the delayed payment", "Buyer's details"],
    fees: { filing: "Free to file a complaint on the portal" },
    processingTime: "The MSEFC is required to dispose of complaints within 90 days of reference, though actual timelines can vary with case complexity",
    onlineSteps: [
      "Go to samadhaan.msme.gov.in and register using your Udyam Registration number",
      "File a complaint with invoice details, delivery/acceptance proof, and buyer information",
      "The complaint is automatically routed to your state's MSEFC",
      "The council attempts conciliation first; if that fails, it proceeds to a formal hearing and issues a binding award",
      "Track status online throughout the process",
    ],
    offlineSteps: ["Physical applications can also be filed directly with your state's MSEFC if you prefer not to use the online portal"],
    commonMistakes: [
      "Not having a valid Udyam Registration before the transaction/complaint -- this is a prerequisite to access MSEFC protection",
      "Missing or incomplete proof of delivery/acceptance of goods or services, which weakens the complaint",
      "Not knowing that if a buyer wants to challenge an MSEFC award, they must first deposit the full awarded amount with the court -- a strong practical incentive for buyers to pay rather than contest",
    ],
    faqs: [
      {
        q: "Do I need a lawyer to use MSME Samadhaan?",
        a: "No -- the portal is specifically designed to let MSEs file and pursue delayed-payment complaints without needing to hire a lawyer or go through regular civil court, though you're free to seek legal advice if the matter is complex.",
      },
      {
        q: "What interest can I claim on the delayed amount?",
        a: "The buyer is liable to pay compound interest at three times the bank rate notified by RBI, on top of the principal amount owed -- a strong statutory penalty specifically meant to discourage delayed payments to small enterprises.",
      },
    ],
    officialLinks: ["https://samadhaan.msme.gov.in"],
    lastUpdated: "2026-08-11",
  },

  {
    id: "disability-pension",
    name: "Disability Pension",
    department: "Disability Services",
    category: "Disability Services",
    categoryIcon: "♿",
    overview: "A monthly pension for persons with disabilities from economically weaker households, provided under state-specific schemes (often linked to or modeled on the National Social Assistance Programme framework) -- distinct from the ADIP scheme, which provides physical aids rather than cash support.",
    eligibility: "Persons with a specified minimum disability percentage (commonly 40% or above, verified via UDID/Disability Certificate) from households meeting the state's income/BPL criteria -- exact eligibility and pension amounts are set by each state, so they vary considerably.",
    documents: ["UDID card or Disability Certificate (showing disability percentage)", "Income/BPL proof", "Age proof", "Bank account details"],
    fees: { application: "Free" },
    processingTime: "A few weeks to a couple of months, depending on state verification processes",
    onlineSteps: ["Check your state's social welfare/disability welfare department portal (search '[your state] disability pension online application') for the specific scheme name and application process in your state"],
    offlineSteps: ["Visit your local Social Welfare Department office or Gram Panchayat/municipal ward office to apply with your UDID card and income proof"],
    commonMistakes: [
      "Not having a UDID card ready -- most state disability pension schemes now require this as the standard proof of disability percentage, replacing older state-specific certificate formats",
      "Assuming pension amounts are uniform nationally -- they're set independently by each state and vary significantly",
    ],
    faqs: [
      {
        q: "Is this the same as the ADIP scheme?",
        a: "No -- ADIP provides physical assistive devices (wheelchairs, hearing aids, etc.) through camps, while Disability Pension is an ongoing monthly cash payment. Many eligible individuals can access both, since they serve different needs.",
      },
    ],
    officialLinks: ["https://www.disabilityaffairs.gov.in"],
    lastUpdated: "2026-06-01",
  },

  {
    id: "aadhaar-esign",
    name: "Aadhaar e-Sign (Digital Signature)",
    department: "Digital Services",
    category: "Digital Services",
    categoryIcon: "⚙",
    overview: "Aadhaar e-Sign lets you digitally sign documents online using Aadhaar-based OTP or biometric authentication, without needing a physical signature or a separately purchased Digital Signature Certificate (DSC) USB token -- widely used for signing government forms, income tax returns, and various online applications referenced throughout this app.",
    eligibility: "Any Aadhaar holder with a mobile number linked to Aadhaar (for OTP-based e-Sign).",
    documents: ["Aadhaar number", "Registered mobile number for OTP"],
    fees: { perDocumentSigning: "Often free when integrated within a government portal's own workflow (e.g., signing your ITR); some private-sector integrations may charge a small per-signature fee through their e-Sign service provider" },
    processingTime: "Instant",
    onlineSteps: [
      "When a government portal or application offers 'Sign with Aadhaar' or 'e-Sign', select it at the relevant step",
      "Enter your Aadhaar number and verify via OTP sent to your registered mobile",
      "The document is digitally signed instantly, using a licensed Certifying Authority's e-Sign service in the background",
    ],
    offlineSteps: [],
    commonMistakes: ["Assuming e-Sign works if your mobile number isn't linked to Aadhaar -- OTP-based e-Sign specifically requires this; update your Aadhaar mobile number first if needed (see Aadhaar Update & Correction)"],
    faqs: [
      {
        q: "Is Aadhaar e-Sign legally valid, like a physical signature?",
        a: "Yes -- Aadhaar e-Sign is a legally recognized electronic signature under India's IT Act, provided through licensed Certifying Authorities, and is widely accepted across government portals (income tax filing, various applications) as equivalent to a physical signature for those purposes.",
      },
    ],
    officialLinks: ["https://uidai.gov.in"],
    lastUpdated: "2026-06-01",
  },
];

