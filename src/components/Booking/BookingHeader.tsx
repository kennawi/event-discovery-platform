"use client";

import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

interface BookingHeaderProps {
  slug: string;
}

export function BookingHeader({ slug }: BookingHeaderProps) {
  const t = useTranslations("booking");

  return (
    <Link
      href={`/events/${slug}`}
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      {t("backToEventDetails")}
    </Link>
  );
}
