import type { Metadata } from "next";
import { Clock, Mail } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${siteConfig.name} team — questions, feedback or partnership ideas.`,
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Questions, feedback, or a tool you wish existed — we read everything."
      />

      <div className="container pb-20 pt-8 sm:pb-28">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-6">
            <div className="glass relative p-6">
              <div className="glass-edge" aria-hidden="true" />
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-lg font-semibold text-foreground">
                Email us directly
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Prefer your own inbox? Reach us at{" "}
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="text-accent underline-offset-4 hover:underline"
                >
                  {siteConfig.supportEmail}
                </a>
                .
              </p>
            </div>

            <div className="glass relative p-6">
              <div className="glass-edge" aria-hidden="true" />
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-lg font-semibold text-foreground">
                Response time
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We&rsquo;re a small team — expect a reply within a couple of business days.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </>
  );
}
