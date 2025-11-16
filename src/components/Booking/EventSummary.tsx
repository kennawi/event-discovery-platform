"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@/types/events";
import { formatDate, formatPrice } from "@/utils/format";
import { useTranslations } from "next-intl";

interface EventSummaryProps {
  event: Event;
}

export function EventSummary({ event }: EventSummaryProps) {
  const t = useTranslations("booking");

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>{t("eventSummary")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg">{event.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {event.description}
          </p>
        </div>
        <div className="pt-4 border-t space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("date")}:</span>
            <span className="font-medium">{formatDate(event.date)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("location")}:</span>
            <span className="font-medium">
              {event.location.city}, {event.location.state}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("price")}:</span>
            <span className="font-medium text-lg">
              {formatPrice(event.price)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
