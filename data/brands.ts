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
    heroImage: "/products/pexels-cottonbro-6626418.jpg",
    lookbook: [
      "/products/pexels-cottonbro-6616673.jpg",
      "/products/pexels-prayoon-sajeev-1486107-2897529.jpg",
      "/products/pexels-ron-lach-9464625.jpg",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
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
    heroImage: "/products/pexels-prayoon-sajeev-1486107-2897529.jpg",
    lookbook: [
      "/products/pexels-ron-lach-9464625.jpg",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
      "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80",
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80",
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
    heroImage: "/products/pexels-tima-miroshnichenko-7202792.jpg",
    lookbook: [
      "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80",
      "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    lookbook: [
      "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&q=80",
      "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600&q=80",
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80",
      "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&q=80",
    lookbook: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
      "/products/pexels-cottonbro-6626418.jpg",
      "/products/pexels-prayoon-sajeev-1486107-2897529.jpg",
      "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80",
    ],
    followerCount: 734,
  },
];

export function getBrand(id: string) {
  return brands.find((b) => b.id === id);
}
