"use client";

import Image from "next/image";
import { getBrand } from "@/data/brands";
import type { Order } from "@/data/orders";

type Props = {
  orders: Order[];
  onAction?: (order: Order, action: string) => void;
  actionLabel?: string;
  actionColor?: string;
  showReturnReason?: boolean;
};

export function OrdersTable({
  orders,
  onAction,
  actionLabel,
  actionColor = "#859365",
  showReturnReason,
}: Props) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#999999]">
        <p className="text-4xl mb-3">📭</p>
        <p className="font-semibold text-[#111111]">No orders here</p>
        <p className="text-sm mt-1">This tab is clear</p>
      </div>
    );
  }

  return (
    <>
      {/* ── Mobile card list ────────────────────────── */}
      <div className="md:hidden divide-y divide-[#F0F0F0]">
        {orders.map((order) => {
          const firstItem = order.items[0];
          const brand = getBrand(firstItem.brand);
          return (
            <div key={order.id} className="p-4">
              <div className="flex items-start gap-3">
                {/* Thumbnail */}
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F0F3EC] shrink-0">
                  <Image
                    src={firstItem.image}
                    alt={firstItem.productName}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-[#111111] text-xs truncate">{order.id}</p>
                    <p className="font-bold text-[#4A89C2] text-sm shrink-0">
                      LKR {order.total.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-xs text-[#666] mt-0.5 truncate">{order.customerName}</p>
                  <p className="text-[11px] text-[#999] mt-0.5 truncate">
                    {firstItem.productName} · {firstItem.size} · {firstItem.color}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white"
                      style={{ backgroundColor: brand?.color ?? "#859365" }}
                    >
                      {brand?.name}
                    </span>
                    {showReturnReason && order.returnReason && (
                      <span className="text-[10px] font-medium text-[#ED832B] bg-orange-50 px-2 py-0.5 rounded-full">
                        {order.returnReason}
                      </span>
                    )}
                    {!showReturnReason && (
                      <span className="text-[10px] text-[#999]">
                        {new Date(order.placedAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action button */}
              {actionLabel && onAction && (
                <button
                  onClick={() => onAction(order, actionLabel)}
                  className="mt-3 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-opacity active:opacity-70"
                  style={{ backgroundColor: actionColor }}
                >
                  {actionLabel}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Desktop table ───────────────────────────── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#F0F0F0]">
              {["Order", "Customer", "Items", "Total", showReturnReason ? "Reason" : "Date", ""].map(
                (h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-xs font-bold text-[#999999] uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const firstItem = order.items[0];
              const brand = getBrand(firstItem.brand);
              return (
                <tr
                  key={order.id}
                  className="border-b border-[#F8F8F6] hover:bg-[#F8F8F6] transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F0F3EC] shrink-0">
                        <Image
                          src={firstItem.image}
                          alt={firstItem.productName}
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[#111111] text-xs">{order.id}</p>
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white"
                          style={{ backgroundColor: brand?.color ?? "#859365" }}
                        >
                          {brand?.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-[#111111] text-xs">{order.customerName}</p>
                    <p className="text-[10px] text-[#999999]">
                      {order.customerAddress.split(",")[0]}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-[#111111]">
                      {firstItem.productName}
                      {order.items.length > 1 && (
                        <span className="text-[#999999]"> +{order.items.length - 1}</span>
                      )}
                    </p>
                    <p className="text-[10px] text-[#999999]">
                      {firstItem.size} · {firstItem.color}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-[#4A89C2] text-xs">
                      LKR {order.total.toLocaleString()}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    {showReturnReason ? (
                      <span className="text-xs text-[#ED832B] bg-orange-50 px-2 py-0.5 rounded-full font-medium">
                        {order.returnReason ?? "—"}
                      </span>
                    ) : (
                      <p className="text-xs text-[#999999]">
                        {new Date(order.placedAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {actionLabel && onAction && (
                      <button
                        onClick={() => onAction(order, actionLabel)}
                        className="px-3 py-1.5 rounded-full text-[11px] font-bold text-white transition-opacity hover:opacity-80"
                        style={{ backgroundColor: actionColor }}
                      >
                        {actionLabel}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
