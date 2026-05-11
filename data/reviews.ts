export type Review = {
  id: string;
  productId: string;
  authorName: string;
  authorHeight?: string;
  rating: number;
  comment: string;
  sizeOrdered: string;
  fitFeedback: "Runs Small" | "True to Size" | "Runs Large";
  date: string;
  verified: boolean;
};

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "valley-cream-overshirt",
    authorName: "Kavindu S.",
    authorHeight: "5'10\"",
    rating: 5,
    comment:
      "Love the fabric quality and the fit is perfect. The coral color is even nicer in person. Will definitely reorder.",
    sizeOrdered: "M",
    fitFeedback: "True to Size",
    date: "2026-04-20",
    verified: true,
  },
  {
    id: "r2",
    productId: "valley-cream-overshirt",
    authorName: "Dasun R.",
    authorHeight: "6'1\"",
    rating: 4,
    comment: "Great shirt. I went with L and it fits nicely. Slightly boxy but that's the intended look.",
    sizeOrdered: "L",
    fitFeedback: "True to Size",
    date: "2026-04-15",
    verified: true,
  },
  {
    id: "r3",
    productId: "northlane-black-shirt",
    authorName: "Tharindu M.",
    authorHeight: "5'9\"",
    rating: 5,
    comment: "The pinstripe texture is subtle and classy. Worn it three times already.",
    sizeOrdered: "M",
    fitFeedback: "True to Size",
    date: "2026-04-25",
    verified: true,
  },
  {
    id: "r4",
    productId: "halcyon-sundress",
    authorName: "Thilini J.",
    authorHeight: "5'4\"",
    rating: 5,
    comment: "Absolutely stunning dress! The marigold color is gorgeous and the fabric drapes beautifully.",
    sizeOrdered: "S",
    fitFeedback: "True to Size",
    date: "2026-04-22",
    verified: true,
  },
  {
    id: "r5",
    productId: "halcyon-sundress",
    authorName: "Ruwani F.",
    authorHeight: "5'6\"",
    rating: 4,
    comment: "Really beautiful. I sized up to M and it's perfect for my curves.",
    sizeOrdered: "M",
    fitFeedback: "Runs Small",
    date: "2026-04-10",
    verified: true,
  },
  {
    id: "r6",
    productId: "nilo-wide-leg-jeans",
    authorName: "Isuri W.",
    authorHeight: "5'3\"",
    rating: 3,
    comment: "Ordered my usual size but they came up really small. Had to return. Great quality though.",
    sizeOrdered: "28",
    fitFeedback: "Runs Small",
    date: "2026-04-28",
    verified: true,
  },
  {
    id: "r7",
    productId: "nilo-ribbed-tee",
    authorName: "Malsha B.",
    authorHeight: "5'5\"",
    rating: 5,
    comment: "My go-to essential. Bought it in all three colors!",
    sizeOrdered: "S",
    fitFeedback: "True to Size",
    date: "2026-04-18",
    verified: true,
  },
];

export function getProductReviews(productId: string) {
  return reviews.filter((r) => r.productId === productId);
}
