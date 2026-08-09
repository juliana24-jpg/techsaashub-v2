import type { ToolCategory } from "@/lib/constants";

export interface BlogAuthor {
  slug: string;
  name: string;
  avatarUrl?: string;
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: ToolCategory;
  tags: string[];
  coverImage?: string;
  publishedAt: string; // ISO 8601 date
  readingTimeMinutes: number;
  author: BlogAuthor;
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string; id: string };

export interface BlogPost extends BlogPostSummary {
  content: ContentBlock[];
}

// No articles have been published yet. This will be populated once the blog
// is wired up to Supabase in a later part — intentionally left empty rather
// than filled with placeholder posts. BlogPost is a superset of
// BlogPostSummary, so this still satisfies every existing consumer.
export const posts: BlogPost[] = [];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  return posts[0];
}

export function getPostsByCategory(category: ToolCategory): BlogPost[] {
  return posts.filter((post) => post.category === category);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return posts.filter((post) => post.tags.includes(tag));
}

export function getPostsByAuthor(authorSlug: string): BlogPost[] {
  return posts.filter((post) => post.author.slug === authorSlug);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

export function getRelatedPosts(
  currentSlug: string,
  category: ToolCategory,
  limit = 3,
): BlogPostSummary[] {
  return posts
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}

export function getTableOfContents(
  post: BlogPost,
): Array<{ id: string; text: string; level: 2 | 3 }> {
  return post.content
    .filter((block): block is Extract<ContentBlock, { type: "heading" }> => block.type === "heading")
    .map((block) => ({ id: block.id, text: block.text, level: block.level }));
}
