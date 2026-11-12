"use client";

import { motion } from "motion/react";
import { MoveHorizontal } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Photo } from "@/components/ui/photo";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  label: string;
  sizes?: string;
  aspect?: string;
  initial?: number;
}

/** Draggable (and keyboard-accessible) before/after comparison. */
export function BeforeAfterSlider({ before, after, beforeAlt, afterAlt, label, sizes = "(min-width: 1024px) 60vw, 92vw", aspect = "aspect-[3/2]", initial = 50 }: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const frame = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <div
      ref={frame}
      className={`relative ${aspect} w-full touch-pan-y has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-ink has-[input:focus-visible]:ring-offset-4 has-[input:focus-visible]:ring-offset-cream select-none overflow-hidden rounded-[2rem] bg-stone shadow-lift ${dragging ? "cursor-grabbing" : "cursor-ew-resize"}`}
      onPointerDown={(e) => {
        (e.target as Element).setPointerCapture?.(e.pointerId);
        setDragging(true);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging && updateFromClientX(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <Photo src={after} alt={afterAlt} fill sizes={sizes} className="pointer-events-none object-cover" draggable={false} />
      <div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Photo src={before} alt={beforeAlt} fill sizes={sizes} className="object-cover" draggable={false} />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/75 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-cream backdrop-blur">Before</span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-mustard px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-ink">After</span>

      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgb(0_0_0/0.35)]" style={{ left: `${pos}%` }} aria-hidden>
        <motion.span
          animate={{ scale: dragging ? 1.12 : 1 }}
          className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lift"
        >
          <MoveHorizontal className="h-5 w-5" />
        </motion.span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`${label} — before and after comparison`}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
      />
    </div>
  );
}
