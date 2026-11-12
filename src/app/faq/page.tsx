import type { Metadata } from "next";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { FAQS } from "@/content/faqs";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "FAQs & Contact",
  description: "Answers to common questions about pricing, cleaners, rescheduling and our satisfaction promise — plus how to get in touch with Morrow.",
  alternates: { canonical: "/faq" },
};

const CONTACT = [
  { icon: Phone, label: "Call us", value: SITE.contact.phone, href: SITE.contact.phoneHref },
  { icon: Mail, label: "Email", value: SITE.contact.email, href: `mailto:${SITE.contact.email}` },
  { icon: Clock, label: "Opening hours", value: SITE.contact.hours },
  { icon: MapPin, label: "Office", value: SITE.contact.address },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader crumb="FAQs & contact" eyebrow="Help centre" title="Questions, answered" intro="Everything you need to know before your first clean. Can't find what you're looking for? Get in touch below." />

      <section aria-label="Frequently asked questions" className="container-page max-w-4xl pb-20 sm:pb-28">
        <Reveal>
          <FaqAccordion items={FAQS} defaultOpen={0} />
        </Reveal>
        <Reveal className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-ink-soft">Want to see your price straight away?</p>
          <ButtonLink href="/quote">
            Get an instant quote <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden />
          </ButtonLink>
        </Reveal>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 bg-stone py-24 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading id="contact-title" eyebrow="Contact" title="We'd love to hear from you" intro="Our team is on hand Monday to Saturday." />
            <ul className="mt-10 space-y-3">
              {CONTACT.map((c) => {
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mustard-soft text-ink">
                      <c.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-[0.12em] text-muted">{c.label}</span>
                      <span className="block break-words font-semibold text-ink">{c.value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={c.label}>
                    {c.href ? (
                      <a href={c.href} className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-soft transition-shadow hover:shadow-lift">
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-soft">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-xs text-muted">Demo contact details — not a real business.</p>
          </div>
          <Reveal delay={0.08}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
