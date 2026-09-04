"use client";

import { usePathname } from "next/navigation";

/**
 * Replays a short fade on every pathname change. Hash links (#work) keep the
 * same pathname, so in-page navigation is left alone.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
