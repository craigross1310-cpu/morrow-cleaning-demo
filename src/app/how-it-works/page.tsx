import type { Metadata } from "next";
import { ArrowRight, CalendarDays, Check, Home, Mail, PoundSterling, Sparkles, UserCheck } from "lucide-react";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Standards } from "@/components/shared/standards";
import { CtaBand } from "@/components/shared/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { EMPTY_SELECTIONS, calculateQuote, formatMoney } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Tell us about your home, get an instant personalised price and choose a booking time — booking a Morrow clean takes about a minute.",
  alternates: { canonical: "/how-it-works" },
};

const example = calculateQuote({
  ...EMPTY_SELECTIONS,
  service: "standard",
  propertyType: "house",
  bedrooms: 3,
  bathrooms: 2,
  size: "average",
  floors: 2,
  frequency: "fortnightly",
});

const STAGES: { icon: typeof Home; title: string; body: string; meta: string; visual: ReactNode }[] = [
  {
    icon: Home,
    title: "Tell us about your home",
    body: "Choose your clean, then tap through property type, bedrooms, bathrooms and size. No forms to fill in and no phone calls.",
    meta: "About 30 seconds",
    visual: <PropertyVisual />,
  },
  {
    icon: PoundSterling,
    title: "Get your instant personalised price",
    body: "Your price updates live as you go, with every adjustment, saving and extra itemised. What you see is what you pay.",
    meta: "Fixed, transparent pricing",
    visual: <PriceVisual />,
  },
  {
    icon: CalendarDays,
    title: "Choose your booking time",
    body: "Pick a day and a morning, afternoon or evening arrival slot that suits you, Monday to Saturday. Reschedule free up to 24 hours before.",
    meta: "Free rescheduling",
    visual: <ScheduleVisual />,
  },
];

const AFTER = [
  { icon: Mail, title: "Instant confirmation", body: "Your booking details by email and SMS, straight away." },
  { icon: UserCheck, title: "Meet your cleaner", body: "We introduce your cleaner 48 hours before the visit." },
  { icon: Sparkles, title: "Enjoy your home", body: "We follow up afterwards to make sure it's perfect." },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        crumb="How it works"
        eyebrow="How it works"
        title="Three steps to a spotless home"
        intro="We've made booking a cleaner as easy as ordering a coffee."
      />

      <ol className="container-page space-y-6 py-12 sm:space-y-8 sm:py-20">
        {STAGES.map((stage, i) => (
          <Reveal as="li" key={stage.title} className="grid items-center gap-8 rounded-[2.25rem] border border-line bg-white p-6 shadow-soft sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div>
              <div className="flex items-center gap-4">
                <span className="relative flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-stone text-ink">
                  <stage.icon className="h-7 w-7" aria-hidden />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-mustard text-sm font-bold text-ink">{i + 1}</span>
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-mustard-deep">{stage.meta}</p>
              </div>
              <h2 className="heading-lg mt-6 text-[1.9rem] text-ink sm:text-4xl">{stage.title}</h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">{stage.body}</p>
            </div>
            <div className="rounded-[1.75rem] bg-gradient-to-br from-blush to-stone p-5 sm:p-8" aria-hidden>
              {stage.visual}
            </div>
          </Reveal>
        ))}
      </ol>

      <div className="container-page flex justify-center pb-8">
        <ButtonLink href="/quote" size="lg">
          Start my quote <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" aria-hidden />
        </ButtonLink>
      </div>

      <section aria-labelledby="after-title" className="py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading id="after-title" align="center" eyebrow="After you book" title="What happens next" />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {AFTER.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 0.08} className="rounded-[2rem] border border-line bg-white p-7 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-mustard-soft">
                  <a.icon className="h-5 w-5 text-ink" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl text-ink">{a.title}</h3>
                <p className="mt-2 text-ink-soft">{a.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <div className="bg-stone">
        <Standards />
      </div>

      <CtaBand />
    </>
  );
}

/* ── Small UI illustrations (decorative) ── */

function Pill({ children, active }: { children: ReactNode; active?: boolean }) {
  return (
    <span className={`flex h-11 items-center justify-center rounded-xl border text-sm font-semibold ${active ? "border-ink bg-ink text-cream" : "border-line bg-white text-ink"}`}>
      {children}
    </span>
  );
}

function PropertyVisual() {
  return (
    <div className="space-y-4 rounded-3xl bg-white p-5 shadow-soft">
      <p className="text-xs font-bold uppercase tracking-wider text-muted">Bedrooms</p>
      <div className="grid grid-cols-6 gap-1.5">
        {["S", "1", "2", "3", "4", "5+"].map((b) => (
          <Pill key={b} active={b === "3"}>{b}</Pill>
        ))}
      </div>
      <p className="text-xs font-bold uppercase tracking-wider text-muted">Bathrooms</p>
      <div className="grid grid-cols-4 gap-1.5">
        {["1", "2", "3", "4+"].map((b) => (
          <Pill key={b} active={b === "2"}>{b}</Pill>
        ))}
      </div>
    </div>
  );
}

function PriceVisual() {
  const lines = example.lines.filter((l) => l.kind !== "discount");
  return (
    <div className="rounded-3xl bg-white p-5 shadow-soft">
      <div className="flex items-baseline justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-muted">Your quote</p>
        <p className="font-display text-3xl text-ink">
          {formatMoney(example.total)}
          <span className="ml-1 font-sans text-xs text-muted">per visit</span>
        </p>
      </div>
      <ul className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
        {lines.map((l) => (
          <li key={l.id} className="flex justify-between">
            <span className="text-ink-soft">{l.label}</span>
            <span className="font-medium text-ink">{l.amount > 0 && l.kind !== "base" ? "+" : ""}{formatMoney(l.amount)}</span>
          </li>
        ))}
        <li className="flex justify-between font-semibold text-sage">
          <span>Fortnightly saving</span>
          <span>{formatMoney(-example.discount)}</span>
        </li>
      </ul>
    </div>
  );
}

function ScheduleVisual() {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-soft">
      <p className="text-xs font-bold uppercase tracking-wider text-muted">Arrival time</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {["8:00 am", "9:30 am", "11:00 am", "12:30 pm", "2:00 pm", "5:00 pm"].map((t) => (
          <Pill key={t} active={t === "9:30 am"}>{t}</Pill>
        ))}
      </div>
      <p className="mt-4 flex items-center gap-2 rounded-2xl bg-sage-soft p-3 text-sm text-sage">
        <Check className="h-4 w-4" aria-hidden /> Booked — we&apos;ll see you then.
      </p>
    </div>
  );
}
