"use client";

import { useTranslations } from "next-intl";

interface EventsEmptyStateProps {
  message?: string;
}

export function EventsEmptyState({ message }: EventsEmptyStateProps) {
  const t = useTranslations("events");
  const defaultMessage = message || t("noEventsDescription");

  return (
    <div className="text-center py-12" role="status" aria-live="polite">
      <p className="text-muted-foreground">{defaultMessage}</p>
    </div>
  );
}

