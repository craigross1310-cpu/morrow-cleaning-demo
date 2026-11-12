import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { QuoteCalculator } from "@/components/calculator/quote-calculator";
import { QuotePrefill } from "@/components/calculator/prefill";

export const metadata: Metadata = {
  title: "Get an Instant Quote",
  description: "Build your clean and see your price update live — choose your service, home details, frequency, extras and a time that suits you.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <PageHeader
        crumb="Get a quote"
        eyebrow="Instant quote"
        title={<>Build your clean, <em className="text-ink-soft">see your price</em></>}
        intro="Your price updates live with every choice. Takes about a minute."
      />
      <Suspense fallback={null}>
        <QuotePrefill />
      </Suspense>
      <QuoteCalculator />
    </>
  );
}
