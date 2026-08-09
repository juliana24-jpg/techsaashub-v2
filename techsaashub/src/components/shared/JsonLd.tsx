interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Renders a single JSON-LD <script> tag. Centralizes the
 * dangerouslySetInnerHTML pattern that was previously hand-rolled on every
 * page that needed structured data (layout, tool pages, blog pages, author
 * pages, breadcrumbs).
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
