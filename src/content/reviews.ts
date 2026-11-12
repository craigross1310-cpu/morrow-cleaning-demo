import type { ServiceId } from "@/config/pricing";

/**
 * Illustrative reviews written for this website concept.
 * Replace with genuine customer reviews before using the site for a real business.
 */
export interface Review {
  name: string;
  area: string;
  service: ServiceId;
  rating: number;
  body: string;
  tone: string;
}

export const REVIEWS: Review[] = [
  { name: "Hannah W.", area: "Islington", service: "regular", rating: 5, tone: "bg-mustard-soft", body: "Booking took two minutes and the price didn't change once. Same cleaner every fortnight, and she remembers exactly how we like things. Coming home on a Friday is a genuine joy now." },
  { name: "Marcus O.", area: "Clapham", service: "end-of-tenancy", rating: 5, tone: "bg-sage-soft", body: "Our letting agent said it was the cleanest check-out they'd seen all year. Full deposit back, and they even sent photos of every room when they'd finished." },
  { name: "Priya S.", area: "Walthamstow", service: "deep", rating: 5, tone: "bg-blush-deep", body: "The oven looks brand new and the bathroom grout is white again — I genuinely didn't think that was possible. Worth every penny." },
  { name: "Tom & Ellie R.", area: "Richmond", service: "move-in", rating: 5, tone: "bg-stone-deep", body: "We moved in to a home that smelled fresh and felt properly ours. Being able to choose an evening slot around work made all the difference." },
  { name: "Grace L.", area: "Hackney", service: "standard", rating: 5, tone: "bg-mustard-soft", body: "Clear pricing, friendly team, beautiful results. I loved seeing exactly what I was paying for before I booked." },
  { name: "Daniel K.", area: "Greenwich", service: "regular", rating: 5, tone: "bg-sage-soft", body: "Skipping a week while we were on holiday was one tap. It's the most stress-free service I pay for." },
  { name: "Aisha M.", area: "Camden", service: "standard", rating: 4, tone: "bg-blush-deep", body: "A really thorough first clean. One shelf was missed, but they came back the next day to sort it without any fuss." },
  { name: "James P.", area: "Battersea", service: "deep", rating: 5, tone: "bg-stone-deep", body: "Three years of limescale gone in an afternoon. The team were punctual, polite and left the place smelling lovely." },
  { name: "Sofia B.", area: "Ealing", service: "end-of-tenancy", rating: 5, tone: "bg-mustard-soft", body: "Moving out is stressful enough — this was the one part I didn't have to think about. The checklist they followed matched our inventory perfectly." },
];

/** Illustrative rating distribution for the demo reviews page. */
export const RATING_BREAKDOWN = [
  { stars: 5, share: 0.91 },
  { stars: 4, share: 0.07 },
  { stars: 3, share: 0.01 },
  { stars: 2, share: 0.005 },
  { stars: 1, share: 0.005 },
];

export const REVIEWS_DISCLAIMER =
  "Reviews and ratings shown are illustrative examples written for this website concept and do not represent real customers.";
