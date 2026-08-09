import type { ToolCategory } from "@/lib/constants";

export interface ToolMeta {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  /** ISO date this tool was added to the catalog. */
  addedAt: string;
  /** Editorial curation flag (not usage analytics) — mirrors what's already
   *  featured/highlighted elsewhere on the site (homepage Featured + Popular
   *  sections), kept in sync intentionally. */
  popular: boolean;
}

const LAUNCH_DATE = "2026-07-20";

// The full, real tool catalog (32 tools across 5 categories). Single source
// of truth — the homepage's featured selection, category pages, and the
// Navbar search palette all read from here so copy never drifts out of sync.
export const tools: ToolMeta[] = [
  // SEO
  {
    slug: "meta-title-generator",
    name: "Meta Title Generator",
    description: "Write titles that hit Google's pixel limit and still make people click.",
    category: "seo",
    addedAt: LAUNCH_DATE,
    popular: true,
  },
  {
    slug: "meta-description-generator",
    name: "Meta Description Generator",
    description: "Craft compelling summaries that earn the click from the search results page.",
    category: "seo",
    addedAt: LAUNCH_DATE,
    popular: false,
  },
  {
    slug: "robots-txt-generator",
    name: "Robots.txt Generator",
    description: "Control what crawlers see, rule by rule, without guessing syntax.",
    category: "seo",
    addedAt: LAUNCH_DATE,
    popular: true,
  },
  {
    slug: "sitemap-generator",
    name: "Sitemap Generator",
    description: "Generate a clean XML sitemap so search engines find every page you want indexed.",
    category: "seo",
    addedAt: LAUNCH_DATE,
    popular: true,
  },
  {
    slug: "keyword-density-checker",
    name: "Keyword Density Checker",
    description: "Check how often your target keywords appear before you over-optimize.",
    category: "seo",
    addedAt: LAUNCH_DATE,
    popular: false,
  },
  {
    slug: "slug-generator",
    name: "Slug Generator",
    description: "Turn any title into a clean, SEO-friendly URL slug instantly.",
    category: "seo",
    addedAt: LAUNCH_DATE,
    popular: false,
  },
  {
    slug: "canonical-url-generator",
    name: "Canonical URL Generator",
    description: "Point search engines to the right version of a page and avoid duplicate content.",
    category: "seo",
    addedAt: LAUNCH_DATE,
    popular: false,
  },
  {
    slug: "open-graph-generator",
    name: "Open Graph Generator",
    description: "Build the OG tags that make your links look sharp when shared.",
    category: "seo",
    addedAt: LAUNCH_DATE,
    popular: false,
  },
  {
    slug: "schema-generator",
    name: "Schema Generator",
    description: "Generate valid JSON-LD structured data without hand-writing schema markup.",
    category: "seo",
    addedAt: LAUNCH_DATE,
    popular: false,
  },

  // AI
  {
    slug: "ai-blog-title-generator",
    name: "AI Blog Title Generator",
    description: "Turn one topic into a dozen headline options worth testing.",
    category: "ai",
    addedAt: LAUNCH_DATE,
    popular: true,
  },
  {
    slug: "ai-meta-generator",
    name: "AI Meta Generator",
    description: "Generate on-brand meta titles and descriptions from a single prompt.",
    category: "ai",
    addedAt: LAUNCH_DATE,
    popular: true,
  },
  {
    slug: "ai-paragraph-generator",
    name: "AI Paragraph Generator",
    description: "Draft a first-pass paragraph on any topic to get past the blank page.",
    category: "ai",
    addedAt: LAUNCH_DATE,
    popular: false,
  },
  {
    slug: "ai-headline-generator",
    name: "AI Headline Generator",
    description: "Generate scroll-stopping headlines for landing pages, ads and posts.",
    category: "ai",
    addedAt: LAUNCH_DATE,
    popular: false,
  },

  // Developer
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Beautify, validate and minify JSON without leaving your browser tab.",
    category: "developer",
    addedAt: LAUNCH_DATE,
    popular: true,
  },
  {
    slug: "json-validator",
    name: "JSON Validator",
    description: "Catch syntax errors in JSON instantly, with the exact line called out.",
    category: "developer",
    addedAt: LAUNCH_DATE,
    popular: false,
  },
  {
    slug: "base64-encode-decode",
    name: "Base64 Encode / Decode",
    description: "Encode or decode Base64 strings and files in one click.",
    category: "developer",
    addedAt: LAUNCH_DATE,
    popular: false,
  },
  {
    slug: "url-encoder",
    name: "URL Encoder",
    description: "Percent-encode strings so they're safe to use inside a URL.",
    category: "developer",
    addedAt: LAUNCH_DATE,
    popular: false,
  },
  {
    slug: "url-decoder",
    name: "URL Decoder",
    description: "Decode percent-encoded URLs back into readable text.",
    category: "developer",
    addedAt: LAUNCH_DATE,
    popular: false,
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Test regular expressions against real strings with live match highlighting.",
    category: "developer",
    addedAt: LAUNCH_DATE,
    popular: true,
  },
  {
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    description: "Convert Unix timestamps to human-readable dates and back, in any timezone.",
    category: "developer",
    addedAt: LAUNCH_DATE,
    popular: false,
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Generate RFC-4122 compliant UUIDs, one at a time or in bulk.",
    category: "developer",
    addedAt: LAUNCH_DATE,
    popular: true,
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Cryptographically random passwords, tuned to the policy you need.",
    category: "developer",
    addedAt: LAUNCH_DATE,
    popular: true,
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description: "Turn any URL or text into a downloadable QR code.",
    category: "developer",
    addedAt: LAUNCH_DATE,
    popular: false,
  },
  {
    slug: "color-picker",
    name: "Color Picker",
    description: "Pick a color and get instant HEX, RGB and HSL values.",
    category: "developer",
    addedAt: LAUNCH_DATE,
    popular: false,
  },
  {
    slug: "gradient-generator",
    name: "Gradient Generator",
    description: "Design CSS gradients visually and copy the code straight out.",
    category: "developer",
    addedAt: LAUNCH_DATE,
    popular: false,
  },

  // Image
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Shrink PNGs and JPEGs for the web without visible quality loss.",
    category: "image",
    addedAt: LAUNCH_DATE,
    popular: true,
  },
  {
    slug: "image-converter",
    name: "Image Converter",
    description: "Convert between JPEG, PNG, WebP and AVIF in your browser.",
    category: "image",
    addedAt: LAUNCH_DATE,
    popular: true,
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    description: "Resize images to exact dimensions without distorting the original.",
    category: "image",
    addedAt: LAUNCH_DATE,
    popular: false,
  },
  {
    slug: "image-cropper",
    name: "Image Cropper",
    description: "Crop images to any aspect ratio with a precise visual editor.",
    category: "image",
    addedAt: LAUNCH_DATE,
    popular: false,
  },

  // PDF
  {
    slug: "pdf-merge",
    name: "PDF Merge",
    description: "Combine multiple PDF files into a single document in seconds.",
    category: "pdf",
    addedAt: LAUNCH_DATE,
    popular: false,
  },
  {
    slug: "pdf-split",
    name: "PDF Split",
    description: "Split a PDF into individual pages or custom page ranges.",
    category: "pdf",
    addedAt: LAUNCH_DATE,
    popular: false,
  },
  {
    slug: "pdf-compress",
    name: "PDF Compress",
    description: "Reduce PDF file size for easier sharing, without losing readability.",
    category: "pdf",
    addedAt: LAUNCH_DATE,
    popular: true,
  },
];

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): ToolMeta[] {
  return tools.filter((tool) => tool.category === category);
}

export function getPopularTools(): ToolMeta[] {
  return tools.filter((tool) => tool.popular);
}

export function getRecentlyAddedTools(limit = 8): ToolMeta[] {
  return [...tools]
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, limit);
}

export function searchTools(query: string): ToolMeta[] {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length === 0) return tools;
  return tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(trimmed) || tool.description.toLowerCase().includes(trimmed),
  );
}
