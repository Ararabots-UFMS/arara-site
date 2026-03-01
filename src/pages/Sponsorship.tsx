import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowRight, Handshake } from "lucide-react";
import AnimatedParticles from "@/components/AnimatedParticles";

const Sponsorship = () => {
  return (

    

    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Seja um Patrocinador | AraraBot</title>
        <meta name="description" content="Apoie a inovação e conecte sua marca ao futuro da robótica com a AraraBot." />
      </Helmet>

      <Header />

      <main className="flex-grow pt-24 pb-16">

        <AnimatedParticles />
        <div className="container mx-auto px-6">
          {/* Hero da Página */}
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
              <Handshake className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
               (EM PRODUÇÃO) Invista no <span className="text-primary">Futuro</span> da Tecnologia
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Torne-se um parceiro da AraraBot e ajude a impulsionar o desenvolvimento de novas tecnologias, educação e inovação no cenário nacional.
            </p>
          </div>

          {/* Área de Conteúdo (Placeholder para receber código depois) */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="bg-card/30 border border-white/5 rounded-3xl p-8 h-80 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
              <p className="text-muted-foreground font-medium z-10">
                [Espaço para Benefícios do Patrocinador]
              </p>
            </div>
            <div className="bg-card/30 border border-white/5 rounded-3xl p-8 h-80 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
              <p className="text-muted-foreground font-medium z-10">
                [Espaço para Cotas de Patrocínio]
              </p>
            </div>
          </div>

          {/* CTA Final */}
          <div className="text-center bg-card/50 border border-white/10 rounded-3xl p-12 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Pronto para fazer a diferença?</h3>
            <p className="text-muted-foreground mb-8">
              Entre em contato conosco e conheça nosso Mídia Kit completo.
            </p>
            <Button size="lg" className="rounded-full px-8">
              Quero ser um Patrocinador <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sponsorship;