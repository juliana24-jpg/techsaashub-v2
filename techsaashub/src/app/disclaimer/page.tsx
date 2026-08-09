import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Important disclaimers regarding content and tools on ${siteConfig.name}.`,
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Disclaimer"
        description="A few things worth being upfront about."
      />
      <div className="container pb-20 pt-8 sm:pb-28">
        <div className="prose-content mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Not professional advice
          </h2>
          <p className="mt-3">
            Articles on {siteConfig.name} cover SEO, AI and developer topics for informational
            purposes. They aren&rsquo;t legal, financial, or professional advice, and shouldn&rsquo;t
            be treated as a substitute for consulting a qualified professional about your
            specific situation.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
            Tool output
          </h2>
          <p className="mt-3">
            Our tools are built to be genuinely useful, but they&rsquo;re automated utilities, not
            guarantees. AI-assisted tools in particular can produce inaccurate or generic output
            — always review generated content (titles, meta descriptions, paragraphs) before
            publishing it. Developer utilities (formatters, generators, converters) should be
            spot-checked before use in production systems.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
            External links
          </h2>
          <p className="mt-3">
            Articles and pages may link to third-party sites for reference. We don&rsquo;t control
            those sites and aren&rsquo;t responsible for their content, accuracy, or availability.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
            Accuracy over time
          </h2>
          <p className="mt-3">
            Technology moves quickly. An article accurate on its publish date may become
            outdated as tools, APIs, or best practices change. Check the publish date on any
            article before relying on it for a current decision.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">Questions</h2>
          <p className="mt-3">
            Reach out at{" "}
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {siteConfig.supportEmail}
            </a>{" "}
            if anything here needs clarifying.
          </p>
        </div>
      </div>
    </>
  );
}
