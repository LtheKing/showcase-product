import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;
  reviewCount: number;
};

export function StarRating({ rating, reviewCount }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5" aria-label={`Rating ${rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < fullStars || (i === fullStars && hasHalf);
          return (
            <Star
              key={i}
              className={`h-3 w-3 ${filled ? "fill-black text-black" : "fill-neutral-200 text-neutral-200"}`}
              strokeWidth={0}
            />
          );
        })}
      </div>
      <span className="text-[11px] text-neutral-600">({reviewCount})</span>
    </div>
  );
}
