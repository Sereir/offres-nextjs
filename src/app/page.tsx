import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { JobCard } from "@/components/job-card";
import { SectionTitle } from "@/components/section-title";
import { getHomepageContent, getOffers } from "@/lib/offers-repository";

export default async function Home() {
  const homepage = await getHomepageContent();
  const offers = await getOffers();
  const latestOffersCount = homepage?.latestOffersCount ?? 6;
  const latestOffers = offers.slice(0, latestOffersCount);
  const latestOffersTitle = homepage?.latestOffersTitle ?? "Nos dernières opportunités";
  const ctaLabel = homepage?.latestOffersCtaLabel ?? "Voir toutes les offres";
  const ctaLink = homepage?.latestOffersCtaLink ?? "/offres";

  return (
    <AppShell>
      <main className="space-y-6">
        <section
          className="h-56 bg-gradient-to-r from-amber-100 to-slate-100 bg-cover bg-center"
          style={homepage?.heroImageUrl ? { backgroundImage: `url(${homepage.heroImageUrl})` } : undefined}
          aria-label={homepage?.heroAlt || "Image d'en-tête"}
        />

        <section>
          <SectionTitle title={latestOffersTitle} />
          <div className="grid gap-3 md:grid-cols-3">
            {latestOffers.map((offer) => (
              <JobCard key={offer.slug} offer={offer} showMetadata />
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Link href={ctaLink} className="border border-blue-700 bg-blue-700 px-3 py-1 text-xs text-white">
              {ctaLabel}
            </Link>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
