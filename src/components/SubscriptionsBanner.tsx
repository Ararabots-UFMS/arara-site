import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Imagens de hackathons passados
import hackathon1 from "@/assets/hackathon-1.jpeg";
import hackathon2 from "@/assets/hackathon-2.jpeg";
import hackathon3 from "@/assets/hackathon-3.jpeg";
import hackathon4 from "@/assets/hackathon-4.jpeg";

const hackathonImages = [
  {
    src: hackathon1,
    alt: "Hackathon AraraBot 2025.1 - Equipes trabalhando",
  },
  {
    src: hackathon2,
    alt: "Hackathon AraraBot 2025.1 - Apresentação de projetos",
  },
  {
    src: hackathon3,
    alt: "Hackathon AraraBot 2025.1 - Robôs em ação",
  },
  {
    src: hackathon4,
    alt: "Hackathon AraraBot 2025.1 - Premiação",
  },
];

const SubscriptionsBanner = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Seção de Texto */}
        <div className="text-center space-y-6">
          {/* Badge de Inscrições Abertas */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 text-sm font-semibold text-primary">
            <Calendar className="w-4 h-4" />
            Inscrições Abertas - Fase 1: Inscrição Online
          </div>
          
          {/* Título */}
          <h2 className="text-3xl md:text-4xl font-bold">
            Hackathon <span className="text-primary">AraraBots</span> 2026
          </h2>
          
          {/* Descrição do Hackathon */}
          <div className="text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto space-y-4">
            <p>
              Um hackathon é uma maratona de inovação em que estudantes se reúnem para desenvolver soluções tecnológicas em um curto período de tempo. Trabalhando em equipe, os participantes enfrentam um desafio prático, aplicando conhecimentos técnicos, criatividade e colaboração para construir protótipos funcionais.
            </p>
            <p>
              No nosso caso, o hackathon é voltado para a área de robótica, com desenvolvimento utilizando a plataforma Arduino. Ao longo do evento, as equipes contam com mentoria especializada para apoiar na construção das soluções, desde a ideia inicial até a apresentação final.
            </p>
            <p>
              Mais do que uma competição, é uma <span className="text-primary font-semibold">experiência imersiva</span> de aprendizado, troca de conhecimento e desenvolvimento de habilidades técnicas e interpessoais, cculminando na apresentação dos projetos desenvolvidos pelas equipes.
            </p>
          </div>
        </div>

        {/* Carrossel de Imagens */}
        <div className="max-w-3xl mx-auto space-y-3">
          <p className="text-sm text-center text-muted-foreground">
            Fotos do Hackathon AraraBot 2025.1
          </p>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {hackathonImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-1">
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-muted border border-white/10">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback caso a imagem não exista
                          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225'%3E%3Crect width='400' height='225' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%239ca3af'%3EImagem do Hackathon%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Botão de Ação */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="h-14 px-10 text-lg font-bold rounded-lg shadow-lg shadow-primary/20 group/btn"
            asChild
          >
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdP0QAhAjzWePOA1RWnHK6LA4dZ8q3Cz50UYDWNN0Lw-e-B8w/viewform" target="_blank" rel="noopener noreferrer">
              Inscreva-se Agora
              <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>

      </div>
    </div>
  );
};

export default SubscriptionsBanner;
