"use client";

import Link from "next/link";
import { useMemo } from "react";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import { OfferItem } from "@/lib/offers-repository";
import { useApplicationsStore } from "@/stores/applications-store";

type ApplicationsHistorySectionProps = {
  offers: OfferItem[];
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

export function ApplicationsHistorySection({ offers }: ApplicationsHistorySectionProps) {
  const applications = useApplicationsStore((state) => state.applications);

  const offersBySlug = useMemo(() => {
    return new Map(offers.map((offer) => [offer.slug, offer]));
  }, [offers]);

  if (applications.length === 0) {
    return <p className="text-sm text-slate-600">Aucune candidature envoyée pour le moment.</p>;
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => {
        const currentOffer = offersBySlug.get(application.offerSlug);
        const publishedDate = formatDate(currentOffer?.publishedAt ?? application.appliedAt);
        const tags = currentOffer?.tags ?? [];
        const applicationMessage = application.message;

        return (
          <article
            key={application.offerSlug}
            className="border-b border-slate-200 pb-3 text-xs text-slate-700"
          >
            <Link
              href={`/offres/${application.offerSlug}`}
              className="block cursor-pointer rounded-sm transition-colors hover:bg-slate-50"
            >
              <h3 className="mb-1 text-sm font-semibold text-slate-900">
                {currentOffer?.title ?? application.offerTitle}
              </h3>
              <p className="mb-1 text-[11px] italic text-slate-600">
                Candidature envoyée le {formatDate(application.appliedAt)}
              </p>
              {publishedDate ? (
                <p className="mb-1 flex items-center gap-1 text-[11px] text-blue-600">
                  <CalendarTodayOutlinedIcon className="text-[14px]" />
                  {publishedDate}
                </p>
              ) : null}
              {tags.length > 0 ? (
                <p className="mb-1 flex items-center gap-1 text-[11px] text-blue-600">
                  <CodeOutlinedIcon className="text-[14px]" />
                  {tags.join(", ")}
                </p>
              ) : null}
              <p className="mt-2 text-sm text-slate-600">{applicationMessage}</p>
            </Link>
          </article>
        );
      })}
    </div>
  );
}