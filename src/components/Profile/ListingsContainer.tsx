import React from "react"
import { useQuery } from "@apollo/client"
import { useAccount } from "wagmi"

import { GET_USER_LISTINGS } from "@/utils/graphQueries"
import { itemListedType } from "@/types/listingType"
import GameListing from "./GameListing"

const ListingsContainer = () => {
  const { address } = useAccount()
  const { data, loading } = useQuery(GET_USER_LISTINGS(address as string))

  const mappedListings = data?.itemListeds?.map(
    (listing: itemListedType, index: number) => (
      <GameListing
        key={index}
        gameId={listing.gameId}
        price={listing.price}
        numOfItems={listing.numOfItems}
        id={listing.id}
      />
    ),
  )

  return (
    <div className="custom-scrollbar h-full overflow-y-auto">
      {mappedListings}
    </div>
  )
}

export default ListingsContainer
