import { useEffect, useRef, useState, ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import AnimatedGrid from "@/components/AnimatedGrid";
import AnimatedParticles from "@/components/AnimatedParticles";
// Lembre-se de trocar para a imagem com o mascote (crochê)
import sponsorshipHero from "@/assets/image2026.png"; 
import Rankings from "@/components/Rankings";
import SponsorWheel from "@/components/SponsorWheel";
import SponsorContact from "@/components/SponsorContact";

// --- COMPONENTE DE ANIMAÇÃO (Reutilizado do About) ---
const FadeInOnScroll = ({ children, delay = 0 }: { children: ReactNode, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    }, { 
      rootMargin: "-100px 0px -100px 0px",
      threshold: 0.1 
    });

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible 
          ? "opacity-100 translate-y-0 scale-100 blur-none" 
          : "opacity-0 translate-y-8 scale-95 blur-sm"
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

const Sponsorship = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col font-spartan">
      <Helmet>
        <title>Seja um Patrocinador | AraraBot</title>
        <meta name="description" content="Apoie a inovação e conecte sua marca ao futuro da robótica com a AraraBot." />
      </Helmet>

      <Header />

      <main className="flex-grow relative overflow-hidden">
        
        {/* =========================================
            SEÇÃO 1: APRESENTAÇÃO (Estilo AboutSection)
            ========================================= */}
        <section className="relative pt-32 py-16 overflow-hidden">
          <AnimatedGrid />
          <AnimatedParticles />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10  to-background z-[1]" />

          <div className="container mx-auto px-6 relative z-10">
            
            {/* Título e Subtítulo centralizados */}
            <FadeInOnScroll>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">
                  PATROCÍNIO
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto mt-4 mb-6" />
                <h3 className="text-2xl md:text-3xl font-bold text-foreground/90">
                  Saiba como nos apoiar
                </h3>
              </div>
            </FadeInOnScroll>

            {/* Grid de Conteúdo (Imagem + Textos) */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              <FadeInOnScroll delay={100}>
                <div className="relative">
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary to-transparent opacity-20 blur-lg"></div>
                  <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <img
                      src={sponsorshipHero}
                      alt="Equipe Ararabots segurando o mascote"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </FadeInOnScroll>

              <FadeInOnScroll delay={200}>
                <div className="space-y-8">
                  <p className="text-foreground text-xl md:text-2xl font-bold leading-relaxed">
                    Queremos você como patrocinador da nossa equipe!
                  </p>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Torne-se um patrocinador bronze, prata, ouro ou diamante! Como estudantes, contamos com o apoio de parceiros para continuar desenvolvendo nossos projetos e representando a universidade em competições e eventos de robótica.                  </p>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Com o seu patrocínio, você contribui diretamente para o desenvolvimento dos nossos robôs, a participação da equipe em competições nacionais e a formação prática de estudantes por meio de atividades de ensino, pesquisa e extensão.
                  </p>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      O que isso significa para você?
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Além de apoiar um grupo jovem, dedicado e inovador, sua empresa também ganha visibilidade ao se associar a um projeto acadêmico e tecnológico. Você também terá contato com alunos talentosos de diversos cursos da UFMS, futuros profissionais das áreas de engenharia, computação e inovação.
                    </p>
                    <p className="mt-4 font-semibold text-foreground">
                      Abaixo você encontrará os possíveis pacotes de patrocínio e as vantagens que podemos oferecer.
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      Desde já agradecemos pelo seu apoio e interesse em fortalecer a robótica universitária.
                    </p>
                  </div>
                </div>
              </FadeInOnScroll>
              
            </div>
          </div>
        </section>

        {/* =========================================
            SEÇÃO 2: RANKS (Bronze, Prata, Ouro, Platina)
            Será implementada no próximo passo...
            ========================================= */}
          
        <Rankings />

         {/* ========================================= */}

          {/* SEÇÃO 3: RODA DE PATROCÍNIO (Visualização Interativa) */}

          <SponsorWheel />

         {/* ========================================= */}

          {/* SEÇÃO 4: CONTATO PARA PROPOSTAS DE PATROCÍNIO */}

          <div id="formulario-patrocinio">
            <SponsorContact />
          </div>

      </main>

      <Footer />
    </div>
  );
};

export default Sponsorship;