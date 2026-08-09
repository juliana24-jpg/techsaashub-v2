"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileJson,
  Search,
  ShieldCheck,
  Type,
  Wand2,
  Zap,
} from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { totalToolCount } from "@/lib/constants";

const quickSearches = [
  { label: "Meta Title Generator", href: "/tools/meta-title-generator" },
  { label: "JSON Formatter", href: "/tools/json-formatter" },
  { label: "UUID Generator", href: "/tools/uuid-generator" },
  { label: "Password Generator", href: "/tools/password-generator" },
];

const trustPoints = [
  { label: "No account required", Icon: ShieldCheck },
  { label: "No credit card, ever", Icon: Zap },
  { label: `${totalToolCount} tools and counting`, Icon: Wand2 },
];

/**
 * Decorative floating glass cards that give the hero real 3D depth.
 * Illustrative previews of actual tool output — not fabricated stats.
 * Hidden below `lg` since there isn't room for them without crowding
 * the primary content on smaller screens.
 */
function FloatingShowcase() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
    >
      <TiltCard className="absolute left-[6%] top-[20%] w-52 -rotate-6 animate-float">
        <div className="glass p-4" style={{ transform: "translateZ(30px)" }}>
          <div className="glass-edge" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <FileJson className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium text-foreground">JSON Formatter</span>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-foreground/[0.08]" />
            <div className="h-1.5 w-4/5 rounded-full bg-foreground/[0.08]" />
            <div className="h-1.5 w-3/5 rounded-full bg-accent/40" />
          </div>
        </div>
      </TiltCard>

      <TiltCard className="absolute right-[8%] top-[10%] w-40 rotate-6 animate-float-slow">
        <div className="glass p-4 text-center" style={{ transform: "translateZ(40px)" }}>
          <div className="glass-edge" aria-hidden="true" />
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            SEO Score
          </p>
          <p className="mt-1 font-display text-3xl font-semibold text-gradient-brand">98</p>
        </div>
      </TiltCard>

      <TiltCard className="absolute bottom-[14%] right-[14%] w-56 rotate-3 animate-float">
        <div className="glass p-4" style={{ transform: "translateZ(20px)" }}>
          <div className="glass-edge" aria-hidden="true" />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Type className="h-3.5 w-3.5" aria-hidden="true" />
            Meta Title Generator
          </div>
          <p className="mt-2 text-sm font-medium leading-snug text-foreground">
            &ldquo;10 SEO Tools That Save You Hours Every Week&rdquo;
          </p>
        </div>
      </TiltCard>
    </div>
  );
}

export function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length > 0) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <section className="relative isolate overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-36">
      {/* Ambient background: grid + drifting gradient orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-fade" />
        <div className="absolute left-1/2 top-[-10%] h-[36rem] w-[36rem] -translate-x-[65%] rounded-full bg-primary/25 blur-[110px] animate-float" />
        <div className="absolute right-0 top-[5%] h-[28rem] w-[28rem] translate-x-[30%] rounded-full bg-secondary/25 blur-[110px] animate-float-slow" />
        <div className="absolute bottom-[-15%] left-1/3 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-[120px] animate-float" />
      </div>

      <FloatingShowcase />

      <div className="container flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {totalToolCount} free tools · AI, SEO &amp; developer utilities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl"
        >
          The toolkit for people who{" "}
          <span className="text-gradient-brand">build on the internet.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg"
        >
          Free AI, SEO and developer tools, plus sharp, no-fluff writing on the products and
          trends that actually matter. No signup walls. No paywalls.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSearchSubmit}
          role="search"
          aria-label="Search tools and articles"
          className="glass mt-10 flex w-full max-w-xl items-center gap-2 rounded-2xl p-2 pl-5"
        >
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="hero-search" className="sr-only">
            Search tools, guides and SEO checklists
          </label>
          <input
            id="hero-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tools, guides, SEO checklists…"
            className="h-11 w-full min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-base"
          />
          <button
            type="submit"
            className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl bg-gradient-brand px-4 text-sm font-medium text-background transition-transform duration-200 ease-premium hover:scale-[1.03] active:scale-[0.98]"
          >
            Search
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 flex flex-wrap items-center justify-center gap-2"
        >
          {quickSearches.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-foreground/[0.08] bg-foreground/[0.02] px-3 py-1.5 text-xs text-muted-foreground transition-colors duration-200 hover:border-accent/40 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {trustPoints.map(({ label, Icon }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
