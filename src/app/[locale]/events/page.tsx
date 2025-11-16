import { EventsGrid } from "@/components/EventsGrid";
import { Metadata } from "next";
import { getEvents } from "@/lib/api/events";
import { generateEventsCollectionStructuredData } from "@/utils/structuredData";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "events" });
  const commonT = await getTranslations({ locale, namespace: "common" });
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: t("title"),
    description: t("searchPlaceholder"),
    openGraph: {
      title: t("title"),
      description: t("searchPlaceholder"),
      type: "website",
      siteName: commonT("eventBooking"),
      url: `${BASE_URL}/${locale}/events`,
      locale: locale,
      alternateLocale: locale === "en" ? "ar" : "en",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("searchPlaceholder"),
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/events`,
      languages: {
        en: `${BASE_URL}/en/events`,
        ar: `${BASE_URL}/ar/events`,
      },
    },
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { events } = await getEvents(locale);
  const t = await getTranslations({ locale });
  const structuredData = generateEventsCollectionStructuredData(
    events || [],
    locale,
    {
      title: t("events.title"),
      description: t("events.searchPlaceholder"),
    }
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t("events.title")}</h1>
        <EventsGrid initialEvents={events || []} />
      </div>
    </>
  );
}
