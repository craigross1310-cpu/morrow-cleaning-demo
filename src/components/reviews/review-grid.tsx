"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ReviewCard } from "@/components/shared/review-card";
import { REVIEWS } from "@/content/reviews";
import { SERVICES } from "@/config/pricing";
import type { ServiceId } from "@/config/pricing";

export function ReviewGrid() {
  const [filter, setFilter] = useState<ServiceId | "all">("all");
  const options = SERVICES.filter((s) => REVIEWS.some((r) => r.service === s.id));
  const shown = filter === "all" ? REVIEWS : REVIEWS.filter((r) => r.service === filter);

  return (
    <div>
      <div role="group" aria-label="Filter reviews by service" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {[{ id: "all" as const, shortName: "All reviews" }, ...options].map((o) => {
          const active = filter === o.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(o.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                active ? "border-ink bg-ink text-cream" : "border-line bg-white text-ink-soft hover:border-ink/30 hover:text-ink"
              }`}
            >
              {o.shortName}
            </button>
          );
        })}
      </div>

      <motion.ul layout className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((r) => (
            <motion.li
              key={r.name}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ReviewCard review={r} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
