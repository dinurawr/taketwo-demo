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
        productId: "valley-cream-overshirt",
        productName: "Valley Cream Overshirt",
        brand: "valley",
        size: "M",
        color: "Cream",
        price: 14545,
        quantity: 1,
        image: "/products/pexels-cottonbro-6626418.jpg",
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

// ─── Generated Valley orders (richer dataset for vendor dashboard) ──────
const VALLEY_PRODUCT_POOL = [
  {
    id: "valley-cream-overshirt",
    name: "Valley Cream Overshirt",
    price: 14545,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Stone"],
    images: [
      "/products/pexels-cottonbro-6626418.jpg",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80",
    ],
  },
  {
    id: "valley-linen-overshirt",
    name: "Valley Linen Overshirt",
    price: 12800,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Natural", "Olive"],
    images: [
      "/products/pexels-cottonbro-6616673.jpg",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&q=80",
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400&q=80",
    ],
  },
  {
    id: "valley-beach-coverup",
    name: "Valley Beach Cover Up",
    price: 9800,
    sizes: ["S/M", "L/XL", "One Size"],
    colors: ["White", "Sand"],
    images: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80",
      "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=400&q=80",
      "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=400&q=80",
    ],
  },
];

const VALLEY_CUSTOMER_POOL = [
  { id: "vc1",  name: "Amaya Perera",          email: "amaya.p@email.com",     address: "45 Galle Road, Colombo 03" },
  { id: "vc2",  name: "Kavindu Silva",         email: "kavindu.s@email.com",   address: "12 Marine Drive, Colombo 04" },
  { id: "vc3",  name: "Dilini Fernando",       email: "dilini.f@email.com",    address: "8 Park Street, Gampaha" },
  { id: "vc4",  name: "Sachith Rajapaksa",     email: "sachith.r@email.com",   address: "23 Temple Road, Kandy" },
  { id: "vc5",  name: "Nimesha Abeysekera",    email: "nimesha.a@email.com",   address: "67 Lake Drive, Colombo 07" },
  { id: "vc6",  name: "Tharaka Mendis",        email: "tharaka.m@email.com",   address: "14 Beach Road, Negombo" },
  { id: "vc7",  name: "Poorna Jayasinghe",     email: "poorna.j@email.com",    address: "9 Reid Avenue, Colombo 05" },
  { id: "vc8",  name: "Ishara Bandara",        email: "ishara.b@email.com",    address: "31 Light House Street, Matara" },
  { id: "vc9",  name: "Rukshan Dias",          email: "rukshan.d@email.com",   address: "5 Fort Road, Galle" },
  { id: "vc10", name: "Miyuru Chandrasekara",  email: "miyuru.c@email.com",    address: "78 Horton Place, Colombo 07" },
  { id: "vc11", name: "Sanduni Karunaratne",   email: "sanduni.k@email.com",   address: "44 Flower Road, Colombo 03" },
  { id: "vc12", name: "Ravindu Wickramasinghe",email: "ravindu.w@email.com",   address: "22 Park Avenue, Nugegoda" },
  { id: "vc13", name: "Hashini Gunawardena",   email: "hashini.g@email.com",   address: "17 Stratford Lane, Mount Lavinia" },
  { id: "vc14", name: "Janaka Liyanage",       email: "janaka.l@email.com",    address: "55 Castle Street, Colombo 08" },
  { id: "vc15", name: "Methmi De Silva",       email: "methmi.d@email.com",    address: "3 Lily Avenue, Battaramulla" },
  { id: "vc16", name: "Tehan Wickramaratne",   email: "tehan.w@email.com",     address: "29 Hill Street, Kurunegala" },
  { id: "vc17", name: "Anushi Pathirana",      email: "anushi.p@email.com",    address: "11 Esplanade Road, Galle" },
  { id: "vc18", name: "Lasath Senanayake",     email: "lasath.s@email.com",    address: "62 Havelock Road, Colombo 05" },
  { id: "vc19", name: "Chamodi Ekanayake",     email: "chamodi.e@email.com",   address: "8 York Street, Colombo 01" },
  { id: "vc20", name: "Pasindu Rathnayake",    email: "pasindu.r@email.com",   address: "39 Peradeniya Road, Kandy" },
  { id: "vc21", name: "Yenuli Goonetilleke",   email: "yenuli.g@email.com",    address: "27 Buller's Road, Colombo 07" },
  { id: "vc22", name: "Ovin Kodagoda",         email: "ovin.k@email.com",      address: "14 Sea Avenue, Mount Lavinia" },
  { id: "vc23", name: "Senuri Tennakoon",      email: "senuri.t@email.com",    address: "6 Pagoda Road, Nugegoda" },
  { id: "vc24", name: "Hasitha Wijesinghe",    email: "hasitha.w@email.com",   address: "82 Bauddhaloka Mawatha, Colombo 04" },
  { id: "vc25", name: "Mihiri Samaraweera",    email: "mihiri.s@email.com",    address: "21 Old Road, Negombo" },
];

