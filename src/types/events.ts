export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  date: string; // Use string for JSON serialization
  endDate?: string;
  location: {
    venue: string;
    city: string;
    state: string;
    country: string;
  };
  category: string;
  tags: string[];
  imageUrl: string;
  price: number | "free";
  attendeeCount: number;
  maxAttendees: number;
  organizer: {
    name: string;
    avatar: string;
  };
  featured: boolean;
  createdAt: string;
}
