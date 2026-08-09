interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 id={id} className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base text-muted-foreground">{description}</p>
    </div>
  );
}
