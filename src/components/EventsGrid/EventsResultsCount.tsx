"use client";

import { useTranslations } from "next-intl";

interface EventsResultsCountProps {
  count: number;
}

export function EventsResultsCount({ count }: EventsResultsCountProps) {
  const t = useTranslations("events");

  return (
    <div className="text-sm text-muted-foreground" role="status" aria-live="polite">
      {t("resultsCount", { count })}
    </div>
  );
}

