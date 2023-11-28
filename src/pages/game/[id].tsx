import { useRouter } from "next/router"
import { useQuery } from "@apollo/client"
import { GET_LISTINGS_FOR_GAME } from "@/utils/graphQueries"
import { ListingType } from "@/types/listingType"
import TopListing from "@/components/GamePage/TopListing"
import OtherListing from "@/components/GamePage/OtherListing"
import useContractFunctions from "@/hooks/useContractFunctions"
import { toastifySuccess, toastifyError } from "@/utils/alertToast"
import useGameData from "@/hooks/useGameData"
import Stars from "@/components/GamePage/Stars"
import Reviews from "@/components/GamePage/Reviews"
import Screenshots from "@/components/GamePage/Screenshots"

export default function GamePage() {
  const router = useRouter()
  const { id } = router.query
  const { error, data, loading } = useQuery(GET_LISTINGS_FOR_GAME(Number(id)))
  const { buy } = useContractFunctions()

  const listings = data?.listingsByGame?.allListings as
    | ListingType[]
    | undefined

  const { gameData, screenshots, reviews } = useGameData(Number(id))

  async function handleBuy(listing: ListingType) {
    const { price, seller, gameId } = listing
    const returnedData = await buy(gameId, seller, price)
    if (returnedData?.status === "success") {
      toastifySuccess("Transaction confirmed", 3)
      router.push("/profile")
    } else {
      toastifyError("Transaction failed", 3)
    }
  }

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div className="mx-auto flex  max-w-screen-2xl flex-col items-center gap-6  px-5  lg:px-32">
      <div className="flex w-full flex-col justify-center gap-10 lg:flex-row">
        <img
          src={gameData?.background_image}
          alt=""
          className="h-100 w-full object-cover lg:w-1/3"
        />
        <div className="flex  flex-col justify-around lg:w-1/3">
          <h1 className="text-4xl font-bold ">{gameData?.name}</h1>
          <div className="flex flex-col justify-start gap-1">
            <div className="flex gap-2 text-lg">
              {gameData?.rating && <Stars rating={gameData.rating} />}
              <p>{gameData?.rating}/5</p>
            </div>
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
            <div className="card-body flex items-center justify-center ">
              <span className="loading loading-spinner loading-lg  text-primary"></span>
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
          <div className="join flex flex-col ">
            {listings?.map((listing, index) => {
              if (index !== 0) {
                return (
                  <OtherListing
                    key={index}
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
        <>
          <h2 className="mb-1 self-start text-2xl font-bold">Description</h2>
          <div
            className="w-full"
            dangerouslySetInnerHTML={{ __html: gameData.description }}
          />
        </>
      )}
      {screenshots && screenshots.length > 0 && (
        <div className=" flex w-full justify-center">
          <Screenshots screenshots={screenshots} />
        </div>
      )}
      {reviews && reviews.length > 0 && <Reviews allReviews={reviews} />}
    </div>
  )
}
