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

export function getProjectSlug(project: Pick<Project, "title">) {
  const slug = project.title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "project";
}

const financeLight = "/next-finance-light.png";
const financeDark = "/next-finance-dark.png";
const portfolioLight = "/portfolio-light.png";
const portfolioDark = "/portfolio-dark.png";

export const projects: Project[] = [
  {
    id: 1,
    title: "Next Finance",
    description:
      "A personal finance dashboard for bringing balances, transactions, and budgets into one responsive workspace.",
    details:
      "An independent full-stack project built with the Next.js App Router, Supabase, and Zod, with authenticated account views for balances, transactions, and budgets.",
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
      "A personal portfolio for presenting independent web projects through responsive pages, project case studies, and a contact form.",
    details:
      "An ongoing project built with Next.js App Router, TypeScript, and Tailwind CSS. It includes light and dark themes, project filtering, case-study pages, and a database-backed contact form.",
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