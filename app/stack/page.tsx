import Image from "next/image";

export const metadata = {
  title: "Tech Stack",
  description: "Technologies and tools used to build modern web applications.",
};

interface TechItem {
  title: string;
  description: string;
  image: string;
  containerBg: string;
  invertInDark: boolean;
  docsUrl: string;
}

const techStack: Record<string, TechItem[]> = {
  frontend: [
    {
      title: "Next.js",
      description: "The framework used for this portfolio and modern React apps.",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      containerBg: "bg-black text-white dark:bg-slate-800",
      invertInDark: true,
      docsUrl: "https://nextjs.org",
    },
    {
      title: "Tailwind CSS",
      description: "Utility-first styling for fast, polished UI development.",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      containerBg: "bg-cyan-50 dark:bg-cyan-950/40",
      invertInDark: false,
      docsUrl: "https://tailwindcss.com",
    },
    {
      title: "shadcn/ui",
      description: "Component library and design system patterns for consistent UI.",
      image: "https://svgl.app/library/shadcn-ui.svg",
      containerBg: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
      invertInDark: true,
      docsUrl: "https://github.com/shadcn-ui/ui",
    },
  ],
  backend: [
    {
      title: "Supabase",
      description: "Backend-as-a-service for authentication, database, and storage.",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
      containerBg: "bg-emerald-50 dark:bg-emerald-950/40",
      invertInDark: false,
      docsUrl: "https://supabase.com",
    },
  ],
  tooling: [
    {
      title: "Zod",
      description: "Runtime schema validation for safer form and API data handling.",
      image: "https://raw.githubusercontent.com/colinhacks/zod/master/logo.svg",
      containerBg: "bg-blue-50 dark:bg-blue-950/40",
      invertInDark: false,
      docsUrl: "https://zod.dev",
    },
  ],
};

function TechCard({ item, index }: { item: TechItem; index: number }) {
  return (
    <div
      className="group animate-fade-up flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex flex-col gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl p-2.5 transition-transform duration-300 group-hover:scale-110 ${item.containerBg}`}
        >
          <Image
            src={item.image.trim()}
            alt={`${item.title} logo`}
            width={32}
            height={32}
            className={`h-7 w-7 object-contain ${
              item.invertInDark ? "dark:invert" : ""
            }`}
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {item.description}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-2">
        <a
          href={item.docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-all duration-200 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:text-white"
        >
          View Docs
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

function TechSection({ title, items }: { title: string; items: TechItem[] }) {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <TechCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

export default function StackPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="animate-fade-up" style={{ animationDelay: "0s" }}>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
          Technologies
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Tech Stack
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          These are the primary tools and frameworks I use to engineer performant full-stack web applications.
        </p>
      </div>

      <TechSection title="Frontend" items={techStack.frontend} />
      <TechSection title="Backend & Services" items={techStack.backend} />
      <TechSection title="Development & Validation" items={techStack.tooling} />
    </div>
  );
}