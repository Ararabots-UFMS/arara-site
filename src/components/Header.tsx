import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Hook para saber em qual página estamos

  // Definição dos links. Note que removemos o # do início para tratar na lógica abaixo
  // ou usamos rotas absolutas para páginas novas
  const navLinks = [
    { label: "SOBRE NÓS", href: "#sobre" },
    { label: "PILARES", href: "#pilares" },
    { label: "NOSSO ROBÔ", href: "#robo" },
    { label: "CONQUISTAS", href: "#conquistas" },
    { label: "PUBLICAÇÕES", href: "#publicacoes" },
    // Link direto para a nova página
    { label: "PATROCÍNIO", href: "/patrocinio" }, 
    // Removi "INGRESSO" pois não vi página pra isso, mas se tiver, segue a lógica
  ];

  // Helper: Gera o link correto baseado na localização atual
  const getLinkHref = (target: string) => {
    // Se é um link interno de página (ex: /patrocinio), retorna ele mesmo
    if (target.startsWith("/")) return target;
    
    // Se é uma âncora (#sobre) e NÃO estamos na home, adiciona a barra antes (/#sobre)
    if (target.startsWith("#") && location.pathname !== "/") {
      return `/${target}`;
    }
    
    // Se estamos na home, mantém apenas a âncora (#sobre)
    return target;
  };

  // Helper: Gerencia o clique para scroll suave ou navegação
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    // Se for âncora E estivermos na home, faz scroll suave manual e previne o comportamento padrão
    if (target.startsWith("#") && location.pathname === "/") {
      e.preventDefault();
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false); // Fecha menu mobile
      }
    }
    // Se não (for outra página ou link externo), deixa o Link do React Router agir naturalmente
    else {
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5 font-spartan">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          
          {/* Logo agora usa Link para voltar à home sem recarregar */}
          <Link 
            to={getLinkHref("#home")} 
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <img src={logo} alt="Arara Bots" className="h-12 w-auto" />
            <span className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
              ARARA BOTS
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                to={getLinkHref(link.href)}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold tracking-wide transition-colors text-foreground hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Botão Apoiar leva para a nova página */}
            <Link 
              to="/apoie" 
              className="hidden md:block bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold text-md hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              Apoiar Equipe
            </Link>

            {/* Mobile Toggle */}
            <button className="lg:hidden text-foreground p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={getLinkHref(link.href)}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium tracking-wide text-foreground/90 hover:text-primary transition-colors flex items-center justify-between group"
              >
                {link.label}
                <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
            <Link
              to="/apoie"
              onClick={() => setIsOpen(false)}
              className="bg-primary text-primary-foreground px-4 py-4 rounded-xl font-bold text-center mt-2 shadow-lg shadow-primary/20 active:scale-95 transition-transform"
            >
              Apoiar Equipe
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;