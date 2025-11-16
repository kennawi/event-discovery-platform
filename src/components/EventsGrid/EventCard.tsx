"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Event } from "@/types/events";
import { Badge } from "../ui/badge";
import { Calendar, MapPin, Tag } from "lucide-react";
import Image from "next/image";
import { formatDate, formatPrice } from "@/utils/format";
import { Button } from "../ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function EventCard({ event }: { event: Event }) {
  const t = useTranslations("common");

  return (
    <Card
      key={event.id}
      className="flex flex-col hover:shadow-lg transition-shadow"
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2">{event.title}</CardTitle>
          {event.featured && <Badge variant="secondary">{t("featured")}</Badge>}
        </div>
        <CardDescription className="line-clamp-2">
          {event.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>
              {event.location.venue}, {event.location.city}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <Badge variant="outline">{event.category}</Badge>
          </div>
          <div className="text-lg font-semibold">
            {formatPrice(event.price)}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/events/${event.slug}`} className="w-full">
          <Button className="w-full">{t("viewDetails")}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
