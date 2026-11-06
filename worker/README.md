# IndiaAssist AI -- AI proxy (Cloudflare Worker)

Keeps your Groq API key on a server instead of inside the app, only lets
signed-in users of YOUR app use it, and limits how often each user can ask.
Free on Cloudflare's free plan (100,000 requests/day).

## One-time setup (about 10 minutes)

1. Create a free account at https://dash.cloudflare.com/sign-up
2. Open a terminal in this `worker` folder:
   ```
   cd worker
   npx wrangler login
   ```
   (a browser window opens -- approve it)
3. Open `wrangler.toml` and replace `your-firebase-project-id` with your Firebase
   project id (same as `EXPO_PUBLIC_FIREBASE_PROJECT_ID` in your `.env`).
4. Store your Groq key as a secret. Use a NEW key (the old one was shared in
   chat, so create another at https://console.groq.com/keys and delete the old):
   ```
   npx wrangler secret put GROQ_API_KEY
   ```
   Paste the key when asked.
5. Deploy:
   ```
   npx wrangler deploy
   ```
   It prints an address like `https://indiaassist-ai-proxy.<your-name>.workers.dev`.

## Connect the app

In the app's `.env`:
```
EXPO_PUBLIC_AI_PROXY_URL=https://indiaassist-ai-proxy.<your-name>.workers.dev
EXPO_PUBLIC_GROQ_API_KEY=
```
(Leave the Groq key empty so it is not bundled into the app.) If you build with
EAS, add `EXPO_PUBLIC_AI_PROXY_URL` to your EAS environment variables too and do
NOT add the Groq key there.

Restart with `npm run start:clear`, log in, and ask the assistant something.

## What it protects against

- People who aren't signed in to your app cannot use it (checked against Firebase).
- One user cannot send more than 20 requests per minute.
- Only your three allowed AI models and a small set of fields are forwarded, and
  reply length is capped.

## Notes

- The per-user limit is "best effort" (each worker instance counts separately).
  That is enough for a friends-and-family launch. For a large public launch, add
  Cloudflare's Rate Limiting rules or a Durable Object.
- To change the allowed AI models later (Groq retires models from time to time),
  edit `ALLOWED_MODELS` in `index.js` and run `npx wrangler deploy` again.
- To see errors: `npx wrangler tail`.