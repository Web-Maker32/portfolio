import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ProjectsList from "@/app/about/projects/components/projects-list";
import ProjectListLoading from "@/app/about/projects/components/project-list-loading";
import { fetchProjects } from "@/lib/projects";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects",
  description: "Personal web development projects by Muhammed Hashir Ali.",
};

export default async function ProjectsPage() {
  const { projects } = await fetchProjects();

  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <header>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
          Selected work
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Personal projects
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Independent projects I’ve built while developing my frontend and full-stack skills.
        </p>
      </header>

      <Suspense fallback={<ProjectListLoading />}>
        <ProjectsList projects={projects} />
      </Suspense>

      <aside className="rounded-2xl border border-blue-500/20 bg-blue-50/50 p-8 text-center dark:border-blue-500/10 dark:bg-blue-950/20">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Want to talk about my work?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
          I’m looking for a full-stack developer opportunity. Feel free to contact me about my projects.
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-block rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Contact me
        </Link>
      </aside>
    </div>
  );
}
