import Link from "next/link";
import Card from "@/components/card";

export const metadata = {
  title: "Portfolio",
  description: "A personal portfolio showcasing web projects, skills, and core technologies.",
};

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-500/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 sm:p-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
          Portfolio
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl sm:leading-tight">
          Hi, I’m a full-stack developer building modern web experiences.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          I design and ship polished web applications with clean UI, strong performance, and maintainable code.
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
            className="rounded-xl border border-slate-300 bg-transparent px-6 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-400 dark:hover:text-blue-400 active:translate-y-0"
          >
            View work
          </Link>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <Card className="h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Frontend + backend</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Build user-focused interfaces and connect them to robust APIs for a complete product experience.
            </p>
          </Card>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <Card className="h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Fast, modern stack</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Use Next.js, TypeScript, Tailwind CSS, and scalable patterns to keep projects maintainable.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}