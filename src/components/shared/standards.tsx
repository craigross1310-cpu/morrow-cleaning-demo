import { Leaf } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { BENEFITS } from "@/content/benefits";

const CARDS = [
  { ...BENEFITS.trusted, stat: "1 in 12", statLabel: "applicants join the team" },
  { ...BENEFITS.pricing, stat: "£0", statLabel: "hidden fees, ever" },
  { ...BENEFITS.flexible, stat: "6 days", statLabel: "a week, 8am–7pm" },
  { ...BENEFITS.guarantee, stat: "72h", statLabel: "re-clean promise" },
];

/** "Our standards" bento — the detailed version of the homepage benefits. */
export function Standards() {
  return (
    <section id="standards" aria-labelledby="standards-title" className="scroll-mt-header py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="standards-title"
          eyebrow="Our standards"
          title={<>Premium care, <em className="text-ink-soft">without</em> the premium hassle</>}
          intro="We built Morrow around the things that matter most when you invite someone into your home."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Reveal className="relative min-h-[22rem] overflow-hidden rounded-[2rem] md:col-span-2 lg:row-span-2">
            <Photo
              src="/images/eco-products.jpg"
              alt="Amber glass refill bottles and a wooden brush — Morrow's eco-friendly cleaning kit"
              fill
              sizes="(min-width: 1024px) 50vw, 92vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" aria-hidden />
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-cream backdrop-blur">
                <Leaf className="h-3.5 w-3.5" aria-hidden /> {BENEFITS.eco.title}
              </span>
              <p className="mt-4 max-w-md font-display text-2xl leading-snug text-cream sm:text-3xl">{BENEFITS.eco.body}</p>
            </div>
          </Reveal>

          {CARDS.map((b, i) => (
            <Reveal
              key={b.title}
              delay={0.08 * i}
              className={`group flex flex-col rounded-[2rem] border p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift ${
                i === 1 ? "border-ink bg-ink text-cream" : "border-line bg-white shadow-soft"
              }`}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110 ${
                  i === 1 ? "bg-mustard text-ink" : "bg-mustard-soft text-ink"
                }`}
              >
                <b.icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className={`mt-6 font-display text-xl ${i === 1 ? "text-cream" : "text-ink"}`}>{b.title}</h3>
              <p className={`mt-2 text-[0.95rem] leading-relaxed ${i === 1 ? "text-cream/70" : "text-ink-soft"}`}>{b.body}</p>
              <div className={`mt-6 flex items-baseline gap-2 border-t pt-5 ${i === 1 ? "border-cream/15" : "border-line"}`}>
                <span className="font-display text-2xl">{b.stat}</span>
                <span className={`text-sm ${i === 1 ? "text-cream/60" : "text-muted"}`}>{b.statLabel}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
