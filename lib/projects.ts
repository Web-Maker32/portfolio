import { getSupabaseBrowserClient } from "@/lib/supabase";
import { projects as defaultProjects, type Project, type ProjectCategory } from "@/data/projects";

export type ProjectDraft = Omit<Project, "id">;

type ProjectRow = {
  id: number | string;
  title: string;
  description: string;
  details: string;
  category: ProjectCategory;
  tags: string[];
  url: string;
  github_url: string;
  preview_image: string;
  card_image_light: string | null;
  card_image_dark: string | null;
  featured: boolean;
};

export function mapProjectRow(row: ProjectRow): Project {
  return {
    id: Number(row.id),
    title: row.title,
    description: row.description,
    details: row.details,
    category: row.category,
    tags: row.tags,
    url: row.url,
    githubUrl: row.github_url,
    previewImage: row.preview_image,
    cardImageLight: row.card_image_light ?? undefined,
    cardImageDark: row.card_image_dark ?? undefined,
    featured: row.featured,
  };
}

export function toProjectRow(project: ProjectDraft) {
  return {
    title: project.title,
    description: project.description,
    details: project.details,
    category: project.category,
    tags: project.tags,
    url: project.url,
    github_url: project.githubUrl,
    preview_image: project.previewImage,
    card_image_light: project.cardImageLight ?? null,
    card_image_dark: project.cardImageDark ?? null,
    featured: project.featured ?? false,
  };
}

export async function fetchProjects() {
  const client = getSupabaseBrowserClient();
  if (!client) {
    return {
      projects: defaultProjects,
      error: "Supabase is not configured. Add the public Supabase URL and publishable key.",
    };
  }

  const { data, error } = await client.from("projects").select("*").order("id", { ascending: true });
  if (error) {
    console.error("Project query failed:", error.message);
    return {
      projects: defaultProjects,
      error: "Could not load the projects table. Check the Supabase table and public read policy.",
    };
  }

  return { projects: (data as ProjectRow[]).map(mapProjectRow), error: null };
}
