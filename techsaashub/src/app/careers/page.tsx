import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Careers",
  description: `Careers and future opportunities at ${siteConfig.name}.`,
  alternates: { canonical: "/careers" },
};

const values = [
  {
    title: "Ship real things",
    description:
      "We'd rather ship something small and useful than plan something large and theoretical.",
  },
  {
    title: "Write clearly",
    description:
      "Clear writing is clear thinking. It matters as much for code comments as it does for articles.",
  },
  {
    title: "Care about the details",
    description:
      "The small polish — a well-worded error message, a fast load time — is the job, not an extra.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="We're not hiring right now"
        description="But we're always happy to hear from people who care about this kind of work."
      />
      <div className="container pb-20 pt-8 sm:pb-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Briefcase className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {siteConfig.name} is a small team today, and we don&rsquo;t have open roles at the
            moment. When that changes, we&rsquo;ll list real openings here — no filler listings
            in the meantime.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            If you&rsquo;d still like to introduce yourself — designers, engineers and writers
            who care about fast, honest products are always worth hearing from — email{" "}
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {siteConfig.supportEmail}
            </a>{" "}
            and we&rsquo;ll keep it on file.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="glass relative p-6 text-center">
              <div className="glass-edge" aria-hidden="true" />
              <h2 className="font-display text-base font-semibold text-foreground">
                {value.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
