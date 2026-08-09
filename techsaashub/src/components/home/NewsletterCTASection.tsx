"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { newsletterSchema, type NewsletterFormValues } from "@/lib/newsletter-schema";

export function NewsletterCTASection() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  async function onSubmit(values: NewsletterFormValues) {
    setStatus("idle");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="newsletter" aria-labelledby="newsletter-heading" className="relative py-20 sm:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass relative mx-auto max-w-3xl overflow-hidden px-6 py-12 text-center sm:px-12"
        >
          <div className="glass-edge" aria-hidden="true" />
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-background shadow-glow-primary">
            <Mail className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2
            id="newsletter-heading"
            className="mt-6 font-display text-3xl font-semibold sm:text-4xl"
          >
            Get new tools and articles first
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
            One email, roughly twice a month. No spam, unsubscribe anytime.
          </p>

          {status === "success" ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-success">
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              <p className="text-sm font-medium">You&rsquo;re subscribed — welcome aboard.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:items-start"
            >
              <div className="flex-1 text-left">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "newsletter-email-error" : undefined}
                  {...register("email")}
                />
                {errors.email && (
                  <p id="newsletter-email-error" className="mt-1.5 text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={isSubmitting} className="shrink-0">
                {isSubmitting ? "Subscribing…" : "Subscribe"}
              </Button>
            </form>
          )}

          {status === "error" && (
            <div className="mt-4 flex items-center justify-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              <p className="text-sm">Something went wrong. Please try again.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
