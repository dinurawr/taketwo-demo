"use client";

import { MenuProvider, useMenu } from "@/lib/menu-store";
import { DemoBanner } from "@/components/DemoBanner";
import { BottomNav } from "@/components/customer/BottomNav";
import { MenuDrawer } from "@/components/customer/MenuDrawer";

function CustomerShell({ children }: { children: React.ReactNode }) {
  const { isOpen, close } = useMenu();
  return (
    <>
      {/* pt-7 clears the fixed DemoBanner (~28 px) */}
      <div className="pt-7">
        {/* Constrain to phone-width on desktop, full-width on mobile */}
        <div className="max-w-[430px] mx-auto bg-white min-h-screen">
          {children}
        </div>
      </div>

      {/* Fixed overlays — outside content flow */}
      <BottomNav />
      <MenuDrawer isOpen={isOpen} onClose={close} />
    </>
  );
}

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <MenuProvider>
      <DemoBanner />
      <CustomerShell>{children}</CustomerShell>
    </MenuProvider>
  );
}
