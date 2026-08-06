// Groq chat helper.
// This is deliberately NOT a free-form chatbot. Every call is grounded in
// the currently open service's verified content, so the model answers from
// YOUR data instead of inventing government procedures.

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

function buildSystemPrompt(service) {
  if (!service) {
    return `You are the IndiaAssist AI assistant. You have NOT been given a
specific government service document to reference. If the user asks about a
specific procedure, tell them you need them to open the relevant service page
first, or use search, so you can answer from verified information rather than
guessing.`;
  }

  return `You are the IndiaAssist AI assistant, currently helping a user who
is viewing the "${service.name}" (${service.department}) service page.

Answer ONLY using the verified information below. Do not invent fees, document
lists, steps, or rules that are not present here. If the user asks something
this content does not cover, clearly say you don't have verified information
on that and point them to the official link(s) provided, instead of guessing.

--- VERIFIED SERVICE DATA (source of truth) ---
Overview: ${service.overview}
Eligibility: ${service.eligibility}
Required documents: ${(service.documents || []).join(", ")}
Fees: ${JSON.stringify(service.fees || {})}
Processing time: ${service.processingTime}
Online steps: ${(service.onlineSteps || []).join(" | ")}
Offline steps: ${(service.offlineSteps || []).join(" | ")}
Common mistakes: ${(service.commonMistakes || []).join(" | ")}
FAQs: ${(service.faqs || []).map((f) => `Q: ${f.q} A: ${f.a}`).join(" || ")}
Official links: ${(service.officialLinks || []).join(", ")}
Last updated: ${service.lastUpdated}
--- END VERIFIED SERVICE DATA ---

Keep answers short, practical, and in plain language. If the user seems to be
a first-time applicant or elderly, be extra clear and step-by-step.`;
}

function buildJourneySystemPrompt(journeys) {
  const journeyList = (journeys || [])
    .map(
      (j) =>
        `"${j.title}" (id: ${j.id}) -- ${j.description} Steps: ${j.steps
          .map((s) => s.note || s.serviceId)
          .join(" | ")}`
    )
    .join("\n");

  return `You are the IndiaAssist AI assistant, in "Life Events" mode -- the
user describes something happening in their life (starting a job, buying a
vehicle, travelling, etc.) and you help them figure out what government
services/paperwork they'll need, using ONLY the verified journeys below.

--- VERIFIED JOURNEYS (source of truth) ---
${journeyList || "(none loaded yet)"}
--- END VERIFIED JOURNEYS ---

If the user's situation clearly matches one of these journeys, briefly explain
what it covers and tell them to tap "View full checklist" (the app will show
this button) to see the step-by-step list. If nothing matches, say so plainly
and suggest they use search or browse Government Services instead of
guessing. Keep answers short, warm, and practical -- this may be someone's
first time dealing with these processes.`;
}

/**
 * Send a chat message grounded in the full list of journeys, so the
 * assistant can point the user to the right one instead of guessing.
 */
export async function askJourneyAssistant(userMessage, journeys = [], history = []) {
  const apiKey = process.env.EXPO_PUBLIC_GROQ_API_KEY;
  const model = process.env.EXPO_PUBLIC_GROQ_MODEL || "llama-3.3-70b-versatile";

  if (!apiKey) {
    throw new Error(
      "Missing EXPO_PUBLIC_GROQ_API_KEY. Add it to your .env file (see .env.example)."
    );
  }

  const messages = [
    { role: "system", content: buildJourneySystemPrompt(journeys) },
    ...history,
    { role: "user", content: userMessage },
  ];

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages, temperature: 0.3, max_tokens: 500 }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Groq API error (${response.status}): ${text}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't generate a response.";
}

function buildLifeEventSystemPrompt(journeys, services) {
  const journeyList = (journeys || [])
    .map((j) => `- "${j.title}" (id: ${j.id}): ${j.description}`)
    .join("\n");
  const serviceList = (services || []).map((s) => `- ${s.name} (${s.department})`).join("\n");

  return `You are the IndiaAssist AI assistant on the "Life Events" screen. Users
describe what's happening in their life (e.g. "I'm starting a new job", "I just
got married") and you help them figure out what government services they need.

You have access to these pre-built guided journeys in the app:
${journeyList || "(none yet)"}

And these individual services the app currently covers:
${serviceList || "(none yet)"}

Rules:
- If the user's situation clearly matches one of the guided journeys above,
  tell them which one and that you can open its full checklist for them.
- If it matches one or more individual services instead, name those exact
  services (using the names above) and suggest they open that service page
  for full details, rather than explaining the procedure yourself here.
- If nothing above matches their situation, say so honestly -- don't invent
  a procedure. Suggest they use the search bar or check back as more
  services are added.
- Never state specific fees, documents, or steps yourself in this chat --
  that information only lives on the actual service pages, where it's kept
  verified and current. Your job here is to route the user to the right
  place, not to answer the procedural question directly.
- Keep responses short (2-4 sentences).`;
}

/**
 * Chat for the Life Events screen -- grounded ONLY in the list of journeys
 * and services that actually exist in the app, so it routes users instead
 * of inventing procedures for situations the app doesn't cover yet.
 */
export async function askAboutLifeEvent(userMessage, journeys, services, history = []) {
  const apiKey = process.env.EXPO_PUBLIC_GROQ_API_KEY;
  const model = process.env.EXPO_PUBLIC_GROQ_MODEL || "llama-3.3-70b-versatile";

  if (!apiKey) {
    throw new Error(
      "Missing EXPO_PUBLIC_GROQ_API_KEY. Add it to your .env file (see .env.example)."
    );
  }

  const messages = [
    { role: "system", content: buildLifeEventSystemPrompt(journeys, services) },
    ...history,
    { role: "user", content: userMessage },
  ];

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages, temperature: 0.2, max_tokens: 400 }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Groq API error (${response.status}): ${text}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't generate a response.";
}

/**
 * Send a chat message, grounded in a specific service's verified data.
 * @param {string} userMessage
 * @param {object|null} service - the service document currently open, or null for global chat
 * @param {Array<{role: string, content: string}>} history - prior turns (optional)
 */
export async function askIndiaAssist(userMessage, service = null, history = []) {
  const apiKey = process.env.EXPO_PUBLIC_GROQ_API_KEY;
  const model = process.env.EXPO_PUBLIC_GROQ_MODEL || "llama-3.3-70b-versatile";

  if (!apiKey) {
    throw new Error(
      "Missing EXPO_PUBLIC_GROQ_API_KEY. Add it to your .env file (see .env.example)."
    );
  }

  const messages = [
    { role: "system", content: buildSystemPrompt(service) },
    ...history,
    { role: "user", content: userMessage },
  ];

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.2,
      max_tokens: 600,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Groq API error (${response.status}): ${text}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't generate a response.";
}
