"use client";

import { useEffect, useState } from "react";

/* Hover-scroll card: a fixed frame showing the top of a full-page screenshot
   that scrolls to the bottom on hover or keyboard focus. Ported from the
   DebtReliefBiz sales page; styling lives in globals.css under ".drb-shot". */
export function Preview({
  src,
  label,
  href,
  width,
  height,
  ratio = "4 / 3",
  slow = 1,
}: {
  src: string;
  label: string;
  href?: string;
  width: number;
  height: number;
  ratio?: string;
  slow?: number;
}) {
  // Travel distance is the image height beyond one frame; about 650px a second.
  const frame = width * (ratio === "4 / 3" ? 0.75 : 0.625);
  const duration = Math.min(10, Math.max(2.5, (height - frame) / 650)) * slow;
  const inner = (
    <span
      className="drb-shot"
      style={{ aspectRatio: ratio, ["--scroll-dur" as string]: `${duration}s` }}
      tabIndex={href ? undefined : 0}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`Full-page screenshot: ${label}`}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
    </span>
  );

  if (!href) return inner;
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={`${label} — open the live demo`}>
      {inner}
    </a>
  );
}

export function SideNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="drb-sidenav">
      <strong>DebtReliefBiz</strong>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className={active === item.id ? "is-active" : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
