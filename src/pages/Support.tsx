import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Heart, Users } from "lucide-react";
import AnimatedParticles from "@/components/AnimatedParticles";

const Support = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Apoie a Equipe | AraraBot</title>
        <meta name="description" content="Contribua diretamente para o crescimento e manutenção da equipe AraraBot." />
      </Helmet>

      <Header />

      <main className="flex-grow pt-24 pb-16">
        <AnimatedParticles />
        <div className="container mx-auto px-6">
          
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center p-3 bg-red-500/10 rounded-full mb-6">
              <Heart className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              (EM PRODUÇÃO) Apoie Nossa <span className="text-primary">Jornada</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Sua contribuição ajuda a manter nossos robôs operacionais, custear viagens para competições e fomentar o ensino de robótica.
            </p>
          </div>

          {/* Placeholder para Campanhas/Vakinha/Pix */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-20">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-card/40 border border-white/5 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group">
                <div className="h-40 bg-white/5 rounded-xl mb-6 flex items-center justify-center">
                  <Users className="w-10 h-10 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Opção de Apoio {item}</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Descrição breve de como este apoio ajuda a equipe (ex: Pix, Vakinha, Material).
                </p>
                <Button variant="outline" className="w-full border-white/10 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                  Contribuir
                </Button>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;