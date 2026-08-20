import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about my background, technical skill set, and journey as a developer.",
};

// Data Structures
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
    year: "2025 - Present",
    role: "Full-Stack Developer",
    description: "Building production-grade Next.js applications, focusing on scalable Server Components, clean UI design, and RESTful backend integrations.",
  },
  {
    year: "2024 - 2025",
    role: "Frontend Specialist",
    description: "Focused heavily on mastering React, TypeScript, and responsive styling with Tailwind CSS while building personal web apps.",
  },
  {
    year: "2024",
    role: "Started Web Development Journey",
    description: "Began intensive self-directed learning in core web technologies (JavaScript, HTML, CSS) and foundational software design principles.",
  },
];

const SkillCard = ({ category, skills, index }: { category: string; skills: string[]; index: number }) => (
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

const TimelineItem = ({ year, role, description, index }: { year: string; role: string; description: string; index: number }) => (
  <div 
    className="animate-fade-up relative border-l-2 border-slate-200 pb-8 pl-8 last:pb-0 dark:border-slate-800"
    style={{ animationDelay: `${index * 0.15}s` }}
  >
    {/* Timeline Dot */}
    <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-blue-600 bg-white dark:border-blue-400 dark:bg-slate-950" />
    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">{year}</span>
    <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{role}</h3>
    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>
  </div>
);

export default function About() {
  return (
    <div className="mx-auto max-w-4xl space-y-12">
      {/* Intro Section */}
      <section className="animate-fade-up" style={{ animationDelay: "0s" }}>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
          Background
        </p>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          About Me
        </h1>
        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          I’m a full-stack developer with focused learning and hands-on experience building modern, fast web applications. I specialize in creating polished digital experiences with robust frontend architecture, intuitive UX, and reliable backend services.
        </p>
      </section>

      {/* Skills Grid Section */}
      <section>
        <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Technical Expertise</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {SKILL_CATEGORIES.map((cat, index) => (
            <SkillCard key={cat.name} category={cat.name} skills={cat.skills} index={index} />
          ))}
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section>
        <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Journey & Experience</h2>
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