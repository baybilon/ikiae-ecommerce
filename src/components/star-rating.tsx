import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const MAX_RATING = 5;
const MIN_RATING = 0;

interface StarRatingProps {
  rating: number;
  className?: string;
  iconclassName?: string;
  text?: string;
}

export const StarRating = ({
  rating,
  className,
  iconclassName,
  text,
}: StarRatingProps) => {
  const safeRating = Math.max(MIN_RATING, Math.min(rating, MAX_RATING));

  return (
    <div className={cn("flex items-center gap-x-1", className)}>
      {Array.from({ length: MAX_RATING }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "size-4",
            index < safeRating ? "fill-black" : "",
            iconclassName
          )}
        />
      ))}

      {text && <p>{text}</p>}
    </div>
  );
};
