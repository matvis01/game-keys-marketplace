import React from "react"
import { Image } from "next/dist/client/image-component"
import { useRouter } from "next/router"
import Link from "next/dist/client/link"
import ConnectBtn from "../ConnectBtn"

import navBarListItem from "./navBarListItem"

const NavBar = () => {
  const router = useRouter()
  const { pathname } = router
  const isHome = pathname === "/"
  const isCategories = pathname === "/categories"
  const isCart = pathname === "/cart"

  return (
    <div className="sticky z-10 h-fit w-full bg-base-100 border border-white px-4 py-2 top-0 bg-opacity-80 bg-clip-padding blur-backdrop-filter">
      <nav className="flex items-center justify-between w-full max-w-screen-xl px-5 mx-auto text-white">
        <div className="flex items-center gap-8">
          <div className="w-fit">
            <Image
              src="/icons/logo_light.svg"
              alt="logo"
              width={125}
              height={125}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="input input-sm input-bordered rounded-lg w-full max-w-xs bg-neutral"
            />
          </div>
        </div>
        <div>
          <ul className="flex items-center justify-between space-x-8">
            <li>
              <Link href="/">
                <p
                  className={`text-xl font-semibold p-2 border border-transparent hover:border hover:border-primary hover:rounded-lg ${
                    isHome && "text-primary"
                  }`}
                >
                  Home
                </p>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <p className="text-xl font-semibold">Categories</p>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <p className="text-xl font-semibold">Cart</p>
              </Link>
            </li>
            <li>
              <ConnectBtn />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
