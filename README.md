# Ride Together: website

Cinematic marketing site for the Ride Together group-riding app.
Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Motion for React · Lucide.

This project is independent of the Flutter app and the Node.js/Socket.IO backend.

## Run locally

```bash
cd ride-together-website
npm install
npm run dev        # http://localhost:3000
```

Checks and production build:

```bash
npm run lint && npx tsc --noEmit && npm run build && npm start
```

## Configure (all optional)

Copy `.env.example` to `.env.local`. Anything left empty is simply not shown.

| Variable | Effect |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Base URL for Open Graph metadata |
| `NEXT_PUBLIC_APP_URL` | Points the "Explore" CTAs at a real app/landing URL (otherwise they scroll to the experience section) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Adds an Email link under "Get in touch" in the footer |
| `NEXT_PUBLIC_LINKEDIN_URL` / `NEXT_PUBLIC_INSTAGRAM_URL` | Adds LinkedIn / Instagram links under "Get in touch" |
| `FEEDBACK_WEBHOOK_URL` / `FEEDBACK_WEBHOOK_SECRET` | Server-only. Sends feedback-form responses to your Google Sheet (see below) |
| `NEXT_PUBLIC_GITHUB_URL` / `NEXT_PUBLIC_PRIVACY_URL` / `NEXT_PUBLIC_TERMS_URL` | Adds the matching footer links |

## Feedback responses

The form at the end of the page posts to `/api/feedback`, which forwards each response to a Google Sheet you own. Setup steps: [`docs/feedback-setup.md`](docs/feedback-setup.md). Until configured, the form says feedback isn't switched on yet.

## Deploy to Vercel

1. Push `ride-together-website` to a Git repository (GitHub/GitLab/Bitbucket).
2. In Vercel: **Add New → Project**, import the repository. If the repo also holds other projects, set **Root Directory** to `ride-together-website`.
3. The Next.js preset is detected automatically. Leave build settings at their defaults.
4. Add any environment variables from the table above under **Settings → Environment Variables**, then **Deploy**.

Or from the CLI: `npx vercel` (preview) and `npx vercel --prod`.

## Content and honesty notes

- Feature status badges ("In development" / "Planned") are set per section in `src/app/page.tsx` and `SafetySection.tsx`. Update them as features ship.
- Every mockup is labelled as illustrative. Replace them with real screenshots when available: `src/components/mockups/screens.tsx` (phone screens) and `src/components/visuals/*` (feature visuals).
- The hero is an SVG road scene (`src/components/HeroScene.tsx`) standing in for photography. To use a licensed photo, add it to `public/` and replace `<HeroScene />` in `HeroSection.tsx` with a `next/image` (`fill`, `priority`, `sizes="100vw"`).
- Copy and roles live in `src/lib/site.ts`.
