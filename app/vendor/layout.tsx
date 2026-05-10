import { Sidebar } from "@/components/vendor/Sidebar";
import { VendorBottomNav } from "@/components/vendor/VendorBottomNav";
import { DemoBanner } from "@/components/DemoBanner";
import Image from "next/image";
import Link from "next/link";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DemoBanner />

      {/* Mobile top bar — logo + home link (no top-7 offset; DemoBanner is now floating) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[#111111] h-12 px-4 flex items-center justify-between border-b border-white/10">
        <Image
          src="/logo.png"
          alt="Take Two"
          width={72}
          height={42}
          className="brightness-0 invert opacity-90"
        />
        <Link href="/" className="text-white/40 hover:text-white/70 text-xs transition-colors">
          ← Home
        </Link>
      </div>

      <div className="flex min-h-screen bg-[#F5F5F3]">
        {/* Sidebar — desktop only */}
        <div className="hidden md:block shrink-0">
          <Sidebar />
        </div>

        {/* Content — extra top pad on mobile for topbar, bottom pad for tab bar */}
        <main className="flex-1 overflow-y-auto pt-12 pb-20 md:pt-0 md:pb-0">
          {children}
        </main>
      </div>

      {/* Bottom tabs — mobile only */}
      <VendorBottomNav />
    </>
  );
}
