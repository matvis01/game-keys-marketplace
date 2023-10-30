import React from "react"
import Image from "next/image"

interface QuickAccessButtonProps {
  text: string
  icon: string
  alt: string
}

const QuickAccessButton = ({ text, icon, alt }: QuickAccessButtonProps) => {
  return (
    <div className="flex flex-col items-center h-32 w-52 rounded-lg justify-center bg-primary shadow-lg transform transition-all hover:scale-105 hover:cursor-pointer">
      <Image src={icon} alt={alt} width={60} height={60} />
      <p className="text-2xl text-white pt-2 ">{text}</p>
    </div>
  )
}

export default QuickAccessButton
