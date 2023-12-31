import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Navigation } from "swiper/modules"

import { useQuery } from "@apollo/client"
import { GET_FEATURED_GAMES } from "@/utils/graphQueries"
import SwiperCard from "./SwiperCard"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/effect-coverflow"

type FeaturedGame = {
  gameId: number
  gameName: string
  gameImage: string
  genres?: string[]
  tags?: string[]
}

const FeaturedGames = () => {
  const { loading, error, data: listings } = useQuery(GET_FEATURED_GAMES)
  const games = listings?.listingsByGames

  let mappedGames: JSX.Element[] = []
  if (games) {
    mappedGames = games?.map((game: FeaturedGame, index: number) => {
      return (
        <SwiperSlide key={index}>
          <SwiperCard gameProps={game} />
        </SwiperSlide>
      )
    })
  }
  return (
    <>
      <h1 className="mb-6 text-center text-4xl text-white">Featured Games</h1>
      {loading && (
        <div className="flex h-96 items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {!loading && !error && (
        <div
          data-testid="featured-games-component"
          className="flex items-center justify-center"
        >
          <Swiper
            breakpoints={{
              470: { slidesPerView: 2 },
              700: { slidesPerView: 3 },
              1550: { slidesPerView: 4 },
            }}
            effect="coverflow"
            centeredSlides={true}
            loop={true}
            navigation={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
            }}
            modules={[EffectCoverflow, Navigation]}
            className="mb-5 max-w-[90%] lg:max-w-[80%]"
          >
            {mappedGames}
          </Swiper>
        </div>
      )}
    </>
  )
}

export default FeaturedGames
