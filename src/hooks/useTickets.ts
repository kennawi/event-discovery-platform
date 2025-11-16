import { useState, useEffect } from "react";
import { Ticket } from "@/types/tickets";

interface UseTicketsReturn {
  tickets: Ticket[];
  loading: boolean;
  error: Error | null;
}

export function useTickets(): UseTicketsReturn {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTickets() {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch("/api/tickets");
        
        if (!res.ok) {
          throw new Error(`Failed to fetch tickets: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to fetch tickets");
        setError(error);
        console.error("Failed to fetch tickets:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTickets();
  }, []);

  return { tickets, loading, error };
}

