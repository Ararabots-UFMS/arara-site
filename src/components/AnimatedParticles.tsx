import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const AnimatedParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Configuração
    const particleCount = Math.min(window.innerWidth / 10, 15000); // Ajusta densidade baseado na largura, limite de 150
    const baseSpeed = 0.3;
    // Cor baseada na sua paleta (um vermelho primário ligeiramente transparente)
    // Se quiser pegar a variável CSS exata, é mais complexo, então usei um hex aproximado do seu tema.
    const colorRGB = "220, 38, 38"; // Ex: Tailwind red-600

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 0.5, // Tamanho entre 0.5px e 2.5px
          // Velocidade suave para cima (Y negativo) e levemente aleatória para os lados (X)
          speedX: (Math.random() - 0.5) * baseSpeed, 
          speedY: -Math.random() * baseSpeed * 2 - baseSpeed, 
          opacity: Math.random() * 0.5 + 0.2, // Opacidade inicial entre 0.2 e 0.7
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorRGB}, ${p.opacity})`;
        ctx.fill();

        // Atualizar posição
        p.x += p.speedX;
        p.y += p.speedY;

        // Efeito de "Loop Infinito" (wrap around)
        // Se sair por cima, volta por baixo
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        // Se sair pelos lados, volta pelo lado oposto
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    // Inicialização
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    drawParticles();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

    return (
    <canvas
      ref={canvasRef}
      // REMOVIDO: mix-blend-screen e -z-10 que estavam causando problemas
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default AnimatedParticles;