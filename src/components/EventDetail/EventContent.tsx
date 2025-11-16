import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/events";

interface EventContentProps {
  event: Event;
}

export function EventContent({ event }: EventContentProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline">{event.category}</Badge>
          {event.featured && <Badge variant="secondary">Featured</Badge>}
        </div>
        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
        <p className="text-lg text-muted-foreground mb-6">
          {event.longDescription || event.description}
        </p>

        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {event.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

