// IndiaAssist AI -- free Cloudflare Worker (one small server for everything).
//
// What it does (all on Cloudflare's free plan):
//   POST /            (also /chat)  AI chat for the app. Any signed-in user.
//   POST /draft                     AI "draft a new service" for the admin dashboard.
//   GET  /fetch?url=                fetches an OFFICIAL government page for the dashboard
//                                   (the browser can't do this itself).
//   GET  /watch/changes             pages that changed since last time (admin)
//   POST /watch/config              which pages to keep an eye on (admin)
//   POST /watch/dismiss             mark a change as reviewed (admin)
//   cron (every 2 minutes)          checks ONE watched page per run, so every watched
//                                   page is re-checked a few times a day
//
// Secrets / settings: see worker/README.md
//   GROQ_API_KEY (secret) -- FIREBASE_PROJECT_ID, ADMIN_EMAIL (vars) -- WATCH (KV binding)

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const JWKS_URL =
  "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";

const ALLOWED_MODELS = new Set(["openai/gpt-oss-120b", "qwen/qwen3.6-27b", "openai/gpt-oss-20b"]);
const ALLOWED_ROLES = new Set(["system", "user", "assistant"]);

const MAX_MESSAGES = 24;
const MAX_TOTAL_CHARS = 60000;

// Official-site hosts the dashboard may fetch / the watcher may check.
// Add more with the EXTRA_ALLOWED_HOSTS setting (comma separated).
const DEFAULT_HOST_SUFFIXES = [".gov.in", ".nic.in", ".ac.in", ".edu.in", ".org.in"];

const FETCH_MAX_BYTES = 2 * 1024 * 1024; // pages sent to the dashboard
const WATCH_MAX_BYTES = 150 * 1024; // pages read by the watcher (keeps CPU low)
const WATCH_TEXT_LIMIT = 40000;
const WATCH_STEP_MS = 2 * 60 * 1000; // must match the cron in wrangler.toml
const WATCH_MAX_URLS = 300;
const USER_AGENT = "Mozilla/5.0 (compatible; IndiaAssistBot/1.0; +official-info-check)";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Expose-Headers": "X-Final-Url",
  "Access-Control-Max-Age": "86400",
};

// Best-effort per-user limit (each worker instance keeps its own counters).
const hits = new Map();
let jwksCache = { keys: null, fetchedAt: 0 };

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS, ...extra },
  });
}

// ---------------------------------------------------------------- auth

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

export function isAdminPayload(payload, env) {
  const admin = (env.ADMIN_EMAIL || "").trim().toLowerCase();
  return !!admin && (payload.email || "").trim().toLowerCase() === admin;
}

function rateLimited(key, limit, windowMs = 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  }
  return false;
}

// ---------------------------------------------------------------- AI body checks

// Builds the request body we are willing to send to Groq (or returns an error string).
export function sanitizeBody(raw, { maxTokens = 2000 } = {}) {
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
    max_tokens: Math.min(Number(raw.max_tokens) || 500, maxTokens),
  };
  if (raw.model.startsWith("openai/gpt-oss")) {
    body.reasoning_effort = "low";
    body.include_reasoning = false;
  }
  return { body };
}

async function forwardToGroq(body, env) {
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
    headers: { "Content-Type": upstream.headers.get("Content-Type") || "application/json", ...CORS },
  });
}

// ---------------------------------------------------------------- official-site fetching

export function isAllowedUrl(urlString, env = {}) {
  let u;
  try {
    u = new URL(urlString);
  } catch (e) {
    return false;
  }
  if (u.protocol !== "https:") return false;
  if (u.username || u.password) return false;
  if (u.port && u.port !== "443") return false;
  const host = u.hostname.toLowerCase();
  if (host.includes(":") || /^[\d.]+$/.test(host) || host === "localhost") return false;
  const extra = (env.EXTRA_ALLOWED_HOSTS || "")
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
  const exact = extra.some((h) => host === h || host.endsWith("." + h));
  return exact || DEFAULT_HOST_SUFFIXES.some((s) => host.endsWith(s));
}

