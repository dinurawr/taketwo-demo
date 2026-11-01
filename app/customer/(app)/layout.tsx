"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // The home hero is full-bleed photography and draws its own (white) mark.
  const showMark = pathname !== "/customer/home";

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

      {/*
       * TakeTwo "tt" mark — top-left, in the 64px band every tab page reserves under
       * the status bar (below the clock, clear of the dynamic island). Sits after the
       * page content so it paints above the shop's sticky white header. The padding
       * makes the tap target ~40px while the mark stays 22px.
       */}
      {showMark && (
        <Link
          href="/customer/home"
          aria-label="Take Two home"
          className="absolute left-[11px] top-[28px] z-20 p-[7px]"
          style={{ touchAction: "manipulation" }}
        >
          <Image src="/tt-mark.png" alt="" width={22} height={22} className="block" priority />
        </Link>
      )}
    </div>
  );
}
