import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { SectionTitle } from "@/components/section-title";
import { TagChip } from "@/components/tag-chip";
import { getOfferBySlug } from "@/lib/offers-repository";

type OfferDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function OfferDetailPage({ params }: OfferDetailPageProps) {
  const { slug } = await params;
  const offer = await getOfferBySlug(slug);

  if (!offer) {
    notFound();
  }

  return (
    <AppShell>
      <main>
        <SectionTitle title={offer.title} />
        <div className="mb-4 flex flex-wrap gap-2">
          {offer.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
        <p className="mb-8 text-sm leading-relaxed text-slate-700">{offer.description}</p>

        <form className="space-y-2">
          <textarea
            placeholder="Pourquoi ce poste m'intéresse..."
            className="h-28 w-full border border-slate-300 bg-white p-3 text-sm outline-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="border border-blue-700 bg-blue-700 px-3 py-1 text-xs text-white"
            >
              Envoyer
            </button>
          </div>
        </form>
      </main>
    </AppShell>
  );
}
