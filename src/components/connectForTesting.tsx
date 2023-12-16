import React from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
export default function ConnectBtn() {
  const { status } = useAccount()
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  })
  const { disconnect } = useDisconnect()
  return (
    <button className="" data-testid="connectBtn" onClick={() => connect()}>
      Connect
    </button>
  )
}
