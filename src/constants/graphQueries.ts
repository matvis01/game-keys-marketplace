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
