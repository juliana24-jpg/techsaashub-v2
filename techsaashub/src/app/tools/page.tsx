import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { RecentlyAddedStrip } from "@/components/tools/RecentlyAddedStrip";
import { ToolsDirectory } from "@/components/tools/ToolsDirectory";
import { siteConfig, totalToolCount } from "@/lib/constants";

export const metadata: Metadata = {
  title: "All Tools",
  description: `Browse all ${totalToolCount} free AI, SEO, developer, image and PDF tools on ${siteConfig.name}. No signup required.`,
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: `All Tools — ${siteConfig.name}`,
    description: `Browse all ${totalToolCount} free AI, SEO, developer, image and PDF tools. No signup required.`,
    url: `${siteConfig.url}/tools`,
  },
};

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tool library"
        title="All tools, all free"
        description={`${totalToolCount} AI, SEO, developer, image and PDF tools — filter by category or search from the nav.`}
      />

      <div className="pb-12 pt-8">
        <RecentlyAddedStrip />
      </div>

      <div className="container pb-20 sm:pb-28">
        <ToolsDirectory />
      </div>
    </>
  );
}
