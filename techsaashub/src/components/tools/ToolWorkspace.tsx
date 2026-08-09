import { Bell, Hammer } from "lucide-react";
import Link from "next/link";
import type { ToolMeta } from "@/lib/tools-data";

interface ToolWorkspaceProps {
  tool: ToolMeta;
}

/**
 * The interactive area for a tool's actual functionality. Building real,
 * working logic for all 32 tools is substantial scope of its own — this
 * panel is honest about that rather than faking a working interface.
 * Swap this out per-tool as each one is implemented.
 */
export function ToolWorkspace({ tool }: ToolWorkspaceProps) {
  return (
    <div className="glass relative flex flex-col items-center px-6 py-16 text-center">
      <div className="glass-edge" aria-hidden="true" />
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Hammer className="h-5 w-5" aria-hidden="true" />
      </span>
      <h2 className="mt-5 font-display text-xl font-semibold text-foreground">
        The {tool.name} interface is being built
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        This page, its SEO metadata and its place in the catalog are live — the interactive tool
        itself ships in the next build phase. Subscribe to the newsletter and we&rsquo;ll let you
        know the moment it&rsquo;s ready.
      </p>
      <Link
        href="/#newsletter"
        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-foreground/[0.08] bg-foreground/[0.02] px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/40 hover:text-accent"
      >
        <Bell className="h-4 w-4" aria-hidden="true" />
        Notify me
      </Link>
    </div>
  );
}
