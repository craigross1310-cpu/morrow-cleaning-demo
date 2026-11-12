import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { ServicesPreview } from "@/components/home/services-preview";
import { WhyPreview } from "@/components/home/why-preview";
import { ResultsPreview } from "@/components/home/results-preview";
import { ReviewsPreview } from "@/components/home/reviews-preview";
import { CtaBand } from "@/components/shared/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesPreview />
      <WhyPreview />
      <ResultsPreview />
      <ReviewsPreview />
      <CtaBand />
    </>
  );
}
