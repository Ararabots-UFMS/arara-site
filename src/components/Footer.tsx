import logo from "@/assets/logo.png";
import { Instagram, Linkedin, Github, Mail, User } from "lucide-react";
import { Link } from "react-router-dom"; // <--- Importação do Link adicionada!

const Footer = () => {
  // 1. Limpamos o "/arara-site" das URLs. O React Router adiciona isso sozinho agora.
  // 2. Trocamos o href "Home" para "/" para garantir a navegação pro topo.
  const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "Sobre Nós", href: "/sobre" },
    { label: "Publicações", href: "/publicacoes" },
    { label: "Patrocínio", href: "/patrocinio" },
  ];

  return (
    <footer className="bg-background border-t border-border py-16 font-spartan">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          
          {/* LADO ESQUERDO: Sobre */}
          <div>
            <div className="flex items-center gap-3 mb-1">
              <img src={logo} alt="AraraBot" className="h-10 w-auto" />
              <span className="text-lg font-bold text-foreground">ARARABOTS</span>
            </div>
            <p className="text-muted-foreground text-md leading-relaxed mb-4">
              Grupo de Robótica da Universidade Federal de Mato Grosso do Sul.
              Desenvolvendo com paixão pela engenharia.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/ararabots/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/company/ararabots/"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/Ararabots-UFMS"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              {/* Se depois tiverem outras redes sociais, basta adicionar os ícones importados aqui */}
            </div>
          </div>
          
          {/* MEIO: Navegação */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">NAVEGAÇÃO</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  {/* Substituímos a tag <a> pelo <Link> */}
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* DIREITA: Contato */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">CONTATO</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <a
                  href="mailto:ararabots.facom@ufms.br"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ararabots.facom@ufms.br
                </a>
              </li>
              <li className="flex items-center gap-3">
                <User size={18} className="text-primary" />
                  {/* Trocamos <a> por <Link> aqui também */}
                  <Link
                    to="/inscricao"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="text-muted-foreground">Inscrições Abertas</span>
                  </Link>
              </li>
            </ul>
          </div>

        </div>
        
        {/* DIREITOS AUTORAIS */}
        <div className="border-t border-border pt-8">
          <p className="text-center text-muted-foreground text-sm">
            © 2010 Copyright: Ararabots. Desenvolvido com paixão pela engenharia.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;