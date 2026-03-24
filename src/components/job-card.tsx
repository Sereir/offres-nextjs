import Link from "next/link";
import { OfferItem } from "@/lib/offers-repository";

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

  return (
    <article className="border border-slate-200 bg-white p-3 text-[11px] text-slate-600">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-xs font-semibold text-slate-900">{offer.title}</h3>
        <button type="button" aria-label="Enregistrer" className="text-slate-500">
          ☆
        </button>
      </div>

      {showMetadata ? (
        <div className="mb-2 space-y-1 text-[10px] text-blue-600">
          {formattedDate ? <p>📅 {formattedDate}</p> : null}
          {offer.tags.length > 0 ? (
            <p>
              {offer.tags.map((tag, index) => (
                <span key={`${offer.slug}-${tag}`}>
                  <Link href={`/tags/${tagToSlug(tag)}`} className="text-blue-600">
                    {tag}
                  </Link>
                  {index < offer.tags.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          ) : null}
        </div>
      ) : null}

      <p className="line-clamp-2 mb-2 text-[10px] leading-relaxed">{offer.excerpt}</p>
      <Link href={`/offres/${offer.slug}`} className="text-[10px] font-medium text-blue-600">
        Voir l&apos;offre
      </Link>
    </article>
  );
}
