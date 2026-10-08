import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Please enter a valid email address").max(120),
  message: z
    .string()
    .trim()
    .min(15, "Message must be at least 15 characters")
    .max(4000),
});

export type ContactField = keyof typeof contactMessageSchema.shape;

export function validateContactField(field: ContactField, value: string) {
  const result = contactMessageSchema.shape[field].safeParse(value);
  return result.success ? null : result.error.issues[0]?.message ?? "Check this field.";
}
