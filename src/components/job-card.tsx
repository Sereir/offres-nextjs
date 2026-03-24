"use client";

import { MouseEvent } from "react";
import Link from "next/link";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import { OfferItem } from "@/lib/offers-repository";
import { useSavedOffersStore } from "@/stores/saved-offers-store";

type JobCardProps = {
  offer: OfferItem;
  showMetadata?: boolean;
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

function tagToSlug(tag: string) {
  return encodeURIComponent(tag.toLowerCase().replace(/\s+/g, "-"));
}

export function JobCard({ offer, showMetadata = false }: JobCardProps) {
  const formattedDate = formatDate(offer.publishedAt);
  const isSaved = useSavedOffersStore((state) => state.isOfferSaved(offer.slug));
  const toggleSavedOffer = useSavedOffersStore((state) => state.toggleSavedOffer);

  function handleToggleSavedOffer(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    toggleSavedOffer(offer.slug);
  }

  return (
    <article className="relative border border-slate-200 bg-white p-5 text-sm text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-within:border-slate-300 focus-within:shadow-md">
      <Link
        href={`/offres/${offer.slug}`}
        aria-label={`Voir l'offre ${offer.title}`}
        className="absolute inset-0 z-10"
      />
      <div className="relative z-20 pointer-events-none">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">{offer.title}</h3>
          <button
            type="button"
            aria-label={isSaved ? "Retirer des offres enregistrées" : "Enregistrer l'offre"}
            onClick={handleToggleSavedOffer}
            className="pointer-events-auto inline-flex items-center text-slate-500"
          >
            {isSaved ? (
              <BookmarkOutlinedIcon className="text-[20px] text-blue-600" />
            ) : (
              <BookmarkBorderOutlinedIcon className="text-[20px]" />
            )}
          </button>
        </div>

        {showMetadata ? (
          <div className="mb-3 space-y-1 text-xs text-blue-600">
            {formattedDate ? (
              <p className="inline-flex items-center gap-1">
                <CalendarTodayOutlinedIcon className="text-[14px]" />
                {formattedDate}
              </p>
            ) : null}
            <br />
            {offer.tags.length > 0 ? (
              <p className="inline-flex items-center gap-1">
                <CodeOutlinedIcon className="text-[14px]" />
                {offer.tags.map((tag, index) => (
                  <span key={`${offer.slug}-${tag}`}>
                    <Link href={`/tags/${tagToSlug(tag)}`} className="pointer-events-auto text-blue-600">
                      {tag}
                    </Link>
                    {index < offer.tags.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            ) : null}
          </div>
        ) : null}
        <p className="line-clamp-3 text-sm leading-relaxed">{offer.excerpt}</p>
      </div>
    </article>
  );
}
