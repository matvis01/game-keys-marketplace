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
      tags
      genres
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
      tags
      genres
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

export function GET_LISTINGS_BY_CRITERIA(
  tags: string[] = [],
  genres: string[] = [],
  priceFrom: string = "0",
  priceTo: string = "100000000000000000000000000000000000000",
) {
  tags = tags.map((tag) => `"${tag}"`)
  genres = genres.map((genre) => `"${genre}"`)

  return gql`{
  listingsByGames(
    where: {genres_contains: [${genres}], numOfListings_gt: "0", tags_contains: [${tags}]},
  ) {
    gameName
    allListings(where: {price_gt: "${priceFrom}", price_lt: "${priceTo}"}) {
      price
    }
    gameId
    gameImage
    genres
    tags
    numOfListings
    id
  }
}
`
}
