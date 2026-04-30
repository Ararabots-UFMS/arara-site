import { pieces, theme, type PieceConfig } from './robot.config';

export type FallbackReason = 'no-webgl' | 'asset-error';

const banners: Record<FallbackReason, string> = {
  'no-webgl':
    'Visualização interativa indisponível neste navegador. Mostrando blueprint estático.',
  'asset-error':
    'Falha ao carregar modelos 3D. Mostrando blueprint estático.',
};

const PieceCard = ({ piece }: { piece: PieceConfig }) => (
  <div
    className="flex-1 min-w-0 bg-black/40 backdrop-blur-sm border p-6 md:p-8"
    style={{
      borderColor: piece.accentColor,
      boxShadow: `0 0 24px ${piece.accentColor}33`,
    }}
  >
    <svg
      viewBox="0 0 100 100"
      className="w-full h-32 md:h-40 mb-4"
      aria-hidden="true"
    >
      <polygon
        points="50,8 88,30 88,70 50,92 12,70 12,30"
        fill="none"
        stroke={piece.accentColor}
        strokeWidth="1.5"
        opacity="0.9"
      />
      <polygon
        points="50,24 72,38 72,62 50,76 28,62 28,38"
        fill="none"
        stroke={piece.accentColor}
        strokeWidth="1"
        opacity="0.5"
      />
      <line x1="50" y1="8" x2="50" y2="24" stroke={piece.accentColor} strokeWidth="0.75" opacity="0.4" />
      <line x1="88" y1="30" x2="72" y2="38" stroke={piece.accentColor} strokeWidth="0.75" opacity="0.4" />
      <line x1="88" y1="70" x2="72" y2="62" stroke={piece.accentColor} strokeWidth="0.75" opacity="0.4" />
      <line x1="50" y1="92" x2="50" y2="76" stroke={piece.accentColor} strokeWidth="0.75" opacity="0.4" />
      <line x1="12" y1="70" x2="28" y2="62" stroke={piece.accentColor} strokeWidth="0.75" opacity="0.4" />
      <line x1="12" y1="30" x2="28" y2="38" stroke={piece.accentColor} strokeWidth="0.75" opacity="0.4" />
    </svg>
    <h3
      className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-3"
      style={{ color: piece.accentColor }}
    >
      {piece.label}
    </h3>
    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
      {piece.description}
    </p>
  </div>
);

export const WebGLFallback = ({ reason }: { reason: FallbackReason }) => (
  <div
    className="w-full h-full flex flex-col items-stretch p-4 md:p-12 pt-24 overflow-y-auto font-spartan"
    style={{ backgroundColor: theme.background }}
  >
    <div
      className="mb-6 px-4 py-3 border text-sm md:text-base text-center"
      style={{ borderColor: theme.brand, color: theme.brand }}
      role="alert"
    >
      {banners[reason]}
    </div>

    <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-1">
      {pieces.map((piece) => (
        <PieceCard key={piece.id} piece={piece} />
      ))}
    </div>

    <div className="mt-6 text-center">
      <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
        Arara<span style={{ color: theme.brand }}>Bots</span>
      </h2>
      <p className="text-gray-400 text-sm md:text-base mt-2 max-w-2xl mx-auto">
        Modelo de engenharia. Os módulos estruturais do nosso robô.
      </p>
    </div>
  </div>
);

export default WebGLFallback;
