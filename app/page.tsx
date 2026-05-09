import Link from "next/link";
import Image from "next/image";

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

      {/* Demo badge */}
      <div className="mb-8 px-4 py-1.5 bg-[#859365] rounded-full text-white text-xs tracking-widest uppercase font-semibold">
        Vendor Demo · 2026
      </div>

      {/* Role cards */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
        {/* Customer card */}
        <Link
          href="/customer"
          className="flex-1 group bg-white rounded-3xl p-8 shadow-sm border-2 border-[#E8E8E8] hover:border-[#859365] hover:shadow-lg transition-all duration-200 flex flex-col items-center gap-4 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-[#F0F3EC] flex items-center justify-center text-2xl group-hover:bg-[#859365] transition-colors">
            🛍️
          </div>
          <div>
            <p className="text-[10px] text-[#859365] uppercase tracking-widest mb-1 font-semibold">View as</p>
            <h2 className="text-xl font-bold text-[#111111]">Customer</h2>
            <p className="text-sm text-[#666666] mt-1">
              Browse, discover &amp; shop across all brands
            </p>
          </div>
          <span className="mt-2 text-sm font-semibold text-[#ED832B] group-hover:underline">
            Enter app →
          </span>
        </Link>

        {/* Vendor card */}
        <Link
          href="/vendor"
          className="flex-1 group bg-[#111111] rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col items-center gap-4 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-2xl group-hover:bg-[#859365] transition-colors">
            📦
          </div>
          <div>
            <p className="text-[10px] text-[#859365] uppercase tracking-widest mb-1 font-semibold">View as</p>
            <h2 className="text-xl font-bold text-white">Vendor</h2>
            <p className="text-sm text-white/60 mt-1">
              Orders, returns &amp; brand analytics
            </p>
          </div>
          <span className="mt-2 text-sm font-semibold text-[#ED832B] group-hover:underline">
            Enter dashboard →
          </span>
        </Link>
      </div>

      {/* Brands strip */}
      <div className="mt-14 flex flex-wrap justify-center gap-3 max-w-lg">
        {["Valley", "North Lane", "Halcyon", "Nilo", "Ember"].map((brand) => (
          <span
            key={brand}
            className="px-3 py-1 bg-[#F8F8F6] rounded-full text-xs text-[#666666] border border-[#E8E8E8] font-medium"
          >
            {brand}
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs text-[#999999]">5 partner brands · 16 products · Sri Lanka 🇱🇰</p>
    </main>
  );
}
