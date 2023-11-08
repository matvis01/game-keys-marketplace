import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/free-mode"
import { FreeMode, Pagination } from "swiper/modules"
import { RxArrowTopRight } from "react-icons/rx"
import SwiperCard from "./SwiperCard"
import exampleGame from "@/constants/exampleGame.json"
import { GameType } from "@/types/gameType"
import { useQuery } from "@apollo/client"
import { GET_FEATURED_GAMES } from "@/constants/graphQueries"

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
    <div className="mb-8 flex flex-col items-center">
      <h1 className="mb-6 text-center text-4xl text-white">Featured Games</h1>
      <Swiper
        breakpoints={{
          340: { slidesPerView: 2, spaceBetween: 13 },
          700: { slidesPerView: 3, spaceBetween: 15 },
        }}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="mb-5 max-w-[90%] lg:max-w-[70%]"
      >
        {mappedGames}
      </Swiper>
      <div>
        <button className="btn btn-primary btn-wide text-white">
          Explore more
        </button>
      </div>
    </div>
  )
}

export default FeaturedGames
