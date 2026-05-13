"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { orders as allOrders, type Order, type OrderStatus } from "@/data/orders";

const VENDOR_BRAND = "serendib-style";
const NOW = new Date("2026-05-12");

type TimePeriod = "today" | "7d" | "30d" | "90d" | "all";
type StatusGroup = "all" | "active" | "returns" | "complete";

const TIME_PERIODS: { key: TimePeriod; label: string; days: number | null }[] = [
  { key: "today", label: "Today",    days: 1    },
  { key: "7d",    label: "7 days",   days: 7    },
  { key: "30d",   label: "30 days",  days: 30   },
  { key: "90d",   label: "90 days",  days: 90   },
  { key: "all",   label: "All time", days: null },
];

const STATUS_FILTERS: { key: StatusGroup; label: string }[] = [
  { key: "all",      label: "All"      },
  { key: "active",   label: "Active"   },
  { key: "returns",  label: "Returns"  },
  { key: "complete", label: "Complete" },
];

const STATUS_META: Record<StatusGroup, { label: string; color: string }> = {
  all:      { label: "All",      color: "" },
  active:   { label: "Active",   color: "text-[#16A34A] bg-[#F0FDF4]" },
  returns:  { label: "Returns",  color: "text-[#DC2626] bg-[#FEF2F2]" },
  complete: { label: "Complete", color: "text-[#6B6B68] bg-[#F0F0EC]" },
};

function getStatusGroup(status: OrderStatus): StatusGroup {
  if (status === "completed") return "complete";
  if (status === "returning" || status === "pending_verdict") return "returns";
  return "active";
}

function abbreviateName(full: string): string {
  const parts = full.trim().split(/\s+/);
  if (parts.length < 2) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
}

function filterByTime(orders: Order[], period: TimePeriod): Order[] {
  const entry = TIME_PERIODS.find((p) => p.key === period);
  if (!entry || entry.days == null) return orders;
  const cutoff = new Date(NOW);
  cutoff.setDate(cutoff.getDate() - entry.days);
  return orders.filter((o) => new Date(o.placedAt) >= cutoff);
}

