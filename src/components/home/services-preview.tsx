import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { SERVICES } from "@/config/pricing";
import type { ServiceId } from "@/config/pricing";
import { serviceAnchor } from "@/config/site";
import { formatMoney } from "@/lib/pricing";

const FEATURED: ServiceId[] = ["standard", "deep", "end-of-tenancy"];

export function ServicesPreview() {
  const services = FEATURED.map((id) => SERVICES.find((s) => s.id === id)!);
  return (
    <section aria-labelledby="services-title" className="py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading id="services-title" eyebrow="Our services" title="A clean for every chapter of home life" />
          <Reveal className="shrink-0">
            <ButtonLink href="/services" variant="outline">
              View all services <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden />
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:mt-14 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
          {services.map((service, i) => (
            <Reveal as="li" key={service.id} delay={i * 0.08} className="w-[82%] shrink-0 snap-center md:w-auto">
              <Link
                href={serviceAnchor(service.id)}
                className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-white shadow-soft transition-[box-shadow,transform] duration-500 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Photo
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 30vw, 92vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
                  />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-ink backdrop-blur">
                    From {formatMoney(service.basePrice * 100)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-display text-2xl text-ink">{service.name}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{service.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                    View service
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
