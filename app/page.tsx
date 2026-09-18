import Link from "next/link";
import Card from "@/components/card";
import ThemeImage from "@/components/ThemeImage";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Home",
  description:
    "Full-stack developer portfolio — modern web apps with Next.js, TypeScript, and clean UI.",
};

export default function Home() {
  const featured = projects.find((p) => p.featured) ?? projects[0];

  return (
    <div className="space-y-10">
      <section className="animate-fade-up grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/80 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="p-8 sm:p-10 lg:p-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
            Website builder
          </p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl sm:leading-tight">
            I build modern websites that make a strong first impression.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Responsive, polished websites for personal brands, businesses, and
            people ready to bring an idea online.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 active:translate-y-0"
            >
              About me
            </Link>
            <Link
              href="/about/projects"
              className="rounded-xl border border-slate-300 bg-transparent px-6 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-slate-50 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-400 dark:hover:bg-slate-800/50 dark:hover:text-blue-400 active:translate-y-0"
            >
              View work
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-slate-300 bg-transparent px-6 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-400 dark:hover:text-blue-400"
            >
              Hire me
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
            Available for new website projects
          </div>
        </div>

        <div className="bg-slate-100 p-3 dark:bg-slate-950">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-900">
            {featured ? (
              <ThemeImage
                lightSrc={featured.cardImageLight}
                darkSrc={featured.cardImageDark}
                alt={`${featured.title} preview`}
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
              />
            ) : null}
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <Card className="h-full">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Frontend + backend
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Build user-focused interfaces and connect them to robust APIs for a
              complete product experience.
            </p>
          </Card>
        </div>
        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <Card className="h-full">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Fast, modern stack
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Use Next.js, TypeScript, Tailwind CSS, and scalable patterns to keep
              projects maintainable.
            </p>
          </Card>
        </div>
      </div>

      {featured && (
        <section className="animate-fade-up" style={{ animationDelay: "0.25s" }}>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
                Featured
              </p>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Highlighted work
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
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {featured.title}
              </h3>
              <p className="mt-1 max-w-xl text-sm text-slate-600 dark:text-slate-300">
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
                target={featured.url.startsWith("http") ? "_blank" : undefined}
                rel={featured.url.startsWith("http") ? "noreferrer" : undefined}
                className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white"
              >
                Visit site
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