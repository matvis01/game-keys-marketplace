import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useQuery } from "@apollo/client"
import { ethers } from "ethers"
import { RxArrowTopRight } from "react-icons/rx"

import { useExchangePrice } from "@/hooks/useExchangePrice"
import { GET_BEST_PRICE } from "@/utils/graphQueries"

interface GameCardProps {
  gameId: number
  gameName: string
  gameImage: string
  tags?: string[]
  genres?: string[]
  bgColor: string
}

const GameCard = ({
  gameId,
  gameName,
  gameImage,
  genres,
  bgColor,
}: GameCardProps) => {
  const { loading, error, data: listings } = useQuery(GET_BEST_PRICE(gameId))
  const router = useRouter()

  let gamePrice: string | number = 0
  if (listings) {
    const price = listings.listingsByGame.allListings[0].price
    gamePrice = ethers.formatUnits(price)
  }

  const { currency, convertedPrice } = useExchangePrice(+gamePrice)

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
    <>
      {loading && (
        <div className="flex h-[169px] w-[600px] items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {!loading && !error && (
        <div
          className="group mx-auto flex h-[120px] w-[350px] rounded-lg transition-all duration-300 hover:cursor-pointer hover:shadow-xl sm:h-[169px] sm:w-[600px] "
          onClick={handleClick}
        >
          <div className="w-1/2 overflow-hidden">
            <img
              src={gameImage}
              alt={`Thumbnail image of ${gameName}.`}
              className="h-full w-full rounded-l-lg object-cover"
            />
          </div>
          <div
            className={`relative flex w-1/2 flex-col rounded-r-lg bg-${bgColor}`}
          >
            <div className="mx-3 mt-2">
              <p className="line-clamp-2 text-sm text-white sm:text-xl">
                {gameName}
              </p>
              <p className="text-xs text-primary">GLOBAL</p>
            </div>
            <div className="mx-3 mb-2 mt-auto">
              <p className="text-neutral-light text-xs font-extralight ">
                FROM
              </p>
              <div className="flex  items-baseline gap-2">
                <p className="text-sm text-white sm:text-2xl">{`${gamePrice
                  .toString()
                  .slice(0, 8)} ETH`}</p>
                <p className="text-xs font-extralight sm:text-xl">
                  {convertedPrice} {currency}
                </p>
              </div>
              <div className="mb-2 mt-1 hidden gap-2 sm:flex">
                {mappedGenres}
              </div>
            </div>
            <RxArrowTopRight className="absolute bottom-2 right-2 h-8 w-8 text-white opacity-0 duration-100 group-hover:rotate-45 group-hover:text-primary sm:opacity-100" />
          </div>
        </div>
      )}
    </>
  )
}

export default GameCard
