import React from "react"
import Image from "next/image"
import Link from "next/link"

interface SocialIconProps {
  icons: {
    name: string
    alt: string
    href: string
  }[]
  width?: number
  height?: number
}

const SocialIcons = ({ icons, width = 25, height = 25 }: SocialIconProps) => {
  const mappedIcons = icons.map((icon, index) => {
    return (
      <Link href={icon.href} key={index}>
        <span
          className="mx-1.5 inline-flex cursor-pointer items-center
        rounded-full bg-base-100 p-2 text-xl duration-300
        hover:bg-primary "
        >
          <Image
            src={`/icons/socialIcons/logo-${icon.name.toLowerCase()}.svg`}
            alt={icon.alt}
            width={width}
            height={height}
          />
        </span>
      </Link>
    )
  })
  return <div>{mappedIcons}</div>
}

export default SocialIcons
