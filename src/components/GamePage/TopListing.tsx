import { ethers } from "ethers"
import { useExchangePrice } from "../../hooks/useExchangePrice"
import { ListingType } from "@/types/listingType"

type Props = {
  listing: ListingType
  handleBuy: (listing: ListingType) => void
}

export default function TopListing({ listing, handleBuy }: Props) {
  const { price, numOfItems, seller } = listing
  const formatPrice = ethers.formatUnits(price)
  const exchangePrice = useExchangePrice(Number(formatPrice), "ETH", "USD")

  return (
    <div className="card-body flex flex-col items-center">
      <h2 className="card-title text-5xl">{formatPrice.toString()} eth</h2>
      <p>= {exchangePrice} usd</p>
      <p>items left: {numOfItems}</p>
      <p>
        seller: {seller.slice(0, 4)}...
        {seller.slice(seller.length - 4, seller.length)}
      </p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary" onClick={() => handleBuy(listing)}>
          add to cart
        </button>
      </div>
    </div>
  )
}
