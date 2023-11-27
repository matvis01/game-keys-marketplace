import axios from "axios"
import { useState, useEffect } from "react"

export const useExchangePrice = (amount: number = 0) => {
  const [currency, setCurrency] = useState<string | undefined>()
  const [convertedPrice, setConvertedPrice] = useState<number>(0)

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
    getExchangedPrice()
    async function getExchangedPrice() {
      if (!amount || !currency) return
      try {
        const response = await axios.get(
          `https://api.coinbase.com/v2/exchange-rates?currency=ETH`,
        )
        const rate = response.data.data.rates[currency]
        const calculatedPrice = amount * parseFloat(rate)
        const roundedPrice = parseFloat(calculatedPrice.toFixed(2)) // Round to 2 decimal places
        setConvertedPrice(roundedPrice)
      } catch (e) {
        console.log(e)
      }
    }
  }, [amount, currency])

  const ChangeCurrency = (currency: string) => {
    localStorage.setItem("currency", currency)
    setCurrency(currency)
    window.dispatchEvent(new Event("storage"))
  }

  return { currency, ChangeCurrency, convertedPrice }
}
