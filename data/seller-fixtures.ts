// Serendib Style — Sri Lankan fashion brand
// All monetary values in LKR (₨)

export const SELLER = {
  id: "serendib-style",
  name: "Serendib Style",
  logo: "SS",
  tagline: "Contemporary Sri Lankan fashion",
  joinedAt: "2024-06-15",
  followerCount: 14_280,
  rating: 4.8,
  reviewCount: 1_043,
};

// ─── IMAGES (5 available, rotated) ────────────────────────────────────────────
const IMGS = [
  "/products/pexels-cottonbro-6626418.jpg",
  "/products/pexels-cottonbro-6616673.jpg",
  "/products/pexels-ron-lach-9464625.jpg",
  "/products/pexels-prayoon-sajeev-1486107-2897529.jpg",
  "/products/pexels-tima-miroshnichenko-7202792.jpg",
];
const img = (i: number) => IMGS[i % IMGS.length];

// ─── PRODUCTS (25 SKUs) ───────────────────────────────────────────────────────
export type SellerProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  sizes: string[];
  stock: number;
  image: string;
  isLowStock: boolean;
  isStalled: boolean;
  isHighReturn: boolean;
};

export const SELLER_PRODUCTS: SellerProduct[] = [
  // Dresses
  { id: "ss-silk-wrap-dress",       name: "Serendib Silk Wrap Dress",   category: "Dresses",      price: 8_900,  sizes: ["XS","S","M","L"],       stock: 3,   image: img(0), isLowStock: true,  isStalled: false, isHighReturn: false },
  { id: "ss-lotus-maxi",            name: "Lotus Embroidered Maxi",     category: "Dresses",      price: 12_500, sizes: ["S","M","L"],             stock: 28,  image: img(1), isLowStock: false, isStalled: false, isHighReturn: false },
  { id: "ss-batik-midi",            name: "Batik Print Midi Dress",     category: "Dresses",      price: 7_800,  sizes: ["XS","S","M","L","XL"],  stock: 42,  image: img(2), isLowStock: false, isStalled: false, isHighReturn: true  },
  { id: "ss-off-shoulder-sundress", name: "Off-shoulder Sundress",      category: "Dresses",      price: 9_200,  sizes: ["XS","S","M","L"],       stock: 19,  image: img(3), isLowStock: false, isStalled: false, isHighReturn: false },
  { id: "ss-handloom-wrap-dress",   name: "Handloom Wrap Dress",        category: "Dresses",      price: 10_800, sizes: ["S","M","L"],             stock: 14,  image: img(4), isLowStock: false, isStalled: false, isHighReturn: false },
  { id: "ss-tropical-shift",        name: "Tropical Print Shift Dress", category: "Dresses",      price: 6_900,  sizes: ["XS","S","M","L","XL"],  stock: 31,  image: img(0), isLowStock: false, isStalled: false, isHighReturn: false },
  { id: "ss-linen-shirt-dress",     name: "Linen Shirt Dress",          category: "Dresses",      price: 8_400,  sizes: ["S","M","L","XL"],       stock: 22,  image: img(1), isLowStock: false, isStalled: false, isHighReturn: false },
  { id: "ss-ruched-mini",           name: "Ruched Bandeau Mini",        category: "Dresses",      price: 5_400,  sizes: ["XS","S","M"],           stock: 37,  image: img(2), isLowStock: false, isStalled: false, isHighReturn: false },
  // Tops
  { id: "ss-ceylon-tee",            name: "Ceylon Print Oversized Tee", category: "Tops",         price: 3_200,  sizes: ["S","M","L","XL"],       stock: 84,  image: img(3), isLowStock: false, isStalled: true,  isHighReturn: false },
  { id: "ss-ruffle-top",            name: "Ruffle Off-shoulder Top",    category: "Tops",         price: 4_800,  sizes: ["XS","S","M","L"],       stock: 26,  image: img(4), isLowStock: false, isStalled: false, isHighReturn: false },
  { id: "ss-embroidered-crop",      name: "Embroidered Crop Top",       category: "Tops",         price: 5_200,  sizes: ["XS","S","M","L"],       stock: 18,  image: img(0), isLowStock: false, isStalled: false, isHighReturn: false },
  { id: "ss-batik-blouse",          name: "Batik Smocked Blouse",       category: "Tops",         price: 6_100,  sizes: ["XS","S","M","L","XL"],  stock: 33,  image: img(1), isLowStock: false, isStalled: false, isHighReturn: false },
  { id: "ss-handblock-tunic",       name: "Handblock Print Tunic",      category: "Tops",         price: 7_400,  sizes: ["S","M","L","XL"],       stock: 11,  image: img(2), isLowStock: false, isStalled: false, isHighReturn: false },
  { id: "ss-tie-front-shirt",       name: "Tie-front Linen Shirt",      category: "Tops",         price: 5_800,  sizes: ["XS","S","M","L"],       stock: 24,  image: img(3), isLowStock: false, isStalled: false, isHighReturn: false },
  // Bottoms
  { id: "ss-linen-trousers",        name: "Wide-leg Linen Trousers",    category: "Bottoms",      price: 7_200,  sizes: ["XS","S","M","L","XL"],  stock: 29,  image: img(4), isLowStock: false, isStalled: false, isHighReturn: false },
  { id: "ss-palazzo-pants",         name: "Batik Palazzo Pants",        category: "Bottoms",      price: 6_800,  sizes: ["S","M","L","XL"],       stock: 17,  image: img(0), isLowStock: false, isStalled: false, isHighReturn: false },
  { id: "ss-linen-shorts",          name: "High-waist Linen Shorts",    category: "Bottoms",      price: 4_600,  sizes: ["XS","S","M","L"],       stock: 45,  image: img(1), isLowStock: false, isStalled: false, isHighReturn: false },
  { id: "ss-wrap-skirt",            name: "Wrap Midi Skirt",            category: "Bottoms",      price: 5_900,  sizes: ["XS","S","M","L","XL"],  stock: 38,  image: img(2), isLowStock: false, isStalled: false, isHighReturn: false },
  // Sets & Co-ords
  { id: "ss-linen-set",             name: "Linen Two-piece Set",        category: "Sets & Co-ords", price: 14_800, sizes: ["XS","S","M","L"],     stock: 12,  image: img(3), isLowStock: false, isStalled: false, isHighReturn: false },
  { id: "ss-batik-coord",           name: "Batik Crop Co-ord",          category: "Sets & Co-ords", price: 11_200, sizes: ["XS","S","M","L"],     stock: 21,  image: img(4), isLowStock: false, isStalled: false, isHighReturn: false },
  { id: "ss-embroidered-set",       name: "Embroidered Shorts Set",     category: "Sets & Co-ords", price: 9_600,  sizes: ["S","M","L"],           stock: 8,   image: img(0), isLowStock: true,  isStalled: false, isHighReturn: false },
  { id: "ss-jumpsuit",              name: "Linen Jumpsuit",             category: "Sets & Co-ords", price: 13_400, sizes: ["XS","S","M","L"],     stock: 16,  image: img(1), isLowStock: false, isStalled: false, isHighReturn: false },
  // Accessories
  { id: "ss-cotton-tote",           name: "Handloom Cotton Tote",       category: "Accessories",  price: 2_800,  sizes: ["One Size"],             stock: 62,  image: img(2), isLowStock: false, isStalled: false, isHighReturn: false },
  { id: "ss-batik-scarf",           name: "Batik Print Scarf",          category: "Accessories",  price: 1_900,  sizes: ["One Size"],             stock: 74,  image: img(3), isLowStock: false, isStalled: false, isHighReturn: false },
  { id: "ss-hair-clips",            name: "Seashell Hair Clip Set",     category: "Accessories",  price: 1_200,  sizes: ["One Size"],             stock: 91,  image: img(4), isLowStock: false, isStalled: false, isHighReturn: false },
];

