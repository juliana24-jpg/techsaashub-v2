"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, type FormEvent, type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Code2,
  FileCog,
  FileImage,
  FileJson,
  FileStack,
  ImagePlus,
  KeyRound,
  Search,
  ShieldCheck,
  TrendingUp,
  Type,
  Wand2,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toolCategories, totalToolCount } from "@/lib/constants";

// ─────────────────────────────────────────────────────────
// Data — real, spec-derived content (no placeholder copy)
// ─────────────────────────────────────────────────────────

interface FeaturedTool {
  name: string;
  description: string;
  href: string;
  category: string;
  Icon: LucideIcon;
}

const featuredTools: FeaturedTool[] = [
  {
    name: "Meta Title Generator",
    description: "Write titles that hit Google's pixel limit and still make people click.",
    href: "/tools/meta-title-generator",
    category: "SEO",
    Icon: Type,
  },
  {
    name: "JSON Formatter",
    description: "Beautify, validate and minify JSON without leaving your browser tab.",
    href: "/tools/json-formatter",
    category: "Developer",
    Icon: FileJson,
  },
  {
    name: "AI Blog Title Generator",
    description: "Turn one topic into a dozen headline options worth testing.",
    href: "/tools/ai-blog-title-generator",
    category: "AI",
    Icon: Wand2,
  },
  {
    name: "Password Generator",
    description: "Cryptographically random passwords, tuned to the policy you need.",
    href: "/tools/password-generator",
    category: "Developer",
    Icon: KeyRound,
  },
  {
    name: "Image Compressor",
    description: "Shrink PNGs and JPEGs for the web without visible quality loss.",
    href: "/tools/image-compressor",
    category: "Image",
    Icon: FileImage,
  },
  {
    name: "Robots.txt Generator",
    description: "Control what crawlers see, rule by rule, without guessing syntax.",
    href: "/tools/robots-txt-generator",
    category: "SEO",
    Icon: FileCog,
  },
];

const categoryIcons: Record<string, LucideIcon> = {
  seo: TrendingUp,
  ai: Bot,
  developer: Code2,
  image: ImagePlus,
  pdf: FileStack,
};

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

// ─────────────────────────────────────────────────────────
// TiltCard — reusable 3D glass-tilt wrapper (respects reduced motion)
// ─────────────────────────────────────────────────────────

function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
// Section: Hero + Search Everything
// ─────────────────────────────────────────────────────────

function HeroSection() {
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
              className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-xs text-muted-foreground transition-colors duration-200 hover:border-accent/40 hover:text-foreground"
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

// ─────────────────────────────────────────────────────────
// Section: Featured tools
// ─────────────────────────────────────────────────────────

function FeaturedToolsSection() {
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
              key={tool.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="group h-full">
                <Link
                  href={tool.href}
                  className="glass block h-full p-6 transition-shadow duration-300 hover:shadow-glow-primary"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <div className="glass-edge" aria-hidden="true" />
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <tool.Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {tool.category}
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
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/40 hover:text-accent"
          >
            View all {totalToolCount} tools
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// Section: Trending categories
// ─────────────────────────────────────────────────────────

function CategoriesSection() {
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

// ─────────────────────────────────────────────────────────
// Shared section heading
// ─────────────────────────────────────────────────────────

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 id={id} className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base text-muted-foreground">{description}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className={cn("relative")}>
      <HeroSection />
      <FeaturedToolsSection />
      <CategoriesSection />
    </div>
  );
}