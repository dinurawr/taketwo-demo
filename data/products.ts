// ASOS CDN helper — keeps URLs readable
// Pattern: https://images.asos-media.com/products/{slug}/{id}-{n}?$n_480w$&wid=478&fit=constrain
const asos = (slug: string, id: number, n = 1) =>
  `https://images.asos-media.com/products/${slug}/${id}-${n}?$n_480w$&wid=478&fit=constrain`;

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
  // VALLEY — Effortless everyday (Men)
  // ─────────────────────────────────────────────────────────────
  {
    id: "valley-heavyweight-tee",
    name: "Valley Heavyweight Boxy Tee",
    brand: "valley",
    category: "Men",
    categoryGroup: "tops",
    price: 5500,
    image: asos("asos-design-heavyweight-boxy-oversized-fit-t-shirt-in-white", 205771603),
    images: [
      asos("asos-design-heavyweight-boxy-oversized-fit-t-shirt-in-white", 205771603, 1),
      asos("asos-design-heavyweight-boxy-oversized-fit-t-shirt-in-white", 205771603, 2),
    ],
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
    image: asos("asos-design-linen-blend-overshirt-in-stone", 206097131),
    images: [
      asos("asos-design-linen-blend-overshirt-in-stone", 206097131, 1),
      asos("asos-design-linen-blend-overshirt-in-stone", 206097131, 2),
      asos("asos-design-linen-blend-overshirt-in-stone", 206097131, 3),
    ],
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
    image: asos("cotton-on-relaxed-shorts-in-linen-mix-in-brown", 206251484),
    images: [
      asos("cotton-on-relaxed-shorts-in-linen-mix-in-brown", 206251484, 1),
      asos("cotton-on-relaxed-shorts-in-linen-mix-in-brown", 206251484, 2),
    ],
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
    image: asos("asos-design-linen-blend-shorts-in-multi-plaid", 206912116),
    images: [
      asos("asos-design-linen-blend-shorts-in-multi-plaid", 206912116, 1),
      asos("asos-design-linen-blend-shorts-in-multi-plaid", 206912116, 2),
    ],
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
    image: asos("asos-design-slim-chinos-in-black", 208066174),
    images: [
      asos("asos-design-slim-chinos-in-black", 208066174, 1),
      asos("asos-design-slim-chinos-in-black", 208066174, 2),
      asos("asos-design-slim-chinos-in-black", 208066174, 3),
    ],
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
    image: asos("topman-slim-chino-pant-in-navy", 207135730),
    images: [
      asos("topman-slim-chino-pant-in-navy", 207135730, 1),
      asos("topman-slim-chino-pant-in-navy", 207135730, 2),
    ],
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
    image: asos("topman-linen-blend-shorts-in-stone", 205682420),
    images: [
      asos("topman-linen-blend-shorts-in-stone", 205682420, 1),
      asos("topman-linen-blend-shorts-in-stone", 205682420, 2),
    ],
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
    image: asos("selected-linen-mix-overshirt-in-navy", 205988147),
    images: [
      asos("selected-linen-mix-overshirt-in-navy", 205988147, 1),
      asos("selected-linen-mix-overshirt-in-navy", 205988147, 2),
      asos("selected-linen-mix-overshirt-in-navy", 205988147, 3),
    ],
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
    image: asos("asos-design-boxy-oversized-over-the-head-textured-linen-blend-shirt-in-black", 207611465),
    images: [
      asos("asos-design-boxy-oversized-over-the-head-textured-linen-blend-shirt-in-black", 207611465, 1),
      asos("asos-design-boxy-oversized-over-the-head-textured-linen-blend-shirt-in-black", 207611465, 2),
    ],
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
    image: asos("asos-design-satin-sarong-wrap-maxi-skirt-in-green", 201988529),
    images: [
      asos("asos-design-satin-sarong-wrap-maxi-skirt-in-green", 201988529, 1),
      asos("asos-design-satin-sarong-wrap-maxi-skirt-in-green", 201988529, 2),
    ],
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
    image: asos("asos-design-maxi-beach-sarong-in-animal-palm-print", 12682344),
    images: [
      asos("asos-design-maxi-beach-sarong-in-animal-palm-print", 12682344, 1),
      asos("asos-design-maxi-beach-sarong-in-animal-palm-print", 12682344, 2),
    ],
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
    image: asos("asos-design-tie-side-maxi-chiffon-beach-sarong-in-black", 14678625),
    images: [
      asos("asos-design-tie-side-maxi-chiffon-beach-sarong-in-black", 14678625, 1),
      asos("asos-design-tie-side-maxi-chiffon-beach-sarong-in-black", 14678625, 2),
    ],
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
    image: asos("asos-design-woven-stripe-frill-beach-sarong-two-piece-skirt", 9783688),
    images: [
      asos("asos-design-woven-stripe-frill-beach-sarong-two-piece-skirt", 9783688, 1),
      asos("asos-design-woven-stripe-frill-beach-sarong-two-piece-skirt", 9783688, 2),
    ],
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
    image: asos("asos-design-mix-and-match-crinkle-high-leg-hipster-bikini-bottom", 8305751),
    images: [
      asos("asos-design-mix-and-match-crinkle-high-leg-hipster-bikini-bottom", 8305751, 1),
      asos("asos-design-mix-and-match-crinkle-high-leg-hipster-bikini-bottom", 8305751, 2),
    ],
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
    image: asos("asos-design-v-plunge-skinny-strap-thong-swimsuit-in-black", 13258826),
    images: [
      asos("asos-design-v-plunge-skinny-strap-thong-swimsuit-in-black", 13258826, 1),
      asos("asos-design-v-plunge-skinny-strap-thong-swimsuit-in-black", 13258826, 2),
    ],
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
    image: asos("asos-design-supersoft-asymmetric-mini-dress-with-dropped-hem-detail-in-cream", 210120054),
    images: [
      asos("asos-design-supersoft-asymmetric-mini-dress-with-dropped-hem-detail-in-cream", 210120054, 1),
      asos("asos-design-supersoft-asymmetric-mini-dress-with-dropped-hem-detail-in-cream", 210120054, 2),
      asos("asos-design-supersoft-asymmetric-mini-dress-with-dropped-hem-detail-in-cream", 210120054, 3),
    ],
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
    image: asos("asos-design-premium-tulle-maxi-prom-dress-with-ribbon-ties", 10663976),
    images: [
      asos("asos-design-premium-tulle-maxi-prom-dress-with-ribbon-ties", 10663976, 1),
      asos("asos-design-premium-tulle-maxi-prom-dress-with-ribbon-ties", 10663976, 2),
    ],
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
    image: asos("asos-design-tall-tailored-wide-leg-pants-with-pleat-detail-in-black", 204861990),
    images: [
      asos("asos-design-tall-tailored-wide-leg-pants-with-pleat-detail-in-black", 204861990, 1),
      asos("asos-design-tall-tailored-wide-leg-pants-with-pleat-detail-in-black", 204861990, 2),
      asos("asos-design-tall-tailored-wide-leg-pants-with-pleat-detail-in-black", 204861990, 3),
    ],
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
    image: asos("selected-femme-tailored-wide-leg-pants-with-pleat-front-in-camel", 204848327),
    images: [
      asos("selected-femme-tailored-wide-leg-pants-with-pleat-front-in-camel", 204848327, 1),
      asos("selected-femme-tailored-wide-leg-pants-with-pleat-front-in-camel", 204848327, 2),
    ],
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
    image: asos("asos-edition-tailored-relaxed-wide-leg-pants-in-taupe", 205200141),
    images: [
      asos("asos-edition-tailored-relaxed-wide-leg-pants-in-taupe", 205200141, 1),
      asos("asos-edition-tailored-relaxed-wide-leg-pants-in-taupe", 205200141, 2),
    ],
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
    image: asos("lioness-halterneck-top-co-ord-in-black-part-of-a-set", 206283474),
    images: [
      asos("lioness-halterneck-top-co-ord-in-black-part-of-a-set", 206283474, 1),
      asos("lioness-halterneck-top-co-ord-in-black-part-of-a-set", 206283474, 2),
    ],
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
    image: asos("asos-edition-sequin-off-shoulder-drape-crop-top-in-blush", 203098544),
    images: [
      asos("asos-edition-sequin-off-shoulder-drape-crop-top-in-blush", 203098544, 1),
      asos("asos-edition-sequin-off-shoulder-drape-crop-top-in-blush", 203098544, 2),
      asos("asos-edition-sequin-off-shoulder-drape-crop-top-in-blush", 203098544, 3),
    ],
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
    image: asos("topshop-ruched-cropped-blouse-in-red-heart-print", 23995227),
    images: [
      asos("topshop-ruched-cropped-blouse-in-red-heart-print", 23995227, 1),
      asos("topshop-ruched-cropped-blouse-in-red-heart-print", 23995227, 2),
    ],
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
    image: asos("topshop-wide-leg-pleat-tailored-pants-in-gray", 206030210),
    images: [
      asos("topshop-wide-leg-pleat-tailored-pants-in-gray", 206030210, 1),
      asos("topshop-wide-leg-pleat-tailored-pants-in-gray", 206030210, 2),
    ],
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
    image: asos("asos-design-tall-tailored-slinky-wide-leg-pants-with-wrap-pleat-detail-in-chocolate", 206894390),
    images: [
      asos("asos-design-tall-tailored-slinky-wide-leg-pants-with-wrap-pleat-detail-in-chocolate", 206894390, 1),
      asos("asos-design-tall-tailored-slinky-wide-leg-pants-with-wrap-pleat-detail-in-chocolate", 206894390, 2),
    ],
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
    image: asos("topman-linen-mix-knit-polo-shirt-in-navy", 208185104),
    images: [
      asos("topman-linen-mix-knit-polo-shirt-in-navy", 208185104, 1),
      asos("topman-linen-mix-knit-polo-shirt-in-navy", 208185104, 2),
    ],
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
    image: asos("asos-design-linen-blend-shorts-in-super-short-length-in-tan", 208594178),
    images: [
      asos("asos-design-linen-blend-shorts-in-super-short-length-in-tan", 208594178, 1),
      asos("asos-design-linen-blend-shorts-in-super-short-length-in-tan", 208594178, 2),
    ],
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
    categoryGroup: "rock-revival",
    price: 8200,
    image: asos("hollister-linen-blend-tailored-shorts-in-navy", 208447576),
    images: [
      asos("hollister-linen-blend-tailored-shorts-in-navy", 208447576, 1),
      asos("hollister-linen-blend-tailored-shorts-in-navy", 208447576, 2),
    ],
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
