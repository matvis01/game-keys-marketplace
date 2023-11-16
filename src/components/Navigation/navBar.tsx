import React from "react"
import Link from "next/link"
import { Image } from "next/dist/client/image-component"
import { useRouter } from "next/router"
import { useAccount } from "wagmi"

import ConnectBtn from "../ConnectBtn"
import NavBarListItem from "./NavBarListItem"
import SearchInput from "./SearchInput"
import ProfileMenu from "./ProfileMenu"
import CartMenu from "./CartMenu"

const NavBar = () => {
  const router = useRouter()
  const { status } = useAccount()
  const { pathname } = router
  const isHome = pathname === "/"
  const isCategories = pathname.includes("/categories")

  return (
    <div className="blur-backdrop-filter sticky top-0 z-10 h-12 w-full bg-base-100 bg-opacity-80 bg-clip-padding py-4">
      <nav className="mx-auto flex w-full max-w-screen-xl items-center justify-between text-white">
        <div className="flex items-center gap-8">
          <div className="w-fit">
            <Link href="/">
              <Image
                src="/icons/logo_light.svg"
                alt="logo"
                width={125}
                height={125}
              />
            </Link>
          </div>
          <div className="relative flex items-center ">
            <Image
              className="absolute ml-3 h-5 w-5"
              src="/icons/search-icon.svg"
              alt="search icon"
              width={20}
              height={20}
            />

            <SearchInput />
          </div>
        </div>
        <div>
          <ul className="flex items-center justify-between space-x-6">
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
            <CartMenu />
            {status === "connected" && <ProfileMenu />}
            {status !== "connected" && (
              <li>
                <ConnectBtn />
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
