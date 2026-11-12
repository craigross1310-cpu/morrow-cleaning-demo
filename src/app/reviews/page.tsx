import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { CtaBand } from "@/components/shared/cta-band";
import { Stars } from "@/components/shared/review-card";
import { ReviewGrid } from "@/components/reviews/review-grid";
import { Reveal } from "@/components/ui/reveal";
import { RATING_BREAKDOWN, REVIEWS_DISCLAIMER } from "@/content/reviews";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: "What customers say about Morrow Cleaning Co. — ratings and reviews across our home cleaning services.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <PageHeader crumb="Reviews" eyebrow="Customer reviews" title="Loved in homes across London" intro="Here's what a typical week of feedback looks like." />

      <section aria-label="Rating summary" className="container-page">
        <Reveal className="grid gap-8 rounded-[2.25rem] border border-line bg-white p-7 shadow-soft sm:p-10 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-12">
          <div className="text-center md:text-left">
            <p className="font-display text-7xl leading-none text-ink">{SITE.stats.rating}</p>
            <div className="mt-3 flex justify-center md:justify-start">
              <Stars rating={SITE.stats.rating} className="h-5 w-5" />
            </div>
            <p className="mt-2 text-sm text-muted">from {SITE.stats.reviews.toLocaleString("en-GB")}+ reviews</p>
          </div>

          <ul className="space-y-2.5" aria-label="Rating breakdown">
            {RATING_BREAKDOWN.map((r) => (
              <li key={r.stars} className="flex items-center gap-3 text-sm">
                <span className="w-12 shrink-0 font-semibold text-ink">{r.stars} star</span>
                <span className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-stone">
                  <span className="absolute inset-y-0 left-0 rounded-full bg-mustard" style={{ width: `${Math.max(r.share * 100, 1)}%` }} />
                </span>
                <span className="w-10 shrink-0 text-right tabular-nums text-muted">{Math.round(r.share * 100)}%</span>
              </li>
            ))}
          </ul>

          <dl className="grid grid-cols-2 gap-6 border-t border-line pt-6 text-center md:grid-cols-1 md:border-l md:border-t-0 md:pl-12 md:pt-0 md:text-left">
            <div>
              <dt className="text-sm text-muted">Customer satisfaction</dt>
              <dd className="font-display text-3xl text-ink">{SITE.stats.satisfaction}%</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Homes cleaned</dt>
              <dd className="font-display text-3xl text-ink">{SITE.stats.homes}</dd>
            </div>
          </dl>
        </Reveal>
        <p className="mt-4 flex items-start justify-center gap-2 text-center text-xs text-muted">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden /> {REVIEWS_DISCLAIMER}
        </p>
      </section>

      <section aria-label="Customer reviews" className="container-page py-16 sm:py-20">
        <ReviewGrid />
      </section>

      <CtaBand title={<>Join them. <span className="italic text-mustard">Book in minutes.</span></>} />
    </>
  );
}
