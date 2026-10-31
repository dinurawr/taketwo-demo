export type Brand = {
  id: string;
  name: string;
  tagline: string;
  color: string;
  textColor: string;
  logo: string; // initials fallback
  logoFile: string; // SVG logo path in /public/brands/
  heroImage: string;    // storefront hero (full-bleed at top of brand page)
  lookbook: string[];   // 4 lifestyle photos for the lookbook strip
  followerCount: number;
};

// Real brand photography (Shopify CDNs — same sources as data/products.ts).
//   ts → Taylor Stitch · ab → Anine Bing · fb → Frankies Bikinis · fr → FARM Rio
const ts = (f: string) => `https://cdn.shopify.com/s/files/1/0070/1922/files/${f}`;
const ab = (f: string) => `https://cdn.shopify.com/s/files/1/0150/1528/files/${f}`;
const fb = (f: string) => `https://cdn.shopify.com/s/files/1/0158/2548/files/${f}`;
const fr = (f: string) => `https://cdn.shopify.com/s/files/1/0077/6673/6963/files/${f}`;

export const brands: Brand[] = [
  {
    id: "valley",
    name: "Valley",
    tagline: "Effortless everyday",
    color: "#C97B63",
    textColor: "#fff",
    logo: "VL",
    logoFile: "/brands/valley.svg",
    heroImage: ts("instock_m_q326_regenerative-cotton-tee-faded-pine_portrait_002.jpg"),
    lookbook: [
      ts("Q426_TheOrganicCottonShopTee-PortTwist_PDP_002.jpg"),
      ts("Q426_The_Maritime_Shirt_Jacket_in_Heather_Olive_Wool_PDP_002.jpg"),
      ts("Q226_the-apres-short-in-coal-hemp_pdp_02_6a3f356a-9843-4992-bde6-f252c3f3e649.jpg"),
      ts("instock_m_q226_sunset-short_portrait_002.jpg"),
    ],
    followerCount: 1247,
  },
  {
    id: "north-lane",
    name: "North Lane",
    tagline: "Modern minimalism",
    color: "#2D2D2D",
    textColor: "#fff",
    logo: "NL",
    logoFile: "/brands/north-lane.svg",
    heroImage: ts("Q426_The_Jack_in_Soil_Oxford_PDP_002.jpg"),
    lookbook: [
      ts("Q426_The_Carnegie_Pant_in_Faded_Black_Washed_Moleskin_PDP_002.jpg"),
      ts("Q326_Studio_Camden_Pant_in_Washed_Indigo_Roped_Denim_PDP_02.jpg"),
      ts("Q426_TheReddingShirt-BoulderMarlHemp_PDP_002.jpg"),
      ts("Q426_The_Jack_in_Crescent_Plaid_Oxford_PDP_002.jpg"),
    ],
    followerCount: 876,
  },
  {
    id: "halcyon",
    name: "Halcyon",
    tagline: "Sun-soaked styles",
    color: "#D4A853",
    textColor: "#fff",
    logo: "HC",
    logoFile: "/brands/halcyon.svg",
    heroImage: fb("Frankiesbikinis-AlessiaSarong-BlueLei-Front6.jpg"),
    lookbook: [
      fb("Frankiesbikinis-AlessiaSarong-ScarletRose-Front5.jpg"),
      fb("Frankiesbikinis-LucaSkirt-WinterSkies-Front.jpg"),
      fb("Frankiesbikinis-SunshineOnePiece-Westcoast-Back.jpg"),
      fb("Frankiesbikinis-AlessiaSarong-PinkFantasy-Front2.jpg"),
    ],
    followerCount: 2103,
  },
  {
    id: "nilo",
    name: "Nilo",
    tagline: "Clean & considered",
    color: "#6B8F71",
    textColor: "#fff",
    logo: "NI",
    logoFile: "/brands/nilo.svg",
    heroImage: ab("AB-FRAN_DRESS_-_BLACK_A-08-12685-BLK26_4034.jpg"),
    lookbook: [
      ab("AB-BLANCAMIDIDRESS-BLACK_A-02-12474-BLK26_0238.jpg"),
      ab("AB-LEONOR_DRESS_-_BLACK_LACE_A-02-12777-BLK82_2146_copy.jpg"),
      ab("AB-AMAL_TROUSER_-_BLACK_A-03-12597-BLK26_2476.jpg"),
      ab("AB-LOU_TROUSER_-_DARK_GREY_A-03-12877-GRY40_1232.jpg"),
    ],
    followerCount: 1589,
  },
  {
    id: "ember",
    name: "Ember",
    tagline: "Bold statement pieces",
    color: "#8B3A3A",
    textColor: "#fff",
    logo: "EM",
    logoFile: "/brands/ember.svg",
    heroImage: ab("AB-ZEINA_TOP_-_BLACK_RECYCLED_LEATHER_A-07-12471-BLK81_1714_copy.jpg"),
    lookbook: [
      ab("AB-JAMILA_TOP_-_BLACK_A-08-12796-BLK26_1688.jpg"),
      ab("AB-MAHA_PANT_-_BLACK_A-03-12457-BLK26_4262.jpg"),
      ab("AB-PAOLA_TROUSER_-_BURGUNDY_A-03-12834-BGN27_2041_copy.jpg"),
      fr("344142_01.jpg"),
    ],
    followerCount: 734,
  },
];

export function getBrand(id: string) {
  return brands.find((b) => b.id === id);
}
