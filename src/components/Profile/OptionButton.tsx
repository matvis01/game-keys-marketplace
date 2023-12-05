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
      className={`h-10 w-20 ${
        dispatchState ? "border-none bg-primary" : "bg-base-100"
      } rounded-md border border-primary text-white transition-colors duration-300`}
    >
      {text}
    </button>
  )
}

export default OptionButton
