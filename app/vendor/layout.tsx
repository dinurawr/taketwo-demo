import { Sidebar } from "@/components/vendor/Sidebar";
import { DemoBanner } from "@/components/DemoBanner";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DemoBanner />
      <div className="flex min-h-screen bg-[#F5F5F3] pt-7">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </>
  );
}
