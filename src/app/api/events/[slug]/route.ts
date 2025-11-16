import eventsEn from "@/mock/events.en.json";
import eventsAr from "@/mock/events.ar.json";
import { Event } from "@/types/events";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Get locale from query parameter or Accept-Language header or default to 'en'
  const url = new URL(request.url);
  const localeParam = url.searchParams.get("locale");
  const acceptLanguage = request.headers.get("accept-language") || "en";
  const locale = localeParam || (acceptLanguage.startsWith("ar") ? "ar" : "en");

  const events = locale === "ar" ? eventsAr : eventsEn;
  const event = (events as Event[]).find((e) => e.slug === slug);

  if (!event) {
    return Response.json({ error: "Event not found" }, { status: 404 });
  }

  return Response.json(event as Event);
}
