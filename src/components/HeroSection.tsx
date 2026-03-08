import AnimatedGrid from "./AnimatedGrid";
import teamPhoto from "../assets/teamPhoto.png";
import AnimatedParticles from "./AnimatedParticles";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      <AnimatedGrid/>
      <AnimatedParticles />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="hero-title text-foreground mb-6">
              MOLDANDO
              <br />
              O <span className="text-primary">FUTURO</span> DA ROBÓTICA
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Equipe AraraBots: Unindo tecnologia, paixão e engenharia para
              vencer os maiores desafios competitivos da robótica universitária.
            </p>
            <div className="flex flex-wrap gap-4">



            <div className="text-center">
              <Button 
                size="lg" 
                className="h-14 px-10 text-lg font-bold rounded-lg shadow-lg shadow-red-900/20 group/btn bg-[#FFFFFF] hover:bg-gray-200 text-black"
                asChild
              >
                <Link to="/publicacoes">
                  Nossas Publicações
                  </Link>
              </Button>
            </div>

            <div className="text-center">
              <Button 
                size="lg"
                className="h-14 px-10 text-lg font-bold rounded-lg shadow-lg shadow-red-900/20 group/btn bg-[#B91C1C] hover:bg-red-800 text-white transition-colors"
                  >
                  <Link to="/sobre">
                    Conheça a Equipe
                  </Link>
                </Button>
            </div>
          </div>
        </div>

          <div className="animate-slide-in-right hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-red-600 to-transparent opacity-20 blur-lg"></div>

              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={teamPhoto}
                  alt="Equipe AraraBot"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
