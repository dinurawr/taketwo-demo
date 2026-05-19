import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Store } from "lucide-react";

export default function RolePicker() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-8 text-center">
        <Image
          src="/logo.png"
          alt="Take Two"
          width={280}
          height={164}
          className="mx-auto"
          priority
        />
        <p className="mt-1 text-[#666666] text-xs tracking-widest uppercase font-medium">
          Sri Lanka&apos;s First Collaborative Fashion Platform
        </p>
      </div>

      {/* Quiet version line */}
      <p className="text-[#C8C8C8] text-[9px] tracking-[0.4em] uppercase font-medium mb-10">
        Preview · 2026
      </p>

      {/* Role cards */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
        {/* Customer card */}
        <Link
          href="/customer"
          className="flex-1 group bg-white rounded-3xl p-8 shadow-sm border-2 border-[#E8E8E8] hover:border-[#859365] hover:shadow-lg transition-all duration-200 flex flex-col items-center gap-4 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-[#F0F3EC] flex items-center justify-center group-hover:bg-[#859365] transition-colors">
            <ShoppingBag size={22} strokeWidth={1.6} className="text-[#859365] group-hover:text-white transition-colors" />
          </div>
          <div>
            <p className="text-[10px] text-[#859365] uppercase tracking-widest mb-1 font-semibold">View as</p>
            <h2 className="text-xl font-bold text-[#111111]">Customer</h2>
          </div>
          <span className="mt-2 text-sm font-semibold text-[#ED832B] group-hover:underline">
            Enter app →
          </span>
        </Link>

        {/* Vendor card */}
        <Link
          href="/vendor"
          className="flex-1 group bg-white rounded-3xl p-8 shadow-sm border-2 border-[#E8E8E8] hover:border-[#859365] hover:shadow-lg transition-all duration-200 flex flex-col items-center gap-4 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-[#F0F3EC] flex items-center justify-center group-hover:bg-[#859365] transition-colors">
            <Store size={22} strokeWidth={1.6} className="text-[#859365] group-hover:text-white transition-colors" />
          </div>
          <div>
            <p className="text-[10px] text-[#859365] uppercase tracking-widest mb-1 font-semibold">View as</p>
            <h2 className="text-xl font-bold text-[#111111]">Vendor</h2>
          </div>
          <span className="mt-2 text-sm font-semibold text-[#ED832B] group-hover:underline">
            Enter dashboard →
          </span>
        </Link>
      </div>
    </main>
  );
}
