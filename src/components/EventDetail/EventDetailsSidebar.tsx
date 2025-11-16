"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, User, Users, DollarSign } from "lucide-react";
import { Event } from "@/types/events";
import { formatPrice, formatDateRange } from "@/utils/format";
import { useTranslations } from "next-intl";

interface EventDetailsSidebarProps {
  event: Event;
}

export function EventDetailsSidebar({ event }: EventDetailsSidebarProps) {
  const { date, time, endTime } = formatDateRange(event.date, event.endDate);
  const attendancePercentage = (event.attendeeCount / event.maxAttendees) * 100;
  const isSoldOut = event.attendeeCount >= event.maxAttendees;
  const t = useTranslations("eventDetail");

  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-8">
        <CardHeader>
          <CardTitle>{t("eventDetails")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar
              className="h-5 w-5 text-muted-foreground mt-0.5"
              aria-hidden="true"
            />
            <div>
              <p className="font-medium">{date}</p>
              <p className="text-sm text-muted-foreground">
                {time}
                {endTime && ` - ${endTime}`}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin
              className="h-5 w-5 text-muted-foreground mt-0.5"
              aria-hidden="true"
            />
            <div>
              <p className="font-medium">{event.location.venue}</p>
              <p className="text-sm text-muted-foreground">
                {event.location.city}, {event.location.state}
              </p>
              <p className="text-sm text-muted-foreground">
                {event.location.country}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <DollarSign
              className="h-5 w-5 text-muted-foreground mt-0.5"
              aria-hidden="true"
            />
            <div>
              <p className="font-medium text-lg">{formatPrice(event.price)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Users
              className="h-5 w-5 text-muted-foreground mt-0.5"
              aria-hidden="true"
            />
            <div className="flex-1">
              <p className="font-medium">
                {event.attendeeCount} / {event.maxAttendees} attendees
              </p>
              <div
                className="w-full bg-muted rounded-full h-2 mt-2"
                role="progressbar"
                aria-valuenow={event.attendeeCount}
                aria-valuemin={0}
                aria-valuemax={event.maxAttendees}
              >
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{
                    width: `${attendancePercentage}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <User
              className="h-5 w-5 text-muted-foreground mt-0.5"
              aria-hidden="true"
            />
            <div>
              <p className="font-medium">{t("organizer")}</p>
              <p className="text-sm text-muted-foreground">
                {event.organizer.name}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t">
            {isSoldOut ? (
              <Button className="w-full" size="lg" disabled>
                {t("soldOut")}
              </Button>
            ) : (
              <Link href={`/events/${event.slug}/book`} className="w-full">
                <Button className="w-full" size="lg">
                  {t("bookTicket")}
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
