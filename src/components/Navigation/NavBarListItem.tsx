import React from "react"
import Link from "next/link"

interface Props {
  dataTestId?: string
  styles?: string
  text: string
  href: string
  hoverStyles?: string
  onClick?: () => void
}

const NavBarListItem = ({
  styles,
  text,
  href,
  dataTestId,
  hoverStyles,
  onClick,
}: Props) => {
  return (
    <li data-testid={dataTestId} onClick={onClick}>
      <Link href={href}>
        <p
          className={`border-b border-b-transparent  text-xl font-semibold ${hoverStyles} ${styles}`}
        >
          {text}
        </p>
      </Link>
    </li>
  )
}

export default NavBarListItem
