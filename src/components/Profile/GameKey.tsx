import { useState } from "react"
import Image from "next/image"
import { useQuery } from "@apollo/client"

import { GET_NAME } from "@/utils/graphQueries"


type Props = {
  game: {
    gameId: number
    key: string
  }
}

function GameKey({ game }: Props) {
  const [show, setShow] = useState(false)
  const { gameId, key } = game
  const { data, loading, error } = useQuery(GET_NAME(gameId))
  const name = data?.itemsBoughtByGame?.gameName
  return (
    <>
      {loading && (
        <div className="flex h-96 items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {!loading && !error && name && (
        <div className="mb-1 mr-1 rounded-lg bg-neutral p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-200">
              {loading ? "Loading..." : name}
            </h3>
            <div className="flex items-center">
              <p className="mr-2 text-sm text-gray-300">
                {show
                  ? key
                  : key
                      .split("")
                      .map((char) => "*")
                      .join("")}
              </p>
              <label className="swap swap-rotate ">
                <input type="checkbox" onChange={() => setShow(!show)} />
                <div className="swap-off ">
                  <Image
                    src="/icons/eye.svg"
                    width={20}
                    height={20}
                    alt="eye"
                  />
                </div>
                <div className="swap-on">
                  <Image
                    src="/icons/eye-crossed.svg"
                    width={20}
                    height={20}
                    alt="eye-off"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GameKey
