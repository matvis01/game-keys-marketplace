import React, { useState } from "react"
import { useQuery } from "@apollo/client"

import { GET_ALL_GENRES } from "@/utils/graphQueries"
import CategoryButton from "./CategoryButton"

const Categories = () => {
  const { loading, error, data: listings } = useQuery(GET_ALL_GENRES)
  const [isShowAll, setIsShowAll] = useState<boolean>(false)

  let mappedCategories: JSX.Element[] = []
  if (listings) {
    mappedCategories = listings?.genres?.map(
      (genre: { name: string; numberOfGames: number }, index: number) => {
        const name = genre.name
        return (
          <CategoryButton
            key={index}
            imgSrc={`/icons/categoryIcons/${
              name === "Massively Multiplayer" ? "mmo" : name.toLowerCase()
            }.svg`}
            imgAlt={`${genre.name} icon`}
            text={`${name === "Massively Multiplayer" ? "MMO" : name}`}
          />
        )
      },
    )
  }

  console.log(listings)

  return (
    <>
      <div
        className={`mx-auto grid ${
          isShowAll ? "h-fit" : "h-40"
        } w-full max-w-screen-xl grid-cols-7 items-center justify-between gap-y-5 ${
          isShowAll ? "overflow-y-visible" : "overflow-hidden"
        } px-16`}
      >
        {mappedCategories}
      </div>
      <div className="flex items-center justify-center">
        <button
          className="btn btn-primary btn-wide mb-3 mt-3 text-white"
          onClick={() => setIsShowAll((prev) => !prev)}
        >
          {isShowAll ? "Show less" : "Show more"}
        </button>
      </div>
    </>
  )
}

export default Categories
