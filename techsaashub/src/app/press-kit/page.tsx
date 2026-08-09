import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Logo } from "@/components/layout/Logo";
import { CopyButton } from "@/components/tools/CopyButton";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Press Kit",
  description: `Brand assets and boilerplate copy for ${siteConfig.name}.`,
  alternates: { canonical: "/press-kit" },
};

const brandColors = [
  { name: "Background", hex: "#050816" },
  { name: "Primary", hex: "#4F8CFF" },
  { name: "Secondary", hex: "#7C3AED" },
  { name: "Accent", hex: "#00E5FF" },
];

export default function PressKitPage() {
  return (
    <>
      <PageHeader
        eyebrow="Press"
        title="Press kit"
        description="Logo, brand colors and boilerplate copy for anyone writing about us."
      />
      <div className="container pb-20 pt-8 sm:pb-28">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="glass relative p-6 sm:p-8">
            <div className="glass-edge" aria-hidden="true" />
            <h2 className="font-display text-lg font-semibold text-foreground">Logo</h2>
            <div className="mt-5 flex items-center justify-center rounded-xl border border-foreground/[0.08] bg-background/40 p-10">
              <Logo />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Please keep clear space around the mark and don&rsquo;t recolor, stretch, or
              recreate it. For a high-resolution export or an icon-only version, email{" "}
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="text-accent underline-offset-4 hover:underline"
              >
                {siteConfig.supportEmail}
              </a>
              .
            </p>
          </div>

          <div className="glass relative p-6 sm:p-8">
            <div className="glass-edge" aria-hidden="true" />
            <h2 className="font-display text-lg font-semibold text-foreground">Brand colors</h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {brandColors.map((color) => (
                <div key={color.name}>
                  <div
                    className="h-16 w-full rounded-lg border border-foreground/[0.08]"
                    style={{ backgroundColor: color.hex }}
                    aria-hidden="true"
                  />
                  <p className="mt-2 text-sm font-medium text-foreground">{color.name}</p>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <code className="font-mono text-xs text-muted-foreground">{color.hex}</code>
                    <CopyButton value={color.hex} iconOnly />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass relative p-6 sm:p-8">
            <div className="glass-edge" aria-hidden="true" />
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Boilerplate
              </h2>
              <CopyButton value={siteConfig.description} label="Copy" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Media inquiries:{" "}
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {siteConfig.supportEmail}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
