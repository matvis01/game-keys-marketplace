import React, { useEffect, useState, useCallback, use } from "react"
import Filters from "../../components/CategoriesPage/Filters"
import { useQuery } from "@apollo/client"
import { GET_LISTINGS_BY_CRITERIA } from "../../utils/graphQueries"
import { filtersType } from "../../types/filtersType"
import GameCard from "@/components/HomePage/Bestsellers/GameCard"
import { ListingType } from "@/types/listingType"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"

const CategoriesPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const paramsFilters = searchParams.get("filters")

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

  useEffect(() => {
    if (!paramsFilters) return
    const startFilters = JSON.parse(paramsFilters)
    setFilters({ ...filters, ...startFilters })
    refetch()
  }, [paramsFilters])

  const addFilter = (filter: filtersType) => {
    setFilters((prev) => ({ ...prev, ...filter }))
  }
  useEffect(() => {
    if (paramsFilters) return

    router.push({
      pathname: router.pathname,
      query: {
        filters: JSON.stringify(filters),
      },
    })
  }, [])

  return (
    <div className="flex h-full w-full justify-center">
      <div className="max-h-full w-1/4">
        <div className="sticky top-0">
          <Filters
            onFilterChange={(filter: filtersType) => {
              addFilter(filter)
            }}
            startFilters={filters}
          />
        </div>
      </div>
      <div className="w-1/2 overflow-auto border border-black">
        {!error &&
          listings?.listingsByGames?.map((listing: ListingType) => (
            <GameCard bgColor="base-100" key={listing.id} {...listing} />
          ))}
      </div>
    </div>
  )
}

export default CategoriesPage
