import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react"
import { WagmiConfig } from "wagmi"
import { sepolia } from "wagmi/chains"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import NavBar from "@/components/Navigation/NavBar"
import Footer from "@/components/Footer/Footer"

import { CurrencyProvider } from "../contexts/currencyContext"

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPH_URL || "",
  cache: new InMemoryCache(),
})
// 1. Get projectId
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || ""

// 2. Create wagmiConfig
const chains = [sepolia]
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  appName: "Web3Modal",
})

createWeb3Modal({ wagmiConfig, projectId, chains })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CurrencyProvider>
      <WagmiConfig config={wagmiConfig}>
        <ApolloProvider client={client}>
          <div className="flex min-h-screen flex-col">
            <NavBar />
            <Component {...pageProps} />
            <Footer />
          </div>
        </ApolloProvider>
      </WagmiConfig>
    </CurrencyProvider>
  )
}
