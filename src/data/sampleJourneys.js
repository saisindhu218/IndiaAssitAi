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
      { serviceId: "pan-new-application", note: "Apply for PAN if you don't have one yet -- most employers need it before your first paycheck." },
      { serviceId: "open-savings-account", note: "Open a salary/savings account for your paycheck to be deposited into." },
      { serviceId: "aadhaar-update", note: "Make sure your Aadhaar address and mobile number are current." },
      { serviceId: "epfo-uan-services", note: "Get your UAN from HR and check your EPF account is active." },
      { serviceId: "digilocker", note: "Set up DigiLocker to keep your certificates and Aadhaar handy digitally." },
      { serviceId: "itr-filing", note: "Once you've earned income for a full year, you'll need to file your first ITR." },
    ],
  },
  {
    id: "buying-a-vehicle",
    title: "Buying a Vehicle",
    icon: "🚗",
    description: "Steps to take once you've bought a new or used vehicle.",
    steps: [
      { serviceId: "driving-licence-new", note: "Get your driving licence sorted first if you don't already have one." },
      { serviceId: "vehicle-registration-new", note: "Register the vehicle in your name if it's brand new." },
      { serviceId: "vehicle-insurance", note: "Third-party insurance is mandatory before you drive -- comprehensive is worth considering too." },
      { serviceId: "puc-certificate", note: "Get a Pollution Under Control certificate; required to be carried at all times." },
      { serviceId: "fastag", note: "Set up FASTag for toll payments -- avoids double charges under the new toll rules." },
      { serviceId: "road-tax-payment", note: "Confirm road tax is paid, usually handled at registration for new vehicles." },
    ],
  },
  {
    id: "travelling-abroad",
    title: "Travelling Abroad",
    icon: "✈",
    description: "Make sure your travel documents are in order before an international trip.",
    steps: [
      { serviceId: "passport-new-application", note: "Check your passport has at least 6 months of validity left, or apply if you don't have one yet." },
      { serviceId: "police-clearance-certificate", note: "Some countries (especially for work/long-stay visas) require a PCC -- check your destination's requirement." },
      { serviceId: "international-driving-permit", note: "Planning to drive abroad? Get an IDP before you leave -- it's linked to your existing Indian licence." },
      { serviceId: "digi-yatra-airport", note: "Set up Digi Yatra for faster, paperless airport check-in on your domestic connecting flights." },
    ],
  },
];
