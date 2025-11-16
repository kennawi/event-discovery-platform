"use client";

import ControlledSelect from "@/components/ControlledSelect";
import DatePicker from "@/components/DatePicker";
import { useTranslations } from "next-intl";

interface EventsFiltersProps {
  categories: string[];
  locations: string[];
  selectedCategory: string;
  selectedLocation: string;
  selectedDate: Date | undefined;
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
  onDateChange: (date: Date | undefined) => void;
}

export function EventsFilters({
  categories,
  locations,
  selectedCategory,
  selectedLocation,
  selectedDate,
  onCategoryChange,
  onLocationChange,
  onDateChange,
}: EventsFiltersProps) {
  const t = useTranslations("events");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ControlledSelect
        options={[
          { label: t("allCategories"), value: "all" },
          ...categories.map((cat) => ({ label: cat, value: cat })),
        ]}
        value={selectedCategory}
        onChange={onCategoryChange}
        placeholder={t("allCategories")}
        label={t("category")}
      />
      <ControlledSelect
        options={[
          { label: t("allLocations"), value: "all" },
          ...locations.map((loc) => ({ label: loc, value: loc })),
        ]}
        value={selectedLocation}
        onChange={onLocationChange}
        placeholder={t("allLocations")}
        label={t("location")}
      />
      <DatePicker
        value={selectedDate}
        onChange={onDateChange}
        placeholder={t("selectDate")}
        label={t("date")}
      />
    </div>
  );
}

