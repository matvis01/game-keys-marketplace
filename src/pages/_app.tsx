import "@/styles/globals.css"
import type { AppProps } from "next/app"

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react"

import { WagmiConfig, sepolia } from "wagmi"
import { arbitrum, mainnet } from "wagmi/chains"

// 1. Get projectId
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || ""

// 2. Create wagmiConfig
const chains = [sepolia]
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  appName: "Web3Modal",
})

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}
