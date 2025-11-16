import tickets from "@/mock/tickets.json";
import { Ticket } from "@/types/tickets";

export async function GET() {
  // Simulate API delay
  await new Promise((r) => setTimeout(r, 300));

  return Response.json(tickets as Ticket[]);
}
