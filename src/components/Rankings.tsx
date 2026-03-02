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

// --- DADOS DOS RANKS ---
const RANKS = [
  {
    name: "BRONZE",
    icon: <PiggyBank className="w-12 h-12 mb-4 text-[#D08752]" strokeWidth={1.5} />,
    color: "border-[#D08752]",
    // Mantive a sombra base sutil colorida, mas adicionei a lógica do hover vermelho no componente
    shadow: "shadow-[#D08752]/10", 
    features: ["LOGO MINI NO UNIFORME", "POST INSTAGRAM"]
  },
  {
    name: "PRATA",
    icon: <Medal className="w-12 h-12 mb-4 text-[#C0C0C0]" strokeWidth={1.5} />,
    color: "border-[#C0C0C0]",
    shadow: "shadow-[#C0C0C0]/10",
    features: ["LOGO PEQUENA NO UNIFORME", "POST INSTAGRAM"]
  },
  {
    name: "OURO",
    icon: <Trophy className="w-12 h-12 mb-4 text-[#FFD700]" strokeWidth={1.5} />,
    color: "border-[#FFD700]",
    shadow: "shadow-[#FFD700]/10",
    features: ["LOGO MÉDIA NO UNIFORME", "POST INSTAGRAM"]
  },
  {
    name: "PLATINA",
    icon: <Diamond className="w-12 h-12 mb-4 text-[#00FFFF]" strokeWidth={1.5} />,
    color: "border-[#00FFFF]",
    shadow: "shadow-[#00FFFF]/10",
    features: ["LOGO GRANDE NO UNIFORME", "POST INSTAGRAM"]
  }
];

const Rankings = () => {
  return (
    <section className="py-24 relative z-10 font-spartan">

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {RANKS.map((rank, index) => (
            <FadeIn key={rank.name} delay={index * 150}>
              <div 
                // A MÁGICA ACONTECE AQUI 👇
                // 1. Mudamos 'transition-transform' para 'transition-all'
                // 2. Mudamos 'hover:shadow-2xl' para um glow vermelho manual intenso: 'hover:shadow-[0_0_30px_8px_rgba(220,38,38,0.3)]'
                className={`bg-[#111111] rounded-[2.5rem] p-8 flex flex-col items-center h-full border-b-[6px] ${rank.color} hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_8px_rgba(220,38,38,0.3)] ${rank.shadow}`}
              >
                
                {/* Ícone e Nome */}
                <div className="flex flex-col items-center mb-8 pt-4">
                  {rank.icon}
                  <h3 className="text-2xl font-semibold tracking-wider text-foreground">
                    {rank.name}
                  </h3>
                </div>

                {/* Lista de Benefícios */}
                <div className="w-full space-y-4 mb-10 flex-grow">
                  {rank.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#B91C1C] fill-[#B91C1C]/20 shrink-0" />
                      <span className="text-sm font-medium text-foreground/80 tracking-wide">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Botão */}
                <button className="w-full bg-[#991B1B] hover:bg-[#B91C1C] text-white rounded-full py-3 px-6 flex items-center justify-between transition-colors shadow-lg shadow-red-900/20 group mt-auto">
                  <span className="text-sm font-semibold tracking-wider">
                    escolher este rank
                  </span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Rankings;