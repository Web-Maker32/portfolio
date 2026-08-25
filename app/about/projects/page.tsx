import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ProjectsList from "@/app/about/projects/components/projects-list";
import ProjectListLoading from "./components/project-list-loading";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects featuring frontend architecture and full-stack web applications.",
};

export default function Projects() {
  return (
    <div className="mx-auto max-w-5xl space-y-12">
      {/* Page Header */}
      <div className="animate-fade-up">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
          Work Showcase
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Projects
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Selected work showing product design, frontend development, and end-to-end delivery.
        </p>
      </div>

      <Suspense fallback={<ProjectListLoading />}>
        <ProjectsList />
      </Suspense>

      {/* Call to Action Banner */}
      <div className="animate-fade-up rounded-2xl border border-blue-500/20 bg-blue-50/50 p-8 text-center dark:border-blue-500/10 dark:bg-blue-950/20">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Have a custom project in mind?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
          Fill out your project details to get a free estimate and project breakdown for your new website.
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-block rounded-xl bg-blue-600 px-6 py-3 text-xs font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
        >
          Request a Website Build
        </Link>
      </div>
    </div>
  );
}