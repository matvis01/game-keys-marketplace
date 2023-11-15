import React from "react"

interface BestsellerCardProps {
  gameId: number
  gameName: string
  gameImage: string
  gamePrice: number
  tags?: string[]
  genres?: string[]
}

const BestsellerCard = ({
  gameId,
  gameName,
  gameImage,
  gamePrice,
}: BestsellerCardProps) => {
  return (
    <div>
      <img
        src={gameImage}
        alt={`Thumbnail image of ${gameName}.`}
        className="h-40"
      />
      <div>
        <div>
          <h2>{gameName}</h2>
        </div>
        <div>
          <p>FROM</p>
          <p>{gamePrice}</p>
        </div>
      </div>
    </div>
  )
}

export default BestsellerCard
