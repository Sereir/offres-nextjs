import { AppShell } from "@/components/app-shell";
import { JobCard } from "@/components/job-card";
import { SectionTitle } from "@/components/section-title";
import { TagChip } from "@/components/tag-chip";
import { items, tagNames } from "@/lib/lorem-data";

export default function OffersPage() {
  return (
    <AppShell>
      <main>
        <SectionTitle title="Offres d'emploi" meta={`${items.length} offres`} />
        <div className="mb-5 flex flex-wrap gap-2">
          {tagNames.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {items.map((offer) => (
            <JobCard key={offer.slug} offer={offer} />
          ))}
        </div>
      </main>
    </AppShell>
  );
}
