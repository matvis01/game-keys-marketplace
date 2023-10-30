import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/free-mode"

import { FreeMode, Pagination } from "swiper/modules"
import { RxArrowTopRight } from "react-icons/rx"
import GameCard from "./GameCard"

import exampleGame from "@/constants/exampleGame.json"
import { GameType } from "@/types/gameType"

const FeaturedGames = () => {
  const { name, background_image, description } = exampleGame as GameType
  const TEST_ARR = [
    {
      name,
      description,
      background_image,
    },
    {
      name,
      description,
      background_image,
    },
    {
      name,
      description,
      background_image,
    },
    {
      name,
      description,
      background_image,
    },
    {
      name,
      description,
      background_image,
    },
    {
      name,
      description,
      background_image,
    },
  ]
  return (
    <div className="flex items-center justify-center flex-col border border-white py-8">
      <h1 className="text-center text-4xl mb-6">Featured Games</h1>
      <Swiper
        breakpoints={{
          340: { slidesPerView: 2, spaceBetween: 13 },
          700: { slidesPerView: 3, spaceBetween: 0 },
        }}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="max-w-[90%] lg:max-w-[80%]"
      >
        {TEST_ARR.map((game, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="flex flex-col mb-20 gap-6 relative bg-neutral text-white rounded-lg h-[250px] w-[215px] lg:h-[350px] lg:w-[355px] transform transition-all scale-95 hover:scale-100 hover:cursor-pointer">
                <div className="">
                  <figure>
                    <img
                      src={game.background_image}
                      alt="game image"
                      className="rounded-lg"
                    />
                  </figure>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-sm mt-4 mr-4">
                      Learn More
                    </button>
                  </div>
                  <h2 className="card-title pl-6">{game.name}</h2>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default FeaturedGames
