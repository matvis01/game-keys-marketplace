import React, { useEffect, useState, useCallback, use } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { useQuery } from "@apollo/client"
import ReactPaginate from "react-paginate"

import { GET_LISTINGS_BY_CRITERIA } from "../../utils/graphQueries"
import { filtersType } from "../../types/filtersType"
import { ListingType } from "@/types/listingType"
import Filters from "../../components/CategoriesPage/Filters"
import Image from "next/image"
import AlternativeGameCard from "@/components/CategoriesPage/AlternativeGameCard"

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
    let filtered: ListingType[] = data.listingsByGames.filter(
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

  const PageContent = (
    <div className="flex w-full flex-col lg:w-3/4">
      <div className="flex flex-wrap gap-2 p-4 ">
        {!error &&
          listings
            ?.slice(itemsOffset, endOffset)
            .map((listing: ListingType) => (
              <AlternativeGameCard key={listing.id} {...listing} />
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
  )

  return (
    <div className="mx-auto mb-8 flex h-full w-full max-w-screen-xl justify-center">
      <div className="flex max-h-full w-full justify-center ">
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex  flex-col lg:flex-row">
            {/* Navbar */}
            <div className=" flex w-full flex-col bg-base-300 lg:w-1/4">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn  btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                  Filters
                </label>
              </div>

              <div className="hidden flex-none lg:block">
                <Filters />
              </div>
            </div>
            {PageContent}
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu min-h-full w-80 bg-base-200 p-4 pt-20">
              {/* Sidebar content here */}
              <Filters />
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage
