import { useState, useMemo, useCallback } from "react";
import { Event } from "@/types/events";
import {
  filterEvents,
  extractCategories,
  extractLocations,
  type EventFilters,
} from "@/utils/eventFilters";

interface UseEventFiltersProps {
  events: Event[];
}

interface UseEventFiltersReturn {
  filters: EventFilters;
  filteredEvents: Event[];
  categories: string[];
  locations: string[];
  updateSearchQuery: (query: string) => void;
  updateCategory: (category: string) => void;
  updateLocation: (location: string) => void;
  updateDate: (date: Date | undefined) => void;
  resetFilters: () => void;
}

const initialFilters: EventFilters = {
  searchQuery: "",
  category: "all",
  location: "all",
  date: undefined,
};

export function useEventFilters({
  events,
}: UseEventFiltersProps): UseEventFiltersReturn {
  const [filters, setFilters] = useState<EventFilters>(initialFilters);

  const filteredEvents = useMemo(
    () => filterEvents(events, filters),
    [events, filters]
  );

  const categories = useMemo(() => extractCategories(events), [events]);
  const locations = useMemo(() => extractLocations(events), [events]);

  const updateSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const updateCategory = useCallback((category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const updateLocation = useCallback((location: string) => {
    setFilters((prev) => ({ ...prev, location }));
  }, []);

  const updateDate = useCallback((date: Date | undefined) => {
    setFilters((prev) => ({ ...prev, date }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return {
    filters,
    filteredEvents,
    categories,
    locations,
    updateSearchQuery,
    updateCategory,
    updateLocation,
    updateDate,
    resetFilters,
  };
}

