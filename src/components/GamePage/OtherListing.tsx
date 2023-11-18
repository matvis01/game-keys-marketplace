import { ethers } from "ethers"
import { useExchangePrice } from "../../hooks/useExchangePrice"
import { ListingType } from "@/types/listingType"
import { useAccount } from "wagmi"

type Props = {
  listing: ListingType
  image: string | undefined
  handleBuy: (id: ListingType) => void
}

export default function OtherListing({ listing, image, handleBuy }: Props) {
  const { price, numOfItems, seller, gameId } = listing
  const formatPrice = ethers.formatUnits(price)
  const exchangePrice = useExchangePrice(Number(formatPrice), "ETH", "USD")
  const { isConnected } = useAccount()

  return (
    <div className=" card flex h-20 w-full flex-row items-center justify-start gap-3  overflow-hidden bg-neutral">
      <img src={image} alt="" className="h-full  object-cover" />
      <div className="flex flex-col items-center justify-center">
        <h2 className=" text-2xl">{formatPrice.toString()} eth</h2>
        <p>= {exchangePrice} usd</p>
        <p className="text-sm ">
          seller: {seller.slice(0, 4)}...
          {seller.slice(seller.length - 4, seller.length)}
        </p>
      </div>

      <div className="flex flex-grow justify-end pr-2 md:pr-7 lg:pr-10">
        <button
          className="btn btn-primary btn-sm lg:btn-md"
          onClick={() => handleBuy(listing)}
          disabled={!isConnected}
        >
          buy
        </button>
      </div>
    </div>
  )
}
