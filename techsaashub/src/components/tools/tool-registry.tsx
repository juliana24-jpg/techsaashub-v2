import type { ComponentType } from "react";
import { JsonFormatterTool } from "@/components/tools/implementations/JsonFormatterTool";
import { UuidGeneratorTool } from "@/components/tools/implementations/UuidGeneratorTool";
import { PasswordGeneratorTool } from "@/components/tools/implementations/PasswordGeneratorTool";
import { SlugGeneratorTool } from "@/components/tools/implementations/SlugGeneratorTool";
import { ColorPickerTool } from "@/components/tools/implementations/ColorPickerTool";

// Slugs mapped here render their real, working interactive tool. Every other
// slug in the catalog falls back to the honest "being built" ToolWorkspace
// panel — see src/components/tools/ToolWorkspace.tsx. Implementing all 32
// tools' algorithms is separate, substantial scope from the platform
// features (search/categories/favorites/copy/download) this part covers;
// this registry is exactly where the rest get added as they're built.
export const toolRegistry: Record<string, ComponentType> = {
  "json-formatter": JsonFormatterTool,
  "uuid-generator": UuidGeneratorTool,
  "password-generator": PasswordGeneratorTool,
  "slug-generator": SlugGeneratorTool,
  "color-picker": ColorPickerTool,
};

export function getToolComponent(slug: string): ComponentType | undefined {
  return toolRegistry[slug];
}
