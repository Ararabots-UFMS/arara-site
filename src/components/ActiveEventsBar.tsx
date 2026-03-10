import { Calendar, MapPin, Clock, ArrowRight, Instagram, Zap, Timer } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import AnimatedParticles from "./AnimatedParticles";
import oficina14 from "@/assets/oficina_14.jpeg";


type EventStatus = "open" | "soon" | "soldout";

type EventItem = {
  id: "oficina" | "proxima";
  title: string;
  date: Date;
  time?: string;
  location: string;
  status: EventStatus;
  description: string;
  image?: string;
  primaryAction?: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryAction?: {
    label: string;
    href: string;
    external?: boolean;
    instagram?: boolean;
  };
};

const formatEventDate = (date: Date) =>
  date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
  });

const getDaysUntil = (date: Date) => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diff = eventStart.getTime() - todayStart.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const getStatusLabel = (status: EventStatus) => {
  if (status === "open") return "Inscrições Abertas";
  if (status === "soldout") return "Vagas Esgotadas";
  return "Em Breve";
};

const ActiveEventsBar = () => {
  const events: EventItem[] = useMemo(
    () => [
      {
        id: "oficina",
        title: "Oficina de Robótica Prática",
        date: new Date(2026, 2, 14),
        time: "08h às 11h",
        location: "Living Lab (Rua Brasil, 205)",
        status: "soldout",
        image: oficina14,
        description:
          "A nossa próxima missão já tem data marcada! A equipe AraraBots preparou uma oficina exclusiva para quem quer sair da teoria e colocar a mão na massa. Essa é a sua chance de vivenciar o laboratório e aprender as bases da robótica de forma prática e colaborativa.",
        secondaryAction: {
          label: "Ver no Instagram",
          href: "https://www.instagram.com/p/DVqzQ4RjTHO/",
          external: true,
          instagram: true,
        },
      },
      {
        id: "proxima",
        title: "Próxima Oficina",
        date: new Date(2026, 3, 25),
        location: "Living Lab",
        status: "soon",
        description:
          "Próximo evento da equipe AraraBots. Em breve as informações completas serão divulgadas. Fique ligado no Instagram para não perder nenhuma novidade.",
        secondaryAction: {
          label: "Seguir no Instagram",
          href: "https://www.instagram.com/ararabots/",
          external: true,
          instagram: true,
        },
      },
    ],
    []
  );    

  const nearestEvent = useMemo(() => {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return events.find((event) => event.date >= todayStart) ?? events[events.length - 1];
  }, [events]);

  const [selectedEvent, setSelectedEvent] = useState<EventItem["id"]>(nearestEvent.id);

  const selectedEventData = events.find((event) => event.id === selectedEvent) ?? events[0];
  const daysUntilNearest = getDaysUntil(nearestEvent.date);

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, card: EventItem["id"]) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedEvent(card);
    }
  };

  const handleAction = (
    event: React.MouseEvent,
    action?: { href: string; external?: boolean }
  ) => {
    event.stopPropagation();
    if (!action) return;
    if (action.external) {
      window.open(action.href, "_blank");
      return;
    }
    window.location.href = action.href;
  };

  return (
    <div className="relative overflow-hidden py-6 md:py-8">
      <AnimatedParticles />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col gap-6 md:gap-8">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <div className="h-[2px] w-8 bg-primary" />
              <span className="text-xs font-bold uppercase tracking-widest">Próximas Atividades</span>
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
                Próximo evento: {nearestEvent.title} em {formatEventDate(nearestEvent.date)}
                {daysUntilNearest >= 0 ? ` (${daysUntilNearest} dias)` : ""}
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {events.map((eventCard) => {
              const isSelected = selectedEvent === eventCard.id;
              return (
                <div
                  key={eventCard.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedEvent(eventCard.id)}
                  onKeyDown={(event) => handleCardKeyDown(event, eventCard.id)}
                  className={`relative group overflow-hidden rounded-xl border bg-gradient-to-br p-4 backdrop-blur-lg transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                    isSelected
                      ? "border-primary/60 from-card/70 to-card/30 shadow-[0_0_20px_rgba(185,28,28,0.28)]"
                      : "border-white/10 from-card/50 to-card/20 hover:border-primary/30"
                  }`}
                >
                  <div className="pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-red-700/20 blur opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {eventCard.image && (
                    <img
                      src={eventCard.image}
                      alt={eventCard.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <span
                        className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                          eventCard.status === "open"
                            ? "bg-primary text-primary-foreground"
                            : eventCard.status === "soldout"
                              ? "bg-red-900/60 text-red-100 border border-red-700/60"
                              : "border border-white/15 bg-card/80 text-muted-foreground"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            eventCard.status === "open"
                              ? "bg-primary-foreground"
                              : eventCard.status === "soldout"
                                ? "bg-red-200"
                                : "bg-muted-foreground"
                          }`}
                        />
                        {getStatusLabel(eventCard.status)}
                      </span>

                      <p className="font-semibold text-foreground text-sm md:text-base">{eventCard.title}</p>
                      <div className="mt-2 space-y-1 text-xs md:text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-primary flex-shrink-0" />
                          <span>{formatEventDate(eventCard.date)}</span>
                        </div>
                        {eventCard.time && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-primary flex-shrink-0" />
                            <span>{eventCard.time}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-primary flex-shrink-0" />
                          <span>{eventCard.location}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-3">{eventCard.description}</div>
                      </div>
                    </div>
                    {eventCard.status === "open" && <Zap className="h-5 w-5 text-primary" />}
                  </div>

                  <div className="flex flex-col gap-2 mt-3">
                    {eventCard.primaryAction && (
                      <Button
                        onClick={(event) => handleAction(event, eventCard.primaryAction)}
                        size="sm"
                        className="w-full bg-primary hover:bg-primary/90 text-white text-xs md:text-sm h-8 md:h-9 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                      >
                        {eventCard.primaryAction.label}
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    )}

                    {eventCard.secondaryAction && (
                      <Button
                        onClick={(event) => handleAction(event, eventCard.secondaryAction)}
                        size="sm"
                        variant="outline"
                        className="w-full text-primary border-primary/30 hover:bg-primary/10 text-xs md:text-sm h-8 md:h-9 flex items-center justify-center gap-2"
                      >
                        {eventCard.secondaryAction.instagram && <Instagram className="h-3 w-3" />}
                        {eventCard.secondaryAction.label}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveEventsBar;
