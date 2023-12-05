import React from "react"
import { useRouter } from "next/router"
import { useQuery } from "@apollo/client"
import { ethers } from "ethers"

import { useExchangePrice } from "@/hooks/useExchangePrice"
import { GET_BEST_PRICE } from "@/utils/graphQueries"

interface CategoryGameCardProps {
  gameId: number
  gameName: string
  gameImage: string
  tags?: string[]
  genres?: string[]
  bgColor?: string
}

const CategoryGameCard = ({
  gameId,
  gameName,
  gameImage,
  genres,
  tags,
  bgColor = "neutral",
}: CategoryGameCardProps) => {
  const { loading, error, data: listings } = useQuery(GET_BEST_PRICE(gameId))
  const router = useRouter()

  let gamePrice: string | number = 0
  if (listings) {
    const price = listings.listingsByGame.allListings[0].price
    gamePrice = ethers.formatUnits(price)
  }

  let exchangePrice: number = 0

  const { convertedPrice, currency } = useExchangePrice(+gamePrice)

  const genresLength = genres?.includes("Massively Multiplayer") ? 2 : 3

  const mappedGenres = genres
    ?.slice(0, genresLength)
    .map((genre: string, index: number) => (
      <div key={index} className="badge badge-primary badge-outline badge-xs">
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
          className="group mx-auto flex h-[300px] w-[220px]  flex-col rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-xl"
          onClick={handleClick}
        >
          <img
            src={gameImage}
            alt={`Thumbnail image of ${gameName}.`}
            className="h-3/5 rounded-t-lg object-cover"
          />

          <div
            className={`relative flex h-2/5 w-full flex-col rounded-b-lg bg-${bgColor}`}
          >
            <div className="mx-3 mt-2">
              <p className="line-clamp-2 text-lg font-semibold text-white">
                {gameName}
              </p>
            </div>
            <div className="mx-3 mb-1 mt-auto">
              <p className="text-xs font-extralight text-primary ">FROM</p>
              <div className="flex items-baseline gap-2">
                <p className="text-lg text-white">{`${gamePrice
                  .toString()
                  .slice(0, 8)} ETH`}</p>
                <p className="mb-2 text-sm font-extralight">
                  {convertedPrice} {currency}
                </p>
              </div>
              {/* <div className="mb-2 mt-1 line-clamp-2 flex gap-2">
                {mappedGenres}
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CategoryGameCard
