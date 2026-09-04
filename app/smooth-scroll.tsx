"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Interpolated scrolling. This is what carries the "premium" feel — the
 * scroll position eases toward its target instead of jumping in the
 * browser's discrete wheel steps, so the reveal animations ride on a
 * continuous curve rather than a staircase.
 *
 * Lenis drives the real window scroll (it is not a transformed wrapper), so
 * position: sticky on the header and the scroll listener in site-motion.tsx
 * both keep working untouched.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      // Slightly gentler than the default 0.1 — a longer tail on the ease.
      lerp: 0.085,
      wheelMultiplier: 1,
      // Touch devices already have momentum scrolling; smoothing it a second
      // time feels laggy, so leave it to the platform.
      syncTouch: false,
    });

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    // Hash links have to go through Lenis, otherwise the browser jumps
    // instantly and the eased scroll is bypassed.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      const href = anchor?.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -90 });
      history.pushState(null, "", href);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
