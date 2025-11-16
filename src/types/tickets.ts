export interface Ticket {
  id: string;
  eventId: string;
  eventSlug: string;
  eventTitle: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeeMobile: string;
  eventDate: string;
  bookingDate: string;
  price: number | "free";
  status: "confirmed" | "cancelled";
}

export interface BookingFormData {
  name: string;
  email: string;
  mobile: string;
  date: string;
}

