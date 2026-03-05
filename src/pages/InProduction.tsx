import { Link } from "react-router-dom";
import { Wrench } from "lucide-react";
import { Helmet } from "react-helmet-async";

const InProduction = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background font-spartan relative overflow-hidden">
      <Helmet>
        <title>Em Construção | AraraBots</title>
      </Helmet>

      {/* Efeito visual de fundo leve */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#B91C1C]/10 via-background to-background z-0" />

      <div className="text-center flex flex-col items-center relative z-10 px-6">
        {/* Ícone animado */}
        <div className="bg-[#111111] p-6 rounded-full border border-white/10 shadow-xl shadow-red-900/20 mb-8 animate-bounce" style={{ animationDuration: '3s' }}>
          <Wrench className="w-12 h-12 text-[#B91C1C]" />
        </div>
        
        <h1 className="mb-4 text-4xl md:text-5xl font-bold text-white uppercase tracking-wider">
          Oficina em <span className="text-[#B91C1C]">Trabalho</span>
        </h1>
        
        <p className="mb-10 text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
          Nossos engenheiros estão finalizando a montagem do modelo 3D. Volte em breve para explorar cada detalhe do nosso robô!
        </p>
        
        <Link 
          to="/" 
          className="border border-[#B91C1C] text-[#B91C1C] px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-[#B91C1C] hover:text-white transition-all duration-300"
        >
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
};

export default InProduction;
