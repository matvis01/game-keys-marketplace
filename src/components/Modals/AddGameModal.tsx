import React, { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/router"
import { useAccount } from "wagmi"
import { ethers } from "ethers"
import { writeContract, waitForTransaction } from "@wagmi/core"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"

import { GameType } from "@/types/gameType"
import contractAbi from "../../constants/abi.json"
import networkMapping from "../../constants/networkMapping.json"
import "react-toastify/dist/ReactToastify.css"

const contractAddress = networkMapping[11155111]["GameKeyMarketplace"][0]

const NewGameModal = () => {
  const router = useRouter()
  const { status, address } = useAccount()

  const [gameNameInput, setGameName] = useState("")
  const [priceInput, setPriceInput] = useState("")
  const [gameKeyInput, setGameKeyInput] = useState("")
  const [showGameOptions, setShowGameOptions] = useState(false)
  const [options, setOptions] = useState<string[]>([])
  const [blockButton, setBlockButton] = useState(false)

  useEffect(() => {
    if (status === "disconnected") router.push("/")
  }, [status])

  const toastifySuccess = () => {
    toast.success("Your game has been listed!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    })
  }

  const toastifyError = () => {
    toast.error("Something went wrong, please try again!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    })
  }

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
      const { hash } = await writeContract({
        address: `0x${contractAddress.slice(2, contractAddress.length)}`,
        abi: contractAbi,
        functionName: "listGameKey",
        account: address,
        args: [
          [gameData.id, gameKeyInput, gameData.name, gameData.image],
          ethers.parseEther(priceInput),
        ],
      })
      const receipt = await waitForTransaction({ hash })
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
    setBlockButton(true)
    async function addListing() {
      try {
        const gameData = await getGameData()
        const receipt = await handleAddListing(gameData)
        if (receipt?.status === "success") {
          setGameName("")
          setPriceInput("")
          setGameKeyInput("")
          closeModal()
          setBlockButton(false)
          toastifySuccess()
        }
      } catch (e) {
        console.log(e)
        setBlockButton(false)
        toastifyError()
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
      <ToastContainer />
    </>
  )
}

export default NewGameModal
