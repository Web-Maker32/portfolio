export const site = {
  name: "Web Maker",
  tagline: "Next.js websites for businesses and personal brands",
  city: "Pakistan",
  email: "hello@webmaker.dev",
  github: "https://github.com/Web-Maker32",
  linkedin: "https://www.linkedin.com/in/YOUR-PROFILE",
  whatsapp: "",
  responseTime: "Replies within 24 hours",
  availability: "Taking 1–2 new site projects",
} as const;

export const packages = [
  {
    id: "launch",
    name: "Launch",
    price: "₨25,000–₨50,000",
    timeline: "1–2 weeks",
    budgetValue: "₨25,000 - ₨50,000 (~$180)",
    timelineValue: "1 - 2 Weeks",
    includes: ["1–3 pages", "Mobile-ready layout", "Contact form", "Vercel deploy"],
  },
  {
    id: "business",
    name: "Business",
    price: "₨50,000–₨100,000",
    timeline: "2–4 weeks",
    budgetValue: "₨50,000 - ₨100,000 (~$360)",
    timelineValue: "2 - 4 Weeks",
    includes: ["5–8 pages", "WhatsApp + SEO basics", "Editable content plan", "Launch support"],
  },
  {
    id: "app",
    name: "App-style",
    price: "₨100,000+",
    timeline: "1 month+",
    budgetValue: "₨100,000 - ₨250,000 (~$900)",
    timelineValue: "1+ Month",
    includes: ["Auth + dashboard", "Database (Supabase)", "Validation + admin", "Like Next Finance"],
  },
] as const;