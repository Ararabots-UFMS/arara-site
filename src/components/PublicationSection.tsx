import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // <--- Importação Nova
import { Search, Calendar, ArrowRight, Filter, ArrowUpDown, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnimatedParticles from "./AnimatedParticles";
import ReadPublication, { Publication } from "./ReadPublication";
import { usePublications } from "@/hooks/usePublications";

const CATEGORIES = ["Todos", "Artigo", "Competição", "Extensão"];

const PublicationCardSkeleton = () => (
  <Card className="bg-card/40 backdrop-blur-md border-white/5 overflow-hidden flex flex-col h-full">
    <div className="h-48 w-full border-b border-white/5">
      <Skeleton className="h-full w-full bg-white/5" />
    </div>
    <CardHeader className="pb-3 pt-5 space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-20 rounded-full bg-white/10" />
        <Skeleton className="h-4 w-24 rounded-md bg-white/5" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-full bg-white/10" />
        <Skeleton className="h-6 w-2/3 bg-white/10" />
      </div>
    </CardHeader>
    <CardContent className="flex-grow space-y-2">
      <Skeleton className="h-4 w-full bg-white/5" />
      <Skeleton className="h-4 w-full bg-white/5" />
      <Skeleton className="h-4 w-4/5 bg-white/5" />
    </CardContent>
    <CardFooter className="pt-0 pb-6">
      <Skeleton className="h-10 w-full rounded-xl bg-white/10" />
    </CardFooter>
  </Card>
);

const parseDate = (dateStr: string) => {
  const mapMonths: { [key: string]: number } = {
    Jan: 0, Fev: 1, Mar: 2, Abr: 3, Mai: 4, Jun: 5,
    Jul: 6, Ago: 7, Set: 8, Out: 9, Nov: 10, Dez: 11
  };
  const parts = dateStr.replace(",", "").split(" ");
  if (parts.length !== 3) return new Date();
  const day = parseInt(parts[0], 10);
  const month = mapMonths[parts[1]];
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
};

const PublicationSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedYear, setSelectedYear] = useState("all");
  
  // Hook para manipular a URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Estados de controle do Modal e Loading
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const { data: publications = [], isLoading, isError } = usePublications();

  // EFEITO 1: Simulação de Loading e Verificação da URL ao iniciar
