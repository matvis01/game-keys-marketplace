import React from "react"

import SocialIcons from "./SocialIcons"

const ICONS = [
  { name: "Facebook", alt: "facebook icon", href: "https://facebook.com" },
  { name: "Twitter", alt: "twitter icon", href: "https://twitter.com" },
  { name: "Instagram", alt: "instagram icon", href: "https://instagram.com" },
  { name: "Linkedin", alt: "linkedin icon", href: "https://linkedin.com" },
  {
    name: "Github",
    alt: "github icon",
    href: "https://github.com/matvis01/game-keys-marketplace",
  },
]

const Footer = () => {
  return (
    <footer className="mt-auto bg-neutral text-white">
      <div className="mx-auto max-w-screen-xl">
        <div className="px-4 pb-2 pt-5 sm:px-12 md:flex md:items-center md:justify-between">
          <h1
            className="mb-6 text-center text-3xl font-semibold md:mb-0 md:w-2/5
         lg:text-4xl lg:leading-normal"
          >
            <span className="text-primary">Get</span> updates, sign up now!
          </h1>
          <div className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Enter your email"
              className="input input-bordered input-md sm:mr-5 sm:w-72 lg:mb-0"
            />
            <button className="btn btn-primary btn-md w-32 text-white">
              Sign up
            </button>
          </div>
        </div>
        <div className="divider divider-primary" />
        <div
          className="grid grid-cols-1 gap-10 pb-5 pt-2
        text-center text-sm text-gray-400 sm:grid-cols-2 lg:grid-cols-3"
        >
          <span>Copyright © 2023 gameBit. All rights reserved.</span>
          <span>Terms · Privacy Policy</span>
          <SocialIcons icons={ICONS} />
        </div>
      </div>
    </footer>
  )
}

export default Footer
