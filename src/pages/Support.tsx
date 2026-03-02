import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import AnimatedGrid from "@/components/AnimatedGrid";
import { Wallet, PackageOpen, Plus } from "lucide-react";
import SupportContact from "@/components/SupportContact";
import AnimatedParticles from "@/components/AnimatedParticles";

// --- DADOS MOCKADOS DA PLANILHA (Substituiremos pelo fetch do Google Sheets depois) ---
const INVENTORY_MOCK = [
  { id: 1, component: "MICROCONTROLADOR", model: "STM32F103C8T6", qty: 2, price: "R$ 70" },
  { id: 2, component: "DRIVER DE MOTOR", model: "A definir", qty: 4, price: "R$ 50" },
  { id: 3, component: "SOLENÓIDE", model: "Soletec Série C", qty: 2, price: "R$ 100" },
  { id: 4, component: "MOTOR DE DRIBBLER", model: "Rocket Mini Z", qty: 1, price: "R$ 280" },
  { id: 5, component: "MOTOR MOVIMENTAÇÃO", model: "IFlight GM3506", qty: 4, price: "R$ 168" },
  { id: 6, component: "BATERIA", model: "Lipo 3S/4S", qty: 1, price: "R$ 270" },
  { id: 7, component: "COMUNICADOR SEM FIO", model: "NRF24L01", qty: 1, price: "R$ 15" },
];

const Support = () => {
  // Referência para fazer o scroll suave até a tabela
  const tableRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToTable = () => {
    tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-spartan">
      <Helmet>
        <title>Apoie o Projeto | AraraBot</title>
        <meta name="description" content="Fortaleça a robótica universitária ajudando a equipe AraraBot com doações financeiras ou de componentes." />
      </Helmet>

      <Header />

      <main className="flex-grow pt-32 relative overflow-hidden">
        <AnimatedGrid />
        <AnimatedParticles />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/90 to-background z-[1]" />

        <div className="container mx-auto px-6 relative z-10">
          
          {/* =========================================
              SEÇÃO 1: HERO E OPÇÕES DE APOIO
              ========================================= */}
          <div className="max-w-4xl mx-auto mb-24 animate-fade-in">
                <h1 className="text-5xl md:text-6xl font-bold mb-8 tracking-wide text-center md:text-left">
                  Apoie nosso <span className="text-primary uppercase">projeto</span>
                </h1>
            
            <div className="space-y-4 text-lg md:text-xl text-white/90 font-medium mb-12 text-center md:text-left">
              <p>Apoie nosso projeto<br/>Fortalecendo a robótica universitária e a formação de engenheiros.</p>
              <p>Por isso, a ajuda externa é sempre uma excelente forma de incentivar o ensino, a tecnologia e a formação prática dentro da universidade.</p>
              <p>Atualmente, contamos com duas formas principais de apoio:</p>
            </div>

            {/* Grid de Botões/Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Card 1: Financeiro */}
              <div className="bg-[#0A0A0A]/80 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 flex flex-col h-full hover:border-[#B91C1C]/50 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#B91C1C]/10 rounded-xl flex items-center justify-center border border-[#B91C1C]/20 shrink-0">
                    <Wallet className="w-6 h-6 text-[#B91C1C]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Doação Financeira</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                  Contribuições em dinheiro são destinadas diretamente à compra de componentes, inscrições em competições e manutenção do robô.
                </p>
                <button
                  onClick={scrollToContact}
                  className="w-full bg-[#B91C1C] hover:bg-red-800 text-white font-bold rounded-full py-4 transition-colors shadow-lg shadow-red-900/20">
                  Apoiar Financeiramente
                </button>
              </div>

              {/* Card 2: Componentes */}
              <div className="bg-[#0A0A0A]/80 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 flex flex-col h-full hover:border-[#B91C1C]/50 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#B91C1C]/10 rounded-xl flex items-center justify-center border border-[#B91C1C]/20 shrink-0">
                    <PackageOpen className="w-6 h-6 text-[#B91C1C]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Doação de Componentes</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                  Empresas e apoiadores podem contribuir adquirindo itens da nossa lista técnica de necessidades, disponível para consulta.
                </p>
                <button 
                  onClick={scrollToTable}
                  className="w-full bg-[#B91C1C] hover:bg-red-800 text-white font-bold rounded-full py-4 transition-colors shadow-lg shadow-red-900/20"
                >
                  Ver Lista Técnica
                </button>
              </div>

            </div>
            
          </div>

          {/* =========================================
              SEÇÃO 2: TABELA DE INVENTÁRIO
              ========================================= */}
  
          <div ref={tableRef} className="max-w-5xl mx-auto pt-12 pb-24 animate-fade-in" style={{ animationDelay: "200ms" }}>
            
            {/* Cabeçalho da Tabela */}
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white italic tracking-wider uppercase mb-2">
                (FALTA IMPLEMENTAR)INVENTÁRIO SSL 2026
              </h2>
              <p className="text-muted-foreground font-semibold tracking-widest text-sm uppercase">
                STATUS ATUAL DAS NECESSIDADES DO LABORATÓRIO
              </p>
            </div>

            {/* Container da Tabela com borda fina */}
            <div className="bg-[#0A0A0A]/60 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  
                  {/* Headers da Tabela */}
                  <thead>
                    <tr className="border-b border-white/10 text-muted-foreground/50 text-xs font-bold tracking-widest uppercase">
                      <th className="px-8 py-6">COMPONENTE</th>
                      <th className="px-8 py-6">MODELO</th>
                      <th className="px-8 py-6">QTD</th>
                      <th className="px-8 py-6">PREÇO EST.</th>
                      <th className="px-8 py-6 text-center">AÇÃO</th>
                    </tr>
                  </thead>
                  
                  {/* Linhas (Rows) */}
                  <tbody className="text-sm font-semibold tracking-wide text-white/80">
                    {INVENTORY_MOCK.map((item) => (
                      <tr 
                        key={item.id} 
                        className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                      >
                        <td className="px-8 py-6 uppercase">{item.component}</td>
                        <td className="px-8 py-6 text-muted-foreground">{item.model}</td>
                        <td className="px-8 py-6">{item.qty}</td>
                        <td className="px-8 py-6 text-[#B91C1C]">{item.price}</td>
                        <td className="px-8 py-6 text-center">
                          <button className="text-[#B91C1C] hover:text-white transition-colors p-2 rounded-full hover:bg-[#B91C1C]/20 inline-flex items-center justify-center">
                            <Plus className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>

      <div ref={contactRef} className="relative z-10 w-full">
        <SupportContact />
      </div>

      </main>

      <Footer />
    </div>
  );
};

export default Support;