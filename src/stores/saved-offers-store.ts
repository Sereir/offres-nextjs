"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SavedOffersState = {
  savedSlugs: string[];
  toggleSavedOffer: (slug: string) => void;
  isOfferSaved: (slug: string) => boolean;
  removeMissingOffers: (availableSlugs: string[]) => void;
};

export const useSavedOffersStore = create<SavedOffersState>()(
  persist(
    (set, get) => ({
      savedSlugs: [],
      toggleSavedOffer: (slug: string) => {
        set((state) => {
          if (state.savedSlugs.includes(slug)) {
            return {
              savedSlugs: state.savedSlugs.filter((currentSlug) => currentSlug !== slug),
            };
          }

          return {
            savedSlugs: [...state.savedSlugs, slug],
          };
        });
      },
      isOfferSaved: (slug: string) => get().savedSlugs.includes(slug),
      removeMissingOffers: (availableSlugs: string[]) => {
        set((state) => ({
          savedSlugs: state.savedSlugs.filter((slug) => availableSlugs.includes(slug)),
        }));
      },
    }),
    {
      name: "saved-offers",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);