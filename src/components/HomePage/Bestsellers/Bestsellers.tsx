import React from "react"
import { useQuery } from "@apollo/client"

import { GET_SOLD_LAST_WEEKS_WITH_LISTING } from "@/utils/graphQueries"
import GameCard from "../GameCard"
import { gameCardType } from "@/types/listingType"

const Bestsellers = () => {
  const {
    loading,
    error,
    data: listings,
  } = useQuery(GET_SOLD_LAST_WEEKS_WITH_LISTING(2))

  let mappedGames

  if (listings) {
    mappedGames = listings.itemsBoughtByGames.map((game: gameCardType) => (
      <GameCard
        key={game.gameId}
        gameId={game.gameId}
        gameName={game.gameName}
        gameImage={game.gameImage}
        tags={game.tags}
        genres={game.genres}
        bgColor="base-100"
      />
    ))
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
        <>
          <div
            data-testid="bestsellers-component"
            className="mx-auto grid h-fit max-w-screen-xl grid-flow-col grid-cols-1 grid-rows-6 gap-y-6 px-4 lg:grid-cols-2 lg:grid-rows-3"
          >
            <>{mappedGames}</>
          </div>
          <div className="flex items-center justify-center">
            <button className="btn btn-primary btn-wide mb-3 mt-6 text-white">
              Explore more
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default Bestsellers
