"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

interface EventsSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function EventsSearchBar({
  value,
  onChange,
  placeholder,
}: EventsSearchBarProps) {
  const t = useTranslations("events");
  const defaultPlaceholder = placeholder || t("searchPlaceholder");

  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
        aria-hidden="true"
      />
      <Input
        type="text"
        placeholder={defaultPlaceholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
        aria-label={t("searchPlaceholder")}
      />
    </div>
  );
}

