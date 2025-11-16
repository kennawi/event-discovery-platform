import { Event } from "@/types/events";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

/**
 * Generates JSON-LD structured data for an event
 * @param event - The event object
 * @param locale - The locale for generating URLs ('en' or 'ar')
 */
export function generateEventStructuredData(
  event: Event,
  locale: string = "en"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.longDescription || event.description,
    startDate: event.date,
    endDate: event.endDate || event.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.location.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.location.city,
        addressRegion: event.location.state,
        addressCountry: event.location.country,
      },
    },
    image: event.imageUrl,
    url: `${BASE_URL}/${locale}/events/${event.slug}`,
    organizer: {
      "@type": "Organization",
      name: event.organizer.name,
    },
    offers: {
      "@type": "Offer",
      price: event.price === "free" ? "0" : event.price.toString(),
      priceCurrency: "USD",
      availability:
        event.attendeeCount < event.maxAttendees
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
      url: `${BASE_URL}/${locale}/events/${event.slug}/book`,
    },
    inLanguage: locale === "ar" ? "ar" : "en",
  };
}

/**
 * Generates JSON-LD structured data for an events collection/listing page
 * @param events - Array of event objects
 * @param locale - The locale for generating URLs and text ('en' or 'ar')
 * @param translations - Translation object with 'title' and 'description' keys
 */
export function generateEventsCollectionStructuredData(
  events: Event[],
  locale: string = "en",
  translations?: { title: string; description: string }
) {
  const title =
    translations?.title ||
    (locale === "ar" ? "الفعاليات القادمة" : "Upcoming Events");
  const description =
    translations?.description ||
    (locale === "ar"
      ? "تصفح واكتشف الفعاليات القادمة. ابحث وفلتر حسب التاريخ والموقع والفئة وعنوان الفعالية."
      : "Browse and discover upcoming events. Search and filter by date, location, category, and event title.");

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: description,
    url: `${BASE_URL}/${locale}/events`,
    inLanguage: locale === "ar" ? "ar" : "en",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: events.length,
      itemListElement: events.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Event",
          name: event.title,
          description: event.description,
          startDate: event.date,
          endDate: event.endDate || event.date,
          image: event.imageUrl,
          url: `${BASE_URL}/${locale}/events/${event.slug}`,
          location: {
            "@type": "Place",
            name: event.location.venue,
            address: {
              "@type": "PostalAddress",
              addressLocality: event.location.city,
              addressRegion: event.location.state,
              addressCountry: event.location.country,
            },
          },
          offers: {
            "@type": "Offer",
            price: event.price === "free" ? "0" : event.price.toString(),
            priceCurrency: "USD",
            url: `${BASE_URL}/${locale}/events/${event.slug}/book`,
          },
        },
      })),
    },
  };
}
