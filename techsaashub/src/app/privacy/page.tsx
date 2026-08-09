import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects your information.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "July 20, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated ${LAST_UPDATED}`}
      />
      <div className="container pb-20 pt-8 sm:pb-28">
        <div className="prose-content mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
          <p>
            This policy explains what {siteConfig.name} collects when you use the site, why, and
            what your options are. It covers this website and its free tools only — it isn&rsquo;t
            legal advice, and if you need a compliance sign-off for your own business, please
            have a qualified lawyer review it.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
            What we actually collect
          </h2>
          <p className="mt-3">
            We keep this deliberately short, because we only collect what the site actually
            uses:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Newsletter signups.</strong> If you subscribe,
              we store your email address so we can send you new tools and articles. You can
              unsubscribe at any time using the link in every email.
            </li>
            <li>
              <strong className="text-foreground">Contact form submissions.</strong> If you
              message us, we store your name, email, subject and message so we can reply.
            </li>
            <li>
              <strong className="text-foreground">Favorites.</strong> Tools you favorite are
              saved in your browser&rsquo;s local storage only. This never leaves your device or
              reaches our servers.
            </li>
            <li>
              <strong className="text-foreground">Theme preference.</strong> Whether you use
              light or dark mode is saved in your browser&rsquo;s local storage.
            </li>
            <li>
              <strong className="text-foreground">Admin authentication.</strong> If you&rsquo;re
              a signed-in administrator, Supabase sets a session cookie to keep you logged in.
              This only applies to admin accounts, not visitors.
            </li>
          </ul>
          <p className="mt-3">
            We do not run third-party advertising trackers or sell any data to third parties.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
            Where data is stored
          </h2>
          <p className="mt-3">
            Newsletter emails and contact submissions are stored in our database, hosted by
            Supabase. The site itself is hosted on Vercel. Both providers process data on our
            behalf under their own security and privacy commitments.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">Your rights</h2>
          <p className="mt-3">
            You can ask us to delete your contact submissions or newsletter subscription at any
            time by emailing{" "}
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {siteConfig.supportEmail}
            </a>
            . We&rsquo;ll action deletion requests within a reasonable timeframe.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
            Changes to this policy
          </h2>
          <p className="mt-3">
            If this policy changes in a meaningful way, we&rsquo;ll update the date at the top of
            this page.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-foreground">Contact</h2>
          <p className="mt-3">
            Questions about this policy? Email{" "}
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {siteConfig.supportEmail}
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
