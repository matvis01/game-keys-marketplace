import axios from "axios"
import { useState, useEffect, createContext, useContext } from "react"

type CurrencyContextType = {
  currency: string | undefined
  rate: number
  ChangeCurrency: (currency: string) => void
  getConvertedPrice: (amount: number) => number
}

const defaultContextState = {
  currency: undefined,
  rate: 0,
  ChangeCurrency: () => {},
  getConvertedPrice: () => 0,
}

export const CurrencyContext =
  createContext<CurrencyContextType>(defaultContextState)

export function CurrencyProvider({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const [currency, setCurrency] = useState<string | undefined>()
  const [rate, setRate] = useState<number>(0)

  useEffect(() => {
    const fromLocalStorage = localStorage.getItem("currency")
    if (fromLocalStorage) {
      setCurrency(fromLocalStorage)
    } else {
      localStorage.setItem("currency", "USD")
      setCurrency("USD")
    }

    const handleStorageChange = () => {
      setCurrency(localStorage.getItem("currency") || "USD")
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  useEffect(() => {
    getRate()
    async function getRate() {
      if (!currency) return
      try {
        const response = await axios.get(
          `https://api.coinbase.com/v2/exchange-rates?currency=ETH`,
        )
        const newRate = response.data.data.rates[currency]
        setRate(newRate)
      } catch (e) {
        console.log(e)
      }
    }
  }, [currency])

  const getConvertedPrice = (amount: number) => {
    const calculatedPrice = amount * parseFloat(rate.toString())
    const roundedPrice = parseFloat(calculatedPrice.toFixed(2)) // Round to 2 decimal places
    return roundedPrice
  }

  const ChangeCurrency = (currency: string) => {
    localStorage.setItem("currency", currency)
    setCurrency(currency)
    window.dispatchEvent(new Event("storage"))
  }

  const contextValue: CurrencyContextType = {
    currency,
    rate,
    ChangeCurrency,
    getConvertedPrice,
  }

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  )
}
