"use client";

import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative pt-16 pb-32 bg-white">
      {/*
       * Pure CSS fade-in on mount — no Framer Motion, no DOM mutations mid-frame.
       * `key` forces React to unmount + remount the div on each route change,
       * restarting the CSS animation. The old div disappears in the same
       * synchronous commit, so no white gap between unmount and first paint
       * of the new page (which starts at opacity:0 via animation-fill-mode:both).
       *
       * This is the smoothest possible approach: the compositor handles opacity
       * entirely on the GPU, zero JS runs per animation frame.
       */}
      <div key={pathname} className="page-enter">
        {children}
      </div>
    </div>
  );
}
