"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative pt-16 pb-32 bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          /*
           * Kindle-style cross-fade:
           * - Pure opacity transition (no x/y translate) — calm, paper-like
           * - Slightly slower than the previous slide (0.35s in, 0.22s out)
           *   so the entering page settles like an e-ink refresh while the
           *   exit feels light.
           * - Custom ease-out-quad for the entering page gives that "settling"
           *   feel; exit uses ease-in for a soft dismissal.
           * - mode="wait" on AnimatePresence (kept) gives a tiny blank beat
           *   between pages — the signature Kindle e-ink-refresh moment.
           */
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.35,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