// ─── PRODUCT PERFORMANCE ─────────────────────────────────────────────────────
export type ProductPerformance = {
  id: string;
  views: number;
  favourites: number;
  addToCartRate: number; // %
  orders: number;
  conversionRate: number; // %
  revenue: number; // LKR
  returnRate: number; // %
  trend: number; // % vs prior period
};

export const PRODUCT_PERFORMANCE: ProductPerformance[] = [
  { id: "ss-silk-wrap-dress",       views: 12_420, favourites: 2_840, addToCartRate: 29.8, orders: 1_490, conversionRate: 12.0, revenue: 13_261_000, returnRate: 6.2,  trend:  22.4 },
  { id: "ss-linen-set",             views:  8_640, favourites: 1_920, addToCartRate: 22.4, orders:   842, conversionRate:  9.7, revenue: 12_461_600, returnRate: 8.4,  trend:  18.1 },
  { id: "ss-batik-coord",           views:  9_280, favourites: 1_640, addToCartRate: 20.1, orders:   924, conversionRate:  9.9, revenue: 10_348_800, returnRate: 7.1,  trend:  11.3 },
  { id: "ss-lotus-maxi",            views:  6_820, favourites: 1_180, addToCartRate: 17.8, orders:   620, conversionRate:  9.1, revenue:  7_750_000, returnRate: 5.8,  trend:   8.2 },
  { id: "ss-handloom-wrap-dress",   views:  5_940, favourites:   980, addToCartRate: 16.2, orders:   482, conversionRate:  8.1, revenue:  5_205_600, returnRate: 9.2,  trend:  15.0 },
  { id: "ss-jumpsuit",              views:  5_210, favourites:   920, addToCartRate: 15.8, orders:   394, conversionRate:  7.6, revenue:  5_279_600, returnRate: 7.8,  trend:   6.4 },
  { id: "ss-linen-shirt-dress",     views:  4_880, favourites:   740, addToCartRate: 14.9, orders:   368, conversionRate:  7.5, revenue:  3_091_200, returnRate: 6.4,  trend:   4.1 },
  { id: "ss-off-shoulder-sundress", views:  4_620, favourites:   690, addToCartRate: 14.2, orders:   322, conversionRate:  7.0, revenue:  2_962_400, returnRate: 10.1, trend:  -2.8 },
  { id: "ss-batik-midi",            views:  4_100, favourites:   580, addToCartRate: 13.8, orders:   296, conversionRate:  7.2, revenue:  2_308_800, returnRate: 28.4, trend:  -8.4 },
  { id: "ss-embroidered-crop",      views:  3_840, favourites:   620, addToCartRate: 13.4, orders:   268, conversionRate:  7.0, revenue:  1_393_600, returnRate: 5.2,  trend:   9.8 },
  { id: "ss-handblock-tunic",       views:  3_620, favourites:   540, addToCartRate: 12.8, orders:   242, conversionRate:  6.7, revenue:  1_790_800, returnRate: 6.8,  trend:   3.2 },
  { id: "ss-batik-blouse",          views:  3_380, favourites:   480, addToCartRate: 12.1, orders:   218, conversionRate:  6.4, revenue:  1_329_800, returnRate: 7.4,  trend:   1.8 },
  { id: "ss-linen-trousers",        views:  3_140, favourites:   420, addToCartRate: 11.8, orders:   194, conversionRate:  6.2, revenue:  1_396_800, returnRate: 8.9,  trend:   5.6 },
  { id: "ss-tie-front-shirt",       views:  2_980, favourites:   380, addToCartRate: 11.4, orders:   182, conversionRate:  6.1, revenue:  1_055_600, returnRate: 6.1,  trend:  12.4 },
  { id: "ss-tropical-shift",        views:  2_840, favourites:   360, addToCartRate: 11.0, orders:   174, conversionRate:  6.1, revenue:  1_200_600, returnRate: 7.6,  trend:  -1.2 },
  { id: "ss-embroidered-set",       views:  2_620, favourites:   340, addToCartRate: 10.6, orders:   156, conversionRate:  6.0, revenue:  1_497_600, returnRate: 9.8,  trend:   7.2 },
  { id: "ss-palazzo-pants",         views:  2_480, favourites:   310, addToCartRate: 10.2, orders:   148, conversionRate:  6.0, revenue:  1_006_400, returnRate: 8.2,  trend:   2.4 },
  { id: "ss-ruffle-top",            views:  2_340, favourites:   290, addToCartRate:  9.8, orders:   138, conversionRate:  5.9, revenue:    662_400, returnRate: 5.4,  trend:   8.9 },
  { id: "ss-linen-shorts",          views:  2_180, favourites:   260, addToCartRate:  9.4, orders:   122, conversionRate:  5.6, revenue:    561_200, returnRate: 7.1,  trend:   3.8 },
  { id: "ss-wrap-skirt",            views:  1_980, favourites:   240, addToCartRate:  9.1, orders:   108, conversionRate:  5.5, revenue:    637_200, returnRate: 6.8,  trend:  -0.4 },
  { id: "ss-ruched-mini",           views:  1_820, favourites:   220, addToCartRate:  8.8, orders:    94, conversionRate:  5.2, revenue:    507_600, returnRate: 6.2,  trend:   4.1 },
  { id: "ss-cotton-tote",           views:  1_640, favourites:   180, addToCartRate:  8.2, orders:    82, conversionRate:  5.0, revenue:    229_600, returnRate: 2.4,  trend:  11.2 },
  { id: "ss-batik-scarf",           views:  1_420, favourites:   140, addToCartRate:  7.8, orders:    68, conversionRate:  4.8, revenue:    129_200, returnRate: 1.8,  trend:   6.8 },
  { id: "ss-hair-clips",            views:  1_180, favourites:   110, addToCartRate:  7.2, orders:    52, conversionRate:  4.4, revenue:     62_400, returnRate: 3.2,  trend:   9.4 },
  { id: "ss-ceylon-tee",            views:  8_420, favourites:   280, addToCartRate:  3.1, orders:    12, conversionRate:  0.1, revenue:     38_400, returnRate: 4.8,  trend: -18.4 },
];

