import React from "react"

import FeaturedGames from "@/components/HomePage/FeaturedGames/FeaturedGames"
import QuickAccessBar from "@/components/HomePage/QuickAccessBar/QuickAccessBar"
import Bestsellers from "@/components/HomePage/Bestsellers/Bestsellers"

export default function Home() {
  return (
    <main>
      <div className="bg-neutral">
        <QuickAccessBar />
      </div>
      <div className="bg-base-100 py-8">
        <FeaturedGames />
      </div>
      <div className="bg-neutral py-8">
        <Bestsellers />
      </div>
    </main>
  )
}
