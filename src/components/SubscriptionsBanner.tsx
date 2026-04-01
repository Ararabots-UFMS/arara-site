import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
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
import AnimatedParticles from "@/components/AnimatedParticles";

const hackathonImages = [
  {
    src: hackathon1,
    alt: "Hackathon AraraBots 2025.1 - Equipes trabalhando",
  },
  {
    src: hackathon2,
    alt: "Hackathon AraraBots 2025.1 - Apresentação de projetos",
  },
  {
    src: hackathon3,
    alt: "Hackathon AraraBots 2025.1 - Robôs em ação",
  },
  {
    src: hackathon4,
    alt: "Hackathon AraraBots 2025.1 - Premiação",
  },
];

const SubscriptionsBanner = () => {
  return (
    // 1. O contêiner pai agora é relative e oculta o que vazar
    <div className="relative overflow-hidden py-16 font-spartan">
      
      {/* 2. As partículas ficam soltas aqui no fundo */}
      <AnimatedParticles />

      {/* 3. O conteúdo inteiro fica numa div com z-10 para ficar na frente das partículas */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto space-y-10">
          
          {/* Seção de Texto */}
          <div className="text-center space-y-6">
            {/* Badge de Inscrições */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#B91C1C]/10 rounded-full border border-[#B91C1C]/20 text-sm font-semibold text-[#B91C1C]">
              <Calendar className="w-4 h-4" />

              Inscrições Encerradas
            </div>
            
            {/* Título */}
            <h2 className="text-3xl md:text-4xl font-bold">
              Hackathon <span className="text-[#B91C1C]">AraraBots</span> 2026
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
                Mais do que uma competição, é uma <span className="text-[#B91C1C] font-semibold">experiência imersiva</span> de aprendizado, troca de conhecimento e desenvolvimento de habilidades técnicas e interpessoais, culminando na apresentação dos projetos desenvolvidos pelas equipes.
              </p>
            </div>
          </div>

          {/* Carrossel de Imagens */}
          <div className="max-w-3xl mx-auto space-y-3">
            <p className="text-sm text-center text-muted-foreground">
              Fotos do Hackathon AraraBots 2025.1
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
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-[#111111] border border-white/10 group">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            // Fallback caso a imagem não exista
                            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225'%3E%3Crect width='400' height='225' fill='%23111111'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%23666666'%3EImagem Indisponível%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 border-white/10 bg-black/50 hover:bg-[#B91C1C] hover:text-white" />
              <CarouselNext className="right-2 border-white/10 bg-black/50 hover:bg-[#B91C1C] hover:text-white" />
            </Carousel>
          </div>

          {/* Botão de Ação */}
          <div className="text-center">
            <Button
              size="lg"
              className="h-14 px-10 text-lg font-bold rounded-lg shadow-lg shadow-red-900/20 bg-[#B91C1C] text-white"
              disabled
            >
              Inscrições Encerradas
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SubscriptionsBanner;