import React from "react"

interface BestsellerCardProps {
  gameId: number
  gameName: string
  gameImage: string
  gameImageAlt: string
  gamePrice: number
}

const BestsellerCard = ({
  gameId,
  gameName,
  gameImage,
  gameImageAlt,
  gamePrice,
}: BestsellerCardProps) => {
  return (
    <div>
      <img src={gameImage} alt={gameImageAlt} />
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
