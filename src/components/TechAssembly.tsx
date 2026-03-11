import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center, OrbitControls, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';

// =========================================
// COMPONENTE: TELA DE CARREGAMENTO
// =========================================
const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-[#B91C1C] font-spartan">
        <div className="w-12 h-12 border-4 border-[#B91C1C] border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_15px_#B91C1C]"></div>
        <p className="font-bold tracking-widest uppercase text-center w-48 text-shadow-sm shadow-black">
          Decodificando Holograma
        </p>
        <p className="text-2xl mt-2 font-black">{progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
};

// =========================================
// COMPONENTE: PEÇA INDIVIDUAL DA COREOGRAFIA
// =========================================
interface HoloPieceProps {
  id: string;
  url: string;
  stage: number; // 0: Intro, 1: Explode, 2: Lado-a-lado, 3: Foco
  isFocused: boolean;
  onFocus: () => void;
  explodeZ: number;
  spreadX: number;
  edgeThreshold?: number;
}

const HoloPiece = ({ 
  id, url, stage, isFocused, onFocus, explodeZ, spreadX, edgeThreshold = 45 
}: HoloPieceProps) => {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);

  const targetColor = useMemo(() => new THREE.Color(), []);
  
  // Materiais em cache
  const [meshMat] = useState(() => new THREE.MeshBasicMaterial({ color: '#050505', transparent: true, opacity: 0.85, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 }));
  const [edgeMat] = useState(() => new THREE.LineBasicMaterial({ color: 0xb91c1c, transparent: true, opacity: 0.5 }));

useMemo(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material = meshMat; 
        
        // Remove as linhas velhas se o Vite tentar recarregar a página no meio do desenvolvimento
        const oldEdges = child.children.find((c: any) => c.userData.isEdge);
        if (oldEdges) {
          child.remove(oldEdges);
          oldEdges.geometry.dispose();
        }

        const edgesGeom = new THREE.EdgesGeometry(child.geometry, edgeThreshold); 
        const edges = new THREE.LineSegments(edgesGeom, edgeMat); 
        edges.raycast = () => null; 
        edges.userData.isEdge = true; // Marca como aresta para podermos limpar
        
        child.add(edges);
      }
    });
  }, [scene, edgeThreshold, meshMat, edgeMat]);

  // Define onde a peça deve ir com base na "Cena" atual
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    let targetX = 0;
    let targetZ = 0;
    let targetScale = 1.1;
    let targetMeshOpacity = 1;
    let targetEdgeOpacity = 1;
    let targetColorHex = 0xb91c1c;

    // LÓGICA DAS CENAS
    if (stage === 0) {
      // CENA 1: Encaixadas
      targetZ = 0;
      targetX = 0;
    } else if (stage === 1) {
      // CENA 2: Explosão Vertical
      targetZ = explodeZ;
      targetX = 0;
    } else if (stage === 2) {
      // CENA 3: Lado a Lado
      targetZ = 0;
      targetX = spreadX;
    } else if (stage === 3) {
      // CENA 4: Foco na Peça
      if (isFocused) {
        targetX = 0; // Volta pro centro da tela
        targetZ = 0;
        targetScale = 1.2; // Fica gigante
        targetEdgeOpacity = 1; // Brilha mais
        targetColorHex = 0xff5555; // Fica vermelho claro
      } else {
        // As outras peças "somem"
        targetScale = 0.01;
        targetMeshOpacity = 0;
        targetEdgeOpacity = 0;
      }
    }

    // Se não for a cena de foco, garante a cor padrão
    if (stage !== 3) targetColorHex = 0xb91c1c;

    targetColor.setHex(targetColorHex);
    edgeMat.color.lerp(targetColor, 0.1);

    // Movimento suave usando Lerp (Velocidade = 0.05)
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05);
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.05));
    
    meshMat.opacity = THREE.MathUtils.lerp(meshMat.opacity, targetMeshOpacity, 0.05);
    edgeMat.opacity = THREE.MathUtils.lerp(edgeMat.opacity, targetEdgeOpacity, 0.05);
    
    meshMat.needsUpdate = true;
    edgeMat.needsUpdate = true;

    if (stage !== 3) {
      spinRef.current.rotation.z += delta * 0.3; // Todas giram
    } else {
      // TODAS as peças (focadas e invisíveis) param e se alinham juntas!
      // Assim elas nunca perdem a sincronia umas das outras.
      const currentR = spinRef.current.rotation.z;
      const targetR = Math.round(currentR / (Math.PI * 2)) * Math.PI * 2;
      spinRef.current.rotation.z = THREE.MathUtils.lerp(currentR, targetR, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={spinRef}>
        <primitive object={scene} />
      </group>
      
      {/* BOTÃO "VIEW MODEL" - Só aparece na Cena 3 (Lado a Lado) */}
      {stage === 2 && (
        <Html position={[0, -12, 0]} center zIndexRange={[100, 0]}>
          <button 
            onClick={onFocus}
            className="px-6 py-2 bg-[#B91C1C]/20 border border-[#B91C1C] text-[#B91C1C] uppercase tracking-widest text-sm font-bold backdrop-blur-md hover:bg-[#B91C1C] hover:text-white transition-all cursor-pointer whitespace-nowrap"
          >
            Analisar Módulo
          </button>
        </Html>
      )}
    </group>
  );
};

