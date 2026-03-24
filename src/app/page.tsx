import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { JobCard } from "@/components/job-card";
import { SectionTitle } from "@/components/section-title";
import { getOffers } from "@/lib/offers-repository";

export default async function Home() {
  const offers = await getOffers();
  const latestOffers = offers.slice(0, 6);

  return (
    <AppShell>
      <main className="space-y-6">
        <section className="h-56 bg-gradient-to-r from-amber-100 to-slate-100" />

        <section>
          <SectionTitle title="Nos dernières opportunités" />
          <div className="grid gap-3 md:grid-cols-3">
            {latestOffers.map((offer) => (
              <JobCard key={offer.slug} offer={offer} />
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Link
              href="/offres"
              className="border border-blue-700 bg-blue-700 px-3 py-1 text-xs text-white"
            >
              Voir toutes les offres
            </Link>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
