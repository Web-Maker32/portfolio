export type ProjectCaseStudy = {
  goal: string;
  decisions: string[];
  learned: string;
  nextSteps: string[];
};

export const projectCaseStudies: Record<string, ProjectCaseStudy> = {
  "next-finance": {
    goal: "Bring balances, transactions, and budgets together in a personal finance dashboard that remains clear across screen sizes.",
    decisions: [
      "Structure the application with the Next.js App Router and TypeScript.",
      "Use Supabase for authentication and persistent account data.",
      "Validate data with Zod and make account views responsive.",
    ],
    learned:
      "This project gave me hands-on experience connecting a React interface to authentication and database-backed account data.",
    nextSteps: [
      "Add automated tests for key account and data-entry flows.",
      "Continue refining accessibility and the small-screen experience.",
    ],
  },
  "portfolio-site": {
    goal: "Create a single place to introduce myself and make my independent web projects easy to explore.",
    decisions: [
      "Build with the Next.js App Router, TypeScript, and Tailwind CSS.",
      "Support responsive layouts and switchable light and dark themes.",
      "Keep project information in structured data for easier updates.",
    ],
    learned:
      "Building this site has helped me practice accessible navigation, responsive interfaces, metadata, and connecting a contact form to a backend.",
    nextSteps: [
      "Continue testing keyboard and screen-reader accessibility.",
      "Add case studies as I complete more projects.",
    ],
  },
};
