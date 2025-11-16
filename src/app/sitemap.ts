import type { MetadataRoute } from "next";
import { getEvents } from "@/lib/api/events";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch events for both locales
  const [eventsEn, eventsAr] = await Promise.all([
    getEvents("en"),
    getEvents("ar"),
  ]);

  const eventListEn = eventsEn.events || [];
  const eventListAr = eventsAr.events || [];

  // Static pages with localization alternates
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          ar: `${BASE_URL}/ar`,
        },
      },
    },
    {
      url: `${BASE_URL}/ar`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          ar: `${BASE_URL}/ar`,
        },
      },
    },
    {
      url: `${BASE_URL}/en/events`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${BASE_URL}/en/events`,
          ar: `${BASE_URL}/ar/events`,
        },
      },
    },
    {
      url: `${BASE_URL}/ar/events`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${BASE_URL}/en/events`,
          ar: `${BASE_URL}/ar/events`,
        },
      },
    },
    {
      url: `${BASE_URL}/en/tickets`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${BASE_URL}/en/tickets`,
          ar: `${BASE_URL}/ar/tickets`,
        },
      },
    },
    {
      url: `${BASE_URL}/ar/tickets`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${BASE_URL}/en/tickets`,
          ar: `${BASE_URL}/ar/tickets`,
        },
      },
    },
  ];

  // Dynamic event pages with localization alternates
  // Create a map to match events by slug for alternates
  const eventMapEn = new Map(eventListEn.map((e) => [e.slug, e]));
  const eventMapAr = new Map(eventListAr.map((e) => [e.slug, e]));

  // Generate English event pages with alternates
  const eventPagesEn: MetadataRoute.Sitemap = eventListEn.map((event) => ({
    url: `${BASE_URL}/en/events/${event.slug}`,
    lastModified: new Date(event.createdAt || event.date),
    changeFrequency: "weekly" as const,
    priority: event.featured ? 0.8 : 0.6,
    alternates: {
      languages: {
        en: `${BASE_URL}/en/events/${event.slug}`,
        ar: eventMapAr.has(event.slug)
          ? `${BASE_URL}/ar/events/${event.slug}`
          : undefined,
      },
    },
  }));

  // Generate Arabic event pages with alternates
  const eventPagesAr: MetadataRoute.Sitemap = eventListAr.map((event) => ({
    url: `${BASE_URL}/ar/events/${event.slug}`,
    lastModified: new Date(event.createdAt || event.date),
    changeFrequency: "weekly" as const,
    priority: event.featured ? 0.8 : 0.6,
    alternates: {
      languages: {
        en: eventMapEn.has(event.slug)
          ? `${BASE_URL}/en/events/${event.slug}`
          : undefined,
        ar: `${BASE_URL}/ar/events/${event.slug}`,
      },
    },
  }));

  // Combine all pages
  return [...staticPages, ...eventPagesEn, ...eventPagesAr];
}
