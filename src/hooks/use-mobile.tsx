import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const widthMql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const pointerMql = window.matchMedia('(pointer: coarse)');

    const update = () => {
      setIsMobile(widthMql.matches || pointerMql.matches);
    };

    update();
    widthMql.addEventListener("change", update);
    pointerMql.addEventListener("change", update);

    return () => {
      widthMql.removeEventListener("change", update);
      pointerMql.removeEventListener("change", update);
    };
  }, []);

  return !!isMobile;
}
