import { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import AnimatedGrid from "@/components/AnimatedGrid";
import { Wallet, PackageOpen, Plus, Loader2 } from "lucide-react";
import SupportContact from "@/components/SupportContact";
import AnimatedParticles from "@/components/AnimatedParticles";
import Papa from "papaparse";

// --- INTERFACE DOS DADOS ---
interface InventoryItem {
  id: number;
  component: string;
  model: string;
  qty: string;
  price: string;
}

const Support = () => {
  const tableRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Estados para gerenciar os dados da planilha
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Link direto de exportação CSV da sua planilha real
  const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTc5p5pe5Ecxu7u61Smi1ZObYdtBYMOlaLdrxArSqT-lGtZmvjahtbkdDzUsE3-n3_HcSeA9yekwVc1/pub?gid=1148208878&single=true&output=csv";

  useEffect(() => {
    const fetchInventory = async () => {
      Papa.parse(GOOGLE_SHEETS_CSV_URL, {
        download: true,
        header: true,
        complete: (results) => {
          // Filtra linhas vazias verificando se a coluna 'Componente:' existe
          const formattedData = results.data
            .filter((row: any) => row["Componente:"] && row["Componente:"].trim() !== "") 
            .map((row: any, index) => ({
              id: index,
              // Mapeando exatamente com os nomes que estão na primeira linha do seu Sheets
              component: row["Componente:"] || "N/A",
              model: row["Nome"] || "N/A",
              qty: row["Quantidade"] || "0",
              price: row["Preço médio"] || "R$ 0",
            }));
            
          setInventory(formattedData);
          setIsLoading(false);
        },
        error: (error) => {
          console.error("Erro ao ler a planilha:", error);
          setIsLoading(false);
        }
      });
    };

    fetchInventory();
  }, []);

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
              Apoie nosso <span className="text-[#B91C1C] uppercase">projeto</span>
            </h1>
            
            <div className="space-y-4 text-lg md:text-xl text-white/90 font-medium mb-12 text-center md:text-left">
              <p>Fortalecendo a robótica universitária e a formação de engenheiros.</p>
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
                INVENTÁRIO SSL 2026
              </h2>
              <p className="text-muted-foreground font-semibold tracking-widest text-sm uppercase">
                STATUS ATUAL DAS NECESSIDADES DO LABORATÓRIO
              </p>
            </div>

            {/* Container da Tabela */}
            <div className="bg-[#0A0A0A]/60 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden relative min-h-[300px]">
              
              {/* Animação de Carregamento enquanto busca os dados do Sheets */}
              {isLoading && (
                <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                  <Loader2 className="w-10 h-10 text-[#B91C1C] animate-spin mb-4" />
                  <p className="text-muted-foreground font-semibold tracking-wider text-sm animate-pulse">
                    Sincronizando com a base de dados...
                  </p>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  
                  {/* Headers da Tabela */}
                  <thead>
                    <tr className="border-b border-white/10 text-muted-foreground/50 text-xs font-bold tracking-widest uppercase">
                      <th className="px-8 py-6">COMPONENTE</th>
                      <th className="px-8 py-6">MODELO</th>
                      <th className="px-8 py-6">QTD</th>
                      <th className="px-8 py-6">PREÇO EST.</th>
                    </tr>
                  </thead>
                  
                  {/* Linhas (Rows) Dinâmicas */}
                  <tbody className="text-sm font-semibold tracking-wide text-white/80">
                    {inventory.map((item) => (
                      <tr 
                        key={item.id} 
                        className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                      >
                        <td className="px-8 py-6 uppercase">{item.component}</td>
                        <td className="px-8 py-6 text-muted-foreground">{item.model}</td>
                        <td className="px-8 py-6">{item.qty}</td>
                        <td className="px-8 py-6 text-[#B91C1C]">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>

                {/* Mensagem caso não tenha nada na planilha */}
                {!isLoading && inventory.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    Nenhum item pendente no inventário.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            SEÇÃO 3: FORMULÁRIO DE APOIO
            ========================================= */}
        <div ref={contactRef} className="relative z-10 w-full">
          <SupportContact />
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Support;