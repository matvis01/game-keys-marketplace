import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useAccount } from "wagmi"
import { ethers } from "ethers"
import { writeContract, waitForTransaction } from "@wagmi/core"
import contractAbi from "../../constants/abi.json"
import networkMapping from "../../constants/networkMapping.json"
import axios from "axios"

const contractAddress = networkMapping[11155111]["GameKeyMarketplace"][0]

const AddNewGame = () => {
  const router = useRouter()
  const { status, address } = useAccount()

  const [gameNameInput, setGameName] = useState("")
  const [priceInput, setPriceInput] = useState("")
  const [gameKeyInput, setGameKeyInput] = useState("")
  const [showGameOptions, setShowGameOptions] = useState(false)
  const [options, setOptions] = useState<string[]>([])
  const [gameId, setGameId] = useState<number | undefined>()

  useEffect(() => {
    if (status === "disconnected") router.push("/")
  }, [status])

  useEffect(() => {
    async function getGames() {
      try {
        const data = await axios.get(
          `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_KEY}&search=${gameNameInput}`,
        )
        const games = data.data.results.map((game: any) => game.name)
        setOptions(games)
      } catch (e) {
        console.log(e)
      }
    }
    getGames()
  }, [gameNameInput])

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

  const handleGamePriceInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPriceInput(e.target.value)
  }

  const handleGameKeyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameKeyInput(e.target.value)
  }

  async function handleAddListing() {
    try {
      const { hash } = await writeContract({
        address: `0x${contractAddress.slice(2, contractAddress.length)}`,
        abi: contractAbi,
        functionName: "listGameKey",
        account: address,
        args: [gameKeyInput, gameId, ethers.parseEther(priceInput)],
      })
      const receipt = await waitForTransaction({ hash })
    } catch (e) {
      console.log(e)
    }
  }

  async function getGameId() {
    try {
      const data = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_KEY}&search=${gameNameInput}`,
      )
      const id = data.data.results[0].id
      setGameId(id)
    } catch (e) {
      console.log(e)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(gameNameInput, priceInput, gameKeyInput)
    async function addListing() {
      try {
        await getGameId()
        await handleAddListing()
        console.log("gameId", gameId)
      } catch (e) {
        console.log(e)
      }
    }
    addListing()
  }

  return (
    <div className="h-96 bg-neutral py-4">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-8">
        <div className="block w-full  border-b-2 border-primary">
          <h1 className="mb-2 text-center text-3xl">Add new game</h1>
        </div>
        <form className="form-control" onSubmit={handleSubmit}>
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
            <label className="label">
              <span className="label-text">Game Price</span>
            </label>
            <input
              type="number"
              placeholder="Add price..."
              value={priceInput}
              onChange={handleGamePriceInputChange}
              className="input input-bordered input-sm max-w-xs"
            />
            <label className="label">
              <span className="label-text">Game Key</span>
            </label>
            <input
              type="text"
              placeholder="Add game key..."
              value={gameKeyInput}
              onChange={handleGameKeyInputChange}
              className="input input-bordered input-sm max-w-xs"
            />
          </div>
          <button className="btn btn-primary btn-sm">Add game</button>
        </form>
      </div>
    </div>
  )
}

export default AddNewGame
