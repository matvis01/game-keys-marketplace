import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "axios"
import { GameType } from "../../types/gameType"
import exampleGame from "../../constants/exampleGame.json"

export default function GamePage() {
  const router = useRouter()
  const [gameData, setGameData] = useState<GameType | undefined>()
  const { id } = router.query

  useEffect(() => {
    if (!id) return
    const fetchGameData = async () => {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_KEY}`
      )
      const { data } = response as { data: GameType }
      setGameData(data)
      console.log(data)
    }
    //fetchGameData()    // zeby nie zuzywac limitu requestow

    setGameData(exampleGame)
  }, [id])

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center px-5  lg:px-32">
      <div className="flex w-full gap-10 flex-col justify-center lg:flex-row">
        <img
          src={gameData?.background_image}
          alt=""
          className="object-cover h-100 w-full lg:w-1/3"
        />
        <div className="flex flex-col justify-around w-1/2 lg:w-1/3">
          <h1 className="text-2xl font-bold">{gameData?.name}</h1>
          <div className="flex flex-col">
            <p className="text-l">Platform: steam</p>
            <p className="text-l">Type: Key</p>
            <p className="text-l">Region: Global</p>
            <p className="text-l">
              {gameData?.description_raw.slice(0, 150)}...
            </p>
          </div>
        </div>
        <div className="card bg-neutral w-full lg:w-1/3">
          <div className="card-body flex flex-col items-center">
            <h2 className="card-title text-5xl">0.69 eth</h2>
            <p>= 69 usd</p>
            <p>items left: 3</p>
            <p>seller: 0x123...123</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
