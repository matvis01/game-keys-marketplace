import React, { useRef } from "react"

import FeaturedGames from "@/components/HomePage/FeaturedGames/FeaturedGames"
import QuickAccessBar from "@/components/HomePage/QuickAccessBar/QuickAccessBar"
import Bestsellers from "@/components/HomePage/Bestsellers/Bestsellers"
import NewArrivals from "@/components/HomePage/NewArrivals/NewArrivals"
import TopRated from "@/components/HomePage/TopRated/TopRated"

export default function Home() {
  const bestsellersRef = useRef(null)
  const newArrivalsRef = useRef(null)
  const topRatedRef = useRef(null)

  const scrollRefs = {
    bestsellersRef,
    topRatedRef,
    newArrivalsRef,
  }

  return (
    <main>
      <div className="bg-neutral">
        <QuickAccessBar refs={scrollRefs} />
      </div>
      <div className="bg-base-100 py-8">
        <FeaturedGames />
      </div>
      <div ref={bestsellersRef} className="bg-neutral py-8">
        <Bestsellers />
      </div>
      <div ref={topRatedRef} className="bg-base-100 py-8">
        <TopRated />
      </div>
      <div ref={newArrivalsRef} className="bg-neutral py-8">
        <NewArrivals />
      </div>
    </main>
  )
}
