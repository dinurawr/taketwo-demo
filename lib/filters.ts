import type { Product } from "@/data/products";

export type Filters = {
  categories: string[];             // categoryGroup values: "tops", "dresses", etc.
  sizes: string[];                  // "S", "M", "L", etc.
  colors: string[];                 // hex values
  priceRange: [number, number] | null; // null = no constraint
};

export const EMPTY_FILTERS: Filters = {
  categories: [],
  sizes: [],
  colors: [],
  priceRange: null,
};

export type FilterOption = {
  value: string;
  label: string;
  count: number;
  hex?: string; // colour options only
};

export type DerivedFilterOptions = {
  categories: FilterOption[];
  sizes: FilterOption[];
  colors: FilterOption[];
  priceMin: number;
  priceMax: number;
};

const SIZE_ORDER = [
  "XS", "S", "M", "L", "XL", "XXL",
  "24", "26", "28", "30", "32", "34", "36",
  "2Y", "4Y", "6Y", "8Y", "10Y",
  "One Size", "S/M", "L/XL",
];

function toLabel(key: string): string {
  return key
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function deriveFilterOptions(productList: Product[]): DerivedFilterOptions {
  const catMap = new Map<string, number>();
  const sizeMap = new Map<string, number>();
  const colorMap = new Map<string, { name: string; hex: string; count: number }>();
  let priceMin = Infinity;
  let priceMax = -Infinity;

  for (const p of productList) {
    catMap.set(p.categoryGroup, (catMap.get(p.categoryGroup) ?? 0) + 1);

    for (const s of p.sizes) {
      sizeMap.set(s, (sizeMap.get(s) ?? 0) + 1);
    }

    for (const c of p.colors) {
      const existing = colorMap.get(c.hex);
      if (existing) {
        existing.count++;
      } else {
        colorMap.set(c.hex, { name: c.name, hex: c.hex, count: 1 });
      }
    }

    if (p.price < priceMin) priceMin = p.price;
    if (p.price > priceMax) priceMax = p.price;
  }

  const categories = [...catMap.entries()]
    .map(([key, count]) => ({ value: key, label: toLabel(key), count }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const sizes = [...sizeMap.entries()]
    .map(([value, count]) => ({ value, label: value, count }))
    .sort((a, b) => {
      const ai = SIZE_ORDER.indexOf(a.value);
      const bi = SIZE_ORDER.indexOf(b.value);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });

  const colors = [...colorMap.values()]
    .map((c) => ({ value: c.hex, label: c.name, count: c.count, hex: c.hex }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return {
    categories,
    sizes,
    colors,
    priceMin: priceMin === Infinity ? 0 : priceMin,
    priceMax: priceMax === -Infinity ? 100000 : priceMax,
  };
}

export function applyFilters(productList: Product[], filters: Filters): Product[] {
  return productList.filter((p) => {
    if (filters.categories.length > 0 && !filters.categories.includes(p.categoryGroup)) {
      return false;
    }
    if (filters.sizes.length > 0 && !p.sizes.some((s) => filters.sizes.includes(s))) {
      return false;
    }
    if (filters.colors.length > 0 && !p.colors.some((c) => filters.colors.includes(c.hex))) {
      return false;
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (p.price < min || p.price > max) return false;
    }
    return true;
  });
}

export function hasActiveFilters(filters: Filters): boolean {
  return (
    filters.categories.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceRange !== null
  );
}

export function activeFilterCount(filters: Filters): number {
  let count =
    filters.categories.length + filters.sizes.length + filters.colors.length;
  if (filters.priceRange) count++;
  return count;
}
