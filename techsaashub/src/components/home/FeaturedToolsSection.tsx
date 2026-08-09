"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  FileCog,
  FileImage,
  FileJson,
  KeyRound,
  Type,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { SectionHeading } from "@/components/home/SectionHeading";
import { getToolBySlug } from "@/lib/tools-data";
import { getCategoryName, totalToolCount } from "@/lib/constants";

const featuredSlugs = [
  "meta-title-generator",
  "json-formatter",
  "ai-blog-title-generator",
  "password-generator",
  "image-compressor",
  "robots-txt-generator",
] as const;

const iconBySlug: Record<(typeof featuredSlugs)[number], LucideIcon> = {
  "meta-title-generator": Type,
  "json-formatter": FileJson,
  "ai-blog-title-generator": Wand2,
  "password-generator": KeyRound,
  "image-compressor": FileImage,
  "robots-txt-generator": FileCog,
};

export function FeaturedToolsSection() {
  const featuredTools = featuredSlugs
    .map((slug) => {
      const tool = getToolBySlug(slug);
      return tool ? { ...tool, Icon: iconBySlug[slug] } : null;
    })
    .filter((tool): tool is NonNullable<typeof tool> => tool !== null);

  return (
    <section aria-labelledby="featured-tools-heading" className="relative py-20 sm:py-28">
      <div className="container">
        <SectionHeading
          id="featured-tools-heading"
          eyebrow="Featured tools"
          title="Tools worth bookmarking"
          description="A hand-picked set from the full library — SEO, AI, developer and image utilities, all free to use."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool, index) => (
            <motion.div
              key={tool.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="group h-full">
                <Link
                  href={`/tools/${tool.slug}`}
                  className="glass block h-full p-6 transition-shadow duration-300 hover:shadow-glow-primary"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <div className="glass-edge" aria-hidden="true" />
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <tool.Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {getCategoryName(tool.category)}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-semibold text-foreground">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {tool.description}
                  </p>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-xl border border-foreground/[0.08] bg-foreground/[0.02] px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/40 hover:text-accent"
          >
            View all {totalToolCount} tools
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