// =========================================
// CENA PRINCIPAL (ORQUESTRADOR)
// =========================================
const Scene = ({ stage, focusedPiece, setFocusedPiece }: any) => {
  const mainGroupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // 1. Move a Câmera/Grupo Principal dependendo da cena
    if (mainGroupRef.current) {
      // Na Cena 1 (Intro), o robô fica na lateral esquerda (-25). Nas outras, vai pro centro (0)
      const targetMainX = stage === 0 ? -25 : 0;
      mainGroupRef.current.position.x = THREE.MathUtils.lerp(mainGroupRef.current.position.x, targetMainX, 0.05);
    }
  });

  return (
    <group ref={mainGroupRef}>
      <group rotation={[-Math.PI / 2, 0, Math.PI]} scale={2}>
        <Center>
          <HoloPiece 
            id="base" url="/model1.glb" stage={stage} edgeThreshold={8} 
            isFocused={focusedPiece === 'base'} onFocus={() => setFocusedPiece('base')}
            explodeZ={-9} spreadX={21} // Vai para baixo na explosão, e para um lado na Cena 3
          />
          <HoloPiece 
            id="interno" url="/model2.glb" stage={stage} edgeThreshold={15} 
            isFocused={focusedPiece === 'interno'} onFocus={() => setFocusedPiece('interno')}
            explodeZ={-8} spreadX={0} // Fica meio no centro
          />
          <HoloPiece 
            id="capa" url="/model3.glb" stage={stage} edgeThreshold={25} 
            isFocused={focusedPiece === 'capa'} onFocus={() => setFocusedPiece('capa')}
            explodeZ={5} spreadX={-22} // Vai para cima na explosão, e para o outro lado na Cena 3
          />
        </Center>
      </group>
    </group>
  );
};

