"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Blocks that fade their own children in, one after another. */
const BLOCK_SELECTOR = [
  "main > section",
  "main > footer",
  "main > article",
  "main > div.section-shell",
  "[data-reveal]",
].join(", ");

const STAGGER_MS = 95;
const MAX_DELAY_MS = 570;
/** A unit reveals once its own top edge is this far into the viewport. */
const TRIGGER_RATIO = 0.9;

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    // The inline script in the layout armed the entrance before first paint
    // and left a failsafe running in case hydration never happened. It did,
    // so stand it down.
    const failsafe = (window as unknown as { __motionFailsafe?: number })
      .__motionFailsafe;
    if (failsafe) window.clearTimeout(failsafe);
    root.classList.add("motion-ready");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const blocks = Array.from(
      document.querySelectorAll<HTMLElement>(BLOCK_SELECTOR),
    );

    // Mirrors the CSS in globals.css: a direct child holding three or more
    // items staggers those items individually; anything else is one unit.
    // Keep the >= 3 threshold in step with the :has(> :nth-child(3)) test.
    const unitsOf = (block: HTMLElement): HTMLElement[] =>
      Array.from(block.children).flatMap((child) =>
        child.children.length >= 3
          ? (Array.from(child.children) as HTMLElement[])
          : [child as HTMLElement],
      );

    // Units are tracked individually rather than per block. Triggering a
    // whole section on its top edge means everything inside a tall section
    // has finished fading before you scroll down to it, which reads as no
    // animation at all.
    const units: HTMLElement[] = [];
    const tracked = new WeakSet<HTMLElement>();
    const register = (block: HTMLElement) => {
      block.classList.add("reveal");
      if (!blocks.includes(block)) blocks.push(block);
      const added: HTMLElement[] = [];
      unitsOf(block).forEach((unit, index) => {
        if (tracked.has(unit)) return;
        tracked.add(unit);
        unit.style.setProperty(
          "--reveal-delay",
          `${Math.min(index * STAGGER_MS, MAX_DELAY_MS)}ms`,
        );
        units.push(unit);
        added.push(unit);
      });
      return added;
    };
    for (const block of [...blocks]) register(block);

    const cleanup = () => {
      root.classList.remove("motion-ready");
      for (const block of blocks) block.classList.remove("reveal");
      for (const unit of units) unit.classList.remove("is-in");
    };

    // Rect checks rather than IntersectionObserver: an observer can miss a
    // block that is scrolled past between two callback deliveries, which
    // would leave that section invisible for good.
    let pending: HTMLElement[] = reduced ? [] : [...units];
    let frame = 0;

    // Client components swap markup after hydration — the booking calendar
    // replaces its loading placeholder once availability arrives. The hiding
    // CSS is structural, so a node inserted later starts invisible, and if
    // nothing registers it, it stays invisible for good. Watch for inserted
    // elements and register them like the originals; anything already in
    // view simply fades in on the next check.
    const observer = new MutationObserver((mutations) => {
      const insertedElement = mutations.some((mutation) =>
        Array.from(mutation.addedNodes).some((node) => node.nodeType === Node.ELEMENT_NODE),
      );
      if (!insertedElement) return;
      const fresh: HTMLElement[] = [];
      for (const block of document.querySelectorAll<HTMLElement>(BLOCK_SELECTOR)) {
        fresh.push(...register(block));
      }
      if (!fresh.length) return;
      if (reduced) {
        for (const unit of fresh) unit.classList.add("is-in");
        return;
      }
      pending.push(...fresh);
      schedule();
    });
    const main = document.querySelector("main");
    if (main) observer.observe(main, { childList: true, subtree: true });

    if (reduced) {
      for (const unit of units) unit.classList.add("is-in");
      return () => {
        observer.disconnect();
        cleanup();
      };
    }

    const check = () => {
      frame = 0;
      root.classList.toggle("is-scrolled", window.scrollY > 8);
      if (!pending.length) return;
      const trigger = window.innerHeight * TRIGGER_RATIO;
      const stillPending: HTMLElement[] = [];
      for (const unit of pending) {
        const { top, bottom } = unit.getBoundingClientRect();
        if (top < trigger && bottom > 0) unit.classList.add("is-in");
        else if (top >= trigger) stillPending.push(unit);
        else unit.classList.add("is-in"); // scrolled past — never hide it
      }
      pending = stillPending;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    check();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      cleanup();
    };
  }, [pathname]);

  return null;
}
