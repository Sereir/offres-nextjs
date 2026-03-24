"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ApplicationEntry = {
  offerSlug: string;
  offerTitle: string;
  message: string;
  appliedAt: string;
};

type ApplicationsState = {
  applications: ApplicationEntry[];
  submitApplication: (payload: {
    offerSlug: string;
    offerTitle: string;
    message: string;
  }) => void;
};

export const useApplicationsStore = create<ApplicationsState>()(
  persist(
    (set) => ({
      applications: [],
      submitApplication: ({ offerSlug, offerTitle, message }) => {
        set((state) => {
          const now = new Date().toISOString();
          const normalizedMessage = message.trim();

          const previousApplications = state.applications.filter(
            (application) => application.offerSlug !== offerSlug,
          );

          return {
            applications: [
              {
                offerSlug,
                offerTitle,
                message: normalizedMessage,
                appliedAt: now,
              },
              ...previousApplications,
            ],
          };
        });
      },
    }),
    {
      name: "applications-history",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);