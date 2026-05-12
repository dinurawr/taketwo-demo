import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { mockUser } from "@/data/user";

export default function EditProfilePage() {
  return (
    <div className="flex flex-col bg-white min-h-full pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-5 border-b border-[#F0F0F0]">
        <Link href="/customer/account">
          <ChevronLeft size={20} strokeWidth={1.5} className="text-[#111111]" />
        </Link>
        <h1 className="text-base font-bold text-[#111111] tracking-wide">Edit Profile</h1>
      </div>

      <div className="px-5 pt-6 space-y-5">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-2">
          <div className="w-20 h-20 rounded-full bg-[#859365] flex items-center justify-center text-white font-bold text-2xl">
            {mockUser.avatar}
          </div>
          <button className="mt-2 text-xs text-[#859365] font-semibold">Change Photo</button>
        </div>

        {/* Form fields — read-only for demo */}
        {[
          { label: "Full Name", value: mockUser.name },
          { label: "Email", value: mockUser.email },
          { label: "Phone", value: "+94 77 000 0000" },
          { label: "Height", value: mockUser.height },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-[10px] text-[#999999] uppercase tracking-widest mb-1.5 font-semibold">
              {label}
            </p>
            <input
              type="text"
              defaultValue={value}
              disabled
              className="w-full bg-[#F8F8F6] text-[#111111] text-sm px-4 py-3 border border-[#E8E8E8] outline-none font-light"
            />
          </div>
        ))}

        {/* Save button */}
        <button
          className="w-full bg-[#111111] text-white py-4 text-sm font-bold uppercase tracking-widest mt-2"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          Save Changes
        </button>

        <p className="text-center text-[10px] text-[#AAAAAA]">
          Demo mode — changes are not saved
        </p>
      </div>
    </div>
  );
}
