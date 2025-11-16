"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export function EmptyState() {
  const t = useTranslations("tickets");
  const tCommon = useTranslations("common");

  return (
    <Card>
      <CardContent className="py-12 text-center">
        <p className="text-muted-foreground mb-4">{t("noTickets")}</p>
        <Link href="/events">
          <Button>{tCommon("browseEvents")}</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
