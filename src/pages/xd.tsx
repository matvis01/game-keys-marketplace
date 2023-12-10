import React from "react"
import axios from "axios"
import { GameType } from "../types/gameType"

import useContractFunctions from "../hooks/useContractFunctions"

const gameNames = [
  "Rainbow Six Siege",
  "Call of Duty: Warzone",
  "World of Warcraft",
  "Minecraft",
  "Grand Theft Auto V",
  "Escape from Tarkov",
  "FIFA 21",
  "Rust",
  "Dead by Daylight",
  "World of Tanks",
  "Path of Exile",
  "Destiny 2",
  "Sea of Thieves",
  "NBA 2K21",
  "Forza Horizon 4",
  "Red Dead Redemption 2",
  "Smite",
  "Madden NFL 21",
  "Arma 3",
  "For Honor",
  "Brawlhalla",
  "Terraria",
  "RuneScape",
  "DayZ",
  "Black Desert Online",
  "The Elder Scrolls Online",
  "Warframe",
  "Diablo III",
  "Star Wars: The Old Republic",
  "Fall Guys",
  "Garry's Mod",
  "The Sims 4",
  "Monster Hunter: World",
  "The Forest",
  "Heroes of the Storm",
  "Neverwinter",
  "Phasmophobia",
  "Deadside",
  "War Thunder",
  "Black Ops Cold War",
  "Mordhau",
  "RimWorld",
  "Farming Simulator 19",
  "7 Days to Die",
  "Squad",
  "Euro Truck Simulator 2",
  "Football Manager 2021",
  "Stardew Valley",
  "Sid Meier's Civilization VI",
  "Satisfactory",
  "Factorio",
  "Stellaris",
  "Hearts of Iron IV",
  "Crusader Kings III",
  "Cities: Skylines",
  "The Witcher 3: Wild Hunt",
  "Europa Universalis IV",
  "The Elder Scrolls V: Skyrim",
  "Total War: Warhammer II",
  "Subnautica",
  "Terraria",
  "RimWorld",
  "Fallout 4",
  "Stardew Valley",
  "The Witcher 3: Wild Hunt",
  "Grand Theft Auto V",
  "The Elder Scrolls V: Skyrim",
  "Total War: Warhammer II",
  "Terraria",
]

async function getGameData(gameName: string) {
  try {
    const res = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_KEY}&search=${gameName}`,
    )
    const game = res.data.results[0] as GameType

    let tags = game.tags.filter((tag: any) => tag.language === "eng")
    let tagNames = tags.map((tag: any) => tag.name)
    let genres = game.genres.map((genre: any) => genre.name)

    let ret: gameDataType = {
      id: game.id,
      name: game.name,
      image: game.background_image,
      genres: genres,
      tags: tagNames,
      rating: game.rating,
    }

    return ret
  } catch (e) {
    console.log(e)
  }
}

type gameDataType = {
  id: number
  name: string
  image: string
  rating: number
  tags: string[]
  genres: string[]
}

const generateRandomKey = () => {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let result = ""
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const generateRandomPrice = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

function xd() {
  const { addListing } = useContractFunctions()
  function listAllGames() {
    gameNames.forEach(async (gameName) => {
      try {
        const gameData = await getGameData(gameName)
        if (!gameData) return
        const receipt = await addListing(
          gameData,
          generateRandomKey(),
          generateRandomPrice(0.00001, 0.01).toString().slice(0, 9),
        )
      } catch (e) {
        console.log(e)
      }
    })
  }
  const handleClick = () => {
    listAllGames()
  }
  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}

export default xd
