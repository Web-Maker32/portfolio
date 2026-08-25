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
  cardImage: string;
  featured?: boolean;
};

const financeImage = "/projects/Screenshot%202026-08-11%20182448.png";
const portfolioImage = "/projects/Screenshot%202026-08-11%20125659.png";

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
    previewImage: financeImage,
    cardImage: financeImage,
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
    previewImage: portfolioImage,
    cardImage: portfolioImage,
    featured: false,
  },
];

export const projectCategories = ["All", "Full-Stack", "Frontend"] as const;