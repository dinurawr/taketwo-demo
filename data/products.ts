// Pexels CDN helper — allows server-side hotlinking (no auth required)
const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop`;

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "Men" | "Women" | "Children" | "Swim";
  categoryGroup: string;
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

  // ─────────────────────────────────────────────────────────────
  // NEW ARRIVALS — Men
  // ─────────────────────────────────────────────────────────────
  {
    id: "valley-organic-tee-new",
    name: "Valley Organic Cotton Tee",
    brand: "valley",
    category: "Men",
    categoryGroup: "new-in",
    price: 4800,
    image: px(5029685),
    images: [px(5029685), px(5145182)],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#F5F5F5" },
      { name: "Black", hex: "#111111" },
      { name: "Sage", hex: "#859365" },
    ],
    description:
      "100% organic cotton tee with a relaxed fit and a clean crew neck. Soft, breathable, and built to last.",
    inStock: true,
    rating: 4.6,
    reviewCount: 41,
  },
  {
    id: "north-lane-linen-shirt-new",
    name: "North Lane Linen Shirt",
    brand: "north-lane",
    category: "Men",
    categoryGroup: "new-in",
    price: 11200,
    image: px(19915630),
    images: [px(19915630), px(24206198)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#F5F5F5" },
      { name: "Navy", hex: "#1B3A5C" },
    ],
    description:
      "Crisp 100% linen shirt with a tailored collar and a clean button front. Effortlessly smart — wear it tucked or open over a tee.",
    inStock: true,
    rating: 4.7,
    reviewCount: 28,
  },
  {
    id: "ember-structured-polo-new",
    name: "Ember Structured Polo",
    brand: "ember",
    category: "Men",
    categoryGroup: "new-in",
    price: 8900,
    image: px(8068701),
    images: [px(8068701), px(9880321)],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Ecru", hex: "#EDE8DC" },
      { name: "Black", hex: "#111111" },
    ],
    description:
      "Structured piqué polo with a two-button placket and ribbed collar. Clean enough for dinner, easy enough for the weekend.",
    inStock: true,
    rating: 4.5,
    reviewCount: 19,
  },

  // ─────────────────────────────────────────────────────────────
  // NEW ARRIVALS — Women
  // ─────────────────────────────────────────────────────────────
  {
    id: "nilo-satin-midi-dress-new",
    name: "Nilo Satin Midi Dress",
    brand: "nilo",
    category: "Women",
    categoryGroup: "new-in",
    price: 16500,
    image: px(15758653),
    images: [px(15758653), px(29850173)],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Champagne", hex: "#E8DCC8" },
      { name: "Midnight", hex: "#1A1A2E" },
    ],
    description:
      "Fluid satin midi with a subtle bias cut and a delicate tie neckline. Moves beautifully — as good for dinner as it is for a gallery opening.",
    inStock: true,
    rating: 4.8,
    reviewCount: 34,
  },
  {
    id: "ember-minimal-coord-new",
    name: "Ember Minimal Co-ord Set",
    brand: "ember",
    category: "Women",
    categoryGroup: "new-in",
    price: 22000,
    image: px(29146256),
    images: [px(29146256), px(2090786)],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Cream", hex: "#F5F0E8" },
      { name: "Black", hex: "#111111" },
    ],
    description:
      "Crop top and wide-leg trouser set in a clean stretch fabric. The co-ord that separates effortlessly — wear together or apart.",
    inStock: true,
    rating: 4.9,
    reviewCount: 22,
  },
  {
    id: "valley-linen-shirt-dress-new",
    name: "Valley Linen Shirt Dress",
    brand: "valley",
    category: "Women",
    categoryGroup: "new-in",
    price: 13800,
    image: px(8484078),
    images: [px(8484078), px(11844304)],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Natural", hex: "#D8CFBE" },
      { name: "White", hex: "#F5F5F5" },
    ],
    description:
      "Easy linen shirt dress with a relaxed silhouette, button front, and a self-tie belt. The effortless summer piece you'll reach for every day.",
    inStock: true,
    rating: 4.7,
    reviewCount: 57,
  },

  // ─────────────────────────────────────────────────────────────
  // VALLEY — Effortless everyday (Men)
  // ─────────────────────────────────────────────────────────────
  {
    id: "valley-heavyweight-tee",
    name: "Valley Heavyweight Boxy Tee",
    brand: "valley",
    category: "Men",
    categoryGroup: "tops",
    price: 5500,
    image: px(5145182),
    images: [px(5145182), px(22441297)],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#F5F5F5" },
      { name: "Black", hex: "#111111" },
      { name: "Stone", hex: "#C4B89A" },
    ],
    description:
      "Heavyweight 280gsm cotton in a boxy, oversized cut. Drop shoulders, crew neck, and a slightly longer back hem. The tee you reach for every day.",
    inStock: true,
    rating: 4.7,
    reviewCount: 143,
  },
  {
    id: "valley-linen-overshirt-stone",
    name: "Valley Linen Blend Overshirt",
    brand: "valley",
    category: "Men",
    categoryGroup: "tops",
    price: 9800,
    image: px(18075374),
    images: [px(18075374), px(8367472), px(5029685)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Stone", hex: "#C4B89A" },
      { name: "Navy", hex: "#1B3A5C" },
    ],
    description:
      "70% cotton, 30% linen overshirt with a relaxed fit. Two chest patch pockets, corozo buttons, and a slightly longer back hem. Wear open over a tee or buttoned as a standalone.",
    inStock: true,
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: "valley-relaxed-linen-shorts-brown",
    name: "Valley Relaxed Linen Shorts",
    brand: "valley",
    category: "Men",
    categoryGroup: "shorts",
    price: 6800,
    image: px(18178103),
    images: [px(18178103), px(18178451)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Brown", hex: "#7A5C3C" },
      { name: "Natural", hex: "#D8CFBE" },
    ],
    description:
      "55% linen, 45% viscose relaxed shorts with a high rise and drawstring waistband. Side pockets and an easy-going silhouette for warm days.",
    inStock: true,
    rating: 4.4,
    reviewCount: 62,
  },
  {
    id: "valley-plaid-linen-shorts",
    name: "Valley Plaid Linen Shorts",
    brand: "valley",
    category: "Men",
    categoryGroup: "shorts",
    price: 7200,
    image: px(18178445),
    images: [px(18178445), px(8942369)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Multi Plaid", hex: "#6B7280" },
    ],
    description:
      "Linen blend shorts in a vintage-inspired multi-plaid print. Elastic waistband, side pockets, and a relaxed above-the-knee length.",
    inStock: true,
    rating: 4.3,
    reviewCount: 38,
  },

  // ─────────────────────────────────────────────────────────────
  // NORTH LANE — Modern minimalism (Men)
  // ─────────────────────────────────────────────────────────────
  {
    id: "north-lane-slim-chinos-black",
    name: "North Lane Slim Chinos",
    brand: "north-lane",
    category: "Men",
    categoryGroup: "bottoms",
    price: 13500,
    image: px(9464625),
    images: [px(9464625), px(2897539), px(27584193)],
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Stone", hex: "#C4B89A" },
    ],
    description:
      "Slim-fit chinos in a stretch cotton blend. Clean finish with a flat front, zip fly, and tailored leg. The foundation of any modern wardrobe.",
    inStock: true,
    rating: 4.8,
    reviewCount: 211,
  },
  {
    id: "north-lane-slim-chino-navy",
    name: "North Lane Slim Chino",
    brand: "north-lane",
    category: "Men",
    categoryGroup: "bottoms",
    price: 12800,
    image: px(2897533),
    images: [px(2897533), px(11176394)],
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Navy", hex: "#1B3A5C" },
      { name: "Khaki", hex: "#A3956C" },
    ],
    description:
      "Clean-lined slim chino in a sturdy cotton twill. Side pockets, zip fly, and a tapered leg that pairs with anything from loafers to trainers.",
    inStock: true,
    rating: 4.7,
    reviewCount: 176,
  },
  {
    id: "north-lane-linen-shorts-stone",
    name: "North Lane Linen Shorts",
    brand: "north-lane",
    category: "Men",
    categoryGroup: "shorts",
    price: 7500,
    image: px(1502517),
    images: [px(1502517), px(7823899)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Stone", hex: "#C4B89A" },
      { name: "Navy", hex: "#1B3A5C" },
    ],
    description:
      "55% cotton, 45% linen blend shorts in a tailored above-the-knee cut. Side pockets, belt loops, and a clean button fly.",
    inStock: true,
    rating: 4.5,
    reviewCount: 94,
  },
  {
    id: "north-lane-linen-overshirt-navy",
    name: "North Lane Linen Overshirt",
    brand: "north-lane",
    category: "Men",
    categoryGroup: "tops",
    price: 11500,
    image: px(32778907),
    images: [px(32778907), px(5038964), px(9558606)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Navy", hex: "#1B3A5C" },
    ],
    description:
      "76% linen, 24% cotton overshirt with a structured collar and button-through front. A refined take on the overshirt — relaxed but intentional.",
    inStock: true,
    rating: 4.7,
    reviewCount: 118,
  },
  {
    id: "north-lane-boxy-shirt-black",
    name: "North Lane Boxy Textured Shirt",
    brand: "north-lane",
    category: "Men",
    categoryGroup: "tops",
    price: 10800,
    image: px(5038964),
    images: [px(5038964), px(9558606)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#111111" },
    ],
    description:
      "Boxy oversized linen blend shirt with a pull-over design — no buttons, just a small V-notch neckline. The texture adds depth to the simplest outfits.",
    inStock: true,
    rating: 4.5,
    reviewCount: 67,
  },

  // ─────────────────────────────────────────────────────────────
  // HALCYON — Sun-soaked styles (Women's swimwear & beach)
  // ─────────────────────────────────────────────────────────────
  {
    id: "halcyon-sarong-wrap-skirt-green",
    name: "Halcyon Satin Sarong Wrap Skirt",
    brand: "halcyon",
    category: "Swim",
    categoryGroup: "beach-cover-up",
    price: 6200,
    image: px(29542527),
    images: [px(29542527), px(815996)],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Green", hex: "#2D6A4F" },
      { name: "Black", hex: "#111111" },
    ],
    description:
      "Satin sarong wrap skirt with a high rise, tie side, and thigh-high slit. Slides over a bikini or dresses up with a crop top.",
    inStock: true,
    rating: 4.6,
    reviewCount: 88,
  },
  {
    id: "halcyon-palm-print-sarong",
    name: "Halcyon Palm Print Maxi Sarong",
    brand: "halcyon",
    category: "Swim",
    categoryGroup: "beach-cover-up",
    price: 4800,
    image: px(8157976),
    images: [px(8157976), px(8157744)],
    sizes: ["One Size"],
    colors: [
      { name: "Palm Print", hex: "#4A7C59" },
    ],
    description:
      "Lightweight maxi sarong in a bold animal-palm print. Ties at the waist or hip — wear it a dozen different ways.",
    inStock: true,
    rating: 4.5,
    reviewCount: 54,
  },
  {
    id: "halcyon-chiffon-sarong-black",
    name: "Halcyon Chiffon Tie Sarong",
    brand: "halcyon",
    category: "Swim",
    categoryGroup: "beach-cover-up",
    price: 5500,
    image: px(8157823),
    images: [px(8157823), px(8157745)],
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#111111" },
    ],
    description:
      "Floaty chiffon maxi sarong with tie sides. Sheer and effortless — the perfect pool-to-bar layer.",
    inStock: true,
    rating: 4.7,
    reviewCount: 72,
  },
  {
    id: "halcyon-stripe-sarong-skirt",
    name: "Halcyon Stripe Frill Sarong Skirt",
    brand: "halcyon",
    category: "Swim",
    categoryGroup: "beach-dresses",
    price: 7800,
    image: px(8760433),
    images: [px(8760433), px(8157979)],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Multi Stripe", hex: "#D4A853" },
    ],
    description:
      "Woven stripe sarong with a playful frill hem. Wraps and ties at the waist — pair with the matching top or your favourite bikini.",
    inStock: true,
    rating: 4.6,
    reviewCount: 49,
  },
  {
    id: "halcyon-crinkle-bikini-bottom",
    name: "Halcyon Crinkle High-Leg Bikini",
    brand: "halcyon",
    category: "Swim",
    categoryGroup: "bikinis",
    price: 4200,
    image: px(815996),
    images: [px(815996), px(29542527)],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Coral", hex: "#E8785A" },
      { name: "White", hex: "#F5F5F5" },
      { name: "Black", hex: "#111111" },
    ],
    description:
      "Crinkle-texture high-leg hipster bikini bottom. Mix and match with any of our bikini tops — designed as separates for a perfect fit.",
    inStock: true,
    rating: 4.5,
    reviewCount: 136,
  },
  {
    id: "halcyon-vplunge-swimsuit",
    name: "Halcyon V-Plunge Swimsuit",
    brand: "halcyon",
    category: "Swim",
    categoryGroup: "bikinis",
    price: 6800,
    image: px(8157979),
    images: [px(8157979), px(8760433)],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Black", hex: "#111111" },
    ],
    description:
      "Deep V-plunge one-piece with skinny shoulder straps and a minimal cut. Sleek and confident at the pool or the beach.",
    inStock: true,
    rating: 4.8,
    reviewCount: 97,
  },

  // ─────────────────────────────────────────────────────────────
  // NILO — Clean & considered (Women)
  // ─────────────────────────────────────────────────────────────
  {
    id: "nilo-asymmetric-mini-dress",
    name: "Nilo Asymmetric Mini Dress",
    brand: "nilo",
    category: "Women",
    categoryGroup: "dresses",
    price: 9500,
    image: px(1008206),
    images: [px(1008206), px(28698706), px(11844304)],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Cream", hex: "#F5F0E8" },
      { name: "Black", hex: "#111111" },
    ],
    description:
      "Supersoft jersey mini with an asymmetric dropped hem. Simple and considered — the kind of dress that works every time.",
    inStock: true,
    rating: 4.7,
    reviewCount: 182,
  },
  {
    id: "nilo-tulle-maxi-dress",
    name: "Nilo Tulle Maxi Dress",
    brand: "nilo",
    category: "Women",
    categoryGroup: "dresses",
    price: 18500,
    image: px(18860758),
    images: [px(18860758), px(14801160)],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Dusky Blue", hex: "#7B9CC0" },
      { name: "Blush", hex: "#E8B4B0" },
    ],
    description:
      "Premium layered tulle maxi with ribbon tie straps and a full skirt. A statement for the best occasions.",
    inStock: true,
    rating: 4.9,
    reviewCount: 58,
  },
  {
    id: "nilo-wide-leg-pants-black",
    name: "Nilo Wide-Leg Tailored Pants",
    brand: "nilo",
    category: "Women",
    categoryGroup: "bottoms",
    price: 13800,
    image: px(7202826),
    images: [px(7202826), px(19995459), px(7202819)],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#111111" },
    ],
    description:
      "Tailored wide-leg trousers with a pleat front detail. High rise, clean lines, and a fluid drape — the power trouser done right.",
    inStock: true,
    rating: 4.8,
    reviewCount: 247,
  },
  {
    id: "nilo-wide-leg-pants-camel",
    name: "Nilo Pleat-Front Wide-Leg Pants",
    brand: "nilo",
    category: "Women",
    categoryGroup: "bottoms",
    price: 14500,
    image: px(7202768),
    images: [px(7202768), px(7202815)],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Camel", hex: "#C4945A" },
      { name: "Black", hex: "#111111" },
    ],
    description:
      "Elevated tailored trousers in camel. Pleat front, wide leg, and a precise waistband. Pair with a fitted knit for an effortless look.",
    inStock: true,
    rating: 4.7,
    reviewCount: 134,
  },
  {
    id: "nilo-relaxed-pants-taupe",
    name: "Nilo Relaxed Wide-Leg Pants",
    brand: "nilo",
    category: "Women",
    categoryGroup: "bottoms",
    price: 12500,
    image: px(4458521),
    images: [px(4458521), px(28168176)],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Taupe", hex: "#9E9585" },
      { name: "Cream", hex: "#F5F0E8" },
    ],
    description:
      "Relaxed wide-leg trousers in a muted taupe. The softer, more laid-back sibling to a tailored trouser — still polished, just easier.",
    inStock: true,
    rating: 4.6,
    reviewCount: 109,
  },
  {
    id: "nilo-halterneck-coord",
    name: "Nilo Halterneck Co-ord Set",
    brand: "nilo",
    category: "Women",
    categoryGroup: "sets",
    price: 19500,
    image: px(26744884),
    images: [px(26744884), px(15661635)],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Ivory", hex: "#F5F0E8" },
    ],
    description:
      "Halterneck top and matching wide-leg trouser set. Wear together for an easy full look, or split them across different outfits.",
    inStock: true,
    rating: 4.8,
    reviewCount: 78,
  },

  // ─────────────────────────────────────────────────────────────
  // EMBER — Bold statement pieces (Women & Men)
  // ─────────────────────────────────────────────────────────────
  {
    id: "ember-sequin-crop-top",
    name: "Ember Sequin Off-Shoulder Top",
    brand: "ember",
    category: "Women",
    categoryGroup: "tops",
    price: 11500,
    image: px(23883682),
    images: [px(23883682), px(11311403), px(37414269)],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Blush", hex: "#E8B4B0" },
      { name: "Gold", hex: "#D4AF37" },
    ],
    description:
      "All-over sequin off-shoulder crop top with a draped front. Maximum impact, worn over high-waist trousers or a mini skirt.",
    inStock: true,
    rating: 4.8,
    reviewCount: 166,
  },
  {
    id: "ember-ruched-blouse",
    name: "Ember Ruched Cropped Blouse",
    brand: "ember",
    category: "Women",
    categoryGroup: "tops",
    price: 8500,
    image: px(8257736),
    images: [px(8257736), px(7022607)],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Red Print", hex: "#CC2222" },
      { name: "Black", hex: "#111111" },
    ],
    description:
      "Ruched cropped blouse with a bold print. Square neckline and gathered sleeves — made to be noticed.",
    inStock: true,
    rating: 4.5,
    reviewCount: 94,
  },
  {
    id: "ember-wide-leg-pants-gray",
    name: "Ember Wide-Leg Pleat Pants",
    brand: "ember",
    category: "Women",
    categoryGroup: "bottoms",
    price: 12800,
    image: px(8946961),
    images: [px(8946961), px(7202815)],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Gray", hex: "#6B7280" },
      { name: "Black", hex: "#111111" },
    ],
    description:
      "Wide-leg tailored trousers with a front pleat. Sharp, confident, and versatile — ground them with a heel or keep it cool in trainers.",
    inStock: true,
    rating: 4.7,
    reviewCount: 128,
  },
  {
    id: "ember-wide-leg-pants-chocolate",
    name: "Ember Slinky Wide-Leg Pants",
    brand: "ember",
    category: "Women",
    categoryGroup: "bottoms",
    price: 14200,
    image: px(28168176),
    images: [px(28168176), px(19995459)],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Chocolate", hex: "#5C3317" },
      { name: "Black", hex: "#111111" },
    ],
    description:
      "Slinky wide-leg trousers with a wrap pleat detail at the front. The fluid fabric catches light beautifully — a statement even in movement.",
    inStock: true,
    rating: 4.9,
    reviewCount: 73,
  },
  {
    id: "ember-polo-navy",
    name: "Ember Knit Polo Shirt",
    brand: "ember",
    category: "Men",
    categoryGroup: "tops",
    price: 9500,
    image: px(22441297),
    images: [px(22441297), px(8367472)],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy", hex: "#1B3A5C" },
      { name: "Ecru", hex: "#EDE8DC" },
    ],
    description:
      "Linen-mix knit polo with a classic two-button placket. Textured, breathable, and a step above the basic polo.",
    inStock: true,
    rating: 4.6,
    reviewCount: 87,
  },
  {
    id: "ember-linen-shorts-tan",
    name: "Ember Linen Shorts",
    brand: "ember",
    category: "Men",
    categoryGroup: "shorts",
    price: 6500,
    image: px(12803209),
    images: [px(12803209), px(13015120)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Tan", hex: "#C4945A" },
      { name: "Black", hex: "#111111" },
    ],
    description:
      "Linen blend shorts in a shorter-than-usual length. Relaxed and confident — pair with an oversized shirt for an easy summer look.",
    inStock: true,
    rating: 4.4,
    reviewCount: 55,
  },
  {
    id: "ember-linen-shorts-navy",
    name: "Ember Tailored Linen Shorts",
    brand: "ember",
    category: "Men",
    categoryGroup: "shorts",
    price: 8200,
    image: px(7823899),
    images: [px(7823899), px(12803209)],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Navy", hex: "#1B3A5C" },
      { name: "Stone", hex: "#C4B89A" },
    ],
    description:
      "55% linen tailored shorts with a mid rise, belt loops, and a clean concealed fly. The kind of shorts that look intentional.",
    inStock: true,
    rating: 4.6,
    reviewCount: 112,
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

/** Friendly display label for a categoryGroup key. Shared by brand page + CategoryAccordion. */
const CATEGORY_LABELS: Record<string, string> = {
  "new-in": "New Arrivals",
  tops: "Tops",
  bottoms: "Bottoms",
  shorts: "Shorts",
  dresses: "Dresses",
  sets: "Sets",
  "beach-cover-up": "Swim & Beach",
  "beach-dresses": "Swim & Beach",
  bikinis: "Swim & Beach",
  "rock-revival": "Rock Revival",
};

export function categoryLabel(key: string): string {
  return CATEGORY_LABELS[key] ?? key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Order categoryGroup keys deterministically: new-in first, then alphabetical by label. */
export function orderedCategoryGroups(keys: string[]): string[] {
  const unique = Array.from(new Set(keys));
  return unique.sort((a, b) => {
    if (a === "new-in") return -1;
    if (b === "new-in") return 1;
    return categoryLabel(a).localeCompare(categoryLabel(b));
  });
}

/**
 * Deterministic stock count derived from the product ID.
 * Presentational only — no schema change needed.
 * Distribution: ~35% very low (2-5), ~40% low (6-12), ~25% moderate (13-22).
 */
export function getStockCount(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const bucket = h % 100;
  if (bucket < 35) return (h % 4) + 2;        // 2–5  (very low)
  if (bucket < 75) return (h % 7) + 6;        // 6–12 (low)
  return (h % 10) + 13;                        // 13–22 (moderate)
}

/** Strip the brand name prefix from a product name, e.g. "Nilo Wide-Leg Pants" → "Wide-Leg Pants" */
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
