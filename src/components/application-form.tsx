"use client";

import { FormEvent, useMemo, useState } from "react";
import { useApplicationsStore } from "@/stores/applications-store";

type ApplicationFormProps = {
  offerSlug: string;
  offerTitle: string;
};

export function ApplicationForm({ offerSlug, offerTitle }: ApplicationFormProps) {
  const submitApplication = useApplicationsStore((state) => state.submitApplication);
  const applications = useApplicationsStore((state) => state.applications);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const hasApplied = useMemo(
    () => applications.some((application) => application.offerSlug === offerSlug),
    [applications, offerSlug],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!message.trim()) {
      setFeedback("Merci d'écrire un message avant d'envoyer.");
      return;
    }

    submitApplication({
      offerSlug,
      offerTitle,
      message,
    });

    setMessage("");
    setFeedback("Candidature envoyée et ajoutée à votre historique.");
  }

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Postuler à cette offre..."
        className="h-28 w-full resize-none border border-slate-300 bg-white p-3 text-sm outline-none"
      />
      <div className="flex items-center justify-between gap-3">
        {hasApplied ? <p className="text-xs text-blue-600">Vous avez déjà postulé à cette offre.</p> : <span />}
        <button
          type="submit"
          className="cursor-pointer border border-blue-700 bg-blue-700 px-3 py-1 text-xs text-white"
        >
          Envoyer
        </button>
      </div>
      {feedback ? <p className="text-xs text-slate-600">{feedback}</p> : null}
    </form>
  );
}