import { tools } from "@/lib/tools-data";
import { getCategoryName, toolCategories } from "@/lib/constants";
import { posts } from "@/lib/blog-data";

export interface SiteSearchResult {
  type: "page" | "tool" | "category" | "blog";
  label: string;
  description?: string;
  href: string;
}

export const staticPages: SiteSearchResult[] = [
  { type: "page", label: "Home", href: "/" },
  { type: "page", label: "All Tools", href: "/tools" },
  { type: "page", label: "Blog", href: "/blog" },
  { type: "page", label: "About", href: "/about" },
  { type: "page", label: "Contact", href: "/contact" },
  { type: "page", label: "FAQs", href: "/faq" },
  { type: "page", label: "Changelog", href: "/changelog" },
  { type: "page", label: "Write For Us", href: "/write-for-us" },
];

export const categoryResults: SiteSearchResult[] = toolCategories.map((category) => ({
  type: "category",
  label: `${category.name} Tools`,
  description: category.description,
  href: `/category/${category.slug}`,
}));

export const toolResults: SiteSearchResult[] = tools.map((tool) => ({
  type: "tool",
  label: tool.name,
  description: tool.description,
  href: `/tools/${tool.slug}`,
}));

export const blogResults: SiteSearchResult[] = posts.map((post) => ({
  type: "blog",
  label: post.title,
  description: `${getCategoryName(post.category)} — ${post.excerpt}`,
  href: `/blog/${post.slug}`,
}));

export const allSearchableResults: SiteSearchResult[] = [
  ...staticPages,
  ...categoryResults,
  ...toolResults,
  ...blogResults,
];

export function searchSite(query: string): SiteSearchResult[] {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length === 0) return [];
  return allSearchableResults.filter(
    (result) =>
      result.label.toLowerCase().includes(trimmed) ||
      result.description?.toLowerCase().includes(trimmed),
  );
}
