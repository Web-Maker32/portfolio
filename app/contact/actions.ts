"use server";

import { z } from "zod";
import { supabase } from "@/lib/supabase";

const WebsiteInquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  websiteType: z.string().min(1, "Please select a website type"),
  budget: z.string().min(1, "Please select an estimated budget"),
  timeline: z.string().min(1, "Please select a timeframe"),
  description: z.string().min(15, "Description must be at least 15 characters"),
});

export type ActionState = {
  success: boolean;
  error?: string | null;
  fieldErrors?: Record<string, string>;
};

export async function submitWebsiteInquiry(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
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

  try {
    const { error: dbError } = await supabase.from("website_inquiries").insert([
      {
        name: validation.data.name,
        email: validation.data.email,
        website_type: validation.data.websiteType,
        budget: validation.data.budget,
        timeline: validation.data.timeline,
        description: validation.data.description,
      },
    ]);

    if (dbError) {
      console.error("Supabase error:", dbError);
      return {
        success: false,
        error: "Failed to save request to database. Please try again.",
      };
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