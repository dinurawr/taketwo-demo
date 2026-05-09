"use client";

import { OrdersTable } from "@/components/vendor/OrdersTable";
import { getOrdersByStatus } from "@/data/orders";
import type { Order } from "@/data/orders";

export default function ShippingPage() {
  const orders = getOrdersByStatus("shipping");

  const handleAction = (order: Order) => {
    alert(`Demo: Order ${order.id} â†’ marked as "Delivered".`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#111111]">Currently Shipping</h1>
        <p className="text-sm text-[#999999] mt-0.5">
          {orders.length} order{orders.length !== 1 ? "s" : ""} out for delivery
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
        {[
          { label: "In Transit", value: orders.length, color: "#859365" },
          { label: "Total Value", value: `LKR ${orders.reduce((s, o) => s + o.total, 0).toLocaleString()}`, color: "#859365" },
          { label: "With Tracking", value: orders.filter((o) => o.trackingNumber).length, color: "#4A89C2" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 border border-[#F0F0F0]">
            <p className="text-xs text-[#999999] uppercase tracking-wide mb-1">{label}</p>
            <p className="text-xl font-bold" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl overflow-hidden border border-[#F0F0F0]">
        <OrdersTable
          orders={orders}
          onAction={handleAction}
          actionLabel="Mark Delivered"
          actionColor="#859365"
        />
      </div>
    </div>
  );
}
