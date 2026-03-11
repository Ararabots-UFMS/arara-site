import Header from "@/components/Header";
import TechAssembly from "@/components/TechAssembly";
import { Footer } from "react-day-picker";
import { Helmet } from "react-helmet-async";

const Robot = () => {
  return (
    // "h-screen" e "overflow-hidden" travam a página na tela cheia, sem barra de rolagem!
    <div className="bg-[#050505] text-white font-spartan relative w-full h-screen overflow-hidden">
      <Helmet>
        <title>Nosso Robô | AraraBots</title>
      </Helmet>

      {/* Header Fixo no topo sobrepondo o cenário 3D */}
      <div className="absolute top-0 w-full z-50">
        <Header />
      </div>

      {/* Grade sutil de fundo para manter a vibe de "blueprint" de engenharia */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#B91C1C 1px, transparent 1px), linear-gradient(90deg, #B91C1C 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* O Componente 3D interagindo em 100% do espaço da tela */}
      <div className="absolute inset-0 w-full h-full z-10">
        <TechAssembly />
      </div>
    </div>
  );
};

export default Robot;