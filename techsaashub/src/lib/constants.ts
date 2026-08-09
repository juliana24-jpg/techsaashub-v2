export const siteConfig = {
  name: "TechSaaShub",
  tagline: "Free tools. Sharp insight. Zero fluff.",
  description:
    "TechSaaShub is a free AI, SEO and developer tools platform paired with in-depth technology coverage — built for founders, marketers and engineers who ship.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://techsaashub.com",
  ogImage: "/og-cover.png",
  supportEmail: "hello@techsaashub.com",
  links: {
    twitter: "https://twitter.com/techsaashub",
    github: "https://github.com/techsaashub",
    linkedin: "https://linkedin.com/company/techsaashub",
  },
  keywords: [
    "free SEO tools",
    "AI writing tools",
    "developer tools online",
    "meta title generator",
    "JSON formatter",
    "technology blog",
    "SaaS tools",
  ],
} as const;

export type ToolCategory = "seo" | "ai" | "developer" | "image" | "pdf";

// Tool counts reflect the actual planned catalog (see project brief), not placeholder numbers.
export const toolCategories: Array<{
  slug: ToolCategory;
  name: string;
  description: string;
  toolCount: number;
}> = [
  { slug: "seo", name: "SEO", description: "Rank higher with technical, on-page SEO utilities.", toolCount: 9 },
  { slug: "ai", name: "AI", description: "Generate copy, titles and outlines in seconds.", toolCount: 4 },
  { slug: "developer", name: "Developer", description: "Everyday utilities for shipping code faster.", toolCount: 12 },
  { slug: "image", name: "Image", description: "Compress, convert, resize and crop images.", toolCount: 4 },
  { slug: "pdf", name: "PDF", description: "Merge, split and compress PDF files.", toolCount: 3 },
];

export const totalToolCount = toolCategories.reduce((sum, c) => sum + c.toolCount, 0);

export function getCategoryName(slug: ToolCategory): string {
  return toolCategories.find((category) => category.slug === slug)?.name ?? slug;
}
