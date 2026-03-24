export type OfferItem = {
  slug: string;
  title: string;
  company: string;
  location: string;
  tags: string[];
  excerpt: string;
  description: string;
};

const loremDescription =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export const items: OfferItem[] = Array.from({ length: 12 }, (_, index) => ({
  slug: `lorem-offre-${index + 1}`,
  title: "Lorem Ipsum Dolor",
  company: "Lorem Company",
  location: "Lorem City",
  tags: index % 3 === 0 ? ["Techno 1", "Techno 2"] : index % 3 === 1 ? ["Techno 2"] : ["Techno 3"],
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  description: loremDescription,
}));

export const tagNames = ["Techno 1", "Techno 2", "Techno 3"];

export function getItemBySlug(slug: string) {
  return items.find((item) => item.slug === slug);
}

export function getItemsByTag(tag: string) {
  return items.filter((item) =>
    item.tags.some((currentTag) => currentTag.toLowerCase() === tag.toLowerCase()),
  );
}