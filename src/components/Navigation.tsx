"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, Ticket } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Navigation() {
  const t = useTranslations("common");

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/events" className="text-xl font-bold">
            <span className="hidden sm:inline">{t("eventBooking")}</span>
            <span className="sm:hidden">EB</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/events">
              <Button variant="ghost" className="gap-2">
                <Calendar className="h-4 w-4" />
                {t("events")}
              </Button>
            </Link>
            <Link href="/tickets">
              <Button variant="ghost" className="gap-2">
                <Ticket className="h-4 w-4" />
                {t("myTickets")}
              </Button>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
