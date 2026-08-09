import type { Metadata } from "next";
import { Megaphone } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { siteConfig, totalToolCount } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Advertise With Us",
  description: `Sponsorship and advertising opportunities on ${siteConfig.name}.`,
  alternates: { canonical: "/advertise" },
};

const placements = [
  {
    title: "Newsletter sponsorship",
    description:
      "A dedicated mention in our newsletter, sent to subscribers who opted in for tools and articles.",
  },
  {
    title: "Sponsored articles",
    description:
      "Clearly labeled sponsored content on the blog, written to our editorial quality bar — see our Editorial Guidelines.",
  },
  {
    title: "Tool page placements",
    description: `A relevant placement alongside one of our ${totalToolCount} free tools, matched to your product's audience.`,
  },
];

export default function AdvertisePage() {
  return (
    <>
      <PageHeader
        eyebrow="Partnerships"
        title="Advertise with us"
        description="Reach founders, developers and marketers who use free tools every week."
      />
      <div className="container pb-20 pt-8 sm:pb-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
            <Megaphone className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {siteConfig.name}&rsquo;s audience is builders — people using our SEO, AI, developer
            and image tools, and reading the blog that goes with them. We keep advertising
            limited and clearly disclosed, because that&rsquo;s what keeps the tools worth using.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
          {placements.map((placement) => (
            <div key={placement.title} className="glass relative p-6">
              <div className="glass-edge" aria-hidden="true" />
              <h2 className="font-display text-base font-semibold text-foreground">
                {placement.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {placement.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            We share current audience numbers and rates directly rather than publishing them
            here, since they change as the site grows.{" "}
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              Email us
            </a>{" "}
            for our current media kit.
          </p>
        </div>
      </div>
    </>
  );
}
