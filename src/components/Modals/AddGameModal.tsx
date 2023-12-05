import React, { useState, useCallback, useRef } from "react"
import axios from "axios"
import { ToastContainer } from "react-toastify"
import { Form, Formik, FormikHelpers } from "formik"

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
      }
      return returnGame
    } catch (e) {
      console.log(e)
    }
  }

  interface FormValues {
    gameName: string
    gamePrice: string
    gameKey: string
  }

  const onSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    console.log(values)
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
          resetForm()
          toastifySuccess("Your game has been listed!", 3000)
        }
      } catch (e) {
        closeModal()
        resetForm()
        toastifyError("Something went wrong, please try again later", 3000)
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
          <Formik
            innerRef={formikRef}
            initialValues={{ gameName: "", gamePrice: "", gameKey: "" }}
            onSubmit={onSubmit}
            validationSchema={gameListingSchema}
          >
            {(props) => (
              <Form className="form-control" autoComplete="off">
                <div>
                  <CustomInput
                    label="Game Name"
                    name="gameName"
                    type="text"
                    placeholder="Enter Game Name"
                    customFunction={() => handleGetGames(props.values.gameName)}
                  />
                  {props.values.gameName &&
                    filterGames(options, props.values.gameName).length > 0 &&
                    !isSelectedGame && (
                      <div className="custom-scrollbar absolute z-10 mt-2 max-h-60 max-w-xs overflow-y-auto rounded-lg border-2 border-primary bg-base-100 shadow-lg">
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
                  <CustomInput
                    label="Game Price"
                    name="gamePrice"
                    type="text"
                    placeholder="Enter Game Price"
                  />
                  <CustomInput
                    label="Game Key"
                    name="gameKey"
                    type="text"
                    placeholder="Enter Game Key"
                  />
                </div>
                <button
                  className="btn btn-primary mt-6 w-full"
                  type="submit"
                  disabled={!props.isValid || isListingGame || !isSelectedGame}
                >
                  Add game
                </button>
              </Form>
            )}
          </Formik>
          <button
            className="btn btn-ghost btn-sm absolute right-2 top-2"
            type="button"
            onClick={() => {
              formikRef.current?.resetForm()
              closeModal()
            }}
          >
            ✕
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button
            onClick={() => {
              formikRef.current?.resetForm()
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
