import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Support from "./pages/Support";
import Sponsorship from "./pages/Sponsorship";
import Publications from "./pages/Publications";
import Subscriptions from "./pages/Subscriptions";
import About from "./pages/About";
import InProduction from "./pages/InProduction";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* <BrowserRouter> */}
        <BrowserRouter basename="/arara-site">
        <ScrollToTop/>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/apoie" element={<Support />} />
            <Route path="/patrocinio" element={<Sponsorship />} />
            <Route path="/publicacoes" element={<Publications />} />
            <Route path="/inscricao" element={<Subscriptions />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/robo" element={<InProduction />} /> {/* Rota para a página "Em Construção" */} {/*Quando estiver pronto, substituir o termo "{<InProduction />}" para "{<Robot />}"*/}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
        {/* </BrowserRouter> */}
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
