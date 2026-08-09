"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
  /** Distinguishes the shared layoutId pill between desktop nav and mobile menu instances. */
  layoutId?: string;
  /** Fired on click, in addition to normal navigation — used to close the mobile menu. */
  onNavigate?: () => void;
}

function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLink({
  href,
  label,
  className,
  layoutId = "nav-active-pill",
  onNavigate,
}: NavLinkProps) {
  const pathname = usePathname();
  const active = isRouteActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      <span className="relative z-10">{label}</span>
      {active && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 z-0 rounded-lg bg-foreground/[0.06] ring-1 ring-foreground/[0.08]"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
    </Link>
  );
}
