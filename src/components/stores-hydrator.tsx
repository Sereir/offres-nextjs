"use client";

import { useEffect } from "react";
import { useApplicationsStore } from "@/stores/applications-store";
import { useSavedOffersStore } from "@/stores/saved-offers-store";

export function StoresHydrator() {
  useEffect(() => {
    useSavedOffersStore.persist.rehydrate();
    useApplicationsStore.persist.rehydrate();
  }, []);

  return null;
}