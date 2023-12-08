import React from "react"

interface OptionButtonProps {
  dispatchFunction: () => void
  dispatchState: boolean
  text: string
}

const OptionButton = ({
  dispatchFunction,
  dispatchState,
  text,
}: OptionButtonProps) => {
  return (
    <button
      onClick={() => dispatchFunction()}
      className={`h-8 w-fit px-3 sm:h-10 ${
        dispatchState ? "border-none bg-primary" : "bg-base-100"
      } rounded-md border border-primary text-sm text-white transition-colors duration-300 sm:text-lg`}
    >
      {text}
    </button>
  )
}

export default OptionButton
