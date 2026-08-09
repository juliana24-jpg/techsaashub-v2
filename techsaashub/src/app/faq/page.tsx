import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { JsonLd } from "@/components/shared/JsonLd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig, totalToolCount } from "@/lib/constants";

export const metadata: Metadata = {
  title: "FAQs",
  description: `Answers to common questions about ${siteConfig.name}.`,
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    question: "Is TechSaaShub really free?",
    answer: `Yes. All ${totalToolCount} tools are free to use, with no hidden tiers or feature paywalls.`,
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. Every tool works without signing up. Accounts only exist for our own team to manage blog content.",
  },
  {
    question: "How often are new tools added?",
    answer:
      "Regularly — check the Recently Added filter on the tools page, or the Changelog for a full history.",
  },
  {
    question: "Can I suggest a tool you don't have yet?",
    answer: "Yes, please do. Send suggestions to our contact page or email us directly.",
  },
  {
    question: "Is my data safe?",
    answer:
      "We collect very little: newsletter emails, contact form messages, and favorites stored only in your browser. See our Privacy Policy for the full breakdown.",
  },
  {
    question: "Can I use tool output commercially?",
    answer:
      "Yes. Anything a tool generates for you — formatted JSON, a generated password, a slug — is yours to use freely.",
  },
  {
    question: "How do I report a bug?",
    answer: "Use the contact form, or email us directly. We read every message.",
  },
  {
    question: "Do you accept guest posts?",
    answer: "Yes — see our Write For Us page for topics we're looking for and how to pitch.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHeader
        eyebrow="Support"
        title="Frequently asked questions"
        description="Straight answers, no runaround."
      />
      <div className="container pb-20 pt-8 sm:pb-28">
        <div className="mx-auto max-w-2xl">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}
