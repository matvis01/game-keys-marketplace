import React from "react"
import { useConnect } from "wagmi"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"

export default function ConnectBtn() {
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  })

  const handleClick = async () => {
    try {
      connect()
    } catch (err) {
      console.error("Error connecting to MetaMask:", err)
    }
  }

  return (
    <button data-testid="test-connect-button" onClick={handleClick}>
      Connect
    </button>
  )
}
