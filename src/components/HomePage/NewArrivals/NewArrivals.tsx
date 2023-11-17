import React from "react"
import { useQuery } from "@apollo/client"
import { GET_LATEST_LISTINGS } from "@/utils/graphQueries"
import GameCard from "../Bestsellers/GameCard"

const NewArrivals = () => {
  const { error, data, loading } = useQuery(GET_LATEST_LISTINGS)

  const mappedGames = data?.listingsByGames
    .slice(0, 6)
    .map((game: any) => (
      <GameCard
        key={game.gameId}
        gameId={game.gameId}
        gameName={game.gameName}
        gameImage={game.gameImage}
        genres={game.genres}
        tags={game.tags}
        bgColor="neutral"
      />
    ))
  return (
    <>
      <h1 className="mb-6 text-center text-4xl text-white">New Arrivals</h1>
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
            <button className="btn btn-primary btn-wide mb-3 mt-6 text-white">
              Explore more
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default NewArrivals
