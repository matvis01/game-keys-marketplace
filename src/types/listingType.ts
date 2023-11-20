export type ListingType = {
  id: string
  gameId: number
  numOfItems: number
  price: string
  seller: string
  gameName: string
  gameImage: string
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

export type topRatedListings = {
  key: string
  gameId: number
  gameName: string
  gameImage: string
  tags: string[]
  genres: string[]
  bgColor: string
}
