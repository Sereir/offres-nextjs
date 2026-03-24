import { SiteLayout } from "@/components/site-layout";
import { ApplicationsHistorySection } from "@/components/applications-history-section";
import { SavedOffersSection } from "@/components/saved-offers-section";
import { SectionTitle } from "@/components/section-title";
import { getOffers } from "@/lib/offers-repository";

export default async function ProfilePage() {
  const items = await getOffers();

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
          <ApplicationsHistorySection offers={items} />
        </section>
      </main>
    </SiteLayout>
  );
}
