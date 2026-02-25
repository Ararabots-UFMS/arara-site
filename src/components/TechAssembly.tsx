'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Bounds, Center } from '@react-three/drei'; // Importe o Bounds
import * as THREE from 'three';

function EdgeModel({ 
  url, 
  speed, 
  threshold = 8.78,
  modelRotation = [0, 0, 0],
  position = [0, 0, 0],
}: any) {
  const { scene } = useGLTF(url);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        
        // 1. Invisível (só queremos as linhas)
        mesh.material = new THREE.MeshBasicMaterial({ visible: false });

        // 2. Cria linhas (Edges)
        if (!mesh.userData.hasEdges) {
          const edgesGeometry = new THREE.EdgesGeometry(mesh.geometry, threshold);
          const edgesMaterial = new THREE.LineBasicMaterial({ 
            color: '#ef4444', 
            linewidth: 1, 
            transparent: true,
            opacity: 0.4, // Aumentei um pouco a opacidade para ver melhor
          });
          const edgesMesh = new THREE.LineSegments(edgesGeometry, edgesMaterial);
          mesh.add(edgesMesh);
          mesh.userData.hasEdges = true;
        }
      }
    });
  }, [clonedScene, threshold]);

  const groupRef = useRef<any>();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += speed * delta;
    }
  });

  return (
    <group position={position}>
      <group ref={groupRef}>
        {/* Removemos o Resize manual. Deixe o Bounds cuidar do tamanho */}
        <Center>
          <primitive 
            object={clonedScene} 
            rotation={modelRotation} 
          />
        </Center>
      </group>
    </group>
  );
}

export default function TechAssembly() {
  const FIX_ROTATION = [-Math.PI / 2, 0, 0]; 

  return (
    <div className="w-full h-full bg-transparent pointer-events-none">
      {/* Ajuste o FOV: 
         - Menor (ex: 25) = Mais "zoom óptico", peça mais reta (teleobjetiva).
         - Maior (ex: 50) = Mais perspectiva, peça mais distorcida (grande angular).
      */}
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 50], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1} />
        
        {/* BOUNDS: O Salvador da Pátria 
            fit = Ajusta a câmera para caber o objeto
            clip = Define os planos de corte near/far automaticamente
            margin = Margem de respiro (1.0 = justo, 1.2 = 20% de margem, 2.0 = metade do tamanho)
        */}
        <Bounds fit clip observe margin={1.2}>
          
          <EdgeModel 
            url="/model1.glb" 
            speed={0.1} 
            modelRotation={FIX_ROTATION}
            threshold={10} // Ajuste o threshold para capturar as linhas desejadas
            position={[0, -6, 0]} // Posicione o primeiro modelo um pouco à esquerda
          />
          




        </Bounds>

      </Canvas>
    </div>
  );
}