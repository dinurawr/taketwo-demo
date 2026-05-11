export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "Men" | "Women" | "Children" | "Swim";
  categoryGroup: string; // "new-in" | "dresses" | "tops" | "bottoms" | "shorts" | "bikinis" | "beach-cover-up" | "beach-dresses" | "rock-revival" | etc.
  price: number; // LKR
  image: string;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
};

export const products: Product[] = [
  // ── Valley ──────────────────────────────────────────────
  {
    id: "valley-summer-shirt",
    name: "Valley Summer Shirt",
    brand: "valley",
    category: "Men",
    categoryGroup: "tops",
    price: 14545,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Coral", hex: "#C97B63" },
      { name: "Ocean", hex: "#4A90D9" },
      { name: "Amber", hex: "#E8A020" },
    ],
    description:
      "Made from organic cotton with a lightly brushed finish, this regular-fit overshirt has a sharp pointed collar and fastens with tonal organic corozo buttons.",
    inStock: true,
    rating: 4.6,
    reviewCount: 38,
  },
  // ── North Lane ──────────────────────────────────────────
  {
    id: "northlane-black-shirt",
    name: "North Lane Black Shirt",
    brand: "north-lane",
    category: "Men",
    categoryGroup: "tops",
    price: 12595,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Charcoal", hex: "#3A3A3A" },
    ],
    description:
      "A versatile long-sleeve shirt in a pinstripe weave. Sharp enough for evenings, relaxed enough for weekends.",
    inStock: true,
    rating: 4.7,
    reviewCount: 52,
  },
  // ── Halcyon ─────────────────────────────────────────────
  {
    id: "halcyon-sundress",
    name: "Halcyon Sundress",
    brand: "halcyon",
    category: "Women",
    categoryGroup: "dresses",
    price: 16800,
    image: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Marigold", hex: "#F5A623" },
      { name: "Blush", hex: "#F4A0A0" },
    ],
    description:
      "Flowy midi sundress with adjustable straps and a subtle floral texture. Perfect for warm evenings.",
    inStock: true,
    rating: 4.9,
    reviewCount: 67,
  },
  {
    id: "halcyon-linen-set",
    name: "Halcyon Linen Co-ord Set",
    brand: "halcyon",
    category: "Women",
    categoryGroup: "new-in",
    price: 24500,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Cream", hex: "#F4EDE6" },
      { name: "Terracotta", hex: "#C97B63" },
    ],
    description: "Matching linen top and wide-leg trouser set. Lightweight and breathable.",
    inStock: true,
    rating: 4.6,
    reviewCount: 43,
  },
  {
    id: "halcyon-wrap-top",
    name: "Halcyon Wrap Top",
    brand: "halcyon",
    category: "Women",
    categoryGroup: "tops",
    price: 9800,
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Rust", hex: "#B5481A" },
      { name: "White", hex: "#FFFFFF" },
    ],
    description: "Soft wrap top with tie detail at the waist. Flattering on all body types.",
    inStock: true,
    rating: 4.4,
    reviewCount: 31,
  },
  // ── Nilo ────────────────────────────────────────────────
  {
    id: "nilo-wide-leg-jeans",
    name: "Nilo Wide Leg Jeans",
    brand: "nilo",
    category: "Women",
    categoryGroup: "bottoms",
    price: 19500,
    image: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600&q=80"],
    sizes: ["24", "26", "28", "30", "32"],
    colors: [
      { name: "Light Wash", hex: "#A8C0D6" },
      { name: "Dark Wash", hex: "#2A3F5F" },
    ],
    description: "High-rise wide-leg jeans in a premium stretch denim. Retro silhouette, modern comfort.",
    inStock: true,
    rating: 4.7,
    reviewCount: 88,
  },
  {
    id: "nilo-ribbed-tee",
    name: "Nilo Ribbed Tee",
    brand: "nilo",
    category: "Women",
    categoryGroup: "tops",
    price: 6500,
    image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#111111" },
      { name: "Sage", hex: "#8FAF8A" },
    ],
    description: "Fitted ribbed cotton tee. The perfect layering piece.",
    inStock: true,
    rating: 4.5,
    reviewCount: 112,
  },
  {
    id: "nilo-trench-coat",
    name: "Nilo Trench Coat",
    brand: "nilo",
    category: "Women",
    categoryGroup: "new-in",
    price: 48000,
    image: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&q=80"],
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Camel", hex: "#C4945A" }],
    description: "Classic double-breasted trench coat in a water-resistant cotton blend.",
    inStock: true,
    rating: 4.9,
    reviewCount: 24,
  },
  // ── Ember ────────────────────────────────────────────────
  {
    id: "ember-red-jacket",
    name: "Ember Statement Jacket",
    brand: "ember",
    category: "Men",
    categoryGroup: "rock-revival",
    price: 42000,
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Red", hex: "#CC2222" },
      { name: "Black", hex: "#111111" },
    ],
    description: "Bold bomber jacket with contrast stitching. Built to be seen.",
    inStock: true,
    rating: 4.6,
    reviewCount: 19,
  },
  {
    id: "ember-graphic-tee",
    name: "Ember Graphic Tee",
    brand: "ember",
    category: "Men",
    categoryGroup: "tops",
    price: 8500,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Black", hex: "#111111" }],
    description: "Heavyweight cotton tee with a bold original graphic print.",
    inStock: true,
    rating: 4.3,
    reviewCount: 56,
  },
  // ── Children ─────────────────────────────────────────────
  {
    id: "nilo-kids-set",
    name: "Nilo Kids Play Set",
    brand: "nilo",
    category: "Children",
    categoryGroup: "new-in",
    price: 8900,
    image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=600&q=80"],
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    colors: [
      { name: "Yellow", hex: "#F5D020" },
      { name: "Blue", hex: "#4A90D9" },
    ],
    description: "Soft organic cotton play set with elastic waist for easy dressing.",
    inStock: true,
    rating: 4.8,
    reviewCount: 45,
  },
  {
    id: "halcyon-kids-dress",
    name: "Halcyon Mini Dress",
    brand: "halcyon",
    category: "Children",
    categoryGroup: "dresses",
    price: 7500,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80"],
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
    colors: [
      { name: "Pink", hex: "#F4A0A0" },
      { name: "Mint", hex: "#9DE0C4" },
    ],
    description: "Adorable cotton mini dress with smocked bodice. Machine washable.",
    inStock: true,
    rating: 4.9,
    reviewCount: 62,
  },
  // ── Swim ─────────────────────────────────────────────────
  {
    id: "halcyon-bikini-set",
    name: "Halcyon Bikini Set",
    brand: "halcyon",
    category: "Swim",
    categoryGroup: "bikinis",
    price: 13500,
    image: "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600&q=80"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Coral", hex: "#E8785A" },
      { name: "Sand", hex: "#D4B896" },
      { name: "Black", hex: "#111111" },
    ],
    description:
      "Adjustable triangle bikini set in a quick-dry fabric. UPF 50+ protection. Structured top with removable padding.",
    inStock: true,
    rating: 4.7,
    reviewCount: 34,
  },
  {
    id: "valley-beach-coverup",
    name: "Valley Beach Cover Up",
    brand: "valley",
    category: "Swim",
    categoryGroup: "beach-cover-up",
    price: 9800,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80"],
    sizes: ["One Size", "S/M", "L/XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Terracotta", hex: "#C97B63" },
    ],
    description:
      "Lightweight woven beach cover-up with deep V-neckline and tassel hem. Throw over a swimsuit or wear as a summer dress.",
    inStock: true,
    rating: 4.5,
    reviewCount: 28,
  },
  {
    id: "halcyon-beach-dress",
    name: "Halcyon Beach Dress",
    brand: "halcyon",
    category: "Swim",
    categoryGroup: "beach-dresses",
    price: 17200,
    image: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Ocean Blue", hex: "#4A90D9" },
      { name: "Marigold", hex: "#F5A623" },
    ],
    description:
      "Breezy midi beach dress with smocked bodice and tiered skirt. Perfect from the sand to the restaurant.",
    inStock: true,
    rating: 4.8,
    reviewCount: 41,
  },
  {
    id: "northlane-swim-shorts",
    name: "North Lane Swim Shorts",
    brand: "north-lane",
    category: "Swim",
    categoryGroup: "shorts",
    price: 11000,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy", hex: "#1A2F5A" },
      { name: "Black", hex: "#111111" },
      { name: "Olive", hex: "#5C6B3A" },
    ],
    description:
      "Quick-dry board shorts with mesh lining and secure zip pocket. Longer length for a relaxed fit.",
    inStock: true,
    rating: 4.4,
    reviewCount: 22,
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string) {
  if (category === "all") return products;
  return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function getProductsByBrand(brandId: string) {
  return products.filter((p) => p.brand === brandId);
}

/** Strip the brand name prefix from a product name, e.g. "Nilo Trench Coat" → "Trench Coat" */
export function getShortName(product: { name: string; brand: string }): string {
  const brandWords: Record<string, string[]> = {
    valley: ["Valley"],
    "north-lane": ["North", "Lane"],
    halcyon: ["Halcyon"],
    nilo: ["Nilo"],
    ember: ["Ember"],
  };
  const prefixes = brandWords[product.brand] ?? [];
  if (prefixes.length === 0) return product.name;
  const prefix = prefixes.join(" ");
  if (product.name.startsWith(prefix + " ")) {
    return product.name.slice(prefix.length + 1);
  }
  return product.name;
}
