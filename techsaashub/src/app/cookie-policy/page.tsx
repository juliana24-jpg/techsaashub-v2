import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `What cookies and local storage ${siteConfig.name} actually uses.`,
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Cookie Policy"
        description="A short, honest list — no vague catch-all cookie banners here."
      />
      <div className="container pb-20 pt-8 sm:pb-28">
        <div className="prose-content mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
          <p>
            Most cookie policies are long because most sites run a lot of third-party trackers.
            {" "}{siteConfig.name} doesn&rsquo;t, so this is short.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
            What we use, exactly
          </h2>
          <table className="mt-4 w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-foreground/[0.08] text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Name / type</th>
                <th className="py-2 pr-4 font-medium">Purpose</th>
                <th className="py-2 font-medium">Who it applies to</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/[0.06]">
              <tr>
                <td className="py-3 pr-4 font-medium text-foreground">
                  Supabase session cookie
                </td>
                <td className="py-3 pr-4">Keeps an admin logged in between requests.</td>
                <td className="py-3">Signed-in administrators only</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-foreground">
                  Theme preference (local storage, not a cookie)
                </td>
                <td className="py-3 pr-4">Remembers your light/dark mode choice.</td>
                <td className="py-3">Everyone</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-foreground">
                  Favorite tools (local storage, not a cookie)
                </td>
                <td className="py-3 pr-4">Remembers which tools you&rsquo;ve favorited.</td>
                <td className="py-3">Everyone</td>
              </tr>
            </tbody>
          </table>

          <p className="mt-6">
            We do not use advertising cookies, third-party analytics trackers, or cross-site
            tracking of any kind. Local storage values (theme, favorites) never leave your
            browser — they aren&rsquo;t sent to our servers at all.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
            Managing cookies
          </h2>
          <p className="mt-3">
            Since the only cookie we set is a functional session cookie for admin accounts, most
            visitors have nothing to manage. If you&rsquo;re an administrator and want to clear
            your session, use the log-out option in the admin dashboard, or clear cookies for
            this site in your browser settings.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">Questions</h2>
          <p className="mt-3">
            Email{" "}
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {siteConfig.supportEmail}
            </a>{" "}
            with anything cookie-related.
          </p>
        </div>
      </div>
    </>
  );
}
