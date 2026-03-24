import { SiteLayout } from "@/components/site-layout";
import { SavedOffersSection } from "@/components/saved-offers-section";
import { SectionTitle } from "@/components/section-title";
import { getOffers } from "@/lib/offers-repository";

export default async function ProfilePage() {
  const items = await getOffers();
  const history = items.slice(0, 2);

  return (
    <SiteLayout>
      <main className="space-y-10">
        <section>
          <SectionTitle title="Bienvenue" />
          <h2 className="mb-4 text-sm font-semibold text-blue-600">Offres enregistrées</h2>
          <SavedOffersSection offers={items} />
        </section>

        <section>
          <h2 className="mb-4 border-b border-slate-300 pb-2 text-sm font-semibold text-blue-600">
            Historique des candidatures
          </h2>
          <div className="space-y-4">
            {history.map((offer) => (
              <article key={offer.slug} className="border-b border-slate-200 pb-3 text-xs text-slate-700">
                <h3 className="mb-1 text-sm font-semibold text-slate-900">{offer.title}</h3>
                <p>{offer.excerpt}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