// ─── DAILY REVENUE (90 days: Feb 12 → May 11 2026) ────────────────────────────
function generateDailyRevenue() {
  const start = new Date("2026-02-12");
  const result: { date: string; revenue: number }[] = [];

  for (let i = 0; i < 90; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const m = d.getMonth() + 1;
    const day = d.getDate();
    const dow = d.getDay();
    const isWeekend = dow === 0 || dow === 6;

    let base = 38_000;
    if (m === 3) base = 41_500;
    if (m === 4) base = 44_000;
    if (m === 5) base = 46_500;

    // Sinhala & Tamil New Year spike (Apr 8–17, peak Apr 13)
    if (m === 4 && day >= 8 && day <= 17) {
      const dist = Math.abs(day - 13);
      base += Math.max(0, 72_000 - dist * 11_000);
    }

    if (isWeekend) base = Math.round(base * 1.18);

    // Deterministic variance ±18%
    const v = 0.82 + ((i * 23 + 7) % 36) / 100;
    result.push({ date: d.toISOString().slice(0, 10), revenue: Math.round(base * v) });
  }
  return result;
}

export const DAILY_REVENUE = generateDailyRevenue();

// ─── CITY DISTRIBUTION ────────────────────────────────────────────────────────
export const CITY_DISTRIBUTION = [
  { city: "Colombo",  orders: 1_842, revenue: 8_624_400 },
  { city: "Kandy",    orders:   548, revenue: 2_464_800 },
  { city: "Galle",    orders:   412, revenue: 1_926_000 },
  { city: "Negombo",  orders:   274, revenue: 1_218_600 },
  { city: "Jaffna",   orders:   168, revenue:   748_800 },
  { city: "Other",    orders:   164, revenue:   716_400 },
];

