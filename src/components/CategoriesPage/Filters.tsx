import React, { useState } from "react"
import TagGenreFilters from "./TagGenreFilters"
import { GET_ALL_FILTERS } from "../../utils/graphQueries"
import { useQuery } from "@apollo/client"

type filtersType = {
  minPrice?: number
  maxPrice?: number
  tags?: string[]
  genres?: string[]
}

interface FiltersProps {
  onFilterChange: (filter: filtersType) => void
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState<number>()
  const [maxPrice, setMaxPrice] = useState<number>()

  const { data: filters, loading } = useQuery(GET_ALL_FILTERS)

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value
    if (inputValue === "") {
      setMinPrice(undefined)
      onFilterChange({ minPrice: undefined })
      return
    }
    if (!isNaN(Number(inputValue))) {
      // Handle the empty value or valid number
      // For example, update state or trigger actions accordingly

      setMinPrice(Number(inputValue))
      onFilterChange({ minPrice: Number(inputValue) })
    }
  }

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value
    if (inputValue === "") {
      setMaxPrice(undefined)
      onFilterChange({ maxPrice: undefined })
      return
    }
    if (!isNaN(Number(inputValue))) {
      // Handle the empty value or valid number
      // For example, update state or trigger actions accordingly

      setMaxPrice(Number(inputValue))
      onFilterChange({ maxPrice: Number(inputValue) })
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center gap-4  p-1">
      <label htmlFor="minPrice">Price:</label>
      <div className="flex max-w-full justify-center">
        <input
          id="minPrice"
          name="minPrice"
          value={minPrice}
          type="number"
          step={"any"}
          min={0}
          onChange={handleMinPriceChange}
          className="input input-bordered input-primary input-sm w-full  bg-base-100"
        />
        <span className="mx-2">-</span>
        <input
          id="maxPrice"
          name="maxPrice"
          type="text"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="input input-bordered input-primary input-sm w-full bg-base-100"
        />
      </div>
      <label>Genre:</label>
      <TagGenreFilters
        items={filters?.allFilter.genres || []}
        onCheckedItemsChange={(genres: string[]) =>
          onFilterChange({ genres: genres })
        }
      />
      <label>Tags:</label>
      <TagGenreFilters
        items={filters?.allFilter.tags || []}
        onCheckedItemsChange={(tags: string[]) =>
          onFilterChange({ tags: tags })
        }
      />
    </div>
  )
}

export default Filters
