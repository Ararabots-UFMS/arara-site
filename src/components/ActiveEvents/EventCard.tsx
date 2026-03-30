import { EventItem, formatEventDate, getStatusLabel } from "@/data/events";
import {
  ArrowRight,
  Instagram,
  Calendar,
  Clock,
  MapPin,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: EventItem;
}

const EventCard = ({ event }: EventCardProps) => {
  const handleAction = (action?: { href: string; external?: boolean }) => {
    if (!action) return;
    if (action.external) {
      window.open(action.href, "_blank");
      return;
    }
    window.location.href = action.href;
  };

  return (
    <div className="relative group overflow-hidden rounded-xl border bg-gradient-to-br p-4 backdrop-blur-lg transition-all duration-300 border-white/10 from-card/50 to-card/20 hover:border-primary/30 flex-1">
      <div className="pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-red-700/20 blur opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-32 object-cover rounded-lg mb-3"
        />
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <span
            className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
              event.status === "open"
                ? "bg-primary text-primary-foreground"
                : event.status === "soldout"
                  ? "bg-red-900/60 text-red-100 border border-red-700/60"
                  : "border border-white/15 bg-card/80 text-muted-foreground"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                event.status === "open"
                  ? "bg-primary-foreground"
                  : event.status === "soldout"
                    ? "bg-red-200"
                    : "bg-muted-foreground"
              }`}
            />
            {getStatusLabel(event.status)}
          </span>

          <p className="font-semibold text-foreground text-sm md:text-base">
            {event.title}
          </p>
          <div className="mt-2 space-y-1 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 text-primary flex-shrink-0" />
              <span>
                {event.date ? formatEventDate(event.date) : event.dateText}
              </span>
            </div>
            {event.time && (
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-primary flex-shrink-0" />
                <span>{event.time}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-primary flex-shrink-0" />
              <span>{event.location}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-3">
              {event.description}
            </div>
          </div>
        </div>
        {event.status === "open" && <Zap className="h-5 w-5 text-primary" />}
      </div>

      <div className="flex flex-col gap-2 mt-3">
        {event.primaryAction && (
          <Button
            onClick={() => handleAction(event.primaryAction)}
            size="sm"
            className="w-full bg-primary hover:bg-primary/90 text-white text-xs md:text-sm h-8 md:h-9 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            {event.primaryAction.label}
            <ArrowRight className="h-3 w-3" />
          </Button>
        )}

        {event.secondaryAction && (
          <Button
            onClick={() => handleAction(event.secondaryAction)}
            size="sm"
            variant="outline"
            className="w-full text-primary border-primary/30 hover:bg-primary/10 text-xs md:text-sm h-8 md:h-9 flex items-center justify-center gap-2"
          >
            {event.secondaryAction.instagram && (
              <Instagram className="h-3 w-3" />
            )}
            {event.secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
