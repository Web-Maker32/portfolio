import Link from "next/link";
import Card from "@/components/card";
import ThemeImage from "@/components/ThemeImage";
import { site } from "@/data/site";
import { fetchProjects } from "@/lib/projects";

export const revalidate = 0;

export const metadata = {
  title: "Home",
  description: `${site.tagline}. Explore the Portfolio Website and Next Finance.`,
};

export default async function Home() {
  const projectData = await fetchProjects();
  const visibleProjects = projectData.projects;
  const featured = visibleProjects.find((p) => p.featured) ?? visibleProjects[0];

  return (
    <div className="space-y-16 pb-8">
      {/* Hero */}
      <section className="animate-fade-up relative isolate grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative z-10 flex flex-col justify-center p-8 sm:p-10 lg:p-14">
          <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
            <span className="h-px w-7 bg-blue-600 dark:bg-blue-400" />
            Personal portfolio · {site.city}
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
            Learning by <span className="text-blue-600 dark:text-blue-400">building for the web.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
            I’m learning web development through personal projects. This portfolio and Next Finance are my own builds—not client work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/about/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Explore my projects <span aria-hidden="true">↗</span>
            </Link>
            <Link
              href="/about"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-blue-300"
            >
              About me
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-200 pt-5 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span>{site.portfolioNote}</span>
          </div>
        </div>

        <div className="relative flex items-center bg-gradient-to-br from-blue-50 via-slate-100 to-cyan-100 p-4 dark:from-blue-950/50 dark:via-slate-950 dark:to-cyan-950/40 sm:p-6">
          <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="relative w-full overflow-hidden rounded-2xl border border-white/70 bg-white p-2 shadow-2xl shadow-blue-950/10 dark:border-slate-700 dark:bg-slate-900">
            <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800">
            {featured ? (
              <ThemeImage
                lightSrc={featured.cardImageLight ?? featured.previewImage}
                darkSrc={featured.cardImageDark ?? featured.previewImage}
                alt={`${featured.title} preview`}
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
              />
            ) : null}
            </div>
            {featured && (
              <div className="flex items-center justify-between gap-4 px-3 py-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Personal project</p>
                  <p className="mt-1 truncate text-sm font-bold text-slate-900 dark:text-white">{featured.title}</p>
                </div>
                <Link href="/about/projects" className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-300">
                  View work <span aria-hidden="true">→</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">What I’m exploring</p>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Learning through hands-on projects</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            ["Frontend", "Building responsive interfaces with React, Next.js, TypeScript, and Tailwind CSS."],
            ["Full-stack", "Exploring databases, authentication, validation, and data-driven app features."],
            ["The details", "Practicing accessible layouts, helpful interactions, and light and dark themes."],
          ].map(([title, body]) => (
            <Card key={title}>
              <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured proof */}
      {featured && (
        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
                Personal work
              </p>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {featured.title}
              </h2>
            </div>
            <Link
              href="/about/projects"
              className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              All personal projects →
            </Link>
          </div>
          <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="max-w-xl text-sm text-slate-600 dark:text-slate-300">
                {featured.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {featured.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={featured.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white"
              >
                Visit live
              </a>
              <Link
                href="/about/projects"
                className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
              >
                Details
              </Link>
            </div>
          </Card>
        </section>
      )}
    </div>
  );
}