async function fetchOfficial(urlString, env, { maxBytes, timeoutMs = 9000 }) {
  let current = urlString;
  for (let hop = 0; hop < 4; hop++) {
    if (!isAllowedUrl(current, env)) throw new Error("That address is not an allowed official site.");
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    let res;
    try {
      res = await fetch(current, {
        redirect: "manual",
        signal: ctrl.signal,
        headers: { "User-Agent": USER_AGENT, Accept: "text/html,application/xhtml+xml,text/plain;q=0.9" },
      });
    } finally {
      clearTimeout(timer);
    }
    if ([301, 302, 303, 307, 308].includes(res.status)) {
      const loc = res.headers.get("Location");
      if (!loc) throw new Error("Bad redirect");
      current = new URL(loc, current).toString();
      continue;
    }
    if (!res.ok) throw new Error(`The site answered with status ${res.status}.`);
    const type = (res.headers.get("Content-Type") || "").toLowerCase();
    if (!/(text\/html|application\/xhtml|text\/plain)/.test(type)) {
      throw new Error("Only web pages are supported (PDFs and files are not). Paste the text instead.");
    }
    const length = Number(res.headers.get("Content-Length") || 0);
    if (length && length > maxBytes * 4) throw new Error("That page is too large.");
    return { res, finalUrl: current, type };
  }
  throw new Error("Too many redirects.");
}

function limitStream(body, maxBytes) {
  let seen = 0;
  return body.pipeThrough(
    new TransformStream({
      transform(chunk, controller) {
        seen += chunk.byteLength;
        if (seen > maxBytes) {
          controller.terminate();
          return;
        }
        controller.enqueue(chunk);
      },
    })
  );
}

// ---------------------------------------------------------------- change watcher

