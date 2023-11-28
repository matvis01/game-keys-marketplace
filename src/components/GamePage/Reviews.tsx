import { useState } from "react"
import { Review } from "../../types/gameType"
import ReviewCard from "./ReviewCard"

export default function Reviews({ allReviews }: { allReviews: Review[] }) {
  const [expanded, setExpanded] = useState(false)
  const reviews = allReviews?.slice(0, expanded ? 10 : 3)
  return (
    <div className=" flex w-full flex-col items-center ">
      <h2 className="mb-8 self-start text-2xl font-bold">Reviews</h2>
      <div className=" flex w-full flex-col gap-5 px-5">
        {reviews?.map((review) => {
          return <ReviewCard key={review.id} review={review} />
        })}
      </div>
      {allReviews?.length > 3 && (
        <>
          <div className="divider"></div>
          <button
            className="btn btn-ghost"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "show less" : "show more"}
          </button>
        </>
      )}
    </div>
  )
}
