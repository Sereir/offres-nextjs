import { SiteLayout } from "@/components/site-layout";
import { JobCard } from "@/components/job-card";
import { SectionTitle } from "@/components/section-title";
import { TagChip } from "@/components/tag-chip";
import { getOffers, getTagNames } from "@/lib/offers-repository";

export default async function OffersPage() {
  const items = await getOffers();
  const tagNames = await getTagNames();

  return (
    <SiteLayout>
      <main>
        <SectionTitle title="Offres d'emploi" meta={`${items.length} offres`} />
        <div className="mb-5 flex flex-wrap gap-2">
          {tagNames.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {items.map((offer) => (
            <JobCard key={offer.slug} offer={offer} showMetadata />
          ))}
        </div>
      </main>
    </SiteLayout>
  );
}
