import type { ContentBlock } from "@/lib/blog-data";

const WORDS_PER_MINUTE = 200;

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function computeReadingTimeMinutes(content: ContentBlock[]): number {
  const wordCount = content.reduce((total, block) => {
    return total + block.text.trim().split(/\s+/).filter(Boolean).length;
  }, 0);
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export function slugifyHeading(text: string): string {
  return generateSlug(text);
}