const RETURN_REASONS = ["Sizing", "Wrong color", "Quality", "Changed mind", "Not as pictured"];

function pick<T>(arr: T[], n: number): T {
  return arr[n % arr.length];
}

// Hash an index → 0..max-1 (deterministic, no Math.random)
function hash(seed: number, max: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return Math.floor(((x - Math.floor(x)) * max));
}

function generateValleyOrders(): Order[] {
  const generated: Order[] = [];
  const ORDER_COUNT = 75;
  const NOW = new Date("2026-05-12T18:00:00Z");

  for (let i = 0; i < ORDER_COUNT; i++) {
    // Customer — weight first ~10 customers more heavily (they are "repeat buyers")
    const customerIdx =
      i % 3 === 0
        ? hash(i, 10) // pick from top 10 (repeat customers)
        : hash(i + 7, VALLEY_CUSTOMER_POOL.length);
    const customer = VALLEY_CUSTOMER_POOL[customerIdx];

    // Product — properly distributed across all 3 Valley products
    const product = VALLEY_PRODUCT_POOL[hash(i + 13, VALLEY_PRODUCT_POOL.length)];
    const image   = product.images[hash(i + 23, product.images.length)];
    const size    = pick(product.sizes, hash(i + 1, product.sizes.length));
    const color   = pick(product.colors, hash(i + 2, product.colors.length));
    const qty     = i % 11 === 0 ? 2 : 1;

    // Date — distribute over 180 days, weighted toward recent
    const daysBack = Math.floor(180 * Math.pow(i / ORDER_COUNT, 1.4));
    const placedAt = new Date(NOW);
    placedAt.setUTCDate(placedAt.getUTCDate() - daysBack);
    placedAt.setUTCHours(hash(i + 5, 24), hash(i + 11, 60), 0, 0);

    // Status — distribution skewed by recency
    let status: OrderStatus;
    if (daysBack < 1)        status = i % 2 === 0 ? "new" : "shipping";
    else if (daysBack < 3)   status = i % 3 === 0 ? "new" : "shipping";
    else if (daysBack < 7)   status = i % 4 === 0 ? "shipping" : "completed";
    else if (daysBack < 14)  status = i % 11 === 0 ? "returning" : (i % 17 === 0 ? "pending_verdict" : "completed");
    else if (daysBack < 30)  status = i % 19 === 0 ? "returning" : "completed";
    else                     status = "completed";

    const total = product.price * qty;
    const order: Order = {
      id: `ORD-2026-V${String(i + 100).padStart(3, "0")}`,
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: customer.email,
      customerAddress: customer.address,
      items: [
        {
          productId: product.id,
          productName: product.name,
          brand: "valley",
          size,
          color,
          price: product.price,
          quantity: qty,
          image,
        },
      ],
      total,
      status,
      placedAt: placedAt.toISOString(),
      updatedAt: placedAt.toISOString(),
    };

    if (status === "shipping" || status === "returning" || status === "pending_verdict" || status === "completed") {
      order.trackingNumber = `SL-TRK-${1000 + i}`;
    }
    if (status === "returning" || status === "pending_verdict") {
      order.returnReason = pick(RETURN_REASONS, i);
    }

    generated.push(order);
  }

  return generated;
}

// Splice the generated bulk into the main export
orders.push(...generateValleyOrders());

