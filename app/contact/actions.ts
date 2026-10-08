"use server";

import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { headers } from "next/headers";
import { z } from "zod";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import { contactMessageSchema } from "@/lib/contact-validation";

export type ActionState = {
  success: boolean;
  error?: string | null;
  fieldErrors?: Record<string, string>;
};

async function notifyByResend(data: z.infer<typeof contactMessageSchema>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_NOTIFY_EMAIL;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !to || !from) return;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `New portfolio message: ${data.name}`,
      text: [`Name: ${data.name}`, `Email: ${data.email}`, "", data.message].join("\n"),
    }),
  });

  if (!response.ok) {
    console.error("Resend error:", await response.text());
  }
}

export async function submitContactMessage(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (getFormString(formData, "company_website").trim()) {
    return { success: true, error: null };
  }

  const validation = contactMessageSchema.safeParse({
    name: getFormString(formData, "name"),
    email: getFormString(formData, "email"),
    message: getFormString(formData, "message"),
  });

  if (!validation.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of validation.error.issues) {
      const field = issue.path[0];
      if (field) fieldErrors[String(field)] = issue.message;
    }

    return {
      success: false,
      fieldErrors,
      error: "Please correct the highlighted fields above.",
    };
  }

  const payload = {
    ...validation.data,
    email: validation.data.email.toLowerCase(),
  };

  try {
    const admin = getSupabaseAdminClient();
    if (!admin) {
      return {
        success: false,
        error: "The message inbox is not configured yet. Please try again later.",
      };
    }

    const rateLimit = await checkContactRateLimit(admin);
    if (!rateLimit.allowed) {
      return { success: false, error: rateLimit.error };
    }

    const { error: databaseError } = await admin.from("website_inquiries").insert({
      name: payload.name,
      email: payload.email,
      message: payload.message,
      source: "contact_form",
      status: "new",
    });

    if (databaseError) {
      console.error("Contact message save failed:", databaseError.message);
      return {
        success: false,
        error: "Could not save your message. Please try again later.",
      };
    }

    try {
      await notifyByResend(payload);
    } catch (error) {
      console.error("Contact message notification failed:", error);
    }

    return { success: true, error: null };
  } catch (error) {
    console.error("Contact message action failed:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}

async function checkContactRateLimit(
  admin: NonNullable<ReturnType<typeof getSupabaseAdminClient>>,
) {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const ipAddress =
    requestHeaders.get("x-real-ip")?.trim() ||
    forwardedFor?.split(",").at(-1)?.trim();

  if (!ipAddress && process.env.NODE_ENV !== "production") {
    return { allowed: true, error: null };
  }

  const secret = process.env.CONTACT_RATE_LIMIT_SECRET;
  if (!ipAddress || isIP(ipAddress) === 0 || !secret) {
    console.error("Contact rate limit requires the trusted client IP and CONTACT_RATE_LIMIT_SECRET.");
    return {
      allowed: false,
      error: "The message form is temporarily unavailable. Please try again later.",
    };
  }

  const keyHash = createHmac("sha256", secret).update(ipAddress).digest("hex");
  const { data, error } = await admin.rpc("consume_contact_rate_limit", {
    p_key_hash: keyHash,
    p_now: new Date().toISOString(),
    p_max_requests: 5,
    p_window_seconds: 900,
  });

  if (error) {
    console.error("Contact rate-limit check failed:", error.message);
    return {
      allowed: false,
      error: "The message form is temporarily unavailable. Please try again later.",
    };
  }

  return data === true
    ? { allowed: true, error: null }
    : { allowed: false, error: "Too many messages were sent from this network. Please try again later." };
}

function getFormString(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}
