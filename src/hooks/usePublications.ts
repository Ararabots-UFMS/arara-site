import { useQuery } from "@tanstack/react-query";
import { Publication } from "@/components/ReadPublication";

import imgCamara from "@/assets/camara.jpg";
import imgGloboEsporte from "@/assets/globo-esporte.jpg";
import imgLab from "@/assets/lab-aberto.jpg";
import imgCBR2025 from "@/assets/cbr2025.jpg";
import imgCBR2024 from "@/assets/cbr2024.jpg";
import imgCBR2023 from "@/assets/cbr2023.jpg";

// ==========================================
// DADOS REAIS DO ARARABOTS
// ==========================================
const PUBLICATIONS_DATA: Publication[] = [
  {
    id: 1,
    title: "Homenagem na Câmara Municipal de Campo Grande",
    category: "Reconhecimento",
    date: "18 Nov 2025",
    type: "internal",
    author: "Equipe AraraBots",
    image: imgCamara, // Descomente quando colocar a imagem na pasta
    excerpt: "A equipe recebeu uma menção honrosa do Vereador Veterinário Francisco pelos resultados alcançados e pela atuação no desenvolvimento da robótica acadêmica no estado.",
    content: `
      <p class="mb-4">No dia 18 de novembro de 2025, a equipe recebeu na Câmara Municipal de Campo Grande uma homenagem pelos feitos em competição do Arara e pela atuação no desenvolvimento da robótica acadêmica no Mato Grosso do Sul, visto que é hoje a única equipe do estado de robótica de nível acadêmico.</p>
      <p class="mb-4">Quem ofereceu a menção honrosa à equipe foi o Vereador Veterinário Francisco. No dia estavam presentes figuras importantes da política local, como vereadores, e também a professora que coordena o projeto do Arara, Liana Duenha, que é também diretora da FACOM.</p>
      <p class="mb-4">Esta menção serviu não somente como uma parabenização pelos resultados obtidos na Competição Brasileira de Robótica 2025, como também por todo trabalho realizado pelo Arara, através de oficinas de ensino e projetos para laboratórios parceiros da UFMS.</p>
      <p class="mb-4">Para os membros este dia foi de grande importância para validar o esforço empregado no projeto durante o ano, pois através dos resultados obtidos, a equipe fortificou o sentimento de dever cumprido, e do bom caminho que vem trilhando.</p>
    `
  },
  {
    id: 2,
    title: "Reportagem com Globo Esporte",
    category: "Mídia",
    date: "11 Nov 2025",
    type: "internal",
    author: "TV Morena / AraraBots",
    image: imgGloboEsporte,

    excerpt: "A equipe recebeu o Globo Esporte no laboratório para demonstrar o funcionamento dos robôs e compartilhar a experiência das competições.",
    content: `
      <p class="mb-4">No dia 11 de novembro de 2025, a equipe do Arara deu uma entrevista para a TV Morena, que é a filial da rede Globo no estado do Mato Grosso do Sul.</p>
      <p class="mb-4">Durante a manhã do dia 11, recebemos em nosso laboratório a equipe do Globo Esporte, para contar um pouco da nossa experiência em competições anteriores e o dia a dia trabalhando com futebol de robôs. Na ocasião, o apresentador do GE, Caique Alves, entrevistou alguns dos membros do projeto, e recolheu algumas informações sobre a Competição Brasileira de Robótica 2025, a qual tivemos um excelente resultado.</p>
      <p class="mb-4">Houve também uma mostra de nossos robôs em ação e a simulação de como o nosso sensor funciona nos dias de competição.</p>
      <p class="mb-4">O momento da entrevista trouxe para os membros do Arara não somente orgulho do trabalho realizado anteriormente, com os robôs e competições, mas também a sensação de reconhecimento pelo esforço de meses construindo o projeto, a mostra de que cada dia e noite de trabalho em equipe trouxe resultados dos quais se orgulham profundamente.</p>
    `
  },
  {
    id: 3,
    title: "Laboratório Aberto à Comunidade",
    category: "Extensão",
    date: "15 Nov 2025",
    type: "external",
    author: "Equipe AraraBots",
    link: "https://g1.globo.com/ms/mato-grosso-do-sul/noticia/2025/11/15/robos-que-jogam-futebol-equipe-abre-laboratorio-ao-publico-e-mostra-bastidores-de-competicoes.ghtml",
    image: imgLab,
    
    excerpt: "Iniciativa aproxima a sociedade do ambiente acadêmico com demonstrações práticas dos robôs jogadores de futebol, ganhando destaque no G1.",
    content: "" // É um link externo, o modal não será aberto
  },
  {
    id: 4,
    title: "Participação na CBR 2025 — Vitória (ES)",
    category: "Competição",
    date: "15 Out 2025",
    type: "internal",
    author: "Equipe AraraBots",
    image: imgCBR2025,
   
    excerpt: "Consolidação da equipe na categoria SSL-EL, apresentando uma mecânica super elogiada e avançando até as quartas de final do torneio.",
    content: `
      <p class="mb-4">A equipe participou da Competição Brasileira de Robótica 2025, realizada em outubro de 2025, na cidade de Vitória, Espírito Santo. Esta edição representou um marco importante na consolidação da equipe na categoria Small Size League – Entry Level (SSL-EL), evidenciando a evolução técnica e estrutural construída ao longo dos anos anteriores.</p>
      <p class="mb-4">Após os aprendizados adquiridos na estreia na categoria em 2024, a equipe apresentou avanços significativos, especialmente nas áreas de eletrônica e controle. Foram implementadas melhorias importantes nos circuitos, na confiabilidade dos sistemas embarcados e nos algoritmos de controle. Além disso, a equipe conquistou maior apoio institucional e patrocínios, o que contribuiu diretamente para o aprimoramento dos processos de desenvolvimento e da qualidade geral do projeto.</p>
      <p class="mb-4">Um dos grandes destaques da participação foi a mecânica do robô, que recebeu elogios de outras equipes e participantes da competição, reconhecendo a qualidade do projeto, da construção e das soluções adotadas. Esse reconhecimento evidenciou o amadurecimento técnico da equipe e sua capacidade de desenvolver sistemas robustos e competitivos dentro de um cenário de alto nível.</p>
      <p class="mb-4">Durante a competição, a equipe conseguiu avançar até as quartas de final, mas acabou sendo eliminada devido a alguns problemas técnicos pontuais. Apesar disso, o sentimento geral foi extremamente positivo, demonstrando que os investimentos em conhecimento, estrutura e desenvolvimento estavam no caminho certo.</p>
      <p class="mb-4">A participação na CBR 2025 consolidou o progresso da equipe na categoria SSL e reforçou sua confiança para os próximos desafios, demonstrando que os investimentos em conhecimento, estrutura e desenvolvimento estavam no caminho certo e estabelecendo bases sólidas para resultados ainda mais expressivos no futuro.</p>
      `
  },
  {
    id: 5,
    title: "Participação na CBR 2024 — Goiânia (GO)",
    category: "Competição",
    date: "10 Out 2024",
    type: "internal",
    author: "Equipe AraraBots",
    image: imgCBR2024,
    excerpt: "A grande virada de chave da equipe: transição para a categoria SSL-EL, desenvolvendo um sistema do zero em quatro meses e conquistando a 4ª colocação geral.",
    content: `
      <p class="mb-4">A participação na Competição Brasileira de Robótica 2024, realizada na cidade de Goiânia, marcou uma verdadeira virada de chave na trajetória da equipe. Com a extinção da categoria Very Small Size Soccer (VSSS), a equipe iniciou uma nova e desafiadora jornada na categoria Small Size League – Entry Level (SSL-EL), que envolve robôs significativamente mais complexos, exigindo maior domínio em áreas como projeto mecânico, sistemas embarcados, controle, comunicação sem fio e estratégias de jogo.</p>
      <p class="mb-4">A transição representou um grande desafio técnico e organizacional. Em apenas quatro meses, a equipe precisou desenvolver praticamente todo o sistema do zero. Esse curto período de desenvolvimento exigiu intensa dedicação dos membros, que precisaram adquirir rapidamente novos conhecimentos e adaptar-se a um nível mais avançado de engenharia robótica.</p>
      <p class="mb-4">Durante a competição, a equipe enfrentou dificuldades naturais de um primeiro ano em uma categoria inédita, especialmente relacionadas à robustez do sistema e à consistência em campo. Embora o desempenho não tenha ocorrido exatamente como o planejado, a participação representou um enorme avanço técnico e estratégico. A equipe demonstrou grande capacidade de adaptação e superação, conquistando a 4ª colocação geral — um resultado expressivo considerando o curto tempo de desenvolvimento e o fato de ser a estreia histórica da equipe na categoria SSL-EL.</p>
      <p class="mb-4">Mais do que o resultado, a CBR 2024 consolidou uma nova base tecnológica e proporcionou aprendizados fundamentais. Os desafios enfrentados e os erros cometidos tornaram-se importantes fontes de experiência, fortalecendo a equipe e estabelecendo fundamentos sólidos para evoluções futuras nas competições seguintes.</p>
    `
  },
  {
    id: 6,
    title: "Participação na CBR/LARC 2023 — Salvador (BA)",
    category: "Competição",
    date: "12 Out 2023",
    type: "internal",
    author: "Equipe AraraBots",
    image: imgCBR2023,
    excerpt: "O marco do retorno pós-pandemia: com um time totalmente novo, a equipe assumiu a missão de reconstruir o conhecimento em VSSS e garantiu a 12ª colocação.",
    content: `
      <p class="mb-4">A equipe participou da Competição Brasileira de Robótica 2023 (CBR), em conjunto com a Latin American Robotics Competition 2023 (LARC), realizada entre os dias 7 e 12 de outubro de 2023, na cidade de Salvador, Bahia.</p>
      <p class="mb-4">Este evento marcou um momento histórico para a equipe, sendo a primeira participação após o período de paralisação causado pela pandemia, representando oficialmente o retorno às competições presenciais. Na ocasião, a equipe competiu na categoria Very Small Size Soccer (VSSS), assumindo a responsabilidade de dar continuidade a um projeto herdado de gerações anteriores.</p>
      <p class="mb-4">Devido ao intervalo causado pela pandemia, todos os membros veteranos já haviam se formado, o que exigiu da nova equipe um intenso processo de aprendizado e reconstrução do conhecimento. Foi necessário compreender desde os fundamentos do funcionamento dos robôs, até a integração completa dos sistemas e estratégias de jogo, sem o suporte direto de membros experientes.</p>
      <p class="mb-4">Apesar dos desafios técnicos e estruturais, a equipe obteve a 12ª colocação na competição. Essa participação representou não apenas um desempenho competitivo relevante, mas também o restabelecimento da base técnica e organizacional da equipe, consolidando um novo ciclo de desenvolvimento.</p>
    `
  }
];

// Função que simula a requisição ao servidor
const fetchPublications = async (): Promise<Publication[]> => {
  // Mantivemos o delay (diminuí para 800ms) para exibir os Skeletons de forma elegante
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // No futuro, aqui você fará: return axios.get("/api/publicacoes")
  return PUBLICATIONS_DATA;
};

export const usePublications = () => {
  return useQuery({
    queryKey: ["publications"], // Chave única para o cache
    queryFn: fetchPublications,
    staleTime: 1000 * 60 * 5, // Os dados ficam "frescos" por 5 minutos
  });
};