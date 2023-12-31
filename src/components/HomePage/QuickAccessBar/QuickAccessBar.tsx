import React from "react"
import QuickAccessButton from "./QuickAccessButton"

interface QuickAccessBarProps {
  refs: {
    bestsellersRef: React.RefObject<HTMLDivElement>
    newArrivalsRef: React.RefObject<HTMLDivElement>
    topRatedRef: React.RefObject<HTMLDivElement>
    categoriesRef: React.RefObject<HTMLDivElement>
  }
}

const QuickAccessBar = ({ refs }: QuickAccessBarProps) => {
  const { bestsellersRef, newArrivalsRef, topRatedRef, categoriesRef } = refs
  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref?.current) {
      const offsetTop = ref.current.offsetTop - 80
      window.scrollTo({ behavior: "smooth", top: offsetTop })
    }
  }

  return (
    <div
      data-testid="quick-access-bar-component"
      className="mx-auto grid h-fit w-full max-w-screen-xl grid-cols-2 items-center justify-center gap-2 px-8 py-4 sm:flex sm:px-4"
    >
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
        onClick={() => scrollTo(categoriesRef)}
      />
    </div>
  )
}

export default QuickAccessBar
