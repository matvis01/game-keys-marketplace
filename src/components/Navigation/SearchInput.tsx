import React, { useState, useRef, useEffect } from "react"
import { Image } from "next/dist/client/image-component"
import { useQuery } from "@apollo/client"
import { GET_ALL_NAMES_AND_IDS } from "@/utils/graphQueries"

type OptionType = {
  gameId: number
  gameName: string
}

const SearchInput: React.FC = () => {
  const [inputValue, setInputValue] = useState("")
  const [filteredOptions, setFilteredOptions] = useState<OptionType[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const { data } = useQuery(GET_ALL_NAMES_AND_IDS)

  const options = data?.listingsByGames as OptionType[]

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase()
    setInputValue(searchTerm)

    if (!searchTerm) {
      setFilteredOptions([])
      return
    }

    const filteredOptions = options.filter(({ gameName }) => {
      return gameName.toLowerCase().includes(searchTerm)
    })

    setFilteredOptions(filteredOptions)
  }

  const handleOptionSelect = (option: OptionType) => {
    setInputValue(option.gameName)
    setFilteredOptions([])
    window.location.href = `game/${option.gameId}`
    inputRef.current?.blur()
  }

  useEffect(() => {
    if (!inputValue) return
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setFilteredOptions([])
      }
    }
    document.addEventListener("click", handleOutsideClick)
    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [inputValue])

  return (
    <div className="relative ">
      <div className="absolute flex h-full items-center ">
        <Image
          className="ml-3 h-5 w-5  "
          src="/icons/search-icon.svg"
          alt="search icon"
          width={20}
          height={20}
        />
      </div>
      <input
        className="input input-bordered input-sm w-full max-w-xs bg-neutral pl-10"
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={handleInputChange}
        ref={inputRef}
      />

      {filteredOptions.length > 0 && (
        <ul className="custom-scrollbar absolute  z-10 mt-2 max-h-60 max-w-xs overflow-y-auto rounded-lg border-2 border-primary bg-base-100 shadow-lg">
          {filteredOptions.map((option) => (
            <li
              key={option.gameId}
              onClick={() => handleOptionSelect(option)}
              className=" cursor-pointer select-none rounded-lg px-4 py-2 hover:bg-neutral"
            >
              {option.gameName}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchInput
