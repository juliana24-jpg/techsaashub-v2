import { z } from "zod";

export const contentBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("paragraph"),
    text: z.string().min(1, "Paragraph text can't be empty"),
  }),
  z.object({
    type: z.literal("heading"),
    level: z.union([z.literal(2), z.literal(3)]),
    text: z.string().min(1, "Heading text can't be empty"),
    id: z.string().min(1),
  }),
]);

export const postFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(160),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(300),
  category: z.enum(["seo", "ai", "developer", "image", "pdf"]),
  tags: z.array(z.string().min(1)).default([]),
  coverImage: z.string().url().optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
  authorId: z.string().uuid("Choose an author"),
  content: z.array(contentBlockSchema).min(1, "Add at least one content block"),
});

export type PostFormValues = z.infer<typeof postFormSchema>;
