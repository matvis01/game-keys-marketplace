import React from "react"
import { GET_SOLD_LAST_WEEKS_WITH_LISTING } from "@/utils/graphQueries"
import { useQuery } from "@apollo/client"

const Bestsellers = () => {
  const {
    loading,
    error,
    data: listings,
  } = useQuery(GET_SOLD_LAST_WEEKS_WITH_LISTING(2))

  if (listings) {
    console.log(listings.itemsBoughtByGames)
  }

  const mappedGames = listings?.itemsBoughtByGames.map((game: any) => {})

  return (
    <>
      <h1 className="mb-6 text-center text-4xl text-white">Bestsellers</h1>
      <div className="mx-auto grid h-96 max-h-fit max-w-screen-lg grid-flow-col border border-white"></div>
    </>
  )
}

export default Bestsellers
