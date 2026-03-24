import { AppShell } from "@/components/app-shell";
import { JobCard } from "@/components/job-card";
import { SectionTitle } from "@/components/section-title";
import { getOffers } from "@/lib/offers-repository";

export default async function ProfilePage() {
  const items = await getOffers();
  const savedOffers = items.slice(0, 6);
  const history = items.slice(6, 8);

  return (
    <AppShell>
      <main className="space-y-10">
        <section>
          <SectionTitle title="Bienvenue" />
          <h2 className="mb-4 text-sm font-semibold text-blue-600">Offres enregistrées</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {savedOffers.map((offer) => (
              <JobCard key={offer.slug} offer={offer} />
            ))}
          </div>
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
    </AppShell>
  );
}
