"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { NavLink } from "@/components/layout/NavLink";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { MobileMenu, type NavItem } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

const navItems: NavItem[] = [
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 8);
  });

  // Global ⌘K / Ctrl+K shortcut to open search from anywhere on the page.
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-premium",
          isScrolled
            ? "glass-strong border-b border-foreground/[0.08]"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container flex h-18 items-center justify-between">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setSearchOpen(true)}
              className="hidden items-center gap-2 text-muted-foreground sm:flex"
              aria-label="Search (Cmd K)"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm">Search</span>
              <kbd className="ml-1 rounded border border-foreground/[0.12] bg-foreground/[0.04] px-1.5 py-0.5 text-[10px] font-medium">
                ⌘K
              </kbd>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="sm:hidden"
            >
              <Search className="h-[18px] w-[18px]" aria-hidden="true" />
            </Button>

            <ThemeToggle />

            <Button asChild className="hidden lg:inline-flex">
              <Link href="/tools">Explore tools</Link>
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </motion.header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} navItems={navItems} />
    </>
  );
}
