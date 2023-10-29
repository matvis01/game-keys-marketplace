import { useEffect, useState } from "react"
import abi from "../constants/abi.json"
import networkMapping from "../constants/networkMapping.json"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { writeContract, readContract } from "@wagmi/core"
import { waitForTransaction } from "wagmi/actions"
import { ethers } from "ethers"

import ConnectBtn from "../components/ConnectBtn"

const chainId: number = Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 1337

const contractAbi = abi
const contractAddress = networkMapping[11155111]["GameKeyMarketplace"][0]

export default function CryptoStuff() {
  const [balance, setBalance] = useState(0)
  const contractAddress = networkMapping[11155111]["GameKeyMarketplace"][0]
  const { address, isConnected, status } = useAccount()

  async function handleAddListing() {
    try {
      const { hash } = await writeContract({
        address: `0x${contractAddress.slice(2, contractAddress.length)}`,
        abi: contractAbi,
        functionName: "listGameKey",
        account: address,
        args: ["test", 3, ethers.parseEther("0.01")],
      })
      const receipt = await waitForTransaction({ hash })
      // console.log(receipt)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    async function getBalance() {
      try {
        const data = await readContract({
          address: `0x${contractAddress.slice(2, contractAddress.length)}`,
          abi: contractAbi,
          functionName: "getBalance",
          account: address,
        })
        console.log(ethers.formatEther(String(data)))
        setBalance(Number(ethers.formatEther(String(data))))
      } catch (e) {
        console.log(e)
      }
    }
    if (!isConnected) return
    getBalance()
  }, [])

  async function handleBuy() {
    try {
      const { hash } = await writeContract({
        address: `0x${contractAddress.slice(2, contractAddress.length)}`,
        abi: contractAbi,
        functionName: "buyGameKey",
        account: address,
        args: [1, address, ethers.parseEther("0.01")],
        value: ethers.parseEther("0.02"),
      })
      const receipt = await waitForTransaction({ hash })
      console.log(receipt)
    } catch (e) {
      console.log(e)
    }
  }

  async function getMyGames() {
    try {
      const data = await readContract({
        address: `0x${contractAddress.slice(2, contractAddress.length)}`,
        abi: contractAbi,
        functionName: "getGamesBought",
        account: address,
      })

      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  function handleWithdraw() {
    try {
      writeContract({
        address: `0x${contractAddress.slice(2, contractAddress.length)}`,
        abi: contractAbi,
        functionName: "withdraw",
        account: address,
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <ConnectBtn />

        <button
          className="btn btn-primary"
          onClick={handleAddListing}
          disabled={!isConnected}
        >
          Add Listing
        </button>
        <button
          className="btn btn-primary"
          onClick={handleBuy}
          disabled={!isConnected}
        >
          Buy
        </button>
        <button
          onClick={getMyGames}
          className="btn btn-primary"
          disabled={!isConnected}
        >
          get Games
        </button>
        <p>balance on MarketPlace: {balance}</p>
        <button
          className="btn btn-primary"
          onClick={handleWithdraw}
          disabled={!isConnected}
        >
          Withdraw
        </button>
        <p>
          contract address: {contractAddress.slice(0, 4)}...
          {contractAddress.slice(
            contractAddress.length - 5,
            contractAddress.length - 1,
          )}
        </p>
      </div>
    </div>
  )
}