// ─── RETURN DATA ──────────────────────────────────────────────────────────────
export const RETURN_REASONS = [
  { reason: "Too small",        count: 184, pct: 34 },
  { reason: "Didn't match photo", count: 119, pct: 22 },
  { reason: "Too big",          count:  97, pct: 18 },
  { reason: "Quality",          count:  65, pct: 12 },
  { reason: "Changed mind",     count:  49, pct:  9 },
  { reason: "Other",            count:  27, pct:  5 },
];

export const RETURNS_BY_SIZE = [
  { size: "XS", returnRate: 8.2  },
  { size: "S",  returnRate: 12.4 },
  { size: "M",  returnRate: 9.8  },
  { size: "L",  returnRate: 18.6 },
  { size: "XL", returnRate: 22.4 },
];

export const RETURNS_BY_CITY = [
  { city: "Colombo",  returnRate: 14.2 },
  { city: "Kandy",    returnRate: 19.8 },
  { city: "Galle",    returnRate: 16.4 },
  { city: "Negombo",  returnRate: 21.2 },
  { city: "Jaffna",   returnRate: 24.6 },
  { city: "Other",    returnRate: 17.8 },
];

export const PER_PRODUCT_RETURNS = [
  { id: "ss-batik-midi",          name: "Batik Print Midi Dress",  returnRate: 28.4, topReason: "Too small",       returns: 84, revenue: 2_308_800 },
  { id: "ss-off-shoulder-sundress", name: "Off-shoulder Sundress", returnRate: 10.1, topReason: "Too big",         returns: 33, revenue: 2_962_400 },
  { id: "ss-embroidered-set",     name: "Embroidered Shorts Set",  returnRate:  9.8, topReason: "Too small",       returns: 15, revenue: 1_497_600 },
  { id: "ss-handloom-wrap-dress", name: "Handloom Wrap Dress",     returnRate:  9.2, topReason: "Didn't match photo", returns: 44, revenue: 5_205_600 },
  { id: "ss-linen-set",           name: "Linen Two-piece Set",     returnRate:  8.4, topReason: "Too small",       returns: 71, revenue: 12_461_600 },
  { id: "ss-linen-trousers",      name: "Wide-leg Linen Trousers", returnRate:  8.9, topReason: "Too big",         returns: 17, revenue: 1_396_800 },
  { id: "ss-silk-wrap-dress",     name: "Serendib Silk Wrap Dress", returnRate: 6.2, topReason: "Changed mind",    returns: 92, revenue: 13_261_000 },
  { id: "ss-lotus-maxi",          name: "Lotus Embroidered Maxi",  returnRate:  5.8, topReason: "Quality",         returns: 36, revenue: 7_750_000 },
];

