import { useState, useEffect } from "react"
import axios from "axios"
import { GameType, Screenshot, Review } from "../types/gameType"

const useGameData = (gameId: number) => {
  const [gameData, setGameData] = useState<GameType | undefined>()
  const [screenshots, setScreenshots] = useState<Screenshot[]>([])
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${gameId}?key=${process.env.NEXT_PUBLIC_RAWG_KEY}`,
        )
        const { data } = response as { data: GameType }
        setGameData(data)
      } catch (error) {
        console.error("Error fetching game data:", error)
      }
    }

    const fetchScreenshots = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${gameId}/screenshots?key=${process.env.NEXT_PUBLIC_RAWG_KEY}`,
        )
        setScreenshots(response.data.results)
      } catch (error) {
        console.error("Error fetching screenshots:", error)
      }
    }

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${gameId}/reviews?key=${process.env.NEXT_PUBLIC_RAWG_KEY}`,
        )
        const { data } = response as { data: { results: Review[] } }
        const filteredReviews = data.results.filter(
          (review) => review.text !== "" && review.user && review.user.username,
        )
        setReviews(filteredReviews)
      } catch (error) {
        console.error("Error fetching reviews:", error)
      }
    }

    if (!gameId) return
    fetchGameData()
    fetchScreenshots()
    fetchReviews()
  }, [gameId])

  return { gameData, screenshots, reviews }
}

export default useGameData
