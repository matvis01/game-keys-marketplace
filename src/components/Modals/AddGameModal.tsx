import React, { useState, useEffect, useCallback } from "react"
import { CSSTransition } from "react-transition-group"
import { useRouter } from "next/router"
import contractAbi from "../../constants/abi.json"
import networkMapping from "../../constants/networkMapping.json"
import axios from "axios"
import { GameType } from "@/types/gameType"
import useContractFunctions from "../../hooks/useContractFunctions"

const NewGameModal = () => {
  const router = useRouter()

  const [gameNameInput, setGameName] = useState("")
  const [priceInput, setPriceInput] = useState("")
  const [gameKeyInput, setGameKeyInput] = useState("")
  const [showGameOptions, setShowGameOptions] = useState(false)
  const [options, setOptions] = useState<string[]>([])
  const [successModal, setSuccessModal] = useState(false)
  const [errorModal, setErrorModal] = useState(false)

  const { addListing } = useContractFunctions()

  useEffect(() => {
    if (status === "disconnected") router.push("/")
  }, [status])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (successModal) {
      timer = setTimeout(() => {
        setSuccessModal(false)
      }, 10000)
    }
    return () => clearTimeout(timer)
  }, [successModal])

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(this, args), delay)
    }
  }
  const debouncedGetGames = useCallback(
    debounce(async (input: string) => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_KEY}&search=${input}`,
        )
        const games = response.data.results.map((game: any) => game.name)
        setOptions(games)
        setShowGameOptions(true)
      } catch (error) {
        console.error(error)
      }
    }, 750),
    [],
  )

  const filteredGames = options.filter((option) =>
    option.toLowerCase().includes(gameNameInput.toLowerCase()),
  )

  const handleGameNameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const input = e.target.value
    setGameName(input)
    debouncedGetGames(input)
  }

  const handleGameNameSelect = (option: string) => {
    setGameName(option)
    setShowGameOptions(false)
  }

  const handleGamePriceInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPriceInput(e.target.value)
  }

  const handleGameKeyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameKeyInput(e.target.value)
  }

  const closeModal = () => {
    if (document)
      (document.getElementById("new_game_modal") as HTMLFormElement).close()
  }

  async function handleAddListing(gameData: any) {
    try {
      const receipt = await addListing(gameData, gameKeyInput, priceInput)
      return receipt
    } catch (e) {
      console.log(e)
    }
  }

  async function getGameData() {
    try {
      const res = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_KEY}&search=${gameNameInput}`,
      )
      const game = res.data.results[0] as GameType

      return { id: game.id, name: game.name, image: game.background_image }
    } catch (e) {
      console.log(e)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(gameNameInput, priceInput, gameKeyInput)
    async function addListing() {
      try {
        const gameData = await getGameData()
        const receipt = await handleAddListing(gameData)
        if (receipt?.status === "success") {
          setGameName("")
          setPriceInput("")
          setGameKeyInput("")
          closeModal()
          setSuccessModal(true)
        }
      } catch (e) {
        console.log(e)
      }
    }
    addListing()
  }

  return (
    <>
      <dialog id="new_game_modal" className="modal">
        <div className="modal-box w-3/12 max-w-5xl">
          <h3 className="border-b-2 border-primary pb-2 text-center text-2xl font-bold">
            Add your game
          </h3>
          <form className="form-control" onSubmit={handleSubmit}>
            <div>
              <label className="label">
                <span className="label-text text-lg">Game name</span>
              </label>
              <input
                type="text"
                placeholder="Search game..."
                value={gameNameInput}
                onChange={handleGameNameInputChange}
                className="input input-bordered input-sm w-full"
              />
              {gameNameInput && filteredGames.length > 0 && showGameOptions && (
                <div className="custom-scrollbar absolute z-10 mt-2 max-h-60 max-w-xs overflow-y-auto rounded-lg border-2 border-primary bg-base-100 shadow-lg">
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
              <label className="label">
                <span className="label-text text-lg">Game Price</span>
              </label>
              <input
                type="text"
                placeholder="Add price..."
                value={priceInput}
                onChange={handleGamePriceInputChange}
                className="input input-bordered input-sm w-full"
              />
              <label className="label">
                <span className="label-text text-lg">Game Key</span>
              </label>
              <input
                type="text"
                placeholder="Add game key..."
                value={gameKeyInput}
                onChange={handleGameKeyInputChange}
                className="input input-bordered input-sm w-full"
              />
              <button className="btn btn-primary mt-6 w-full">Add game</button>
              <button
                className="btn btn-ghost btn-sm absolute right-2 top-2"
                type="button"
                onClick={() => closeModal()}
              >
                ✕
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <CSSTransition
        in={successModal}
        timeout={300}
        unmountOnExit
        classNames={{
          enter: "opacity-0",
          enterActive: "opacity-100 transition-opacity duration-300",
        }}
      >
        <div className="alert alert-success absolute bottom-4 right-4 z-20 w-80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your game has been listed!</span>
          <span
            className="hover:cursor-pointer"
            onClick={() => setSuccessModal(false)}
          >
            ✕
          </span>
        </div>
      </CSSTransition>
    </>
  )
}

export default NewGameModal
