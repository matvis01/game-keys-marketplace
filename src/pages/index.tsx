import { useEffect } from "react"
import CryptoStuff from "@/components/CryptoStuff"
import { themeChange } from "theme-change"

export default function Home() {
  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <div>
      <CryptoStuff />
      <div>
        <p className="text-8xl">SRAKA</p>
      </div>
      <div>
        <p className="text-8xl">SRAKA</p>
      </div>
      <div>
        <p className="text-8xl">SRAKA</p>
      </div>
      <div>
        <p className="text-8xl">SRAKA</p>
      </div>
      <div>
        <p className="text-8xl">SRAKA</p>
      </div>
      <div>
        <p className="text-8xl">SRAKA</p>
      </div>
      <div>
        <p className="text-8xl">SRAKA</p>
      </div>
    </div>
  )
}
