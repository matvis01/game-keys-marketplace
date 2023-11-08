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
      className="group mb-12 flex h-[250px] w-[215px] scale-95 transform flex-col gap-6 rounded-lg bg-neutral text-white transition-all hover:scale-100 hover:cursor-pointer lg:h-[300px] lg:w-[340px] "
    >
      <figure>
        <img src={gameImage} alt="game image" className="rounded-lg" />
      </figure>
      <div className="ml-5 flex max-h-16 w-[70%] flex-col">
        <h2 className="card-title">{gameName}</h2>
      </div>
      <RxArrowTopRight className="absolute bottom-5 right-5 h-8 w-8 text-white duration-100 group-hover:rotate-45 group-hover:text-primary" />
    </div>
  )
}

export default SwiperCard
