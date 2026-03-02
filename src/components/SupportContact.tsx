import { useState, useRef } from "react";
import { HeartHandshake, Send } from "lucide-react";
import { toast } from "sonner";
import AnimatedGrid from "./AnimatedGrid";
import AnimatedParticles from "./AnimatedParticles";
import emailjs from '@emailjs/browser';

const SupportContact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!form.current) return;
    
    setIsSubmitting(true);
    
    // ATENÇÃO: Preencha com as suas 4 chaves agora!
    const SERVICE_ID = "service_u8cf4xh"; 
    const TEMPLATE_ID_EQUIPE = "template_dwzynhe"; // O que vai para o ararabots.facom...
    const TEMPLATE_ID_AUTOREPLY = "template_a04h21a"; // O que vai de agradecimento
    const PUBLIC_KEY = "HebBg2s4FiqM9GU7E";

    const enviarParaEquipe = emailjs.sendForm(SERVICE_ID, TEMPLATE_ID_EQUIPE, form.current, PUBLIC_KEY);
    const enviarParaApoiador = emailjs.sendForm(SERVICE_ID, TEMPLATE_ID_AUTOREPLY, form.current, PUBLIC_KEY);

    Promise.all([enviarParaEquipe, enviarParaApoiador])
      .then((responses) => {
        console.log("E-mails de apoio enviados com sucesso!", responses);
        toast.success("Mensagem enviada com sucesso!", {
          description: "Agradecemos demais pelo seu interesse em apoiar a equipe.",
        });
        form.current?.reset();
      })
      .catch((error) => {
        console.error("Erro no envio:", error);
        toast.error("Ops! Algo deu errado.", {
          description: "Não conseguimos enviar sua mensagem. Tente novamente.",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section className="py-24 relative overflow-hidden z-10 font-spartan">
      <AnimatedGrid inverted />
      <AnimatedParticles />
      <div className="container mx-auto px-6">
        
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          
          {/* LADO ESQUERDO: Chamada */}
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
          </div>

          {/* LADO DIREITO: Formulário de Apoio */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            
            <div className="bg-[#111111]/90 backdrop-blur-md border border-white/10 rounded-[2rem] py-6 text-center shadow-2xl">
              <h3 className="text-3xl font-bold text-white tracking-wide">
                Fale Conosco
              </h3>
            </div>

            <form 
              ref={form}
              onSubmit={handleSubmit}
              className="bg-[#111111]/90 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 space-y-6 shadow-2xl"
            >
              <div className="space-y-5">
                <select 
                  name="assunto" // <-- MUDOU DE tipo_apoio PARA assunto
                  defaultValue=""
                  className="w-full bg-transparent border border-white/20 rounded-full px-6 py-4 text-muted-foreground focus:outline-none focus:border-primary/50 appearance-none cursor-pointer hover:border-white/40 transition-colors"
                  required
                >
                  <option value="" disabled>Como você gostaria de apoiar?</option>
                  <option value="Apoio: Doação de Componentes" className="bg-[#111111] text-white">Tenho componentes para doar</option>
                  <option value="Apoio: Financeiro" className="bg-[#111111] text-white">Quero fazer um apoio financeiro</option>
                  <option value="Apoio: Outros" className="bg-[#111111] text-white">Outras formas de ajuda</option>
                </select>

                <input 
                  type="text" 
                  name="nome_empresa" // <-- MUDOU DE nome PARA nome_empresa
                  placeholder="Seu Nome" 
                  required
                  className="w-full bg-transparent border border-white/20 rounded-full px-6 py-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 hover:border-white/40 transition-colors"
                />

                <input 
                  type="email" 
                  name="email_contato" // <-- MUDOU DE email PARA email_contato
                  placeholder="Seu E-mail" 
                  required
                  className="w-full bg-transparent border border-white/20 rounded-full px-6 py-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 hover:border-white/40 transition-colors"
                />

                <textarea 
                  name="mensagem" // <-- CONTINUA IGUAL
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