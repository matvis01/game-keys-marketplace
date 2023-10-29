import React from "react"
import QuickAccessButton from "./QuickAccessButton"

const QuickAccessBar = () => {
  return (
    <div className="flex items-center justify-between h-40 w-full max-w-screen-xl px-16 mx-auto">
      <QuickAccessButton
        text="Bestsellers"
        icon="/icons/bestseller-icon.svg"
        alt="bestseller icon"
      />
      <QuickAccessButton
        text="New Arrivals"
        icon="/icons/new-arrival-icon.svg"
        alt="new arrival icon"
      />
      <QuickAccessButton
        text="Gift Cards"
        icon="/icons/gift-icon.svg"
        alt="gift icon"
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
