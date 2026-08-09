"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-18 z-30 h-0.5 bg-foreground/[0.06]"
    >
      <motion.div
        className="h-full bg-gradient-brand"
        style={{ transformOrigin: "left" }}
        animate={{ scaleX: progress }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.1, ease: "linear" }}
      />
    </div>
  );
}
