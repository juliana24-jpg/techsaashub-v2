"use client";

import * as React from "react";
import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { NavLink } from "@/components/layout/NavLink";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export interface NavItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  navItems: NavItem[];
}

export function MobileMenu({ open, onOpenChange, navItems }: MobileMenuProps) {
  function handleNavigate() {
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPortal forceMount>
            <DialogOverlay />
            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="glass-strong fixed inset-0 z-50 flex flex-col overflow-y-auto !rounded-none lg:hidden"
              >
                <VisuallyHidden asChild>
                  <DialogTitle>Navigation menu</DialogTitle>
                </VisuallyHidden>

                <div className="container flex h-18 shrink-0 items-center justify-between">
                  <Logo />
                  <DialogClose asChild>
                    <Button variant="ghost" size="icon" aria-label="Close menu">
                      <X className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </DialogClose>
                </div>

                <nav
                  aria-label="Mobile"
                  className="container flex flex-1 flex-col justify-center gap-1 py-8"
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.05 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <NavLink
                        href={item.href}
                        label={item.label}
                        layoutId="mobile-nav-active-pill"
                        onNavigate={handleNavigate}
                        className="block rounded-xl px-4 py-3.5 text-xl"
                      />
                    </motion.div>
                  ))}
                </nav>

                <div className="container flex shrink-0 flex-col gap-4 border-t border-foreground/[0.08] py-6">
                  <Button asChild size="lg" onClick={handleNavigate}>
                    <Link href="/tools">
                      Explore tools
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Appearance</span>
                    <ThemeToggle />
                  </div>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPortal>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
