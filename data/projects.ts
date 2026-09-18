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

const financeLight = "/projects/next-finance-thumb-light.png";
const financeDark = "/projects/next-finance-thumb-dark.png";
const portfolioLight = "/projects/portfolio-thumb-light.png";
const portfolioDark = "/projects/portfolio-thumb-dark.png";

export const projects: Project[] = [
  {
    id: 1,
    title: "Next Finance",
    description:
      "A finance-focused Next.js website showcasing modern UI, charts, and responsive account views.",
    details:
      "Built with Next.js App Router, Supabase for backend data persistence, Zod for robust client/server validation, and Tailwind CSS.",
    category: "Full-Stack",
    tags: ["Next.js 14", "Tailwind CSS", "Supabase", "Zod", "TypeScript"],
    url: "https://next-finance-steel.vercel.app",
    githubUrl: "https://github.com/Web-Maker32/next-finance",
    previewImage: "/projects/next-finance-thumb.png",
    cardImageLight: financeLight,
    cardImageDark: financeDark,
    featured: true,
  },
  {
    id: 2,
    title: "Portfolio Site",
    description:
      "This website, built with Next.js and Tailwind, demonstrates a clean personal portfolio and project showcase.",
    details:
      "Features Server Actions for website inquiry submissions, custom theme support, and responsive developer portfolio layouts.",
    category: "Frontend",
    tags: ["Next.js App Router", "Tailwind CSS", "TypeScript"],
    url: "/",
    githubUrl: "https://github.com/Web-Maker32/portfolio",
    previewImage: "/projects/portfoliio.png",
    cardImageLight: portfolioLight,
    cardImageDark: portfolioDark,
    featured: false,
  },
];



export const projectCategories = ["All", "Full-Stack", "Frontend"] as const;