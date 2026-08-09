import { ToolCard } from "@/components/tools/ToolCard";
import { getToolsByCategory, type ToolMeta } from "@/lib/tools-data";

interface RelatedToolsProps {
  currentTool: ToolMeta;
  limit?: number;
}

export function RelatedTools({ currentTool, limit = 3 }: RelatedToolsProps) {
  const related = getToolsByCategory(currentTool.category)
    .filter((tool) => tool.slug !== currentTool.slug)
    .slice(0, limit);

  if (related.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-foreground">
        More in this category
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((tool, index) => (
          <ToolCard key={tool.slug} tool={tool} index={index} />
        ))}
      </div>
    </div>
  );
}
