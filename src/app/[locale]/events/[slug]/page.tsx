import { Metadata } from "next";
import { getEventBySlug } from "@/lib/api/events";
import { generateEventStructuredData } from "@/utils/structuredData";
import { EventNotFound } from "@/components/EventDetail/EventNotFound";
import { EventHeader } from "@/components/EventDetail/EventHeader";
import { EventContent } from "@/components/EventDetail/EventContent";
import { EventDetailsSidebar } from "@/components/EventDetail/EventDetailsSidebar";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const { success, event, error } = await getEventBySlug(slug, locale);
  const t = await getTranslations({ locale });

  if (!success || error || !event) {
    return {
      title: t("eventDetail.eventNotFound"),
      description: t("eventDetail.eventNotFoundDescription"),
    };
  }

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const commonT = await getTranslations({ locale, namespace: "common" });

  return {
    title: `${event.title} - ${t("eventDetail.eventDetails")}`,
    description: event.longDescription || event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: [event.imageUrl],
      type: "website",
      siteName: commonT("eventBooking"),
      url: `${BASE_URL}/${locale}/events/${event.slug}`,
      locale: locale,
      alternateLocale: locale === "en" ? "ar" : "en",
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.description,
      images: [event.imageUrl],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/events/${event.slug}`,
      languages: {
        en: `${BASE_URL}/en/events/${event.slug}`,
        ar: `${BASE_URL}/ar/events/${event.slug}`,
      },
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const { success, event, error } = await getEventBySlug(slug, locale);

  if (!success || error || !event) {
    return <EventNotFound />;
  }

  const structuredData = generateEventStructuredData(event, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4 py-8">
        <EventHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <EventContent event={event} />
          <EventDetailsSidebar event={event} />
        </div>
      </div>
    </>
  );
}
