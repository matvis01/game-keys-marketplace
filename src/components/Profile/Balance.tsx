import React from "react"
import useContractFunctions from "@/hooks/useContractFunctions"

const Balance = () => {
  const { balance, handleWithdraw } = useContractFunctions()

  return (
    <div className="mb-8 rounded-lg bg-neutral p-6 shadow-lg">
      <div className="flex flex-col items-end justify-between sm:flex-row">
        <div className="flex w-full flex-col gap-1">
          <h2 className="text-md items-start justify-start text-gray-300 sm:mb-2 sm:text-lg">
            Balance
          </h2>
          <h3 className="text-md mb-2 font-bold text-gray-100 sm:text-2xl">
            {balance} eth
          </h3>
        </div>
        <button
          className="sm:text-md btn btn-primary btn-sm w-full  text-sm text-white sm:btn-md sm:w-1/5"
          onClick={handleWithdraw}
        >
          Withdraw
        </button>
      </div>
    </div>
  )
}

export default Balance
