"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { FavoriteButton } from "@/components/tools/FavoriteButton";
import { CopyButton } from "@/components/tools/CopyButton";
import { getCategoryName, siteConfig } from "@/lib/constants";
import { getToolIcon } from "@/components/tools/tool-icons";
import type { ToolMeta } from "@/lib/tools-data";

interface ToolCardProps {
  tool: ToolMeta;
  index?: number;
}

export function ToolCard({ tool, index = 0 }: ToolCardProps) {
  const Icon = getToolIcon(tool.slug);
  const toolUrl = `${siteConfig.url}/tools/${tool.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard className="group h-full">
        <div
          className="glass relative h-full transition-shadow duration-300 hover:shadow-glow-primary"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="glass-edge" aria-hidden="true" />

          {/* Sibling to the Link below (not nested inside it), so these
              controls don't trigger navigation and stay valid HTML. */}
          <div className="absolute right-4 top-4 z-10 flex gap-1.5">
            <FavoriteButton slug={tool.slug} />
            <CopyButton value={toolUrl} iconOnly label="Copy link" />
          </div>

          <Link href={`/tools/${tool.slug}`} className="flex h-full flex-col p-6">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {getCategoryName(tool.category)}
            </p>
            <h3 className="mt-1.5 font-display text-lg font-semibold text-foreground">
              {tool.name}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {tool.description}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              Open tool
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>
      </TiltCard>
    </motion.div>
  );
}
