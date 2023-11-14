import React from "react"
import { RxArrowTopRight } from "react-icons/rx"

interface SwiperCardProps {
  gameProps: {
    gameId: number
    gameName: string
    gameImage: string
  }
}

const SwiperCard = ({ gameProps }: SwiperCardProps) => {
  const { gameName, gameImage, gameId } = gameProps

  const handleRedirect = () => {
    window.location.href = `game/${gameId}`
  }

  return (
    <div
      onClick={handleRedirect}
      className="group mb-12 flex h-64 w-56 scale-95 transform flex-col gap-6 rounded-lg bg-neutral text-white transition-all hover:scale-100 hover:cursor-pointer lg:h-72 lg:w-80 "
    >
      <img
        src={gameImage}
        alt="game image"
        className="h-1/2 rounded-lg lg:h-2/3"
      />
      <div className="ml-5 flex max-h-16 w-[70%] flex-col">
        <h2 className="card-title">{gameName}</h2>
      </div>
      <RxArrowTopRight className="absolute bottom-5 right-5 h-8 w-8 text-white duration-100 group-hover:rotate-45 group-hover:text-primary" />
    </div>
  )
}

export default SwiperCard
