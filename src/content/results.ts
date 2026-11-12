/**
 * Before & after transformations. The "before" images are digitally aged
 * versions of the "after" photos, for illustration only — replace them with
 * genuine matched photo pairs for a real business.
 */
export const TRANSFORMATIONS = [
  {
    id: "kitchen",
    title: "Kitchen deep clean",
    service: "Deep Cleaning",
    summary: "Grease lifted from cabinet fronts, hob and extractor degreased, splashback and grout restored.",
    before: "/images/kitchen-before.jpg",
    after: "/images/kitchen-after.jpg",
    beforeAlt: "A kitchen before cleaning — dull, greasy and marked surfaces",
    afterAlt: "The same kitchen after a Morrow deep clean — bright, spotless surfaces",
  },
  {
    id: "bathroom",
    title: "Bathroom descale",
    service: "Deep Cleaning",
    summary: "Limescale removed from glass and taps, shower screen polished, grout and sealant brightened.",
    before: "/images/bathroom-before.jpg",
    after: "/images/service-regular.jpg",
    beforeAlt: "A bathroom before cleaning — water marks and limescale on the shower glass",
    afterAlt: "The same bathroom after cleaning — clear glass and gleaming surfaces",
  },
  {
    id: "living",
    title: "Living room refresh",
    service: "Standard Home Cleaning",
    summary: "Surfaces dusted top to bottom, floors vacuumed and mopped, soft furnishings refreshed.",
    before: "/images/living-before.jpg",
    after: "/images/service-standard.jpg",
    beforeAlt: "A living room before cleaning — dusty, dull surfaces",
    afterAlt: "The same living room after cleaning — fresh, bright and tidy",
  },
];

export const DEEP_CLEAN_DETAILS = [
  { room: "Kitchen", items: ["Degrease hob, extractor & splashback", "Cupboard fronts, handles & plinths", "Sink & taps descaled and polished", "Appliance exteriors cleaned"] },
  { room: "Bathrooms", items: ["Limescale removed from glass & taps", "Grout and sealant scrubbed", "Toilet cleaned & sanitised, inside and out", "Mirrors, tiles & fittings polished"] },
  { room: "Living areas & bedrooms", items: ["Skirting boards, doors & frames", "Behind and beneath movable furniture", "Light switches & sockets wiped", "Floors vacuumed and mopped edge to edge"] },
];

export const QUALITY_STANDARDS = [
  { value: "47", label: "point deep-clean checklist" },
  { value: "72h", label: "re-clean promise" },
  { value: "100%", label: "of surfaces, edges & fittings" },
];
