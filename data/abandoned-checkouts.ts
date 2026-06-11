import { getProduct } from "@/data/products";

export type AbandonedStage = "shipping" | "payment" | "review";

export type AbandonedItem = {
  name: string;
  image: string;
  price: number;
  qty: number;
};

export type AbandonedCheckout = {
  id: string;
  customerName: string;
  customerEmail: string;
  items: AbandonedItem[];
  cartValue: number;
  abandonedAt: string; // ISO timestamp
  stage: AbandonedStage;
};

/** Build a cart item from a real product id so image/name/price always resolve. */
function item(productId: string, qty: number): AbandonedItem {
  const p = getProduct(productId);
  return {
    name: p?.name ?? productId,
    image: p?.image ?? "",
    price: p?.price ?? 0,
    qty,
  };
}

function lineTotal(items: AbandonedItem[]): number {
  return items.reduce((s, i) => s + i.price * i.qty, 0);
}

const RAW: Omit<AbandonedCheckout, "cartValue">[] = [
  {
    id: "ac1",
    customerName: "Amara Silva",
    customerEmail: "amara.silva@gmail.com",
    items: [item("valley-linen-overshirt-stone", 1), item("valley-heavyweight-tee", 2)],
    abandonedAt: "2026-06-11T08:42:00",
    stage: "payment",
  },
  {
    id: "ac2",
    customerName: "Dileepa Fernando",
    customerEmail: "dileepa.f@outlook.com",
    items: [item("north-lane-slim-chinos-black", 1)],
    abandonedAt: "2026-06-11T06:15:00",
    stage: "shipping",
  },
  {
    id: "ac3",
    customerName: "Nethmi Perera",
    customerEmail: "nethmi.perera@gmail.com",
    items: [item("nilo-tulle-maxi-dress", 1), item("nilo-halterneck-coord", 1)],
    abandonedAt: "2026-06-10T19:30:00",
    stage: "review",
  },
  {
    id: "ac4",
    customerName: "Ruwan Jayasuriya",
    customerEmail: "ruwan.jay@gmail.com",
    items: [item("ember-linen-shorts-tan", 2)],
    abandonedAt: "2026-06-10T14:05:00",
    stage: "payment",
  },
  {
    id: "ac5",
    customerName: "Tharushi Wickrama",
    customerEmail: "tharushi.w@yahoo.com",
    items: [item("halcyon-vplunge-swimsuit", 1), item("halcyon-sarong-wrap-skirt-green", 1)],
    abandonedAt: "2026-06-09T21:18:00",
    stage: "shipping",
  },
  {
    id: "ac6",
    customerName: "Kasun Bandara",
    customerEmail: "kasun.bandara@gmail.com",
    items: [item("nilo-wide-leg-pants-black", 1), item("ember-sequin-crop-top", 1)],
    abandonedAt: "2026-06-08T11:47:00",
    stage: "review",
  },
];

export const abandonedCheckouts: AbandonedCheckout[] = RAW.map((c) => ({
  ...c,
  cartValue: lineTotal(c.items),
}));
