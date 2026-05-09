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

export function OrdersTable({ orders, onAction, actionLabel, actionColor = "#859365", showReturnReason }: Props) {
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
    <div className="overflow-x-auto">
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
              <tr key={order.id} className="border-b border-[#F8F8F6] hover:bg-[#F8F8F6] transition-colors">
                {/* Order ID */}
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
                {/* Customer */}
                <td className="px-4 py-3">
                  <p className="font-semibold text-[#111111] text-xs">{order.customerName}</p>
                  <p className="text-[10px] text-[#999999]">{order.customerAddress.split(",")[0]}</p>
                </td>
                {/* Items */}
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
                {/* Total */}
                <td className="px-4 py-3">
                  <p className="font-bold text-[#4A89C2] text-xs">
                    LKR {order.total.toLocaleString()}
                  </p>
                </td>
                {/* Date or Return Reason */}
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
                {/* Action */}
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
  );
}
