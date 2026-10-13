# Where do feedback responses go?

The feedback form at the bottom of the site sends every response to **a Google Sheet that you own**. Each response becomes one new row, so you can open the sheet any time, filter it, make charts or download it as Excel/CSV.

No database is needed. Until you finish the setup below, the form shows an honest "Feedback isn't switched on yet" message instead of pretending to save anything.

## One-time setup (about 10 minutes)

1. **Create the sheet.** Go to sheets.google.com, make a new blank spreadsheet and name it "Ride Together responses".
2. **Add the script.** In the sheet open **Extensions → Apps Script**. Delete the default code and paste the whole of `docs/feedback-apps-script.gs`.
3. **Set a secret.** In the script, replace `CHANGE_ME_TO_A_LONG_RANDOM_STRING` with a long random string (for example 30+ random letters and numbers). Keep a copy; you need it in step 6.
4. **Deploy.** Click **Deploy → New deployment**, choose type **Web app**, set *Execute as*: **Me**, *Who has access*: **Anyone**, then **Deploy**. Approve the permissions Google asks for.
5. **Copy the Web app URL.** It looks like `https://script.google.com/macros/s/.../exec`.
6. **Give the website the two values.**
   - Locally: create `.env.local` in the project root with
     ```
     FEEDBACK_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
     FEEDBACK_WEBHOOK_SECRET=the-same-secret-from-step-3
     ```
     then restart `npm run dev`.
   - On Vercel: **Project → Settings → Environment Variables**, add the same two names and values, then **redeploy**.
7. **Test.** Submit the form on the site. A new row should appear in the `Responses` tab of your sheet.

If you change the script later, use **Deploy → Manage deployments → edit → New version** so the same URL keeps working.

## What each row contains

Time · Rides in a group · Group gets spread out · Would use the app · Note (optional) · Email (optional)

## Good to know

- These two variables are **server-only** (no `NEXT_PUBLIC_` prefix), so the URL and secret are never exposed in the browser.
- The form has a hidden honeypot field and server-side validation, which stops simple bots. For heavy traffic, add rate limiting (for example Vercel's WAF or Upstash).
- The optional email is personal data. Before sharing the site widely, add a short privacy note or policy and link it with `NEXT_PUBLIC_PRIVACY_URL`.

## Alternatives

If you would rather get responses by email or in a hosted dashboard, services such as Formspree or Web3Forms work too: point `FEEDBACK_WEBHOOK_URL` at an endpoint that accepts the same JSON, or adapt `src/app/api/feedback/route.ts`.