export function htmlToTextLite(html) {
  return html
    .replace(/<(script|style|noscript|svg|head)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#8377;|&rupee;/gi, "₹")
    .replace(/\s+/g, " ")
    .trim();
}

const NOISE = /(visitors?|hit counter|page views?|last (updated|modified|reviewed)|updated on|today'?s date|current date|copyright|©)/i;

function sentencesOf(text) {
  const out = [];
  for (const piece of text.split(/(?<=[.!?])\s+/)) {
    if (piece.length <= 300) {
      if (piece.length > 8) out.push(piece);
    } else {
      for (let i = 0; i < piece.length; i += 200) out.push(piece.slice(i, i + 200));
    }
  }
  return out;
}

// What changed between two versions of a page's text.
export function diffText(oldText, newText) {
  const a = new Set(sentencesOf(oldText));
  const b = new Set(sentencesOf(newText));
  const added = [...b].filter((s) => !a.has(s) && !NOISE.test(s));
  const removed = [...a].filter((s) => !b.has(s) && !NOISE.test(s));
  const clip = (list) => list.slice(0, 6).map((s) => (s.length > 220 ? s.slice(0, 220) + "..." : s));
  return { added: clip(added), removed: clip(removed), addedCount: added.length, removedCount: removed.length };
}

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function readCapped(res, maxBytes) {
  const reader = limitStream(res.body, maxBytes).getReader();
  const decoder = new TextDecoder();
  let text = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    text += decoder.decode(value, { stream: true });
  }
  return text;
}

export function pickWatchIndex(nowMs, count) {
  if (!count) return -1;
  return Math.floor(nowMs / WATCH_STEP_MS) % count;
}

// Checks exactly one watched page. Called by the cron every WATCH_STEP_MS.
export async function runWatchStep(env, nowMs = Date.now()) {
  if (!env.WATCH) return { skipped: "no KV" };
  const config = JSON.parse((await env.WATCH.get("watch:config")) || "[]");
  const index = pickWatchIndex(nowMs, config.length);
  if (index < 0) return { skipped: "empty list" };
  const item = config[index];

  let text;
  try {
    const { res } = await fetchOfficial(item.url, env, { maxBytes: WATCH_MAX_BYTES, timeoutMs: 8000 });
    text = htmlToTextLite(await readCapped(res, WATCH_MAX_BYTES)).slice(0, WATCH_TEXT_LIMIT);
  } catch (e) {
    return { item: item.url, error: e.message };
  }
  if (text.length < 200) return { item: item.url, skipped: "page had almost no text" };

  const key = "watch:p:" + (await sha256Hex(item.url)).slice(0, 24);
  const hash = await sha256Hex(text);
  const previous = JSON.parse((await env.WATCH.get(key)) || "null");

  if (!previous) {
    await env.WATCH.put(key, JSON.stringify({ hash, text, at: nowMs }));
    return { item: item.url, baseline: true };
  }
  if (previous.hash === hash) return { item: item.url, unchanged: true };

  const diff = diffText(previous.text, text);
  await env.WATCH.put(key, JSON.stringify({ hash, text, at: nowMs }));

  if (diff.added.length === 0 && diff.removed.length === 0) {
    return { item: item.url, ignored: "only counters/dates changed" };
  }

  const flags = JSON.parse((await env.WATCH.get("watch:flags")) || "[]").filter((f) => f.url !== item.url);
  flags.unshift({
    id: key.slice("watch:p:".length),
    serviceId: item.serviceId,
    name: item.name,
    url: item.url,
    detectedAt: nowMs,
    added: diff.added,
    removed: diff.removed,
    addedCount: diff.addedCount,
    removedCount: diff.removedCount,
  });
  await env.WATCH.put("watch:flags", JSON.stringify(flags.slice(0, 100)));
  return { item: item.url, changed: true };
}

// ---------------------------------------------------------------- router

async function authenticate(request, env) {
  const header = request.headers.get("Authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  try {
    return await verifyFirebaseToken(token, env.FIREBASE_PROJECT_ID);
  } catch (e) {
    return null;
  }
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });

    if (!env.GROQ_API_KEY || !env.FIREBASE_PROJECT_ID) {
      return json({ error: "Server is not configured" }, 500);
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";

    const user = await authenticate(request, env);
    if (!user) return json({ error: "Unauthorized" }, 401);

    // ---- AI chat for the app (any signed-in user)
    if ((path === "/" || path === "/chat") && request.method === "POST") {
      if (rateLimited(user.sub, 20)) {
        return json({ error: "Too many requests. Please wait a minute." }, 429, { "Retry-After": "60" });
      }
      let raw;
      try {
        raw = await request.json();
      } catch (e) {
        return json({ error: "Invalid JSON" }, 400);
      }
      const { body, error } = sanitizeBody(raw, { maxTokens: 2000 });
      if (error) return json({ error }, 400);
      return forwardToGroq(body, env);
    }

    // ---- everything below is for the admin only
    if (!isAdminPayload(user, env)) return json({ error: "Admin only" }, 403);

    if (path === "/draft" && request.method === "POST") {
      if (rateLimited("draft:" + user.sub, 10)) return json({ error: "Too many drafts. Wait a minute." }, 429);
      let raw;
      try {
        raw = await request.json();
      } catch (e) {
        return json({ error: "Invalid JSON" }, 400);
      }
      const { body, error } = sanitizeBody(raw, { maxTokens: 4000 });
      if (error) return json({ error }, 400);
      return forwardToGroq(body, env);
    }

    if (path === "/fetch" && request.method === "GET") {
      if (rateLimited("fetch:" + user.sub, 30)) return json({ error: "Too many requests." }, 429);
      const target = url.searchParams.get("url") || "";
      try {
        const { res, finalUrl, type } = await fetchOfficial(target, env, { maxBytes: FETCH_MAX_BYTES });
        return new Response(limitStream(res.body, FETCH_MAX_BYTES), {
          status: 200,
          headers: { "Content-Type": type, "X-Final-Url": finalUrl, ...CORS },
        });
      } catch (e) {
        return json({ error: e.message }, 400);
      }
    }

    if (path.startsWith("/watch")) {
      if (!env.WATCH) return json({ error: "Change watching is not set up (KV binding WATCH missing)." }, 501);

      if (path === "/watch/changes" && request.method === "GET") {
        const flags = JSON.parse((await env.WATCH.get("watch:flags")) || "[]");
        const config = JSON.parse((await env.WATCH.get("watch:config")) || "[]");
        return json({ flags, tracked: config.length, stepMinutes: WATCH_STEP_MS / 60000 });
      }

      if (path === "/watch/config" && request.method === "POST") {
        let raw;
        try {
          raw = await request.json();
        } catch (e) {
          return json({ error: "Invalid JSON" }, 400);
        }
        const seen = new Set();
        const accepted = [];
        let skipped = 0;
        for (const item of Array.isArray(raw?.items) ? raw.items : []) {
          if (!item || typeof item.url !== "string" || !isAllowedUrl(item.url, env) || seen.has(item.url)) {
            skipped++;
            continue;
          }
          seen.add(item.url);
          accepted.push({
            serviceId: String(item.serviceId || "").slice(0, 100),
            name: String(item.name || "").slice(0, 200),
            url: item.url,
          });
          if (accepted.length >= WATCH_MAX_URLS) break;
        }
        await env.WATCH.put("watch:config", JSON.stringify(accepted));
        return json({ tracked: accepted.length, skipped });
      }

      if (path === "/watch/dismiss" && request.method === "POST") {
        let raw;
        try {
          raw = await request.json();
        } catch (e) {
          return json({ error: "Invalid JSON" }, 400);
        }
        const flags = JSON.parse((await env.WATCH.get("watch:flags")) || "[]").filter((f) => f.id !== raw?.id);
        await env.WATCH.put("watch:flags", JSON.stringify(flags));
        return json({ ok: true });
      }
    }

    return json({ error: "Not found" }, 404);
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(
      runWatchStep(env).catch((e) => console.warn("watch step failed:", e.message))
    );
  },
};
