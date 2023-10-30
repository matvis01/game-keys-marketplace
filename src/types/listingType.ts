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
