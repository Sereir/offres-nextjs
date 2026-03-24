import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { JobCard } from "@/components/job-card";
import { SectionTitle } from "@/components/section-title";
import { getOffersByTag, getTagNames } from "@/lib/offers-repository";

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

function normalizeTag(tag: string) {
  return tag.replace(/-/g, " ");
}

function formatTag(tag: string) {
  return tag
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const tagNames = await getTagNames();
  const readableTag = formatTag(normalizeTag(decodeURIComponent(tag)));
  const availableTag = tagNames.find(
    (currentTag) => currentTag.toLowerCase() === readableTag.toLowerCase(),
  );
  const selectedTag = availableTag ?? readableTag;
  const filteredOffers = await getOffersByTag(selectedTag);

  return (
    <AppShell>
      <main>
        <Link
          href="/offres"
          className="mb-5 inline-flex border border-slate-300 bg-white px-3 py-1 text-xs text-blue-600"
        >
          &lt; Voir toutes les offres
        </Link>
        <SectionTitle title={selectedTag} meta={`${filteredOffers.length} offres`} />
        <div className="grid gap-3 md:grid-cols-3">
          {filteredOffers.map((offer) => (
            <JobCard key={offer.slug} offer={offer} />
          ))}
        </div>
      </main>
    </AppShell>
  );
}