// ─── FINANCIALS ───────────────────────────────────────────────────────────────
export const SKU_MARGINS = [
  { id: "ss-silk-wrap-dress",    name: "Serendib Silk Wrap Dress", price: 8_900,  cost: 3_200, margin: 64.0 },
  { id: "ss-linen-set",          name: "Linen Two-piece Set",      price: 14_800, cost: 5_800, margin: 60.8 },
  { id: "ss-batik-coord",        name: "Batik Crop Co-ord",        price: 11_200, cost: 4_600, margin: 58.9 },
  { id: "ss-lotus-maxi",         name: "Lotus Embroidered Maxi",   price: 12_500, cost: 5_200, margin: 58.4 },
  { id: "ss-jumpsuit",           name: "Linen Jumpsuit",           price: 13_400, cost: 5_600, margin: 58.2 },
  { id: "ss-handloom-wrap-dress",name: "Handloom Wrap Dress",      price: 10_800, cost: 4_600, margin: 57.4 },
  { id: "ss-linen-shirt-dress",  name: "Linen Shirt Dress",        price: 8_400,  cost: 3_600, margin: 57.1 },
  { id: "ss-embroidered-set",    name: "Embroidered Shorts Set",   price: 9_600,  cost: 4_200, margin: 56.3 },
  { id: "ss-off-shoulder-sundress", name: "Off-shoulder Sundress", price: 9_200,  cost: 4_100, margin: 55.4 },
  { id: "ss-batik-blouse",       name: "Batik Smocked Blouse",     price: 6_100,  cost: 2_800, margin: 54.1 },
  { id: "ss-handblock-tunic",    name: "Handblock Print Tunic",    price: 7_400,  cost: 3_400, margin: 54.1 },
  { id: "ss-batik-midi",         name: "Batik Print Midi Dress",   price: 7_800,  cost: 3_600, margin: 53.8 },
  { id: "ss-ceylon-tee",         name: "Ceylon Print Oversized Tee", price: 3_200, cost: 1_500, margin: 53.1 },
  { id: "ss-linen-trousers",     name: "Wide-leg Linen Trousers",  price: 7_200,  cost: 3_400, margin: 52.8 },
  { id: "ss-tropical-shift",     name: "Tropical Print Shift Dress", price: 6_900, cost: 3_200, margin: 53.6 },
];

