export type SizeBreakdown = { size: string; sold: number; avgHeightCm: number };
export type ProductPerf = {
  productId: string;
  views: number;
  addedToCart: number;
  purchased: number;
  returnRate: number;
};
export type GeoSlice = { province: string; orderCount: number };
export type VendorCustomer = {
  id: string;
  name: string;       // first name + last initial only
  location: string;   // city
  orderCount: number;
  ltv: number;        // LKR total spent with this brand
  lastPurchase: string; // ISO date
  repeat: boolean;
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

export const vendorStats: VendorStats[] = [
  {
    brandId: "valley",
    conversionRate: 3.2,
    platformAvgConversion: 2.4,
    aov: 24_500,
    platformAvgAov: 19_800,
    geoDistribution: [
      { province: "Western",       orderCount: 58 },
      { province: "Central",       orderCount: 14 },
      { province: "Southern",      orderCount: 21 },
      { province: "North Western", orderCount: 9  },
      { province: "North Central", orderCount: 4  },
      { province: "Sabaragamuwa",  orderCount: 6  },
      { province: "Eastern",       orderCount: 7  },
      { province: "Northern",      orderCount: 3  },
      { province: "Uva",           orderCount: 2  },
    ],
    productPerf: [
      {
        productId: "valley-cream-overshirt",
        views: 1840,
        addedToCart: 312,
        purchased: 189,
        returnRate: 4.2,
      },
      {
        productId: "valley-linen-overshirt",
        views: 1120,
        addedToCart: 198,
        purchased: 114,
        returnRate: 3.5,
      },
      {
        productId: "valley-beach-coverup",
        views: 760,
        addedToCart: 134,
        purchased: 72,
        returnRate: 2.8,
      },
    ],
    sizeAnalytics: [
      {
        productId: "valley-cream-overshirt",
        breakdown: [
          { size: "S",  sold: 28,  avgHeightCm: 172 },
          { size: "M",  sold: 64,  avgHeightCm: 176 },
          { size: "L",  sold: 71,  avgHeightCm: 180 },
          { size: "XL", sold: 26,  avgHeightCm: 184 },
        ],
      },
      {
        productId: "valley-linen-overshirt",
        breakdown: [
          { size: "XS", sold: 8,  avgHeightCm: 169 },
          { size: "S",  sold: 19, avgHeightCm: 172 },
          { size: "M",  sold: 48, avgHeightCm: 176 },
          { size: "L",  sold: 29, avgHeightCm: 180 },
          { size: "XL", sold: 10, avgHeightCm: 183 },
        ],
      },
      {
        productId: "valley-beach-coverup",
        breakdown: [
          { size: "One Size", sold: 14, avgHeightCm: 165 },
          { size: "S/M",      sold: 31, avgHeightCm: 163 },
          { size: "L/XL",     sold: 27, avgHeightCm: 168 },
        ],
      },
    ],
    customers: [
      {
        id: "c1",
        name: "Amaya P.",
        location: "Colombo",
        orderCount: 4,
        ltv: 87_340,
        lastPurchase: "2026-05-04",
        repeat: true,
      },
      {
        id: "c2",
        name: "Kavindu S.",
        location: "Colombo",
        orderCount: 1,
        ltv: 14_545,
        lastPurchase: "2026-05-04",
        repeat: false,
      },
      {
        id: "c3",
        name: "Dilini F.",
        location: "Gampaha",
        orderCount: 3,
        ltv: 52_895,
        lastPurchase: "2026-05-01",
        repeat: true,
      },
      {
        id: "c4",
        name: "Sachith R.",
        location: "Kandy",
        orderCount: 2,
        ltv: 29_090,
        lastPurchase: "2026-04-28",
        repeat: true,
      },
      {
        id: "c5",
        name: "Nimesha A.",
        location: "Colombo",
        orderCount: 1,
        ltv: 24_500,
        lastPurchase: "2026-04-25",
        repeat: false,
      },
      {
        id: "c6",
        name: "Tharaka M.",
        location: "Negombo",
        orderCount: 2,
        ltv: 37_345,
        lastPurchase: "2026-04-22",
        repeat: true,
      },
      {
        id: "c7",
        name: "Poorna J.",
        location: "Colombo",
        orderCount: 1,
        ltv: 12_800,
        lastPurchase: "2026-04-18",
        repeat: false,
      },
      {
        id: "c8",
        name: "Ishara B.",
        location: "Matara",
        orderCount: 2,
        ltv: 27_345,
        lastPurchase: "2026-04-15",
        repeat: true,
      },
      {
        id: "c9",
        name: "Rukshan D.",
        location: "Galle",
        orderCount: 1,
        ltv: 9_800,
        lastPurchase: "2026-04-10",
        repeat: false,
      },
      {
        id: "c10",
        name: "Miyuru C.",
        location: "Colombo",
        orderCount: 3,
        ltv: 63_800,
        lastPurchase: "2026-04-08",
        repeat: true,
      },
    ],
  },
];

export function getVendorStats(brandId: string): VendorStats | undefined {
  return vendorStats.find((s) => s.brandId === brandId);
}
