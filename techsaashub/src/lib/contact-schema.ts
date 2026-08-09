import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  subject: z.string().min(1, "Subject is required").max(150),
  message: z
    .string()
    .min(10, "Message should be at least 10 characters")
    .max(2000, "Message is too long"),
  // Honeypot field: real users never see or fill this in (visually hidden).
  // Bots that fill every field will trip it, and we silently drop the submission.
  company: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
