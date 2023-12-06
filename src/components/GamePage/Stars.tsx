import React from "react"

function Stars({
  rating,
  className,
  small,
  medium,
}: {
  rating: number
  className?: string
  small?: boolean
  medium?: boolean
}) {
  rating = Math.round(rating * 2) / 2
  return (
    <div
      className={
        `rating rating-half ${small ?? "rating-sm"} ${medium ?? "rating-md"}` +
        className
      }
    >
      <input
        type="radio"
        className="mask mask-half-1 mask-star-2 cursor-default bg-primary"
        checked={rating == 0.5}
        disabled={true}
      />
      <input
        type="radio"
        className="mask mask-half-2 mask-star-2 cursor-default bg-primary"
        checked={rating == 1}
        disabled={true}
      />
      <input
        type="radio"
        className="mask mask-half-1 mask-star-2 cursor-default bg-primary"
        checked={rating == 1.5}
        disabled={true}
      />
      <input
        type="radio"
        className="mask mask-half-2 mask-star-2 cursor-default bg-primary"
        checked={rating == 2}
        disabled={true}
      />
      <input
        type="radio"
        className="mask mask-half-1 mask-star-2 cursor-default bg-primary"
        checked={rating == 2.5}
        disabled={true}
      />
      <input
        type="radio"
        className="mask mask-half-2 mask-star-2 cursor-default bg-primary"
        checked={rating == 3}
        disabled={true}
      />
      <input
        type="radio"
        className="mask mask-half-1 mask-star-2 cursor-default bg-primary"
        checked={rating == 3.5}
        disabled={true}
      />
      <input
        type="radio"
        className="mask mask-half-2 mask-star-2 cursor-default bg-primary"
        checked={rating == 4}
        disabled={true}
      />
      <input
        type="radio"
        className="mask mask-half-1 mask-star-2 cursor-default bg-primary"
        checked={rating == 4.5}
        disabled={true}
      />
      <input
        type="radio"
        className="mask mask-half-2 mask-star-2 cursor-default bg-primary"
        checked={rating == 5}
        disabled={true}
      />
    </div>
  )
}

export default Stars
