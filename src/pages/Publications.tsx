import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import PublicationSection from "@/components/PublicationSection";

const Publications = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Publicações | AraraBot</title>
        <meta 
          name="description" 
          content="Acompanhe nossos artigos, pesquisas, competições e novidades sobre o mundo da robótica." 
        />
      </Helmet>

      <Header />

      {/* Usamos flex-grow para empurrar o footer para baixo e pt-20 para compensar o Header fixo */}
      <main className="flex-grow pt-20">
        <PublicationSection />
      </main>

      <Footer />
    </div>
  );
};

export default Publications;