"use server";

import { z } from "zod";

const websiteInquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  websiteType: z.string().min(1, "Please select a website type."),
  budget: z.string().min(1, "Please select an estimated budget."),
  timeline: z.string().min(1, "Please select an estimated timeline."),
  description: z.string().min(10, "Please provide a brief description of your project requirements."),
});

export type ContactFormState = {
  success: boolean;
  error: string | null;
};

export async function submitWebsiteInquiry(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      websiteType: formData.get("websiteType"),
      budget: formData.get("budget"),
      timeline: formData.get("timeline"),
      description: formData.get("description"),
    };

    const validatedData = websiteInquirySchema.parse(rawData);

    // Perform your backend handling here (e.g., save to Supabase or send an email alert)
    console.log("New Website Order Inquiry:", validatedData);

    return { success: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || "Validation failed.",
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}