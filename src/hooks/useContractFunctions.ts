import { useEffect, useState } from "react"
import abi from "../constants/abi.json"
import networkMapping from "../constants/networkMapping.json"
import { useAccount } from "wagmi"
import { writeContract, readContract } from "@wagmi/core"
import { waitForTransaction } from "wagmi/actions"
import { ethers } from "ethers"
import { encrypt } from "n-krypta"

const chainId: string = process.env.NEXT_PUBLIC_CHAIN_ID || "1337"
const contractAbi = abi

const secretKey = process.env.NEXT_PUBLIC_ENCRYPT_KEY || "secretKey"

type gameDataType = {
  id: number
  name: string
  image: string
  rating: number
  tags: string[]
  genres: string[]
}

function useContractFunctions() {
  const [balance, setBalance] = useState(0)

  const contractAddresses =
    (networkMapping as Record<string, { GameKeyMarketplace: string[] }>)[
      chainId
    ]?.GameKeyMarketplace || []
  const contractAddress = contractAddresses[contractAddresses.length - 1]
  const { address, isConnected, status } = useAccount()

  async function addListing(
    gameData: gameDataType,
    key: string,
    price: string,
  ) {
    try {
      if (!address) return
      const listingId = getIdFromParams(
        String(gameData.id),
        ethers.parseEther(price).toString(),
        address,
      )
      const encryptedKey = encrypt(key, secretKey)
      const intRating = Math.round(gameData.rating * 100)
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
            intRating,
            gameData.tags,
            gameData.genres,
          ],
          listingId,
          encryptedKey,
          ethers.parseEther(price),
        ],
      })
      const receipt = await waitForTransaction({ hash })
      return receipt
    } catch (e) {
      console.log(e)
    }
  }

  async function buy(id: number, seller: string, price: string) {
    try {
      const listingId = getIdFromParams(String(id), price, seller)
      console.log(listingId)
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

  useEffect(() => {
    async function getBalance() {
      try {
        const data = await readContract({
          address: `0x${contractAddress.slice(2, contractAddress.length)}`,
          abi: contractAbi,
          functionName: "getBalance",
          account: address,
        })
        setBalance(Number(ethers.formatEther(String(data))))
      } catch (e) {
        console.log(e)
      }
    }
    if (!isConnected) return
    getBalance()
  }, [])

  async function getMyGames() {
    try {
      const data = await readContract({
        address: `0x${contractAddress.slice(2, contractAddress.length)}`,
        abi: contractAbi,
        functionName: "getGamesBought",
        account: address,
      })
      return data
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

  async function cancelListing(
    listingId: string,
    gameId: string,
    price: string,
  ) {
    try {
      if (!address) return
      const { hash } = await writeContract({
        address: `0x${contractAddress.slice(2, contractAddress.length)}`,
        abi: contractAbi,
        functionName: "cancelListing",
        account: address,
        args: [listingId, gameId, price],
      })
      const receipt = await waitForTransaction({ hash })
      console.log(receipt)
      return receipt
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
    cancelListing,
  }
}

function getIdFromParams(
  gameId: string,
  price: string,
  seller: string,
): string {
  return gameId + "-" + price + "-" + seller.toLocaleLowerCase()
}

export default useContractFunctions
