import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ProjectsList from "@/app/about/projects/components/projects-list";
import ProjectListLoading from "./components/project-list-loading";
import { fetchProjects } from "@/lib/projects";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Personal Projects",
  description: "Personal web development projects, including Next Finance and this portfolio.",
};

export default async function Projects() {
  const { projects } = await fetchProjects();

  return (
    <div className="mx-auto max-w-5xl space-y-12">
      {/* Page Header */}
      <div className="animate-fade-up">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
          Personal work
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          My projects
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Independent projects I’ve built while learning frontend and full-stack development.
        </p>
      </div>

      <Suspense fallback={<ProjectListLoading />}>
        <ProjectsList projects={projects} />
      </Suspense>

      {/* Call to Action Banner */}
      <div className="animate-fade-up rounded-2xl border border-blue-500/20 bg-blue-50/50 p-8 text-center dark:border-blue-500/10 dark:bg-blue-950/20">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Curious about one of these projects?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
          Have a question about how I built one of these projects? Send me a message.
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-block rounded-xl bg-blue-600 px-6 py-3 text-xs font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
        >
          Send me a message
        </Link>
      </div>
    </div>
  );
}