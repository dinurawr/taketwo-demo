export type Drop = {
  id: string;
  name: string;
  date: string; // ISO date
  products: string[];
  status: "upcoming" | "live" | "ended";
};

export type AmbassadorRequest = {
  id: string;
  name: string;
  handle: string;
  followerCount: number;
  platform: string;
  productId: string;
  productName: string;
  avatarInitials: string;
  status: "pending" | "approved" | "declined";
};

export type ActiveBoost = {
  id: string;
  productId: string;
  productName: string;
  placement: string;
  expiresAt: string; // ISO date
  daysRemaining: number;
};

export type Sale = {
  id: string;
  name: string;
  discountPercent: number;
  products: string[];
  startDate: string;
  endDate: string;
  active: boolean;
};

export const drops: Drop[] = [
  {
    id: "d1",
    name: "Cream Collection Drop",
    date: "2026-05-15",
    products: ["valley-cream-overshirt"],
    status: "upcoming",
  },
  {
    id: "d2",
    name: "Summer Swim Drop",
    date: "2026-05-20",
    products: ["valley-beach-coverup"],
    status: "upcoming",
  },
  {
    id: "d3",
    name: "Linen Series Launch",
    date: "2026-06-01",
    products: ["valley-linen-overshirt"],
    status: "upcoming",
  },
];

export const ambassadorRequests: AmbassadorRequest[] = [
  {
    id: "a1",
    name: "Amara Silva",
    handle: "@amarastyle",
    followerCount: 12_400,
    platform: "Instagram",
    productId: "valley-cream-overshirt",
    productName: "Valley Cream Overshirt",
    avatarInitials: "AS",
    status: "pending",
  },
  {
    id: "a2",
    name: "Kavindu Raj",
    handle: "@kavinduofficial",
    followerCount: 8_200,
    platform: "TikTok",
    productId: "valley-beach-coverup",
    productName: "Valley Beach Cover Up",
    avatarInitials: "KR",
    status: "pending",
  },
];

export const activeBoosts: ActiveBoost[] = [
  {
    id: "b1",
    productId: "valley-cream-overshirt",
    productName: "Valley Cream Overshirt",
    placement: "Home Hero",
    expiresAt: "2026-05-14",
    daysRemaining: 2,
  },
];

export const activeSales: Sale[] = [];
