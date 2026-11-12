import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { BeforeAfterSlider } from "@/components/shared/before-after-slider";
import { CtaBand } from "@/components/shared/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { DEEP_CLEAN_DETAILS, QUALITY_STANDARDS, TRANSFORMATIONS } from "@/content/results";

export const metadata: Metadata = {
  title: "Before & After Results",
  description: "See the difference a Morrow clean makes — drag the sliders to compare kitchens, bathrooms and living spaces before and after.",
  alternates: { canonical: "/results" },
};

export default function ResultsPage() {
  const [featured, ...others] = TRANSFORMATIONS;
  return (
    <>
      <PageHeader
        crumb="Results"
        eyebrow="Before & after"
        title="The difference is in the detail"
        intro="Drag any slider to compare. Every clean follows the same detailed checklist, right down to the grout lines."
      />

      <section aria-labelledby={`${featured.id}-title`} className="container-page pb-16 pt-4 sm:pb-24">
        <Reveal>
          <BeforeAfterSlider
            before={featured.before}
            after={featured.after}
            beforeAlt={featured.beforeAlt}
            afterAlt={featured.afterAlt}
            label={featured.title}
            aspect="aspect-[4/3] sm:aspect-[16/9]"
            sizes="(min-width: 1280px) 1200px, 94vw"
          />
          <div className="mt-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
            <h2 id={`${featured.id}-title`} className="font-display text-2xl text-ink">
              {featured.title} <span className="text-base font-sans text-muted">· {featured.service}</span>
            </h2>
            <p className="max-w-xl text-ink-soft sm:text-right">{featured.summary}</p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {others.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <BeforeAfterSlider before={t.before} after={t.after} beforeAlt={t.beforeAlt} afterAlt={t.afterAlt} label={t.title} sizes="(min-width: 768px) 46vw, 94vw" />
              <h2 className="mt-5 font-display text-2xl text-ink">{t.title}</h2>
              <p className="text-sm text-muted">{t.service}</p>
              <p className="mt-2 text-ink-soft">{t.summary}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-muted">Illustrative comparisons for demonstration purposes.</p>
      </section>

      <section aria-labelledby="detail-title" className="bg-stone py-24 sm:py-28">
        <div className="container-page">
          <SectionHeading
            id="detail-title"
            eyebrow="Deep cleaning in detail"
            title="What goes into every deep clean"
            intro="A room-by-room checklist, so nothing is left to chance."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {DEEP_CLEAN_DETAILS.map((d, i) => (
              <Reveal as="li" key={d.room} delay={i * 0.08} className="rounded-[2rem] bg-white p-7 shadow-soft">
                <h3 className="font-display text-xl text-ink">{d.room}</h3>
                <ul className="mt-4 space-y-2.5">
                  {d.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-ink-soft">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-soft">
                        <Check className="h-3 w-3 text-sage" strokeWidth={3} aria-hidden />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <dl className="mt-12 grid grid-cols-3 gap-4 rounded-[2rem] bg-ink px-6 py-8 text-center text-cream sm:px-10">
              {QUALITY_STANDARDS.map((q) => (
                <div key={q.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs text-cream/70 sm:text-sm">{q.label}</dt>
                  <dd className="font-display text-3xl text-mustard sm:text-4xl">{q.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <CtaBand title={<>Ready for your <span className="italic text-mustard">after</span> photo?</>} />
    </>
  );
}
