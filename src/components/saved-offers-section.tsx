"use client";

import { useEffect, useMemo } from "react";
import { JobCard } from "@/components/job-card";
import { OfferItem } from "@/lib/offers-repository";
import { useSavedOffersStore } from "@/stores/saved-offers-store";

type SavedOffersSectionProps = {
  offers: OfferItem[];
};

export function SavedOffersSection({ offers }: SavedOffersSectionProps) {
  const savedSlugs = useSavedOffersStore((state) => state.savedSlugs);
  const removeMissingOffers = useSavedOffersStore((state) => state.removeMissingOffers);

  const availableSlugs = useMemo(() => offers.map((offer) => offer.slug), [offers]);

  useEffect(() => {
    removeMissingOffers(availableSlugs);
  }, [availableSlugs, removeMissingOffers]);

  const savedOffers = useMemo(
    () => offers.filter((offer) => savedSlugs.includes(offer.slug)),
    [offers, savedSlugs],
  );

  if (savedOffers.length === 0) {
    return <p className="text-sm text-slate-600">Aucune offre enregistrée pour le moment.</p>;
  }

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {savedOffers.map((offer) => (
        <JobCard key={offer.slug} offer={offer} showMetadata />
      ))}
    </div>
  );
}