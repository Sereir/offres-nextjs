import * as prismic from "@prismicio/client";
import { OfferItem, getItemBySlug as getLoremItemBySlug, getItemsByTag as getLoremItemsByTag, items } from "@/lib/lorem-data";

type OfferDocument = prismic.PrismicDocument;

export type OfferDetail = OfferItem & {
  longDescription: string;
  extraFields: Array<{ label: string; value: string }>;
};

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

function formatFieldLabel(key: string) {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getExtraFieldsFromPrismicData(data: Record<string, unknown>) {
  const excludedKeys = new Set([
    "title",
    "company",
    "location",
    "excerpt",
    "description",
    "content",
    "technologies",
    "tags",
  ]);

  const entries = Object.entries(data)
    .filter(([key]) => !excludedKeys.has(key))
    .map(([key, value]) => {
      const textValue = getTextFromUnknown(value);
      if (!textValue) {
        return null;
      }

      return {
        label: formatFieldLabel(key),
        value: textValue,
      };
    })
    .filter((entry): entry is { label: string; value: string } => Boolean(entry));

  return entries;
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

function mapOfferDetailFromPrismic(document: OfferDocument): OfferDetail {
  const baseOffer = mapOfferFromPrismic(document);
  const data = document.data as Record<string, unknown>;

  const longDescription =
    getTextFromUnknown(data.description) ??
    getTextFromUnknown(data.content) ??
    baseOffer.description;

  return {
    ...baseOffer,
    longDescription,
    extraFields: getExtraFieldsFromPrismicData(data),
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

async function fetchPrismicOfferBySlug(slug: string) {
  const client = getPrismicClient();
  if (!client) {
    return null;
  }

  try {
    return await client.getByUID("offer", slug);
  } catch {
    return null;
  }
}

export async function getOffers() {
  const prismicOffers = await fetchPrismicOffers();
  return prismicOffers ?? items;
}

export async function getOfferBySlug(slug: string) {
  const prismicOffer = await fetchPrismicOfferBySlug(slug);
  if (prismicOffer) {
    return mapOfferFromPrismic(prismicOffer);
  }

  return getLoremItemBySlug(slug);
}

export async function getOfferDetailBySlug(slug: string): Promise<OfferDetail | null> {
  const prismicOffer = await fetchPrismicOfferBySlug(slug);
  if (prismicOffer) {
    return mapOfferDetailFromPrismic(prismicOffer);
  }

  const loremOffer = getLoremItemBySlug(slug);
  if (!loremOffer) {
    return null;
  }

  return {
    ...loremOffer,
    longDescription: loremOffer.description,
    extraFields: [
      {
        label: "Contrat",
        value: "Lorem ipsum",
      },
      {
        label: "Expérience",
        value: "Dolor sit amet",
      },
    ],
  };
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
