import React from "react"
import { createPortal } from "react-dom"

import { disconnect } from "wagmi/actions"
import NewGameModal from "../Modals/AddGameModal"
import Link from "next/link"

const ProfileMenu = () => {
  return (
    <>
      <li>
        <div className="dropdown dropdown-end dropdown-bottom dropdown-hover ">
          <label tabIndex={0} className="btn btn-ghost">
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
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-box menu-sm z-[1] w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <p
                onClick={() => {
                  if (document)
                    (
                      document.getElementById(
                        "new_game_modal",
                      ) as HTMLFormElement
                    ).showModal()
                }}
              >
                Add your product
              </p>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={disconnect}>Logout</button>
            </li>
          </ul>
        </div>
      </li>
      {createPortal(
        <NewGameModal />,
        document.getElementById("modals") as HTMLElement,
      )}
    </>
  )
}

export default ProfileMenu
