import { useEffect, useRef } from "react";

interface AnimatedGridProps {
  inverted?: boolean;
}

const AnimatedGrid = ({ inverted = false }: AnimatedGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let offset = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawGrid = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const horizonY = inverted ? canvas.height : 0;
      const vanishingPointX = canvas.width / 2;
      const gridLines = 20;
      const verticalLines = 30;
      const speed = 0.005;
      const colorBase = "355, 85%, 47%"; // Extraí a cor base para facilitar o uso nos gradientes

      // Animate offset
      offset += speed;
      if (offset >= 1) offset = 0;

      // --- LINHAS HORIZONTAIS (Mantido o efeito de seno anterior) ---
      ctx.lineWidth = 2;

      for (let i = 0; i <= gridLines; i++) {
        const progress = (i + offset) / gridLines;
        
        const perspectiveDistance = Math.pow(progress, 2) * canvas.height;
        
        const y = inverted 
          ? horizonY - perspectiveDistance 
          : horizonY + perspectiveDistance;
        
        const perspectiveScale = progress;
        const spreadFactor = 10; 
        const leftX = vanishingPointX - (vanishingPointX * perspectiveScale * spreadFactor);
        const rightX = vanishingPointX + ((canvas.width - vanishingPointX) * perspectiveScale * spreadFactor);
        
        // Fade in e Fade out usando seno
        const alpha = Math.sin(progress * Math.PI) * 0.4;
        
        ctx.strokeStyle = `hsla(${colorBase}, ${alpha})`;
        
        ctx.beginPath();
        ctx.moveTo(leftX, y);
        ctx.lineTo(rightX, y);
        ctx.stroke();
      }

      // --- LINHAS VERTICAIS (MODIFICADO PARA TER FADE) ---
      for (let i = -verticalLines; i <= verticalLines; i++) {
        const spreadX = (i / verticalLines) * canvas.width * 10;
        const bottomX = vanishingPointX + spreadX;
        
        // Define onde a linha termina (topo ou base da tela dependendo da inversão)
        const endY = inverted ? 0 : canvas.height;

        // Cálculo do fade lateral (linhas centrais mais fortes que as laterais)
        // Reduzi um pouco o multiplicador final (0.5) para não ficar estourado no meio com o novo gradiente
        const baseOpacity = (1 - Math.abs(i / verticalLines) * 0.5) * 0.5;

        // --- CRIAÇÃO DO GRADIENTE VERTICAL ---
        // Cria um gradiente que vai do horizonte (horizonY) até o fim da tela (endY)
        const lineGradient = ctx.createLinearGradient(vanishingPointX, horizonY, bottomX, endY);

        // Ponto 0 (Horizonte): Transparente
        lineGradient.addColorStop(0, `hsla(${colorBase}, 0)`);
        
        // Ponto 0.5 (Meio do caminho): Visível (usando a opacidade lateral calculada acima)
        // Se quiser que o "meio" seja mais para perto da câmera, aumente o 0.5 para 0.7 por exemplo
        lineGradient.addColorStop(0.6, `hsla(${colorBase}, ${baseOpacity})`);
        
        // Ponto 1 (Fim da tela/Perto da câmera): Transparente novamente
        lineGradient.addColorStop(1, `hsla(${colorBase}, 0)`);

        // Aplica o gradiente como estilo da linha
        ctx.strokeStyle = lineGradient;
        // -------------------------------------
        
        ctx.beginPath();
        ctx.moveTo(vanishingPointX, horizonY);
        ctx.lineTo(bottomX, endY);
        ctx.stroke();
      }

      // Add glow effect at horizon (Mantido igual)
      const gradient = ctx.createRadialGradient(
        vanishingPointX,
        horizonY,
        0,
        vanishingPointX,
        horizonY,
        canvas.width * 0.5
      );
      gradient.addColorStop(0, `hsla(${colorBase}, 0.3)`);
      gradient.addColorStop(0.5, `hsla(${colorBase}, 0.1)`);
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(drawGrid);
    };

    resize();
    window.addEventListener("resize", resize);
    drawGrid();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [inverted]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ background: "hsl(0, 0%, 4%)" }}
    />
  );
};

export default AnimatedGrid;