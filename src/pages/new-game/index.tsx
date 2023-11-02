import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useAccount } from "wagmi"

const NewGamePage = () => {
  const router = useRouter()
  const { status } = useAccount()

  const [gameNameInput, setGameName] = useState("")
  const [showGameOptions, setShowGameOptions] = useState(false)

  useEffect(() => {
    if (status === "disconnected") router.push("/")
  }, [status])

  const options = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Fig",
    "Apple",
    "Apple",
    "Apple",
    "Apple",
    "Apple",
    "Apple",
    "Apple",
    "Apple",
    "Apple",
    "Apple",
  ]

  const filteredGames = options.filter((option) =>
    option.toLowerCase().includes(gameNameInput.toLowerCase()),
  )

  const handleGameNameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setGameName(e.target.value)
    setShowGameOptions(true)
  }

  const handleGameNameSelect = (option: string) => {
    setGameName(option)
    setShowGameOptions(false)
  }

  return (
    <div className="h-96 bg-neutral py-4">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-8">
        <div className="block w-full  border-b-2 border-primary">
          <h1 className="mb-2 text-center text-3xl">Add new game</h1>
        </div>
        <form className="form-control">
          <div className="">
            <label className="label">
              <span className="label-text">Game name</span>
            </label>
            <input
              type="text"
              placeholder="Search game..."
              value={gameNameInput}
              onChange={handleGameNameInputChange}
              className="input input-bordered input-sm max-w-xs"
            />
            {gameNameInput && filteredGames.length > 0 && showGameOptions && (
              <div className="custom-scrollbar z-10 mt-2 max-h-60 max-w-xs overflow-y-auto rounded-lg border-2 border-primary bg-base-100 shadow-lg">
                {filteredGames.map((option, index) => (
                  <div
                    key={index}
                    className="cursor-pointer rounded-lg px-4 py-2 hover:bg-neutral"
                    onClick={() => handleGameNameSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewGamePage