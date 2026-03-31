import { Timer } from "lucide-react";
import { useMemo } from "react";
import AnimatedParticles from "../AnimatedParticles";
import {
  events,
  formatEventDate,
  getStatusLabel,
} from "@/data/events";
import EventCarousel from "./EventCarousel";

const getDaysUntil = (date: Date) => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const diff = eventStart.getTime() - todayStart.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const ActiveEventsBar = () => {
  const nearestEvent = useMemo(() => {
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    return (
      events.find((event) => event.date >= todayStart) ??
      events[events.length - 1]
    );
  }, []);

  const daysUntilNearest = getDaysUntil(nearestEvent.date);

  return (
    <div id="agenda" className="relative overflow-hidden py-6 md:py-8">
      <AnimatedParticles />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col gap-6 md:gap-8">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <div className="h-[2px] w-8 bg-primary" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Próximas Atividades
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-foreground">
              Arara <span className="text-primary">Agenda</span>
            </h3>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-card/40 p-4 md:p-5 backdrop-blur-sm">
            <div className="flex flex-wrap items-center gap-3 text-sm text-foreground">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-primary-foreground animate-pulse" />
                {getStatusLabel(nearestEvent.status)}
              </span>
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <Timer className="h-4 w-4 text-primary" />
                Próximo evento: {nearestEvent.title} em{" "}
                {formatEventDate(nearestEvent.date)}
                {daysUntilNearest >= 0 ? ` (${daysUntilNearest} dias)` : ""}
              </span>
            </div>
          </div>

          <EventCarousel events={events} />
        </div>
      </div>
    </div>
  );
};

export default ActiveEventsBar;
