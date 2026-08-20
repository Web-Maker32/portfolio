import { Metadata } from "next";
import { Suspense } from "react";
import ProjectsList from "@/app/about/projects/components/projects-list";
import ProjectListLoading from "./components/project-list-loading";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects featuring frontend architecture and full-stack web applications.",
};

export default function Projects() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Page Header */}
      <div className="animate-fade-up">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
          Work Showcase
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Projects
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Selected work showing product design, frontend development, and end-to-end delivery[cite: 13].
        </p>
      </div>

      <Suspense fallback={<ProjectListLoading />}>
        <ProjectsList />
      </Suspense>
    </div>
  );
}