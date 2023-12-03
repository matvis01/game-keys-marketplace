import React from "react"
import Link from "next/link"

interface Props {
  dataTestId?: string
  styles?: string
  text: string
  href: string
}

const NavBarListItem = ({ styles, text, href, dataTestId }: Props) => {
  return (
    <li data-testid={dataTestId}>
      <Link href={href}>
        <p
          className={`border-b border-b-transparent text-xl font-semibold hover:border-b hover:border-b-primary ${styles}`}
        >
          {text}
        </p>
      </Link>
    </li>
  )
}

export default NavBarListItem
