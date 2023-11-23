import React, { useEffect, useState } from "react"
import TagGenreFilters from "./TagGenreFilters"
import { GET_ALL_GENRES, GET_ALL_TAGS } from "../../utils/graphQueries"
import { useQuery } from "@apollo/client"
import { useParams, useSearchParams } from "next/navigation"

type filtersType = {
  minPrice?: number
  maxPrice?: number
  tags?: string[]
  genres?: string[]
}

interface FiltersProps {
  onFilterChange: (filter: filtersType) => void
  startFilters: filtersType
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange, startFilters }) => {
  const [prices, setPrices] = useState<{ minPrice: number; maxPrice: number }>({
    minPrice: 0,
    maxPrice: 100,
  })

  const { data: genresData, loading: genresLoading } = useQuery(GET_ALL_GENRES)
  const { data: tagsData, loading: tagsLoading } = useQuery(GET_ALL_TAGS)

  const genres = genresData?.genres.map((genre: any) => genre.name)
  const tags = tagsData?.tags.map((tag: any) => tag.name)

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value
    if (inputValue === "") {
      setPrices({ ...prices, [event.target.name]: undefined })
      return
    }
    if (!isNaN(Number(inputValue))) {
      setPrices({ ...prices, [event.target.name]: Number(inputValue) })
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center gap-4  p-1">
      <label htmlFor="minPrice">Price:</label>
      <div className="flex max-w-full justify-center">
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
