import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getToolIcon } from "@/components/tools/tool-icons";
import { getCategoryName } from "@/lib/constants";
import { getRecentlyAddedTools } from "@/lib/tools-data";

export function RecentlyAddedStrip() {
  const recentTools = getRecentlyAddedTools(6);

  if (recentTools.length === 0) return null;

  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-foreground">Recently added</h2>
      </div>

      <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
        {recentTools.map((tool) => {
          const Icon = getToolIcon(tool.slug);
          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="glass group flex w-64 shrink-0 flex-col p-5"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="mt-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {getCategoryName(tool.category)}
              </p>
              <h3 className="mt-1 truncate font-display text-sm font-semibold text-foreground">
                {tool.name}
              </h3>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent">
                Open
                <ArrowRight
                  className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
