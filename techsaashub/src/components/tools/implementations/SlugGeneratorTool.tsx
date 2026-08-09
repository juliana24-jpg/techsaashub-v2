"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/tools/CopyButton";
import { generateSlug } from "@/lib/slug";

export function SlugGeneratorTool() {
  const [title, setTitle] = useState("");
  const slug = useMemo(() => generateSlug(title), [title]);

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="slug-input" className="mb-1.5 block text-sm font-medium text-foreground">
          Title or text
        </label>
        <Input
          id="slug-input"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="10 SEO Tools That Save You Hours Every Week"
        />
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-medium text-foreground">Slug</span>
        <div className="glass relative flex items-center justify-between gap-3 p-4">
          <div className="glass-edge" aria-hidden="true" />
          <code className="min-w-0 flex-1 truncate font-mono text-sm text-foreground">
            {slug || "your-slug-appears-here"}
          </code>
          <CopyButton value={slug} iconOnly />
        </div>
      </div>
    </div>
  );
}
