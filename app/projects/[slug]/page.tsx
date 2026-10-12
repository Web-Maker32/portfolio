import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectCaseStudies } from "@/data/project-case-studies";
import { getProjectSlug, projects as defaultProjects } from "@/data/projects";
import { fetchProjects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export function generateStaticParams() {
  return defaultProjects.map((project) => ({ slug: getProjectSlug(project) }));
}

async function getProject(slug: string) {
  const { projects } = await fetchProjects();
  return projects.find((project) => getProjectSlug(project) === slug);
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.previewImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const caseStudy = projectCaseStudies[slug];
  const decisions = caseStudy?.decisions ?? project.tags;

  return (
    <article className="mx-auto max-w-4xl space-y-10">
      <Link href="/projects" className="inline-flex rounded-lg py-2 text-sm font-semibold text-blue-700 hover:underline dark:text-blue-300">
        ← All projects
      </Link>

      <header>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
          {project.category} · Personal project
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          {project.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={project.url}
            target={project.url.startsWith("http") ? "_blank" : undefined}
            rel={project.url.startsWith("http") ? "noopener noreferrer" : undefined}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            {project.url.startsWith("http") ? "View live project" : "View portfolio"}
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-500 dark:border-slate-700 dark:text-slate-200"
          >
            View source code
          </a>
        </div>
      </header>

      <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
        <Image
          src={project.previewImage}
          alt={`${project.title} project screenshot`}
          width={1440}
          height={900}
          priority
          sizes="(min-width: 1024px) 896px, 100vw"
          className="h-auto w-full object-cover"
        />
        <figcaption className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
          Screenshot of {project.title}.
        </figcaption>
      </figure>

      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
              {caseStudy ? "Project focus" : "Project overview"}
            </h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              {caseStudy?.goal ?? project.details}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
              {caseStudy ? "How I built it" : "Tools used"}
            </h2>
            <ul className="mt-3 space-y-3 text-slate-600 dark:text-slate-300">
              {decisions.map((decision) => (
                <li key={decision} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  <span>{decision}</span>
                </li>
              ))}
            </ul>
          </section>
          {caseStudy && (
            <>
              <section>
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white">What I learned</h2>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{caseStudy.learned}</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Next improvements</h2>
                <ul className="mt-3 space-y-3 text-slate-600 dark:text-slate-300">
                  {caseStudy.nextSteps.map((step) => (
                    <li key={step} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Project snapshot
          </p>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Type</dt>
              <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-white">Independent project</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Area</dt>
              <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-white">{project.category}</dd>
            </div>
          </dl>
          <h2 className="mt-5 border-t border-slate-200 pt-5 font-bold text-slate-950 dark:border-slate-800 dark:text-white">Built with</h2>
          <ul className="mt-4 flex flex-wrap gap-2 md:flex-col">
            {project.tags.map((tag) => (
              <li key={tag} className="w-fit rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {tag}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </article>
  );
}
