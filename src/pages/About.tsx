import { useEffect, useRef, useState, ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import AnimatedGrid from "@/components/AnimatedGrid";
import AnimatedParticles from "@/components/AnimatedParticles";
import eventPhoto from "../assets/eventPhoto.jpg";
import image2011 from "../assets/image2011.jpg";
import image2012 from "../assets/image2012.jpg";
import image2023 from "../assets/image2023.png";
import image2024 from "../assets/image2024.jpg";
import image2025 from "../assets/image2025.jpg";
import image2026 from "../assets/image2026.png";


// --- DADOS DA LINHA DO TEMPO ---
// Troque as URLs das imagens do Unsplash pelas fotos reais da equipe depois!
const TIMELINE_DATA = [
  {
    year: "2011",
    title: "Início do projeto",
    description: "O projeto Ararabots é fundado por Takashi, nascendo em conjunto com o LIA (Laboratório de Inteligência Artificial) da UFMS. A jornada inicia na categoria VSSS (Very Small Size Soccer).",
    image: image2011
  },
  {
    year: "2012",
    title: "Primeira competição",
    description: "Um ano após a fundação, a equipe realiza sua primeira participação oficial em competições de robótica, validando o trabalho desenvolvido no LIA.",
    image: image2012
  },
  {
    year: "2013 - 2023",
    title: "Evolução e pesquisa",
    description: "Anos dedicados ao aprimoramento de algoritmos de visão e estratégia. O grupo torna-se um pilar de pesquisa e extensão, formando gerações de desenvolvedores.",
    image: image2023
  },
  {
    year: "2024",
    title: "O Salto para SSL-EL",
    description: "A equipe sobe de patamar, ingressando na categoria SSL-EL (Entry Level). Robôs maiores, mais rápidos e sistemas de inteligência coletiva mais complexos.",
    image: image2024
  },
  {
    year: "2025",
    title: "Aprimoramento Técnico",
    description: "Foco total no desenvolvimento de hardware proprietário e integração de IA avançada, preparando o terreno para a elite da robótica mundial.",
    image: image2025
  },
  {
    year: "2026",
    title: "SSL-Regular",
    description: "O futuro é agora. O Ararabots entra na categoria SSL-Regular, competindo com os robôs mais sofisticados do planeta.",
    image: image2026
  }
];

// --- COMPONENTE DE ANIMAÇÃO CONTÍNUA (BORDAS INFINITAS) ---
const FadeInOnScroll = ({ children, delay = 0 }: { children: ReactNode, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Agora o estado atualiza continuamente: true se entrou na zona, false se saiu
        setIsVisible(entry.isIntersecting);
      });
    }, { 
      // A MÁGICA ESTÁ AQUI: 
      // -100px no topo e -100px na base criam um "ponto cego" nas bordas da tela.
      // O elemento começa a sumir antes de tocar a borda de cima ou de baixo.
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
          : "opacity-0 translate-y-8 scale-95 blur-sm" // Adicionei um blur e scale sutil para dar profundidade na saída
      }`}
      // O delay só é aplicado quando entra. Quando sai, zera para não ficar travado na tela.
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col font-spartan">
      <Helmet>
        <title>Sobre Nós | AraraBot</title>
        <meta name="description" content="Conheça a história, evolução e as conquistas da AraraBot, a equipe de robótica da UFMS." />
      </Helmet>

      <Header />

      <main className="flex-grow pb-12 md:pb-16">
        
        {/* =========================================
            SEÇÃO 1: QUEM SOMOS (Antigo AboutSection)
            ========================================= */}
        <section className="relative pt-24 md:pt-28 pb-12 md:pb-16 overflow-hidden">
          <AnimatedGrid />
          <AnimatedParticles />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/90 to-background z-[1]" />
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <FadeInOnScroll>
              <div className="mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide">
                  QUEM <span className="text-primary">SOMOS</span>
                </h2>
                <div className="w-24 h-1 bg-primary mt-4" />
              </div>
            </FadeInOnScroll>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeInOnScroll delay={100}>
                <div className="relative">
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary to-transparent opacity-20 blur-lg"></div>
                  <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <img
                      src={eventPhoto}
                      alt="Foto do Evento Robótica"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </FadeInOnScroll>

              <FadeInOnScroll delay={200}>
                <div className="space-y-8">
                  <p className="text-foreground text-base sm:text-lg leading-relaxed">
                    O <strong>Ararabots</strong> é a equipe de robótica da <strong className="text-primary">UFMS</strong>, voltada a competições e projetos de extensão. Promovemos o aprendizado em software, inteligência artificial, visão computacional, modelagem e impressão 3D, além de trabalho em equipe e gestão.
                  </p>
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                    Os integrantes são responsáveis pelo projeto dos robôs e pela administração da equipe, transformando desafios técnicos em soluções reais.
                  </p>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">A Categoria SSL</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A Small Size League (SSL) é uma categoria da RoboCup em que robôs autônomos competem em partidas de futebol em miniatura. Nessa modalidade, duas equipes, com até seis robôs cada, disputam partidas utilizando sistemas de visão computacional para identificar a posição da bola e dos robôs em tempo real e enviar comandos para suas ações durante o jogo.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">A Competição CBR</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A CBR Petrobras é a maior competição brasileira de robótica e inteligência artificial, reunindo diversas categorias reconhecidas pela RoboCup Federation e promovendo o desenvolvimento científico e tecnológico no país.
                    </p>
                  </div>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* =========================================
            SEÇÃO 2: NOSSA TRAJETÓRIA (TIMELINE)
            ========================================= */}
        <section className="relative py-16 md:py-24 bg-background">
              <AnimatedParticles />
          <div className="container mx-auto px-4 sm:px-6">
            
            {/* Título da Trajetória */}
            <FadeInOnScroll>
              <div className="text-center mb-16 md:mb-24">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide uppercase mb-2">
                  NOSSA TRAJETÓRIA
                </h2>
                <p className="text-primary font-bold tracking-[0.2em] text-sm uppercase">
                  Legado e Conquistas Tecnológicas
                </p>
              </div>
            </FadeInOnScroll>

{/* Container da Timeline */}
            <div className="relative max-w-5xl mx-auto">
              {/* A LINHA VERMELHA (Centralizada no desktop, à esquerda no mobile) */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent md:-translate-x-1/2 rounded-full" />

              {TIMELINE_DATA.map((item, index) => {
                // Alterna o layout: se for par, a imagem fica na esquerda. Se for ímpar, na direita.
                const isEven = index % 2 === 0;

                return (
                  <div 
                    key={item.year} 
                    // A MÁGICA ACONTECE AQUI: md:flex-row-reverse inverte a linha nos itens ímpares
                    className={`relative flex flex-col md:flex-row justify-between items-center w-full mb-16 md:mb-24 group pl-16 md:pl-0 ${isEven ? '' : 'md:flex-row-reverse'}`}
                  >
                    
                    {/* O PONTO VERMELHO NA LINHA */}
                    <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-primary rounded-full md:-translate-x-1/2 shadow-[0_0_15px_rgba(220,38,38,0.8)] z-10 top-12 md:top-1/2 -translate-y-1/2" />

                    {/* BLOCO DA IMAGEM */}
                    <div className="w-full md:w-[45%] mb-6 md:mb-0">
                      <FadeInOnScroll delay={isEven ? 100 : 200}>
                         <div className="relative rounded-2xl overflow-hidden border-2 border-primary/40 group-hover:border-primary transition-colors duration-500 shadow-xl">
                           <img src={item.image} alt={item.title} className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-700" />
                         </div>
                      </FadeInOnScroll>
                    </div>

                    {/* BLOCO DO TEXTO (CARD) */}
                    <div className={`w-full md:w-[45%] ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                      <FadeInOnScroll delay={isEven ? 200 : 100}>
                        <div className="bg-card/20 backdrop-blur-md border border-white/5 rounded-2xl p-5 sm:p-6 md:p-8 hover:bg-card/40 transition-colors duration-500 hover:border-primary/30">
                          <h3 className="text-primary font-bold text-2xl mb-1">{item.year}</h3>
                          <h4 className="text-2xl font-bold text-foreground mb-3">{item.title}</h4>
                          <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                      </FadeInOnScroll>
                    </div>

                  </div>
                  
                );
              })}
            </div>

          </div>
          
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default About;