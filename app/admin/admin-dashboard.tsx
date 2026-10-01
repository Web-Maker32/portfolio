"use client";

import { useRef, useState } from "react";
import type { Project, ProjectCategory } from "@/data/projects";
import { logoutAdmin } from "./actions";
import {
  deleteProjectAction,
  importProjectsAction,
  restoreDefaultProjectsAction,
  saveProjectAction,
  setProjectFeaturedAction,
} from "./project-actions";

const emptyProject: Omit<Project, "id"> = {
  title: "",
  description: "",
  details: "",
  category: "Frontend",
  tags: [],
  url: "",
  githubUrl: "",
  previewImage: "",
  cardImageLight: "",
  cardImageDark: "",
  featured: false,
};

export default function AdminDashboard({
  initialProjects,
  setupError,
}: {
  initialProjects: Project[];
  setupError: string | null;
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyProject);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [notice, setNotice] = useState("");
  const importInputRef = useRef<HTMLInputElement>(null);

  const featuredCount = projects.filter((project) => project.featured).length;
  const categoryCount = new Set(projects.map((project) => project.category)).size;
  const visibleProjects = projects.filter((project) => {
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      [project.title, project.description, ...project.tags].some((value) =>
        value.toLowerCase().includes(query),
      );
    return matchesSearch && (categoryFilter === "All" || project.category === categoryFilter);
  });

  const updateForm = (field: keyof typeof emptyProject, value: string | boolean | string[]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const addProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.url.trim()) return;

    const preview = form.previewImage.trim() || form.cardImageLight?.trim() || "/projects/portfolio.png";
    const light = form.cardImageLight?.trim() || form.previewImage.trim() || "/projects/portfolio-thumb-light.png";
    const dark = form.cardImageDark?.trim() || light || "/projects/portfolio-thumb-dark.png";
    const result = await saveProjectAction(editingProjectId, {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      details: form.details.trim() || form.description.trim(),
      previewImage: preview,
      cardImageLight: light,
      cardImageDark: dark,
      url: form.url.trim(),
      githubUrl: form.githubUrl.trim(),
    });

    if (result.error || !result.value) {
      setNotice(result.error ?? "Could not save the project.");
      return;
    }

    setProjects((current) =>
      editingProjectId === null
        ? [...current, result.value!]
        : current.map((project) => project.id === editingProjectId ? result.value! : project),
    );
    setNotice(editingProjectId === null ? "Project added." : "Project updated.");
    setForm(emptyProject);
    setEditingProjectId(null);
    setShowForm(false);
  };

  const editProject = (project: Project) => {
    setForm({ ...project });
    setEditingProjectId(project.id);
    setShowForm(true);
  };

  const toggleFeatured = async (project: Project) => {
    const featured = !project.featured;
    const result = await setProjectFeaturedAction(project.id, featured);
    if (result.error) {
      setNotice(result.error);
      return;
    }
    setProjects((current) => current.map((item) => item.id === project.id ? { ...item, featured } : item));
    setNotice(featured ? "Project featured." : "Project unfeatured.");
  };

  const removeProject = async (project: Project) => {
    if (!window.confirm(`Delete ${project.title} from the project catalog?`)) return;
    const result = await deleteProjectAction(project.id);
    if (result.error) {
      setNotice(result.error);
      return;
    }
    setProjects((current) => current.filter((item) => item.id !== project.id));
    setNotice("Project deleted.");
  };

  const duplicateProject = async (project: Project) => {
    const result = await saveProjectAction(null, {
      ...project,
      title: `${project.title} (copy)`,
      featured: false,
    });
    if (result.error || !result.value) {
      setNotice(result.error ?? "Could not duplicate the project.");
      return;
    }
    setProjects((current) => [...current, result.value!]);
    setNotice("Project duplicated.");
  };

  const exportProjects = () => {
    const file = new Blob([JSON.stringify(projects, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "web-maker-projects.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importProjects = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imported: unknown = JSON.parse(await file.text());
      if (
        !Array.isArray(imported) ||
        !imported.every(
          (project) =>
            project &&
            typeof project.id === "number" &&
            typeof project.title === "string" &&
            typeof project.description === "string" &&
            typeof project.details === "string" &&
            (project.category === "Frontend" || project.category === "Full-Stack") &&
            Array.isArray(project.tags) &&
            project.tags.every((tag: unknown) => typeof tag === "string") &&
            typeof project.url === "string" &&
            typeof project.githubUrl === "string" &&
            typeof project.previewImage === "string" &&
            (project.cardImageLight === undefined || typeof project.cardImageLight === "string") &&
            (project.cardImageDark === undefined || typeof project.cardImageDark === "string") &&
            (project.featured === undefined || typeof project.featured === "boolean"),
        )
      ) {
        window.alert("That file is not a valid project backup.");
        return;
      }

      if (!window.confirm(`Add ${imported.length} projects from this backup to the catalog?`)) {
        return;
      }
      const result = await importProjectsAction(imported);
      if (result.error || !result.value) {
        setNotice(result.error ?? "Could not import the backup.");
        return;
      }
      setProjects((current) => [...current, ...result.value!]);
      setNotice(`${result.value.length} projects imported.`);
    } catch {
      setNotice("Could not read that file. Choose a valid project JSON backup.");
    } finally {
      event.target.value = "";
    }
  };

  const restoreProjects = async () => {
    if (!window.confirm("Replace the project catalog with the original projects?")) return;
    const result = await restoreDefaultProjectsAction();
    if (result.error || !result.value) {
      setNotice(result.error ?? "Could not restore the default projects.");
      return;
    }
    setProjects(result.value);
    setNotice("Default projects restored.");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-8 text-slate-950 shadow-xl shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white sm:px-10 sm:py-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">Portfolio studio</p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Shape the work people remember.</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              Keep your project story sharp, your featured work current, and your next launch ready to publish.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <span className="block text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500">Workspace mode</span>
              <span className="mt-1 block font-semibold text-slate-950 dark:text-white">
                {setupError ? "Database needs setup" : "Supabase database"}
              </span>
            </div>
            <form action={logoutAdmin}>
              <button type="submit" className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/10">Log out</button>
            </form>
          </div>
        </div>
      </section>

      {setupError && (
        <p role="alert" className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
          {setupError} The editor will use sample projects until the connection works.
        </p>
      )}
      {notice && (
        <p role="status" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          {notice}
        </p>
      )}

      <section className="grid gap-4 sm:grid-cols-3">
        <Metric label="Total projects" value={projects.length} detail="In your catalog" />
        <Metric label="Featured" value={featuredCount} detail="Highlighted on home" />
        <Metric label="Categories" value={categoryCount} detail="Frontend and full-stack" />
      </section>

      <section className="space-y-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">Content</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 dark:text-white">Project catalog</h2>
          </div>
          <button
            type="button"
            onClick={() => setShowForm((open) => !open)}
            className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-cyan-700 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-200"
          >
            {showForm ? "Close form" : "+ Add project"}
          </button>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/70 sm:flex-row sm:items-center">
          <input
            aria-label="Search projects"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search projects or tags"
            className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-cyan-500 dark:border-slate-700"
          />
          <select
            aria-label="Filter by category"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <option>All</option>
            <option>Frontend</option>
            <option>Full-Stack</option>
          </select>
          <button type="button" onClick={exportProjects} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold dark:border-slate-700">
            Export backup
          </button>
          <button type="button" onClick={() => importInputRef.current?.click()} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold dark:border-slate-700">
            Import backup
          </button>
          <input ref={importInputRef} type="file" accept="application/json,.json" onChange={importProjects} className="hidden" />
          <button type="button" onClick={restoreProjects} className="rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:text-rose-300">
            Restore defaults
          </button>
        </div>

        {showForm && (
          <form onSubmit={addProject} className="grid gap-5 rounded-2xl border border-cyan-200 bg-cyan-50/70 p-5 dark:border-cyan-900/60 dark:bg-cyan-950/20 sm:grid-cols-2 sm:p-7">
            <Field label="Project name" value={form.title} onChange={(value) => updateForm("title", value)} required />
            <Field label="Live URL" value={form.url} onChange={(value) => updateForm("url", value)} required />
            <Field label="GitHub URL" value={form.githubUrl} onChange={(value) => updateForm("githubUrl", value)} />
           <Field
  label="Preview image URL"
  value={form.previewImage}
  onChange={(value) => updateForm("previewImage", value)}
/>
<Field
  label="Card image (light)"
  value={form.cardImageLight ?? ""}
  onChange={(value) => updateForm("cardImageLight", value)}
/>
<Field
  label="Card image (dark)"
  value={form.cardImageDark ?? ""}
  onChange={(value) => updateForm("cardImageDark", value)}
/>
            <label className="space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Category
              <select
                value={form.category}
                onChange={(event) => updateForm("category", event.target.value as ProjectCategory)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900"
              >
                <option value="Frontend">Frontend</option>
                <option value="Full-Stack">Full-Stack</option>
              </select>
            </label>
            <Field label="Tags (comma separated)" value={form.tags.join(", ")} onChange={(value) => updateForm("tags", value.split(",").map((tag) => tag.trim()).filter(Boolean))} />
            <label className="space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-300 sm:col-span-2">
              Short description
              <textarea required rows={3} value={form.description} onChange={(event) => updateForm("description", event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900" />
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-300 sm:col-span-2">
              Project details
              <textarea rows={4} value={form.details} onChange={(event) => updateForm("details", event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900" />
            </label>
            <label className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <input type="checkbox" checked={form.featured} onChange={(event) => updateForm("featured", event.target.checked)} className="h-4 w-4 accent-cyan-600" />
              Feature this project
            </label>
            <div className="flex justify-end gap-3 sm:col-span-2">
              {editingProjectId !== null && <button type="button" onClick={() => { setForm(emptyProject); setEditingProjectId(null); setShowForm(false); }} className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 dark:border-slate-700 dark:text-slate-300">Cancel</button>}
              <button type="submit" className="rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-cyan-500">{editingProjectId === null ? "Save project" : "Save changes"}</button>
            </div>
          </form>
        )}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/70">
          <div className="hidden grid-cols-[minmax(0,1fr)_130px_110px_160px] gap-4 border-b border-slate-200 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 sm:grid">
            <span>Project</span><span>Category</span><span>Status</span><span>Actions</span>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {visibleProjects.map((project) => (
              <article key={project.id} className="grid gap-3 px-5 py-5 sm:grid-cols-[minmax(0,1fr)_130px_110px_160px] sm:items-center sm:gap-4">
                <div>
                  <h3 className="font-bold text-slate-950 dark:text-white">{project.title}</h3>
                  <p className="mt-1 line-clamp-1 text-sm text-slate-500 dark:text-slate-400">{project.description}</p>
                </div>
                <span className="w-fit rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{project.category}</span>
                <button type="button" onClick={() => toggleFeatured(project)} className={`w-fit rounded-full px-2.5 py-1 text-xs font-bold ${project.featured ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300" : "bg-slate-100 text-slate-500 dark:bg-slate-800"}`}>
                  {project.featured ? "Featured" : "Standard"}
                </button>
                <div className="flex flex-wrap gap-x-3 gap-y-2">
                  <button type="button" onClick={() => duplicateProject(project)} className="w-fit text-left text-xs font-bold text-slate-600 hover:text-cyan-600 dark:text-slate-300">Duplicate</button>
                  <button type="button" onClick={() => editProject(project)} className="w-fit text-left text-xs font-bold text-cyan-700 hover:text-cyan-500 dark:text-cyan-300">Edit</button>
                  <button type="button" onClick={() => removeProject(project)} className="w-fit text-left text-xs font-bold text-rose-600 hover:text-rose-500">Delete</button>
                </div>
              </article>
            ))}
            {visibleProjects.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-slate-500">No projects match these filters.</p>
            )}
          </div>
        </div>
        <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">This studio currently saves changes in this browser only. Connect Supabase Auth, a projects table, and row-level security before using it as a shared production admin.</p>
      </section>
    </div>
  );
}

function Metric({ label, value, detail }: { label: string; value: number; detail: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/70">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-black text-slate-950 dark:text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{detail}</p>
    </div>
  );
}

function Field({ label, value, onChange, required = false }: { label: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  return (
    <label className="space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
      {label}
      <input required={required} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900" />
    </label>
  );
}
