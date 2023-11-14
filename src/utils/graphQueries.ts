import { gql } from "@apollo/client"
import { getTimestampWeeksAgo } from "./dateUtils"

export const GET_LISTINGS_BY_GAME = gql`
  {
    listingsByGames(where: { numOfListings_gt: "0" }) {
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

export const GET_ALL_NAMES_AND_IDS = gql`
  {
    listingsByGames(where: { numOfListings_gt: "0" }) {
      gameId
      gameName
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

export function GET_SOLD_LAST_WEEKS_WITH_LISTING(numOfWeeks: number) {
  const timestamp = getTimestampWeeksAgo(numOfWeeks)
  return gql`
  {
    itemsBoughtByGames(where: {hasListings: true}) {
      gameId
      allItemsBought(where: {date_gte: "${timestamp}"}) {
        date
        price
        numOfItems
      }
      gameName
      gameImage
    }
  }
`
}
