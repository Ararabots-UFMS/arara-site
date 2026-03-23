import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ticket, ArrowRight, Bot, Users, Zap, Trophy } from "lucide-react";
import AnimatedGrid from "@/components/AnimatedGrid";
import AnimatedParticles from "@/components/AnimatedParticles";
import lia from "@/assets/Lia.png";

// --- DADOS DO ESQUEMA (LINHA DO TEMPO) ---
const SELECTION_STEPS = [
  {
    icon: <Ticket className="w-5 h-5 text-primary" />,
    title: "1. Inscrição Online",
    date: "05/03/2026 - 27/03/2026",
    description: "Preencha seus dados para demonstrar interesse em participar do Hackathon AraraBots."
  },
  {
    icon: <Users className="w-5 h-5 text-primary" />,
    title: "2. Avaliação dos Inscritos",
    date: "28/03/2026 - 22/03/2026",
    description: "Análise dos inscritos para definir os participantes que irão para o Hackathon."
  },
  {
    icon: <Zap className="w-5 h-5 text-primary" />,
    title: "3. Divulgação dos Selecionados",
    date: "23/03/2026",
    description: "Divulgação da lista de participantes selecionados para o Hackathon."
  },
  {
    icon: <Bot className="w-5 h-5 text-primary" />,
    title: "4. Hackathon",
    date: "11/04/2026",
    description: "Maratona de inovação em robótica com Arduino e desenvolvimento de projetos."
  },
  {
    icon: <Trophy className="w-5 h-5 text-primary" />,
    title: "5. Divulgação dos Novos Membros",
    date: "13/04/2026",
    description: "Divulgação dos novos membros aprovados para integrar a equipe AraraBots."
  }
];

const Subscriptions = () => {
  // Coloque o link real do Google Forms da equipe aqui 👇
  const GOOGLE_FORMS_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdP0QAhAjzWePOA1RWnHK6LA4dZ8q3Cz50UYDWNN0Lw-e-B8w/viewform"; 

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Ingressos e Inscrições | AraraBots</title>
        <meta name="description" content="Garanta seu lugar nos eventos e processos seletivos da equipe AraraBot." />
      </Helmet>

      <Header />

      <main className="flex-grow pt-28 md:pt-32 pb-12 md:pb-16 relative overflow-hidden">
        
        {/* Background Decorativo */}

        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <AnimatedGrid />
        <AnimatedParticles />
        

        <div className="container mx-auto px-4 sm:px-6 relative z-10 min-h-[60vh] flex flex-col justify-center">
          
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center max-w-6xl mx-auto w-full animate-fade-in">
            
            {/* LADO ESQUERDO: Esquema / Timeline */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight break-words">
                  Faça parte do time <span className="text-primary">ARARABOTS!</span>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Entenda como funciona nossa jornada de seleção antes de realizar sua inscrição.
                </p>
              </div>

              {/* Linha do Tempo Visual */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-white/10 before:to-transparent">
                {SELECTION_STEPS.map((step, index) => (
                  <div key={index} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    
                    {/* Ícone Central */}
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-card/80 backdrop-blur-sm text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 transition-colors group-hover:border-primary/50">
                      {step.icon}
                    </div>
                    
                    {/* Card do Passo */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-3 sm:p-4 rounded-2xl bg-card/40 border border-white/5 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/60">
                      <div className="flex flex-col mb-1">
                        <span className="text-primary font-bold text-xs sm:text-sm tracking-wide uppercase">{step.date}</span>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* LADO DIREITO: Card "Inscreva-se Agora" */}
            <div className="lg:col-span-2 flex flex-col items-center gap-6">
              {/* Mascote Lia acima do Card */}
              <div className="animate-bounce">
                <img 
                  src={lia} 
                  alt="Lia - Mascote AraraBot" 
                  className="h-28 sm:h-36 md:h-40 w-auto drop-shadow-lg"
                />
              </div>
              
              <Card className="bg-card/60 backdrop-blur-xl border-white/10 shadow-2xl relative overflow-hidden group w-full">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/50 to-primary" />
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/20 transition-all duration-500" />
                
                <CardContent className="p-6 sm:p-8 md:p-10 flex flex-col items-center text-center space-y-5 sm:space-y-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center mb-1 sm:mb-2">
                    <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-bold">Pronto para o desafio?</h2>
                  
                  <p className="text-sm sm:text-base text-muted-foreground">
                    As vagas são limitadas. Garanta seu lugar no maior projeto de robótica da região e transforme sua carreira acadêmica.
                  </p>
                  
                  {/* Botão Modificado para ser um Link Externo */}
                  <Button 
                    size="lg" 
                    className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-105 group/btn"
                    asChild
                  >
                    <a href={GOOGLE_FORMS_URL} target="_blank" rel="noopener noreferrer">
                      Inscreva-se Agora
                      <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  
                  <p className="text-xs text-muted-foreground pt-4">
                    Você será redirecionado para o nosso formulário oficial.
                  </p>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Subscriptions;