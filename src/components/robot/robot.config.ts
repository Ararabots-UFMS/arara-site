import { useGLTF } from '@react-three/drei';

export const Stage = {
  Intro: 0,
  Explode: 1,
  Spread: 2,
  Focus: 3,
} as const;
export type StageId = (typeof Stage)[keyof typeof Stage];

export type StageTransform = {
  position: [number, number, number];
  scale: number;
  meshOpacity: number;
  edgeOpacity: number;
  edgeColor: string;
};

export type PieceConfig = {
  id: string;
  modelUrl: string;
  edgeThreshold: number;
  label: string;
  description: string;
  accentColor: string;
  transforms: Record<StageId, StageTransform>;
  mobileTransforms?: Partial<Record<StageId, StageTransform>>;
};

export const theme = {
  brand: '#B91C1C',
  background: '#050505',
} as const;

export const transitionDurationMs: Record<StageId, number> = {
  [Stage.Intro]: 600,
  [Stage.Explode]: 600,
  [Stage.Spread]: 600,
  [Stage.Focus]: 600,
};

export const explodeAutoAdvanceMs = 1000;

export const focusHiddenTransform: StageTransform = {
  position: [0, 0, 0],
  scale: 0.01,
  meshOpacity: 0,
  edgeOpacity: 0,
  edgeColor: theme.brand,
};

export const mobileMainGroupY = {
  [Stage.Intro]: 8,
  [Stage.Explode]: 0,
  [Stage.Spread]: 0,
  [Stage.Focus]: 0,
} as const;

type CameraPreset = { position: [number, number, number]; fov: number };

export const cameraConfig: Record<'desktop' | 'mobile', CameraPreset> = {
  desktop: { position: [0, 0, 100], fov: 45 },
  mobile: { position: [0, 0, 130], fov: 55 },
};

export const pieces: PieceConfig[] = [
  {
    id: 'base',
    modelUrl: '/model1.glb',
    edgeThreshold: 8,
    label: 'Módulo Base',
    description:
      'Responsável pela propulsão e estabilidade. Estrutura usinada para suportar altos impactos durante a locomoção.',
    accentColor: '#FF6B6B',
    transforms: {
      [Stage.Intro]: { position: [0, 0, 0], scale: 1.1, meshOpacity: 1, edgeOpacity: 1, edgeColor: theme.brand },
      [Stage.Explode]: { position: [0, 0, -9], scale: 1.1, meshOpacity: 1, edgeOpacity: 1, edgeColor: theme.brand },
      [Stage.Spread]: { position: [32, 0, 0], scale: 1.1, meshOpacity: 1, edgeOpacity: 1, edgeColor: theme.brand },
      [Stage.Focus]: { position: [0, 0, 0], scale: 1.2, meshOpacity: 1, edgeOpacity: 1, edgeColor: '#FF6B6B' },
    },
    mobileTransforms: {
      [Stage.Explode]: { position: [0, 0, 9], scale: 1.0, meshOpacity: 1, edgeOpacity: 1, edgeColor: theme.brand },
      [Stage.Spread]: { position: [0, 0, 28], scale: 1.0, meshOpacity: 1, edgeOpacity: 1, edgeColor: theme.brand },
    },
  },
  {
    id: 'interno',
    modelUrl: '/model2.glb',
    edgeThreshold: 15,
    label: 'Eletrônica Core',
    description:
      'O cérebro da operação. Agrupa sensores, microcontroladores e sistema de distribuição de energia em um cluster compacto.',
    accentColor: '#3DD9D6',
    transforms: {
      [Stage.Intro]: { position: [0, 0, 0], scale: 1.1, meshOpacity: 1, edgeOpacity: 1, edgeColor: theme.brand },
      [Stage.Explode]: { position: [0, 0, -8], scale: 1.1, meshOpacity: 1, edgeOpacity: 1, edgeColor: theme.brand },
      [Stage.Spread]: { position: [0, 0, 0], scale: 1.1, meshOpacity: 1, edgeOpacity: 1, edgeColor: theme.brand },
      [Stage.Focus]: { position: [0, 0, 0], scale: 1.2, meshOpacity: 1, edgeOpacity: 1, edgeColor: '#3DD9D6' },
    },
    mobileTransforms: {
      [Stage.Explode]: { position: [0, 0, 8], scale: 1.0, meshOpacity: 1, edgeOpacity: 1, edgeColor: theme.brand },
      [Stage.Spread]: { position: [0, 0, 0], scale: 1.0, meshOpacity: 1, edgeOpacity: 1, edgeColor: theme.brand },
    },
  },
  {
    id: 'capa',
    modelUrl: '/model3.glb',
    edgeThreshold: 25,
    label: 'Chassi Externo',
    description:
      'Blindagem aerodinâmica. Projetada para desviar detritos e proteger os componentes críticos sem sacrificar a dissipação de calor.',
    accentColor: '#FFB454',
    transforms: {
      [Stage.Intro]: { position: [0, 0, 0], scale: 1.1, meshOpacity: 1, edgeOpacity: 1, edgeColor: theme.brand },
      [Stage.Explode]: { position: [0, 0, 5], scale: 1.1, meshOpacity: 1, edgeOpacity: 1, edgeColor: theme.brand },
      [Stage.Spread]: { position: [-33, 0, 0], scale: 1.1, meshOpacity: 1, edgeOpacity: 1, edgeColor: theme.brand },
      [Stage.Focus]: { position: [0, 0, 0], scale: 1.2, meshOpacity: 1, edgeOpacity: 1, edgeColor: '#FFB454' },
    },
    mobileTransforms: {
      [Stage.Explode]: { position: [0, 0, -5], scale: 1.0, meshOpacity: 1, edgeOpacity: 1, edgeColor: theme.brand },
      [Stage.Spread]: { position: [0, 0, -28], scale: 1.0, meshOpacity: 1, edgeOpacity: 1, edgeColor: theme.brand },
    },
  },
];

pieces.forEach((p) => useGLTF.preload(p.modelUrl));

export const resolveTransform = (
  piece: PieceConfig,
  stage: StageId,
  isMobile: boolean,
): StageTransform => {
  const mobileOverride = isMobile ? piece.mobileTransforms?.[stage] : undefined;
  return mobileOverride ?? piece.transforms[stage];
};
