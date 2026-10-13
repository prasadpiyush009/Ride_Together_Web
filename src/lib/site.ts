/**
 * Central site configuration and copy.
 *
 * Optional links are driven by environment variables. When a variable is not
 * set, the matching link is simply not rendered, so the site never shows a
 * placeholder that looks like a working feature.
 *
 * See `.env.example` for the full list.
 */

export type FeatureStatus = "in-development" | "planned";

export const statusLabel: Record<FeatureStatus, string> = {
  "in-development": "In development",
  planned: "Planned",
};

export const site = {
  name: "Ride Together",
  tagline: "Every Ride. Together.",
  support: "Your crew. Your route. One ride.",
  description:
    "Ride Together is a group-riding app for motorcyclists: join a ride with a code, see your crew on a shared map, follow the route and stay coordinated on the road. Currently in development.",
  copyrightYear: 2026,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Optional, real destinations. Leave unset until they exist.
  links: {
    app: process.env.NEXT_PUBLIC_APP_URL || null,
    contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
    github: process.env.NEXT_PUBLIC_GITHUB_URL || null,
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || null,
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,
    privacy: process.env.NEXT_PUBLIC_PRIVACY_URL || null,
    terms: process.env.NEXT_PUBLIC_TERMS_URL || null,
  },
} as const;

export const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Features", href: "#features" },
  { label: "Safety", href: "#safety" },
  { label: "About", href: "#about" },
] as const;

export const experienceSteps = [
  {
    n: "01",
    title: "Join with a ride code",
    body: "A Leader creates the ride and shares a code. Everyone else joins with it.",
  },
  {
    n: "02",
    title: "See the crew on the map",
    body: "Fellow riders appear on one shared map, with the route laid out ahead.",
  },
  {
    n: "03",
    title: "Stay in touch",
    body: "Group chat and quick coordination, so nobody has to pull over to ask.",
  },
  {
    n: "04",
    title: "Lead with an overview",
    body: "Leaders and Co-Leaders see the group at a glance and keep the ride together.",
  },
] as const;

export const roles = [
  {
    id: "leader",
    label: "Leader",
    summary: "Creates the ride and shares the ride code.",
    detail:
      "The Leader sets the ride up, invites the crew with a code and guides the group.",
  },
  {
    id: "co-leader",
    label: "Co-Leader",
    summary: "Supports the Leader in keeping the group together.",
    detail:
      "A Co-Leader shares the load, so the group is never depending on a single rider.",
  },
  {
    id: "rider",
    label: "Rider",
    summary: "Joins with the code and rides with the crew.",
    detail:
      "Riders join with the ride code, appear on the group map and stay in the group chat.",
  },
] as const;

export const stack = ["Flutter", "Node.js", "Socket.IO"] as const;
