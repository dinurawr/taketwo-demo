"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { MenuDrawer } from "@/components/customer/MenuDrawer";

export function TopBar() {
  const [visible, setVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    const target = container ?? window;

    function onScroll() {
      const scrollY =
        container ? container.scrollTop : window.scrollY;
      setVisible(scrollY > 60);
    }

    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className="sticky top-0 z-40 transition-transform duration-300 ease-out"
        style={{ transform: visible ? "translateY(0)" : "translateY(-100%)" }}
      >
        <div className="backdrop-blur-md bg-white/80 border-b border-black/5 px-4 py-2.5 flex items-center justify-between">
          {/* Hamburger */}
          <button
            className="w-9 h-9 flex items-center justify-center"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
          >
            <div className="flex flex-col gap-1">
              <span className="w-5 h-0.5 bg-[#111111] rounded-full" />
              <span className="w-3 h-0.5 bg-[#111111] rounded-full" />
            </div>
          </button>

          {/* Logo */}
          <Image src="/logo.png" alt="Take Two" width={72} height={42} priority />

          {/* Search */}
          <Link
            href="/customer/search"
            className="w-9 h-9 flex items-center justify-center"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.5} className="text-[#111111]" />
          </Link>
        </div>
      </div>

      <MenuDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
