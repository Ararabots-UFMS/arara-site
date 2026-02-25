import { useQuery } from "@tanstack/react-query";
import { Publication } from "@/components/ReadPublication";

// Movi os dados para cá (simulando o banco de dados)
const MOCK_DATA: Publication[] = [
  {
    id: 1,
    title: "(FICTICIO)Desenvolvimento de Robôs Autônomos com Arduino",
    category: "Artigo",
    date: "10 Fev, 2026",
    excerpt: "Uma análise profunda sobre a integração de sensores e atuadores em ambientes controlados.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
    author: "Daniel Zubcov",
    type: "internal",
    content: `
      <p>A robótica autônoma tem avançado significativamente nos últimos anos. Neste artigo, exploramos como utilizar microcontroladores acessíveis, como o Arduino, para criar sistemas complexos de navegação.</p>
      <h3>Sensores e Atuadores</h3>
      <p>O coração de qualquer robô autônomo é sua capacidade de perceber o mundo. Utilizamos sensores ultrassônicos HC-SR04 para detecção de obstáculos e giroscópios para manter a orientação.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <h3>Lógica de Controle</h3>
      <p>Implementamos um algoritmo PID (Proporcional, Integral, Derivativo) para suavizar os movimentos e garantir que o robô mantenha uma linha reta mesmo em superfícies irregulares.</p>
    `
  },
  {
    id: 2,
    title: "(FICTICIO)Resultados da Competição Regional de Robótica",
    category: "Competição",
    date: "25 Jan, 2026",
    excerpt: "Nossa equipe conquistou o 2º lugar na categoria Sumo Robot 3kg.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop",
    author: "Equipe AraraBot",
    type: "internal",
    content: `
      <p>Foi um final de semana intenso em Maringá. A equipe AraraBot levou dois robôs para a competição: o "Tucano V1" e a "Arara Pistola".</p>
      <p>Enfrentamos equipes de todo o estado e conseguimos um desempenho excepcional na categoria de sumô autônomo.</p>
      <h3>Desafios Técnicos</h3>
      <p>Durante as classificatórias, tivemos um problema com a ponte H do motor esquerdo, mas graças ao design modular do nosso robô, conseguimos substituir a peça em menos de 5 minutos.</p>
    `
  },
  {
    id: 3,
    title: "(FICTICIO)Link Externo: Matéria na Revista TechBrasil",
    category: "Extensão",
    date: "05 Dez, 2025",
    excerpt: "Confira a matéria completa sobre nosso projeto social no site da TechBrasil.",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
    type: "external"
  }
];

// Função que simula a requisição ao servidor
const fetchPublications = async (): Promise<Publication[]> => {
  // Simula um delay de rede de 1.5s
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // No futuro, aqui você fará: return axios.get("/api/publicacoes")
  return MOCK_DATA;
};

export const usePublications = () => {
  return useQuery({
    queryKey: ["publications"], // Chave única para o cache
    queryFn: fetchPublications,
    staleTime: 1000 * 60 * 5, // Os dados ficam "frescos" por 5 minutos (não recarrega à toa)
  });
};