export type Payout = {
  id: string;
  period: string;
  paidAt: string;
  gross: number;
  commission: number;
  processing: number;
  returnFees: number;
  net: number;
  status: "paid" | "processing" | "scheduled";
};

export const PAYOUT_HISTORY: Payout[] = [
  { id: "pay-006", period: "1–15 May 2026",   paidAt: "2026-05-15", gross: 684_200,   commission: 54_736,  processing: 17_105,  returnFees: 3_450, net: 608_909,   status: "scheduled" },
  { id: "pay-005", period: "16–30 Apr 2026",  paidAt: "2026-05-01", gross: 718_400,   commission: 57_472,  processing: 17_960,  returnFees: 3_150, net: 639_818,   status: "paid"      },
  { id: "pay-004", period: "1–15 Apr 2026",   paidAt: "2026-04-15", gross: 1_124_800, commission: 89_984,  processing: 28_120,  returnFees: 2_850, net: 1_003_846, status: "paid"      },
  { id: "pay-003", period: "16–31 Mar 2026",  paidAt: "2026-04-01", gross: 578_400,   commission: 46_272,  processing: 14_460,  returnFees: 2_700, net: 514_968,   status: "paid"      },
  { id: "pay-002", period: "1–15 Mar 2026",   paidAt: "2026-03-15", gross: 634_200,   commission: 50_736,  processing: 15_855,  returnFees: 2_400, net: 565_209,   status: "paid"      },
  { id: "pay-001", period: "16–28 Feb 2026",  paidAt: "2026-03-01", gross: 486_400,   commission: 38_912,  processing: 12_160,  returnFees: 1_950, net: 433_378,   status: "paid"      },
];

// ─── MARKETING CAMPAIGNS ──────────────────────────────────────────────────────
export type AdType = "product-boost" | "explore" | "app-launch";
export type CampaignStatus = "active" | "paused" | "scheduled" | "ended";

export type Campaign = {
  id: string;
  name: string;
  adType: AdType;
  status: CampaignStatus;
  dailyBudget: number;
  totalSpend: number;
  attributedRevenue: number;
  roas: number;
  clicks?: number;
  impressions?: number;
  saves?: number;
  startDate: string;
  endDate?: string;
  products: string[];
  targeting: { gender: string; ageMin: number; ageMax: number; cities: string[] };
};

export const CAMPAIGNS: Campaign[] = [
  {
    id: "camp-001",
    name: "New Year Collection Blast",
    adType: "app-launch",
    status: "ended",
    dailyBudget: 5_000,
    totalSpend: 35_000,
    attributedRevenue: 294_000,
    roas: 8.4,
    impressions: 184_200,
    clicks: 14_820,
    startDate: "2026-04-08",
    endDate: "2026-04-16",
    products: ["ss-silk-wrap-dress", "ss-linen-set", "ss-batik-coord"],
    targeting: { gender: "Women", ageMin: 22, ageMax: 38, cities: ["Colombo", "Kandy", "Galle", "Negombo", "Jaffna"] },
  },
  {
    id: "camp-002",
    name: "Summer Arrivals Discovery",
    adType: "explore",
    status: "active",
    dailyBudget: 2_500,
    totalSpend: 27_500,
    attributedRevenue: 115_500,
    roas: 4.2,
    impressions: 98_400,
    saves: 4_820,
    clicks: 7_240,
    startDate: "2026-04-20",
    products: ["ss-off-shoulder-sundress", "ss-tropical-shift", "ss-linen-shirt-dress", "ss-ruffle-top"],
    targeting: { gender: "Women", ageMin: 20, ageMax: 35, cities: ["Colombo", "Galle", "Negombo"] },
  },
  {
    id: "camp-003",
    name: "Silk Wrap Dress — Boost",
    adType: "product-boost",
    status: "active",
    dailyBudget: 1_200,
    totalSpend: 8_400,
    attributedRevenue: 15_120,
    roas: 1.8,
    impressions: 24_600,
    clicks: 1_820,
    startDate: "2026-05-01",
    products: ["ss-silk-wrap-dress"],
    targeting: { gender: "All", ageMin: 18, ageMax: 45, cities: ["Colombo", "Kandy", "Galle", "Negombo", "Jaffna"] },
  },
  {
    id: "camp-004",
    name: "June Arrivals Launch",
    adType: "explore",
    status: "scheduled",
    dailyBudget: 3_000,
    totalSpend: 0,
    attributedRevenue: 0,
    roas: 0,
    impressions: 0,
    clicks: 0,
    startDate: "2026-06-01",
    products: ["ss-handloom-wrap-dress", "ss-lotus-maxi", "ss-embroidered-crop"],
    targeting: { gender: "Women", ageMin: 22, ageMax: 40, cities: ["Colombo", "Kandy", "Galle"] },
  },
];

