import AnimatedGrid from "./AnimatedGrid";

const AchievemantSection = () => {
  return (
    <section
      id="conquistas"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      <AnimatedGrid inverted />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-[1]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="hero-title text-foreground mb-6">
              NOSSAS
              <br />
              CONQUISTAS
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              A equipe AraraBots tem se destacado em competições de robótica, conquistando prêmios e reconhecimento por sua inovação e desempenho.  
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#projetos"
                className="bg-foreground text-background px-4 py-4 rounded-full font-semibold hover:bg-foreground/90 transition-colors"
              >
                Nossos Projetos
              </a>
              <a
                href="#equipe"
                className="border-2 border-primary text-foreground px-4 py-4 rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Conheça a Equipe
              </a>
            </div>
          </div>

          <div className="animate-slide-in-right hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-red-600 to-transparent opacity-20 blur-lg"></div>

              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://source.unsplash.com/800x600/?trophy"
                  alt="Conquistas da Equipe AraraBots"
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

export default AchievemantSection;