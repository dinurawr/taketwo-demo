"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const PHONE_W = 390;
const PHONE_H = 844;
const PAD = 24;

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
  // The centring container. We measure ITS size (not window.innerWidth/Height)
  // to compute the scale — see the effect below for why that matters.
  const containerRef = useRef<HTMLDivElement>(null);
  // IMPORTANT: initialise to a DETERMINISTIC value (1) that is identical on the
  // server and on the client's first hydration render. Measuring here instead
  // produces a server/client mismatch (server has no DOM, so it renders
  // scale(1); the client renders the real scale). React refuses to patch a
  // mismatched inline style ("won't be patched up"), leaving the DOM frozen at
  // scale(1) — the whole phone zoomed-in/overflowing. Starting at 1 (matching
  // SSR) means the effect below always applies a *real* change.
  const [scale, setScale] = useState(1);
  // Gate visibility until the first client-side measure so a direct load /
  // deep link never paints the un-scaled (zoomed-in) state before the correct
  // scale is applied. opacity starts 0 on both server and client (no mismatch).
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function measure() {
      const node = containerRef.current;
      if (!node) return;
      // Don't rescale while a text input is focused. On Android the viewport
      // shrinks for the on-screen keyboard, which would otherwise zoom the whole
      // phone frame out the moment you tap the search bar.
      const ae = document.activeElement;
      if (ae && (ae.tagName === "INPUT" || ae.tagName === "TEXTAREA")) return;
      // Measure the CONTAINER, not window.innerWidth/innerHeight. The container's
      // height comes from `100svh` (the *small* viewport height), which is a fixed
      // per-device value that does NOT change as iOS Safari's address bar
      // collapses/expands. window.innerHeight DOES change with the address bar and
      // is read at an unreliable moment on refresh / bfcache restore / tab-return,
      // which is exactly what left the phone stuck zoomed-in on those actions.
      const cw = node.clientWidth;
      const ch = node.clientHeight;
      if (!cw || !ch) return;
      const next = Math.min((cw - PAD * 2) / PHONE_W, (ch - PAD * 2) / PHONE_H, 1);
      setScale(next);
      setReady(true);
    }

    measure();
    // A ResizeObserver on the container fires for EVERY reason the available
    // space changes — first paint, refresh, bfcache restore, tab-return,
    // rotation — without depending on which window event a given browser emits.
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // Belt-and-suspenders alongside the observer: `resize` catches viewport
    // changes an RO occasionally coalesces, `pageshow` fires on bfcache restore
    // (iOS tab-return / back-forward), and `orientationchange` covers rotation.
    window.addEventListener("resize", measure);
    window.addEventListener("pageshow", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("pageshow", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  return (
    /* Outer centring shell */
    <div
      ref={containerRef}
      className="flex items-center justify-center bg-[#E8E8E8] mt-12 md:mt-0 min-h-[calc(100svh-3rem)] md:min-h-[100svh]"
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
          opacity: ready ? 1 : 0,
          transition: "opacity 0.15s ease-out",
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
          {/* Status bar — transparent so images bleed through */}
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 pt-4 pb-2">
            <span className="text-[11px] font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">9:41</span>
            {/* Dynamic island — absolutely centred */}
            <div className="absolute left-1/2 -translate-x-1/2 w-24 h-5 bg-[#111111] rounded-full" />
            <div className="flex items-center gap-1">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <rect x="0" y="8" width="3" height="4" rx="0.5" fill="white" />
                <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="white" />
                <rect x="9" y="2" width="3" height="10" rx="0.5" fill="white" />
                <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="white" />
              </svg>
              <svg width="16" height="12" viewBox="0 0 24 18" fill="none">
                <path d="M12 14a2 2 0 100 4 2 2 0 000-4z" fill="white" />
                <path d="M7.76 11.76A6 6 0 0112 10c1.66 0 3.16.67 4.24 1.76l1.41-1.41A8 8 0 0012 8a8 8 0 00-5.66 2.34l1.42 1.42z" fill="white" />
                <path d="M4.93 8.93A12 12 0 0112 6c2.76 0 5.3 1 7.24 2.65l1.42-1.41A14 14 0 0012 4 14 14 0 003.52 7.51l1.41 1.42z" fill="white" />
              </svg>
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
                <rect x="0.5" y="0.5" width="18" height="11" rx="2.5" stroke="white" />
                <rect x="2" y="2" width="14" height="8" rx="1.5" fill="white" />
                <path d="M19.5 4.5v3a1.5 1.5 0 000-3z" fill="white" />
              </svg>
            </div>
          </div>

          {/* Scrollable content — no top padding, content bleeds behind status bar */}
          <div id="scroll-container" className="h-full overflow-y-auto phone-scroll">
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
