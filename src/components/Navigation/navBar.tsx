import React from "react"
import { Image } from "next/dist/client/image-component"
import { useRouter } from "next/router"
import { useAccount } from "wagmi"

import ConnectBtn from "../ConnectBtn"
import NavBarListItem from "./navBarListItem"

const NavBar = () => {
  const router = useRouter()
  const { status } = useAccount()
  const { pathname } = router
  const isHome = pathname === "/"
  const isCategories = pathname.includes("/categories")
  const isCart = pathname.includes("/cart")

  return (
    <div className="sticky z-10 h-fit w-full bg-base-100 py-4 top-0 bg-opacity-80 bg-clip-padding blur-backdrop-filter">
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
          <div className="relative flex items-center ">
            <Image
              className="w-5 h-5 absolute ml-3"
              src="/icons/search-icon.svg"
              alt="search icon"
              width={20}
              height={20}
            />
            <input
              type="text"
              placeholder="Search..."
              className="input input-sm input-bordered w-full max-w-xs bg-neutral pl-10"
            />
          </div>
        </div>
        <div>
          <ul className="flex items-center justify-between space-x-8">
            <NavBarListItem
              text="Home"
              href="/"
              styles={`${isHome && "text-primary"}`}
            />
            <NavBarListItem
              text="Categories"
              href="/categories"
              styles={`${isCategories && "text-primary"}`}
            />
            <NavBarListItem
              text="Cart"
              href="/cart"
              styles={`${isCart && "text-primary"}`}
            />
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
