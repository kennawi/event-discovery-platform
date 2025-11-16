import { Event } from "@/types/events";

export interface EventFilters {
  searchQuery: string;
  category: string;
  location: string;
  date: Date | undefined;
}

/**
 * Checks if an event matches the search query
 */
export function matchesSearch(event: Event, searchQuery: string): boolean {
  if (!searchQuery.trim()) return true;

  const query = searchQuery.toLowerCase();
  const titleMatch = event.title.toLowerCase().includes(query);
  const descriptionMatch = event.description.toLowerCase().includes(query);
  const tagsMatch = event.tags.some((tag) =>
    tag.toLowerCase().includes(query)
  );

  return titleMatch || descriptionMatch || tagsMatch;
}

/**
 * Checks if an event matches the category filter
 */
export function matchesCategory(
  event: Event,
  selectedCategory: string
): boolean {
  return selectedCategory === "all" || event.category === selectedCategory;
}

/**
 * Checks if an event matches the location filter
 */
export function matchesLocation(
  event: Event,
  selectedLocation: string
): boolean {
  if (selectedLocation === "all") return true;

  const locationStr = `${event.location.city}, ${event.location.state}`;
  return locationStr === selectedLocation;
}

/**
 * Checks if an event matches the date filter
 */
export function matchesDate(event: Event, selectedDate: Date | undefined): boolean {
  if (!selectedDate) return true;

  const eventDate = new Date(event.date);
  const selectedDateStart = new Date(selectedDate);
  selectedDateStart.setHours(0, 0, 0, 0);

  const selectedDateEnd = new Date(selectedDate);
  selectedDateEnd.setHours(23, 59, 59, 999);

  return eventDate >= selectedDateStart && eventDate <= selectedDateEnd;
}

/**
 * Filters events based on all filter criteria
 */
export function filterEvents(
  events: Event[],
  filters: EventFilters
): Event[] {
  return events.filter((event) => {
    return (
      matchesSearch(event, filters.searchQuery) &&
      matchesCategory(event, filters.category) &&
      matchesLocation(event, filters.location) &&
      matchesDate(event, filters.date)
    );
  });
}

/**
 * Extracts unique categories from events
 */
export function extractCategories(events: Event[]): string[] {
  const categories = new Set(events.map((e) => e.category));
  return Array.from(categories).sort();
}

/**
 * Extracts unique locations from events
 */
export function extractLocations(events: Event[]): string[] {
  const locations = new Set(
    events.map((e) => `${e.location.city}, ${e.location.state}`)
  );
  return Array.from(locations).sort();
}

