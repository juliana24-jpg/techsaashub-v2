"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  FileImage,
  ListTree,
  Regex,
  Sparkles,
  UploadCloud,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { SectionHeading } from "@/components/home/SectionHeading";
import { getToolBySlug } from "@/lib/tools-data";
import { getCategoryName } from "@/lib/constants";

const popularSlugs = [
  "sitemap-generator",
  "ai-meta-generator",
  "regex-tester",
  "uuid-generator",
  "image-converter",
  "pdf-compress",
] as const;

const iconBySlug: Record<(typeof popularSlugs)[number], LucideIcon> = {
  "sitemap-generator": ListTree,
  "ai-meta-generator": Sparkles,
  "regex-tester": Regex,
  "uuid-generator": Wand2,
  "image-converter": FileImage,
  "pdf-compress": UploadCloud,
};

export function PopularToolsSection() {
  const popularTools = popularSlugs
    .map((slug) => {
      const tool = getToolBySlug(slug);
      return tool ? { ...tool, Icon: iconBySlug[slug] } : null;
    })
    .filter((tool): tool is NonNullable<typeof tool> => tool !== null);

  return (
    <section aria-labelledby="popular-tools-heading" className="relative py-20 sm:py-28">
      <div className="container">
        <SectionHeading
          id="popular-tools-heading"
          eyebrow="Popular tools"
          title="Round out your toolkit"
          description="Six more from the library, picked for how often they come in handy."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popularTools.map((tool, index) => (
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
                  className="glass block h-full p-6 transition-shadow duration-300 hover:shadow-glow-secondary"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <div className="glass-edge" aria-hidden="true" />
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
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
      </div>
    </section>
  );
}
