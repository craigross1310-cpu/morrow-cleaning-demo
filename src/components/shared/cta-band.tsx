import { ArrowRight, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import type { ReactNode } from "react";

interface CtaBandProps {
  title?: ReactNode;
  text?: string;
  image?: string;
}

export function CtaBand({
  title = (
    <>
      Your cleaner home <span className="italic text-mustard">starts here.</span>
    </>
  ),
  text = "Get a fixed, personalised price in under a minute — then choose a time that works for you.",
  image = "/images/bedroom.jpg",
}: CtaBandProps) {
  return (
    <section aria-labelledby="cta-title" className="py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-ink">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative z-10 p-8 sm:p-14 lg:p-16">
              <h2 id="cta-title" className="heading-xl text-[2.4rem] text-cream sm:text-6xl">
                {title}
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/70">{text}</p>
              <ButtonLink href="/quote" variant="accent" size="lg" className="mt-9">
                Get an instant quote
                <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" aria-hidden />
              </ButtonLink>
              <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-cream/70">
                <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-mustard" aria-hidden /> 60-second quote</li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-mustard" aria-hidden /> Fully insured</li>
                <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-mustard" aria-hidden /> 72h re-clean promise</li>
              </ul>
            </div>
            <div className="relative min-h-[16rem] lg:min-h-full">
              <Photo src={image} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/10 to-transparent lg:bg-gradient-to-r" aria-hidden />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
