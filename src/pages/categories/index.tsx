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
  const [listings, setListings] = useState<ListingType[]>([])

  const [filters, setFilters] = useState<filtersType>({
    minPrice: undefined,
    maxPrice: undefined,
    tags: [],
    genres: [],
  })

  const { data, loading, error, refetch } = useQuery(
    GET_LISTINGS_BY_CRITERIA(filters),
  )

  useEffect(() => {
    if (!data) return
    let filtered = data.listingsByGames.filter(
      (listing: any) => listing.allListings.length > 0,
    )
    setListings(filtered)
  }, [data])

  useEffect(() => {
    if (!paramsFilters) return
    const startFilters = JSON.parse(paramsFilters)
    setFilters({ ...filters, ...startFilters })
    refetch()
  }, [paramsFilters])

  const addFilter = (filter: filtersType) => {
    setFilters((prev) => ({ ...prev, ...filter }))
  }

  return (
    <div className="flex h-full w-full justify-center">
      <div className=" max-h-full w-1/4 ">
        <div className="sticky top-20 flex w-full justify-center">
          <Filters
            onFilterChange={(filter: filtersType) => {
              addFilter(filter)
            }}
          />
        </div>
      </div>
      <div className="w-1/2 overflow-auto border border-black">
        {!error &&
          listings?.map((listing: ListingType) => (
            <GameCard bgColor="base-100" key={listing.id} {...listing} />
          ))}
      </div>
    </div>
  )
}

export default CategoriesPage
