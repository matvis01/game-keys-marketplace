import React, { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/router"
import { useAccount } from "wagmi"
import axios from "axios"
import { ToastContainer } from "react-toastify"
import { Form, Formik } from "formik"

import { GameType } from "@/types/gameType"
import { toastifySuccess, toastifyError } from "@/utils/alertToast"
import { gameListingSchema } from "@/utils/validators"
import CustomInput from "./CustomInput"

import useContractFunctions from "@/hooks/useContractFunctions"

const NewGameModal = () => {
  const router = useRouter()
  const { status, address } = useAccount()
  const { addListing } = useContractFunctions()

  const [isSelectedGame, setIsSelectedGame] = useState(false)
  const [isListingGame, setIsListingGame] = useState(false)
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    if (status === "disconnected") router.push("/")
  }, [status])

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
      tags = game.tags.map((tag: any) => tag.name)
      const genres = game.genres.map((genre: any) => genre.name)

      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        genres: genres,
        tags: tags,
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onSubmit = (values: any) => {
    console.log(values)

    async function addListing() {
      setIsListingGame(true)
      try {
        const gameData = await getGameData(values.gameName)
        const receipt = await handleAddListing(
          gameData,
          values.gamePrice,
          values.gameKey,
        )
        if (receipt?.status === "success") {
          closeModal()
          setIsListingGame(false)
          toastifySuccess("Your game has been listed!", 3000)
        }
      } catch (e) {
        console.log(e)
        setIsListingGame(false)
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
                  disabled={!props.isValid || isListingGame}
                >
                  Add game
                </button>
              </Form>
            )}
          </Formik>
          <button
            className="btn btn-ghost btn-sm absolute right-2 top-2"
            type="button"
            onClick={() => closeModal()}
          >
            ✕
          </button>
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
