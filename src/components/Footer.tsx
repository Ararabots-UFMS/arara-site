import logo from "@/assets/logo.png";
import { Instagram, Linkedin, Github, Mail, User } from "lucide-react";

const Footer = () => {
  const navigationLinks = [
    { label: "Home", href: "#home" },
    { label: "Sobre Nós", href: "/sobre" },
    { label: "Publicações", href: "/publicacoes" },
    { label: "Patrocínio", href: "/patrocinio" },
  ];

  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <img src={logo} alt="Arara Bots" className="h-10 w-auto" />
              <span className="text-lg font-bold text-foreground">ARARABOTS</span>
            </div>
            <p className="text-muted-foreground text-md leading-relaxed mb-4">
              Grupo de Robótica da Universidade Federal de Mato Grosso do Sul.
              Desenvolvendo com paixão pela engenharia.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/ararabots/"
                className="text-primary hover:text-primary/80 transition-colors"
                aria-label="Instagram"
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
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">NAVEGAÇÃO</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">CONTATO</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <a
                  href="ararabots.facom@ufms.br"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ararabots.facom@ufms.br
                </a>
              </li>
              <li className="flex items-center gap-3">
                <User size={18} className="text-primary" />
                  <a
                    href="/inscricao"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="text-muted-foreground">Inscrições Abertas</span>
                  </a>
              </li>
            </ul>
          </div>
        </div>
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
