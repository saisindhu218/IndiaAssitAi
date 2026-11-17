// States and Union Territories of India, used by the state filter so
// service pages can show state-specific fees/portals where we have them.

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

/**
 * States matching what the person has typed, best matches first:
 * 1) names that START with the text, 2) names with a WORD starting with it,
 * 3) names that merely CONTAIN it. Empty text returns every state.
 * Example: "a" -> Andhra Pradesh, Arunachal Pradesh, Assam, ... then the rest.
 */
export function matchStates(text) {
  const q = String(text || "").trim().toLowerCase();
  if (!q) return [...INDIAN_STATES];
  const starts = [];
  const wordStarts = [];
  const contains = [];
  INDIAN_STATES.forEach((state) => {
    const name = state.toLowerCase();
    if (name.startsWith(q)) starts.push(state);
    else if (name.split(" ").some((word) => word.startsWith(q))) wordStarts.push(state);
    else if (name.includes(q)) contains.push(state);
  });
  return [...starts, ...wordStarts, ...contains];
}

/**
 * Turns whatever is in the state box into a proper state name.
 * Returns { ok: true, value } -- value is "" when the box is empty -- or
 * { ok: false } when the text doesn't clearly identify one state.
 */
export function normalizeState(text) {
  const t = String(text || "").trim();
  if (!t) return { ok: true, value: "" };
  const exact = INDIAN_STATES.find((s) => s.toLowerCase() === t.toLowerCase());
  if (exact) return { ok: true, value: exact };
  const matches = matchStates(t);
  const starting = matches.filter((s) => s.toLowerCase().startsWith(t.toLowerCase()));
  if (starting.length === 1) return { ok: true, value: starting[0] };
  if (matches.length === 1) return { ok: true, value: matches[0] };
  return { ok: false };
}
