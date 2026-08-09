import type { ContentBlock } from "@/lib/blog-data";

interface BlogContentProps {
  blocks: ContentBlock[];
}

export function BlogContent({ blocks }: BlogContentProps) {
  return (
    <div className="prose-content">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const HeadingTag = block.level === 2 ? "h2" : "h3";
          return (
            <HeadingTag
              key={block.id}
              id={block.id}
              className={
                block.level === 2
                  ? "mt-10 scroll-mt-24 font-display text-2xl font-semibold text-foreground"
                  : "mt-8 scroll-mt-24 font-display text-xl font-semibold text-foreground"
              }
            >
              {block.text}
            </HeadingTag>
          );
        }
        return (
          <p key={index} className="mt-4 text-base leading-relaxed text-muted-foreground">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
