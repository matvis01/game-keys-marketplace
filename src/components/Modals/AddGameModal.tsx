import React, { useState, useCallback, useRef } from "react"
import axios from "axios"
import { ToastContainer } from "react-toastify"
import { Form, Formik } from "formik"

import Stars from "../GamePage/Stars"
import { GameType } from "@/types/gameType"
import { toastifySuccess, toastifyError } from "@/utils/alertToast"
import { gameListingSchema } from "@/utils/validators"
import CustomInput from "./CustomInput"
import useContractFunctions from "@/hooks/useContractFunctions"

type GameInfoType = {
  id: number
  name: string
  image: string
  genres: string[]
  tags: string[]
  rating: number
  released: string
  developer: string
}

const NewGameModal = () => {
  const { addListing } = useContractFunctions()

  const [gameData, setGameData] = useState<GameInfoType | null>(null)
  const [isSelectedGame, setIsSelectedGame] = useState(false)
  const [isListingGame, setIsListingGame] = useState(false)
  const [options, setOptions] = useState<string[]>([])

  const formikRef = useRef<any>(null)

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
      } catch (error) {
        console.error(error)
      }
    }, 750),
    [],
  )

  const handleGetGames = (input: string) => {
    setIsSelectedGame(false)
    debouncedGetGames(input)
  }

  const filterGames = (options: string[], input: string) => {
    return options.filter((option) =>
      option.toLowerCase().includes(input.toLowerCase()),
    )
  }

  const closeModal = () => {
    if (document)
      (document.getElementById("new_game_modal") as HTMLFormElement).close()
    setOptions([])
    setIsListingGame(false)
    setIsSelectedGame(false)
    setGameData(null)
    formikRef.current?.resetForm()
  }

  async function handleAddListing(
    gameData: any,
    gamePrice: string,
    gameKey: string,
  ) {
    const receipt = await addListing(gameData, gameKey, gamePrice)
    return receipt
  }

  async function getGameData(gameName: string) {
    try {
      const res = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_KEY}&search=${gameName}`,
      )
      const game = res.data.results[0] as GameType
      let developer: string = ""
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${game.id}?key=${process.env.NEXT_PUBLIC_RAWG_KEY}`,
        )
        const { data } = response as { data: GameType }
        developer = data.developers[0]?.name
      } catch (error) {
        console.error("Error fetching game data:", error)
      }

      let tags = game.tags.filter((tag: any) => tag.language === "eng")
      const tagNames = tags.map((tag: any) => tag.name)
      let genres = game.genres.map((genre: any) => genre.name)

      const returnGame: GameInfoType = {
        id: game.id,
        name: game.name,
        image: game.background_image,
        genres: genres,
        tags: tagNames,
        rating: game.rating,
        released: game.released,
        developer: developer,
      }
      return returnGame
    } catch (error) {
      console.error("Error fetching game data:", error)
    }
  }

  interface FormValues {
    gameName: string
    gamePrice: string
    gameKey: string
  }

  const onSubmit = (values: FormValues) => {
    async function addListing() {
      setIsListingGame(true)
      try {
        const receipt = await handleAddListing(
          gameData,
          values.gamePrice,
          values.gameKey,
        )
        if (receipt?.status === "success") {
          closeModal()
          toastifySuccess("Your game has been listed!", 3000)
        }
      } catch (e) {
        closeModal()
        toastifyError("Something went wrong, please try again later", 3000)
      }
    }
    addListing()
  }

  return (
    <>
      <dialog
        id="new_game_modal"
        className="modal"
        data-testid="add-game-modal"
      >
        <div
          className={`modal-box w-9/12 max-w-5xl md:w-6/12 ${
            gameData ? "lg:w-6/12" : "lg:w-3/12"
          }`}
        >
          <h3 className="border-b-2 border-primary pb-2 text-center text-2xl font-bold">
            Add your game
          </h3>

          <Formik
            innerRef={formikRef}
            initialValues={{ gameName: "", gamePrice: "", gameKey: "" }}
            onSubmit={onSubmit}
            validationSchema={gameListingSchema}
          >
            {(props) => (
              <Form className="form-control" autoComplete="off">
                <div className="flex h-fit flex-col items-center justify-center gap-4 lg:my-4 lg:flex-row">
                  <div
                    className={`flex w-full flex-col ${
                      gameData ? "lg:w-1/2" : "lg:w-full"
                    } `}
                  >
                    <div className="relative">
                      <CustomInput
                        label="Game Name"
                        name="gameName"
                        type="text"
                        placeholder="Enter Game Name"
                        customFunction={() =>
                          handleGetGames(props.values.gameName)
                        }
                      />
                      {props.values.gameName &&
                        filterGames(options, props.values.gameName).length >
                          0 &&
                        !isSelectedGame && (
                          <div className="custom-scrollbar absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border-2 border-primary bg-base-100 shadow-lg">
                            {filterGames(options, props.values.gameName).map(
                              (option, index) => (
                                <div
                                  key={index}
                                  className="cursor-pointer rounded-lg px-4 py-2 hover:bg-neutral"
                                  onClick={() => {
                                    props.setFieldValue("gameName", option)
                                    getGameData(option).then((res) => {
                                      if (res) {
                                        setGameData(res)
                                      }
                                    })
                                    setIsSelectedGame(true)
                                  }}
                                >
                                  {option}
                                </div>
                              ),
                            )}
                          </div>
                        )}
                    </div>
                    <CustomInput
                      label="Game Price"
                      name="gamePrice"
                      type="text"
                      placeholder="Enter Game Price"
                    />
                    <p className="mt-1 flex gap-1">
                      <img
                        src="icons/info-icon.svg"
                        alt="info icon"
                        className="h-4 w-4"
                      />
                      <span className="text-xs font-extralight">
                        The platform takes 1% fee from the listing price
                      </span>
                    </p>
                    <CustomInput
                      label="Game Key"
                      name="gameKey"
                      type="text"
                      placeholder="Enter Game Key"
                    />
                  </div>
                  {gameData && (
                    <div className="flex w-full flex-col items-center justify-center lg:w-1/2">
                      <div>
                        <>
                          <img
                            src={gameData.image}
                            alt={gameData.name}
                            className="mx-auto w-11/12 rounded-lg object-cover"
                          />
                          <h2 className="my-2 line-clamp-1 text-lg font-semibold md:text-xl">
                            {gameData.name}
                          </h2>
                          <div>
                            <p className="line-clamp-1 text-sm md:text-lg">
                              Developer: {gameData.developer}
                            </p>
                            <p className="mb-2 text-sm md:text-lg">
                              Release date: {gameData.released}
                            </p>
                            <div className="flex gap-2">
                              <p className="text-sm md:text-lg">Rating:</p>
                              <Stars
                                rating={gameData.rating}
                                className="rating-sm md:rating-md"
                              />
                              <p className="text-sm md:text-lg">
                                {gameData.rating}/5.0
                              </p>
                            </div>
                          </div>
                        </>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  className="btn btn-primary mt-6 w-full"
                  type="submit"
                  disabled={!props.isValid || isListingGame || !isSelectedGame}
                >
                  {isListingGame ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Add game"
                  )}
                </button>
              </Form>
            )}
          </Formik>
          <button
            data-testid="close-modal-btn"
            className="btn btn-ghost btn-sm absolute right-2 top-2"
            type="button"
            onClick={() => {
              closeModal()
            }}
          >
            ✕
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button
            onClick={() => {
              closeModal()
            }}
          >
            close
          </button>
        </form>
      </dialog>
      <ToastContainer />
    </>
  )
}

export default NewGameModal
