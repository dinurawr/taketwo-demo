import { Sidebar } from "@/components/vendor/Sidebar";
import { VendorBottomNav } from "@/components/vendor/VendorBottomNav";
import { DemoBanner } from "@/components/DemoBanner";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DemoBanner />
      <div className="flex min-h-screen bg-[#F7F6F3]">
        {/* Sidebar — desktop only */}
        <div className="hidden md:block shrink-0">
          <Sidebar />
        </div>

        {/* Content */}
        <main className="flex-1 md:overflow-y-auto pb-6 md:pb-0 min-w-0">
          <VendorBottomNav />
          {children}
        </main>
      </div>
    </>
  );
}
