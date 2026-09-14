"use client";

import { useState, useSyncExternalStore } from "react";
import { projects as seedProjects, type Project, type ProjectCategory } from "@/data/projects";
import { logoutAdmin } from "./actions";

const projectsStorageKey = "portfolio-projects";
const projectsChangeEvent = "portfolio-projects-change";

const emptyProject: Omit<Project, "id"> = {
  title: "",
  description: "",
  details: "",
  category: "Frontend",
  tags: [],
  url: "",
  githubUrl: "",
  previewImage: "",
  cardImage: "",
  featured: false,
};

function getProjectsSnapshot() {
  if (typeof window === "undefined") return JSON.stringify(seedProjects);

  try {
    return localStorage.getItem(projectsStorageKey) ?? JSON.stringify(seedProjects);
  } catch {
    return JSON.stringify(seedProjects);
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

function saveProjects(nextProjects: Project[]) {
  try {
    localStorage.setItem(projectsStorageKey, JSON.stringify(nextProjects));
    window.dispatchEvent(new Event(projectsChangeEvent));
  } catch {
    // Keep the dashboard usable when browser storage is unavailable.
  }
}

export default function AdminDashboard() {
  const projectsSnapshot = useSyncExternalStore(
    subscribeToProjects,
    getProjectsSnapshot,
    () => JSON.stringify(seedProjects),
  );
  const projects = JSON.parse(projectsSnapshot) as Project[];
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyProject);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);

  const featuredCount = projects.filter((project) => project.featured).length;
  const categoryCount = new Set(projects.map((project) => project.category)).size;

  const updateForm = (field: keyof typeof emptyProject, value: string | boolean | string[]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const addProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.url.trim()) return;

    const nextProject: Project = {
      ...form,
      id: editingProjectId ?? Math.max(0, ...projects.map((project) => project.id)) + 1,
      title: form.title.trim(),
      description: form.description.trim(),
      details: form.details.trim() || form.description.trim(),
      tags: form.tags,
      previewImage: form.previewImage.trim() || "/projects/Screenshot%202026-08-11%20182448.png",
      cardImage: form.cardImage.trim() || form.previewImage.trim() || "/projects/Screenshot%202026-08-11%20182448.png",
      url: form.url.trim(),
      githubUrl: form.githubUrl.trim(),
    };

    saveProjects(
      editingProjectId === null
        ? [...projects, nextProject]
        : projects.map((project) => (project.id === editingProjectId ? nextProject : project)),
    );
    setForm(emptyProject);
    setEditingProjectId(null);
    setShowForm(false);
  };

  const editProject = (project: Project) => {
    setForm({ ...project });
    setEditingProjectId(project.id);
    setShowForm(true);
  };

  const toggleFeatured = (project: Project) => {
    saveProjects(
      projects.map((current) =>
        current.id === project.id ? { ...current, featured: !current.featured } : current,
      ),
    );
  };

  const removeProject = (project: Project) => {
    if (window.confirm(`Remove ${project.title} from this browser's project catalog?`)) {
      saveProjects(projects.filter((current) => current.id !== project.id));
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-xl shadow-slate-950/10 sm:px-10 sm:py-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">Portfolio studio</p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Shape the work people remember.</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Keep your project story sharp, your featured work current, and your next launch ready to publish.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">
              <span className="block text-xs uppercase tracking-wider text-slate-500">Workspace mode</span>
              <span className="mt-1 block font-semibold text-white">Local content studio</span>
            </div>
            <form action={logoutAdmin}>
              <button type="submit" className="rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/10">Log out</button>
            </form>
          </div>
        </div>
      </section>

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

        {showForm && (
          <form onSubmit={addProject} className="grid gap-5 rounded-2xl border border-cyan-200 bg-cyan-50/70 p-5 dark:border-cyan-900/60 dark:bg-cyan-950/20 sm:grid-cols-2 sm:p-7">
            <Field label="Project name" value={form.title} onChange={(value) => updateForm("title", value)} required />
            <Field label="Live URL" value={form.url} onChange={(value) => updateForm("url", value)} required />
            <Field label="GitHub URL" value={form.githubUrl} onChange={(value) => updateForm("githubUrl", value)} />
            <Field label="Preview image URL" value={form.cardImage} onChange={(value) => updateForm("cardImage", value)} />
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
          <div className="hidden grid-cols-[1fr_130px_110px_100px] gap-4 border-b border-slate-200 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 sm:grid">
            <span>Project</span><span>Category</span><span>Status</span><span>Actions</span>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {projects.map((project) => (
              <article key={project.id} className="grid gap-3 px-5 py-5 sm:grid-cols-[1fr_130px_110px_100px] sm:items-center sm:gap-4">
                <div>
                  <h3 className="font-bold text-slate-950 dark:text-white">{project.title}</h3>
                  <p className="mt-1 line-clamp-1 text-sm text-slate-500">{project.description}</p>
                </div>
                <span className="w-fit rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{project.category}</span>
                <button type="button" onClick={() => toggleFeatured(project)} className={`w-fit rounded-full px-2.5 py-1 text-xs font-bold ${project.featured ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300" : "bg-slate-100 text-slate-500 dark:bg-slate-800"}`}>
                  {project.featured ? "Featured" : "Standard"}
                </button>
                <div className="flex gap-3">
                  <button type="button" onClick={() => editProject(project)} className="w-fit text-left text-xs font-bold text-cyan-700 hover:text-cyan-500 dark:text-cyan-300">Edit</button>
                  <button type="button" onClick={() => removeProject(project)} className="w-fit text-left text-xs font-bold text-rose-600 hover:text-rose-500">Delete</button>
                </div>
              </article>
            ))}
          </div>
        </div>
        <p className="text-xs leading-5 text-slate-500">This studio currently saves changes in this browser only. Connect Supabase Auth, a projects table, and row-level security before using it as a shared production admin.</p>
      </section>
    </div>
  );
}

function Metric({ label, value, detail }: { label: string; value: number; detail: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/70">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-black text-slate-950 dark:text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{detail}</p>
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
