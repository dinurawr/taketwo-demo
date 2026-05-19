"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative pt-16 pb-32 bg-white">
      {/*
       * Instagram/Twitter-style crossfade: opacity-only, 150ms, matched enter/exit.
       * mode="popLayout" keeps the white-gap fix (exiting page goes absolute).
       * Single GPU-only property (opacity) — no layout, no paint, no stutter.
       */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{ willChange: "opacity" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
