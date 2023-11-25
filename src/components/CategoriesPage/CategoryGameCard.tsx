import React from "react"
import Image from "next/image"
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
  try {
    exchangePrice = useExchangePrice(+gamePrice, "ETH", "USD")
  } catch (error) {
    console.log(error)
  }

  const mappedGenres = genres
    ?.slice(0, 3)
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
          className="group mx-auto flex h-[300px] w-[220px] flex-col rounded-lg transition-all duration-300 hover:cursor-pointer hover:shadow-xl"
          onClick={handleClick}
        >
          <img
            src={gameImage}
            alt={`Thumbnail image of ${gameName}.`}
            className="h-3/5 rounded-t-lg object-cover transition-all duration-300 group-hover:opacity-60"
          />

          <div
            className={`relative flex h-2/5 w-full flex-col rounded-b-lg bg-${bgColor}`}
          >
            <div className="mx-3 mt-2">
              <p className="line-clamp-2 text-sm font-semibold text-white">
                {gameName}
              </p>
            </div>
            <div className="mx-3 mb-1 mt-auto">
              <p className="text-neutral-light text-xs font-extralight">FROM</p>
              <div className="indicator">
                <p className="text-lg text-white">{`${gamePrice} ETH`}</p>
                <div
                  className={`tooltip tooltip-secondary h-4 w-4 rounded-full`}
                  data-tip={`${exchangePrice} USD`}
                >
                  <Image
                    src="icons/info.svg"
                    alt="info icon"
                    width={16}
                    height={16}
                  />
                </div>
              </div>
              <div className="mb-2 mt-1 flex gap-2">{mappedGenres}</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CategoryGameCard
