import { CalendarClock, ReceiptText, ShieldCheck } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, label: "Vetted & insured professionals" },
  { icon: ReceiptText, label: "Transparent pricing" },
  { icon: CalendarClock, label: "Flexible scheduling" },
];

export function TrustStrip() {
  return (
    <section aria-label="Why customers trust Morrow" className="border-y border-line bg-white/60">
      <ul className="container-page grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {ITEMS.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center justify-center gap-3 py-5 text-[0.95rem] font-semibold text-ink sm:py-7">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mustard-soft">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}
