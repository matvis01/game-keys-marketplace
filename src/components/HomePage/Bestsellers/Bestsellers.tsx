import React from "react"
import { useQuery } from "@apollo/client"

import { soldListingsByGameType } from "@/types/listingType"
import { GET_SOLD_LAST_WEEKS_WITH_LISTING } from "@/utils/graphQueries"
import BestsellerCard from "./BestsellerCard"

const Bestsellers = () => {
  const {
    loading,
    error,
    data: listings,
  } = useQuery(GET_SOLD_LAST_WEEKS_WITH_LISTING(2))

  let mappedGames

  if (listings) {
    mappedGames = listings.itemsBoughtByGames.map(
      (game: soldListingsByGameType) => (
        <BestsellerCard
          key={game.gameId}
          gameId={game.gameId}
          gameName={game.gameName}
          gameImage={game.gameImage}
          tags={game.tags}
          genres={game.genres}
        />
      ),
    )
  }

  return (
    <>
      <h1 className="mb-6 text-center text-4xl text-white">Bestsellers</h1>
      {loading && (
        <div className="flex h-96 items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {!loading && !error && (
        <div className="mx-auto grid h-fit max-w-screen-xl grid-flow-col grid-cols-2 grid-rows-3 gap-3">
          <>{mappedGames}</>
        </div>
      )}
    </>
  )
}

export default Bestsellers
