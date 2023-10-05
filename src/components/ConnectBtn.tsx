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
    <div>
      {/* <w3m-button /> */}
      {status === "connected" ? (
        <button className="btn btn-primary" onClick={() => disconnect()}>
          Disconnect
        </button>
      ) : (
        // <w3m-account-button />
        <button className="btn btn-primary" onClick={() => connect()}>
          Connect
        </button>
      )}
    </div>
  )
}