// ─── Serendib Style orders ───────────────────────────────────────────────────
const SS_PRODUCT_POOL = [
  { id: "ss-silk-wrap-dress",    name: "Serendib Silk Wrap Dress", price: 8900,  sizes: ["XS","S","M","L"],        colors: ["Ivory","Teal","Terracotta"],       images: ["/products/pexels-cottonbro-6626418.jpg","/products/pexels-ron-lach-9464625.jpg"] },
  { id: "ss-linen-set",          name: "Linen Two-piece Set",       price: 14800, sizes: ["XS","S","M","L"],        colors: ["Natural","Sage","Sand"],           images: ["/products/pexels-cottonbro-6616673.jpg","/products/pexels-tima-miroshnichenko-7202792.jpg"] },
  { id: "ss-batik-coord",        name: "Batik Crop Co-ord",         price: 11200, sizes: ["XS","S","M","L"],        colors: ["Indigo","Rust","Forest"],          images: ["/products/pexels-ron-lach-9464625.jpg","/products/pexels-prayoon-sajeev-1486107-2897529.jpg"] },
  { id: "ss-lotus-maxi",         name: "Lotus Embroidered Maxi",    price: 12500, sizes: ["S","M","L"],             colors: ["White","Blush","Midnight"],        images: ["/products/pexels-prayoon-sajeev-1486107-2897529.jpg","/products/pexels-cottonbro-6626418.jpg"] },
  { id: "ss-handloom-wrap-dress",name: "Handloom Wrap Dress",        price: 10800, sizes: ["S","M","L"],             colors: ["Ochre","Slate","Cream"],           images: ["/products/pexels-tima-miroshnichenko-7202792.jpg","/products/pexels-ron-lach-9464625.jpg"] },
  { id: "ss-linen-shirt-dress",  name: "Linen Shirt Dress",          price: 8400,  sizes: ["S","M","L","XL"],       colors: ["White","Khaki","Dusty Rose"],      images: ["/products/pexels-cottonbro-6626418.jpg","/products/pexels-cottonbro-6616673.jpg"] },
  { id: "ss-embroidered-crop",   name: "Embroidered Crop Top",       price: 5200,  sizes: ["XS","S","M","L"],       colors: ["White","Black","Coral"],           images: ["/products/pexels-ron-lach-9464625.jpg","/products/pexels-tima-miroshnichenko-7202792.jpg"] },
  { id: "ss-linen-trousers",     name: "Wide-leg Linen Trousers",    price: 7200,  sizes: ["XS","S","M","L","XL"],  colors: ["Natural","Black","Sage"],          images: ["/products/pexels-prayoon-sajeev-1486107-2897529.jpg","/products/pexels-cottonbro-6616673.jpg"] },
];

const SS_CUSTOMER_POOL = [
  { id: "sc1",  name: "Amali Perera",           email: "amali.p@email.com",      address: "14 Flower Road, Colombo 03" },
  { id: "sc2",  name: "Dilini Fernando",         email: "dilini.f@email.com",     address: "7 Galle Road, Colombo 06" },
  { id: "sc3",  name: "Nimesha Jayasinghe",      email: "nimesha.j@email.com",    address: "23 Peradeniya Road, Kandy" },
  { id: "sc4",  name: "Sashini De Silva",        email: "sashini.d@email.com",    address: "55 Bauddhaloka Mawatha, Colombo 04" },
  { id: "sc5",  name: "Thilini Bandara",         email: "thilini.b@email.com",    address: "8 Fort Road, Galle" },
  { id: "sc6",  name: "Oshadi Rajapaksa",        email: "oshadi.r@email.com",     address: "31 Lake Drive, Colombo 07" },
  { id: "sc7",  name: "Hasini Wijesinghe",       email: "hasini.w@email.com",     address: "19 Park Street, Nugegoda" },
  { id: "sc8",  name: "Kavindya Senanayake",     email: "kavindya.s@email.com",   address: "62 Esplanade Road, Galle" },
  { id: "sc9",  name: "Ayasha Mendis",           email: "ayasha.m@email.com",     address: "3 Reid Avenue, Colombo 05" },
  { id: "sc10", name: "Piyumi Abeysekera",       email: "piyumi.a@email.com",     address: "41 Marine Drive, Colombo 04" },
  { id: "sc11", name: "Senuri Gunawardena",      email: "senuri.g@email.com",     address: "17 Temple Road, Kandy" },
  { id: "sc12", name: "Mathisha Karunaratne",    email: "mathisha.k@email.com",   address: "28 Beach Road, Negombo" },
  { id: "sc13", name: "Yenuli Wickramasinghe",   email: "yenuli.w@email.com",     address: "9 Stratford Lane, Mount Lavinia" },
  { id: "sc14", name: "Sanduni Liyanage",        email: "sanduni.l@email.com",    address: "44 Hill Street, Kurunegala" },
  { id: "sc15", name: "Chamodi Ekanayake",       email: "chamodi.e@email.com",    address: "11 York Street, Colombo 01" },
  { id: "sc16", name: "Umayanga Fernando",       email: "umayanga.f@email.com",   address: "66 Havelock Road, Colombo 05" },
  { id: "sc17", name: "Ranudi Dissanayake",      email: "ranudi.d@email.com",     address: "5 Castle Street, Colombo 08" },
  { id: "sc18", name: "Isuri Pathirana",         email: "isuri.p@email.com",      address: "38 Sea Avenue, Mount Lavinia" },
  { id: "sc19", name: "Mihiri Samaraweera",      email: "mihiri.s@email.com",     address: "21 Old Road, Negombo" },
  { id: "sc20", name: "Nethmini Ranasinghe",     email: "nethmini.r@email.com",   address: "13 Buller's Road, Colombo 07" },
  { id: "sc21", name: "Lakmali Chandrasekara",   email: "lakmali.c@email.com",    address: "77 Pagoda Road, Nugegoda" },
  { id: "sc22", name: "Devindi Wickramaratne",   email: "devindi.w@email.com",    address: "32 Light House Street, Matara" },
  { id: "sc23", name: "Tharushika Jayawardena",  email: "tharushika.j@email.com", address: "6 Lily Avenue, Battaramulla" },
  { id: "sc24", name: "Malsha Goonetilleke",     email: "malsha.g@email.com",     address: "50 Park Avenue, Nugegoda" },
  { id: "sc25", name: "Binuri Kodagoda",         email: "binuri.k@email.com",     address: "25 Horton Place, Colombo 07" },
];

