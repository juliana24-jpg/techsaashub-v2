"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, FileText, FolderTree, LayoutDashboard, Tags } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

export const adminNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/posts", label: "Posts", Icon: FileText },
  { href: "/admin/categories", label: "Categories", Icon: FolderTree },
  { href: "/admin/tags", label: "Tags", Icon: Tags },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-strong hidden h-dvh w-64 shrink-0 flex-col border-r border-foreground/[0.08] lg:flex">
      <div className="flex h-18 items-center px-6">
        <Logo />
      </div>

      <nav aria-label="Admin" className="flex-1 space-y-1 px-4 py-4">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "bg-foreground/[0.06] text-foreground"
                  : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground",
              )}
            >
              <item.Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-foreground/[0.08] p-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:bg-foreground/[0.04] hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          View site
        </Link>
      </div>
    </aside>
  );
}
