import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { ReviewCard, Stars } from "@/components/shared/review-card";
import { REVIEWS, REVIEWS_DISCLAIMER } from "@/content/reviews";
import { SITE } from "@/config/site";

export function ReviewsPreview() {
  return (
    <section aria-labelledby="reviews-title" className="bg-blush py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading id="reviews-title" eyebrow="Reviews" title="Loved in homes across London" />
          <Reveal className="flex shrink-0 items-center gap-4">
            <span className="font-display text-5xl text-ink">{SITE.stats.rating}</span>
            <span>
              <Stars />
              <span className="mt-1 block text-sm text-ink-soft">Average rating</span>
            </span>
          </Reveal>
        </div>

        <ul className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {REVIEWS.slice(0, 3).map((r, i) => (
            <Reveal as="li" key={r.name} delay={i * 0.08} className="w-[85%] shrink-0 snap-center md:w-auto">
              <ReviewCard review={r} />
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-4">
          <ButtonLink href="/reviews" variant="outline">
            Read all reviews <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden />
          </ButtonLink>
          <p className="text-center text-xs text-muted">{REVIEWS_DISCLAIMER}</p>
        </div>
      </div>
    </section>
  );
}
