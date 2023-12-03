import React, { useRef } from "react"

import FeaturedGames from "@/components/HomePage/FeaturedGames/FeaturedGames"
import QuickAccessBar from "@/components/HomePage/QuickAccessBar/QuickAccessBar"
import Bestsellers from "@/components/HomePage/Bestsellers/Bestsellers"
import NewArrivals from "@/components/HomePage/NewArrivals/NewArrivals"
import TopRated from "@/components/HomePage/TopRated/TopRated"
import Categories from "@/components/HomePage/Categories/Categories"

export default function Home() {
  const bestsellersRef = useRef(null)
  const newArrivalsRef = useRef(null)
  const topRatedRef = useRef(null)
  const categoriesRef = useRef(null)

  const scrollRefs = {
    bestsellersRef,
    topRatedRef,
    newArrivalsRef,
    categoriesRef,
  }

  return (
    <main>
      <div data-testid="quick-access-bar-container" className="bg-neutral">
        <QuickAccessBar refs={scrollRefs} />
      </div>
      <div data-testid="featured-games-container" className="bg-base-100 py-8">
        <FeaturedGames />
      </div>
      <div
        data-testid="bestsellers-container"
        ref={bestsellersRef}
        className="bg-neutral py-8"
      >
        <Bestsellers />
      </div>
      <div
        data-testid="top-rated-container"
        ref={topRatedRef}
        className="bg-base-100 py-8"
      >
        <TopRated />
      </div>
      <div
        data-testid="new-arrivals-container"
        ref={newArrivalsRef}
        className="bg-neutral py-8"
      >
        <NewArrivals />
      </div>
      <div
        data-testid="categories-container"
        ref={categoriesRef}
        className="bg-base-100 py-8"
      >
        <Categories />
      </div>
    </main>
  )
}
