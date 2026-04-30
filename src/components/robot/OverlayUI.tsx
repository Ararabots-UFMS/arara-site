import { Stage, type StageId, pieces, theme } from './robot.config';

type Props = {
  stage: StageId;
  focusedPiece: string | null;
  onDisassemble: () => void;
  onReassemble: () => void;
  onCloseFocus: () => void;
};

const findPiece = (id: string | null) => pieces.find((p) => p.id === id);

export const OverlayUI = ({
  stage,
  focusedPiece,
  onDisassemble,
  onReassemble,
  onCloseFocus,
}: Props) => {
  const focused = findPiece(focusedPiece);
  const accent = focused?.accentColor ?? theme.brand;

  return (
    <>
      {stage === Stage.Intro && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-10 z-10 w-[90%] max-w-md text-center pointer-events-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-2 uppercase tracking-tight">
            Arara<span style={{ color: theme.brand }}>Bots</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-6 md:mb-8">
            Modelo de engenharia holográfica. Explore os módulos estruturais do nosso robô.
          </p>
          <button
            onClick={onDisassemble}
            className="px-6 md:px-8 py-3 md:py-4 font-bold tracking-widest uppercase transition-colors"
            style={{ backgroundColor: theme.brand, color: 'white' }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = theme.brand;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = theme.brand;
              e.currentTarget.style.color = 'white';
            }}
          >
            Desmontar Robô
          </button>
        </div>
      )}

      {stage === Stage.Spread && (
        <div className="fixed left-1/2 -translate-x-1/2 top-24 z-20 pointer-events-auto">
          <button
            onClick={onReassemble}
            className="px-6 py-2 border border-gray-500 text-gray-300 uppercase tracking-widest text-sm hover:border-white hover:text-white transition-all bg-[#050505]/80 backdrop-blur-md"
          >
            ← Montar Robô
          </button>
        </div>
      )}

      {stage === Stage.Focus && focused && (
        <>
          <div
            className="absolute bottom-0 left-0 right-0 z-10 max-h-[55vh] overflow-y-auto bg-black/70 backdrop-blur-md p-6 pointer-events-auto rounded-t-2xl border-t"
            style={{
              borderColor: `${accent}55`,
              boxShadow: `0 0 30px ${accent}1A`,
            }}
          >
            <h3
              className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-4"
              style={{ color: accent }}
            >
              {focused.label}
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
              {focused.description}
            </p>
            <button
              onClick={onCloseFocus}
              className="px-6 py-2 border text-gray-300 uppercase tracking-widest text-sm hover:text-white transition-all"
              style={{ borderColor: '#6b7280' }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#6b7280';
              }}
            >
              ← Voltar para Visão Geral
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default OverlayUI;
