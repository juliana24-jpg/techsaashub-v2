import type { Metadata } from "next";
import Link from "next/link";
import {
  HeartHandshake,
  Infinity as InfinityIcon,
  Layers,
  Rocket,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { siteConfig, toolCategories, totalToolCount } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `The mission and values behind ${siteConfig.name} — free AI, SEO and developer tools, and straightforward writing on the SaaS world.`,
  alternates: {
    canonical: "/about",
  },
};

const values = [
  {
    title: "Free & accessible",
    description:
      "Every tool stays free, with no account walls. If something ever needs a login, it's for your convenience, never a paywall.",
    Icon: HeartHandshake,
  },
  {
    title: "Built for speed",
    description:
      "Tools should feel instant. We'd rather ship something fast and simple than slow and over-engineered.",
    Icon: Rocket,
  },
  {
    title: "Sharp, not padded",
    description:
      "Our writing gets to the point. No filler paragraphs just to hit a word count — if it doesn't earn its place, it's cut.",
    Icon: Target,
  },
  {
    title: "Always shipping",
    description: "The catalog grows steadily — new tools, new articles, refinements to what's already here.",
    Icon: InfinityIcon,
  },
];

const timeline = [
  { date: "July 2026", title: "Favorites, search & sorting", description: "Made the tool library easier to navigate as it grew." },
  { date: "July 2026", title: "Admin dashboard", description: "Built the tools to manage content ourselves, in-house." },
  { date: "July 2026", title: "Blog platform launched", description: "Added long-form writing alongside the tools." },
  { date: "July 2026", title: `Launch — ${totalToolCount} free tools`, description: "TechSaaShub opened with tools across 5 categories, free from day one." },
];

const stats = [
  { label: "Free tools", value: `${totalToolCount}`, Icon: Wrench },
  { label: "Tool categories", value: `${toolCategories.length}`, Icon: Layers },
  { label: "Accounts required", value: "0", Icon: Users },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Tools and writing for people who build"
        description="The reasoning behind TechSaaShub, in plain terms."
      />

      <div className="container pb-20 pt-8 sm:pb-28">
        {/* Story / Mission / Vision */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground">
            {siteConfig.name} exists to close the gap between having a problem and solving it.
            Most free tool sites bury what you need behind ads, signup forms, or a dozen
            unrelated upsells. We wanted the opposite: open a tab, get the tool, get back to
            work.
          </p>

          <h2 className="mt-10 font-display text-xl font-semibold text-foreground">Our mission</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Give anyone building on the internet a fast, free, honest set of tools — without
            asking for an account, a card, or your attention longer than the task requires.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">Our vision</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A single place where SEO, AI, developer, image and PDF tools live together with the
            writing that explains when and why to use them — so you stop bouncing between five
            different sites just to finish one task.
          </p>
        </div>

        {/* Statistics — real, countable facts, not traffic claims */}
        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="glass relative p-5 text-center">
              <div className="glass-edge" aria-hidden="true" />
              <stat.Icon className="mx-auto h-4 w-4 text-accent" aria-hidden="true" />
              <p className="mt-2 font-display text-2xl font-semibold text-foreground">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
          {values.map((value) => (
            <div key={value.title} className="glass relative p-6">
              <div className="glass-edge" aria-hidden="true" />
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <value.Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-lg font-semibold text-foreground">
                {value.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mx-auto mt-16 max-w-2xl">
          <h2 className="text-center font-display text-xl font-semibold text-foreground">
            How we got here
          </h2>
          <ol className="mt-8 space-y-6 border-l border-foreground/[0.08] pl-6">
            {timeline.map((entry) => (
              <li key={entry.title} className="relative">
                <span
                  className="absolute -left-[1.6rem] top-1 h-2.5 w-2.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <p className="text-xs font-medium uppercase tracking-wider text-accent">
                  {entry.date}
                </p>
                <h3 className="mt-1 font-display text-base font-semibold text-foreground">
                  {entry.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{entry.description}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Team — honest placeholder, matches the Careers page */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <h2 className="font-display text-xl font-semibold text-foreground">Team</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {siteConfig.name} is run by a small team today. We&rsquo;ll introduce everyone here
            properly as the team grows — for now, the fastest way to reach us is the{" "}
            <Link href="/contact" className="text-accent underline-offset-4 hover:underline">
              contact page
            </Link>
            .
          </p>
        </div>

        {/* CTA */}
        <div className="mx-auto mt-16 flex max-w-2xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-6">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-medium text-background shadow-glow-primary transition-transform duration-200 ease-premium hover:scale-[1.03]"
          >
            Explore the tools
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-foreground/[0.08] bg-foreground/[0.02] px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/40 hover:text-accent"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </>
  );
}
