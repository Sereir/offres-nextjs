import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { SectionTitle } from "@/components/section-title";
import { TagChip } from "@/components/tag-chip";
import { getOfferDetailBySlug } from "@/lib/offers-repository";

type OfferDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(dateValue?: string | null) {
  if (!dateValue) {
    return null;
  }

  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("fr-FR").format(parsedDate);
}

export default async function OfferDetailPage({ params }: OfferDetailPageProps) {
  const { slug } = await params;
  const offer = await getOfferDetailBySlug(slug);
  const formattedDate = formatDate(offer?.publishedAt);

  if (!offer) {
    notFound();
  }

  return (
    <AppShell>
      <main>
        <SectionTitle title={offer.title} />
        {formattedDate ? <p className="mb-2 text-[11px] text-blue-600">📅 {formattedDate}</p> : null}
        <div className="mb-4 flex flex-wrap gap-2">
          {offer.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>

        <div className="mb-6 space-y-3 text-sm leading-relaxed text-slate-700">
          {offer.longDescription
            .split("\n")
            .map((paragraph) => paragraph.trim())
            .filter(Boolean)
            .map((paragraph, index) => (
              <p key={`${offer.slug}-paragraph-${index}`}>{paragraph}</p>
            ))}
        </div>

        <form className="space-y-2">
          <textarea
            placeholder="Postuler à cette offre..."
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
