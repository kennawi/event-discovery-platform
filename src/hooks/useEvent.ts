import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Event } from "@/types/events";

export function useEvent(slug: string) {
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/events/${slug}`);

        if (!res.ok) {
          if (res.status === 404) {
            router.push("/events");
            return;
          }
          throw new Error("Failed to fetch event");
        }

        const data = await res.json();
        setEvent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        router.push("/events");
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchEvent();
    }
  }, [slug, router]);

  return { event, loading, error };
}
