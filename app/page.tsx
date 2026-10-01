import Link from "next/link";
import Card from "@/components/card";
import ThemeImage from "@/components/ThemeImage";
import { packages, site } from "@/data/site";
import { fetchProjects } from "@/lib/projects";

export const revalidate = 0;

export const metadata = {
  title: "Home",
  description: `${site.tagline}. Fixed PKR packages. ${site.responseTime}.`,
};

export default async function Home() {
  const projectData = await fetchProjects();
  const visibleProjects = projectData.projects;
  const featured = visibleProjects.find((p) => p.featured) ?? visibleProjects[0];

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="animate-fade-up grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/80 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="p-8 sm:p-10 lg:p-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
            {site.name}
          </p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl sm:leading-tight">
            Websites that feel premium.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Modern websites for businesses, creators, and personal brands.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Request a website
            </Link>
            <Link
              href="/about/projects"
              className="rounded-xl border border-slate-300 bg-transparent px-6 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200"
            >
              See work
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
              {site.availability}
            </span>
            <span>{site.responseTime}</span>
          </div>
        </div>

        <div className="bg-slate-100 p-3 dark:bg-slate-950">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-900">
            {featured ? (
              <ThemeImage
                lightSrc={featured.cardImageLight ?? featured.previewImage}
                darkSrc={featured.cardImageDark ?? featured.previewImage}
                alt={`${featured.title} preview`}
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
              />
            ) : null}
            <p className="absolute bottom-3 left-3 rounded-lg bg-slate-950/70 px-2.5 py-1 text-xs font-medium text-white">
              Latest: {featured?.title}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6 dark:border-blue-950/60 dark:from-slate-900 dark:to-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
              Website request
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
              Need a website for your brand?
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            Request a website
          </Link>
        </div>
      </section>

      {/* Process */}
      <section>
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
          How it works
        </p>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Brief → Build → Launch
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            ["1. Brief", "Tell me the pages, budget, and deadline. I reply within 24 hours."],
            ["2. Build", "You get a first draft in about 7 days, then we revise."],
            ["3. Launch", "Goes live on Vercel with your domain and a working contact path."],
          ].map(([title, body]) => (
            <Card key={title}>
              <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section>
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
          Packages
        </p>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          What the money buys
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="flex h-full flex-col">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{pkg.name}</h3>
              <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                {pkg.price}
              </p>
              <p className="text-xs text-slate-500">{pkg.timeline}</p>
              <ul className="mt-3 flex-1 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                {pkg.includes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <Link
                href={`/contact?package=${pkg.id}`}
                className="mt-4 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
              >
                Request this package →
              </Link>
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
                Proof
              </p>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {featured.title}
              </h2>
            </div>
            <Link
              href="/about/projects"
              className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              All projects →
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