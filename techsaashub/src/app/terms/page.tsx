import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { siteConfig, totalToolCount } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms that govern your use of ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "July 20, 2026";

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        description={`Last updated ${LAST_UPDATED}`}
      />
      <div className="container pb-20 pt-8 sm:pb-28">
        <div className="prose-content mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
          <p>
            These terms govern your use of {siteConfig.name} ({siteConfig.url}). By using the
            site or its tools, you agree to them. This is a plain-language summary, not a
            substitute for legal advice specific to your situation.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
            Using the tools
          </h2>
          <p className="mt-3">
            All {totalToolCount} tools are free to use, with no account required. Tools are
            provided &ldquo;as is&rdquo; for convenience — we don&rsquo;t guarantee they&rsquo;re
            error-free or suitable for every use case. For anything business-critical (legal
            documents, financial data, production credentials), double-check the output before
            relying on it.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
            Acceptable use
          </h2>
          <p className="mt-3">You agree not to:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Use the tools to generate or distribute unlawful, harmful or infringing content.</li>
            <li>Attempt to disrupt, overload, or reverse-engineer the site or its tools.</li>
            <li>Scrape or bulk-extract content in a way that degrades service for others.</li>
            <li>Misrepresent your identity when contacting us or subscribing to updates.</li>
          </ul>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
            Intellectual property
          </h2>
          <p className="mt-3">
            The {siteConfig.name} name, logo, design and original articles are owned by us.
            Content you generate using our tools (formatted JSON, generated passwords, slugs,
            etc.) is yours to use freely — we claim no ownership over tool output.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
            No warranty
          </h2>
          <p className="mt-3">
            The site and its tools are provided without warranties of any kind, express or
            implied, including fitness for a particular purpose. We aren&rsquo;t liable for
            damages arising from your use of the site to the fullest extent permitted by law.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
            Changes to the service
          </h2>
          <p className="mt-3">
            We may add, change or retire tools and features at any time. We&rsquo;ll try to keep
            disruption to a minimum, but we don&rsquo;t guarantee any specific tool stays
            available indefinitely.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">Contact</h2>
          <p className="mt-3">
            Questions about these terms? Email{" "}
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {siteConfig.supportEmail}
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
