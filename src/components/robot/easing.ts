export const clamp01 = (t: number): number => (t < 0 ? 0 : t > 1 ? 1 : t);

export const easeOutCubic = (t: number): number => {
  const k = clamp01(t);
  return 1 - Math.pow(1 - k, 3);
};

export const easeInOutQuad = (t: number): number => {
  const k = clamp01(t);
  return k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
};
