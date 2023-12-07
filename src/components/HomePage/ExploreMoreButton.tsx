import React from "react"

interface ExploreMoreButtonProps {
  onRedirect: () => void
  testId?: string
}

const ExploreMoreButton = ({ onRedirect, testId }: ExploreMoreButtonProps) => {
  return (
    <div className="flex items-center justify-center">
      <button
        data-testid={testId}
        onClick={onRedirect}
        className="btn btn-primary btn-sm btn-wide mb-3 mt-6 text-white sm:btn-md"
      >
        Explore more
      </button>
    </div>
  )
}

export default ExploreMoreButton
