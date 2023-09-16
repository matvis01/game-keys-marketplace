import { useConnect, useAccount, useDisconnect } from "wagmi"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"

function SignIn() {
  const { connectAsync } = useConnect()
  const { isConnected } = useAccount()
  const { disconnectAsync } = useDisconnect()
  const handleConnect = async () => {
    if (isConnected) {
      await disconnectAsync()
    }
    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    })

    const userData = { address: account, chainId: chain.id }

    console.log(userData)
  }

  return (
    <div>
      <h3>Web3 Authentication</h3>

      <button onClick={handleConnect}>connect</button>
    </div>
  )
}

export default SignIn
