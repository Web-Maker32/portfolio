"use server";

import { z } from "zod";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

const WebsiteInquirySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Please enter a valid email address").max(120),
  phone: z.string().trim().max(40).optional(),
  websiteType: z.string().min(1, "Please select a website type"),
  budget: z.string().min(1, "Please select an estimated budget"),
  timeline: z.string().min(1, "Please select a timeframe"),
  description: z
    .string()
    .trim()
    .min(15, "Description must be at least 15 characters")
    .max(4000),
});

export type ActionState = {
  success: boolean;
  error?: string | null;
  fieldErrors?: Record<string, string>;
};

async function notifyByResend(data: z.infer<typeof WebsiteInquirySchema>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const from = process.env.RESEND_FROM ?? "Portfolio <beth.t@example.com>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `New website request: ${data.name} (${data.budget})`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.phone ? `Phone: ${data.phone}` : null,
        `Type: ${data.websiteType}`,
        `Budget: ${data.budget}`,
        `Timeline: ${data.timeline}`,
        "",
        data.description,
      ]
        .filter(Boolean)
        .join("\n"),
    }),
  });

  if (!res.ok) {
    console.error("Resend error:", await res.text());
  }
}

export async function submitWebsiteInquiry(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  if (String(formData.get("company_website") ?? "").trim()) {
    return { success: true, error: null };
  }

  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: (formData.get("phone") as string) || undefined,
    websiteType: formData.get("websiteType") as string,
    budget: formData.get("budget") as string,
    timeline: formData.get("timeline") as string,
    description: formData.get("description") as string,
  };

  const validation = WebsiteInquirySchema.safeParse(rawData);

  if (!validation.success) {
    const fieldErrors: Record<string, string> = {};
    validation.error.issues.forEach((issue) => {
      if (issue.path[0]) {
        fieldErrors[issue.path[0].toString()] = issue.message;
      }
    });

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
        error: "Leads inbox is not configured yet. Email me directly instead.",
      };
    }

    const { error: dbError } = await admin.from("website_inquiries").insert([
      {
        name: payload.name,
        email: payload.email,
        phone: payload.phone ?? null,
        website_type: payload.websiteType,
        budget: payload.budget,
        timeline: payload.timeline,
        description: payload.description,
        source: "contact_form",
        status: "new",
      },
    ]);

    if (dbError) {
      console.error("Supabase error:", dbError);
      return {
        success: false,
        error: "Failed to save request. Please try again or email me directly.",
      };
    }

    try {
      await notifyByResend(payload);
    } catch (mailErr) {
      console.error("Notify error:", mailErr);
    }

    return { success: true, error: null };
  } catch (err) {
    console.error("Action error:", err);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}