import React from "react"
import { useQuery } from "@apollo/client"

import { GET_SOLD_LAST_WEEKS_WITH_LISTING } from "@/utils/graphQueries"
import GameCard from "../GameCard"
import { gameCardType } from "@/types/listingType"
import { useRouter } from "next/router"
import ExploreMoreButton from "../ExploreMoreButton"

const Bestsellers = () => {
  const {
    loading,
    error,
    data: listings,
  } = useQuery(GET_SOLD_LAST_WEEKS_WITH_LISTING(2))
  const router = useRouter()

  let mappedGames

  if (listings) {
    let sortedListings = listings.itemsBoughtByGames.toSorted(
      (a: any, b: any) => b.allItemsBought.length - a.allItemsBought.length,
    )
    mappedGames = sortedListings
      .slice(0, 6)
      .map((game: gameCardType) => (
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

  const handleRedirect = () => {
    router.push({
      pathname: router.pathname + "categories",
      query: {
        filters: JSON.stringify({ order: "numOfSoldItems" }),
      },
    })
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
          <ExploreMoreButton
            onRedirect={handleRedirect}
            testId="bestsellers-button"
          />
        </>
      )}
    </>
  )
}

export default Bestsellers
