import { mockUser, rewardsTiers } from "@/data/user";
import { orders } from "@/data/orders";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Package, Heart, Star, Settings } from "lucide-react";

const CUSTOMER_ID = "u1";

export default function AccountPage() {
  const myOrders = orders.filter((o) => o.customerId === CUSTOMER_ID);
  const tier = rewardsTiers.find((t) => t.name === mockUser.rewardsTier)!;
  const nextTier = rewardsTiers[rewardsTiers.indexOf(tier) + 1];
  const progress = nextTier
    ? ((mockUser.rewardsPoints - tier.minPoints) / (nextTier.minPoints - tier.minPoints)) * 100
    : 100;

  return (
    <div className="flex flex-col bg-white">
      {/* Profile header */}
      <div className="px-5 pt-2 pb-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#859365] flex items-center justify-center text-white font-bold text-lg shrink-0">
            {mockUser.avatar}
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#111111]">{mockUser.name}</h1>
            <p className="text-sm text-[#666666]">{mockUser.email}</p>
          </div>
          <button className="ml-auto">
            <Settings size={18} strokeWidth={1.5} className="text-[#999999]" />
          </button>
        </div>
      </div>

      {/* Rewards card */}
      <div className="mx-5 mb-4 rounded-2xl overflow-hidden bg-[#111111] p-4 text-white">
        <div className="flex items-start justify-between mb-1">
          <Image src="/logo.png" alt="Take Two" width={60} height={35} className="brightness-0 invert opacity-80" />
          <div className="text-right">
            <p className="text-2xl font-bold">{mockUser.rewardsPoints}</p>
            <p className="text-xs text-white/50">points</p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-white/50 uppercase tracking-widest">Membership</p>
            <p className="text-xl font-bold mt-0.5" style={{ color: tier.color }}>
              {tier.name}
            </p>
          </div>
        </div>
        <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${Math.min(progress, 100)}%`, backgroundColor: "#ED832B" }}
          />
        </div>
        {nextTier && (
          <p className="mt-1.5 text-[10px] text-white/40">
            {nextTier.minPoints - mockUser.rewardsPoints} pts to {nextTier.name}
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tier.perks.map((perk) => (
            <span key={perk} className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-white/70">
              {perk}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mx-5 mb-4 grid grid-cols-3 gap-2">
        {[
          { label: "Orders", value: myOrders.length },
          { label: "Saved", value: mockUser.favoriteIds.length },
          { label: "Reviews", value: 2 },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#F8F8F6] rounded-2xl p-3 text-center border border-[#F0F0F0]">
            <p className="text-xl font-bold text-[#4A89C2]">{value}</p>
            <p className="text-xs text-[#666666]">{label}</p>
          </div>
        ))}
      </div>

      {/* Body measurements */}
      <div className="mx-5 mb-4 bg-[#F0F3EC] rounded-2xl p-4">
        <p className="text-sm font-bold text-[#111111] mb-3">My Measurements</p>
        <div className="flex gap-4">
          <div className="flex-1">
            <p className="text-xs text-[#666666]">Height</p>
            <p className="text-sm font-semibold text-[#111111] mt-0.5">{mockUser.height}</p>
          </div>
          <div className="flex-1">
            <p className="text-xs text-[#666666]">Weight (private)</p>
            <p className="text-sm font-semibold text-[#111111] mt-0.5">••• kg</p>
          </div>
        </div>
        <p className="text-[10px] text-[#859365] mt-2 font-medium">
          ✓ Used for personalised size recommendations
        </p>
      </div>

      {/* Quick links */}
      <div className="mx-5 bg-white rounded-2xl overflow-hidden border border-[#F0F0F0]">
        {[
          { icon: Package, label: "My Orders", href: "/customer/orders" },
          { icon: Heart, label: "Saved Items", href: "/customer/favorites" },
          { icon: Star, label: "My Reviews", href: "#" },
        ].map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 px-4 py-3.5 border-b border-[#F8F8F6] last:border-0"
          >
            <Icon size={16} strokeWidth={1.5} className="text-[#859365]" />
            <span className="text-sm font-medium text-[#111111] flex-1">{label}</span>
            <ChevronRight size={16} strokeWidth={1.5} className="text-[#999999]" />
          </Link>
        ))}
      </div>
    </div>
  );
}