// =========================================
// COMPONENTE PAI (INTERFACE HTML + CANVA)
// =========================================
const TechAssembly = () => {
  const [stage, setStage] = useState(0); 
  // Estágios: 0 (Intro Esquerda) -> 1 (Explode Centro) -> 2 (Separadas Lado a Lado) -> 3 (Foco 3D)
  
  const [focusedPiece, setFocusedPiece] = useState<string | null>(null);

  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (stage !== 3 && controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [stage]);

  // Gatilho Automático: Se estiver no estágio 1 (Explosão), espera 1s e vai pro estágio 2 sozinho, para criar um efeito de "explodir e depois organizar". Assim o usuário não precisa clicar duas vezes.
  useEffect(() => {
    if (stage === 1) {
      const timer = setTimeout(() => setStage(2), 1000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Função que a peça chama quando o botão "Analisar" é clicado
  const handleFocusPiece = (id: string) => {
    setFocusedPiece(id);
    setStage(3);
  };

  return (
    <div className="w-full h-full relative font-spartan">
      
      {/* CENA 1: INTERFACE INICIAL (Fica na Direita) */}
      {stage === 0 && (
        <div className="absolute right-10 md:right-48 top-1/2 -translate-y-1/2 z-10 max-w-md pointer-events-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-2 uppercase tracking-tight">Arara<span className="text-[#B91C1C]">Bots</span></h2>
          <p className="text-gray-400 text-lg mb-8">Modelo de engenharia holográfica. Explore os módulos estruturais do nosso robô.</p>
          <button 
            onClick={() => setStage(1)}
            className="px-8 py-4 bg-[#B91C1C] text-white font-bold tracking-widest uppercase hover:bg-white hover:text-[#B91C1C] transition-colors"
          >
            Desmontar Robô
          </button>
        </div>
      )}


      {/* CENA VOLTADA: BOTÃO PARA VOLTAR PARA A CENA 1 (Intro) */}
      {stage === 2 && (
        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10 max-w-md pointer-events-auto">
          <button 
            onClick={() => setStage(0)}
            className="px-6 py-2 border border-gray-500 text-gray-300 uppercase tracking-widest text-sm hover:border-white hover:text-white transition-all"
          >
            &larr; Montar Robô
          </button>
        </div>
      )}

      {/* CENA 4: INTERFACE DE FOCO (Agora na Direita e preparada para textos grandes) */}
      {stage === 3 && (
        <>
          {/* Caixa de Texto Principal (Na Direita) */}
          {/* Adicionei 'max-h-[80vh]' e 'overflow-y-auto' para criar uma barra de rolagem interna se o texto do time for muito grande */}
          <div className="absolute right-10 md:right-16 top-1/2 -translate-y-1/2 z-10 w-[90%] max-w-lg max-h-[80vh] overflow-y-auto bg-black/50 backdrop-blur-md p-8 border border-[#B91C1C]/30 pointer-events-auto shadow-[0_0_30px_rgba(185,28,28,0.1)]">
            <h3 className="text-3xl font-bold text-[#B91C1C] uppercase tracking-widest mb-4">
              {focusedPiece === 'base' ? 'Módulo Base' : focusedPiece === 'interno' ? 'Eletrônica Core' : 'Chassi Externo'}
            </h3>
            

            {/* AQUI QUE VAI ALTERAR O TEXTO INFORMATIVO DE CADA PEÇA, DEPOIS DOS DOIS && É O TEXTO */}
            <p className="text-gray-300 leading-relaxed mb-8">
              {focusedPiece === 'base' && 'Responsável pela propulsão e estabilidade. Estrutura usinada para suportar altos impactos durante a locomoção.'}
              {focusedPiece === 'interno' && 'O cérebro da operação. Agrupa sensores, microcontroladores e sistema de distribuição de energia em um cluster compacto.'}
              {focusedPiece === 'capa' && 'Blindagem aerodinâmica. Projetada para desviar detritos e proteger os componentes críticos sem sacrificar a dissipação de calor.'}
            </p>
            
            <button 
              onClick={() => { setFocusedPiece(null); setStage(2); }} 
              className="px-6 py-2 border border-gray-500 text-gray-300 uppercase tracking-widest text-sm hover:border-white hover:text-white transition-all"
            >
              &larr; Voltar para Visão Geral
            </button>
          </div>

          {/* Dica Interativa de UX (No centro inferior da tela) */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 bg-[#050505]/80 backdrop-blur-md px-6 py-3 rounded-full border border-[#B91C1C]/50 pointer-events-none animate-pulse shadow-[0_0_15px_rgba(185,28,28,0.2)]">
            {/* Ícone de um cursor/mouse */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#B91C1C]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.543-1.59-1.59" />
            </svg>
            <span className="text-gray-300 text-xs md:text-sm tracking-widest uppercase font-bold">
              Interaja com a peça usando o mouse
            </span>
            <span className="text-gray-400 text-xs">(zoom no scroll, girar no botão esquerdo e arrastar no botão direito)</span>
          </div>
        </>
      )}

      {/* O PALCO 3D */}
      <Canvas camera={{ position: [0, 0, 100], fov: 45 }} className="pointer-events-auto">
        <Suspense fallback={<CanvasLoader />}>
          <Scene stage={stage} focusedPiece={focusedPiece} setFocusedPiece={handleFocusPiece} />
        </Suspense>
        
        {/* OrbitControls SÓ funciona livremente na Cena 4 (Foco)! */}
        <OrbitControls 
          ref={controlsRef}
          enableZoom={stage === 3} 
          enablePan={stage === 3} 
          enableRotate={stage === 3} 
        />
      </Canvas>
    </div>
  );
};

export default TechAssembly;