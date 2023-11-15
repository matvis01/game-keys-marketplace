import React from "react"
import { GET_SOLD_LAST_WEEKS_WITH_LISTING } from "@/utils/graphQueries"
import { useQuery } from "@apollo/client"
import BestsellerCard from "./BestsellerCard"
import { soldListingsByGameType } from "@/types/listingType"

const Bestsellers = () => {
  const {
    loading,
    error,
    data: listings,
  } = useQuery(GET_SOLD_LAST_WEEKS_WITH_LISTING(2))

  let mappedGames

  if (listings) {
    console.log(listings.itemsBoughtByGames)
    mappedGames = listings.itemsBoughtByGames.map(
      (game: soldListingsByGameType) => (
        <BestsellerCard
          gameId={game.gameId}
          gameName={game.gameName}
          gameImage={game.gameImage}
          gamePrice={0.001}
          tags={game.tags}
          genres={game.genres}
        />
      ),
    )
  }

  return (
    <>
      <h1 className="mb-6 text-center text-4xl text-white">Bestsellers</h1>
      <div className="mx-auto grid h-96 max-h-fit max-w-screen-lg grid-flow-col border border-white">
        {loading && (
          <div className="flex h-96 items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        {!loading && !error && <>{mappedGames}</>}
      </div>
    </>
  )
}

export default Bestsellers
