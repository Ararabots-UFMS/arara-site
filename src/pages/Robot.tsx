import Header from "@/components/Header";
import TechAssembly from "@/components/robot";
import { Helmet } from "react-helmet-async";

const Robot = () => {
  return (
    <div className="bg-[#050505] text-white font-spartan relative w-full md:h-screen md:overflow-hidden">
      <Helmet>
        <title>Nosso Robô | AraraBots</title>
      </Helmet>

      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>

      <div
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#B91C1C 1px, transparent 1px), linear-gradient(90deg, #B91C1C 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <TechAssembly />
    </div>
  );
};

export default Robot;
