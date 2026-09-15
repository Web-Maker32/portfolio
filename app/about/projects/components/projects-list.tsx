"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import Card from "@/components/card";
import { projectCategories, projects } from "@/data/projects";

const favoritesChangeEvent = "project-favorites-change";
const projectsStorageKey = "portfolio-projects";
const projectsChangeEvent = "portfolio-projects-change";

function getProjectsSnapshot() {
  if (typeof window === "undefined") return JSON.stringify(projects);

  try {
    return localStorage.getItem(projectsStorageKey) ?? JSON.stringify(projects);
  } catch {
    return JSON.stringify(projects);
  }
}

function subscribeToProjects(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(projectsChangeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(projectsChangeEvent, onChange);
  };
}

function getFavoritesSnapshot() {
  if (typeof window === "undefined") return "{}";

  try {
    return JSON.stringify(
      Object.fromEntries(
        Object.entries(localStorage)
          .map(([key, value]) => {
            if (key.startsWith("project-favorited-")) {
              return [Number(key.replace("project-favorited-", "")), value === "true"] as const;
            }
            return null;
          })
          .filter(Boolean) as [number, boolean][],
      ),
    );
  } catch {
    return "{}";
  }
}

function subscribeToFavorites(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(favoritesChangeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(favoritesChangeEvent, onChange);
  };
}

export default function ProjectsList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const projectsSnapshot = useSyncExternalStore(
    subscribeToProjects,
    getProjectsSnapshot,
    () => JSON.stringify(projects),
  );
  const visibleProjects = JSON.parse(projectsSnapshot) as typeof projects;
  const favoritesSnapshot = useSyncExternalStore(
    subscribeToFavorites,
    getFavoritesSnapshot,
    () => "{}",
  );
  const favoritedProjects = JSON.parse(favoritesSnapshot) as Record<number, boolean>;

  const toggleFavorite = (projectId: number) => {
    const nextFavorited = !favoritedProjects[projectId];
    try {
      localStorage.setItem(`project-favorited-${projectId}`, String(nextFavorited));
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event(favoritesChangeEvent));
  };

  const filteredProjects =
    selectedCategory === "All"
      ? visibleProjects
      : visibleProjects.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {projectCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <p className="rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-500 dark:border-slate-800">
          No projects in this category yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-6">
          {filteredProjects.map((project, index) => {
            const isExpanded = expandedProjectId === project.id;
            const isReverse = index % 2 === 1;
            const isFavorited = Boolean(favoritedProjects[project.id]);

            return (
              <li
                key={project.id}
                className="animate-fade-up w-full"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <Card className="overflow-hidden p-0">
                  <div
                    className={
                      isReverse ? "flex flex-col lg:flex-row-reverse" : "flex flex-col lg:flex-row"
                    }
                  >
                    <div className="overflow-hidden border-b border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950 lg:w-[52%] lg:border-b-0 lg:border-r">
                      <Image
                        src={project.cardImage}
                        alt={`${project.title} preview`}
                        width={800}
                        height={500}
                        className="h-auto w-full rounded-xl border border-slate-200 bg-white object-contain shadow-sm sm:h-64 lg:h-full lg:w-full lg:object-cover dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20"
                        unoptimized={project.cardImage.startsWith("/projects/")}
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {project.title}
                          </h3>
                          {project.featured && (
                            <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                              Featured
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(project.id)}
                          className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-yellow-500 transition hover:border-yellow-400 hover:bg-yellow-50 dark:border-slate-800 dark:bg-slate-800/80 dark:hover:bg-slate-800"
                          aria-label={
                            isFavorited
                              ? `Remove ${project.title} from favorites`
                              : `Add ${project.title} to favorites`
                          }
                        >
                          <span aria-hidden="true" className="text-lg">
                            {isFavorited ? "★" : "☆"}
                          </span>
                        </button>
                      </div>

                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 py-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {isExpanded && (
                        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                          {project.details}
                        </p>
                      )}

                      <div className="mt-auto flex flex-wrap gap-3 pt-3">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedProjectId((current) =>
                              current === project.id ? null : project.id,
                            )
                          }
                          className="rounded-xl border border-slate-300 bg-transparent px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-400 dark:hover:text-blue-400"
                        >
                          {isExpanded ? "Show less" : "View details"}
                        </button>

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          Code
                        </a>

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
      )}
    </div>
  );
}