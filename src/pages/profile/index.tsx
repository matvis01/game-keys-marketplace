import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { useRouter } from "next/router"
import useContractFunctions from "../../hooks/useContractFunctions"
import GameKey from "../../components/Profile/GameKey"
import { decrypt } from "n-krypta"
import Balance from "@/components/Profile/Balance"

type gameBought = {
  gameId: number
  key: string
}

const secretKey = process.env.NEXT_PUBLIC_ENCRYPT_KEY || ""

function Profile() {
  const { status } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (status !== "connected") {
      router.replace("/")
    }
  }, [status])

  const { getMyGames } = useContractFunctions()
  const [games, setGames] = useState<gameBought[]>()
  useEffect(() => {
    getMyGames()
      .then((data: any) => {
        data = data.map((game: gameBought) => ({
          ...game,
          gameId: Number(game.gameId),
          key: decrypt(game.key, secretKey),
        }))
        data = data.reverse()
        setGames(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div className="flex justify-center">
      <div className="w-3/4 lg:w-1/2">
        <Balance />
        <div className="overflow-y-auto">
          <h2 className="mb-4 text-gray-300">My Games</h2>
          {games?.map((game: any, i: number) => (
            <GameKey key={i} game={game} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
