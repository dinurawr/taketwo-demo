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

export const brands: Brand[] = [
  {
    id: "valley",
    name: "Valley",
    tagline: "Effortless everyday",
    color: "#C97B63",
    textColor: "#fff",
    logo: "VL",
    logoFile: "/brands/valley.svg",
    heroImage: "https://images.unsplash.com/photo-1656695230389-01185e6fbff8?w=800&q=80",
    lookbook: [
      "https://images.unsplash.com/photo-1550995694-3f5f4a7e1bd2?w=600&q=80",
      "https://images.unsplash.com/photo-1619603364904-c0498317e145?w=600&q=80",
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&q=80",
      "https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?w=600&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1550995694-3f5f4a7e1bd2?w=800&q=80",
    lookbook: [
      "https://images.unsplash.com/photo-1656695230389-01185e6fbff8?w=600&q=80",
      "https://images.unsplash.com/photo-1619603364904-c0498317e145?w=600&q=80",
      "https://images.unsplash.com/photo-1642764873649-5c228ce3fe74?w=600&q=80",
      "https://images.unsplash.com/photo-1623658580851-3b25bf83b4ea?w=600&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1562151270-c7d22ceb586a?w=800&q=80",
    lookbook: [
      "https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=600&q=80",
      "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=600&q=80",
      "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600&q=80",
      "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=800&q=80",
    lookbook: [
      "https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=600&q=80",
      "https://images.unsplash.com/photo-1562151270-c7d22ceb586a?w=600&q=80",
      "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600&q=80",
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=800&q=80",
    lookbook: [
      "https://images.unsplash.com/photo-1562151270-c7d22ceb586a?w=600&q=80",
      "https://images.unsplash.com/photo-1656695230389-01185e6fbff8?w=600&q=80",
      "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=600&q=80",
      "https://images.unsplash.com/photo-1619603364904-c0498317e145?w=600&q=80",
    ],
    followerCount: 734,
  },
];

export function getBrand(id: string) {
  return brands.find((b) => b.id === id);
}
