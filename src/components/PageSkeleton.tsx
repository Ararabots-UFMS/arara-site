import { Skeleton } from "@/components/ui/skeleton";

const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      
      {/* 1. Header Skeleton */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5 h-20">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <Skeleton className="h-10 w-32 bg-white/10 rounded-lg" /> {/* Logo */}
          <div className="hidden md:flex gap-8">
             {/* Links do Menu */}
            <Skeleton className="h-4 w-20 bg-white/5" />
            <Skeleton className="h-4 w-20 bg-white/5" />
            <Skeleton className="h-4 w-20 bg-white/5" />
            <Skeleton className="h-4 w-20 bg-white/5" />
          </div>
          <Skeleton className="h-10 w-32 bg-white/10 rounded-full" /> {/* Botão CTA */}
        </div>
      </header>

      <main className="pt-20">
        
        {/* 2. Hero Section Skeleton */}
        <section className="relative min-h-screen flex items-center pt-10 pb-20">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Lado Esquerdo (Texto) */}
            <div className="space-y-6">
              <Skeleton className="h-16 w-3/4 bg-white/10 rounded-xl" /> {/* Título Linha 1 */}
              <Skeleton className="h-16 w-1/2 bg-white/10 rounded-xl" /> {/* Título Linha 2 */}
              
              <div className="space-y-3 pt-4">
                <Skeleton className="h-4 w-full bg-white/5" />
                <Skeleton className="h-4 w-5/6 bg-white/5" />
                <Skeleton className="h-4 w-4/6 bg-white/5" />
              </div>

              <div className="flex gap-4 pt-6">
                <Skeleton className="h-14 w-40 rounded-full bg-white/10" />
                <Skeleton className="h-14 w-40 rounded-full bg-white/5" />
              </div>
            </div>

            {/* Lado Direito (Foto da Equipe) */}
            <div className="hidden lg:block relative">
               <Skeleton className="w-full aspect-[4/3] rounded-3xl bg-white/5 border border-white/10" />
            </div>
          </div>
        </section>

        {/* 3. About / Pillars Preview Skeleton (Blocos genéricos para o resto da página) */}
        <div className="container mx-auto px-6 py-24 space-y-24">
          
          {/* Simulação de Seção Centralizada (Ex: Sobre) */}
          <div className="flex flex-col items-center space-y-6">
             <Skeleton className="h-10 w-64 bg-white/10 rounded-lg" />
             <Skeleton className="h-4 w-full max-w-2xl bg-white/5" />
             <Skeleton className="h-4 w-full max-w-xl bg-white/5" />
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-8">
                <Skeleton className="h-64 w-full bg-white/5 rounded-2xl" />
                <Skeleton className="h-64 w-full bg-white/5 rounded-2xl" />
                <Skeleton className="h-64 w-full bg-white/5 rounded-2xl" />
             </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default PageSkeleton;