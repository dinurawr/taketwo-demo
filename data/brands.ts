export type Brand = {
  id: string;
  name: string;
  tagline: string;
  color: string;
  textColor: string;
  logo: string; // initials fallback
};

export const brands: Brand[] = [
  {
    id: "valley",
    name: "Valley",
    tagline: "Effortless everyday",
    color: "#C97B63",
    textColor: "#fff",
    logo: "VL",
  },
  {
    id: "north-lane",
    name: "North Lane",
    tagline: "Modern minimalism",
    color: "#2D2D2D",
    textColor: "#fff",
    logo: "NL",
  },
  {
    id: "halcyon",
    name: "Halcyon",
    tagline: "Sun-soaked styles",
    color: "#D4A853",
    textColor: "#fff",
    logo: "HC",
  },
  {
    id: "nilo",
    name: "Nilo",
    tagline: "Clean & considered",
    color: "#6B8F71",
    textColor: "#fff",
    logo: "NI",
  },
  {
    id: "ember",
    name: "Ember",
    tagline: "Bold statement pieces",
    color: "#8B3A3A",
    textColor: "#fff",
    logo: "EM",
  },
];

export function getBrand(id: string) {
  return brands.find((b) => b.id === id);
}
