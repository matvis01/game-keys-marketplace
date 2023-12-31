import React from "react"
import { useRouter } from "next/router"

import { RxArrowTopRight } from "react-icons/rx"

interface SwiperCardProps {
  gameProps: {
    gameId: number
    gameName: string
    gameImage: string
    genres?: string[]
    tags?: string[]
  }
}

const SwiperCard = ({ gameProps }: SwiperCardProps) => {
  const { gameName, gameImage, gameId, genres, tags } = gameProps
  const router = useRouter()

  const mappedTags = tags?.slice(0, 2).map((genre: string, index: number) => (
    <div
      key={index}
      className="badge badge-secondary badge-outline badge-xs h-fit md:badge-sm"
    >
      {genre}
    </div>
  ))

  const mappedGenres = genres
    ?.slice(0, 3)
    .map((genre: string, index: number) => (
      <div key={index} className="badge badge-primary badge-outline badge-sm">
        {genre}
      </div>
    ))

  const handleClick = () => {
    router.push(`/game/${gameId}`)
  }

  return (
    <div
      onClick={handleClick}
      className="group flex h-72 w-full transform flex-col rounded-lg bg-neutral text-white transition-all hover:cursor-pointer hover:shadow-xl"
    >
      <img
        src={gameImage}
        alt="game image"
        className=" h-2/3 w-full rounded-t-lg object-cover"
      />
      <div className="ml-2 flex h-1/3 flex-col">
        <h2 className="mt-2 line-clamp-1 text-xl">{gameName}</h2>
        <div className="mt-auto flex gap-2 ">{mappedTags}</div>
        <div className="mb-2 mt-1 flex gap-2">{mappedGenres}</div>
      </div>
      <RxArrowTopRight className="absolute bottom-2 right-2 h-8 w-8 text-white opacity-0 duration-100 group-hover:rotate-45 group-hover:text-primary lg:opacity-100" />
    </div>
  )
}

export default SwiperCard
