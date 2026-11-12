# Morrow Cleaning Co. — Interactive Website Concept

A premium, fully interactive cleaning-company website with a live multi-step quote calculator and a full booking journey. It was built as a demonstration project. **Morrow Cleaning Co. is a fictional brand**: no bookings are made, no payments are taken and no customer data leaves the browser.

_Website concept by Saltra Solutions._

---

## Site structure

| Page | Route | What it contains |
| --- | --- | --- |
| Home | `/` | Short introduction: hero, trust strip, 3 featured services, 3 benefits, a before/after preview, 3 reviews and a final call to action |
| Services | `/services` | All five services with images, what's included and starting prices, plus optional extras and recurring savings |
| How it works | `/how-it-works` | The three booking stages, what happens after booking and "Our standards" (`#standards`) |
| Results | `/results` | Three interactive before/after sliders, a room-by-room deep-clean checklist and quality standards |
| Reviews | `/reviews` | Overall rating, rating breakdown and a review grid you can filter by service |
| FAQs & contact | `/faq` | FAQ accordion, contact details and an enquiry form (`#contact`) |
| Get a quote | `/quote` | The five-step instant quote calculator |
| Booking | `/book`, `/book/confirmed` | Details form, final review and demo confirmation |

Every service's "Get a quote" button links to `/quote?service=<id>`. That opens the calculator with the service pre-selected, at the property step. Quote progress is kept while visitors move between pages, and survives a page reload.

## Highlights

- **Five-step quote calculator:** service → property → frequency → extras → date & time.
  - The price updates live and animates, with an itemised breakdown.
  - Recurring discounts, minimum-visit logic and estimated duration and team size are all calculated.
  - Invalid combinations are corrected automatically, and the customer is told why.
- **Booking flow:** details form with validation (UK phone and postcode) → final review → demo confirmation with a reference, `.ics` calendar export and print.
- **Fast first impression:** the hero's entrance animation is pure CSS, photos load behind blurred placeholders, and only the font styles in use are downloaded.
- **Mobile-first details:** a sticky quote bar with a swipe-to-close summary drawer, swipeable card rows, large tap targets and safe-area padding for iPhone.
- **Accessibility:** semantic roles and labelled controls, breadcrumbs, `aria-current` on navigation, a skip link, and respect for `prefers-reduced-motion`.

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion (Framer Motion) · Lucide icons. There is no database and no backend.

## Getting started

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
npm run test:pricing   # 17 pricing-engine tests, incl. a 1,000+ combination sweep
npm run lint           # TypeScript type-check
```

Requires Node.js 20.9 or newer.

## Project structure

```
src/
  app/              ← one folder per page (services, how-it-works, results, reviews, faq, quote, book…)
  config/
    pricing.ts      ← ALL prices, discounts, durations, extras, time slots, booking rules
    site.ts         ← brand name, contact details, social links, stats, navigation
    images.ts       ← photo registry (adds blurred placeholders)
  content/          ← reviews, FAQs, benefits and before/after content, shared by the home previews and full pages
  lib/
    pricing.ts      ← pure pricing engine (integer pence, total = sum of line items)
    availability.ts ← demo calendar availability (swap for a real scheduling API)
    booking-store.tsx ← React context + sessionStorage persistence
    validation.ts   ← form validation & reference generation
  components/
    home/           ← homepage preview sections
    shared/         ← page header + breadcrumbs, CTA band, before/after slider, review card, FAQ accordion, standards
    calculator/     ← quote steps, summary panel, mobile drawer, ?service= pre-fill
    booking/        ← details form, review, confirmation
    contact/ reviews/ ← enquiry form, filterable review grid
    layout/         ← header, footer, legal page shell
    ui/             ← buttons, reveal animation, animated price, icons, logo, photo
