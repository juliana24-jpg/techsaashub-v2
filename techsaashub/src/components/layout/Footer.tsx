import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { FooterNewsletterForm } from "@/components/layout/FooterNewsletterForm";
import { siteConfig, toolCategories } from "@/lib/constants";

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.09-.647.35-1.088.636-1.339-2.221-.253-4.556-1.113-4.556-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.548 9.548 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.679.921.679 1.856 0 1.34-.012 2.421-.012 2.75 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.523 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.266 2.37 4.266 5.455v6.286zM5.337 7.433a2.06 2.06 0 1 1 0-4.121 2.06 2.06 0 0 1 0 4.121zM7.114 20.452H3.56V9h3.554v11.452z" />
    </svg>
  );
}

const columns = [
  {
    title: "Tools",
    links: toolCategories.map((category) => ({
      label: `${category.name} Tools`,
      href: `/category/${category.slug}`,
    })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Press Kit", href: "/press-kit" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQs", href: "/faq" },
      { label: "Changelog", href: "/changelog" },
      { label: "Write For Us", href: "/write-for-us" },
      { label: "Editorial Guidelines", href: "/editorial-guidelines" },
      { label: "Advertise With Us", href: "/advertise" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

const socialLinks = [
  { label: "X (Twitter)", href: siteConfig.links.twitter, Icon: XIcon },
  { label: "GitHub", href: siteConfig.links.github, Icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.links.linkedin, Icon: LinkedinIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-foreground/[0.08]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-brand opacity-60"
      />

      <div className="container py-16">
        <div className="flex flex-col gap-10 border-b border-foreground/[0.08] pb-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline} Free AI, SEO and developer tools, plus writing worth reading.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-foreground/[0.08] text-muted-foreground transition-colors duration-200 hover:border-accent/40 hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:text-right">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Stay updated
            </h3>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground lg:ml-auto">
              New tools and articles, roughly twice a month.
            </p>
            <div className="mt-4 lg:ml-auto lg:flex lg:justify-end">
              <FooterNewsletterForm />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 pt-10 sm:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-foreground/[0.08] pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <Link
            href="/admin/login"
            className="text-xs text-muted-foreground/70 transition-colors duration-200 hover:text-muted-foreground"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
