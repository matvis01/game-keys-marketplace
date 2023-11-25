import { useEffect, useState } from "react"
import useContractFunctions from "../../hooks/useContractFunctions"
import GameKey from "../../components/Profile/GameKey"
import { decrypt } from "n-krypta"

type gameBought = {
  gameId: number
  key: string
}

const secretKey = process.env.NEXT_PUBLIC_ENCRYPT_KEY || ""

function Profile() {
  const { balance, handleWithdraw, getMyGames } = useContractFunctions()
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
        <div className="mb-8 rounded-lg bg-neutral p-6 shadow-lg">
          <h2 className="mb-4 text-gray-300">Balance</h2>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-100">{balance} eth</h3>
            <button className="btn btn-primary" onClick={handleWithdraw}>
              Withdraw
            </button>
          </div>
        </div>

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
