import { ethers } from "ethers"
import { useExchangePrice } from "../../hooks/useExchangePrice"
import { ListingType } from "@/types/listingType"
import { useAccount } from "wagmi"
import { useEffect, useState } from "react"
import { from, fromPromise } from "@apollo/client"

type Props = {
  listing: ListingType
  handleBuy: (listing: ListingType) => void
}

export default function TopListing({ listing, handleBuy }: Props) {
  const { price, numOfItems, seller } = listing
  const formatPrice = ethers.formatUnits(price)
  const { currency, convertedPrice } = useExchangePrice(+formatPrice)
  const { isConnected } = useAccount()

  return (
    <div className="card-body flex flex-col items-center">
      <h2 className="card-title text-5xl">{formatPrice.toString()} eth</h2>
      <p>
        {convertedPrice} {currency}
      </p>
      <p>items left: {numOfItems}</p>
      <p>
        seller: {seller.slice(0, 4)}...
        {seller.slice(seller.length - 4, seller.length)}
      </p>
      <div className="card-actions justify-end">
        <button
          className="btn btn-primary"
          disabled={!isConnected}
          onClick={() => handleBuy(listing)}
        >
          buy
        </button>
      </div>
    </div>
  )
}
