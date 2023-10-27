import React from "react"
import { Image } from "next/dist/client/image-component"
import Link from "next/dist/client/link"
import ConnectBtn from "../ConnectBtn"

const NavBar = () => {
  return (
    <div className="sticky z-10 h-fit w-full bg-base-100 p-2 border-2 border-white top-0 bg-opacity-80 bg-clip-padding blur-backdrop-filter">
      <nav className="flex items-center justify-between w-full max-w-screen-xl px-5 mx-auto text-white">
        <div className="w-fit">
          <Image
            src="/icons/logo_light.svg"
            alt="logo"
            width={125}
            height={125}
          />
        </div>
        <div>
          <ul className="flex items-center justify-between space-x-8">
            <li>
              <Link href="/">
                <p className="text-xl font-semibold">Home</p>
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
