"use client";

import { Photo } from "@/components/ui/photo";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button";
import { AnimatedPrice } from "@/components/ui/animated-price";
import { EMPTY_SELECTIONS, calculateQuote, formatDuration, getService } from "@/lib/pricing";
import type { QuoteSelections } from "@/lib/pricing";
import { formatShortDate, nextAvailableSlot } from "@/lib/availability";
import { useBooking } from "@/lib/booking-store";

const PREVIEWS: { selections: QuoteSelections; summary: string; tags: string[] }[] = [
  {
    selections: { ...EMPTY_SELECTIONS, service: "standard", propertyType: "apartment", bedrooms: 2, bathrooms: 1, size: "average", floors: 1, frequency: "fortnightly" },
    summary: "2 bed apartment",
    tags: ["Fortnightly", "−15%"],
  },
  {
    selections: { ...EMPTY_SELECTIONS, service: "deep", propertyType: "house", bedrooms: 3, bathrooms: 2, size: "spacious", floors: 2, frequency: "one-off", extras: ["oven"] },
    summary: "3 bed house",
    tags: ["One-off", "+ Oven"],
  },
  {
    selections: { ...EMPTY_SELECTIONS, service: "end-of-tenancy", propertyType: "apartment", bedrooms: 2, bathrooms: 2, size: "average", floors: 1, frequency: "one-off", extras: ["windows"] },
    summary: "2 bed apartment",
    tags: ["One-off", "+ Windows"],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

/** Stagger offset for the CSS entrance animations (see .anim-* in globals.css). */
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-gradient-to-b from-blush via-cream to-cream pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-36">
      <div className="pointer-events-none absolute -left-32 top-10 h-[30rem] w-[30rem] rounded-full bg-mustard/15 blur-[110px]" aria-hidden />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[26rem] w-[26rem] rounded-full bg-blush-deep blur-[100px]" aria-hidden />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        {/* Copy */}
        <div className="max-w-xl">
          <p className="eyebrow anim-rise">Premium home cleaning · London</p>
          <h1 className="heading-xl mt-6 text-[2.75rem] text-ink min-[400px]:text-[3rem] sm:text-7xl lg:text-[3.6rem] xl:text-[4.6rem]">
            <span className="anim-rise block" style={delay(60)}>
              Your home,
            </span>
            <span className="anim-rise block" style={delay(140)}>
              <span className="relative inline-block whitespace-nowrap italic">
                beautifully clean.
                <svg viewBox="0 0 300 20" className="absolute -bottom-2 left-0 h-3.5 w-full text-mustard" preserveAspectRatio="none" aria-hidden>
                  <path d="M4 14 C 70 4, 160 4, 296 10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" pathLength={1} className="anim-draw" style={delay(550)} />
                </svg>
              </span>
            </span>
          </h1>

          <p style={delay(220)} className="anim-rise mt-8 text-lg leading-relaxed text-ink-soft sm:text-xl">
            Professional home cleaning, tailored to your space and your schedule.
          </p>

          <div style={delay(300)} className="anim-rise mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quote" variant="primary" size="lg">
              Get an instant quote
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/services" variant="outline" size="lg">
              Explore our services
            </ButtonLink>
          </div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-[36rem] lg:max-w-none">
          <div className="anim-pop relative aspect-[4/4.6] overflow-hidden rounded-[2.5rem] bg-stone shadow-lift sm:aspect-[5/5.2]">
            <motion.div style={{ y: imageY }} className="absolute inset-[-6%_0_-6%_0]">
              <Photo
                src="/images/hero-home.jpg"
                alt="A bright, freshly cleaned living room with sage walls, plants and a woven rug"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 92vw"
                className="object-cover object-[35%_center]"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" aria-hidden />
          </div>

          {/* Live quote preview */}
          <motion.div style={{ y: cardY }} className="relative z-10 mx-auto -mt-20 w-[88%] max-w-[20rem] sm:absolute sm:-bottom-10 sm:-left-8 sm:mx-0 sm:mt-0 sm:w-[19rem]">
            <div className="anim-rise" style={delay(380)}>
              <QuotePreview />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function QuotePreview() {
  const [index, setIndex] = useState(0);
  const { today } = useBooking();

  // The first preview renders fully visible in the server HTML; only later ones animate in.
  const [cycled, setCycled] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCycled(true);
      setIndex((i) => (i + 1) % PREVIEWS.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  const preview = PREVIEWS[index];
  const quote = useMemo(() => calculateQuote(preview.selections), [preview]);
  const service = getService(preview.selections.service);
  const next = useMemo(() => (today ? nextAvailableSlot(today) : null), [today]);

  return (
    <div className="rounded-[1.75rem] border border-white/60 bg-white/95 p-5 shadow-lift backdrop-blur" aria-label="Example instant quote" role="img">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
          </span>
          Live quote
        </span>
        <span className="text-xs text-muted">≈ {formatDuration(quote.onSiteMinutes)}</span>
      </div>

      <div className="relative mt-3 h-[3.25rem] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45, ease }}
            className="absolute inset-0"
          >
            <p className="font-display text-lg leading-tight text-ink">{service?.shortName}</p>
            <p className="text-sm text-muted">{preview.summary}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 flex gap-1.5">
        {preview.tags.map((t) => (
          <motion.span
            key={`${index}-${t}`}
            initial={cycled ? { opacity: 0, scale: 0.85 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${t.startsWith("−") ? "bg-sage-soft text-sage" : "bg-stone text-ink-soft"}`}
          >
            {t}
          </motion.span>
        ))}
      </div>

      <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
        <div>
          <p className="text-xs text-muted">{quote.isRecurring ? "Per visit" : "Total"}</p>
          <AnimatedPrice value={quote.total} className="font-display text-3xl font-medium text-ink" />
        </div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mustard text-ink">
          <Check className="h-5 w-5" aria-hidden />
        </span>
      </div>

      <p className="mt-3 min-h-4 text-xs text-ink-soft">
        {next ? (
          <>
            Next available: <span className="font-semibold">{formatShortDate(next.iso)}, {next.slot.label}</span>
          </>
        ) : (
          " "
        )}
      </p>
    </div>
  );
}
