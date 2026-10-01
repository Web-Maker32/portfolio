"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { projects as defaultProjects, type Project } from "@/data/projects";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import { mapProjectRow, toProjectRow, type ProjectDraft } from "@/lib/projects";
import { hasAdminSession } from "./actions";

const ProjectDraftSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(500),
  details: z.string().trim().min(1).max(4000),
  category: z.enum(["Frontend", "Full-Stack"]),
  tags: z.array(z.string().trim().min(1).max(40)).max(20),
  url: z.string().trim().min(1).max(2048),
  githubUrl: z.string().trim().max(2048),
  previewImage: z.string().trim().max(2048),
  cardImageLight: z.string().trim().max(2048).optional(),
  cardImageDark: z.string().trim().max(2048).optional(),
  featured: z.boolean().default(false),
});

const BackupSchema = z.array(
  ProjectDraftSchema.extend({ id: z.number().int().positive() }),
).max(500);

type AdminResult<T = undefined> = {
  error: string | null;
  value?: T;
};

async function getAdminClient() {
  if (!(await hasAdminSession())) {
    return { client: null, error: "Your admin session expired. Please sign in again." };
  }
  const client = getSupabaseAdminClient();
  if (!client) {
    return { client: null, error: "Supabase admin access is not configured on the server." };
  }
  return { client, error: null };
}

function revalidateProjects() {
  revalidatePath("/");
  revalidatePath("/about/projects");
}

export async function saveProjectAction(
  id: number | null,
  input: ProjectDraft,
): Promise<AdminResult<Project>> {
  const parsed = ProjectDraftSchema.safeParse(input);
  if (!parsed.success) return { error: "Check the project fields and try again." };

  const { client, error } = await getAdminClient();
  if (!client) return { error };

  const query = id === null
    ? client.from("projects").insert(toProjectRow(parsed.data))
    : client.from("projects").update(toProjectRow(parsed.data)).eq("id", id);
  const { data, error: dbError } = await query.select("*").single();
  if (dbError) {
    console.error("Project save failed:", dbError.message);
    return { error: "Could not save the project. Check the projects table and try again." };
  }

  revalidateProjects();
  return { error: null, value: mapProjectRow(data) };
}

export async function deleteProjectAction(id: number): Promise<AdminResult> {
  const { client, error } = await getAdminClient();
  if (!client) return { error };
  const { error: dbError } = await client.from("projects").delete().eq("id", id);
  if (dbError) {
    console.error("Project deletion failed:", dbError.message);
    return { error: "Could not delete the project." };
  }
  revalidateProjects();
  return { error: null };
}

export async function setProjectFeaturedAction(
  id: number,
  featured: boolean,
): Promise<AdminResult> {
  const { client, error } = await getAdminClient();
  if (!client) return { error };
  const { error: dbError } = await client.from("projects").update({ featured }).eq("id", id);
  if (dbError) {
    console.error("Project update failed:", dbError.message);
    return { error: "Could not update the featured status." };
  }
  revalidateProjects();
  return { error: null };
}

export async function importProjectsAction(input: unknown): Promise<AdminResult<Project[]>> {
  const parsed = BackupSchema.safeParse(input);
  if (!parsed.success) return { error: "That file is not a valid project backup." };

  const { client, error } = await getAdminClient();
  if (!client) return { error };
  const rows = parsed.data.map(toProjectRow);
  if (rows.length === 0) return { error: "The backup does not contain any projects." };

  const { data, error: dbError } = await client.from("projects").insert(rows).select("*");
  if (dbError) {
    console.error("Project import failed:", dbError.message);
    return { error: "Could not import these projects." };
  }
  revalidateProjects();
  return { error: null, value: (data as Parameters<typeof mapProjectRow>[0][]).map(mapProjectRow) };
}

export async function restoreDefaultProjectsAction(): Promise<AdminResult<Project[]>> {
  const { client, error } = await getAdminClient();
  if (!client) return { error };

  const { data: existing, error: readError } = await client.from("projects").select("id");
  if (readError) return { error: "Could not read the current project catalog." };

  const { data: defaults, error: insertError } = await client
    .from("projects")
    .insert(defaultProjects.map(toProjectRow))
    .select("*");
  if (insertError) {
    console.error("Default project restore failed:", insertError.message);
    return { error: "Could not restore the default projects." };
  }

  const oldIds = (existing ?? []).map((project) => project.id);
  if (oldIds.length) {
    const { error: deleteError } = await client.from("projects").delete().in("id", oldIds);
    if (deleteError) {
      console.error("Old project cleanup failed:", deleteError.message);
      return { error: "Defaults were added, but some previous projects could not be removed." };
    }
  }

  revalidateProjects();
  return { error: null, value: (defaults as Parameters<typeof mapProjectRow>[0][]).map(mapProjectRow) };
}
