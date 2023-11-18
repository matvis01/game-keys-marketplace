import { useState } from "react"

type Props = {
  game: {
    gameId: number
    key: string
  }
}

function GameKey({ game }: Props) {
  const [show, setShow] = useState(false)
  const { gameId, key } = game
  return (
    <div className="mb-4 rounded-lg bg-neutral p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-200">{gameId}</h3>
        <div className="flex items-center">
          <p className="mr-2 text-sm text-gray-300">
            {show
              ? key
              : key
                  .split("")
                  .map((char) => "*")
                  .join("")}
          </p>
          <button className="ghost" onClick={() => setShow(!show)}>
            <svg
              className=" text-gray-300"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameKey
