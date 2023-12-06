import React from "react"
import { useRouter } from "next/dist/client/router"
import { Image } from "next/dist/client/image-component"
import { useAccount } from "wagmi"
import { disconnect } from "wagmi/actions"

import ConnectBtn from "../ConnectBtn"
import SearchInput from "./SearchInput"
import CurrencySelector from "./CurrencySelector"
import NavBarListItem from "./NavBarListItem"
import Link from "next/link"

const BorgirMenu = () => {
  const router = useRouter()
  const { status } = useAccount()
  const { pathname } = router

  const closeDrawer = () => {
    document.getElementById("sidebar-drawer")?.click()
  }

  const isHome = pathname === "/"
  const isCategories = pathname.includes("/categories")
  const isProfile = pathname.includes("/profile")

  return (
    <div className="drawer lg:hidden">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex">
        <label htmlFor="sidebar-drawer" className="btn btn-ghost btn-sm ml-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        <div className="relative mx-auto flex items-center gap-2">
          <Image
            className="absolute ml-3 h-5 w-5"
            src="/icons/search-icon.svg"
            alt="search icon"
            width={20}
            height={20}
          />
          <SearchInput />
          <CurrencySelector extraSmall />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="sidebar-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
          <div className="mx-auto mb-2 w-fit">
            <Link href="/" data-testid="logo-nav-link" onClick={closeDrawer}>
              <Image
                src="/icons/logo_light.svg"
                alt="logo"
                width={150}
                height={125}
              />
            </Link>
          </div>
          <NavBarListItem
            dataTestId="home-nav-link-mobile"
            text="Home"
            href="/"
            styles={`${isHome && "text-primary"}`}
            onClick={closeDrawer}
          />
          <NavBarListItem
            dataTestId="categories-nav-link-mobile"
            text="Categories"
            href="/categories"
            styles={`${isCategories && "text-primary"}`}
            onClick={closeDrawer}
          />
          {status === "connected" && (
            <>
              <NavBarListItem
                dataTestId="profile-nav-link-mobile"
                text="Profile"
                href="/profile"
                styles={`${isProfile && "text-primary"}`}
                onClick={closeDrawer}
              />
              <li>
                <p
                  className="text-xl font-semibold"
                  onClick={() => {
                    if (document)
                      (
                        document.getElementById(
                          "new_game_modal",
                        ) as HTMLFormElement
                      ).showModal()
                    closeDrawer()
                  }}
                >
                  Add your product
                </p>
              </li>
              <li>
                <p className="text-xl font-semibold" onClick={disconnect}>
                  Disconnect
                </p>
              </li>
            </>
          )}
          {status !== "connected" && (
            <li data-testid="w3m-connect-button" onClick={closeDrawer}>
              <ConnectBtn />
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default BorgirMenu
