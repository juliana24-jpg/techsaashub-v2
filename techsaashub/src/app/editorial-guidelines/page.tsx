import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Editorial Guidelines",
  description: `How ${siteConfig.name} researches, writes and corrects its content.`,
  alternates: { canonical: "/editorial-guidelines" },
};

const principles = [
  {
    title: "Accuracy first",
    description:
      "We verify claims against primary sources — official docs, changelogs, and firsthand testing — before publishing. If we're not confident in a claim, we don't publish it as fact.",
  },
  {
    title: "Plainly disclosed sponsorship",
    description:
      "If an article or placement is sponsored, it's labeled as sponsored. We don't run sponsored content that isn't clearly marked, and sponsorship never buys editorial approval of a product.",
  },
  {
    title: "Corrections, not silent edits",
    description:
      "When we get something wrong, we fix it and note the correction at the bottom of the article rather than quietly editing it away.",
  },
  {
    title: "Independent tool reviews",
    description:
      "Our own free tools are held to the same standard as anything we'd recommend — if a tool doesn't work well, it doesn't ship.",
  },
];

export default function EditorialGuidelinesPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the blog"
        title="Editorial guidelines"
        description="How we decide what to publish, and how we handle it when we get something wrong."
      />
      <div className="container pb-20 pt-8 sm:pb-28">
        <div className="mx-auto max-w-2xl">
          <div className="space-y-5">
            {principles.map((principle) => (
              <div key={principle.title} className="glass relative p-6">
                <div className="glass-edge" aria-hidden="true" />
                <h2 className="font-display text-lg font-semibold text-foreground">
                  {principle.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Spotted something inaccurate?{" "}
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              Let us know
            </a>{" "}
            and we&rsquo;ll look into it.
          </p>
        </div>
      </div>
    </>
  );
}
