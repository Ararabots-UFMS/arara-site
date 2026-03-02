import { useState, useRef } from "react";
import { HeartHandshake, Send, QrCode } from "lucide-react";
import { toast } from "sonner";
import AnimatedGrid from "./AnimatedGrid";
import AnimatedParticles from "./AnimatedParticles";
// import emailjs from '@emailjs/browser'; // Descomente quando for plugar o EmailJS

const SupportContact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulação de envio (Substitua pelo código do EmailJS depois)
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Mensagem enviada com sucesso!", {
        description: "Agradecemos demais pelo seu interesse em apoiar a equipe.",
      });
      form.current?.reset();
    }, 1500);
  };

  return (
    <section className="py-24 relative overflow-hidden z-10 font-spartan">
      <AnimatedGrid inverted />
      <AnimatedParticles />
      <div className="container mx-auto px-6">
        
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          
          {/* LADO ESQUERDO: Chamada e Chave PIX */}
          <div className="space-y-8 animate-fade-in">
            
            <div className="bg-[#111111]/80 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-center shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#B91C1C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <HeartHandshake className="w-16 h-16 text-[#B91C1C] mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">
                Quer fazer parte da nossa história?
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Seja doando componentes, ajudando nos custos de viagem ou compartilhando conhecimento, toda ajuda é fundamental para construirmos robôs cada vez melhores.
              </p>
            </div>

            {/* Box de PIX Direto */}
            <div className="bg-[#111111]/90 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 flex items-center gap-6 shadow-2xl hover:border-[#B91C1C]/50 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-[#B91C1C]/10 border border-[#B91C1C]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <QrCode className="w-7 h-7 text-[#B91C1C]" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-semibold tracking-wide mb-1 uppercase">
                  Apoio Direto via PIX
                </p>
                <p className="text-xl md:text-2xl font-bold text-white tracking-wider">
                  CNPJ: 00.000.000/0000-00
                </p>
                <p className="text-sm text-muted-foreground mt-1">Associação AraraBots UFMS</p>
              </div>
            </div>

          </div>

          {/* LADO DIREITO: Formulário de Apoio */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            
            <div className="bg-[#111111]/90 backdrop-blur-md border border-white/10 rounded-[2rem] py-6 text-center shadow-2xl">
              <h3 className="text-3xl font-bold text-white tracking-wide">
                (FALTA IMPLEMENTAR)Fale Conosco
              </h3>
            </div>

            <form 
              ref={form}
              onSubmit={handleSubmit}
              className="bg-[#111111]/90 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 space-y-6 shadow-2xl"
            >
              <div className="space-y-5">
                <select 
                  name="tipo_apoio"
                  defaultValue=""
                  className="w-full bg-transparent border border-white/20 rounded-full px-6 py-4 text-muted-foreground focus:outline-none focus:border-primary/50 appearance-none cursor-pointer hover:border-white/40 transition-colors"
                  required
                >
                  <option value="" disabled>Como você gostaria de apoiar?</option>
                  <option value="Doação de Componentes" className="bg-[#111111] text-white">Tenho componentes para doar</option>
                  <option value="Apoio Financeiro" className="bg-[#111111] text-white">Quero fazer um apoio financeiro</option>
                  <option value="Outros" className="bg-[#111111] text-white">Outras formas de ajuda</option>
                </select>

                <input 
                  type="text" 
                  name="nome" 
                  placeholder="Seu Nome" 
                  required
                  className="w-full bg-transparent border border-white/20 rounded-full px-6 py-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 hover:border-white/40 transition-colors"
                />

                <input 
                  type="email" 
                  name="email" 
                  placeholder="Seu E-mail" 
                  required
                  className="w-full bg-transparent border border-white/20 rounded-full px-6 py-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 hover:border-white/40 transition-colors"
                />

                <textarea 
                  name="mensagem" 
                  placeholder="Conte um pouco sobre como quer nos ajudar..." 
                  required
                  rows={4}
                  className="w-full bg-transparent border border-white/20 rounded-[1.5rem] px-6 py-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 hover:border-white/40 transition-colors resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#B91C1C] hover:bg-red-800 text-white font-bold text-lg rounded-full py-4 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-red-900/20"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    Enviar Mensagem <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SupportContact;