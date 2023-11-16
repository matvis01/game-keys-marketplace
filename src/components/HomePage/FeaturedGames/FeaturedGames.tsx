import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Pagination } from "swiper/modules"

import { useQuery } from "@apollo/client"
import { GET_FEATURED_GAMES } from "@/utils/graphQueries"
import SwiperCard from "./SwiperCard"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/free-mode"

type FeaturedGame = {
  gameId: number
  gameName: string
  gameImage: string
}

const FeaturedGames = () => {
  const { loading, error, data: listings } = useQuery(GET_FEATURED_GAMES)
  const games = listings?.listingsByGames

  const mappedGames = games?.map((game: FeaturedGame, index: number) => {
    return (
      <SwiperSlide key={index}>
        <SwiperCard gameProps={game} />
      </SwiperSlide>
    )
  })
  return (
    <>
      <h1 className="mb-6 text-center text-4xl text-white">Featured Games</h1>
      {loading && (
        <div className="flex h-96 items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {!loading && !error && (
        <>
          <div className="flex items-center justify-center">
            <Swiper
              breakpoints={{
                340: { slidesPerView: 2, spaceBetween: 13 },
                700: { slidesPerView: 3, spaceBetween: 15 },
                1550: { slidesPerView: 4, spaceBetween: 20 },
              }}
              freeMode={true}
              pagination={{ clickable: true }}
              modules={[FreeMode, Pagination]}
              className="mb-5 max-w-[90%] lg:max-w-[80%]"
            >
              {mappedGames}
            </Swiper>
          </div>
          <div className="flex items-center justify-center">
            <button className="btn btn-primary btn-wide mb-3 text-white">
              Explore more
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default FeaturedGames
