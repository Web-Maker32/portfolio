export const site = {
  name: "Muhammed Hashir Ali",
  tagline: "Full-stack developer building thoughtful web experiences with React, Next.js, and TypeScript",
  city: "Pakistan",
  github: "https://github.com/Web-Maker32",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  portfolioNote: "Full-stack developer · React · Next.js · TypeScript",
} as const;

export const productionSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-six-snowy-76.vercel.app";