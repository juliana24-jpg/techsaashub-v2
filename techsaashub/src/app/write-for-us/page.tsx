import type { Metadata } from "next";
import { CheckCircle2, XCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Write For Us",
  description: `Pitch a guest article for the ${siteConfig.name} blog.`,
  alternates: { canonical: "/write-for-us" },
};

const wantedTopics = [
  "Practical SEO tactics you've actually tested",
  "AI tooling for content, code or workflows",
  "Developer productivity and tooling deep-dives",
  "Honest comparisons of SaaS tools and platforms",
];

const notWanted = [
  "Thinly-veiled product pitches with no real substance",
  "AI-generated drafts you haven't personally reviewed and edited",
  "Content that's already published elsewhere",
  "Generic listicles with no original insight or testing",
];

export default function WriteForUsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contribute"
        title="Write for us"
        description="We publish sharp, practical writing from people who actually do the work."
      />
      <div className="container pb-20 pt-8 sm:pb-28">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="glass relative p-6">
            <div className="glass-edge" aria-hidden="true" />
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
              <CheckCircle2 className="h-5 w-5 text-success" aria-hidden="true" />
              What we&rsquo;re looking for
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {wantedTopics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>

          <div className="glass relative p-6">
            <div className="glass-edge" aria-hidden="true" />
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
              <XCircle className="h-5 w-5 text-destructive" aria-hidden="true" />
              What we&rsquo;ll pass on
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {notWanted.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-4xl">
          <div className="glass relative p-6 sm:p-8">
            <div className="glass-edge" aria-hidden="true" />
            <h2 className="font-display text-lg font-semibold text-foreground">How to pitch</h2>
            <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-sm text-muted-foreground">
              <li>
                Email{" "}
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="text-accent underline-offset-4 hover:underline"
                >
                  {siteConfig.supportEmail}
                </a>{" "}
                with the subject line &ldquo;Guest post pitch&rdquo;.
              </li>
              <li>Include a one-paragraph pitch and a rough outline — not a full draft yet.</li>
              <li>Link to one or two writing samples so we can get a feel for your style.</li>
              <li>
                If it&rsquo;s a fit, we&rsquo;ll reply with feedback and a target length before
                you write the full piece.
              </li>
            </ol>
            <p className="mt-5 text-sm text-muted-foreground">
              Accepted articles are published under your byline with a short author bio. We
              retain editorial rights to edit for clarity, accuracy and house style, and
              we&rsquo;ll always loop you in on substantial changes before publishing.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
