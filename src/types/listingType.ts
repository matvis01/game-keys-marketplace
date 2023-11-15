export type ListingType = {
  id: string
  gameId: number
  numOfItems: number
  price: string
  seller: string
}

export type listingsByGameType = {
  gameId: number
  allListings: ListingType[]
}

export type soldListingsByGameType = {
  gameId: number
  gameImage: string
  gameName: string
  genres: string[]
  tags: string[]
  allItemsBought: soldListingType[]
}

export type soldListingType = {
  date: string
  price: number
  numOfItems: number
}
