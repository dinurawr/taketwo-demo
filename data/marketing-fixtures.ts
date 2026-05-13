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
  expiresAt: string;
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
  {
    id: "d4",
    name: "Autumn Capsule",
    date: "2026-06-15",
    products: ["valley-cream-overshirt", "valley-linen-overshirt"],
    status: "upcoming",
  },
  {
    id: "d5",
    name: "Cream Restock",
    date: "2026-04-10",
    products: ["valley-cream-overshirt"],
    status: "ended",
  },
  {
    id: "d6",
    name: "Linen Series Vol. 1",
    date: "2026-03-22",
    products: ["valley-linen-overshirt"],
    status: "ended",
  },
  {
    id: "d7",
    name: "Early Summer Pre-Drop",
    date: "2026-05-12",
    products: ["valley-beach-coverup"],
    status: "live",
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
  {
    id: "a3",
    name: "Senuri Bandara",
    handle: "@senuri.b",
    followerCount: 24_600,
    platform: "Instagram",
    productId: "valley-linen-overshirt",
    productName: "Valley Linen Overshirt",
    avatarInitials: "SB",
    status: "pending",
  },
  {
    id: "a4",
    name: "Dineth Perera",
    handle: "@dinethp",
    followerCount: 5_800,
    platform: "YouTube",
    productId: "valley-cream-overshirt",
    productName: "Valley Cream Overshirt",
    avatarInitials: "DP",
    status: "pending",
  },
  {
    id: "a5",
    name: "Hashini Wijesinghe",
    handle: "@hashinistyle",
    followerCount: 18_300,
    platform: "Instagram",
    productId: "valley-beach-coverup",
    productName: "Valley Beach Cover Up",
    avatarInitials: "HW",
    status: "approved",
  },
  {
    id: "a6",
    name: "Ravindu Fernando",
    handle: "@ravifit",
    followerCount: 3_100,
    platform: "TikTok",
    productId: "valley-linen-overshirt",
    productName: "Valley Linen Overshirt",
    avatarInitials: "RF",
    status: "declined",
  },
  {
    id: "a7",
    name: "Methmi De Silva",
    handle: "@methmistyle",
    followerCount: 9_400,
    platform: "Instagram",
    productId: "valley-cream-overshirt",
    productName: "Valley Cream Overshirt",
    avatarInitials: "MD",
    status: "approved",
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
  {
    id: "b2",
    productId: "valley-beach-coverup",
    productName: "Valley Beach Cover Up",
    placement: "2×2 Tile",
    expiresAt: "2026-05-19",
    daysRemaining: 7,
  },
  {
    id: "b3",
    productId: "valley-linen-overshirt",
    productName: "Valley Linen Overshirt",
    placement: "Shop Top",
    expiresAt: "2026-05-26",
    daysRemaining: 14,
  },
];

export const activeSales: Sale[] = [];
