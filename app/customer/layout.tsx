"use client";

import { MenuProvider, useMenu } from "@/lib/menu-store";
import { PhoneFrame } from "@/components/PhoneFrame";
import { DemoBanner } from "@/components/DemoBanner";
import { BottomNav } from "@/components/customer/BottomNav";
import { MenuDrawer } from "@/components/customer/MenuDrawer";

function CustomerShell({ children }: { children: React.ReactNode }) {
  const { isOpen, close } = useMenu();
  return (
    <div className="pt-7">
      <PhoneFrame
        nav={<BottomNav />}
        overlay={<MenuDrawer isOpen={isOpen} onClose={close} />}
      >
        {children}
      </PhoneFrame>
    </div>
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
