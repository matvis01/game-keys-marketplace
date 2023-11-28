import React from "react"
import { useQuery } from "@apollo/client"

import { GET_TOP_RATED } from "@/utils/graphQueries"
import GameCard from "../GameCard"
import { gameCardType } from "@/types/listingType"
import { useRouter } from "next/router"

const TopRated = () => {
  const { loading, error, data: listings } = useQuery(GET_TOP_RATED)
  const router = useRouter()

  let mappedGames: JSX.Element[] = []
  if (listings) {
    mappedGames = listings.listingsByGames.map((game: gameCardType) => (
      <GameCard
        key={game.gameId}
        gameId={game.gameId}
        gameName={game.gameName}
        gameImage={game.gameImage}
        tags={game.tags}
        genres={game.genres}
        bgColor="neutral"
      />
    ))
  }

  const handleRedirect = () => {
    router.push({
      pathname: router.pathname + "categories",
      query: {
        filters: JSON.stringify({ order: "rating" }),
      },
    })
  }

  return (
    <>
      <h1 className="mb-6 text-center text-4xl text-white">Top Rated</h1>
      {loading && (
        <div className="flex h-96 items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {!loading && !error && (
        <>
          <div className="mx-auto grid h-fit max-w-screen-xl grid-flow-col grid-cols-1 grid-rows-6 gap-y-6 px-4 lg:grid-cols-2 lg:grid-rows-3">
            <>{mappedGames}</>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={handleRedirect}
              className="btn btn-primary btn-wide mb-3 mt-6 text-white"
            >
              Explore more
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default TopRated
