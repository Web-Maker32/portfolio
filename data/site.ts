export const site = {
  name: "Web Maker",
  tagline: "A web development portfolio of independent personal projects",
  city: "Pakistan",
  email: "uroojnaumaan@gmail.com", // change to your real email
  github: "https://github.com/Web-Maker32",
  linkedin: "https://www.linkedin.com/in/YOUR-PROFILE",
  whatsapp: "",
  portfolioNote: "Personal projects · No client work yet",
} as const;

export const productionSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-six-snowy-76.vercel.app";