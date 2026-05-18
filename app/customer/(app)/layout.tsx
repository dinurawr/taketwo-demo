"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative pt-16 pb-32 bg-white">
      {/*
       * mode="popLayout" absolutely-positions the exiting page so it leaves
       * the document flow instantly — no blank white frame, no height doubling.
       * Enter: fade in + 6px rise (standard iOS-style tab switch feel).
       * Exit: fast fade out in place, doesn't fight the entering page.
       */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.12, ease: "easeIn" } }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
