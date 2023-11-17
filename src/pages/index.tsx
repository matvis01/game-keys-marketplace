import React, { useRef } from "react"

import FeaturedGames from "@/components/HomePage/FeaturedGames/FeaturedGames"
import QuickAccessBar from "@/components/HomePage/QuickAccessBar/QuickAccessBar"
import Bestsellers from "@/components/HomePage/Bestsellers/Bestsellers"
import NewArrivals from "@/components/HomePage/NewArrivals/NewArrivals"

export default function Home() {
  const bestsellersRef = useRef(null)
  const newArrivalsRef = useRef(null)

  const scrollRefs = {
    bestsellersRef,
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
      <div ref={newArrivalsRef} className="bg-base-100 py-8">
        <NewArrivals />
      </div>
    </main>
  )
}
