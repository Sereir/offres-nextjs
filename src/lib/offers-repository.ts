import * as prismic from "@prismicio/client";
import { OfferItem, getItemBySlug as getLoremItemBySlug, getItemsByTag as getLoremItemsByTag, items } from "@/lib/lorem-data";

type OfferDocument = prismic.PrismicDocument;

const defaultExcerpt =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.";

function getTextFromUnknown(value: unknown): string | null {
  if (typeof value === "string") {
    const trimmedValue = value.trim();
    return trimmedValue.length > 0 ? trimmedValue : null;
  }

  if (Array.isArray(value)) {
    const richTextValue = value as prismic.RichTextField;
    const textValue = prismic.asText(richTextValue).trim();
    return textValue.length > 0 ? textValue : null;
  }

  if (value && typeof value === "object" && "text" in value) {
    const textProperty = (value as { text?: unknown }).text;
    if (typeof textProperty === "string" && textProperty.trim().length > 0) {
      return textProperty.trim();
    }
  }

  return null;
}

function getArrayFromUnknown(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => {
      if (typeof entry === "string") {
        return entry;
      }

      if (entry && typeof entry === "object") {
        const candidate = entry as {
          name?: unknown;
          label?: unknown;
          value?: unknown;
          text?: unknown;
          technology?: unknown;
          tag?: unknown;
        };

        const directCandidates = [
          candidate.name,
          candidate.label,
          candidate.value,
          candidate.text,
          candidate.technology,
          candidate.tag,
        ];

        for (const item of directCandidates) {
          if (typeof item === "string" && item.trim().length > 0) {
            return item;
          }
        }
      }

      return null;
    })
    .filter((entry): entry is string => Boolean(entry))
    .map((entry) => entry.trim());
}

function mapOfferFromPrismic(document: OfferDocument): OfferItem {
  const data = document.data;
  const title = getTextFromUnknown(data.title) ?? "Lorem Ipsum Dolor";
  const company = getTextFromUnknown(data.company) ?? "Lorem Company";
  const location = getTextFromUnknown(data.location) ?? "Lorem City";
  const excerpt = getTextFromUnknown(data.excerpt) ?? defaultExcerpt;
  const description =
    getTextFromUnknown(data.description) ??
    getTextFromUnknown(data.content) ??
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

  const tags =
    getArrayFromUnknown(data.technologies).length > 0
      ? getArrayFromUnknown(data.technologies)
      : getArrayFromUnknown(data.tags).length > 0
        ? getArrayFromUnknown(data.tags)
        : ["Techno 1"];

  return {
    slug: document.uid ?? `offre-${document.id}`,
    title,
    company,
    location,
    tags,
    excerpt,
    description,
  };
}

function getPrismicClient() {
  const repositoryName = process.env.PRISMIC_REPOSITORY_NAME;
  if (!repositoryName) {
    return null;
  }

  return prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });
}

function dedupeTags(offers: OfferItem[]) {
  return Array.from(new Set(offers.flatMap((offer) => offer.tags))).sort((left, right) =>
    left.localeCompare(right, "fr"),
  );
}

async function fetchPrismicOffers() {
  const client = getPrismicClient();
  if (!client) {
    return null;
  }

  const documents = await client.getAllByType("offer");
  return documents.map(mapOfferFromPrismic);
}

export async function getOffers() {
  const prismicOffers = await fetchPrismicOffers();
  return prismicOffers ?? items;
}

export async function getOfferBySlug(slug: string) {
  const prismicOffers = await fetchPrismicOffers();
  if (prismicOffers) {
    return prismicOffers.find((offer) => offer.slug === slug);
  }

  return getLoremItemBySlug(slug);
}

export async function getOffersByTag(tag: string) {
  const prismicOffers = await fetchPrismicOffers();
  if (prismicOffers) {
    return prismicOffers.filter((offer) =>
      offer.tags.some((currentTag) => currentTag.toLowerCase() === tag.toLowerCase()),
    );
  }

  return getLoremItemsByTag(tag);
}

export async function getTagNames() {
  const offers = await getOffers();
  return dedupeTags(offers);
}