useEffect(() => {
    if (!isLoading && publications.length > 0) {
      const pubIdFromUrl = searchParams.get("publicacao");
      if (pubIdFromUrl) {
        const publicationFound = publications.find(p => p.id.toString() === pubIdFromUrl);
        if (publicationFound && publicationFound.type === "internal") {
          setSelectedPublication(publicationFound);
          setIsReaderOpen(true);
          const section = document.getElementById("publicacoes");
          if (section) section.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [isLoading, publications, searchParams]);

  const availableYears = useMemo(() => {
    const years = new Set(publications.map(pub => {
      const parts = pub.date.split(" ");
      return parts[parts.length - 1];
    }));
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }, [publications]);

  const filteredPublications = useMemo(() => {
    let result = publications.filter((pub) => {
      const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            pub.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "Todos" || pub.category === activeCategory;
      const pubYear = pub.date.split(" ").pop();
      const matchesYear = selectedYear === "all" || pubYear === selectedYear;

      return matchesSearch && matchesCategory && matchesYear;
    });

    result.sort((a, b) => {
      const dateA = parseDate(a.date).getTime();
      const dateB = parseDate(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [searchTerm, activeCategory, selectedYear, sortOrder, publications]);

  // Handler para ABRIR publicação (Atualiza URL)
  const handleReadPublication = (pub: Publication) => {
    if (pub.type === "external" && pub.link) {
      window.open(pub.link, "_blank");
    } else {
      setSelectedPublication(pub);
      setIsReaderOpen(true);
      
      // Adiciona ?publicacao=ID na URL sem recarregar
      setSearchParams(prev => {
        prev.set("publicacao", pub.id.toString());
        return prev;
      }, { replace: false }); // replace: false permite que o botão "voltar" do navegador feche o modal
    }
  };

  // Handler para FECHAR publicação (Limpa URL)
  const handleCloseReader = () => {
    setIsReaderOpen(false);
    
    // Remove o parâmetro da URL
    setSearchParams(prev => {
      prev.delete("publicacao");
      return prev;
    }, { replace: true });
  };

  return (
    <section id="publicacoes" className="relative py-24 overflow-hidden">
      
      <AnimatedParticles />

      {/* Modal agora usa a função de fechar customizada */}
      <ReadPublication 
        publication={selectedPublication} 
        isOpen={isReaderOpen} 
        onClose={handleCloseReader} 
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-title mb-4">
            NOSSAS <span className="text-primary">PUBLICAÇÕES</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Registrando cada passo da nossa evolução tecnológica.
          </p>
        </div>

        {/* Barra de Controle */}
        <div className="flex flex-col gap-8 mb-12 animate-fade-in" style={{ animationDelay: "100ms" }}>
          
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                disabled={isLoading}
                className={`rounded-full px-6 transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20" 
                    : "bg-transparent border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/50"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-4xl mx-auto w-full">
            <div className="relative w-full md:w-1/2 group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <Input
                type="text"
                placeholder="Buscar publicações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={isLoading}
                className="pl-10 h-12 bg-card/50 backdrop-blur-sm border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all hover:border-white/20 disabled:opacity-50"
              />
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <Select value={sortOrder} onValueChange={setSortOrder} disabled={isLoading}>
                <SelectTrigger className="w-full md:w-[180px] h-12 bg-card/50 backdrop-blur-sm border-white/10 rounded-xl hover:border-white/20 disabled:opacity-50">
                  <div className="flex items-center text-muted-foreground">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Ordenar" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mais recentes</SelectItem>
                  <SelectItem value="oldest">Mais antigos</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear} disabled={isLoading}>
                <SelectTrigger className="w-full md:w-[140px] h-12 bg-card/50 backdrop-blur-sm border-white/10 rounded-xl hover:border-white/20 disabled:opacity-50">
                  <div className="flex items-center text-muted-foreground">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Ano" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os anos</SelectItem>
                  {availableYears.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <PublicationCardSkeleton />
              </div>
            ))
          ) : filteredPublications.length > 0 ? (
            filteredPublications.map((pub, index) => (
              <Card
                key={pub.id}
                className="group bg-card/40 backdrop-blur-md border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden animate-fade-in flex flex-col"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 w-full overflow-hidden border-b border-white/5">
                    <img
                        src={pub.image}
                        alt={pub.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                </div>

                <CardHeader className="pb-3 pt-5">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                      {pub.category}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded-md">
                      <Calendar className="w-3 h-3 mr-1.5" />
                      {pub.date}
                    </div>
                  </div>
                  <CardTitle className="text-xl md:text-2xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {pub.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {pub.excerpt}
                  </p>
                </CardContent>
                
                <CardFooter className="pt-0 pb-6">
                  <Button
                    variant="ghost"
                    className="w-full justify-between group/btn hover:bg-primary hover:text-white transition-all duration-300 rounded-xl"
                    onClick={() => handleReadPublication(pub)}
                  >
                      <span className="font-semibold">
                        {pub.type === "external" ? "Acessar link externo" : "Ler publicação"}
                      </span>
                      {pub.type === "external" ? (
                        <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      ) : (
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      )}
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-20 animate-fade-in">
              <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nenhuma publicação encontrada</h3>
              <p className="text-muted-foreground">
                Tente ajustar seus filtros de busca.
              </p>
              <Button
                variant="link"
                className="text-primary mt-2"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("Todos");
                  setSelectedYear("all");
                  setSortOrder("newest");
                }}
              >
                Limpar todos os filtros
              </Button>
            </div>
          )}
        </div>
        
      </div>
    </section>
  );
};

export default PublicationSection;