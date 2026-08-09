import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { FavoriteButton } from "@/components/tools/FavoriteButton";
import { CopyButton } from "@/components/tools/CopyButton";
import { getToolComponent } from "@/components/tools/tool-registry";
import { getToolIcon } from "@/components/tools/tool-icons";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { getCategoryName, siteConfig } from "@/lib/constants";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  const title = `${tool.name} — Free Online Tool`;

  return {
    title,
    description: tool.description,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      title: `${title} — ${siteConfig.name}`,
      description: tool.description,
      url: `${siteConfig.url}/tools/${tool.slug}`,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const Icon = getToolIcon(tool.slug);
  const categoryName = getCategoryName(tool.category);
  const toolUrl = `${siteConfig.url}/tools/${tool.slug}`;
  const RealTool = getToolComponent(tool.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (Web-based)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: toolUrl,
  };

  return (
    <div className="pb-20 pt-28 sm:pb-28 sm:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { label: "Tools", href: "/tools" },
          { label: categoryName, href: `/category/${tool.category}` },
          { label: tool.name, href: `/tools/${tool.slug}` },
        ]}
      />

      <div className="container mt-8">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {categoryName}
          </p>
          <h1 className="mt-2 max-w-2xl text-balance font-display text-3xl font-semibold sm:text-4xl">
            {tool.name}
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted-foreground">{tool.description}</p>

          <div className="mt-5 flex items-center gap-2">
            <FavoriteButton slug={tool.slug} />
            <CopyButton value={toolUrl} label="Copy link" />
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          {RealTool ? (
            <div className="glass relative p-6 sm:p-8">
              <div className="glass-edge" aria-hidden="true" />
              <RealTool />
            </div>
          ) : (
            <ToolWorkspace tool={tool} />
          )}
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <RelatedTools currentTool={tool} />
        </div>
      </div>
    </div>
  );
}
