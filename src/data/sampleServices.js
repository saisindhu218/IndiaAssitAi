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
];

