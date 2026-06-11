"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Check, X, Clock } from "lucide-react";
import { abandonedCheckouts, type AbandonedCheckout, type AbandonedStage } from "@/data/abandoned-checkouts";
import { Rs } from "@/components/vendor/Rs";

const NOW = new Date("2026-06-11T10:00:00");

const STAGE_META: Record<AbandonedStage, { label: string; color: string }> = {
  shipping: { label: "Left at shipping", color: "text-[#B0863A] bg-[#FAF3E8]" },
  payment:  { label: "Left at payment",  color: "text-[#DC2626] bg-[#FEF2F2]" },
  review:   { label: "Left at review",   color: "text-[#6B6B68] bg-[#F0F0EC]" },
};

const DISCOUNTS = [10, 15, 20] as const;
type Discount = (typeof DISCOUNTS)[number];

function abbreviateName(full: string): string {
  const parts = full.trim().split(/\s+/);
  if (parts.length < 2) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
}

function timeAgo(iso: string): string {
  const diffMs = NOW.getTime() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / 3_600_000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function RecoveryPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [discount, setDiscount] = useState<Discount>(15);
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const pending = abandonedCheckouts.filter((c) => !sentIds.has(c.id));
  const recoverable = useMemo(
    () => pending.reduce((s, c) => s + c.cartValue, 0),
    [pending]
  );
  const recoveryRate = abandonedCheckouts.length
    ? Math.round((sentIds.size / abandonedCheckouts.length) * 100)
    : 0;

  const openCheckout = (c: AbandonedCheckout) => {
    setDiscount(15);
    setOpenId((id) => (id === c.id ? null : c.id));
  };

  const handleSend = (c: AbandonedCheckout) => {
    setSentIds((prev) => new Set(prev).add(c.id));
    setOpenId(null);
    setToast(`Recovery email sent to ${abbreviateName(c.customerName)} with ${discount}% off`);
  };

  const code = (name: string) => `COMEBACK${discount}`;

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-[#0A0A0A]">Take Two </span>
          <span className="bg-gradient-to-r from-[#16A34A] to-[#4ADE80] bg-clip-text text-transparent">Recovery</span>
        </h1>
        <p className="text-xs tracking-wide text-[#9B9B98] mt-2">
          Win back shoppers who left before checking out
        </p>
      </div>

      {/* Toast */}
      {toast && (
        <div className="mb-5 flex items-center gap-2 bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] text-sm rounded-xl px-4 py-3">
          <Check size={15} strokeWidth={2.5} className="shrink-0" />
          {toast}
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {[
          { label: "Abandoned Carts", value: pending.length.toLocaleString(), currency: false },
          { label: "Recoverable Value", value: recoverable, currency: true },
          { label: "Recovery Rate", value: `${recoveryRate}%`, currency: false },
        ].map(({ label, value, currency }) => (
          <div key={label} className="bg-white rounded-xl p-4 border border-[#E8E8E4]">
            <p className="text-[11px] font-medium text-[#9B9B98] uppercase tracking-widest mb-1.5">{label}</p>
            <p className="font-mono-num text-xl font-semibold text-[#111111]">
              {currency ? <Rs value={value as number} /> : value}
            </p>
          </div>
        ))}
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-[#E8E8E4] overflow-hidden">
        {pending.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#9B9B98]">
            <p className="text-sm font-medium text-[#111111] mb-1">All caught up</p>
            <p className="text-xs">Every abandoned cart has been sent a recovery offer</p>
          </div>
        ) : (
          <>
            {/* Desktop header */}
            <div className="hidden md:grid grid-cols-[1fr_1.4fr_120px_150px_120px] gap-x-4 px-5 py-3 border-b border-[#F0F0EC] bg-[#FAFAF8]">
              {["Customer", "Items", "Cart Value", "Stage", ""].map((h, i) => (
                <p key={i} className="text-[11px] font-medium text-[#9B9B98] uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {pending.map((c, i) => {
              const firstItem = c.items[0];
              const isLast = i === pending.length - 1;
              const meta = STAGE_META[c.stage];
              const isOpen = openId === c.id;

              return (
                <div
                  key={c.id}
                  className={`px-5 py-3.5 transition-colors ${!isLast || isOpen ? "border-b border-[#F0F0EC]" : ""} ${isOpen ? "bg-[#FAFAF8]" : "hover:bg-[#FAFAF8]"}`}
                >
                  {/* Desktop row */}
                  <div className="hidden md:grid grid-cols-[1fr_1.4fr_120px_150px_120px] gap-x-4 items-center">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#111111] truncate">{abbreviateName(c.customerName)}</p>
                      <p className="text-[10px] text-[#9B9B98] truncate">{c.customerEmail}</p>
                    </div>

                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#F0F0EC] shrink-0">
                        {firstItem.image && (
                          <Image src={firstItem.image} alt={firstItem.name} width={36} height={36} className="object-cover w-full h-full" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-[#111111] truncate">
                          {firstItem.name}
                          {c.items.length > 1 && <span className="text-[#9B9B98]"> +{c.items.length - 1}</span>}
                        </p>
                        <p className="font-mono-num text-[10px] text-[#9B9B98] flex items-center gap-1">
                          <Clock size={9} /> {timeAgo(c.abandonedAt)}
                        </p>
                      </div>
                    </div>

                    <p className="font-mono-num text-sm font-semibold text-[#111111]">
                      <Rs value={c.cartValue} />
                    </p>

                    <span className={`text-[10px] font-semibold px-2 py-1 rounded-lg w-fit ${meta.color}`}>
                      {meta.label}
                    </span>

                    <button
                      onClick={() => openCheckout(c)}
                      className="text-[11px] font-semibold px-3 py-1.5 rounded-lg border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer whitespace-nowrap w-fit"
                    >
                      {isOpen ? "Cancel" : "Send offer"}
                    </button>
                  </div>

                  {/* Mobile card */}
                  <div className="md:hidden flex items-start gap-3">
                    <div className="w-11 h-11 rounded-lg overflow-hidden bg-[#F0F0EC] shrink-0">
                      {firstItem.image && (
                        <Image src={firstItem.image} alt={firstItem.name} width={44} height={44} className="object-cover w-full h-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-medium text-[#111111] truncate">{abbreviateName(c.customerName)}</p>
                        <p className="font-mono-num text-sm font-semibold text-[#111111] shrink-0"><Rs value={c.cartValue} /></p>
                      </div>
                      <p className="text-[11px] text-[#9B9B98] mt-0.5 truncate">{firstItem.name}{c.items.length > 1 && ` +${c.items.length - 1}`}</p>
                      <div className="flex items-center justify-between gap-2 mt-1.5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${meta.color}`}>{meta.label}</span>
                        <button
                          onClick={() => openCheckout(c)}
                          className="text-[11px] font-semibold px-3 py-1 rounded-lg border border-[#111111] text-[#111111] active:bg-[#111111] active:text-white transition-colors cursor-pointer"
                        >
                          {isOpen ? "Cancel" : "Send offer"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded — discount picker + email preview */}
                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-[#F0F0EC]">
                      <p className="text-[11px] font-medium text-[#9B9B98] uppercase tracking-widest mb-2">Discount offer</p>
                      <div className="flex items-center gap-1.5 mb-4">
                        {DISCOUNTS.map((d) => (
                          <button
                            key={d}
                            onClick={() => setDiscount(d)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                              discount === d
                                ? "bg-[#111111] text-white border-[#111111]"
                                : "bg-white text-[#6B6B68] border-[#E8E8E4] hover:border-[#9B9B98]"
                            }`}
                          >
                            {d}% off
                          </button>
                        ))}
                      </div>

                      {/* Mock email preview */}
                      <div className="bg-white border border-[#E8E8E4] rounded-xl overflow-hidden mb-4 max-w-md">
                        <div className="px-4 py-2.5 border-b border-[#F0F0EC] bg-[#FAFAF8]">
                          <p className="text-[10px] text-[#9B9B98]">To: {c.customerEmail}</p>
                          <p className="text-xs font-semibold text-[#111111] mt-0.5">Still thinking it over? Here&apos;s {discount}% off</p>
                        </div>
                        <div className="px-4 py-3 text-xs text-[#6B6B68] leading-relaxed">
                          <p>Hi {c.customerName.split(" ")[0]},</p>
                          <p className="mt-1.5">
                            You left {c.items.length} item{c.items.length !== 1 ? "s" : ""} in your bag. Complete your order now and take{" "}
                            <span className="font-semibold text-[#111111]">{discount}% off</span> with code{" "}
                            <span className="font-mono-num font-semibold text-[#16A34A]">{code(c.customerName)}</span>.
                          </p>
                          <p className="mt-1.5 text-[#9B9B98]">Offer expires in 48 hours.</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSend(c)}
                          className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-[#111111] text-white hover:bg-[#333333] transition-colors cursor-pointer"
                        >
                          <Check size={13} strokeWidth={2.5} /> Send recovery email
                        </button>
                        <button
                          onClick={() => setOpenId(null)}
                          className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-[#E8E8E4] text-[#6B6B68] hover:border-[#9B9B98] transition-colors cursor-pointer"
                        >
                          <X size={13} /> Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
