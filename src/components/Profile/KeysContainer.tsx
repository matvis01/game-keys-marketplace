import React, { useEffect, useState } from "react"
import useContractFunctions from "../../hooks/useContractFunctions"
import GameKey from "../../components/Profile/GameKey"
import { decrypt } from "n-krypta"
type gameBought = {
  gameId: number
  key: string
}

const secretKey = process.env.NEXT_PUBLIC_ENCRYPT_KEY || ""

const KeysContainer = () => {
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
    <div className="custom-scrollbar h-full overflow-y-auto">
      {games?.map((game: any, i: number) => <GameKey key={i} game={game} />)}
    </div>
  )
}

export default KeysContainer
