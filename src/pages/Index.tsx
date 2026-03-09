import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PillarsSection from "@/components/PillarsSection";
import SubscriptionsBanner from "@/components/SubscriptionsBanner";
import ActiveEventsBar from "@/components/ActiveEventsBar";
import Footer from "@/components/Footer";
//import AchievemantSection from "@/components/AchievemantSection";
//import RobotSection from "@/components/RobotSection";
//import InvestimentSection from "@/components/InvestimentSection";
//import TechAssembly from "@/components/TechAssembly";
import PageSkeleton from "@/components/PageSkeleton";
import { Helmet } from "react-helmet-async";
import AnimatedParticles from "@/components/AnimatedParticles";


const Index = () => {

  const [isLoading, setIsLoading] = useState(true);
  const { hash } = useLocation();

  // Simula o tempo de carregamento inicial do site (2 segundos)
  useEffect(() => {
    // Por enquanto um timer para simular.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0); // 2000ms = 2 segundos

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
  if (!isLoading && hash) {
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }
  }, [isLoading, hash]);


  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AraraBot - Equipe de Robótica da UFMS</title>
        <meta name="description" content="Equipe de robótica da Universidade Federal da Mato Grosso do Sul (UFMS)" />
      </Helmet>
      <Header />
      <main>

        <section id="home">
          <HeroSection/>
        </section>
      {/* seção para adicionar publicação em ativa ou eventos */}
        <ActiveEventsBar />

        <section id="inscricoes">
          <SubscriptionsBanner />
        </section>

        <section id="pilares">
          <PillarsSection/>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Index;