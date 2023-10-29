import React from "react"
import Link from "next/link"

interface Props {
  styles?: string
  text: string
  href: string
}

const NavBarListItem = ({ styles, text, href }: Props) => {
  return (
    <li>
      <Link href={href}>
        <p
          className={`text-xl font-semibold border-b border-b-transparent hover:border-b hover:border-b-primary ${styles}`}
        >
          {text}
        </p>
      </Link>
    </li>
  )
}

export default NavBarListItem
