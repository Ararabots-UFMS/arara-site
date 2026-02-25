import TechAssembly from "./TechAssembly";

const RobotSection = () => {
  return (
    // 'items-center' removido ou trocado por 'items-stretch' (padrão)
    <section id="robo" className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      
      {/* Força o componente a ter altura de tela inteira */}
      <div className="w-full h-screen"> 
        <TechAssembly />
      </div>

    </section>
  );
}

export default RobotSection;