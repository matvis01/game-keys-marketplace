import axios from "axios"
import { useState, useEffect } from "react"

export const useExchangePrice = (amount: number, from: string, to: string) => {
  const [exchangePrice, setExchangePrice] = useState<number>(0)

  useEffect(() => {
    const getExchangePrice = async () => {
      try {
        const response = await axios.get(
          `https://api.coinbase.com/v2/exchange-rates?currency=${from}`,
        )
        const rate = response.data.data.rates[to]
        const calculatedPrice = amount * parseFloat(rate)
        const roundedPrice = parseFloat(calculatedPrice.toFixed(2)) // Round to 2 decimal places
        setExchangePrice(roundedPrice)
      } catch (e) {
        console.log(e)
      }
    }
    getExchangePrice()
  }, [amount, to])

  return exchangePrice
}
