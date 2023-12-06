import React from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { useQuery } from "@apollo/client"

import { GET_LISTING_NAME } from "@/utils/graphQueries"
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal"
import useContractFunctions from "../../hooks/useContractFunctions"

interface GameListingProps {
  gameId: number | string
  price: number | string
  numOfItems: number | string
  id: string
}

const GameListing = ({ gameId, price, numOfItems, id }: GameListingProps) => {
  const { data, loading, error } = useQuery(GET_LISTING_NAME(Number(gameId)))

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
            <h3 className="text-lg font-semibold text-gray-200">
              {loading ? "Loading..." : data?.listingsByGame?.gameName}
            </h3>
            <div
              className="flex items-center justify-center font-bold hover:cursor-pointer"
              onClick={() => {
                if (document)
                  (
                    document.getElementById(
                      "delete_listing_modal",
                    ) as HTMLFormElement
                  ).showModal()
              }}
            >
              <Image
                src="/icons/trash-icon.svg"
                alt="trash can icon"
                width={25}
                height={25}
              />
              {createPortal(
                <ConfirmDeleteModal id={id} />,
                document.getElementById("modals") as HTMLElement,
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GameListing
