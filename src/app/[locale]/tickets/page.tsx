import { getTickets } from "@/lib/api/tickets";
import {
  SuccessMessage,
  EmptyState,
  TicketsTable,
  TicketsHeader,
} from "@/components/Tickets";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tickets" });
  const commonT = await getTranslations({ locale, namespace: "common" });
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: t("title"),
    description: t("yourBookedTickets"),
    openGraph: {
      title: t("title"),
      description: t("yourBookedTickets"),
      type: "website",
      siteName: commonT("eventBooking"),
      url: `${BASE_URL}/${locale}/tickets`,
      locale: locale,
      alternateLocale: locale === "en" ? "ar" : "en",
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("yourBookedTickets"),
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/tickets`,
      languages: {
        en: `${BASE_URL}/en/tickets`,
        ar: `${BASE_URL}/ar/tickets`,
      },
    },
  };
}

export default async function TicketsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { success, tickets, error } = await getTickets();

  return (
    <div className="container mx-auto px-4 py-8">
      <TicketsHeader />

      <SuccessMessage />

      {!success || error ? (
        <div className="container mx-auto px-4 py-8">
          <p className="text-red-500">{error}</p>
        </div>
      ) : tickets.length === 0 ? (
        <EmptyState />
      ) : (
        <TicketsTable tickets={tickets} />
      )}
    </div>
  );
}
