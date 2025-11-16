"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function EventNotFound() {
  const t = useTranslations("eventDetail");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">{t("eventNotFound")}</h1>
        <p className="text-muted-foreground mb-4">
          {t("eventNotFoundDescription")}
        </p>
        <Link href="/events">
          <Button>{t("backToEvents")}</Button>
        </Link>
      </div>
    </div>
  );
}
