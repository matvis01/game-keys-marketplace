import React, { useState } from "react"
import { useExchangePrice } from "@/hooks/useExchangePrice"

const currencies = ["USD", "EUR", "PLN", "GBP", "JPY", "CAD", "AUD"]

function CurrencySelector() {
  const { currency, ChangeCurrency } = useExchangePrice()

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const curr = event.target.value
    ChangeCurrency(curr)
  }

  return (
    <select
      value={currency}
      onChange={handleCurrencyChange}
      className="select-s select w-fit max-w-xs bg-transparent hover:bg-base-100"
    >
      {currencies.map((currency) => (
        <option key={currency} value={currency} className="bg-base-100">
          {currency}
        </option>
      ))}
    </select>
  )
}

export default CurrencySelector
