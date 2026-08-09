"use client";

import { useState, type MouseEvent } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  label?: string;
  iconOnly?: boolean;
  className?: string;
}

export function CopyButton({ value, label, iconOnly = false, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — no-op; the value stays visible on screen.
    }
  }

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : (label ?? "Copy")}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg border border-foreground/[0.08] bg-background/70 text-muted-foreground backdrop-blur-sm transition-colors duration-200 hover:border-accent/40 hover:text-foreground",
          className,
        )}
      >
        {copied ? (
          <Check className="h-4 w-4 text-success" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-foreground/[0.08] px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-accent/40 hover:text-foreground",
        className,
      )}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-success" aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      {copied ? "Copied" : (label ?? "Copy")}
    </button>
  );
}
