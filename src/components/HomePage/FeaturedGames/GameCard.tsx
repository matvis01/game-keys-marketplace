import React from "react"
import { SwiperSlide } from "swiper/react"

import exampleGame from "@/constants/exampleGame.json"
import { GameType } from "@/types/gameType"

interface GameCardProps {}

const GameCard = ({}: GameCardProps) => {
  const { name, background_image, description } = exampleGame as GameType
  return (
    <SwiperSlide>
      <div className="card w-64 bg-neutral shadow-xl">
        <figure>
          <img src={background_image} alt={`${name} image`} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p className="truncate">{description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy</button>
          </div>
        </div>
      </div>
    </SwiperSlide>
  )
}

export default GameCard
