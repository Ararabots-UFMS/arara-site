import { useEffect, useRef, useState, useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Stage, type StageId, pieces, theme, explodeAutoAdvanceMs } from './robot.config';
import { detectWebGL } from './detectWebGL';
import { Scene } from './Scene';
import { OverlayUI } from './OverlayUI';
import { WebGLFallback, type FallbackReason } from './WebGLFallback';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';

const TechAssembly = () => {
  const isMobile = useIsMobile();
  const [stage, setStage] = useState<StageId>(Stage.Intro);
  const [focusedPiece, setFocusedPiece] = useState<string | null>(null);
  const [webglOk] = useState<boolean>(() => detectWebGL());
  const [assetError, setAssetError] = useState(false);

  const isReassemblingRef = useRef(false);

  useEffect(() => {
    if (stage !== Stage.Explode) return;
    const next: StageId = isReassemblingRef.current ? Stage.Intro : Stage.Spread;
    const timer = setTimeout(() => {
      setStage(next);
      isReassemblingRef.current = false;
    }, explodeAutoAdvanceMs);
    return () => clearTimeout(timer);
  }, [stage]);

  const focusedAccent = useMemo(
    () => pieces.find((p) => p.id === focusedPiece)?.accentColor ?? theme.brand,
    [focusedPiece],
  );

  const cssVars = {
    ['--accent' as never]: focusedAccent,
  } as React.CSSProperties;

  const handleDisassemble = () => setStage(Stage.Explode);

  const handleReassemble = () => {
    isReassemblingRef.current = true;
    setStage(Stage.Explode);
  };

  const handleAnalyze = (pieceId: string) => {
    setFocusedPiece(pieceId);
    setStage(Stage.Focus);
  };

  const handleCloseFocus = () => {
    setFocusedPiece(null);
    setStage(Stage.Spread);
  };

  const reason: FallbackReason | null = !webglOk
    ? 'no-webgl'
    : assetError
      ? 'asset-error'
      : null;

  if (reason) {
    return <WebGLFallback reason={reason} />;
  }

  return (
    <>
      <div
        className="md:absolute md:inset-0 sticky top-0 w-full h-screen z-10 font-spartan"
        style={{
          ...cssVars,
          filter: isMobile
            ? undefined
            : stage === Stage.Focus
              ? `drop-shadow(0 0 8px var(--accent))`
              : `drop-shadow(0 0 6px ${theme.brand})`,
        }}
      >
        <OverlayUI
          stage={stage}
          focusedPiece={focusedPiece}
          onDisassemble={handleDisassemble}
          onReassemble={handleReassemble}
          onCloseFocus={handleCloseFocus}
        />

        <CanvasErrorBoundary
          onError={(err) => {
            console.error('[TechAssembly] Canvas error:', err);
            setAssetError(true);
          }}
          fallback={null}
        >
          <Scene
            stage={stage}
            focusedPiece={focusedPiece}
            isMobile={isMobile}
            onAnalyze={handleAnalyze}
          />
        </CanvasErrorBoundary>
      </div>

      {isMobile && stage === Stage.Spread && (
        <div
          className="md:hidden w-full pointer-events-none"
          style={{ height: '100vh' }}
          aria-hidden
        />
      )}
    </>
  );
};

export default TechAssembly;
