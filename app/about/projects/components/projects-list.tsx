"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Card from "@/components/card";

type Project = {
  id: number;
  title: string;
  description: string;
  details: string;
  stargazers_count: number;
  url: string;
  previewImage: string;
  cardImage: string;
};

const financeImage = "/projects/Screenshot%202026-08-11%20182448.png";
const portfolioImage = "/projects/Screenshot%202026-08-11%20125659.png";

const projects: Project[] = [
  {
    id: 1,
    title: "Next Finance",
    description: "A finance-focused Next.js website showcasing modern UI, charts, and responsive account views.",
    details: "A modern finance dashboard with account summaries, responsive panels, and clean data visualization.",
    stargazers_count: 42,
    url: "https://next-finance-steel.vercel.app",
    previewImage: financeImage,
    cardImage: financeImage,
  },
  {
    id: 2,
    title: "Portfolio Site",
    description: "This website, built with Next.js and Tailwind, demonstrates a clean personal portfolio and project showcase.",
    details: "A responsive portfolio layout highlighting projects, skills, and tech stack.",
    stargazers_count: 58,
    url: "/",
    previewImage: portfolioImage,
    cardImage: portfolioImage,
  },
];

export default function ProjectsList() {
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const [favoritedProjects, setFavoritedProjects] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const savedFavorites = Object.fromEntries(
      Object.entries(localStorage)
        .map(([key, value]) => {
          if (key.startsWith("project-favorited-")) {
            return [Number(key.replace("project-favorited-", "")), value === "true"];
          }
          return null;
        })
        .filter(Boolean) as [number, boolean][],
    );

    setFavoritedProjects(savedFavorites);
  }, []);

  const toggleFavorite = (projectId: number) => {
    const storageKey = `project-favorited-${projectId}`;
    const nextFavorited = !favoritedProjects[projectId];

    setFavoritedProjects((current) => ({
      ...current,
      [projectId]: nextFavorited,
    }));

    localStorage.setItem(storageKey, String(nextFavorited));
  };

  return (
    <ul className="flex flex-col gap-6">
      {projects.map((project, index) => {
        const isExpanded = expandedProjectId === project.id;
        const isReverse = index % 2 === 1;
        const isFavorited = Boolean(favoritedProjects[project.id]);

        return (
          <li
            key={project.id}
            className="animate-fade-up w-full"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80">
              <div className={isReverse ? "flex flex-col lg:flex-row-reverse" : "flex flex-col lg:flex-row"}>
                <div className="overflow-hidden border-b border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950 lg:w-[52%] lg:border-b-0 lg:border-r">
                  <Image
                    src={project.cardImage}
                    alt={`${project.title} preview`}
                    width={800}
                    height={500}
                    className="h-auto w-full object-contain sm:h-64 lg:h-full lg:w-full lg:object-cover"
                    unoptimized={project.cardImage.startsWith("/projects/")}
                  />
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(project.id)}
                      className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-yellow-500 transition hover:border-yellow-400 hover:bg-yellow-50 dark:border-slate-800 dark:bg-slate-800/80 dark:hover:bg-slate-800"
                      aria-label={isFavorited ? `Remove ${project.title} from favorites` : `Add ${project.title} to favorites`}
                    >
                      <span aria-hidden="true" className="text-lg">
                        {isFavorited ? "★" : "☆"}
                      </span>
                    </button>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>

                  {isExpanded && (
                    <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{project.details}</p>
                  )}

                  <div className="mt-auto flex flex-wrap gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedProjectId((current) => (current === project.id ? null : project.id))
                      }
                      className="rounded-xl border border-slate-300 bg-transparent px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-400 dark:hover:text-blue-400"
                    >
                      {isExpanded ? "Show less" : "View details"}
                    </button>
                    <a
                      href={project.url}
                      target={project.url.startsWith("http") ? "_blank" : undefined}
                      rel={project.url.startsWith("http") ? "noreferrer" : undefined}
                      className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-500"
                    >
                      Visit site
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}