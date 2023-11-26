import React, { useEffect, useState, useCallback, use } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { useQuery } from "@apollo/client"
import ReactPaginate from "react-paginate"

import { GET_LISTINGS_BY_CRITERIA } from "../../utils/graphQueries"
import { filtersType } from "../../types/filtersType"
import { ListingType } from "@/types/listingType"
import Filters from "../../components/CategoriesPage/Filters"
import CategoryGameCard from "@/components/CategoriesPage/CategoryGameCard"
import Image from "next/image"

const CategoriesPage = () => {
  const searchParams = useSearchParams()
  const paramsFilters = searchParams.get("filters")
  const [listings, setListings] = useState<ListingType[]>([])
  const [itemsOffset, setItemsOffset] = useState<number>(0)

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
  const itemsPerPage = 12
  const endOffset = itemsOffset + itemsPerPage
  const pageCount: number = Math.ceil(data?.listingsByGames.length / 12)

  const handlePageClick = (event: any) => {
    const newOffset =
      Math.ceil(event.selected * itemsPerPage) % listings?.length
    setItemsOffset(newOffset)
  }

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
      <div className="flex max-h-full w-1/4 justify-center ">
        <div className="sticky top-20 w-3/4">
          <Filters />
        </div>
      </div>
      <div className="flex w-3/4 flex-col">
        <div className="grid h-fit gap-x-4 gap-y-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!error &&
            listings
              ?.slice(itemsOffset, endOffset)
              .map((listing: ListingType) => (
                <CategoryGameCard key={listing.id} {...listing} />
              ))}
        </div>
        {!error && listings.length > 0 && (
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={handlePageClick}
            nextLabel={
              <Image
                src={"icons/icon-arrow.svg"}
                alt="arrow icon"
                width={25}
                height={25}
              />
            }
            previousLabel={
              <Image
                src={"icons/icon-arrow.svg"}
                alt="arrow icon"
                width={25}
                height={25}
                style={{ transform: "rotate(180deg)" }}
              />
            }
            breakLabel="..."
            pageRangeDisplayed={3}
            renderOnZeroPageCount={null}
            className="join flex justify-center text-white"
            nextClassName="p-2 border border-primary bg-neutral rounded-lg join-item"
            previousClassName="p-2 border border-primary bg-neutral rounded-lg join-item"
            pageClassName="p-2 border border-primary bg-neutral px-4 rounded-lg join-item"
            activeClassName="text-primary font-bold"
            disabledClassName="opacity-50"
            disabledLinkClassName="cursor-not-allowed"
          />
        )}
      </div>
    </div>
  )
}

export default CategoriesPage
