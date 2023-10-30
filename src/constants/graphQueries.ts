import { gql } from "@apollo/client"

export const GET_LISTINGS_BY_GAME = gql`
  {
    listingsByGames {
      gameId
      allListings {
        id
        numOfItems
        price
        seller
      }
    }
  }
`

export function GET_LISTINGS_FOR_GAME(gameId: Number) {
  return gql`
  query MyQuery {
    listingsByGame(id: ${gameId}) {
      gameId
      allListings(orderBy: price) {
        numOfItems
        price
        seller
      }
    }
  }
`
}
