"use client";

import { useState, useSyncExternalStore } from "react";
import Card from "@/components/card";
import { projectCategories, type Project } from "@/data/projects";
import ThemeImage from "@/components/ThemeImage";

const favoritesChangeEvent = "project-favorites-change";

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

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
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

  const query = search.trim().toLowerCase();
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      !query ||
      [project.title, project.description, project.details, ...project.tags]
        .some((value) => value.toLowerCase().includes(query));
    const matchesFavorites = !favoritesOnly || favoritedProjects[project.id];
    return matchesCategory && matchesSearch && matchesFavorites;
  });

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search projects</span>
            <svg aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects, tools, or details"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </label>
          <button
            type="button"
            onClick={() => setFavoritesOnly((value) => !value)}
            aria-pressed={favoritesOnly}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
              favoritesOnly
                ? "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200"
                : "border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 dark:border-slate-700 dark:text-slate-300"
            }`}
          >
            <span aria-hidden="true">{favoritesOnly ? "★" : "☆"}</span>
            Favorites
          </button>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            {projectCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="text-xs text-slate-500 dark:text-slate-400">
            {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
          </p>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <p className="rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-500 dark:border-slate-800">
          No projects match these filters. Try another search or category.
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
                    <div className="overflow-hidden border-b border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950 lg:w-[52%] lg:border-b-0 lg:border-r">
  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
    <ThemeImage
      lightSrc={project.cardImageLight}
      darkSrc={project.cardImageDark}
      alt={`${project.title} preview`}
      sizes="(min-width: 1024px) 50vw, 100vw"
    />
  </div>
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