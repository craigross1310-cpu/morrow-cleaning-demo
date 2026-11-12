import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { BENEFITS } from "@/content/benefits";

const ITEMS = [BENEFITS.eco, BENEFITS.trusted, BENEFITS.guarantee];

export function WhyPreview() {
  return (
    <section aria-labelledby="why-title" className="bg-stone py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="why-title" align="center" eyebrow="Why choose Morrow" title="Premium care, without the hassle" />
        <ul className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
          {ITEMS.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 0.08} className="flex gap-5 rounded-[2rem] bg-white p-6 shadow-soft md:flex-col md:items-center md:p-8 md:text-center">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mustard-soft text-ink md:h-14 md:w-14">
                <b.icon className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-xl text-ink md:mt-2">{b.title}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-soft md:mx-auto md:mt-2 md:max-w-xs">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-12 text-center">
          <Link href="/how-it-works#standards" className="group inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink">
            Learn more about our standards
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
