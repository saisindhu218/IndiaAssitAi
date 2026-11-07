# IndiaAssist AI -- free Cloudflare Worker

One small server (free Cloudflare plan) that does four jobs:

| Job | Who can use it |
|---|---|
| AI chat for the mobile app (keeps your Groq key off the phone) | any signed-in app user, 20 requests/minute each |
| **Draft with AI** for the admin dashboard | admin only |
| Fetch **official government pages** for drafts | admin only, official sites only |
| **Change watcher**: re-checks official pages and flags changes | admin only |

Everything here is free: Cloudflare Workers + KV (free plan) and Groq's free AI models.

## One-time setup (about 15 minutes)

1. Free account: https://dash.cloudflare.com/sign-up
2. In a terminal:
   ```
   cd worker
   npx wrangler login
   ```
3. Create the small storage the change watcher uses:
   ```
   npx wrangler kv namespace create WATCH
   ```
   (If your Wrangler says "unknown command", use `npx wrangler kv:namespace create WATCH`.)
   It prints an `id`. Paste it into `wrangler.toml` where it says `PASTE_KV_NAMESPACE_ID_HERE`.
4. In `wrangler.toml` set:
   - `FIREBASE_PROJECT_ID` -- your Firebase project id
   - `ADMIN_EMAIL` -- already set to your admin email; must match the one in `firestore.rules`
   - `EXTRA_ALLOWED_HOSTS` -- optional extra official sites (comma separated)
5. Store a **new** Groq key as a secret (skip if you already did this):
   ```
   npx wrangler secret put GROQ_API_KEY
   ```
6. Deploy:
   ```
   npx wrangler deploy
   ```
   It prints your address, like `https://indiaassist-ai-proxy.<your-name>.workers.dev`. The 2-minute
   schedule for the watcher is registered automatically by this command.

## Connect the app and the dashboard

- Mobile app `.env`: `EXPO_PUBLIC_AI_PROXY_URL=<your worker address>` (leave `EXPO_PUBLIC_GROQ_API_KEY=` empty)
- Admin dashboard `.env`: `VITE_AI_PROXY_URL=<the same address>`

Then restart both (`npm run start:clear` for the app, `npm run dev` for the dashboard).

## Using it

- **Draft with AI** (dashboard): enter a service name + 1-3 official page addresses -> a draft opens in the
  editor with the sources listed. You verify, tick the box, and save. Nothing publishes by itself.
- **Changes** (dashboard): click "Sync watch list from my services" once, and again after you add services.
  The worker checks ONE page every 2 minutes (so ~180 pages are all re-checked about every 6 hours). If the
  text of a page changes, it shows what the page said before and now. Page counters and "last updated"
  lines are ignored. You read the official page, update the service, and dismiss the flag.
- **Requests** (dashboard): shows what app users searched for but couldn't find.

## Free-plan limits this is designed around

- 10 ms of CPU per run: pages are converted to text in your browser (drafts) or with a tiny cheap step
  (watcher), and only one page is checked per run.
- 100,000 requests/day: chat + admin + the 720 watcher runs per day fit easily at friends-and-family scale.
- KV: 1,000 writes/day -- the watcher writes only when a page is first seen or changes.
- Groq free models have per-minute limits; drafts use about 14,000 characters of source text to stay inside them.

## What it can't do

- Read PDFs or pages that need JavaScript to show their content -- paste the text into "Draft with AI" instead.
- Judge whether a change matters. It only tells you a page changed; you decide.
- Check sites outside `.gov.in`, `.nic.in`, `.ac.in`, `.edu.in`, `.org.in` unless you add them to `EXTRA_ALLOWED_HOSTS`.

## Safety

- Every request needs a valid Firebase login; admin routes also need your exact admin email.
- The page fetcher only talks to official hosts over HTTPS, re-checks every redirect, and refuses
  IP addresses and odd ports.
- The AI is told to use only the supplied pages, and the dashboard makes you tick "I checked this draft
  against the official sources" before saving.

## Troubleshooting

- `npx wrangler tail` shows live logs.
- "Admin only" (403): `ADMIN_EMAIL` doesn't match the email you log into the dashboard with.
- "Change watching is not set up": the KV id in `wrangler.toml` is missing or wrong -- redo step 3 and deploy again.
- Drafting says the AI is busy: that's Groq's free per-minute limit; wait a minute.
- To change allowed AI models later, edit `ALLOWED_MODELS` in `index.js` and deploy again.
