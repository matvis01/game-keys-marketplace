import { ethers } from "ethers"
import { useExchangePrice } from "../../hooks/useExchangePrice"
import { ListingType } from "@/types/listingType"
import useContractFunctions from "@/hooks/useContractFunctions"

export default function TopListing({ listing }: { listing: ListingType }) {
  const { price, numOfItems, seller, gameId } = listing
  const formatPrice = ethers.formatUnits(price)
  const exchangePrice = useExchangePrice(Number(formatPrice), "ETH", "USD")
  const { buy } = useContractFunctions()

  const handleBuy = async () => {
    console.log(gameId)
    const tx = await buy(gameId, seller, price)
    console.log(tx)
  }

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
        <button className="btn btn-primary" onClick={handleBuy}>
          add to cart
        </button>
      </div>
    </div>
  )
}