function generateSerendibOrders(): Order[] {
  const generated: Order[] = [];
  const ORDER_COUNT = 150;
  const NOW = new Date("2026-05-12T18:00:00Z");

  for (let i = 0; i < ORDER_COUNT; i++) {
    const customerIdx = i % 3 === 0
      ? hash(i + 2, 12)
      : hash(i + 17, SS_CUSTOMER_POOL.length);
    const customer = SS_CUSTOMER_POOL[customerIdx];
    const product  = SS_PRODUCT_POOL[hash(i + 31, SS_PRODUCT_POOL.length)];
    const image    = product.images[hash(i + 41, product.images.length)];
    const size     = pick(product.sizes,  hash(i + 3,  product.sizes.length));
    const color    = pick(product.colors, hash(i + 7,  product.colors.length));
    const qty      = i % 13 === 0 ? 2 : 1;

    const daysBack = Math.floor(180 * Math.pow(i / ORDER_COUNT, 1.4));
    const placedAt = new Date(NOW);
    placedAt.setUTCDate(placedAt.getUTCDate() - daysBack);
    placedAt.setUTCHours(hash(i + 9, 24), hash(i + 19, 60), 0, 0);

    let status: OrderStatus;
    if (daysBack < 1)       status = i % 2 === 0 ? "new" : "shipping";
    else if (daysBack < 3)  status = i % 3 === 0 ? "new" : "shipping";
    else if (daysBack < 7)  status = i % 4 === 0 ? "shipping" : "completed";
    else if (daysBack < 14) status = i % 11 === 0 ? "returning" : (i % 17 === 0 ? "pending_verdict" : "completed");
    else if (daysBack < 30) status = i % 19 === 0 ? "returning" : "completed";
    else                    status = "completed";

    const total = product.price * qty;
    const order: Order = {
      id: `ORD-2026-S${String(i + 100).padStart(3, "0")}`,
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: customer.email,
      customerAddress: customer.address,
      items: [{ productId: product.id, productName: product.name, brand: "serendib-style", size, color, price: product.price, quantity: qty, image }],
      total,
      status,
      placedAt: placedAt.toISOString(),
      updatedAt: placedAt.toISOString(),
    };

    if (status === "shipping" || status === "returning" || status === "pending_verdict" || status === "completed") {
      order.trackingNumber = `SL-TRK-${2000 + i}`;
    }
    if (status === "returning" || status === "pending_verdict") {
      order.returnReason = pick(RETURN_REASONS, i);
    }

    generated.push(order);
  }
  return generated;
}

orders.push(...generateSerendibOrders());

export function getOrdersByStatus(status: OrderStatus) {
  return orders.filter((o) => o.status === status);
}

export function getOrder(id: string) {
  return orders.find((o) => o.id === id);
}

export function getCustomerOrders(customerId: string) {
  return orders.filter((o) => o.customerId === customerId);
}
