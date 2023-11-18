import { useEffect, useState } from "react"
import abi from "../constants/abi.json"
import networkMapping from "../constants/networkMapping.json"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { writeContract, readContract } from "@wagmi/core"
import { waitForTransaction } from "wagmi/actions"
import { ethers } from "ethers"

const chainId: number = Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 1337
const contractAbi = abi

type gameDataType = {
  id: number
  name: string
  image: string
  tags: string[]
  genres: string[]
}

function useContractFunctions() {
  const [balance, setBalance] = useState(0)

  const contractAddresses = networkMapping[11155111]["GameKeyMarketplace"]
  const contractAddress = contractAddresses[contractAddresses.length - 1]
  const { address, isConnected, status } = useAccount()

  async function addListing(
    gameData: gameDataType,
    key: string,
    price: string,
  ) {
    try {
      if (!address) return
      const listingId = getIdFromParams(String(gameData.id), price, address)
      const { hash } = await writeContract({
        address: `0x${contractAddress.slice(2, contractAddress.length)}`,
        abi: contractAbi,
        functionName: "listGameKey",
        account: address,
        args: [
          [
            gameData.id,
            gameData.name,
            gameData.image,
            gameData.tags,
            gameData.genres,
          ],
          listingId,
          key,
          ethers.parseEther(price),
        ],
      })
      const receipt = await waitForTransaction({ hash })
      return receipt
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

  async function buy(id: number, seller: string, price: string) {
    try {
      if (!address) return
      const listingId = getIdFromParams(String(id), price, address)
      const { hash } = await writeContract({
        address: `0x${contractAddress.slice(2, contractAddress.length)}`,
        abi: contractAbi,
        functionName: "buyGameKey",
        account: address,
        args: [listingId, id, seller, price],
        value: ethers.toBigInt(price),
      })
      const receipt = await waitForTransaction({ hash })

      return receipt
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
  return {
    addListing,
    buy,
    getMyGames,
    handleWithdraw,
    balance,
  }
}

function getIdFromParams(
  gameId: string,
  price: string,
  seller: string,
): string {
  return gameId + "-" + price + "-" + seller
}

export default useContractFunctions
