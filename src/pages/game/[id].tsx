import { useRouter } from "next/router"
import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import axios from "axios"
import { GameType } from "../../types/gameType"
import exampleGame from "../../constants/exampleGame.json"
import { GET_LISTINGS_FOR_GAME } from "@/constants/graphQueries"
import { listingsByGameType, ListingType } from "@/types/listingType"
import { ethers } from "ethers"
import { useExchangePrice } from "@/hooks/useExchangePrice"
import TopListing from "@/components/SingleGame/TopListing"
import OtherListing from "@/components/SingleGame/OtherListing"

export default function GamePage() {
  const router = useRouter()
  const [gameData, setGameData] = useState<GameType | undefined>()
  const { id } = router.query
  const { loading, error, data } = useQuery(GET_LISTINGS_FOR_GAME(Number(id)))

  const listings = data?.listingsByGame?.allListings as
    | ListingType[]
    | undefined

  console.log(listings)

  useEffect(() => {
    if (!id) return
    const fetchGameData = async () => {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_KEY}`,
      )
      const { data } = response as { data: GameType }
      setGameData(data)
    }
    // fetchGameData() // zeby nie zuzywac limitu requestow

    setGameData(exampleGame)
    console.log(listings)
  }, [id])

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center gap-6 px-5  lg:px-32">
      <div className="flex w-full flex-col justify-center gap-10 lg:flex-row">
        <img
          src={gameData?.background_image}
          alt=""
          className="h-100 w-full object-cover lg:w-1/3"
        />
        <div className="flex w-1/2 flex-col justify-around lg:w-1/3">
          <h1 className="text-2xl font-bold ">{gameData?.name}</h1>
          <div className="flex flex-col">
            <p className="text-l">Platform: steam</p>
            <p className="text-l">Type: Key</p>
            <p className="text-l">Region: Global</p>
            <p className="text-l">
              {gameData?.description_raw.slice(0, 150)}...
            </p>
          </div>
        </div>
        <div className="card w-full bg-neutral lg:w-1/3">
          {listings && listings.length > 0 ? (
            <TopListing listing={listings[0]} />
          ) : (
            <div className="card-body flex items-center justify-center">
              <h2 className="card-title text-5xl">No listings found</h2>
            </div>
          )}
        </div>
      </div>

      {listings && listings.length > 1 && (
        <div className=" w-full">
          <h2 className="mb-5 self-start text-5xl font-bold">Other listings</h2>
          <div className="flex flex-col gap-5">
            {listings?.map((listing, index) => {
              if (index !== 0) {
                return (
                  <OtherListing
                    key={listing.id}
                    listing={listing}
                    image={gameData?.background_image}
                  />
                )
              }
            })}
          </div>
        </div>
      )}

      <div className="w-full">{gameData?.description}</div>
    </div>
  )
}
