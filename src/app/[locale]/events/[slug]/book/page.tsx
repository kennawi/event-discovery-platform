import { BookingForm, EventSummary, BookingHeader } from "@/components/Booking";
import { getEventBySlug } from "@/lib/api/events";
import { EventNotFound } from "@/components/EventDetail/EventNotFound";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const { success, event, error } = await getEventBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: "booking" });
  const commonT = await getTranslations({ locale, namespace: "common" });
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (!success || error || !event) {
    return {
      title: t("errorTitle"),
      description: t("errorTitle"),
    };
  }

  return {
    title: `${t("bookYourTicket")} - ${event.title}`,
    description: `${t("bookYourTicket")} for ${event.title}. ${
      event.description
    }`,
    openGraph: {
      title: `${t("bookYourTicket")} - ${event.title}`,
      description: event.description,
      images: [event.imageUrl],
      type: "website",
      siteName: commonT("eventBooking"),
      url: `${BASE_URL}/${locale}/events/${event.slug}/book`,
      locale: locale,
      alternateLocale: locale === "en" ? "ar" : "en",
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("bookYourTicket")} - ${event.title}`,
      description: event.description,
      images: [event.imageUrl],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/events/${event.slug}/book`,
      languages: {
        en: `${BASE_URL}/en/events/${event.slug}/book`,
        ar: `${BASE_URL}/ar/events/${event.slug}/book`,
      },
    },
  };
}

export default async function BookTicketPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const { success, event, error } = await getEventBySlug(slug, locale);

  if (!success || error || !event) {
    return <EventNotFound />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <BookingHeader slug={slug} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BookingForm eventId={event.id} eventSlug={event.slug} />
        </div>

        <div className="lg:col-span-1">
          <EventSummary event={event} />
        </div>
      </div>
    </div>
  );
}
