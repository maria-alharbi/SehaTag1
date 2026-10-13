# SehaTag | صحة تاق — Demo

React + Vite + Tailwind demo of an NFC-linked digital health card. **All patient data is fictional.**
The opening NFC animation is a visual simulation only; the sticker just stores this site's URL.

## Run locally
```
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
```

## Deploy to Vercel (gives you the public HTTPS URL)
1. Push this folder to a new GitHub repo, then on vercel.com choose **Add New → Project**, import it, and click **Deploy** (Vercel auto-detects Vite; `vercel.json` is included).
   Or from this folder: `npx vercel --prod`.
2. Open the resulting `https://<name>.vercel.app` URL on your phone and confirm it loads.

## Program the NFC sticker
Use an app such as NFC Tools (iOS/Android) → Write → Add a record → URL → paste your Vercel URL → write to the sticker (NTAG213/215/216 work well).
Optional: append `?lang=en`, `?lang=fr` or `?lang=ur` to open in another language (default is Arabic).

## Structure
- `src/data.js` — all fictional patient data (swap for an authenticated API later)
- `src/i18n.js` — UI strings in ar / en / fr / ur
- `src/App.jsx` — splash, profile, emergency, allergies, medications, history, health info
