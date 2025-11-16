import { Event } from "@/types/events";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

/**
 * Fetches all events from the API
 * @param locale - The locale to fetch events for ('en' or 'ar')
 * @returns Promise resolving to an array of events
 */
export async function getEvents(locale: string = "en"): Promise<{
  success: boolean;
  events: Event[];
  error: string | null;
}> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/events?locale=${locale}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return {
        success: false,
        events: [],
        error: `Failed to fetch events: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      events: data as Event[],
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch events:", error);
    // Fallback to direct import in case fetch fails during build
    try {
      const eventsModule =
        locale === "ar"
          ? await import("@/mock/events.ar.json")
          : await import("@/mock/events.en.json");
      return {
        success: true,
        events: eventsModule.default as Event[],
        error: null,
      };
    } catch {
      return {
        success: false,
        events: [],
        error: "An unknown error occurred",
      };
    }
  }
}

/**
 * Fetches a single event by slug from the API
 * @param slug - The event slug
 * @param locale - The locale to fetch event for ('en' or 'ar')
 * @returns Promise resolving to an event or null if not found
 */
export async function getEventBySlug(
  slug: string,
  locale: string = "en"
): Promise<{
  success: boolean;
  event: Event | null;
  error: string | null;
}> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/events/${slug}?locale=${locale}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return {
          success: false,
          event: null,
          error: "Event not found",
        };
      }
      return {
        success: false,
        event: null,
        error: `Failed to fetch event: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      event: data as Event,
      error: null,
    };
  } catch (error) {
    console.error(`Failed to fetch event with slug ${slug}:`, error);
    // Fallback to direct import
    try {
      const eventsModule =
        locale === "ar"
          ? await import("@/mock/events.ar.json")
          : await import("@/mock/events.en.json");
      const event = (eventsModule.default as Event[]).find(
        (e) => e.slug === slug
      );
      if (!event) {
        return {
          success: false,
          event: null,
          error: "Event not found",
        };
      }
      return {
        success: true,
        event: event,
        error: null,
      };
    } catch {
      return {
        success: false,
        event: null,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  }
}
