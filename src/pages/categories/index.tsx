import React, { useEffect, useState } from "react"
import Filters from "../../components/CategoriesPage/Filters"
import { useQuery } from "@apollo/client"
import { GET_LISTINGS_BY_CRITERIA } from "../../utils/graphQueries"
import { filtersType } from "../../types/filtersType"
// import BestsellerCard from "@/components/HomePage/Bestsellers/BestsellerCard"
import { ListingType } from "@/types/listingType"

const CategoriesPage = () => {
  const [filters, setFilters] = useState<filtersType>({
    minPrice: 0,
    maxPrice: 100,
    tags: [],
    genres: [],
  })

  const {
    data: listings,
    loading,
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
      <div className="max-h-full w-1/4">
        <div className="sticky top-0">
          <Filters
            onFilterChange={(filter: filtersType) => {
              addFilter(filter)
            }}
          />
        </div>
      </div>
      <div className="w-1/2 overflow-auto border border-black">
        {/* {!error &&
          listings?.listingsByGames?.map((listing: ListingType) => (
            <BestsellerCard key={listing.id} {...listing} />
          ))} */}
      </div>
    </div>
  )
}

export default CategoriesPage
