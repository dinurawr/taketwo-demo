// Real product photography, hotlinked from public Shopify CDNs.
//   ts → Taylor Stitch (menswear)   ab → Anine Bing (womenswear)   fb → Frankies Bikinis (swim)
// cdn.shopify.com is whitelisted in next.config.ts. To self-host these into
// /public (so they can never break), run: node scripts/self-host-images.mjs
const ts = (f: string) => `https://cdn.shopify.com/s/files/1/0070/1922/files/${f}`;
const ab = (f: string) => `https://cdn.shopify.com/s/files/1/0150/1528/files/${f}`;
const fb = (f: string) => `https://cdn.shopify.com/s/files/1/0158/2548/files/${f}`;

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "Men" | "Women" | "Children" | "Swim";
  /** Garment type: shirts | tees | knitwear | tops | trousers | shorts | dresses | swim */
  categoryGroup: string;
  /** Flags a "New In" piece (a flag, not a category, so it sits alongside its garment type). */
  isNew?: boolean;
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
    name: "Valley Regenerative Cotton Tee",
    brand: "valley",
    category: "Men",
    categoryGroup: "tees",
    isNew: true,
    price: 6500,
    image: ts("regenerative-cotton-tee-in-faded-pine-2608_001.jpg"),
    images: [ts("regenerative-cotton-tee-in-faded-pine-2608_001.jpg"), ts("instock_m_q326_regenerative-cotton-tee-faded-pine_portrait_002.jpg")],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Faded Pine", hex: "#5B6B5A" },
      { name: "Soil", hex: "#5A4A3C" },
      { name: "White", hex: "#F3F1EC" },
    ],
    description:
      "Midweight tee cut from regenerative organic cotton with a clean crew neck and a lived-in hand-feel. Soft, breathable, and built to last.",
    inStock: true,
    rating: 4.6,
    reviewCount: 41,
  },
  {
    id: "north-lane-linen-shirt-new",
    name: "North Lane Washed Oxford Shirt",
    brand: "north-lane",
    category: "Men",
    categoryGroup: "shirts",
    isNew: true,
    price: 13500,
    image: ts("Q426_The_Jack_in_Soil_Oxford_PDP_001.jpg"),
    images: [ts("Q426_The_Jack_in_Soil_Oxford_PDP_001.jpg"), ts("Q426_The_Jack_in_Soil_Oxford_PDP_002.jpg")],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Soil", hex: "#B9A88F" },
      { name: "Indigo", hex: "#30435C" },
    ],
    description:
      "Garment-washed organic cotton oxford with a soft spread collar and a clean button front. Effortlessly smart — wear it tucked or open over a tee.",
    inStock: true,
    rating: 4.7,
    reviewCount: 28,
  },
  {
    id: "ember-structured-polo-new",
    name: "Ember Knit Stripe Polo",
    brand: "ember",
    category: "Men",
    categoryGroup: "knitwear",
    isNew: true,
    price: 11500,
    image: ts("long-sleeve-polo-in-vintage-white-knit-stripe-2607_001.jpg"),
    images: [ts("long-sleeve-polo-in-vintage-white-knit-stripe-2607_001.jpg"), ts("instock_m_q326_long-sleeve-polo-vintage-white-knit-stripe_portrait_002.jpg")],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Vintage White", hex: "#EDE8DC" },
      { name: "Indigo", hex: "#27384F" },
    ],
    description:
      "Long-sleeve knit polo with a textured stripe and a two-button placket. Clean enough for dinner, easy enough for the weekend.",
    inStock: true,
    rating: 4.5,
    reviewCount: 19,
  },

  // ─────────────────────────────────────────────────────────────
  // NEW ARRIVALS — Women
  // ─────────────────────────────────────────────────────────────
  {
    id: "nilo-satin-midi-dress-new",
    name: "Nilo Blanca Midi Dress",
    brand: "nilo",
    category: "Women",
    categoryGroup: "dresses",
    isNew: true,
    price: 18500,
    image: ab("AB-BLANCAMIDIDRESS-BLACK_A-02-12474-BLK26_0231.jpg"),
    images: [ab("AB-BLANCAMIDIDRESS-BLACK_A-02-12474-BLK26_0231.jpg"), ab("AB-BLANCAMIDIDRESS-BLACK_A-02-12474-BLK26_0238.jpg")],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Black", hex: "#141414" },
    ],
    description:
      "Fluid midi with a bias cut and a subtle draped neckline. Moves beautifully — as good for dinner as it is for a gallery opening.",
    inStock: true,
    rating: 4.8,
    reviewCount: 34,
  },
  {
    id: "ember-minimal-coord-new",
    name: "Ember Draped Slip Dress",
    brand: "ember",
    category: "Women",
    categoryGroup: "dresses",
    isNew: true,
    price: 22000,
    image: ab("AB-FRAN_DRESS_-_BURGUNDY_A-08-12685-BGN27_1986_copy.jpg"),
    images: [ab("AB-FRAN_DRESS_-_BURGUNDY_A-08-12685-BGN27_1986_copy.jpg"), ab("AB-FRAN_DRESS_-_BURGUNDY_A-08-12685-BGN27_2005_copy.jpg")],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Burgundy", hex: "#6E2233" },
      { name: "Black", hex: "#141414" },
    ],
    description:
      "Bias-cut slip dress with delicate straps and a liquid drape. A statement in its simplicity — layer it or let it stand alone.",
    inStock: true,
    rating: 4.9,
    reviewCount: 22,
  },
  {
    id: "valley-linen-shirt-dress-new",
    name: "Valley Collared Shirt Dress",
    brand: "valley",
    category: "Women",
    categoryGroup: "dresses",
    isNew: true,
    price: 14500,
    image: ab("AB-JUNE_TRUCKER_COLLAR_DRESS_-_BLACK_A-02-12808-BLK1_2061.jpg"),
    images: [ab("AB-JUNE_TRUCKER_COLLAR_DRESS_-_BLACK_A-02-12808-BLK1_2061.jpg"), ab("AB-JUNE_TRUCKER_COLLAR_DRESS_-_BLACK_A-02-12808-BLK1_2086.jpg")],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Natural", hex: "#D8CFBE" },
    ],
    description:
      "Easy collared shirt dress with a relaxed silhouette and a self-tie waist. The effortless everyday piece you'll reach for on repeat.",
    inStock: true,
    rating: 4.7,
    reviewCount: 57,
  },

  // ─────────────────────────────────────────────────────────────
  // VALLEY — Effortless everyday (Men)
  // ─────────────────────────────────────────────────────────────
  {
    id: "valley-heavyweight-tee",
    name: "Valley Heavyweight Shop Tee",
    brand: "valley",
    category: "Men",
    categoryGroup: "tees",
    price: 5800,
    image: ts("Q426_TheOrganicCottonShopTee-PortTwist_PDP_001.jpg"),
    images: [ts("Q426_TheOrganicCottonShopTee-PortTwist_PDP_001.jpg"), ts("Q426_TheOrganicCottonShopTee-PortTwist_PDP_002.jpg")],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Port Twist", hex: "#7E4A41" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Stone", hex: "#C4B89A" },
    ],
    description:
      "Heavyweight organic cotton in a slightly boxy, everyday cut. Reinforced crew neck and a longer back hem. The tee you reach for daily.",
    inStock: true,
    rating: 4.7,
    reviewCount: 143,
  },
  {
    id: "valley-linen-overshirt-stone",
    name: "Valley Wool Shirt Jacket",
    brand: "valley",
    category: "Men",
    categoryGroup: "shirts",
    price: 16500,
    image: ts("Q426_The_Maritime_Shirt_Jacket_in_Heather_Olive_Wool_PDP_001.jpg"),
    images: [ts("Q426_The_Maritime_Shirt_Jacket_in_Heather_Olive_Wool_PDP_001.jpg"), ts("Q426_The_Maritime_Shirt_Jacket_in_Heather_Olive_Wool_PDP_002.jpg")],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Heather Olive", hex: "#6B6A4E" },
      { name: "Navy", hex: "#2A3348" },
    ],
    description:
      "Wool-blend shirt jacket with two chest patch pockets and a clean button front. Wear it open over a tee or buttoned as a standalone layer.",
    inStock: true,
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: "valley-relaxed-linen-shorts-brown",
    name: "Valley Hemp Camp Short",
    brand: "valley",
    category: "Men",
    categoryGroup: "shorts",
    price: 7200,
    image: ts("apres-short-in-coal-hemp-2605_001.jpg"),
    images: [ts("apres-short-in-coal-hemp-2605_001.jpg"), ts("Q226_the-apres-short-in-coal-hemp_pdp_02_6a3f356a-9843-4992-bde6-f252c3f3e649.jpg")],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Coal", hex: "#3A3A3A" },
      { name: "Natural", hex: "#D8CFBE" },
    ],
    description:
      "Breathable hemp camp short with an elastic drawstring waist and a relaxed above-the-knee length. Easy-going for warm days.",
    inStock: true,
    rating: 4.4,
    reviewCount: 62,
  },
  {
    id: "valley-plaid-linen-shorts",
    name: "Valley Terry Sweat Short",
    brand: "valley",
    category: "Men",
    categoryGroup: "shorts",
    price: 6800,
    image: ts("sunset-short-in-heather-oat-terry-2606_001.jpg"),
    images: [ts("sunset-short-in-heather-oat-terry-2606_001.jpg"), ts("instock_m_q226_sunset-short_portrait_002.jpg")],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Heather Oat", hex: "#CFC6B2" },
    ],
    description:
      "Soft French-terry sweat short in a heathered oat. Elastic waistband and side pockets — the off-duty short you'll live in.",
    inStock: true,
    rating: 4.3,
    reviewCount: 38,
  },

  // ─────────────────────────────────────────────────────────────
  // NORTH LANE — Modern minimalism (Men)
  // ─────────────────────────────────────────────────────────────
  {
    id: "north-lane-slim-chinos-black",
    name: "North Lane Moleskin Trouser",
    brand: "north-lane",
    category: "Men",
    categoryGroup: "trousers",
    price: 15500,
    image: ts("Q426_The_Carnegie_Pant_in_Faded_Black_Washed_Moleskin_PDP_001.jpg"),
    images: [ts("Q426_The_Carnegie_Pant_in_Faded_Black_Washed_Moleskin_PDP_001.jpg"), ts("Q426_The_Carnegie_Pant_in_Faded_Black_Washed_Moleskin_PDP_002.jpg")],
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Faded Black", hex: "#2E2E2E" },
      { name: "Olive", hex: "#5C5A42" },
    ],
    description:
      "Tapered trouser in a brushed washed moleskin. Clean flat front, zip fly, and a refined leg — the foundation of a modern wardrobe.",
    inStock: true,
    rating: 4.8,
    reviewCount: 211,
  },
  {
    id: "north-lane-slim-chino-navy",
    name: "North Lane Sashiko Trouser",
    brand: "north-lane",
    category: "Men",
    categoryGroup: "trousers",
    price: 16500,
    image: ts("Q326_Studio_Camden_Pant_in_Rinsed_Indigo_Sashiko_PDP_01.jpg"),
    images: [ts("Q326_Studio_Camden_Pant_in_Rinsed_Indigo_Sashiko_PDP_01.jpg"), ts("Q326_Studio_Camden_Pant_in_Washed_Indigo_Roped_Denim_PDP_02.jpg")],
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Rinsed Indigo", hex: "#27384F" },
    ],
    description:
      "Relaxed indigo trouser in a textured sashiko weave. Side pockets, a clean waistband, and a tapered leg that pairs with anything.",
    inStock: true,
    rating: 4.7,
    reviewCount: 176,
  },
  {
    id: "north-lane-linen-shorts-stone",
    name: "North Lane Herringbone Trouser",
    brand: "north-lane",
    category: "Men",
    categoryGroup: "trousers",
    price: 14800,
    image: ts("emlen-pant-in-khaki-herringbone-2608_001.jpg"),
    images: [ts("emlen-pant-in-khaki-herringbone-2608_001.jpg"), ts("Q326_the-emlen-pant-khaki-herringbone_pdp_compressed_02.jpg")],
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Khaki", hex: "#9A8E6E" },
      { name: "Olive", hex: "#5C5A42" },
    ],
    description:
      "Everyday trouser in a soft khaki herringbone. Mid rise, belt loops, and a tailored-but-easy leg. Smart enough for the office, relaxed enough for the weekend.",
    inStock: true,
    rating: 4.5,
    reviewCount: 94,
  },
  {
    id: "north-lane-linen-overshirt-navy",
    name: "North Lane Hemp Overshirt",
    brand: "north-lane",
    category: "Men",
    categoryGroup: "shirts",
    price: 13500,
    image: ts("Q426_TheReddingShirt-BoulderMarlHemp_PDP_001.jpg"),
    images: [ts("Q426_TheReddingShirt-BoulderMarlHemp_PDP_001.jpg"), ts("Q426_TheReddingShirt-BoulderMarlHemp_PDP_002.jpg")],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Boulder Marl", hex: "#8C8C84" },
    ],
    description:
      "Hemp-blend overshirt with a structured collar and a button-through front. A refined take on the overshirt — relaxed but intentional.",
    inStock: true,
    rating: 4.7,
    reviewCount: 118,
  },
  {
    id: "north-lane-boxy-shirt-black",
    name: "North Lane Plaid Oxford Shirt",
    brand: "north-lane",
    category: "Men",
    categoryGroup: "shirts",
    price: 12800,
    image: ts("Q426_The_Jack_in_Crescent_Plaid_Oxford_PDP_001.jpg"),
    images: [ts("Q426_The_Jack_in_Crescent_Plaid_Oxford_PDP_001.jpg"), ts("Q426_The_Jack_in_Crescent_Plaid_Oxford_PDP_002.jpg")],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Crescent Plaid", hex: "#6B7280" },
    ],
    description:
      "Organic cotton oxford in a muted crescent plaid. A slightly boxy fit with a soft collar — the texture adds depth to the simplest outfits.",
    inStock: true,
    rating: 4.5,
    reviewCount: 67,
  },

  // ─────────────────────────────────────────────────────────────
  // HALCYON — Sun-soaked styles (Women's swimwear & beach)
  // ─────────────────────────────────────────────────────────────
  {
    id: "halcyon-sarong-wrap-skirt-green",
    name: "Halcyon Cotton Sarong — Blue Lei",
    brand: "halcyon",
    category: "Swim",
    categoryGroup: "swim",
    price: 6200,
    image: fb("Frankiesbikinis-AlessiaSarong-BlueLei-Front2.jpg"),
    images: [fb("Frankiesbikinis-AlessiaSarong-BlueLei-Front2.jpg"), fb("Frankiesbikinis-AlessiaSarong-BlueLei-Front6.jpg")],
    sizes: ["One Size"],
    colors: [
      { name: "Blue Lei", hex: "#5E86A8" },
    ],
    description:
      "Lightweight cotton sarong in a blue floral print. Ties at the waist or hip — the throw-on-and-go layer for pool-to-bar.",
    inStock: true,
    rating: 4.6,
    reviewCount: 88,
  },
  {
    id: "halcyon-palm-print-sarong",
    name: "Halcyon Cotton Sarong — Pink Fantasy",
    brand: "halcyon",
    category: "Swim",
    categoryGroup: "swim",
    price: 4800,
    image: fb("Frankiesbikinis-AlessiaSarong-PinkFantasy-Front2.jpg"),
    images: [fb("Frankiesbikinis-AlessiaSarong-PinkFantasy-Front2.jpg"), fb("Frankiesbikinis-AlessiaSarong-PinkFantasy-Detail.jpg")],
    sizes: ["One Size"],
    colors: [
      { name: "Pink Fantasy", hex: "#C85A7A" },
    ],
    description:
      "Breezy cotton sarong in a bold pink floral. Wrap it a dozen different ways — the hardest-working piece in your beach bag.",
    inStock: true,
    rating: 4.5,
    reviewCount: 54,
  },
  {
    id: "halcyon-chiffon-sarong-black",
    name: "Halcyon Cotton Sarong — Scarlet Rose",
    brand: "halcyon",
    category: "Swim",
    categoryGroup: "swim",
    price: 5500,
    image: fb("Frankiesbikinis-AlessiaSarong-ScarletRose-Front4.jpg"),
    images: [fb("Frankiesbikinis-AlessiaSarong-ScarletRose-Front4.jpg"), fb("Frankiesbikinis-AlessiaSarong-ScarletRose-Front5.jpg")],
    sizes: ["One Size"],
    colors: [
      { name: "Scarlet Rose", hex: "#9E2B2B" },
    ],
    description:
      "Cotton sarong in a deep scarlet floral. Ties effortlessly over any bikini — the perfect finishing layer.",
    inStock: true,
    rating: 4.7,
    reviewCount: 72,
  },
  {
    id: "halcyon-stripe-sarong-skirt",
    name: "Halcyon Wrap Knit Beach Skirt",
    brand: "halcyon",
    category: "Swim",
    categoryGroup: "swim",
    price: 7800,
    image: fb("Frankiesbikinis-LucaSkirt-WinterSkies-Front3.jpg"),
    images: [fb("Frankiesbikinis-LucaSkirt-WinterSkies-Front3.jpg"), fb("Frankiesbikinis-LucaSkirt-WinterSkies-Front.jpg")],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Winter Skies", hex: "#9BB0C4" },
    ],
    description:
      "Soft wrap knit mini skirt that ties at the waist. Pair with the matching set or your favourite bikini for an easy resort look.",
    inStock: true,
    rating: 4.6,
    reviewCount: 49,
  },
  {
    id: "halcyon-crinkle-bikini-bottom",
    name: "Halcyon Satin Bikini Set",
    brand: "halcyon",
    category: "Swim",
    categoryGroup: "swim",
    price: 6500,
    image: fb("Frankiesbikinis-IrelandTop-ScarletRose-Front.jpg"),
    images: [fb("Frankiesbikinis-IrelandTop-ScarletRose-Front.jpg"), fb("Frankiesbikinis-DoveBottom-ScarletRose-Back.jpg")],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Scarlet Rose", hex: "#9E2B2B" },
      { name: "Pink Fantasy", hex: "#C85A7A" },
    ],
    description:
      "Satin triangle top and classic bikini bottom in a glossy scarlet. Designed as separates for a perfect, mix-and-match fit.",
    inStock: true,
    rating: 4.5,
    reviewCount: 136,
  },
  {
    id: "halcyon-vplunge-swimsuit",
    name: "Halcyon Sunshine One-Piece",
    brand: "halcyon",
    category: "Swim",
    categoryGroup: "swim",
    price: 8900,
    image: fb("Frankiesbikinis-SunshineOnePiece-Westcoast-Front.jpg"),
    images: [fb("Frankiesbikinis-SunshineOnePiece-Westcoast-Front.jpg"), fb("Frankiesbikinis-SunshineOnePiece-Westcoast-Back.jpg")],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "West Coast", hex: "#C97B63" },
    ],
    description:
      "Scoop-neck one-piece in a sun-faded print with a flattering low back. Sleek and confident at the pool or the beach.",
    inStock: true,
    rating: 4.8,
    reviewCount: 97,
  },

  // ─────────────────────────────────────────────────────────────
  // NILO — Clean & considered (Women)
  // ─────────────────────────────────────────────────────────────
  {
    id: "nilo-asymmetric-mini-dress",
    name: "Nilo Fran Slip Dress",
    brand: "nilo",
    category: "Women",
    categoryGroup: "dresses",
    price: 16500,
    image: ab("AB-FRAN_DRESS_-_BLACK_A-08-12685-BLK26_4015.jpg"),
    images: [ab("AB-FRAN_DRESS_-_BLACK_A-08-12685-BLK26_4015.jpg"), ab("AB-FRAN_DRESS_-_BLACK_A-08-12685-BLK26_4034.jpg")],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Black", hex: "#141414" },
      { name: "Burgundy", hex: "#6E2233" },
    ],
    description:
      "Bias-cut slip in a liquid fabric with a simple cowl. Considered and quietly confident — the kind of dress that works every time.",
    inStock: true,
    rating: 4.7,
    reviewCount: 182,
  },
  {
    id: "nilo-tulle-maxi-dress",
    name: "Nilo Lace Occasion Dress",
    brand: "nilo",
    category: "Women",
    categoryGroup: "dresses",
    price: 24500,
    image: ab("AB-LEONOR_DRESS_-_BLACK_LACE_A-02-12777-BLK82_2138_copy.jpg"),
    images: [ab("AB-LEONOR_DRESS_-_BLACK_LACE_A-02-12777-BLK82_2138_copy.jpg"), ab("AB-LEONOR_DRESS_-_BLACK_LACE_A-02-12777-BLK82_2146_copy.jpg")],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Black Lace", hex: "#1A1A1A" },
    ],
    description:
      "Floor-sweeping lace dress with a slip lining and fine straps. A considered statement for the occasions that matter.",
    inStock: true,
    rating: 4.9,
    reviewCount: 58,
  },
  {
    id: "nilo-wide-leg-pants-black",
    name: "Nilo Tailored Wide-Leg Trouser",
    brand: "nilo",
    category: "Women",
    categoryGroup: "trousers",
    price: 17500,
    image: ab("AB-AMAL_TROUSER_-_BLACK_A-03-12597-BLK26_2468.jpg"),
    images: [ab("AB-AMAL_TROUSER_-_BLACK_A-03-12597-BLK26_2468.jpg"), ab("AB-AMAL_TROUSER_-_BLACK_A-03-12597-BLK26_2476.jpg")],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#141414" },
    ],
    description:
      "Tailored wide-leg trouser with a high rise and a fluid drape. Clean lines, precise waistband — the power trouser done right.",
    inStock: true,
    rating: 4.8,
    reviewCount: 247,
  },
  {
    id: "nilo-wide-leg-pants-camel",
    name: "Nilo Pinstripe Wide-Leg Trouser",
    brand: "nilo",
    category: "Women",
    categoryGroup: "trousers",
    price: 16500,
    image: ab("AB-THOMAS_TROUSER_-_BLACK_AND_WHITE_PINSTRIPE_A-03-12454-STR23_3975.jpg"),
    images: [ab("AB-THOMAS_TROUSER_-_BLACK_AND_WHITE_PINSTRIPE_A-03-12454-STR23_3975.jpg"), ab("AB-THOMAS_TROUSER_-_BLACK_AND_WHITE_PINSTRIPE_A-03-12454-STR23_3966.jpg")],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Pinstripe", hex: "#2A2A2A" },
      { name: "Black", hex: "#141414" },
    ],
    description:
      "Elevated wide-leg trouser in a fine pinstripe. Pleat front, relaxed leg — pair with a fitted knit for an effortless look.",
    inStock: true,
    rating: 4.7,
    reviewCount: 134,
  },
  {
    id: "nilo-relaxed-pants-taupe",
    name: "Nilo Relaxed Trouser",
    brand: "nilo",
    category: "Women",
    categoryGroup: "trousers",
    price: 15500,
    image: ab("AB-LOU_TROUSER_-_DARK_GREY_A-03-12877-GRY40_1201.jpg"),
    images: [ab("AB-LOU_TROUSER_-_DARK_GREY_A-03-12877-GRY40_1201.jpg"), ab("AB-LOU_TROUSER_-_DARK_GREY_A-03-12877-GRY40_1232.jpg")],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Dark Grey", hex: "#4A4A4A" },
      { name: "Black", hex: "#141414" },
    ],
    description:
      "The softer, more laid-back sibling to a tailored trouser — relaxed through the leg, still polished, just easier.",
    inStock: true,
    rating: 4.6,
    reviewCount: 109,
  },
  {
    id: "nilo-halterneck-coord",
    name: "Nilo Knit Co-ord Top",
    brand: "nilo",
    category: "Women",
    categoryGroup: "knitwear",
    price: 12500,
    image: ab("AB-BLANCA_TOP_-_BLACK_A-07-12468-BLK26_2493.jpg"),
    images: [ab("AB-BLANCA_TOP_-_BLACK_A-07-12468-BLK26_2493.jpg"), ab("AB-BLANCA_TOP_-_BLACK_A-07-12468-BLK26_2512.jpg")],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Black", hex: "#141414" },
    ],
    description:
      "Fine-gauge knit top designed to co-ordinate. Wear it with the matching trouser for a full look, or split it across outfits.",
    inStock: true,
    rating: 4.8,
    reviewCount: 78,
  },

  // ─────────────────────────────────────────────────────────────
  // EMBER — Bold statement pieces (Women & Men)
  // ─────────────────────────────────────────────────────────────
  {
    id: "ember-sequin-crop-top",
    name: "Ember Leather Statement Top",
    brand: "ember",
    category: "Women",
    categoryGroup: "tops",
    price: 15500,
    image: ab("AB-ZEINA_TOP_-_BLACK_RECYCLED_LEATHER_A-07-12471-BLK81_1705_copy.jpg"),
    images: [ab("AB-ZEINA_TOP_-_BLACK_RECYCLED_LEATHER_A-07-12471-BLK81_1705_copy.jpg"), ab("AB-ZEINA_TOP_-_BLACK_RECYCLED_LEATHER_A-07-12471-BLK81_1714_copy.jpg")],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Black", hex: "#161616" },
    ],
    description:
      "Structured recycled-leather top with a sculpted neckline. Maximum impact — worn over high-waist trousers or a mini skirt.",
    inStock: true,
    rating: 4.8,
    reviewCount: 166,
  },
  {
    id: "ember-ruched-blouse",
    name: "Ember Draped Top",
    brand: "ember",
    category: "Women",
    categoryGroup: "tops",
    price: 9500,
    image: ab("AB-JAMILA_TOP_-_BLACK_A-08-12796-BLK26_1677.jpg"),
    images: [ab("AB-JAMILA_TOP_-_BLACK_A-08-12796-BLK26_1677.jpg"), ab("AB-JAMILA_TOP_-_BLACK_A-08-12796-BLK26_1688.jpg")],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Black", hex: "#161616" },
    ],
    description:
      "Draped top with a gathered neckline and a fluid fall. Square shoulders, clean lines — made to be noticed.",
    inStock: true,
    rating: 4.5,
    reviewCount: 94,
  },
  {
    id: "ember-wide-leg-pants-gray",
    name: "Ember Tailored Trouser",
    brand: "ember",
    category: "Women",
    categoryGroup: "trousers",
    price: 13500,
    image: ab("AB-MAHA_PANT_-_BLACK_A-03-12457-BLK26_4302.jpg"),
    images: [ab("AB-MAHA_PANT_-_BLACK_A-03-12457-BLK26_4302.jpg"), ab("AB-MAHA_PANT_-_BLACK_A-03-12457-BLK26_4262.jpg")],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#161616" },
    ],
    description:
      "Sharp tailored trouser with a pressed crease and a straight leg. Confident and versatile — ground them with a heel or a trainer.",
    inStock: true,
    rating: 4.7,
    reviewCount: 128,
  },
  {
    id: "ember-wide-leg-pants-chocolate",
    name: "Ember Burgundy Wide-Leg Trouser",
    brand: "ember",
    category: "Women",
    categoryGroup: "trousers",
    price: 14500,
    image: ab("AB-PAOLA_TROUSER_-_BURGUNDY_A-03-12834-BGN27_2014_copy_2.jpg"),
    images: [ab("AB-PAOLA_TROUSER_-_BURGUNDY_A-03-12834-BGN27_2014_copy_2.jpg"), ab("AB-PAOLA_TROUSER_-_BURGUNDY_A-03-12834-BGN27_2041_copy.jpg")],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Burgundy", hex: "#6E2233" },
      { name: "Black", hex: "#161616" },
    ],
    description:
      "Fluid wide-leg trouser in a rich burgundy. The drape catches light beautifully — a statement even in movement.",
    inStock: true,
    rating: 4.9,
    reviewCount: 73,
  },
  {
    id: "ember-polo-navy",
    name: "Ember Indigo Knit Polo",
    brand: "ember",
    category: "Men",
    categoryGroup: "knitwear",
    price: 9500,
    image: ts("long-sleeve-polo-in-indigo-knit-stripe-2507_001.jpg"),
    images: [ts("long-sleeve-polo-in-indigo-knit-stripe-2507_001.jpg"), ts("instock_m_q325_long_sleeve_polo_indigo_stripe_portrait_002.jpg")],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Indigo", hex: "#27384F" },
      { name: "Ecru", hex: "#EDE8DC" },
    ],
    description:
      "Long-sleeve knit polo in an indigo stripe with a classic two-button placket. Textured, breathable, and a step above the basic polo.",
    inStock: true,
    rating: 4.6,
    reviewCount: 87,
  },
  {
    id: "ember-linen-shorts-tan",
    name: "Ember Block Print Camp Short",
    brand: "ember",
    category: "Men",
    categoryGroup: "shorts",
    price: 6500,
    image: ts("apres-short-in-fennel-block-print-2606_001.jpg"),
    images: [ts("apres-short-in-fennel-block-print-2606_001.jpg"), ts("instock_m_q226_apres-short-fennel-block_portrait_002.jpg")],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Fennel", hex: "#C9A24B" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    description:
      "Camp short in a hand-feel hemp blend with an all-over block print. Relaxed and confident — pair with an oversized shirt for an easy summer look.",
    inStock: true,
    rating: 4.4,
    reviewCount: 55,
  },
  {
    id: "ember-linen-shorts-navy",
    name: "Ember Block Print Short",
    brand: "ember",
    category: "Men",
    categoryGroup: "shorts",
    price: 8200,
    image: ts("apres-short-in-sangria-block-print-2606_001.jpg"),
    images: [ts("apres-short-in-sangria-block-print-2606_001.jpg"), ts("instock_m_q226_apres-short-in-sangria-block_portrait_002.jpg")],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Sangria", hex: "#8A2B3A" },
      { name: "Stone", hex: "#C4B89A" },
    ],
    description:
      "Elevated camp short in a bold sangria block print. Mid rise, elastic waist, and a clean finish — the kind of short that looks intentional.",
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
  shirts: "Shirts",
  tees: "Tees",
  knitwear: "Knitwear",
  tops: "Tops",
  trousers: "Trousers",
  shorts: "Shorts",
  dresses: "Dresses",
  swim: "Swim",
};

/** Display order for garment types (shop chips, brand page, category accordion). */
export const GARMENT_ORDER = [
  "shirts",
  "tees",
  "knitwear",
  "tops",
  "trousers",
  "shorts",
  "dresses",
  "swim",
];

export function categoryLabel(key: string): string {
  return CATEGORY_LABELS[key] ?? key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Order categoryGroup keys deterministically: new-in first, then GARMENT_ORDER, then alphabetical. */
export function orderedCategoryGroups(keys: string[]): string[] {
  const unique = Array.from(new Set(keys));
  const rank = (k: string) => {
    const i = GARMENT_ORDER.indexOf(k);
    return i === -1 ? GARMENT_ORDER.length : i;
  };
  return unique.sort((a, b) => {
    if (a === "new-in") return -1;
    if (b === "new-in") return 1;
    return rank(a) - rank(b) || categoryLabel(a).localeCompare(categoryLabel(b));
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
