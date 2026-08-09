import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ToolCard } from "@/components/tools/ToolCard";
import { getToolsByCategory } from "@/lib/tools-data";
import { siteConfig, toolCategories } from "@/lib/constants";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return toolCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = toolCategories.find((c) => c.slug === slug);
  if (!category) return {};

  const title = `${category.name} Tools`;
  const description = `${category.toolCount} free ${category.name} tools. ${category.description}`;

  return {
    title,
    description,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: {
      title: `${title} — ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = toolCategories.find((c) => c.slug === slug);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(category.slug);

  return (
    <>
      <PageHeader
        eyebrow="Category"
        title={`${category.name} Tools`}
        description={`${category.toolCount} free tools — ${category.description}`}
      />
      <div className="container pb-20 pt-4 sm:pb-28">
        <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: category.name, href: `/category/${category.slug}` }]} />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map((tool, index) => (
            <ToolCard key={tool.slug} tool={tool} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}
