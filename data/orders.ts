export type OrderStatus =
  | "new"
  | "shipping"
  | "returning"
  | "pending_verdict"
  | "completed"
  | "cancelled";

export type OrderItem = {
  productId: string;
  productName: string;
  brand: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
};

export type Order = {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  placedAt: string;
  updatedAt: string;
  trackingNumber?: string;
  returnReason?: string;
};

export const orders: Order[] = [
  // ─── New Orders ────────────────────────────────────────
  {
    id: "ORD-2024-001",
    customerId: "u1",
    customerName: "Amaya Perera",
    customerEmail: "amaya@email.com",
    customerAddress: "45 Galle Road, Colombo 03",
    items: [
      {
        productId: "valley-summer-shirt",
        productName: "Valley Summer Shirt",
        brand: "valley",
        size: "M",
        color: "Coral",
        price: 14545,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&q=80",
      },
    ],
    total: 14545,
    status: "new",
    placedAt: "2026-05-04T09:15:00Z",
    updatedAt: "2026-05-04T09:15:00Z",
  },
  {
    id: "ORD-2024-002",
    customerId: "u2",
    customerName: "Kavindu Silva",
    customerEmail: "kavindu@email.com",
    customerAddress: "12 Duplication Road, Colombo 04",
    items: [
      {
        productId: "northlane-black-shirt",
        productName: "North Lane Black Shirt",
        brand: "north-lane",
        size: "L",
        color: "Black",
        price: 12595,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=200&q=80",
      },
      {
        productId: "northlane-cargo-pants",
        productName: "North Lane Cargo Pants",
        brand: "north-lane",
        size: "L",
        color: "Olive",
        price: 21500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&q=80",
      },
    ],
    total: 34095,
    status: "new",
    placedAt: "2026-05-04T11:30:00Z",
    updatedAt: "2026-05-04T11:30:00Z",
  },
  {
    id: "ORD-2024-003",
    customerId: "u3",
    customerName: "Thilini Jayawardena",
    customerEmail: "thilini@email.com",
    customerAddress: "8 Barnes Place, Colombo 07",
    items: [
      {
        productId: "halcyon-sundress",
        productName: "Halcyon Sundress",
        brand: "halcyon",
        size: "S",
        color: "Marigold",
        price: 16800,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&q=80",
      },
    ],
    total: 16800,
    status: "new",
    placedAt: "2026-05-05T07:45:00Z",
    updatedAt: "2026-05-05T07:45:00Z",
  },
  // ─── Currently Shipping ────────────────────────────────
  {
    id: "ORD-2024-004",
    customerId: "u4",
    customerName: "Ruwani Fernando",
    customerEmail: "ruwani@email.com",
    customerAddress: "22 Reid Avenue, Colombo 07",
    items: [
      {
        productId: "nilo-ribbed-tee",
        productName: "Nilo Ribbed Tee",
        brand: "nilo",
        size: "M",
        color: "White",
        price: 6500,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=200&q=80",
      },
    ],
    total: 13000,
    status: "shipping",
    placedAt: "2026-05-02T14:00:00Z",
    updatedAt: "2026-05-03T09:00:00Z",
    trackingNumber: "SL-TRK-8821",
  },
  {
    id: "ORD-2024-005",
    customerId: "u5",
    customerName: "Dasun Rathnayake",
    customerEmail: "dasun@email.com",
    customerAddress: "67 Flower Road, Colombo 07",
    items: [
      {
        productId: "ember-red-jacket",
        productName: "Ember Statement Jacket",
        brand: "ember",
        size: "L",
        color: "Red",
        price: 42000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=200&q=80",
      },
    ],
    total: 42000,
    status: "shipping",
    placedAt: "2026-05-01T10:20:00Z",
    updatedAt: "2026-05-02T08:00:00Z",
    trackingNumber: "SL-TRK-8745",
  },
  {
    id: "ORD-2024-006",
    customerId: "u6",
    customerName: "Malsha Bandara",
    customerEmail: "malsha@email.com",
    customerAddress: "3 Maitland Crescent, Colombo 07",
    items: [
      {
        productId: "halcyon-linen-set",
        productName: "Halcyon Linen Co-ord Set",
        brand: "halcyon",
        size: "S",
        color: "Cream",
        price: 24500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&q=80",
      },
    ],
    total: 24500,
    status: "shipping",
    placedAt: "2026-05-02T16:00:00Z",
    updatedAt: "2026-05-03T11:30:00Z",
    trackingNumber: "SL-TRK-8901",
  },
  // ─── Currently Returning ───────────────────────────────
  {
    id: "ORD-2024-007",
    customerId: "u7",
    customerName: "Isuri Wickramasinghe",
    customerEmail: "isuri@email.com",
    customerAddress: "19 Thurstan Road, Colombo 03",
    items: [
      {
        productId: "nilo-wide-leg-jeans",
        productName: "Nilo Wide Leg Jeans",
        brand: "nilo",
        size: "28",
        color: "Light Wash",
        price: 19500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&q=80",
      },
    ],
    total: 19500,
    status: "returning",
    placedAt: "2026-04-28T10:00:00Z",
    updatedAt: "2026-05-03T14:00:00Z",
    returnReason: "Sizing - runs small",
  },
  {
    id: "ORD-2024-008",
    customerId: "u8",
    customerName: "Pasan Gunawardena",
    customerEmail: "pasan@email.com",
    customerAddress: "55 Union Place, Colombo 02",
    items: [
      {
        productId: "valley-knit-polo",
        productName: "Valley Knit Polo",
        brand: "valley",
        size: "S",
        color: "Ivory",
        price: 11800,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1625910513060-af33b73a4cd3?w=200&q=80",
      },
    ],
    total: 11800,
    status: "returning",
    placedAt: "2026-04-27T09:30:00Z",
    updatedAt: "2026-05-02T16:00:00Z",
    returnReason: "Color different from photos",
  },
  // ─── Pending Verdict ───────────────────────────────────
  {
    id: "ORD-2024-009",
    customerId: "u9",
    customerName: "Dilini Koswatta",
    customerEmail: "dilini@email.com",
    customerAddress: "11 Jawatte Road, Colombo 05",
    items: [
      {
        productId: "northlane-beige-blazer",
        productName: "North Lane Beige Blazer",
        brand: "north-lane",
        size: "M",
        color: "Beige",
        price: 35000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      },
    ],
    total: 35000,
    status: "pending_verdict",
    placedAt: "2026-04-22T13:00:00Z",
    updatedAt: "2026-05-01T10:00:00Z",
    returnReason: "Defect — loose stitching on lapel",
  },
  {
    id: "ORD-2024-010",
    customerId: "u10",
    customerName: "Senura Jayasena",
    customerEmail: "senura@email.com",
    customerAddress: "33 Kynsey Road, Colombo 08",
    items: [
      {
        productId: "halcyon-wrap-top",
        productName: "Halcyon Wrap Top",
        brand: "halcyon",
        size: "M",
        color: "Rust",
        price: 9800,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=200&q=80",
      },
    ],
    total: 9800,
    status: "pending_verdict",
    placedAt: "2026-04-20T08:00:00Z",
    updatedAt: "2026-04-29T09:00:00Z",
    returnReason: "Customer claims item not as described",
  },
  // ─── Completed (for order history) ────────────────────
  {
    id: "ORD-2024-011",
    customerId: "u1",
    customerName: "Amaya Perera",
    customerEmail: "amaya@email.com",
    customerAddress: "45 Galle Road, Colombo 03",
    items: [
      {
        productId: "nilo-trench-coat",
        productName: "Nilo Trench Coat",
        brand: "nilo",
        size: "XS",
        color: "Camel",
        price: 48000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&q=80",
      },
    ],
    total: 48000,
    status: "completed",
    placedAt: "2026-04-10T12:00:00Z",
    updatedAt: "2026-04-15T14:00:00Z",
    trackingNumber: "SL-TRK-7711",
  },
  {
    id: "ORD-2024-012",
    customerId: "u1",
    customerName: "Amaya Perera",
    customerEmail: "amaya@email.com",
    customerAddress: "45 Galle Road, Colombo 03",
    items: [
      {
        productId: "halcyon-sundress",
        productName: "Halcyon Sundress",
        brand: "halcyon",
        size: "S",
        color: "Blush",
        price: 16800,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&q=80",
      },
    ],
    total: 16800,
    status: "completed",
    placedAt: "2026-03-28T10:00:00Z",
    updatedAt: "2026-04-01T11:00:00Z",
    trackingNumber: "SL-TRK-7234",
  },
];

export function getOrdersByStatus(status: OrderStatus) {
  return orders.filter((o) => o.status === status);
}

export function getOrder(id: string) {
  return orders.find((o) => o.id === id);
}

export function getCustomerOrders(customerId: string) {
  return orders.filter((o) => o.customerId === customerId);
}
