import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { SectionTitle } from "@/components/section-title";
import { TagChip } from "@/components/tag-chip";
import { getOfferDetailBySlug } from "@/lib/offers-repository";

type OfferDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function OfferDetailPage({ params }: OfferDetailPageProps) {
  const { slug } = await params;
  const offer = await getOfferDetailBySlug(slug);

  if (!offer) {
    notFound();
  }

  return (
    <AppShell>
      <main>
        <SectionTitle title={offer.title} />
        <p className="mb-3 text-xs text-blue-600">
          {offer.location}, {offer.company}
        </p>
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

        {offer.extraFields.length > 0 ? (
          <section className="mb-8 grid gap-3 border border-slate-200 bg-white p-4 md:grid-cols-2">
            {offer.extraFields.map((field) => (
              <article key={`${field.label}-${field.value}`} className="space-y-1">
                <h2 className="text-xs font-semibold text-slate-900">{field.label}</h2>
                <p className="text-xs text-slate-700">{field.value}</p>
              </article>
            ))}
          </section>
        ) : null}

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
