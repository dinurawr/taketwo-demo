import { Sidebar } from "@/components/vendor/Sidebar";
import { VendorBottomNav } from "@/components/vendor/VendorBottomNav";
import { DemoBanner } from "@/components/DemoBanner";
import Image from "next/image";
import Link from "next/link";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DemoBanner />
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-[#E8E8E8] h-12 flex items-center justify-center">
        <Image src="/logo.png" alt="Take Two" width={68} height={40} />
      </div>

      <div className="flex min-h-screen bg-[#F7F6F3]">
        {/* Sidebar — desktop only */}
        <div className="hidden md:block shrink-0">
          <Sidebar />
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto pt-12 pb-24 md:pt-0 md:pb-0 min-w-0">
          {children}
        </main>
      </div>

      {/* Bottom nav — mobile only */}
      <VendorBottomNav />
    </>
  );
}
