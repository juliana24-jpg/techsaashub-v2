import {
  AlignJustify,
  AlignLeft,
  Binary,
  Braces,
  CalendarClock,
  Combine,
  Crop,
  ArrowRightLeft,
  FileCheck2,
  FileCog,
  FileImage,
  FileJson,
  Fingerprint,
  KeyRound,
  Link,
  Link2,
  ListTree,
  Maximize2,
  Megaphone,
  Palette,
  Percent,
  Pipette,
  QrCode,
  Regex,
  RefreshCw,
  Scissors,
  Share2,
  Sparkles,
  Type,
  UploadCloud,
  Wand2,
  type LucideIcon,
} from "lucide-react";

export const toolIcons: Record<string, LucideIcon> = {
  // SEO
  "meta-title-generator": Type,
  "meta-description-generator": AlignLeft,
  "robots-txt-generator": FileCog,
  "sitemap-generator": ListTree,
  "keyword-density-checker": Percent,
  "slug-generator": Link2,
  "canonical-url-generator": Link,
  "open-graph-generator": Share2,
  "schema-generator": Braces,

  // AI
  "ai-blog-title-generator": Wand2,
  "ai-meta-generator": Sparkles,
  "ai-paragraph-generator": AlignJustify,
  "ai-headline-generator": Megaphone,

  // Developer
  "json-formatter": FileJson,
  "json-validator": FileCheck2,
  "base64-encode-decode": Binary,
  "url-encoder": ArrowRightLeft,
  "url-decoder": RefreshCw,
  "regex-tester": Regex,
  "timestamp-converter": CalendarClock,
  "uuid-generator": Fingerprint,
  "password-generator": KeyRound,
  "qr-code-generator": QrCode,
  "color-picker": Pipette,
  "gradient-generator": Palette,

  // Image
  "image-compressor": FileImage,
  "image-converter": RefreshCw,
  "image-resizer": Maximize2,
  "image-cropper": Crop,

  // PDF
  "pdf-merge": Combine,
  "pdf-split": Scissors,
  "pdf-compress": UploadCloud,
};

export function getToolIcon(slug: string): LucideIcon {
  return toolIcons[slug] ?? FileCog;
}
