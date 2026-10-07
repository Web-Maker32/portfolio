export type ProjectCategory = "Full-Stack" | "Frontend";

export type Project = {
  id: number;
  title: string;
  description: string;
  details: string;
  category: ProjectCategory;
  tags: string[];
  url: string;
  githubUrl: string;
  previewImage: string;
  cardImageLight?: string;
  cardImageDark?: string;
  featured?: boolean;
};

const financeLight = "/next-finance-light.png";
const financeDark = "/next-finance-dark.png";
const portfolioLight = "/portfolio-light.png";
const portfolioDark = "/portfolio-dark.png";

export const projects: Project[] = [
  {
    id: 1,
    title: "Next Finance",
    description:
      "An independent personal finance dashboard exploring balances, transactions, budgets, and authentication.",
    details:
      "A personal full-stack project built to practice the Next.js App Router, Supabase persistence, Zod validation, charts, and responsive account views.",
    category: "Full-Stack",
    tags: ["Next.js 14", "Tailwind CSS", "Supabase", "Zod", "TypeScript"],
    url: "https://next-finance-steel.vercel.app",
    githubUrl: "https://github.com/Web-Maker32/next-finance",
    previewImage: "/next-finance.png",
    cardImageLight: financeLight,
    cardImageDark: financeDark,
    featured: true,
  },
  {
    id: 2,
    title: "Portfolio Site",
    description:
      "My personal portfolio, built to showcase independent projects and practice a polished, responsive Next.js experience.",
    details:
      "An ongoing personal project featuring a responsive layout, custom themes, a project showcase, and a contact form.",
    category: "Frontend",
    tags: ["Next.js App Router", "Tailwind CSS", "TypeScript"],
    url: "/",
    githubUrl: "https://github.com/Web-Maker32/portfolio",
    previewImage: "/portfolio.png",
    cardImageLight: portfolioLight,
    cardImageDark: portfolioDark,
    featured: false,
  },
];

export const projectCategories = ["All", "Full-Stack", "Frontend"] as const;