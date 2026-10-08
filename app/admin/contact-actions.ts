"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import { hasAdminSession } from "./actions";

const ContactMessageStatusSchema = z.enum(["new", "read", "archived"]);

export type AdminContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  status: z.infer<typeof ContactMessageStatusSchema>;
  createdAt: string | null;
};

export async function getContactMessagesAction(): Promise<{
  messages: AdminContactMessage[];
  error: string | null;
}> {
  if (!(await hasAdminSession())) {
    return { messages: [], error: "Your admin session expired. Please sign in again." };
  }

  const client = getSupabaseAdminClient();
  if (!client) {
    return { messages: [], error: "Supabase admin access is not configured on the server." };
  }

  const { data, error } = await client
    .from("website_inquiries")
    .select("id, name, email, message, status, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Contact message query failed:", error.message);
    return { messages: [], error: "Could not load contact messages. Apply the latest Supabase schema." };
  }

  const messages = (data ?? []).flatMap((row) => {
    const id = Number(row.id);
    if (!Number.isSafeInteger(id) || id < 1) {
      console.error("Contact message query returned an invalid message ID.");
      return [];
    }

    const status = ContactMessageStatusSchema.safeParse(row.status);
    if (!status.success) {
      console.error(`Contact message ${id} has an unrecognized status.`);
    }

    return [{
      id,
      name: typeof row.name === "string" ? row.name : "Unknown sender",
      email: typeof row.email === "string" ? row.email : "",
      message: typeof row.message === "string" ? row.message : "",
      status: status.success ? status.data : "new",
      createdAt: typeof row.created_at === "string" ? row.created_at : null,
    }];
  });

  return {
    messages,
    error: null,
  };
}

export async function updateContactMessageStatusAction(
  id: number,
  status: string,
): Promise<{ error: string | null }> {
  const parsedId = z.number().int().positive().safeParse(id);
  const parsedStatus = ContactMessageStatusSchema.safeParse(status);
  if (!parsedId.success || !parsedStatus.success) {
    return { error: "That contact message status is invalid." };
  }

  if (!(await hasAdminSession())) {
    return { error: "Your admin session expired. Please sign in again." };
  }

  const client = getSupabaseAdminClient();
  if (!client) {
    return { error: "Supabase admin access is not configured on the server." };
  }

  const { error } = await client
    .from("website_inquiries")
    .update({ status: parsedStatus.data })
    .eq("id", parsedId.data);

  if (error) {
    console.error("Contact message status update failed:", error.message);
    return { error: "Could not update the contact message." };
  }

  revalidatePath("/admin");
  return { error: null };
}
