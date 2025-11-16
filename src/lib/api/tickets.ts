import { Ticket } from "@/types/tickets";

const API_BASE_URL = process.env.BASE_API_URL || "http://localhost:3000";

/**
 * Fetches all tickets from the API
 * @returns Promise resolving to an array of tickets
 */
export async function getTickets(): Promise<{
  success: boolean;
  tickets: Ticket[];
  error: string | null;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tickets`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return {
        success: false,
        tickets: [],
        error: `Failed to fetch tickets: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      tickets: data as Ticket[],
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
    // Fallback to direct import in case fetch fails during build
    return {
      success: false,
      tickets: [],
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
