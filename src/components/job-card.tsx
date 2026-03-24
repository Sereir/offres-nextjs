import Link from "next/link";
import { OfferItem } from "@/lib/lorem-data";

type JobCardProps = {
  offer: OfferItem;
};

export function JobCard({ offer }: JobCardProps) {
  return (
    <article className="border border-slate-200 bg-white p-3 text-[11px] text-slate-600">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-xs font-semibold text-slate-900">{offer.title}</h3>
        <button type="button" aria-label="Enregistrer" className="text-slate-500">
          ☆
        </button>
      </div>
      <p className="mb-2 text-[10px] text-blue-600">
        {offer.location}, {offer.company}
      </p>
      <p className="line-clamp-2 mb-2 text-[10px] leading-relaxed">{offer.excerpt}</p>
      <Link href={`/offres/${offer.slug}`} className="text-[10px] font-medium text-blue-600">
        Voir l&apos;offre
      </Link>
    </article>
  );
}
