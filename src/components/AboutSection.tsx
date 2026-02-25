import backgroundGrid from "@/assets/background-grid.png";
import AnimatedGrid from "./AnimatedGrid";
import eventPhoto from "../assets/eventPhoto.png";

const AboutSection = () => {
  return (
    <section
      id="sobre"
      className="relative py-24 overflow-hidden font-spartan"
    >
        <AnimatedGrid inverted />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-[1]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title">
              SOBRE <span className="text-primary">NÓS</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4" />
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-red-600 to-transparent opacity-20 blur-lg"></div>
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={eventPhoto}
                  alt="Foto do Evento Robótica"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
          </div>
          <div className="space-y-8">
            <p className="text-foreground text-lg leading-relaxed">
              O Ararabots é a equipe de robótica da UFMS, voltada a competições
              e projetos de extensão. Promovemos o aprendizado em software,
              inteligência artificial, visão computacional, modelagem e
              impressão 3D, além de trabalho em equipe e gestão.
            </p>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-bold text-foreground mb-2">
                A Categoria SSL
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A Small Size League (SSL) é uma categoria da RoboCup onde robôs
                autônomos jogam futebol em miniatura. Esta liga impulsiona o
                avanço em robótica autônoma, controlo em tempo real e visão
                computacional.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-bold text-foreground mb-2">
                A Competição CBR
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A CBR Petrobras é a maior competição brasileira de robótica e
                inteligência artificial, reunindo diversas categorias
                reconhecidas pela RoboCup Federation e promovendo o
                desenvolvimento científico e tecnológico no país.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
