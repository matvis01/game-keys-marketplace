import React from "react"
import Image from "next/image"

interface QuickAccessButtonProps {
  text: string
  icon: string
  alt: string
  onClick?: () => void
}

const QuickAccessButton = ({
  text,
  icon,
  alt,
  onClick,
}: QuickAccessButtonProps) => {
  return (
    <div
      className="flex h-16 w-20 transform select-none flex-col items-center justify-center justify-self-center rounded-lg bg-primary shadow-lg transition-all hover:scale-105 hover:cursor-pointer sm:h-24 sm:w-32 md:h-32 md:w-40"
      onClick={onClick}
    >
      <div className="relative h-6 w-6 sm:h-12 sm:w-12 md:h-16 md:w-16">
        <Image src={icon} alt={alt} fill />
      </div>
      <p className="pt-1 text-xs text-white sm:pt-1 sm:text-lg md:pt-2 md:text-2xl">
        {text}
      </p>
    </div>
  )
}

export default QuickAccessButton
