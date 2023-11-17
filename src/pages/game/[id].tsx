import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useQuery } from "@apollo/client"
import axios from "axios"
import { GET_LISTINGS_FOR_GAME } from "@/utils/graphQueries"

import { GameType } from "../../types/gameType"
import { ListingType } from "@/types/listingType"
import TopListing from "@/components/GamePage/TopListing"
import OtherListing from "@/components/GamePage/OtherListing"
import useContractFunctions from "@/hooks/useContractFunctions"
import { toastifySuccess, toastifyError } from "@/utils/alertToast"

export default function GamePage() {
  const router = useRouter()
  const [gameData, setGameData] = useState<GameType | undefined>()
  const { id } = router.query
  const { error, data, loading } = useQuery(GET_LISTINGS_FOR_GAME(Number(id)))
  const { buy } = useContractFunctions()

  const listings = data?.listingsByGame?.allListings as
    | ListingType[]
    | undefined

  useEffect(() => {
    if (!id) return
    const fetchGameData = async () => {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_KEY}`,
      )
      const { data } = response as { data: GameType }
      setGameData(data)
    }
    fetchGameData()
  }, [id])

  async function handleBuy(listing: ListingType) {
    const { price, seller, gameId } = listing
    console.log(gameId)
    const returnedData = await buy(gameId, seller, price)
    console.log(returnedData)
    if (returnedData?.status === "success") {
      toastifySuccess("Transaction confirmed", 3)

      // Convert bytes to a UTF-8 string
    } else {
      toastifyError("Transaction failed", 3)
    }
  }
  function handleAddToCart() {}

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div className="flex  flex-col items-center gap-6  px-5  lg:px-32">
      <div className="flex w-full flex-col justify-center gap-10 lg:flex-row">
        <img
          src={gameData?.background_image}
          alt=""
          className="h-100 w-full object-cover lg:w-1/3"
        />
        <div className="flex  flex-col justify-around lg:w-1/3">
          <h1 className="text-4xl font-bold ">{gameData?.name}</h1>
          <div className="flex flex-col">
            <p className="text-l">Platform: steam</p>
            <p className="text-l">Type: Key</p>
            <p className="text-l">Region: Global</p>
            <p className="text-l">Release date: {gameData?.released}</p>
            <p className="text-l">Developer: {gameData?.developers[0].name}</p>
          </div>
        </div>
        <div className="card w-full bg-neutral lg:w-1/3">
          {listings && listings.length > 0 ? (
            <TopListing
              listing={listings[0]}
              handleBuy={(listing: ListingType) => {
                handleBuy(listing)
              }}
            />
          ) : loading ? (
            <div className="card-body skeleton">
              {/* <span className="loading loading-spinner  text-primary"></span> */}
            </div>
          ) : (
            <div className="card-body flex items-center justify-center">
              <h2 className="card-title text-5xl">No listings found</h2>
            </div>
          )}
        </div>
      </div>
      {listings && listings.length > 1 && (
        <div className=" w-full">
          <h2 className="mb-5 self-start text-3xl font-bold">Other listings</h2>
          <div className="flex flex-col gap-5">
            {listings?.map((listing, index) => {
              if (index !== 0) {
                return (
                  <OtherListing
                    key={listing.id}
                    listing={listing}
                    image={gameData?.background_image}
                    handleBuy={(listing: ListingType) => {
                      handleBuy(listing)
                    }}
                  />
                )
              }
            })}
          </div>
        </div>
      )}
      {gameData?.description && (
        <div
          className="w-full"
          dangerouslySetInnerHTML={{ __html: gameData.description }}
        />
      )}
    </div>
  )
}
