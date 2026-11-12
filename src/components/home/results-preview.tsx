import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";

export function ResultsPreview() {
  return (
    <section aria-labelledby="results-title" className="py-24 sm:py-32">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            id="results-title"
            eyebrow="Results"
            title="The difference is in the detail"
            intro="Degreased, descaled and polished — right down to the grout lines."
          />
          <Reveal delay={0.1} className="mt-8">
            <ButtonLink href="/results">
              View our results <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden />
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Link href="/results" className="group relative block aspect-[3/2] overflow-hidden rounded-[2rem] bg-stone shadow-lift" aria-label="View before and after results">
            <Photo src="/images/kitchen-after.jpg" alt="A kitchen after a Morrow deep clean" fill sizes="(min-width: 1024px) 58vw, 92vw" className="object-cover" />
            <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
              <div className="relative h-full w-[200%]">
                <Photo src="/images/kitchen-before.jpg" alt="The same kitchen before cleaning" fill sizes="(min-width: 1024px) 58vw, 92vw" className="object-cover" />
              </div>
            </div>
            <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgb(0_0_0/0.35)]" aria-hidden />
            <span className="absolute left-4 top-4 rounded-full bg-ink/75 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-cream backdrop-blur">Before</span>
            <span className="absolute right-4 top-4 rounded-full bg-mustard px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-ink">After</span>
            <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-ink opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
              Try the interactive slider →
            </span>
          </Link>
          <p className="mt-3 text-center text-xs text-muted">Illustrative comparison for demonstration purposes.</p>
        </Reveal>
      </div>
    </section>
  );
}
