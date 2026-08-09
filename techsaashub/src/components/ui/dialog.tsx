"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;

/**
 * Shared dimmed backdrop. Always rendered with `forceMount` + Framer Motion
 * initial/animate/exit — the consumer is responsible for wrapping the whole
 * <DialogPortal> tree in `{open && (...)}` inside an <AnimatePresence>, which
 * is what actually triggers this exit animation before unmount.
 */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof motion.div>,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay asChild forceMount>
    <motion.div
      ref={ref}
      className={cn("fixed inset-0 z-50 bg-background/70 backdrop-blur-sm", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      {...props}
    />
  </DialogPrimitive.Overlay>
));
DialogOverlay.displayName = "DialogOverlay";

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogPortal,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
};
