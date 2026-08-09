"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, Code2, FileStack, ImagePlus, TrendingUp, type LucideIcon } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { SectionHeading } from "@/components/home/SectionHeading";
import { toolCategories } from "@/lib/constants";

const categoryIcons: Record<string, LucideIcon> = {
  seo: TrendingUp,
  ai: Bot,
  developer: Code2,
  image: ImagePlus,
  pdf: FileStack,
};

export function ToolCategoriesSection() {
  return (
    <section aria-labelledby="categories-heading" className="relative py-20 sm:py-28">
      <div className="container">
        <SectionHeading
          id="categories-heading"
          eyebrow="Browse by category"
          title="Find your lane"
          description="Every tool and article is organized under five focused categories — jump straight to what you need."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {toolCategories.map((category, index) => {
            const Icon = categoryIcons[category.slug] ?? Code2;
            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard className="group h-full">
                  <Link
                    href={`/category/${category.slug}`}
                    className="glass flex h-full flex-col p-6 transition-shadow duration-300 hover:shadow-glow-accent"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    <div className="glass-edge" aria-hidden="true" />
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                      {category.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {category.description}
                    </p>
                    <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {category.toolCount} tools
                    </p>
                  </Link>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
