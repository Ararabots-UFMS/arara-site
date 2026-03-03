import { useState, useRef } from "react";
import { Image as ImageIcon, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';
import AnimatedGrid from "./AnimatedGrid";
import AnimatedParticles from "./AnimatedParticles";

const SponsorContact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef<HTMLFormElement>(null);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!form.current) return;
    
    setIsSubmitting(true);
    
    const VITE_EMAILJS_SERVICE_ID="service_42t9s19"
    const VITE_EMAILJS_TEMPLATE_EQUIPE="template_ir0bzj4"
    const VITE_EMAILJS_TEMPLATE_AUTOREPLY="template_w7gh8yk"
    const VITE_EMAILJS_PUBLIC_KEY="KGmmOijfX41dl3Duv"

    const SERVICE_ID = VITE_EMAILJS_SERVICE_ID; 
    const TEMPLATE_ID_EQUIPE = VITE_EMAILJS_TEMPLATE_EQUIPE; 
    const TEMPLATE_ID_AUTOREPLY = VITE_EMAILJS_TEMPLATE_AUTOREPLY; 
    const PUBLIC_KEY = VITE_EMAILJS_PUBLIC_KEY;

    // Criamos duas requisições separadas usando os mesmos dados do formulário
    const enviarParaEquipe = emailjs.sendForm(SERVICE_ID, TEMPLATE_ID_EQUIPE, form.current, PUBLIC_KEY);
    const enviarParaCliente = emailjs.sendForm(SERVICE_ID, TEMPLATE_ID_AUTOREPLY, form.current, PUBLIC_KEY);

    // Promise.all executa as duas ao mesmo tempo e espera ambas terminarem
    Promise.all([enviarParaEquipe, enviarParaCliente])
      .then((responses) => {
        console.log("E-mails enviados com sucesso!", responses);
        toast.success("Mensagem enviada com sucesso!", {
          description: "Nossa equipe entrará em contato em breve.",
        });
        form.current?.reset(); // Limpa o formulário
      })
      .catch((error) => {
        console.error("Erro no envio:", error);
        toast.error("Ops! Algo deu errado.", {
          description: "Não conseguimos enviar sua mensagem. Tente novamente.",
        });
      })
      .finally(() => {
        setIsSubmitting(false); // Libera o botão
      });
  };

return (
    <section className="py-24 relative overflow-hidden z-10 font-spartan">
      <AnimatedGrid inverted />
      <AnimatedParticles />
      <div className="container mx-auto px-6">
        
        {/* Alterado para uma coluna centralizada e mais estreita */}
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
          
          {/* Cabeçalho Unificado: Título + E-mail */}
          <div className="bg-[#111111]/90 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl text-center md:text-left">
            
            <h3 className="text-3xl font-bold text-white tracking-wide">
              Entre em contato
            </h3>

            {/* Bloco de E-mail movido para cá */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#B91C1C]/10 border border-[#B91C1C]/20 flex items-center justify-center shrink-0 hidden sm:flex">
                <Mail className="w-6 h-6 text-[#B91C1C]" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-semibold tracking-wide mb-1 uppercase">
                  E-mail para propostas
                </p>
                <a 
                  href="mailto:ararabots.facom@ufms.br" 
                  className="text-lg md:text-xl font-bold text-white hover:text-[#B91C1C] transition-colors"
                >
                  ararabots.facom@ufms.br
                </a>
              </div>
            </div>

          </div>

            <form 
              ref={form} // <-- Conecta o formulário ao React/EmailJS
              onSubmit={handleSubmit}
              className="bg-[#111111]/90 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 space-y-6 shadow-2xl"
            >
              
              <div className="space-y-5">
                <select 
                  name="assunto" // <-- Variável do template
                  defaultValue="" // Removido o 'selected' da option, usando defaultValue no select (boa prática do React)
                  className="w-full bg-transparent border border-white/20 rounded-full px-6 py-4 text-muted-foreground focus:outline-none focus:border-primary/50 appearance-none cursor-pointer hover:border-white/40 transition-colors"
                  required
                >
                  <option value="" disabled>Selecione o assunto</option>
                  <option value="Proposta de Patrocínio" className="bg-[#111111] text-white">Proposta de Patrocínio</option>
                  <option value="Parceria Institucional" className="bg-[#111111] text-white">Parceria Institucional</option>
                  <option value="Dúvidas Gerais" className="bg-[#111111] text-white">Dúvidas Gerais</option>
                </select>

                <input 
                  type="text" 
                  name="nome_empresa" // <-- Variável do template
                  placeholder="Nome ou Empresa" 
                  required
                  className="w-full bg-transparent border border-white/20 rounded-full px-6 py-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 hover:border-white/40 transition-colors"
                />

                <input 
                  type="email" 
                  name="email_contato" // <-- Variável do template
                  placeholder="E-mail de Contato" 
                  required
                  className="w-full bg-transparent border border-white/20 rounded-full px-6 py-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 hover:border-white/40 transition-colors"
                />

                <textarea 
                  name="mensagem" // <-- Variável do template
                  placeholder="Assunto...." 
                  required
                  rows={4}
                  className="w-full bg-transparent border border-white/20 rounded-[1.5rem] px-6 py-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 hover:border-white/40 transition-colors resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-transparent border-2 border-white text-white font-bold text-lg rounded-full py-4 flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-white"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    Enviar <Send className="w-5 h-5" />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

    </section>
  );
};

export default SponsorContact;