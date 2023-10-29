import React from "react"
import { useWeb3ModalTheme } from "@web3modal/wagmi/react"

export default function ConnectBtn() {
  const { setThemeVariables } = useWeb3ModalTheme()

  setThemeVariables({
    "--w3m-font-family": "Roboto, sans-serif",
    "--w3m-accent": "#EC6090",
  })

  return <w3m-button />
}
