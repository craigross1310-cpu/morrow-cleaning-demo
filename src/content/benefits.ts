import { CalendarClock, HeartHandshake, Leaf, ReceiptText, ShieldCheck } from "lucide-react";

export const BENEFITS = {
  eco: {
    icon: Leaf,
    title: "Eco-friendly products",
    body: "Plant-based, refillable products that are kinder to your home, your pets and the planet.",
  },
  trusted: {
    icon: ShieldCheck,
    title: "Trusted professionals",
    body: "Every cleaner is interviewed in person, reference- and DBS-checked, trained in-house and fully insured.",
  },
  guarantee: {
    icon: HeartHandshake,
    title: "Satisfaction guaranteed",
    body: "Not quite right? Tell us within 72 hours and we'll come back to re-clean the area at no cost.",
  },
  pricing: {
    icon: ReceiptText,
    title: "Transparent pricing",
    body: "The price you see is the price you pay. Every adjustment and extra is itemised before you book.",
  },
  flexible: {
    icon: CalendarClock,
    title: "Flexible scheduling",
    body: "Mornings, afternoons and evenings, six days a week. Move or skip a visit free up to 24 hours before.",
  },
} as const;
