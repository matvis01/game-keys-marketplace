import React, { useEffect, useState, useCallback, use } from "react"
import Filters from "../../components/CategoriesPage/Filters"
import { useQuery } from "@apollo/client"
import { GET_LISTINGS_BY_CRITERIA } from "../../utils/graphQueries"
import { filtersType } from "../../types/filtersType"
import { ListingType } from "@/types/listingType"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import CategoryGameCard from "@/components/CategoriesPage/CategoryGameCard"

const CategoriesPage = () => {
  const searchParams = useSearchParams()
  const paramsFilters = searchParams.get("filters")
  const [listings, setListings] = useState<ListingType[]>([])

  const [filters, setFilters] = useState<filtersType>({
    minPrice: undefined,
    maxPrice: undefined,
    tags: [],
    genres: [],
    order: undefined,
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

  return (
    <div className="mx-auto mb-8 flex h-full w-full max-w-screen-xl justify-center">
      <div className="max-h-full w-1/4 ">
        <div className="sticky top-20 flex w-full">
          <Filters />
        </div>
      </div>
      <div className="grid h-fit w-3/4 gap-x-4 gap-y-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!error &&
          listings?.map((listing: ListingType) => (
            <CategoryGameCard key={listing.id} {...listing} />
          ))}
      </div>
    </div>
  )
}

export default CategoriesPage
