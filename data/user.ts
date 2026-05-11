export const mockUser = {
  id: "u1",
  name: "Amaya Perera",
  email: "amaya@email.com",
  avatar: "AP",
  height: "5'4\"",
  weight: 52,
  rewardsPoints: 240,
  rewardsTier: "Silver" as const,
  memberSince: "2026-01-15",
  favoriteIds: ["valley-cream-overshirt", "halcyon-sundress", "nilo-trench-coat"],
};

export const rewardsTiers = [
  { name: "Bronze", minPoints: 0, maxPoints: 149, color: "#CD7F32", perks: ["Early access to sales"] },
  { name: "Silver", minPoints: 150, maxPoints: 499, color: "#C0C0C0", perks: ["Early access to sales", "5% discount code monthly"] },
  { name: "Gold", minPoints: 500, maxPoints: 999, color: "#D4A853", perks: ["Early access to sales", "10% discount code monthly", "Free returns"] },
  { name: "Platinum", minPoints: 1000, maxPoints: Infinity, color: "#888EAA", perks: ["Early access to sales", "15% discount code monthly", "Free returns", "Priority support"] },
];
