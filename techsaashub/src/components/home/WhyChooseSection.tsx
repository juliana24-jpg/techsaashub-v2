"use client";

import { motion } from "framer-motion";
import { Gauge, Layers, ShieldCheck, Sparkles, TrendingUp, Zap, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/home/SectionHeading";
import { totalToolCount } from "@/lib/constants";

interface Reason {
  title: string;
  description: string;
  Icon: LucideIcon;
}

const reasons: Reason[] = [
  {
    title: "100% Free, Always",
    description: "Every tool is free to use — no hidden tiers, no feature paywalls.",
    Icon: Zap,
  },
  {
    title: "No Account Needed",
    description: "Jump straight into any tool. Nothing to sign up for, nothing to remember.",
    Icon: ShieldCheck,
  },
  {
    title: "Built for Speed",
    description: "Tools respond instantly, with no bloated interfaces slowing you down.",
    Icon: Gauge,
  },
  {
    title: "SEO, AI & Dev in One Place",
    description: `${totalToolCount} tools across five categories, so you stop bouncing between tabs.`,
    Icon: Layers,
  },
  {
    title: "Clean, Focused Design",
    description: "No ads, no clutter — just the tool you came for.",
    Icon: Sparkles,
  },
  {
    title: "Always Growing",
    description: "New tools and articles ship regularly. Bookmark it and check back.",
    Icon: TrendingUp,
  },
];

export function WhyChooseSection() {
  return (
    <section aria-labelledby="why-choose-heading" className="relative py-20 sm:py-28">
      <div className="container">
        <SectionHeading
          id="why-choose-heading"
          eyebrow="Why TechSaaShub"
          title="Built to actually get used"
          description="No growth-hacking gimmicks — just a fast, honest set of tools and writing worth coming back to."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass relative p-6"
            >
              <div className="glass-edge" aria-hidden="true" />
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <reason.Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
