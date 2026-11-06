// IndiaAssist AI -- AI proxy (Cloudflare Worker).
//
// The phone app sends its chat request here instead of calling Groq directly,
// so the Groq API key stays on this server and never ships inside the app.
//
// For every request the worker:
//   1. requires a valid Firebase login token (only signed-in users of YOUR app),
//   2. limits how often each user can ask (stops one person burning the quota),
//   3. only forwards a safe, whitelisted set of fields and models to Groq,
//   4. adds the secret Groq key and returns Groq's answer unchanged.
//
// Secrets / settings (see worker/README.md):
//   GROQ_API_KEY        (secret)  your Groq key
//   FIREBASE_PROJECT_ID (var)     your Firebase project id

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const JWKS_URL =
  "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";

const ALLOWED_MODELS = new Set(["openai/gpt-oss-120b", "qwen/qwen3.6-27b", "openai/gpt-oss-20b"]);
const ALLOWED_ROLES = new Set(["system", "user", "assistant"]);

const MAX_MESSAGES = 24;
const MAX_TOTAL_CHARS = 60000;
const MAX_TOKENS_CAP = 2000;

// Best-effort per-user limit (each worker instance keeps its own counters).
const RATE_LIMIT = 20; // requests...
const RATE_WINDOW_MS = 60 * 1000; // ...per minute, per user
const hits = new Map();

let jwksCache = { keys: null, fetchedAt: 0 };

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extra },
  });
}

function base64UrlToBytes(str) {
  const pad = "=".repeat((4 - (str.length % 4)) % 4);
  const bin = atob((str + pad).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

function decodeJson(part) {
  return JSON.parse(new TextDecoder().decode(base64UrlToBytes(part)));
}

async function getKeys() {
  const fresh = jwksCache.keys && Date.now() - jwksCache.fetchedAt < 60 * 60 * 1000;
  if (fresh) return jwksCache.keys;
  const res = await fetch(JWKS_URL);
  if (!res.ok) throw new Error("Could not load Google signing keys");
  const data = await res.json();
  jwksCache = { keys: data.keys, fetchedAt: Date.now() };
  return data.keys;
}

// Verifies a Firebase ID token and returns its payload (throws if invalid).
export async function verifyFirebaseToken(token, projectId, now = Date.now()) {
  const parts = (token || "").split(".");
  if (parts.length !== 3) throw new Error("Malformed token");
  const [h, p, sig] = parts;
  const header = decodeJson(h);
  const payload = decodeJson(p);

  if (header.alg !== "RS256") throw new Error("Bad algorithm");

  const keys = await getKeys();
  const jwk = keys.find((k) => k.kid === header.kid);
  if (!jwk) throw new Error("Unknown signing key");

  const key = await crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const ok = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    base64UrlToBytes(sig),
    new TextEncoder().encode(`${h}.${p}`)
  );
  if (!ok) throw new Error("Bad signature");

  const nowSec = Math.floor(now / 1000);
  if (payload.aud !== projectId) throw new Error("Wrong audience");
  if (payload.iss !== `https://securetoken.google.com/${projectId}`) throw new Error("Wrong issuer");
  if (!payload.sub) throw new Error("No subject");
  if (typeof payload.exp !== "number" || payload.exp <= nowSec) throw new Error("Token expired");
  if (typeof payload.iat === "number" && payload.iat > nowSec + 300) throw new Error("Token from the future");
  return payload;
}

function rateLimited(uid) {
  const now = Date.now();
  const recent = (hits.get(uid) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(uid, recent);
    return true;
  }
  recent.push(now);
  hits.set(uid, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(k);
  }
  return false;
}

// Builds the request body we are willing to send to Groq (or returns an error string).
export function sanitizeBody(raw) {
  if (!raw || typeof raw !== "object") return { error: "Invalid body" };
  if (!ALLOWED_MODELS.has(raw.model)) return { error: "Model not allowed" };
  if (!Array.isArray(raw.messages) || raw.messages.length === 0 || raw.messages.length > MAX_MESSAGES) {
    return { error: "Invalid messages" };
  }
  let total = 0;
  for (const m of raw.messages) {
    if (!m || !ALLOWED_ROLES.has(m.role) || typeof m.content !== "string") {
      return { error: "Invalid message" };
    }
    total += m.content.length;
  }
  if (total > MAX_TOTAL_CHARS) return { error: "Message too long" };

  const body = {
    model: raw.model,
    messages: raw.messages.map((m) => ({ role: m.role, content: m.content })),
    temperature: typeof raw.temperature === "number" ? Math.min(Math.max(raw.temperature, 0), 1) : 0.2,
    max_tokens: Math.min(Number(raw.max_tokens) || 500, MAX_TOKENS_CAP),
  };
  if (raw.model.startsWith("openai/gpt-oss")) {
    body.reasoning_effort = "low";
    body.include_reasoning = false;
  }
  return { body };
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
      });
    }
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

    if (!env.GROQ_API_KEY || !env.FIREBASE_PROJECT_ID) {
      return json({ error: "Server is not configured" }, 500);
    }

    // 1. Who is asking?
    const auth = request.headers.get("Authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    let user;
    try {
      user = await verifyFirebaseToken(token, env.FIREBASE_PROJECT_ID);
    } catch (e) {
      return json({ error: "Unauthorized" }, 401);
    }

    // 2. Not too often
    if (rateLimited(user.sub)) {
      return json({ error: "Too many requests. Please wait a minute." }, 429, { "Retry-After": "60" });
    }

    // 3. Only safe fields
    let raw;
    try {
      raw = await request.json();
    } catch (e) {
      return json({ error: "Invalid JSON" }, 400);
    }
    const { body, error } = sanitizeBody(raw);
    if (error) return json({ error }, 400);

    // 4. Forward to Groq with the secret key
    const upstream = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.GROQ_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    return new Response(upstream.body, {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("Content-Type") || "application/json" },
    });
  },
};