"use client";

import { orders } from "@/data/orders";
import { getBrand } from "@/data/brands";
import Image from "next/image";

const CUSTOMER_ID = "u1";

const statusLabel: Record<string, string> = {
  new: "Processing",
  shipping: "On its way",
  returning: "Return in progress",
  pending_verdict: "Under review",
  completed: "Delivered",
  cancelled: "Cancelled",
};
const statusColor: Record<string, string> = {
  new: "bg-blue-100 text-[#4A89C2]",
  shipping: "bg-[#F0F3EC] text-[#859365]",
  returning: "bg-orange-100 text-[#ED832B]",
  pending_verdict: "bg-yellow-100 text-yellow-700",
  completed: "bg-[#F0F3EC] text-[#859365]",
  cancelled: "bg-gray-100 text-gray-500",
};

export default function OrdersPage() {
  const myOrders = orders.filter((o) => o.customerId === CUSTOMER_ID);

  return (
    <div className="flex flex-col bg-white">
      <div className="px-5 pt-2 pb-4">
        <h1 className="text-2xl font-bold text-[#111111]">My Orders</h1>
        <p className="text-sm text-[#666666] mt-0.5">{myOrders.length} orders</p>
      </div>

      <div className="px-5 space-y-3">
        {myOrders.map((order) => {
          const firstItem = order.items[0];
          const brand = getBrand(firstItem.brand);
          return (
            <div key={order.id} className="bg-[#F8F8F6] rounded-2xl p-4 border border-[#F0F0F0]">
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F0F3EC] shrink-0">
                  <Image
                    src={firstItem.image}
                    alt={firstItem.productName}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] text-[#859365] font-bold uppercase tracking-wide">
                      {brand?.name}
                    </p>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        statusColor[order.status]
                      }`}
                    >
                      {statusLabel[order.status]}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#111111] line-clamp-1">
                    {firstItem.productName}
                    {order.items.length > 1 && ` +${order.items.length - 1} more`}
                  </p>
                  <p className="text-xs text-[#666666] mt-0.5">
                    {order.id} · <span className="text-[#4A89C2] font-semibold">LKR {order.total.toLocaleString()}</span>
                  </p>
                  {order.trackingNumber && (
                    <p className="text-[10px] text-[#999999] mt-0.5">
                      Tracking: {order.trackingNumber}
                    </p>
                  )}
                </div>
              </div>
              {order.status === "completed" && (
                <button
                  className="mt-3 w-full py-2 rounded-full border-2 border-[#E8E8E8] text-xs font-semibold text-[#666666] hover:border-[#ED832B] hover:text-[#ED832B] transition-colors"
                  onClick={() => alert("Demo: Return request submitted")}
                >
                  Request Return
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
