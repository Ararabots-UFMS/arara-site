import oficina14 from "@/assets/oficina_14.jpeg";

export type EventStatus = "open" | "soon" | "soldout";

export type EventItem = {
  title: string;
  date?: Date;
  dateText?: string;
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

export const events: EventItem[] = [
  {
    title: "Hackaton",
    date: new Date(2026, 3, 4),
    location: "",
    status: "soon",
    description: "",
    secondaryAction: {
      label: "Ver no Instagram",
      href: "https://www.instagram.com/ararabots/",
      external: true,
      instagram: true,
    },
  },
  {
    title: "Genius com carcaça em impressão 3D",
    date: new Date(2026, 3, 25),
    location: "",
    status: "soon",
    description: "",
    secondaryAction: {
      label: "Ver no Instagram",
      href: "https://www.instagram.com/ararabots/",
      external: true,
      instagram: true,
    },
  },
  {
    title: "Piano com PCB",
    date: new Date(2026, 5, 20),
    location: "",
    status: "soon",
    description: "",
    secondaryAction: {
      label: "Ver no Instagram",
      href: "https://www.instagram.com/ararabots/",
      external: true,
      instagram: true,
    },
  },
  {
    title: "Apresentação dos projetos dos calouros",
    dateText: "Data a definir",
    location: "",
    status: "soon",
    description: "",
    secondaryAction: {
      label: "Ver no Instagram",
      href: "https://www.instagram.com/ararabots/",
      external: true,
      instagram: true,
    },
  },
  {
    title: "Alimentador de pet automático",
    date: new Date(2026, 9, 17),
    location: "",
    status: "soon",
    description: "",
    secondaryAction: {
      label: "Ver no Instagram",
      href: "https://www.instagram.com/ararabots/",
      external: true,
      instagram: true,
    },
  },
];

export const formatEventDate = (date: Date) =>
  date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
  });

export const getStatusLabel = (status: EventStatus) => {
  if (status === "open") return "Inscrições Abertas";
  if (status === "soldout") return "Vagas Esgotadas";
  return "Em Breve";
};
