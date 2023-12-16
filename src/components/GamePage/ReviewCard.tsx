import { useState } from "react"
import { Review } from "../../types/gameType"
import Stars from "./Stars"

type ReviewProps = {
  review: Review
}

const maxLen = 200

export default function ReviewCard({ review }: ReviewProps) {
  const { rating, user, text: fullText } = review
  const [expanded, setExpanded] = useState(false)

  const text =
    expanded || fullText.length < maxLen
      ? fullText
      : fullText.slice(0, maxLen) + "..."

  return (
    <div className="card w-full bg-neutral p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">{user?.username}</span>
          <Stars rating={rating} />
        </div>
      </div>
      <div
        className="w-full break-words"
        dangerouslySetInnerHTML={{ __html: text }}
      />
      {fullText.length > maxLen && (
        <button
          className="link-primary link"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "collapse" : "expand"}
        </button>
      )}
    </div>
  )
}
