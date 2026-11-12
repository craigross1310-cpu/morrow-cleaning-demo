import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Staggers the effect slightly later in the scroll (seconds-ish, kept for API compatibility). */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}

/**
 * Fades and lifts content in as it scrolls into view.
 *
 * Pure CSS (scroll-driven animations — see `.reveal` in globals.css), so the
 * content is in the page and visible from the very first paint: nothing waits
 * for JavaScript to download. Browsers without scroll-driven animation
 * support simply show the content without the effect.
 */
export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: RevealProps) {
  const style = delay ? ({ "--reveal-shift": `${Math.min(delay, 0.3) * 60}%` } as CSSProperties) : undefined;
  return (
    <Tag className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}
