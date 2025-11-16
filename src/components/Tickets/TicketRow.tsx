"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Printer, Calendar } from "lucide-react";
import { Ticket } from "@/types/tickets";
import { formatTicketDate, printTicket } from "@/utils/tickets";
import { formatPrice } from "@/utils/format";
import { useTranslations } from "next-intl";

interface TicketRowProps {
  ticket: Ticket;
}

export function TicketRow({ ticket }: TicketRowProps) {
  const t = useTranslations("common");

  return (
    <TableRow key={ticket.id}>
      <TableCell>
        <div>
          <Link
            href={`/events/${ticket.eventSlug}`}
            className="font-medium hover:underline"
          >
            {ticket.eventTitle}
          </Link>
        </div>
      </TableCell>
      <TableCell>
        <div>
          <div className="font-medium">{ticket.attendeeName}</div>
          <div className="text-sm text-muted-foreground">
            {ticket.attendeeEmail}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{formatTicketDate(ticket.eventDate)}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="font-medium">{formatPrice(ticket.price)}</div>
      </TableCell>
      <TableCell>
        <Badge
          variant={ticket.status === "confirmed" ? "default" : "destructive"}
        >
          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <Button variant="outline" size="sm" onClick={() => printTicket(ticket)}>
          <Printer className="h-4 w-4 mr-2" />
          {t("print")}
        </Button>
      </TableCell>
    </TableRow>
  );
}
