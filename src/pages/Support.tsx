import { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import AnimatedGrid from "@/components/AnimatedGrid";
import { Loader2, RefreshCw } from "lucide-react";
import SupportContact from "@/components/SupportContact";
import AnimatedParticles from "@/components/AnimatedParticles";

// ==================== INTERFACE ====================
interface InventoryItem {
  id: number;
  component: string;
  model: string;
  qty: string;
  price: string;
}

// ==================== CONFIGURAÇÃO ====================
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzu85llkA3QWaoKjWDoqZQ_QRYHMW2duVKppxtJ4lVIPkkExaTKhirL2PuqvPc4-O_fJg/exec"; 
// ← Cole aqui a URL nova do Web App que você acabou de copiar

const Support = () => {
  const tableRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // ====================== CARREGAR DADOS ======================
  const fetchInventory = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await fetch(APPS_SCRIPT_URL);
      const data = await res.json();

      console.log("📦 Resposta da API:", JSON.stringify(data, null, 2));

      if (data.error) throw new Error(data.error);
      if (!Array.isArray(data)) throw new Error("Formato de resposta inválido");

      const formattedData = data
        .map((row: any, index: number) => {
          const values = Object.values(row) as string[];
          return {
            id: index,
            component: String(values[0] || ""),
            model: String(values[1] || ""),
            qty: String(values[2] || "0"),
            price: String(values[3] || "R$ 0"),
          };
        })
        .filter((row: InventoryItem) => row.component.trim() !== "");

      setInventory(formattedData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Erro ao carregar inventário:", error);
      setLoadError(error instanceof Error ? error.message : "Falha ao carregar inventário");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleRefresh = () => {
    fetchInventory();
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
          {/* ==================== HERO E CARDS (mantido igual) ==================== */}
          {/* ... seu código do hero e dos dois cards continua aqui igual ... */}

          {/* ==================== TABELA ==================== */}
          <div ref={tableRef} className="max-w-5xl mx-auto pt-12 pb-24 animate-fade-in">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white italic tracking-wider uppercase mb-2">
                  INVENTÁRIO SSL 2026
                </h2>
                <p className="text-muted-foreground font-semibold tracking-widest text-sm uppercase">
                  STATUS ATUAL DAS NECESSIDADES DO LABORATÓRIO
                </p>
                {lastUpdated && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Última atualização: {lastUpdated.toLocaleTimeString('pt-BR')}
                  </p>
                )}
              </div>

              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-3 rounded-full text-sm font-medium transition-all active:scale-95 disabled:opacity-70"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                Atualizar Lista
              </button>
            </div>

            <div className="bg-[#0A0A0A]/60 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden relative min-h-[300px]">
              {isLoading && (
                <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                  <Loader2 className="w-10 h-10 text-[#B91C1C] animate-spin mb-4" />
                  <p className="text-muted-foreground font-semibold tracking-wider text-sm">Atualizando...</p>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-muted-foreground/50 text-xs font-bold tracking-widest uppercase">
                      <th className="px-8 py-6">COMPONENTE</th>
                      <th className="px-8 py-6">MODELO</th>
                      <th className="px-8 py-6">QTD</th>
                      <th className="px-8 py-6">PREÇO EST.</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-semibold tracking-wide text-white/80">
                    {inventory.map((item) => (
                      <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-8 py-6 uppercase">{item.component}</td>
                        <td className="px-8 py-6 text-muted-foreground">{item.model}</td>
                        <td className="px-8 py-6">{item.qty}</td>
                        <td className="px-8 py-6 text-[#B91C1C]">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {!isLoading && inventory.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    Nenhum item encontrado.
                  </div>
                )}

                {!isLoading && loadError && (
                  <div className="text-center py-6 text-red-400 font-medium">
                    Erro ao carregar inventário: {loadError}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Seção de contato */}
          <div ref={contactRef} className="relative z-10 w-full">
            <SupportContact />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Support;