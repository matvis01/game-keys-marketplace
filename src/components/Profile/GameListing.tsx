import React from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { useQuery } from "@apollo/client"
import { ethers } from "ethers"

import { GET_LISTING_NAME } from "@/utils/graphQueries"
import useContractFunctions from "@/hooks/useContractFunctions"

interface GameListingProps {
  gameId: number | string
  price: number | string
  numOfItems: number | string
  id: string
}

const GameListing = ({ gameId, price, numOfItems, id }: GameListingProps) => {
  const { data, loading, error } = useQuery(GET_LISTING_NAME(Number(gameId)))
  const { cancelListing } = useContractFunctions()

  const formattedPrice = ethers.formatEther(price)

  return (
    <>
      {loading && (
        <div className="flex h-96 items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {!error && !loading && (
        <div className="mb-1 mr-1 rounded-lg bg-neutral p-6">
          <div className="flex items-center justify-between">
            <div className="flex w-full flex-col items-start sm:flex-row  sm:gap-4 ">
              <h3 className="text-md font-semibold text-gray-200 sm:text-lg">
                {loading ? "Loading..." : data?.listingsByGame?.gameName}
              </h3>
              <p>{formattedPrice} ETH</p>
            </div>
            <div className="flex items-center justify-center font-bold hover:cursor-pointer">
              <div
                className="relative h-5 w-5 sm:h-6 sm:w-6"
                onClick={() => cancelListing(id)}
              >
                <Image src="/icons/trash-icon.svg" alt="trash can icon" fill />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GameListing
