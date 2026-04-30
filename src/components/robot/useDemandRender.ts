import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';

export const useDemandRender = () => {
  const activeRef = useRef(false);
  const invalidate = useThree((s) => s.invalidate);

  useFrame(() => {
    if (activeRef.current) invalidate();
  });

  useEffect(() => {
    invalidate();
  }, [invalidate]);

  return {
    start: () => {
      activeRef.current = true;
      invalidate();
    },
    stop: () => {
      activeRef.current = false;
    },
  };
};
