import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Web Maker — Next.js sites for businesses and personal brands in Pakistan.",
};

const SKILL_CATEGORIES = [
  {
    name: "Frontend Development",
    skills: ["React", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
  },
  {
    name: "Backend & Databases",
    skills: ["Node.js", "REST APIs", "PostgreSQL", "Supabase"],
  },
  {
    name: "Tools & Practices",
    skills: ["Git & GitHub", "Component Architecture", "UI/UX & Accessibility", "Performance Optimization"],
  },
];

const TIMELINE_EVENTS = [
  {
    year: "2025 – now",
    role: "Taking paid website projects",
    description:
      "Shipping Next.js sites and app-style builds (see Next Finance). Focus: App Router, clean UI, forms, and Supabase when a backend is needed.",
  },
  {
    year: "2024 – 2025",
    role: "Practice projects",
    description:
      "Learned React, TypeScript, and Tailwind by building personal apps — not a job title, a practice year.",
  },
  {
    year: "2024",
    role: "Started learning web development",
    description: "HTML, CSS, JavaScript, then Next.js.",
  },
];

function SkillCard({
  category,
  skills,
  index,
}: {
  category: string;
  skills: string[];
  index: number;
}) {
  return (
    <div
      className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 transition-colors duration-200 dark:bg-blue-950/60 dark:text-blue-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function TimelineItem({
  year,
  role,
  description,
  index,
}: {
  year: string;
  role: string;
  description: string;
  index: number;
}) {
  return (
    <div
      className="animate-fade-up relative border-l-2 border-slate-200 pb-8 pl-8 last:pb-0 dark:border-slate-800"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-blue-600 bg-white dark:border-blue-400 dark:bg-slate-950" />
      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
        {year}
      </span>
      <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{role}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default function About() {
  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <section className="animate-fade-up" style={{ animationDelay: "0s" }}>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          About Me
        </h1>
        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          I’m Web Maker. I started learning web development in 2024 and now take
          paid Next.js site work for small businesses and personal brands in
          Pakistan. I keep 1–2 projects at a time so drafts actually ship. English
          and Urdu.
        </p>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Technical Expertise
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {SKILL_CATEGORIES.map((cat, index) => (
            <SkillCard
              key={cat.name}
              category={cat.name}
              skills={cat.skills}
              index={index}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Journey & Experience
        </h2>
        <div className="mt-4">
          {TIMELINE_EVENTS.map((event, index) => (
            <TimelineItem
              key={event.year + event.role}
              year={event.year}
              role={event.role}
              description={event.description}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
}