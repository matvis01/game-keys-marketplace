import React, { useEffect, useState } from "react"
import Filters from "../../components/CategoriesPage/Filters"
import { useQuery } from "@apollo/client"
import { GET_LISTINGS_BY_CRITERIA } from "../../utils/graphQueries"
import { filtersType } from "../../types/filtersType"

const CategoriesPage = () => {
  const [filters, setFilters] = useState<filtersType>({
    minPrice: 0,
    maxPrice: 100,
    tags: [],
    genres: [],
  })

  const {
    data: listings,
    error,
    refetch,
  } = useQuery(GET_LISTINGS_BY_CRITERIA(filters))

  const addFilter = (filter: filtersType) => {
    setFilters((prev) => ({ ...prev, ...filter }))
  }
  useEffect(() => {
    refetch()
  }, [filters])

  useEffect(() => {
    console.log(listings)
  }, [listings])

  return (
    <div className="flex h-full w-full justify-center">
      <div className=" w-1/4 ">
        <Filters
          onFilterChange={(filter: filtersType) => {
            addFilter(filter)
          }}
        />
      </div>
      <div className="w-1/2 border border-black"></div>
    </div>
  )
}

export default CategoriesPage
