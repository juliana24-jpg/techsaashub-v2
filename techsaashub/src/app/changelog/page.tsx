import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { siteConfig, totalToolCount } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Changelog",
  description: `What's new on ${siteConfig.name}.`,
  alternates: { canonical: "/changelog" },
};

const entries = [
  {
    date: "2026-07-20",
    title: "Favorites, search and sorting for the tool library",
    items: [
      "Favorite any tool — saved to your browser, no account needed",
      "Search added to the tools directory, alongside category filters",
      "Sort tools by Popular, Newest or A–Z",
    ],
  },
  {
    date: "2026-07-18",
    title: "Admin dashboard",
    items: [
      "A dashboard for managing posts, categories and tags",
      "Draft/publish workflow with image uploads for cover art",
    ],
  },
  {
    date: "2026-07-15",
    title: "Blog platform",
    items: [
      "Articles with categories, tags, table of contents and related posts",
      "Author profile pages",
      "Share buttons and reading progress on every article",
    ],
  },
  {
    date: "2026-07-10",
    title: "Light and dark themes",
    items: ["A full light theme alongside the original dark theme, switchable from the navbar"],
  },
  {
    date: "2026-07-05",
    title: `Launch: ${totalToolCount} free tools`,
    items: [
      "TechSaaShub launched with tools across SEO, AI, Developer, Image and PDF categories",
      "No accounts, no paywalls",
    ],
  },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function ChangelogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Changelog"
        title="What's new"
        description="Real updates, in the order they shipped."
      />
      <div className="container pb-20 pt-8 sm:pb-28">
        <div className="mx-auto max-w-2xl space-y-6">
          {entries.map((entry) => (
            <div key={entry.date} className="glass relative p-6">
              <div className="glass-edge" aria-hidden="true" />
              <p className="text-xs font-medium uppercase tracking-wider text-accent">
                {formatDate(entry.date)}
              </p>
              <h2 className="mt-1.5 font-display text-lg font-semibold text-foreground">
                {entry.title}
              </h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                {entry.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
