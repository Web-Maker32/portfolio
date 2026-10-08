export type ProjectCaseStudy = {
  goal: string;
  decisions: string[];
  learned: string;
  nextSteps: string[];
};

export const projectCaseStudies: Record<string, ProjectCaseStudy> = {
  "next-finance": {
    goal: "Build a personal finance dashboard that brings balances, transactions, and budgets into one responsive interface.",
    decisions: [
      "Use Next.js App Router and TypeScript for the application structure.",
      "Use Supabase for authentication and persistent data.",
      "Use Zod to validate data and keep account views usable across screen sizes.",
    ],
    learned:
      "This project gave me hands-on practice connecting a React interface to authentication and database-backed data.",
    nextSteps: [
      "Add automated tests for important account and data-entry flows.",
      "Keep refining the dashboard’s accessibility and small-screen experience.",
    ],
  },
  "portfolio-site": {
    goal: "Create one place to introduce myself and showcase the web projects I build while learning frontend development.",
    decisions: [
      "Use Next.js App Router, TypeScript, and Tailwind CSS.",
      "Use responsive layouts and a switchable light and dark theme.",
      "Keep project details in structured data so the showcase is easy to maintain.",
    ],
    learned:
      "Building this site has helped me practice accessible navigation, responsive UI, metadata, and connecting a contact form to a backend.",
    nextSteps: [
      "Continue improving keyboard and screen-reader testing.",
      "Add new case studies as I complete more personal projects.",
    ],
  },
};
