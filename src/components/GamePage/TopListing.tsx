import { ethers } from "ethers"
import React from "react"
import { CurrencyContext } from "@/contexts/currencyContext"
import { ListingType } from "@/types/listingType"
import { useAccount } from "wagmi"

type Props = {
  listing: ListingType
  handleBuy: (listing: ListingType) => void
}

export default function TopListing({ listing, handleBuy }: Props) {
  const { price, numOfItems, seller } = listing
  const formatPrice = ethers.formatUnits(price)
  const { currency, getConvertedPrice } = React.useContext(CurrencyContext)
  let convertedPrice = getConvertedPrice(Number(formatPrice))
  const { isConnected } = useAccount()

  return (
    <div className="card-body items-center ">
      <h2 className="card-title text-5xl">
        {formatPrice.toString().slice(0, 8)} eth
      </h2>
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
