import { useEffect, useRef, useState, ReactNode } from "react";
import TORMEC from "@/assets/TORMEC.png";
import BATLAB from "@/assets/BATLAB.png";
import AnimatedParticles from "./AnimatedParticles";

// --- COMPONENTE DE ANIMAÇÃO LOCAL ---
const FadeIn = ({ children, delay = 0 }: { children: ReactNode, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    }, { rootMargin: "-50px 0px", threshold: 0.1 });

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

// ==========================================
// IMPORTAÇÃO DAS LOGOS DOS PATROCINADORES
// ==========================================
const SPONSORS = [

  { id: 2, name: "BATLAB", logo: BATLAB },       
  { id: 3, name: "TORMEC", logo: TORMEC },       

];

const SponsorWheel = () => {
  return (
    <section className="py-24 relative z-10 font-spartan overflow-hidden">
      <AnimatedParticles />
      <div className="container mx-auto px-6">
        
        {/* Título Estilo Pílula */}
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-block border border-white/10 bg-[#0A0A0A]/60 backdrop-blur-xl rounded-full px-8 md:px-12 py-4 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold tracking-widest uppercase">
                <span className="text-white">NOSSOS </span>
                <span className="text-primary drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]">PATROCINADORES</span>
              </h2>
            </div>
          </div>
        </FadeIn>

        {/* Roleta de Patrocinadores (AGORA MAIOR) */}
        <FadeIn delay={200}>
          <div className="relative max-w-[1400px] mx-auto"> {/* Aumentei o max-w para caber a roleta gigante */}
            
            {/* Linha Superior */}
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" />

            {/* Container do Carrossel */}
            <div className="relative flex overflow-hidden group">
              {/* Sombras laterais maiores para acompanhar o novo tamanho */}
              <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

              {/* Trilha em Movimento (Espaçamento aumentado para space-x-8 md:space-x-12) */}
              <div className="flex space-x-8 md:space-x-12 animate-infinite-scroll whitespace-nowrap py-4 hover:[animation-play-state:paused] cursor-default">
                {[...SPONSORS, ...SPONSORS, ...SPONSORS].map((sponsor, idx) => (
                  <div
                    key={`${sponsor.id}-${idx}`}
                    // A MÁGICA DO TAMANHO ACONTECE AQUI 👇
                    // Largura: w-64 até lg:w-96 | Altura: h-32 até lg:h-48 | Bordas: rounded-3xl
                    className="w-64 md:w-80 lg:w-96 h-32 md:h-40 lg:h-48 bg-[#111111]/80 backdrop-blur-md border border-white/5 rounded-3xl flex items-center justify-center shrink-0 hover:border-primary/50 hover:bg-card/40 transition-colors duration-300 group/card shadow-lg"
                  >
                    <span className="text-muted-foreground font-bold text-2xl lg:text-3xl tracking-widest group-hover/card:text-white transition-colors">

                    </span>
                    <img 
                      src={sponsor.logo}
                      className="max-w-[80%] max-h-[70%] object-contain opacity-60 group-hover/card:opacity-100 transition-opacity duration-300 grayscale group-hover/card:grayscale-0" 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Linha Inferior */}
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-12" />
            
          </div>
        </FadeIn>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-infinite-scroll {
          /* Deixei um pouco mais lento (25s) porque os itens estão maiores */
          animation: infinite-scroll 25s linear infinite; 
          width: max-content;
        }
      `}} />
    </section>
  );
};

export default SponsorWheel;