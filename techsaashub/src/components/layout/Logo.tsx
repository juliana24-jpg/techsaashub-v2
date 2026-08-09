import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="TechSaaShub — go to homepage"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        aria-hidden="true"
        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-brand shadow-glow-primary transition-transform duration-300 ease-premium group-hover:scale-105"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="text-background"
        >
          <path
            d="M9 6L4 12L9 18"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 6L20 12L15 18"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        </svg>
      </span>
      {!iconOnly && (
        <span className="font-display text-[17px] font-semibold tracking-tight text-foreground">
          TechSaaShub
        </span>
      )}
    </Link>
  );
}
