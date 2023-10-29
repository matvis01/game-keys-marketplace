import React from "react"
import Link from "next/link"

interface Props {
  styles?: string
  text: string
  href: string
}

const navBarListItem = ({ styles, text, href }: Props) => {
  return (
    <li>
      <Link href={href}>
        <p
          className={`text-xl font-semibold p-2 border border-transparent hover:border hover:border-primary hover:rounded-lg ${styles}`}
        >
          {text}
        </p>
      </Link>
    </li>
  )
}

export default navBarListItem
