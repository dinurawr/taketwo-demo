"use client";

import { BottomNav } from "@/components/customer/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative pb-32 bg-white">
      {children}
      <BottomNav />
    </div>
  );
}
