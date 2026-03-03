import { useEffect, useRef, useState, ReactNode } from "react";
import { PiggyBank, Medal, Trophy, Diamond, CheckCircle2, ChevronRight } from "lucide-react";
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

// --- DADOS ATUALIZADOS DOS RANKS (Conforme tabela da chefe) ---
const RANKS = [
  {
    name: "BRONZE",
    price: "R$ 2.000",
    icon: <PiggyBank className="w-12 h-12 mb-4 text-[#D08752]" strokeWidth={1.5} />,
    color: "border-[#D08752]",
    shadow: "shadow-[#D08752]/10",
    features: [
      "Logomarca pequena na Camiseta",
      "Stories no Instagram",
      "Publicidade pequena no Site",
      "Destaques no Instagram",
      "Relatório do Projeto"
    ]
  },
  {
    name: "PRATA",
    price: "R$ 4.000",
    icon: <Medal className="w-12 h-12 mb-4 text-[#C0C0C0]" strokeWidth={1.5} />,
    color: "border-[#C0C0C0]",
    shadow: "shadow-[#C0C0C0]/10",
    features: [
      "Logomarca pequena na Camiseta",
      "Stories no Instagram",
      "Publicidade média no Site",
      "Destaques no Instagram",
      "Post de Agradecimento",
      "Logo pequena no Banner",
      "Feed no Instagram",
      "Relatório do Projeto"
    ]
  },
  {
    name: "OURO",
    price: "R$ 7.000",
    icon: <Trophy className="w-12 h-12 mb-4 text-[#FFD700]" strokeWidth={1.5} />,
    color: "border-[#FFD700]",
    shadow: "shadow-[#FFD700]/10",
    features: [
      "Logomarca média na Camiseta",
      "Stories no Instagram",
      "Publicidade média no Site",
      "Destaques no Instagram",
      "Post de Agradecimento",
      "Logo média no Banner",
      "Feed no Instagram",
      "Posts Fixados",
      "Agradecimento em Live",
      "Disponibilidade de Serviços",
      "Workshops e Palestras (1x/mês)",
      "Relatório do Projeto"
    ]
  },
  {
    name: "DIAMANTE", // Atualizado de Platina para Diamante
    price: "R$ 10.000",
    icon: <Diamond className="w-12 h-12 mb-4 text-[#00FFFF]" strokeWidth={1.5} />,
    color: "border-[#00FFFF]",
    shadow: "shadow-[#00FFFF]/10",
    features: [
      "Logomarca grande na Camiseta",
      "Stories no Instagram",
      "Publicidade grande no Site",
      "Destaques no Instagram",
      "Post de Agradecimento",
      "Logo grande no Banner",
      "Feed no Instagram",
      "Posts Fixados",
      "Agradecimento em Live",
      "Disponibilidade de Serviços",
      "Workshops e Palestras (1x/mês)",
      "Logomarca no Robô",
      "Vídeo Personalizado dos patrocinadores",
      "Propriedade de Exposição",
      "Relatório do Projeto"
    ]
  }
];

const Rankings = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById("formulario-patrocinio");
    formSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-24 relative z-10 font-spartan">
      <AnimatedParticles />
      <div className="container mx-auto px-6">
        
        {/* Título */}
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold uppercase tracking-widest text-foreground">
              RANKS
            </h2>
            <div className="w-32 h-1.5 bg-[#B91C1C] mx-auto mt-2 shadow-[0_0_10px_rgba(185,28,28,0.5)]" />
          </div>
        </FadeIn>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {RANKS.map((rank, index) => (
            <FadeIn key={rank.name} delay={index * 150}>
              <div 
                className={`bg-[#111111] rounded-[2.5rem] p-8 flex flex-col items-center h-[600px] border-b-[6px] ${rank.color} hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_8px_rgba(220,38,38,0.3)] ${rank.shadow} group`}
              >
                
                {/* Ícone, Nome e Preço */}
                <div className="flex flex-col items-center mb-6 pt-2 shrink-0">
                  {rank.icon}
                  <h3 className="text-2xl font-semibold tracking-wider text-white mb-2">
                    {rank.name}
                  </h3>
                  <div className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest mr-1">A partir de</span>
                    <span className="text-sm font-bold text-white tracking-wider">{rank.price}</span>
                  </div>
                </div>

                {/* Lista de Benefícios (Com Scroll Interno) */}
                <div className="w-full mb-6 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                  <div className="space-y-4">
                    {rank.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#B91C1C] fill-[#B91C1C]/20 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-white/80 tracking-wide leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>


                {/* Botão */}
                <button 
                  onClick={scrollToForm}
                  className="w-full bg-[#991B1B] hover:bg-[#B91C1C] text-white rounded-full py-3 px-6 flex items-center justify-between transition-colors shadow-lg shadow-red-900/20 shrink-0"
                >
                  <span className="text-sm font-semibold tracking-wider">
                    Escolher este rank
                  </span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
              </div>
            </FadeIn>
          ))}
        </div>

      </div>

      {/* Estilos do Scrollbar Interno dos Cards */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(185, 28, 28, 0.5); /* Vermelho translúcido */
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(185, 28, 28, 1); /* Vermelho sólido no hover */
        }
      `}} />
    </section>
  );
};

export default Rankings;