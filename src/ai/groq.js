// Groq chat helper.
// Every assistant in the app is grounded in the app's own verified service
// data, so the model answers from YOUR catalog instead of inventing
// government procedures. Replies follow the language the user writes in.

import { findRelevantServices } from "../firebase/firestore";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const LANGUAGE_RULE = `Language: reply in the same language the user writes in
(English, Hindi, Hinglish, Telugu, Tamil, Kannada, Marathi, Bengali, etc.) using
simple, everyday words. Keep official names, portal names, form names and
rupee amounts exactly as they appear in the data.`;

const FORMAT_RULE = `Formatting: plain text only. Use **bold** for short side
headings and key terms (e.g. **Documents needed**), numbered lists for steps and
"- " bullets for lists. No tables, no HTML, no # headings.`;

const SAFETY_RULE = `Safety: never ask for or accept Aadhaar/PAN numbers, OTPs,
passwords or bank details. Remind users that official government websites end in
.gov.in or .nic.in, and that no official agency asks for OTPs over phone or chat.`;

// Groq retires models from time to time (llama-3.3-70b-versatile was shut down
// on 16 Aug 2026). To keep the app working, we try the configured model first,
// and if Groq says it no longer exists we automatically try the next one.
const DEFAULT_MODELS = ["openai/gpt-oss-120b", "qwen/qwen3.6-27b", "openai/gpt-oss-20b"];
const RETIRED_MODELS = new Set(["llama-3.3-70b-versatile", "llama-3.1-8b-instant"]);
let workingModel = null; // remembered after the first successful call

function candidateModels() {
  const configured = process.env.EXPO_PUBLIC_GROQ_MODEL;
  const list = [];
  if (workingModel) list.push(workingModel);
  if (configured && !RETIRED_MODELS.has(configured)) list.push(configured);
  DEFAULT_MODELS.forEach((m) => list.push(m));
  return Array.from(new Set(list));
}

function isModelProblem(status, bodyText) {
  if (status === 404) return true;
  return status === 400 && /model|decommission/i.test(bodyText || "");
}

async function callGroq(messages, { temperature = 0.2, max_tokens = 500 } = {}) {
  const apiKey = process.env.EXPO_PUBLIC_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing EXPO_PUBLIC_GROQ_API_KEY. Add it to your .env file (see .env.example)."
    );
  }

  let lastError = null;

  for (const model of candidateModels()) {
    const isGptOss = model.startsWith("openai/gpt-oss");
    const body = {
      model,
      messages,
      temperature,
      // gpt-oss models "think" first and that counts against max_tokens, so
      // leave room for it and keep the thinking short.
      max_tokens: isGptOss ? Math.max(max_tokens, 1200) : max_tokens,
    };
    if (isGptOss) {
      body.reasoning_effort = "low";
      body.include_reasoning = false;
    }

    let response;
    try {
      response = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });
    } catch (e) {
      throw new Error("No internet connection. Please check your network and try again.");
    }

    if (response.status === 429) {
      throw new Error("The assistant is very busy right now. Please try again in a minute.");
    }

    if (!response.ok) {
      const text = await response.text();
      lastError = new Error(`Groq API error (${response.status}): ${text}`);
      if (isModelProblem(response.status, text)) continue; // try the next model
      throw lastError;
    }

    const data = await response.json();
    workingModel = model;
    const raw = data.choices?.[0]?.message?.content || "";
    // Some models (e.g. Qwen) may include their private thinking in <think> tags.
    const clean = raw.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
    return clean || "Sorry, I couldn't generate a response.";
  }

  throw lastError || new Error("No AI model is available right now.");
}

// ---- Prompt building blocks ----

function fullServiceBlock(service) {
  return `Overview: ${service.overview}
Eligibility: ${service.eligibility}
Required documents: ${(service.documents || []).join(", ")}
Fees: ${JSON.stringify(service.fees || {})}
Processing time: ${service.processingTime}
Online steps: ${(service.onlineSteps || []).join(" | ")}
Offline steps: ${(service.offlineSteps || []).join(" | ")}
Common mistakes: ${(service.commonMistakes || []).join(" | ")}
FAQs: ${(service.faqs || []).map((f) => `Q: ${f.q} A: ${f.a}`).join(" || ")}
Official links: ${(service.officialLinks || []).join(", ")}
Last updated: ${service.lastUpdated}`;
}

// Shorter version, so several services fit in one request without hitting
// the free tier's tokens-per-minute limit.
function compactServiceBlock(service) {
  const steps = (service.onlineSteps?.length ? service.onlineSteps : service.offlineSteps) || [];
  return `### ${service.name} (${service.department})
Overview: ${service.overview}
Eligibility: ${service.eligibility}
Documents: ${(service.documents || []).slice(0, 8).join(", ")}
Fees: ${JSON.stringify(service.fees || {})}
Time: ${service.processingTime}
Key steps: ${steps.slice(0, 6).join(" | ")}
Official: ${(service.officialLinks || []).slice(0, 2).join(", ")}
Updated: ${service.lastUpdated}`;
}

