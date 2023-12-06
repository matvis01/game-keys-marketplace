import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"

interface CategoryButtonProps {
  imgSrc: string
  imgAlt: string
  text: string
  linkText?: string
  width?: number
  height?: number
}

const CategoryButton = ({
  imgSrc,
  imgAlt,
  text,
  linkText,
  width = 64,
  height = 64,
}: CategoryButtonProps) => {
  const router = useRouter()

  const handleClick = () => {
    const filters = {
      genres: [linkText ?? text],
    }
    router.push({
      pathname: router.pathname + "categories",
      query: {
        filters: JSON.stringify(filters),
      },
    })
  }
  return (
    <div
      data-testid={`${linkText?.toLowerCase()}-category-button`}
      onClick={handleClick}
      className="flex h-24 w-24 flex-col items-center justify-center gap-2 justify-self-center rounded-lg border border-primary bg-neutral text-white shadow-lg transition-all duration-300 hover:cursor-pointer hover:bg-primary sm:h-36 sm:w-36 sm:gap-4"
    >
      <div className="relative h-8 w-8 sm:h-12 sm:w-12">
        <Image src={imgSrc} alt={imgAlt} fill />
      </div>
      <p>{text}</p>
    </div>
  )
}

export default CategoryButton
