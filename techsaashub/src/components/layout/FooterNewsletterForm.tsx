"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { newsletterSchema, type NewsletterFormValues } from "@/lib/newsletter-schema";

export function FooterNewsletterForm() {
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

  if (status === "success") {
    return (
      <p className="flex items-center gap-1.5 text-sm text-success">
        <Check className="h-4 w-4" aria-hidden="true" />
        Subscribed — thanks!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex max-w-xs gap-2">
      <div className="flex-1">
        <label htmlFor="footer-newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          id="footer-newsletter-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={errors.email ? "true" : "false"}
          className="h-10 text-sm"
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
        {status === "error" && (
          <p className="mt-1 text-xs text-destructive">Something went wrong. Try again.</p>
        )}
      </div>
      <Button type="submit" size="sm" disabled={isSubmitting} className="h-10 shrink-0">
        {isSubmitting ? "…" : "Subscribe"}
      </Button>
    </form>
  );
}
