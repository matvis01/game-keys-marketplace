import React from "react"
import QuickAccessButton from "./QuickAccessButton"

interface QuickAccessBarProps {
  refs: {
    bestsellersRef: React.RefObject<HTMLDivElement>
    newArrivalsRef: React.RefObject<HTMLDivElement>
    topRatedRef: React.RefObject<HTMLDivElement>
  }
}

const QuickAccessBar = ({ refs }: QuickAccessBarProps) => {
  const { bestsellersRef, newArrivalsRef, topRatedRef } = refs
  const scrollTo = (ref: any) => {
    if (ref?.current) {
      const offsetTop = ref.current.offsetTop - 64
      window.scrollTo({ behavior: "smooth", top: offsetTop })
    }
  }

  return (
    <div className="mx-auto flex h-40 w-full max-w-screen-xl items-center justify-between px-16">
      <QuickAccessButton
        text="Bestsellers"
        icon="/icons/bestseller-icon.svg"
        alt="bestseller icon"
        onClick={() => scrollTo(bestsellersRef)}
      />
      <QuickAccessButton
        text="Top Rated"
        icon="/icons/top-rated.svg"
        alt="top rated icon"
        onClick={() => scrollTo(topRatedRef)}
      />
      <QuickAccessButton
        text="New Arrivals"
        icon="/icons/new-arrival-icon.svg"
        alt="new arrival icon"
        onClick={() => scrollTo(newArrivalsRef)}
      />
      <QuickAccessButton
        text="Categories"
        icon="/icons/category-icon.svg"
        alt="category icon"
      />
    </div>
  )
}

export default QuickAccessBar
