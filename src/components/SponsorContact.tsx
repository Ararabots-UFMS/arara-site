import { useState, useRef } from "react";
import { Image as ImageIcon, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

const SponsorContact = () => {
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
    <section className="py-24 relative z-10 font-spartan">
      <div className="container mx-auto px-6">
        
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          
          {/* LADO ESQUERDO: Mantido exatamente igual... */}
          <div className="space-y-8 animate-fade-in">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-primary/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-[#111111]/80 backdrop-blur-md border-2 border-dashed border-white/20 hover:border-primary/50 rounded-[2.5rem] p-12 flex flex-col items-center justify-center transition-colors duration-500 h-64 shadow-2xl">
                <ImageIcon className="w-16 h-16 text-[#B91C1C] mb-4 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
                <h3 className="text-3xl font-bold text-white tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  SUA MARCA AQUI
                </h3>
              </div>
            </div>

            <div className="bg-[#111111]/90 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 flex items-center gap-6 shadow-2xl hover:bg-[#151515] transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#B91C1C]/10 border border-[#B91C1C]/20 flex items-center justify-center shrink-0">
                <Mail className="w-7 h-7 text-[#B91C1C]" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-semibold tracking-wide mb-1 uppercase">
                  E-mail para propostas
                </p>
                <a 
                  href="mailto:ararabots.facom@ufms.br" 
                  className="text-xl md:text-2xl font-bold text-white hover:text-primary transition-colors"
                >
                  ararabots.facom@ufms.br
                </a>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: Formulário de Contato com a tag 'ref' e 'name' */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            
            <div className="bg-[#111111]/90 backdrop-blur-md border border-white/10 rounded-[2rem] py-6 text-center shadow-2xl">
              <h3 className="text-3xl font-bold text-white tracking-wide">
                Entre em contato
              </h3>
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
      </div>
    </section>
  );
};

export default SponsorContact;