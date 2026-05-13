import { orders } from "./orders";

export type SizeBreakdown = { size: string; sold: number; avgHeightCm: number };
export type ProductPerf = {
  productId: string;
  views: number;
  addedToCart: number;
  purchased: number;
  returnRate: number;
  clickRate: number;
  bounceRate: number;
};
export type GeoSlice = { province: string; orderCount: number };
export type VendorCustomer = {
  id: string;
  name: string;
  location: string;
  orderCount: number;
  ltv: number;
  lastPurchase: string;
  repeat: boolean;
  frequentBuyer: boolean;
  hasReturned: boolean;
};

export type VendorStats = {
  brandId: string;
  conversionRate: number;
  platformAvgConversion: number;
  aov: number;
  platformAvgAov: number;
  geoDistribution: GeoSlice[];
  productPerf: ProductPerf[];
  sizeAnalytics: { productId: string; breakdown: SizeBreakdown[] }[];
  customers: VendorCustomer[];
};

// ─── Customer aggregation (computed from orders) ────────────────────────
const NOW = new Date("2026-05-12T00:00:00Z");
const SIXTY_DAYS_AGO = new Date(NOW);
SIXTY_DAYS_AGO.setDate(SIXTY_DAYS_AGO.getDate() - 60);

function abbreviateName(full: string): string {
  const parts = full.split(" ");
  if (parts.length < 2) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
}

function extractCity(address: string): string {
  const last = address.split(",").pop()?.trim() ?? "Sri Lanka";
  return last.replace(/\s+\d+$/, "");
}

function buildValleyCustomers(): VendorCustomer[] {
  const valleyOrders = orders.filter((o) => o.items.some((i) => i.brand === "valley"));
  const map = new Map<string, VendorCustomer>();

  for (const o of valleyOrders) {
    const existing = map.get(o.customerId);
    if (existing) {
      existing.orderCount += 1;
      existing.ltv += o.total;
      if (new Date(o.placedAt) > new Date(existing.lastPurchase)) {
        existing.lastPurchase = o.placedAt.slice(0, 10);
      }
      if (o.status === "returning" || o.status === "pending_verdict") {
        existing.hasReturned = true;
      }
    } else {
      map.set(o.customerId, {
        id: o.customerId,
        name: abbreviateName(o.customerName),
        location: extractCity(o.customerAddress),
        orderCount: 1,
        ltv: o.total,
        lastPurchase: o.placedAt.slice(0, 10),
        repeat: false,
        frequentBuyer: false,
        hasReturned: o.status === "returning" || o.status === "pending_verdict",
      });
    }
  }

  // Derived flags
  for (const c of map.values()) {
    c.repeat = c.orderCount > 1;
    const recent = valleyOrders.filter(
      (o) => o.customerId === c.id && new Date(o.placedAt) >= SIXTY_DAYS_AGO
    ).length;
    c.frequentBuyer = recent >= 3;
  }

  return Array.from(map.values());
}

function buildSerendibCustomers(): VendorCustomer[] {
  const ssOrders = orders.filter((o) => o.items.some((i) => i.brand === "serendib-style"));
  const map = new Map<string, VendorCustomer>();

  for (const o of ssOrders) {
    const existing = map.get(o.customerId);
    if (existing) {
      existing.orderCount += 1;
      existing.ltv += o.total;
      if (new Date(o.placedAt) > new Date(existing.lastPurchase)) {
        existing.lastPurchase = o.placedAt.slice(0, 10);
      }
      if (o.status === "returning" || o.status === "pending_verdict") {
        existing.hasReturned = true;
      }
    } else {
      map.set(o.customerId, {
        id: o.customerId,
        name: abbreviateName(o.customerName),
        location: extractCity(o.customerAddress),
        orderCount: 1,
        ltv: o.total,
        lastPurchase: o.placedAt.slice(0, 10),
        repeat: false,
        frequentBuyer: false,
        hasReturned: o.status === "returning" || o.status === "pending_verdict",
      });
    }
  }

  for (const c of map.values()) {
    c.repeat = c.orderCount > 1;
    const recent = ssOrders.filter(
      (o) => o.customerId === c.id && new Date(o.placedAt) >= SIXTY_DAYS_AGO
    ).length;
    c.frequentBuyer = recent >= 3;
  }

  return Array.from(map.values());
}