// Daily marketing spend & revenue (last 30 days)
function generateMarketingDaily() {
  const start = new Date("2026-04-12");
  const result: { date: string; spend: number; revenue: number }[] = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const isActive = i >= 8; // campaigns kicked in Apr 20
    const spend = isActive ? Math.round((3_700 + ((i * 19) % 800)) * (1 + (i > 8 && i < 15 ? 0.35 : 0))) : 0;
    result.push({
      date: d.toISOString().slice(0, 10),
      spend,
      revenue: Math.round(spend * (1.8 + ((i * 7) % 40) / 10)),
    });
  }
  return result;
}
export const MARKETING_DAILY = generateMarketingDaily();

// ─── PROMOTIONS ───────────────────────────────────────────────────────────────
export type PromoType = "discount-code" | "flash-sale" | "free-shipping";
export type PromoStatus = "active" | "ended" | "scheduled";

export type Promotion = {
  id: string;
  name: string;
  type: PromoType;
  status: PromoStatus;
  code?: string;
  value: string;
  usageCount: number;
  usageLimit?: number;
  startDate: string;
  endDate?: string;
  products: string[];
};

export const PROMOTIONS: Promotion[] = [
  {
    id: "promo-001",
    name: "New Year Sale 20%",
    type: "discount-code",
    status: "ended",
    code: "AVURUDU20",
    value: "20% off",
    usageCount: 312,
    usageLimit: 500,
    startDate: "2026-04-08",
    endDate: "2026-04-18",
    products: [],
  },
  {
    id: "promo-002",
    name: "Free Shipping Over ₨5,000",
    type: "free-shipping",
    status: "active",
    value: "Free shipping on orders ≥ ₨5,000",
    usageCount: 184,
    startDate: "2026-04-20",
    products: [],
  },
  {
    id: "promo-003",
    name: "Linen Sets Flash Sale",
    type: "flash-sale",
    status: "ended",
    value: "15% off",
    usageCount: 68,
    startDate: "2026-05-01",
    endDate: "2026-05-03",
    products: ["ss-linen-set", "ss-batik-coord", "ss-jumpsuit"],
  },
];

// ─── KPI SUMMARY (pre-computed for convenience) ───────────────────────────────
function sumRevenue(days: number) {
  return DAILY_REVENUE.slice(90 - days).reduce((s, d) => s + d.revenue, 0);
}
function sumRevenuePrev(days: number) {
  return DAILY_REVENUE.slice(90 - days * 2, 90 - days).reduce((s, d) => s + d.revenue, 0);
}

export function getKPIs(period: 7 | 30 | 90) {
  const rev = sumRevenue(period);
  const prevRev = sumRevenuePrev(period);
  const orders = Math.round(rev / 4_431);
  const prevOrders = Math.round(prevRev / 4_296);
  const aov = Math.round(rev / orders);
  const prevAov = Math.round(prevRev / prevOrders);
  const totalViews90 = PRODUCT_PERFORMANCE.reduce((s, p) => s + p.views, 0);
  const views = Math.round(totalViews90 * period / 90);
  const prevViews = Math.round(views * 0.876);

  return {
    revenue:    { value: rev,    prev: prevRev,    pct: ((rev    - prevRev)    / prevRev)    * 100 },
    orders:     { value: orders, prev: prevOrders, pct: ((orders - prevOrders) / prevOrders) * 100 },
    aov:        { value: aov,    prev: prevAov,    pct: ((aov    - prevAov)    / prevAov)    * 100 },
    conversion: { value: 3.2,    prev: 2.9,        pct: 10.3 },
    views:      { value: views,  prev: prevViews,  pct: ((views  - prevViews)  / prevViews)  * 100 },
  };
}
