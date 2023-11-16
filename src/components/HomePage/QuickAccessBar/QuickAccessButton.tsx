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
      className="flex h-32 w-52 transform select-none flex-col items-center justify-center rounded-lg bg-primary shadow-lg transition-all hover:scale-105 hover:cursor-pointer"
      onClick={onClick}
    >
      <Image src={icon} alt={alt} width={60} height={60} />
      <p className="pt-2 text-2xl text-white ">{text}</p>
    </div>
  )
}

export default QuickAccessButton
