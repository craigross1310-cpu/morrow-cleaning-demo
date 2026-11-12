import { Quote, Star } from "lucide-react";
import type { Review } from "@/content/reviews";
import { getService } from "@/lib/pricing";

export function Stars({ rating = 5, className = "h-4 w-4" }: { rating?: number; className?: string }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} ${i < Math.round(rating) ? "fill-mustard text-mustard" : "fill-stone-deep text-stone-deep"}`} aria-hidden />
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => /^[a-z]/i.test(w))
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-[2rem] border border-line bg-white p-7 shadow-soft transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-center justify-between">
        <Stars rating={review.rating} />
        <Quote className="h-7 w-7 text-stone-deep" aria-hidden />
      </div>
      <blockquote className="mt-5 flex-1 text-[1.02rem] leading-relaxed text-ink">“{review.body}”</blockquote>
      <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-semibold text-ink ${review.tone}`} aria-hidden>
          {initials(review.name)}
        </span>
        <span>
          <span className="block text-sm font-semibold text-ink">{review.name}</span>
          <span className="block text-xs text-muted">
            {review.area} · {getService(review.service)?.shortName}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
