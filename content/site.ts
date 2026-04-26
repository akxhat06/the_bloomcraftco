/**
 * Central site copy. Media files are auto-listed from public/media/ (see lib/public-media.ts).
 */

export const site = {
  name: "The Bloomcraft Co.",
  handle: "the_bloomcraftco",
  tagline: "Handcrafted flowers n bouquets",
  quote: "Crafted by one, inspired by all",
  curatedBy: [
    { label: "@i_m_hershey", href: "https://www.instagram.com/i_m_hershey/" },
    { label: "@achuu_0811", href: "https://www.instagram.com/achuu_0811/" },
  ] as const,
  locations: ["Chintamani", "Bangalore"] as const,
  instagram: "https://www.instagram.com/the_bloomcraftco/",
  dmHint: "Pre-book your orders — ask or place an order via Instagram DM",
} as const;

export const productCategories = [
  {
    title: "Bouquets",
    description:
      "Custom crochet flower arrangements, personalized with photos and messages for birthdays and celebrations.",
    emoji: "🌻",
  },
  {
    title: "Charms & pins",
    description: "Evil eye keychains, paw-print pins, and small packaged gifts for occasions.",
    emoji: "🧿",
  },
  {
    title: "Potted blooms",
    description: "Desk-friendly crochet flowers in tiny yarn pots—sweet gifts that last.",
    emoji: "🪴",
  },
] as const;
