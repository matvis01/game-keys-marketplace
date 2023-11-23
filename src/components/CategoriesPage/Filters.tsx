import React, { useEffect, useState } from "react"
import TagGenreFilters from "./TagGenreFilters"
import { GET_ALL_GENRES, GET_ALL_TAGS } from "../../utils/graphQueries"
import { useQuery } from "@apollo/client"
import { useParams, useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { filtersType } from "../../types/filtersType"
import { ethers } from "ethers"

interface FiltersProps {
  onFilterChange: (filter: filtersType) => void
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [prices, setPrices] = useState<{
    minPrice: string | undefined
    maxPrice: string | undefined
  }>({
    minPrice: undefined,
    maxPrice: undefined,
  })
  const router = useRouter()
  const searchParams = useSearchParams().get("filters")
  const paramsFilters = searchParams
    ? JSON.parse(searchParams)
    : { minPrice: undefined, maxPrice: undefined }

  const { data: genresData, loading: genresLoading } = useQuery(GET_ALL_GENRES)
  const { data: tagsData, loading: tagsLoading } = useQuery(GET_ALL_TAGS)

  const genres = genresData?.genres.map((genre: any) => genre.name)
  const tags = tagsData?.tags.map((tag: any) => tag.name)

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value
    let newPrices = { ...prices }
    if (inputValue === "") {
      newPrices = { ...newPrices, [event.target.name]: "" }
    } else if (!isNaN(Number(inputValue))) {
      newPrices = {
        ...newPrices,
        [event.target.name]: inputValue,
      }
    }
    setPrices(newPrices)
    const newPricesInWei = {
      minPrice: ethers.parseEther(newPrices.minPrice || "0").toString(),
      maxPrice: newPrices.maxPrice
        ? ethers.parseEther(newPrices.maxPrice).toString()
        : null,
    }
    router.push({
      pathname: router.pathname,
      query: {
        filters: JSON.stringify({ ...paramsFilters, ...newPricesInWei }),
      },
    })
  }

  return (
    <div className="flex h-full w-2/3 flex-col items-center gap-4  p-1">
      <label htmlFor="minPrice">Price:</label>
      <div className="flex w-full justify-center">
        <input
          id="minPrice"
          name="minPrice"
          value={prices.minPrice}
          type="number"
          step={"any"}
          min={0}
          onChange={handlePriceChange}
          className="input input-bordered input-primary input-sm w-full  bg-base-100"
        />
        <span className="mx-2">-</span>
        <input
          id="maxPrice"
          name="maxPrice"
          type="number"
          step={"any"}
          min={0}
          value={prices.maxPrice}
          onChange={handlePriceChange}
          className="input input-bordered input-primary input-sm w-full bg-base-100"
        />
      </div>
      <label>Genre:</label>
      <TagGenreFilters items={genres || []} name="genres" />
      <label>Tags:</label>
      <TagGenreFilters items={tags || []} name="tags" />
    </div>
  )
}

export default Filters
