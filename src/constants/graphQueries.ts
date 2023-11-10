import { gql } from "@apollo/client"

export const GET_LISTINGS_BY_GAME = gql`
  {
    listingsByGames {
      gameId
      allListings {
        id
        gameId
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
        gameId
        numOfItems
        price
        seller
      }
    }
  }
`
}

// na razie zwraca wszystkie gry
export const GET_FEATURED_GAMES = gql`
  {
    listingsByGames(
      where: { numOfListings_gt: "0" }
      orderBy: numOfListings
      first: 7
    ) {
      gameName
      gameImage
      gameId
    }
  }
`
