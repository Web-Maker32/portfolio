export const site = {
  name: "Muhammed Hashir Ali",
  tagline: "Frontend developer focused on React, Next.js, and thoughtful user experiences",
  city: "Pakistan",
  github: "https://github.com/Web-Maker32",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  portfolioNote: "Frontend developer · React · Next.js · TypeScript",
} as const;

export const productionSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-six-snowy-76.vercel.app";