export const vendorStats: VendorStats[] = [
  {
    brandId: "serendib-style",
    conversionRate: 8.4,
    platformAvgConversion: 2.4,
    aov: 10_200,
    platformAvgAov: 7_800,
    geoDistribution: [
      { province: "Western",       orderCount: 68  },
      { province: "Central",        orderCount: 24  },
      { province: "Southern",       orderCount: 19  },
      { province: "North Western",  orderCount: 12  },
      { province: "North Central",  orderCount: 7   },
      { province: "Sabaragamuwa",   orderCount: 9   },
      { province: "Eastern",        orderCount: 6   },
      { province: "Northern",       orderCount: 3   },
      { province: "Uva",            orderCount: 2   },
    ],
    productPerf: [
      { productId: "ss-silk-wrap-dress",    views: 12420, addedToCart: 3703, purchased: 1490, returnRate: 6.2, clickRate: 12.0, bounceRate: 28 },
      { productId: "ss-linen-set",          views:  8640, addedToCart: 1935, purchased:  842, returnRate: 8.4, clickRate:  9.7, bounceRate: 32 },
      { productId: "ss-batik-coord",        views:  9280, addedToCart: 1865, purchased:  924, returnRate: 7.1, clickRate:  9.9, bounceRate: 31 },
      { productId: "ss-lotus-maxi",         views:  6820, addedToCart: 1214, purchased:  620, returnRate: 5.8, clickRate:  9.1, bounceRate: 35 },
      { productId: "ss-handloom-wrap-dress",views:  5940, addedToCart:  962, purchased:  482, returnRate: 9.2, clickRate:  8.1, bounceRate: 37 },
      { productId: "ss-linen-shirt-dress",  views:  4880, addedToCart:  727, purchased:  368, returnRate: 6.4, clickRate:  7.5, bounceRate: 38 },
      { productId: "ss-embroidered-crop",   views:  3840, addedToCart:  515, purchased:  268, returnRate: 5.2, clickRate:  7.0, bounceRate: 40 },
      { productId: "ss-linen-trousers",     views:  3140, addedToCart:  371, purchased:  194, returnRate: 8.9, clickRate:  6.2, bounceRate: 42 },
    ],
    sizeAnalytics: [
      { productId: "ss-silk-wrap-dress",    breakdown: [{ size: "XS", sold: 148, avgHeightCm: 158 }, { size: "S", sold: 487, avgHeightCm: 161 }, { size: "M", sold: 612, avgHeightCm: 164 }, { size: "L", sold: 243, avgHeightCm: 167 }] },
      { productId: "ss-linen-set",          breakdown: [{ size: "XS", sold: 72,  avgHeightCm: 157 }, { size: "S", sold: 281, avgHeightCm: 161 }, { size: "M", sold: 334, avgHeightCm: 164 }, { size: "L", sold: 155, avgHeightCm: 167 }] },
      { productId: "ss-linen-trousers",     breakdown: [{ size: "XS", sold: 28,  avgHeightCm: 157 }, { size: "S", sold: 48,  avgHeightCm: 160 }, { size: "M", sold: 62,  avgHeightCm: 163 }, { size: "L", sold: 40,  avgHeightCm: 166 }, { size: "XL", sold: 16, avgHeightCm: 169 }] },
    ],
    customers: buildSerendibCustomers(),
  },
  {
    brandId: "valley",
    conversionRate: 3.4,
    platformAvgConversion: 2.4,
    aov: 24_500,
    platformAvgAov: 19_800,
    geoDistribution: [
      { province: "Western",       orderCount: 142 },
      { province: "Central",        orderCount: 38  },
      { province: "Southern",       orderCount: 54  },
      { province: "North Western",  orderCount: 23  },
      { province: "North Central",  orderCount: 11  },
      { province: "Sabaragamuwa",   orderCount: 16  },
      { province: "Eastern",        orderCount: 19  },
      { province: "Northern",       orderCount: 8   },
      { province: "Uva",            orderCount: 7   },
    ],
    productPerf: [
      {
        productId: "valley-cream-overshirt",
        views: 8420,
        addedToCart: 1438,
        purchased: 872,
        returnRate: 4.2,
        clickRate: 8.6,
        bounceRate: 34,
      },
      {
        productId: "valley-linen-overshirt",
        views: 5120,
        addedToCart: 921,
        purchased: 528,
        returnRate: 3.5,
        clickRate: 7.1,
        bounceRate: 41,
      },
      {
        productId: "valley-beach-coverup",
        views: 3640,
        addedToCart: 624,
        purchased: 339,
        returnRate: 2.8,
        clickRate: 5.4,
        bounceRate: 38,
      },
    ],
    sizeAnalytics: [
      {
        productId: "valley-cream-overshirt",
        breakdown: [
          { size: "XS", sold: 41,  avgHeightCm: 167 },
          { size: "S",  sold: 138, avgHeightCm: 172 },
          { size: "M",  sold: 287, avgHeightCm: 176 },
          { size: "L",  sold: 312, avgHeightCm: 180 },
          { size: "XL", sold: 94,  avgHeightCm: 184 },
        ],
      },
      {
        productId: "valley-linen-overshirt",
        breakdown: [
          { size: "XS", sold: 32,  avgHeightCm: 169 },
          { size: "S",  sold: 89,  avgHeightCm: 172 },
          { size: "M",  sold: 218, avgHeightCm: 176 },
          { size: "L",  sold: 142, avgHeightCm: 180 },
          { size: "XL", sold: 47,  avgHeightCm: 183 },
        ],
      },
      {
        productId: "valley-beach-coverup",
        breakdown: [
          { size: "One Size", sold: 68,  avgHeightCm: 165 },
          { size: "S/M",       sold: 143, avgHeightCm: 163 },
          { size: "L/XL",      sold: 128, avgHeightCm: 168 },
        ],
      },
    ],
    customers: buildValleyCustomers(),
  },
];

export function getVendorStats(brandId: string): VendorStats | undefined {
  return vendorStats.find((s) => s.brandId === brandId);
}
