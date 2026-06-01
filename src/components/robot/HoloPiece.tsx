import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  Stage,
  type StageId,
  type PieceConfig,
  type StageTransform,
  resolveTransform,
  focusHiddenTransform,
  transitionDurationMs,
} from './robot.config';
import { easeOutCubic, easeInOutQuad, clamp01 } from './easing';

type Props = {
  piece: PieceConfig;
  stage: StageId;
  isFocused: boolean;
  isMobile: boolean;
  onAnalyze: () => void;
  onSettled: (id: string, settled: boolean) => void;
};

const SETTLED_EPSILON = 0.001;
const COLOR_EPSILON = 0.005;

const colorEqual = (a: THREE.Color, b: THREE.Color): boolean =>
  Math.abs(a.r - b.r) < COLOR_EPSILON &&
  Math.abs(a.g - b.g) < COLOR_EPSILON &&
  Math.abs(a.b - b.b) < COLOR_EPSILON;

export const HoloPiece = ({
  piece,
  stage,
  isFocused,
  isMobile,
  onAnalyze,
  onSettled,
}: Props) => {
  const { scene } = useGLTF(piece.modelUrl);
  const groupRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);
  const invalidate = useThree((s) => s.invalidate);

  const meshMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#050505',
        transparent: true,
        opacity: piece.transforms[Stage.Intro].meshOpacity,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      }),
    [piece.transforms],
  );

  const edgeMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color(piece.transforms[Stage.Intro].edgeColor),
        transparent: true,
        opacity: piece.transforms[Stage.Intro].edgeOpacity,
      }),
    [piece.transforms],
  );

  useEffect(() => {
    const edgeChildren: THREE.LineSegments[] = [];
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.material = meshMat;

      const stale = mesh.children.filter((c) => c.userData.isEdge);
      stale.forEach((c) => {
        mesh.remove(c);
        const seg = c as THREE.LineSegments;
        seg.geometry.dispose();
      });

      const edgeGeom = new THREE.EdgesGeometry(mesh.geometry, piece.edgeThreshold);
      const edges = new THREE.LineSegments(edgeGeom, edgeMat);
      edges.raycast = () => null;
      edges.userData.isEdge = true;
      mesh.add(edges);
      edgeChildren.push(edges);
    });

    return () => {
      edgeChildren.forEach((edges) => {
        edges.parent?.remove(edges);
        edges.geometry.dispose();
      });
      meshMat.dispose();
      edgeMat.dispose();
    };
  }, [scene, piece.edgeThreshold, meshMat, edgeMat]);

  const startRef = useRef<StageTransform>(piece.transforms[Stage.Intro]);
  const targetRef = useRef<StageTransform>(piece.transforms[Stage.Intro]);
  const elapsedRef = useRef(0);
  const startEdgeColor = useRef(new THREE.Color(piece.transforms[Stage.Intro].edgeColor));
  const targetEdgeColor = useRef(new THREE.Color(piece.transforms[Stage.Intro].edgeColor));

  const spinSnapshot = useRef<number | null>(null);

  const settledRef = useRef(false);
  const reportSettled = (next: boolean) => {
    if (settledRef.current === next) return;
    settledRef.current = next;
    onSettled(piece.id, next);
  };

  useEffect(() => {
    const resolved =
      stage === Stage.Focus && !isFocused
        ? focusHiddenTransform
        : resolveTransform(piece, stage, isMobile);

    const g = groupRef.current;
    const sp = spinRef.current;
    if (g) {
      startRef.current = {
        position: [g.position.x, g.position.y, g.position.z],
        scale: g.scale.x,
        meshOpacity: meshMat.opacity,
        edgeOpacity: edgeMat.opacity,
        edgeColor: '#000000',
      };
      startEdgeColor.current.copy(edgeMat.color);
    }

    targetRef.current = resolved;
    targetEdgeColor.current = new THREE.Color(resolved.edgeColor);
    elapsedRef.current = 0;
    reportSettled(false);

    if (sp) {
      if (stage === Stage.Focus && spinSnapshot.current === null) {
        spinSnapshot.current = sp.rotation.z;
      }
      if (stage !== Stage.Focus && spinSnapshot.current !== null) {
        sp.rotation.z = spinSnapshot.current;
        spinSnapshot.current = null;
      }
    }

    invalidate();
  }, [stage, isFocused, isMobile, piece.id]);

  useFrame((_, delta) => {
    const g = groupRef.current;
    const sp = spinRef.current;
    if (!g || !sp) return;

    const duration = transitionDurationMs[stage];
    elapsedRef.current += delta * 1000;
    const t = clamp01(elapsedRef.current / duration);
    const easeMove = easeOutCubic(t);
    const easeFade = easeInOutQuad(t);

    const start = startRef.current;
    const target = targetRef.current;

    g.position.x = THREE.MathUtils.lerp(start.position[0], target.position[0], easeMove);
    g.position.y = THREE.MathUtils.lerp(start.position[1], target.position[1], easeMove);
    g.position.z = THREE.MathUtils.lerp(start.position[2], target.position[2], easeMove);

    const sc = THREE.MathUtils.lerp(start.scale, target.scale, easeMove);
    g.scale.setScalar(sc);

    meshMat.opacity = THREE.MathUtils.lerp(start.meshOpacity, target.meshOpacity, easeFade);
    edgeMat.opacity = THREE.MathUtils.lerp(start.edgeOpacity, target.edgeOpacity, easeFade);
    edgeMat.color.lerpColors(startEdgeColor.current, targetEdgeColor.current, easeFade);

    const spinning = stage !== Stage.Focus && !isMobile;
    const inFlight = t < 1;
    const spinSpeed = !spinning ? 0 : inFlight ? 0.15 : 0.3;
    sp.rotation.z += delta * spinSpeed;

    const positionSettled =
      Math.abs(g.position.x - target.position[0]) < SETTLED_EPSILON &&
      Math.abs(g.position.y - target.position[1]) < SETTLED_EPSILON &&
      Math.abs(g.position.z - target.position[2]) < SETTLED_EPSILON;
    const scaleSettled = Math.abs(sc - target.scale) < SETTLED_EPSILON;
    const opacitySettled =
      Math.abs(meshMat.opacity - target.meshOpacity) < SETTLED_EPSILON &&
      Math.abs(edgeMat.opacity - target.edgeOpacity) < SETTLED_EPSILON;
    const colorSettled = colorEqual(edgeMat.color, targetEdgeColor.current);

    if (positionSettled && scaleSettled && opacitySettled && colorSettled && t >= 1) {
      g.position.set(target.position[0], target.position[1], target.position[2]);
      g.scale.setScalar(target.scale);
      meshMat.opacity = target.meshOpacity;
      edgeMat.opacity = target.edgeOpacity;
      edgeMat.color.copy(targetEdgeColor.current);
      reportSettled(true);
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={spinRef}>
        <primitive object={scene} />
      </group>

      {stage === Stage.Spread && (
        <Html
          position={isMobile ? [0, 0, -5] : [0, 0, -8]}
          center
          zIndexRange={[100, 0]}
        >
          <button
            onClick={onAnalyze}
            className="px-6 py-2 bg-[#B91C1C]/20 border text-[#B91C1C] uppercase tracking-widest text-sm font-bold backdrop-blur-md hover:bg-[#B91C1C] hover:text-white transition-all cursor-pointer whitespace-nowrap"
            style={{ borderColor: '#B91C1C' }}
          >
            Analisar Módulo
          </button>
        </Html>
      )}
    </group>
  );
};

export default HoloPiece;
