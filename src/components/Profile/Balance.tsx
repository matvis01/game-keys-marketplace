import React from "react"
import useContractFunctions from "@/hooks/useContractFunctions"

const Balance = () => {
  const { balance, handleWithdraw } = useContractFunctions()

  return (
    <div className="mb-8 rounded-lg bg-neutral p-6 shadow-lg">
      <h2 className="mb-4 text-gray-300">Balance</h2>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-100">{balance} eth</h3>
        <button className="btn btn-primary text-white" onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>
    </div>
  )
}

export default Balance
