import React from "react"
import { useQuery } from "@apollo/client"

import { GET_LATEST_LISTINGS } from "@/utils/graphQueries"
import GameCard from "../GameCard"
import { gameCardType } from "@/types/listingType"
import { useRouter } from "next/router"
import ExploreMoreButton from "../ExploreMoreButton"

const NewArrivals = () => {
  const { error, data, loading } = useQuery(GET_LATEST_LISTINGS)
  const router = useRouter()

  let mappedGames: JSX.Element[] = []
  if (data) {
    mappedGames = data?.listingsByGames
      .slice(0, 6)
      .map((game: gameCardType) => (
        <GameCard
          key={game.gameId}
          gameId={game.gameId}
          gameName={game.gameName}
          gameImage={game.gameImage}
          genres={game.genres}
          tags={game.tags}
          bgColor="base-100"
        />
      ))
  }

  const handleRedirect = () => {
    router.push({
      pathname: router.pathname + "categories",
      query: {
        filters: JSON.stringify({ order: "latestDate" }),
      },
    })
  }

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
          <div
            data-testid="new-arrivals-component"
            className="mx-auto grid h-fit max-w-screen-xl grid-flow-col grid-cols-1 grid-rows-6 gap-y-6 px-4 lg:grid-cols-2 lg:grid-rows-3"
          >
            <>{mappedGames}</>
          </div>
          <ExploreMoreButton
            onRedirect={handleRedirect}
            testId="new-arrivals-button"
          />
        </>
      )}
    </>
  )
}

export default NewArrivals
