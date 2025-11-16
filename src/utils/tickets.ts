import { Ticket } from "@/types/tickets";
import { formatPrice } from "./format";

/**
 * Formats a date with time for ticket display
 */
export const formatTicketDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

/**
 * Generates HTML content for printing a ticket
 */
export const generateTicketPrintContent = (ticket: Ticket): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Ticket - ${ticket.eventTitle}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            max-width: 600px;
            margin: 0 auto;
          }
          .ticket-header {
            border-bottom: 2px solid #000;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
          .ticket-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .ticket-info {
            margin: 15px 0;
          }
          .ticket-info-label {
            font-weight: bold;
            display: inline-block;
            width: 120px;
          }
          .ticket-footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ccc;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
          @media print {
            body {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="ticket-header">
          <div class="ticket-title">Event Ticket</div>
          <div style="font-size: 14px; color: #666;">Ticket ID: ${ticket.id}</div>
        </div>
        
        <div class="ticket-info">
          <span class="ticket-info-label">Event:</span>
          <span>${ticket.eventTitle}</span>
        </div>
        
        <div class="ticket-info">
          <span class="ticket-info-label">Attendee:</span>
          <span>${ticket.attendeeName}</span>
        </div>
        
        <div class="ticket-info">
          <span class="ticket-info-label">Email:</span>
          <span>${ticket.attendeeEmail}</span>
        </div>
        
        <div class="ticket-info">
          <span class="ticket-info-label">Mobile:</span>
          <span>${ticket.attendeeMobile}</span>
        </div>
        
        <div class="ticket-info">
          <span class="ticket-info-label">Event Date:</span>
          <span>${formatTicketDate(ticket.eventDate)}</span>
        </div>
        
        <div class="ticket-info">
          <span class="ticket-info-label">Booking Date:</span>
          <span>${formatTicketDate(ticket.bookingDate)}</span>
        </div>
        
        <div class="ticket-info">
          <span class="ticket-info-label">Price:</span>
          <span>${formatPrice(ticket.price)}</span>
        </div>
        
        <div class="ticket-info">
          <span class="ticket-info-label">Status:</span>
          <span style="text-transform: capitalize;">${ticket.status}</span>
        </div>
        
        <div class="ticket-footer">
          <p>Please bring this ticket (or a digital copy) to the event.</p>
          <p>For any inquiries, please contact the event organizer.</p>
        </div>
      </body>
    </html>
  `;
};

/**
 * Opens a print window with ticket content
 */
export const printTicket = (ticket: Ticket): void => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    console.error("Failed to open print window");
    return;
  }

  const printContent = generateTicketPrintContent(ticket);

  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.focus();
  
  setTimeout(() => {
    printWindow.print();
  }, 250);
};

