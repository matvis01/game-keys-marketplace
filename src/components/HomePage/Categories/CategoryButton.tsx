import React from "react"
import Image from "next/image"

interface CategoryButtonProps {
  imgSrc: string
  imgAlt: string
  text: string
  width?: number
  height?: number
}

const CategoryButton = ({
  imgSrc,
  imgAlt,
  text,
  width = 64,
  height = 64,
}: CategoryButtonProps) => {
  return (
    <div className="flex h-36 w-36 flex-col items-center justify-center gap-4 bg-primary text-white shadow-lg transition-all duration-300 hover:cursor-pointer hover:bg-opacity-[75%]">
      <Image src={imgSrc} alt={imgAlt} width={width} height={height} />
      <p>{text}</p>
    </div>
  )
}

export default CategoryButton
