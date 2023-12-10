import React from "react"
import { CurrencyContext } from "@/contexts/currencyContext"

const currencies = ["USD", "EUR", "PLN", "GBP", "JPY", "CAD", "AUD"]

interface CurrencySelectorProps {
  extraSmall?: boolean
}

function CurrencySelector({ extraSmall }: CurrencySelectorProps = {}) {
  const { currency, ChangeCurrency } = React.useContext(CurrencyContext)

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const curr = event.target.value
    ChangeCurrency(curr)
  }

  return (
    <select
      data-testid="currency-selector-component"
      value={currency}
      onChange={handleCurrencyChange}
      className={`select ${
        extraSmall ? "select-xs" : "select-s"
      } w-fit max-w-xs bg-transparent hover:bg-base-100`}
    >
      {currencies.map((currency) => (
        <option
          data-testid="currency-option"
          key={currency}
          value={currency}
          className="bg-base-100"
        >
          {currency}
        </option>
      ))}
    </select>
  )
}

export default CurrencySelector
