import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Repeat } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { CtaBand } from "@/components/shared/cta-band";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { EXTRA_ICONS, SERVICE_ICONS } from "@/components/ui/icons";
import { EXTRAS, FREQUENCIES, SERVICES } from "@/config/pricing";
import { quoteFor } from "@/config/site";
import { formatMoney } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Cleaning Services",
  description:
    "Standard, deep, end of tenancy, move-in and regular maintenance cleaning — see what's included and starting prices, then get an instant quote.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const recurring = FREQUENCIES.filter((f) => f.discount > 0);
  return (
    <>
      <PageHeader
        crumb="Services"
        eyebrow="Our services"
        title={<>A clean for every <em className="text-ink-soft">chapter</em> of home life</>}
        intro="Five carefully designed services, each with a clear checklist and transparent starting price."
      >
        <ul className="flex flex-wrap gap-2" aria-label="Jump to a service">
          {SERVICES.map((s) => (
            <li key={s.id}>
              <Link
                href={`#${s.id}`}
                className="inline-flex rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-sm font-semibold text-ink-soft backdrop-blur transition-colors hover:border-ink/30 hover:text-ink"
              >
                {s.shortName}
              </Link>
            </li>
          ))}
        </ul>
      </PageHeader>

      <div className="container-page space-y-20 py-16 sm:space-y-28 sm:py-24">
        {SERVICES.map((s, i) => {
          const Icon = SERVICE_ICONS[s.icon];
          const flip = i % 2 === 1;
          return (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal className={flip ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-stone shadow-lift">
                  <Photo src={s.image} alt="" fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover" />
                  {s.popular ? <span className="absolute right-4 top-4 rounded-full bg-mustard px-3 py-1 text-xs font-bold text-ink">Most booked</span> : null}
                </div>
              </Reveal>
              <Reveal delay={0.08} className={flip ? "lg:order-1" : ""}>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mustard-soft text-ink">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-mustard-deep">{s.tagline}</p>
                </div>
                <h2 id={`${s.id}-title`} className="heading-lg mt-5 text-[2rem] text-ink sm:text-[2.6rem]">
                  {s.name}
                </h2>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">{s.description}</p>

                <h3 className="mt-8 text-sm font-bold text-ink">What&apos;s included</h3>
                <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {s.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 text-ink-soft">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-soft">
                        <Check className="h-3 w-3 text-sage" strokeWidth={3} aria-hidden />
                      </span>
                      {inc}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-line pt-7">
                  <p className="text-sm text-muted">
                    From <span className="font-display text-3xl text-ink">{formatMoney(s.basePrice * 100)}</span>
                    <span className="mt-0.5 block text-xs">
                      {s.allowedFrequencies.includes("one-off") ? "1 bedroom · 1 bathroom" : "per visit · recurring plans only"}
                    </span>
                  </p>
                  <ButtonLink href={quoteFor(s.id)} className="ml-auto sm:ml-0">
                    Get a quote <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden />
                  </ButtonLink>
                </div>
              </Reveal>
            </section>
          );
        })}
      </div>

      <section aria-labelledby="extras-title" className="bg-stone py-24 sm:py-28">
        <div className="container-page">
          <SectionHeading
            id="extras-title"
            eyebrow="Optional extras"
            title="Add the finishing touches"
            intro="Add any of these to your clean when you get your quote. Each is priced individually."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EXTRAS.map((e, i) => {
              const Icon = EXTRA_ICONS[e.icon];
              return (
                <Reveal as="li" key={e.id} delay={(i % 4) * 0.05} className="flex items-start gap-4 rounded-3xl bg-white p-5 shadow-soft">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mustard-soft text-ink">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">{e.name}</span>
                    <span className="mt-0.5 block text-sm text-muted">{e.description}</span>
                    <span className="mt-2 block text-sm font-semibold text-ink">
                      {formatMoney(e.price * 100)}
                      {e.unit ? <span className="font-normal text-muted"> {e.unit}</span> : null}
                    </span>
                  </span>
                </Reveal>
              );
            })}
          </ul>

          <Reveal className="mt-12 flex flex-col gap-6 rounded-[2rem] bg-ink p-8 text-cream sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mustard text-ink">
                <Repeat className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-2xl">Save with a regular clean</h3>
                <p className="mt-1 text-cream/70">Recurring discounts apply to every visit.</p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-3">
              {recurring.map((f) => (
                <li key={f.id} className="rounded-2xl border border-cream/15 px-4 py-3 text-center">
                  <span className="block font-display text-2xl text-mustard">{Math.round(f.discount * 100)}%</span>
                  <span className="text-xs text-cream/70">{f.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand title={<>Not sure which clean you need?</>} text="Answer a few quick questions and see an itemised price for each option — you can switch services at any time." />
    </>
  );
}
