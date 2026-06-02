"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

type Props = { children: React.ReactNode };

export function SmoothScrollProvider({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,        // um pouco mais responsivo (0.1 = padrão, menor = mais lerp)
      smoothWheel: true,
      syncTouch: true,   // mantém suavidade no touch/mobile
      touchMultiplier: 1.5,
      wheelMultiplier: 1.0,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Intercepta cliques em links âncora e usa Lenis para deslizar suavemente
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const id = href.slice(1);
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      lenis.scrollTo(el, { offset: -80, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
}
