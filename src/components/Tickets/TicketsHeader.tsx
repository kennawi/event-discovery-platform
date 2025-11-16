"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function TicketsHeader() {
  const t = useTranslations("tickets");
  const tCommon = useTranslations("common");

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <Link href="/events">
        <Button variant="outline">{tCommon("browseEvents")}</Button>
      </Link>
    </div>
  );
}
