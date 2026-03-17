import { X, Calendar, User, Share2, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner"; 
import DOMPurify from "dompurify"; // <--- 1. Importação Nova
import { Publication } from "@/types/publication";

interface ReadPublicationProps {
  publication: Publication | null;
  isOpen: boolean;
  onClose: () => void;
}

const ReadPublication = ({ publication, isOpen, onClose }: ReadPublicationProps) => {
  if (!publication) return null;

  // --- LÓGICA DE COMPARTILHAMENTO ---
  const handleShare = async () => {
    const url = window.location.href; 
    
    const shareData = {
      title: publication.title,
      text: publication.excerpt,
      url: url,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log("Compartilhamento cancelado ou falhou", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copiado!", {
          description: "A URL da publicação foi copiada para sua área de transferência.",
        });
      } catch (err) {
        toast.error("Erro ao copiar link.");
      }
    }
  };
  // ----------------------------------

  // --- 2. LÓGICA DE SEGURANÇA (SANITIZAÇÃO) ---
  // Se houver conteúdo, limpa ele. Se não, retorna string vazia.
  const sanitizedContent = publication.content
    ? DOMPurify.sanitize(publication.content)
    : "";
  // --------------------------------------------

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 gap-0 border-white/10 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col z-50">
        
        <div className="sr-only">
            <DialogTitle>{publication.title}</DialogTitle>
        </div>

        <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white/70 hover:bg-primary hover:text-white transition-colors backdrop-blur-sm border border-white/10">
          <X className="h-5 w-5" />
        </DialogClose>

        <ScrollArea className="flex-1 h-full w-full">
          <div className="flex flex-col relative">
            
            {/* Banner Gigante */}
            <div className="relative w-full h-[300px] md:h-[400px]">
              <img
                src={publication.image}
                alt={publication.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                <Badge className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90 border-none px-3 py-1 text-sm">
                  {publication.category}
                </Badge>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight shadow-black drop-shadow-lg">
                  {publication.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{publication.date}</span>
                  </div>
                  {publication.author && (
                    <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5">
                      <User className="w-4 h-4 text-primary" />
                      <span>{publication.author}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="p-6 md:p-10 md:pt-6 max-w-4xl mx-auto w-full">
              
              <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-8 leading-relaxed border-l-4 border-primary pl-6 italic">
                {publication.excerpt}
              </p>

              <Separator className="bg-white/10 mb-8" />

              <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-6">
                 {/* 3. Renderização Segura usando a variável sanitizada */}
                  {publication.content ? (
                    <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                  ) : (
                    <p>Conteúdo não disponível.</p>
                  )}
              </div>

              <Separator className="bg-white/10 my-10" />

              {/* Footer */}
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2 border-white/10 hover:bg-white/5 transition-colors"
                      onClick={handleShare}
                    >
                        <Share2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Compartilhar</span>
                    </Button>
                </div>
                
                {publication.link && (
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-white" asChild>
                        <a href={publication.link} target="_blank" rel="noopener noreferrer">
                            Ver no navegador <ExternalLink className="w-3 h-3" />
                        </a>
                    </Button>
                )}
              </div>

            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ReadPublication;