"use client";

import { useCallback } from "react";
import { Event } from "@/types/events";
import { useEventFilters } from "@/hooks/useEventFilters";
import { usePagination } from "@/hooks/usePagination";
import { EVENTS_PER_PAGE } from "@/constants/events";
import EventCard from "./EventCard";
import { EventsSearchBar } from "./EventsSearchBar";
import { EventsFilters } from "./EventsFilters";
import { EventsPagination } from "./EventsPagination";
import { EventsEmptyState } from "./EventsEmptyState";
import { EventsResultsCount } from "./EventsResultsCount";

interface EventsGridProps {
  initialEvents: Event[];
}

export function EventsGrid({ initialEvents }: EventsGridProps) {
  const {
    filters,
    filteredEvents,
    categories,
    locations,
    updateSearchQuery,
    updateCategory,
    updateLocation,
    updateDate,
  } = useEventFilters({ events: initialEvents });

  const pagination = usePagination({
    items: filteredEvents,
    itemsPerPage: EVENTS_PER_PAGE,
  });

  const handleSearchChange = useCallback(
    (query: string) => {
      updateSearchQuery(query);
      pagination.reset();
    },
    [updateSearchQuery, pagination]
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      updateCategory(category);
      pagination.reset();
    },
    [updateCategory, pagination]
  );

  const handleLocationChange = useCallback(
    (location: string) => {
      updateLocation(location);
      pagination.reset();
    },
    [updateLocation, pagination]
  );

  const handleDateChange = useCallback(
    (date: Date | undefined) => {
      updateDate(date);
      pagination.reset();
    },
    [updateDate, pagination]
  );

  return (
    <div>
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <EventsSearchBar
          value={filters.searchQuery}
          onChange={handleSearchChange}
        />

        <EventsFilters
          categories={categories}
          locations={locations}
          selectedCategory={filters.category}
          selectedLocation={filters.location}
          selectedDate={filters.date}
          onCategoryChange={handleCategoryChange}
          onLocationChange={handleLocationChange}
          onDateChange={handleDateChange}
        />

        <EventsResultsCount count={filteredEvents.length} />
      </div>

      {/* Events Grid */}
      {pagination.paginatedItems.length === 0 ? (
        <EventsEmptyState />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pagination.paginatedItems.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <EventsPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPreviousPage={pagination.goToPreviousPage}
            onNextPage={pagination.goToNextPage}
          />
        </>
      )}
    </div>
  );
}
