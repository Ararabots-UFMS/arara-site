import { Target, Eye, Heart, LucideIcon } from "lucide-react";
import AnimatedGrid from "./AnimatedGrid";

interface PillarCardProps {
  category: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
}

const PillarCard = ({ category, title, subtitle, description, icon: Icon }: PillarCardProps) => {
  return (

    <section
      id="pilares"
      className="relative max-h-screen flex items-center pt-20 overflow"
    >
    <div className="bg-card rounded-3xl p-8 border border-border card-hover flex flex-col h-full">
      {/* Category Label */}
      <div className="flex justify-end mb-6">
        <span className="text-primary text-sm font-semibold">{category}</span>
      </div>

      {/* Icon */}
      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-primary" />
      </div>

      {/* Content */}
      <div className="flex-grow">
        <h3 className="text-2xl font-bold text-foreground mb-1">{title}</h3>
        <p className="text-primary text-sm font-medium mb-4">{subtitle}</p>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* Bottom decoration */}
      <div className="mt-8 pt-6 border-t border-primary/30">
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="w-2 h-2 rounded-full bg-primary" />
        </div>
      </div>
    </div>
    </section>
  );
};

const PillarsSection = () => {
  const pillars = [
    {
      category: "MOTIVAÇÃO",
      title: "MISSÃO",
      subtitle: "Nosso propósito",
      description:
        "Ir além da construção de robôs, buscando pela excelência e inovação através de parcerias colaborativas. Inspirar e moldar mentes jovens para a liderança tecnológica.",
      icon: Target,
    },
    {
      category: "OBJETIVO",
      title: "VISÃO",
      subtitle: "Onde Queremos Chegar",
      description:
        "Ser a principal referência acadêmica em competições de robótica no Brasil, fomentando o ecossistema de robótica educacional e inovação.",
      icon: Eye,
    },
    {
      category: "CULTURA",
      title: "VALORES",
      subtitle: "Nossos Princípios",
      description:
        "Inovação contínua, Integridade técnica, Excelência em execução, Respeito à diversidade e União em prol do conhecimento.",
      icon: Heart,
    },
  ];

  return (
    <section id="pilares" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-6">
          <h2 className="section-title">
            NOSSOS <span className="text-primary">PILARES</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4" />
        </div>

        {/* Subtitle */}
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-16">
          A AraraBots não é apenas sobre máquinas, mas sobre as pessoas e os
          princípios que guiam cada solda, cada linha de código e cada vitória.
        </p>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <PillarCard key={pillar.title} {...pillar} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;