export default function OrdersPage() {
  const [timePeriod, setTimePeriod]     = useState<TimePeriod>("30d");
  const [statusFilter, setStatusFilter] = useState<StatusGroup>("all");

  const myOrders = useMemo(
    () => allOrders.filter((o) => o.items.some((i) => i.brand === VENDOR_BRAND)),
    []
  );
  const periodOrders = useMemo(() => filterByTime(myOrders, timePeriod), [myOrders, timePeriod]);
  const filtered = useMemo(() => {
    if (statusFilter === "all") return periodOrders;
    return periodOrders.filter((o) => getStatusGroup(o.status) === statusFilter);
  }, [periodOrders, statusFilter]);

  const totalRevenue  = periodOrders.reduce((s, o) => s + o.total, 0);
  const avgOrderValue = periodOrders.length ? Math.round(totalRevenue / periodOrders.length) : 0;

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-[#0A0A0A]">Take Two </span><span className="bg-gradient-to-r from-[#16A34A] to-[#4ADE80] bg-clip-text text-transparent">Orders</span>
        </h1>
        <p className="text-xs tracking-wide text-[#9B9B98] mt-2">All orders attributed to your store</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {[
          { label: "Total Orders",     value: periodOrders.length.toLocaleString() },
          { label: "Revenue",          value: `₨ ${totalRevenue.toLocaleString()}` },
          { label: "Avg. Order Value", value: periodOrders.length ? `₨ ${avgOrderValue.toLocaleString()}` : "—" },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl p-4 border border-[#E8E8E4]">
            <p className="text-[11px] font-medium text-[#9B9B98] uppercase tracking-widest mb-1.5">{label}</p>
            <p className="font-mono-num text-xl font-semibold text-[#111111]">{value}</p>
          </div>
        ))}
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-4 mb-5">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {TIME_PERIODS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTimePeriod(key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                timePeriod === key
                  ? "bg-[#111111] text-white border-[#111111]"
                  : "bg-white text-[#6B6B68] border-[#E8E8E4] hover:border-[#9B9B98]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="w-px h-4 bg-[#E8E8E4] hidden sm:block" />
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {STATUS_FILTERS.map(({ key, label }) => {
            const count = key === "all"
              ? periodOrders.length
              : periodOrders.filter((o) => getStatusGroup(o.status) === key).length;
            return (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === key
                    ? "bg-[#111111] text-white border-[#111111]"
                    : "bg-white text-[#6B6B68] border-[#E8E8E4] hover:border-[#9B9B98]"
                }`}
              >
                {label} <span className="opacity-50 font-mono-num">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E8E8E4] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#9B9B98]">
            <p className="text-sm font-medium text-[#111111] mb-1">No orders match</p>
            <p className="text-xs">Try a different period or status filter</p>
          </div>
        ) : (
          <>
            {/* Desktop header */}
            <div className="hidden md:grid grid-cols-[1.2fr_1fr_1.2fr_120px_110px] gap-x-4 px-5 py-3 border-b border-[#F0F0EC] bg-[#FAFAF8]">
              {["Order", "Customer", "Items", "Total", "Status"].map((h) => (
                <p key={h} className="text-[11px] font-medium text-[#9B9B98] uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {filtered.map((order, i) => {
              const firstItem   = order.items[0];
              const statusGroup = getStatusGroup(order.status);
              const isLast      = i === filtered.length - 1;
              const meta        = STATUS_META[statusGroup];

              return (
                <div
                  key={order.id}
                  className={`px-5 py-3.5 hover:bg-[#FAFAF8] transition-colors ${!isLast ? "border-b border-[#F0F0EC]" : ""}`}
                >
                  {/* Desktop row */}
                  <div className="hidden md:grid grid-cols-[1.2fr_1fr_1.2fr_120px_110px] gap-x-4 items-center">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#F0F0EC] shrink-0">
                        <Image src={firstItem.image} alt={firstItem.productName} width={36} height={36} className="object-cover w-full h-full" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-mono-num text-xs font-medium text-[#111111] truncate">{order.id}</p>
                        <p className="font-mono-num text-[10px] text-[#9B9B98]">
                          {new Date(order.placedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#111111] truncate">{abbreviateName(order.customerName)}</p>
                      <p className="text-[10px] text-[#9B9B98] truncate">{order.customerAddress.split(",").pop()?.trim()}</p>
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-[#111111] truncate">
                        {firstItem.productName}
                        {order.items.length > 1 && <span className="text-[#9B9B98]"> +{order.items.length - 1}</span>}
                      </p>
                      <p className="text-[10px] text-[#9B9B98]">{firstItem.size} · {firstItem.color}</p>
                    </div>

                    <p className="font-mono-num text-sm font-semibold text-[#111111]">
                      ₨ {order.total.toLocaleString()}
                    </p>

                    <span className={`text-[10px] font-semibold px-2 py-1 rounded-lg w-fit ${meta.color}`}>
                      {meta.label}
                    </span>
                  </div>

                  {/* Mobile card */}
                  <div className="md:hidden flex items-start gap-3">
                    <div className="w-11 h-11 rounded-lg overflow-hidden bg-[#F0F0EC] shrink-0">
                      <Image src={firstItem.image} alt={firstItem.productName} width={44} height={44} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-mono-num text-xs font-medium text-[#111111] truncate">{order.id}</p>
                        <p className="font-mono-num text-sm font-semibold text-[#111111] shrink-0">₨ {order.total.toLocaleString()}</p>
                      </div>
                      <p className="text-xs text-[#6B6B68] mt-0.5 truncate">{abbreviateName(order.customerName)}</p>
                      <p className="text-[11px] text-[#9B9B98] mt-0.5 truncate">{firstItem.productName} · {firstItem.size}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${meta.color}`}>{meta.label}</span>
                        <span className="font-mono-num text-[10px] text-[#9B9B98]">
                          {new Date(order.placedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
