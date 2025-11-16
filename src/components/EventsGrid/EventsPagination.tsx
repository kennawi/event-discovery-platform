"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface EventsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export function EventsPagination({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}: EventsPaginationProps) {
  const t = useTranslations("pagination");

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8" role="navigation" aria-label="Pagination">
      <Button
        variant="outline"
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        {t("previous")}
      </Button>
      <span className="text-sm text-muted-foreground" aria-current="page">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        {t("next")}
      </Button>
    </div>
  );
}