public/images/      ← all photography
scripts/test-pricing.ts
```

## Editing prices

Open **`src/config/pricing.ts`**. Every value is commented. Common edits:

| Change | Where |
| --- | --- |
| Service base price, per-bedroom and per-bathroom charges | `SERVICES[].basePrice`, `perExtraBedroom`, `perExtraBathroom` |
| Frequencies a service allows | `SERVICES[].allowedFrequencies`, `defaultFrequency` |
| Recurring discounts | `FREQUENCIES[].discount` (`0.15` = 15%) |
| House or bungalow uplift | `PROPERTY_TYPES[].multiplier` |
| Size bands | `PROPERTY_SIZES[]` |
| Floor surcharges | `FLOOR_OPTIONS[]` |
| Extras (price, duration, per-bed pricing) | `EXTRAS[]` |
| Minimum visit charge, two-cleaner threshold, booking window, closed days | `BOOKING_RULES` |
| Arrival times | `TIME_SLOTS` |
| Round to whole pounds or exact pence | `PRICE_ROUNDING_PENCE` |

After editing, run `npm run test:pricing`. A few tests assert the demo values from the brief (for example, standard cleaning from £55). Update those expectations to match your new prices. The structural tests must still pass: the total equals the sum of the line items, there are no duplicate extras, and invalid frequencies are corrected.

## Editing branding

- **Name, contact details, social links and stats:** `src/config/site.ts`.
- **Colours:** the `@theme` block in `src/app/globals.css`. For example, `--color-mustard` is the accent and `--color-ink` is the text colour.
- **Fonts:** `src/app/layout.tsx` (Fraunces for display text, Manrope for body text, both via `next/font`).
- **Logo:** `src/components/ui/logo.tsx` and `src/app/icon.svg` (the favicon).
- **Copy:** homepage sections live in `src/components/home/`, and each page's copy is in `src/app/<page>/page.tsx`. Reviews, FAQs, benefits and before/after captions live in `src/content/`, so editing them updates both the homepage previews and the full pages.
- **Social sharing image:** `src/app/opengraph-image.tsx`.

## Editing imagery

Replace the files in `public/images/`, keeping the same file names, or update the paths:

- Service cards: `SERVICES[].image` in `src/config/pricing.ts`.
- Hero: `hero-home.jpg` and `cleaner-detail.jpg`.
- Before/after: the pairs listed in `src/content/results.ts`. Use matched pairs of real photos for a live site.
- Why-choose and final CTA: `eco-products.jpg` and `bedroom.jpg`.

Images are optimised automatically (AVIF/WebP, responsive sizes) by `next/image`. Every photo listed in `src/config/images.ts` also gets a blurred placeholder, generated at build time, so it fades in smoothly. If you add a new photo, add an import line there too. The demo photography comes from Unsplash (Unsplash Licence). The "before" images are digitally aged versions of the "after" photos, and are labelled as illustrative on the site.

## Deploying to Vercel

**Option A — Vercel dashboard (no CLI):**
1. Go to <https://vercel.com/new> and import this GitHub repository (`morrow-cleaning-demo`).
2. Leave every setting at its default. Vercel detects Next.js automatically, and no environment variables are needed.
3. Click **Deploy**.
4. Your site is live at `https://morrow-cleaning-demo.vercel.app`, or a similar URL if that name is taken.

**Option B — Vercel CLI:**
```bash
npm i -g vercel
vercel login
vercel --prod     # accept the defaults; project name: morrow-cleaning-demo
```

If the final URL differs, update `SITE.url` in `src/config/site.ts` so social-sharing links resolve correctly.

The site is set to `noindex` because the brand is fictional. Remove the `robots` entry in `src/app/layout.tsx` for a real business.

## Adapting this for a real cleaning business

1. **Prices:** replace the values in `src/config/pricing.ts` with the business's rate card. Every part of the site reads from that file.
2. **Real availability:** replace `getDayAvailability` in `src/lib/availability.ts` with a fetch from a route such as `/api/availability`. That route would be backed by the business's scheduling tool (for example Google Calendar, Jobber, ServiceM8 or Launch27) or a simple database of cleaner shifts.
3. **Real bookings:**
   - Replace the timeout in `confirm()` (`src/components/booking/booking-flow.tsx`) with a `POST` to a Next.js Route Handler.
   - That handler should re-calculate the price on the server with the same `calculateQuote()` engine, so the browser can't tamper with it.
   - It should then save the booking (Postgres, Supabase or Airtable) and send confirmation emails and SMS (Resend, Postmark or Twilio).
4. **Payments:** add a Stripe Checkout or Payment Element step after the review, or save a card with a SetupIntent to charge after the clean.
5. **Content and trust:** swap in genuine reviews (for example from a Trustpilot or Google Reviews widget), real team photography and real before/after pairs.
6. **Operations:** add an admin view of upcoming jobs, automated reminders 48 hours before each visit, and links that let recurring customers manage their own plans.
7. **Compliance:** finalise the privacy policy and terms with a legal professional, add cookie consent if analytics are introduced, and remove the demo disclaimers.
