import eventsEn from "@/mock/events.en.json";
import eventsAr from "@/mock/events.ar.json";
import { Event } from "@/types/events";

export async function GET(request: Request) {
  // Simulate API delay
  await new Promise((r) => setTimeout(r, 300));

  // Get locale from query parameter or Accept-Language header or default to 'en'
  const url = new URL(request.url);
  const localeParam = url.searchParams.get("locale");
  const acceptLanguage = request.headers.get("accept-language") || "en";
  const locale = localeParam || (acceptLanguage.startsWith("ar") ? "ar" : "en");

  const events = locale === "ar" ? eventsAr : eventsEn;

  return Response.json(events as Event[]);
}
