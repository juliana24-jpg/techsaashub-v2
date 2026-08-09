import type { MetadataRoute } from "next";
import { siteConfig, toolCategories } from "@/lib/constants";
import { tools } from "@/lib/tools-data";
import { posts } from "@/lib/blog-data";
import { authors } from "@/lib/authors-data";

const staticPaths = [
  { path: "", priority: 1 },
  { path: "/tools", priority: 0.9 },
  { path: "/blog", priority: 0.9 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.5 },
  { path: "/faq", priority: 0.5 },
  { path: "/changelog", priority: 0.4 },
  { path: "/press-kit", priority: 0.3 },
  { path: "/advertise", priority: 0.3 },
  { path: "/write-for-us", priority: 0.4 },
  { path: "/careers", priority: 0.3 },
  { path: "/editorial-guidelines", priority: 0.3 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
  { path: "/disclaimer", priority: 0.2 },
  { path: "/cookie-policy", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));

  const toolEntries: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${siteConfig.url}/tools/${tool.slug}`,
    lastModified: new Date(tool.addedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = toolCategories.map((category) => ({
    url: `${siteConfig.url}/category/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const authorEntries: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${siteConfig.url}/blog/author/${author.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...staticEntries, ...toolEntries, ...categoryEntries, ...blogEntries, ...authorEntries];
}
