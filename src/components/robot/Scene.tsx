import { Suspense, useRef, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Center, OrbitControls, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import {
  Stage,
  type StageId,
  pieces,
  cameraConfig,
  mobileMainGroupY,
  theme,
} from './robot.config';
import { HoloPiece } from './HoloPiece';
import { useDemandRender } from './useDemandRender';

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div
        className="flex flex-col items-center justify-center font-spartan"
        style={{ color: theme.brand }}
      >
        <div
          className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mb-4"
          style={{ borderColor: theme.brand, borderTopColor: 'transparent' }}
        />
        <p className="font-bold tracking-widest uppercase text-center w-48">
          Decodificando Holograma
        </p>
        <p className="text-2xl mt-2 font-black">{progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
};

type Props = {
  stage: StageId;
  focusedPiece: string | null;
  isMobile: boolean;
  onAnalyze: (pieceId: string) => void;
};

const SceneInner = ({ stage, focusedPiece, isMobile, onAnalyze }: Props) => {
  const mainGroupRef = useRef<THREE.Group>(null);
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const demand = useDemandRender();
  const [, setSettledMap] = useState<Record<string, boolean>>({});
  const settledMapRef = useRef<Record<string, boolean>>({});
  const prevStageRef = useRef(stage);
  const cameraResetActiveRef = useRef(false);

  const cam = isMobile ? cameraConfig.mobile : cameraConfig.desktop;
  const cameraResetTargetRef = useRef(new THREE.Vector3(...cam.position));

  useEffect(() => {
    cameraResetTargetRef.current.set(...cam.position);
  }, [cam]);

  const handleSettled = useCallback(
    (id: string, settled: boolean) => {
      settledMapRef.current = { ...settledMapRef.current, [id]: settled };
      setSettledMap(settledMapRef.current);

      const allSettled = pieces.every((p) => settledMapRef.current[p.id] === true);
      if (!allSettled) return;

      const canStop =
        stage === Stage.Focus || (isMobile && stage !== Stage.Spread);
      if (canStop) {
        demand.stop();
      }
    },
    [demand, stage, isMobile],
  );

  useEffect(() => {
    settledMapRef.current = {};
    demand.start();
  }, [stage, demand]);

  useEffect(() => {
    if (prevStageRef.current === Stage.Focus && stage !== Stage.Focus) {
      cameraResetActiveRef.current = true;
    }
    prevStageRef.current = stage;
  }, [stage]);

  const aspect = size.width / Math.max(1, size.height);
  const responsiveScale = isMobile
    ? 1.6
    : Math.min(1.5, Math.max(0.85, aspect * 0.78));

  useFrame(() => {
    const g = mainGroupRef.current;
    if (g) {
      let targetY = isMobile ? mobileMainGroupY[stage] : 0;

      if (!isMobile && stage === Stage.Intro) {
        targetY = 8;
      }

      if (isMobile && stage === Stage.Spread && typeof window !== 'undefined') {
        const denom = Math.max(1, window.innerHeight);
        const progress = Math.min(1, Math.max(0, window.scrollY / denom));
        targetY += -45 + 90 * progress;
      }

      g.position.x = THREE.MathUtils.lerp(g.position.x, 0, 0.05);
      g.position.y = THREE.MathUtils.lerp(g.position.y, targetY, 0.2);
    }

    if (cameraResetActiveRef.current && stage !== Stage.Focus) {
      camera.up.set(0, 1, 0);
      camera.position.lerp(cameraResetTargetRef.current, 0.1);
      camera.lookAt(0, 0, 0);

      if (camera.position.distanceTo(cameraResetTargetRef.current) < 0.05) {
        camera.position.copy(cameraResetTargetRef.current);
        camera.lookAt(0, 0, 0);
        cameraResetActiveRef.current = false;
      }
    }
  });

  return (
    <>
      <group ref={mainGroupRef}>
        <group rotation={[-Math.PI / 2, 0, Math.PI]} scale={responsiveScale}>
          <Center>
            {pieces.map((piece) => (
              <HoloPiece
                key={piece.id}
                piece={piece}
                stage={stage}
                isFocused={focusedPiece === piece.id}
                isMobile={isMobile}
                onAnalyze={() => onAnalyze(piece.id)}
                onSettled={handleSettled}
              />
            ))}
          </Center>
        </group>
      </group>

      {stage === Stage.Focus && (
        <OrbitControls
          enableZoom
          enablePan
          enableRotate
          enableDamping
          dampingFactor={0.08}
        />
      )}
    </>
  );
};

export const Scene = (props: Props) => {
  const { isMobile } = props;
  const cam = isMobile ? cameraConfig.mobile : cameraConfig.desktop;
  return (
    <Canvas
      frameloop="demand"
      camera={{ position: cam.position, fov: cam.fov }}
      dpr={[1, isMobile ? 1 : 2]}
      onCreated={({ gl }) => {
        gl.setClearColor(theme.background, 0);
      }}
      className="pointer-events-auto"
    >
      <Suspense fallback={<CanvasLoader />}>
        <SceneInner {...props} />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