async function relevantContext(userMessage, history) {
  let found = await findRelevantServices(userMessage, 6);
  if (!found.length && history?.length) {
    const lastUser = [...history].reverse().find((m) => m.role === "user");
    if (lastUser) found = await findRelevantServices(`${lastUser.content} ${userMessage}`, 6);
  }
  return found;
}

// ---- Service page assistant (scoped to the open service) ----

function buildServicePrompt(service) {
  return `You are the IndiaAssist AI assistant, currently helping a user who
is viewing the "${service.name}" (${service.department}) service page.

Answer ONLY using the verified information below. Do not invent fees, document
lists, steps, or rules that are not present here. If the user asks something
this content does not cover, clearly say you don't have verified information
on that and point them to the official link(s) provided, instead of guessing.

--- VERIFIED SERVICE DATA (source of truth) ---
${fullServiceBlock(service)}
--- END VERIFIED SERVICE DATA ---

Keep answers short, practical, and in plain language. If the user seems to be
a first-time applicant or elderly, be extra clear and step-by-step.

${LANGUAGE_RULE}
${SAFETY_RULE}
${FORMAT_RULE}`;
}

// ---- General assistant (home screen) ----

function buildGeneralPrompt(related) {
  const data = related.length
    ? related.map(compactServiceBlock).join("\n\n")
    : "(no matching service found in the app's catalog)";

  return `You are the IndiaAssist AI assistant. Help Indian citizens with
government services and paperwork.

Answer ONLY from the verified services below. Do not invent fees, documents,
steps or rules. Name the exact service(s) you are using and tell the user they
can open that service under "Services" for the full details and official links.
If nothing below matches the question, say honestly that you don't have verified
information on it yet, suggest searching in the app or visiting the relevant
official .gov.in website, and do not guess.

--- VERIFIED SERVICES (source of truth) ---
${data}
--- END VERIFIED SERVICES ---

Keep answers short, practical and warm (about 3-6 short sentences or a brief
list). Mention "last updated" if the information might have changed.

${LANGUAGE_RULE}
${SAFETY_RULE}
${FORMAT_RULE}`;
}

// ---- Life Events assistant ----

function buildLifeEventPrompt(journeys, related) {
  const journeyList = (journeys || [])
    .map((j) => `- "${j.title}" (id: ${j.id}): ${j.description}`)
    .join("\n");

  const detailed = related.slice(0, 3).map(compactServiceBlock).join("\n\n");
  const others = related
    .slice(3)
    .map((s) => `- ${s.name} (${s.department})`)
    .join("\n");

  return `You are the IndiaAssist AI assistant on the "Life Events" screen. Users
describe what's happening in their life (e.g. "I'm having a baby", "I lost my
job") and you tell them what government services and paperwork they will need.

Guided checklists available in the app:
${journeyList || "(none yet)"}

Verified services relevant to this situation (source of truth):
${detailed || "(none found)"}
${others ? `\nOther possibly relevant services:\n${others}` : ""}

Rules:
- If the situation clearly matches a guided checklist, name it and tell the user
  to tap its chip or "View full checklist".
- Otherwise give a short, practical plan: which services to handle first, what
  documents they need and rough fees/time, using ONLY the verified data above.
- Always use the exact service names from the data so the app can link them, and
  say the user can open each one under "Services" for full steps and official links.
- If the data does not cover something, say so honestly. Never invent fees,
  steps, or rules.
- Be warm and brief (about 4-7 short lines). This may be someone's first time.

${LANGUAGE_RULE}
${SAFETY_RULE}
${FORMAT_RULE}`;
}

// ---- Public API (same names/signatures the screens already use) ----

/**
 * Chat grounded in a specific service (service page), or -- when `service` is
 * null -- a general assistant grounded in the most relevant services.
 */
export async function askIndiaAssist(userMessage, service = null, history = []) {
  const system = service
    ? buildServicePrompt(service)
    : buildGeneralPrompt(await relevantContext(userMessage, history));

  return callGroq(
    [{ role: "system", content: system }, ...history, { role: "user", content: userMessage }],
    { temperature: 0.2, max_tokens: 600 }
  );
}

/** Chat for the Life Events screen, grounded in journeys + relevant services. */
export async function askAboutLifeEvent(userMessage, journeys, services, history = []) {
  const related = await relevantContext(userMessage, history);
  return callGroq(
    [
      { role: "system", content: buildLifeEventPrompt(journeys, related) },
      ...history,
      { role: "user", content: userMessage },
    ],
    { temperature: 0.2, max_tokens: 500 }
  );
}

/** Kept for compatibility with older code. */
export async function askJourneyAssistant(userMessage, journeys = [], history = []) {
  return askAboutLifeEvent(userMessage, journeys, [], history);
}