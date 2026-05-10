"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const PHONE_W = 390;
const PHONE_H = 844;
const BANNER_H = 28; // DemoBanner fixed height (~py-1.5 + text)
const PAD = 24;      // breathing room around the phone

export function PhoneFrame({
  children,
  nav,
  overlay,
  className,
}: {
  children: React.ReactNode;
  nav?: React.ReactNode;
  overlay?: React.ReactNode;
  className?: string;
}) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function updateScale() {
      const vw = window.innerWidth;
      const vh = window.innerHeight - BANNER_H;
      const sx = (vw - PAD * 2) / PHONE_W;
      const sy = (vh - PAD * 2) / PHONE_H;
      // Fit to screen but never scale above 1× (don't upscale on huge monitors)
      setScale(Math.min(sx, sy, 1));
    }
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    /* Outer centring shell */
    <div
      className="flex items-center justify-center bg-[#E8E8E8]"
      style={{ minHeight: `calc(100svh - ${BANNER_H}px)` }}
    >
      {/*
        Scale wrapper: takes up exactly the scaled footprint so the flex
        container centres it correctly and nothing overflows.
      */}
      <div
        style={{
          width: PHONE_W * scale,
          height: PHONE_H * scale,
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Phone shell at natural 390×844, scaled from top-left */}
        <div
          className={cn(
            "absolute top-0 left-0 origin-top-left",
            "w-[390px] h-[844px] bg-white rounded-[48px] shadow-2xl overflow-hidden",
            "ring-8 ring-[#1A1A1A]",
            className
          )}
          style={{ transform: `scale(${scale})` }}
        >
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 pt-4 pb-2 bg-white/95 backdrop-blur-sm">
            <span className="text-[11px] font-semibold text-[#111111]">9:41</span>
            {/* Dynamic island — absolutely centred */}
            <div className="absolute left-1/2 -translate-x-1/2 w-24 h-5 bg-[#111111] rounded-full" />
            <div className="flex items-center gap-1">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <rect x="0" y="8" width="3" height="4" rx="0.5" fill="#111" />
                <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="#111" />
                <rect x="9" y="2" width="3" height="10" rx="0.5" fill="#111" />
                <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="#111" />
              </svg>
              <svg width="16" height="12" viewBox="0 0 24 18" fill="none">
                <path d="M12 14a2 2 0 100 4 2 2 0 000-4z" fill="#111" />
                <path d="M7.76 11.76A6 6 0 0112 10c1.66 0 3.16.67 4.24 1.76l1.41-1.41A8 8 0 0012 8a8 8 0 00-5.66 2.34l1.42 1.42z" fill="#111" />
                <path d="M4.93 8.93A12 12 0 0112 6c2.76 0 5.3 1 7.24 2.65l1.42-1.41A14 14 0 0012 4 14 14 0 003.52 7.51l1.41 1.42z" fill="#111" />
              </svg>
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
                <rect x="0.5" y="0.5" width="18" height="11" rx="2.5" stroke="#111" />
                <rect x="2" y="2" width="14" height="8" rx="1.5" fill="#111" />
                <path d="M19.5 4.5v3a1.5 1.5 0 000-3z" fill="#111" />
              </svg>
            </div>
          </div>

          {/* Scrollable content */}
          <div id="scroll-container" className="h-full pt-16 overflow-y-auto phone-scroll">
            {children}
          </div>

          {/* Drawer overlay — clipped by phone overflow-hidden */}
          {overlay}

          {/* Bottom nav — outside scroll container */}
          {nav}

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-[#111111]/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
