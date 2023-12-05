import { gql } from "@apollo/client"
import { getTimestampWeeksAgo } from "./dateUtils"
import { filtersType } from "../types/filtersType"

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

export function GET_LISTINGS_FOR_GAME(gameId: number) {
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

export function GET_BEST_PRICE(gameId: number) {
  return gql`
  {
    listingsByGame(id: ${gameId}) {
      allListings(orderBy: price, first: 1) {
        price
      }
    }
  }`
}

export function GET_NAME(gameId: number) {
  return gql`
  {
    itemsBoughtByGame(id: ${gameId}) {
     gameName
    }
  }`
}

export function GET_LISTING_NAME(gameId: number) {
  return gql`
  {
    listingsByGame(id: ${gameId}) {
      gameName
    }
  }`
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
      tags
      genres
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

export function GET_LISTINGS_BY_CRITERIA(filters: filtersType) {
  let { tags, genres, minPrice, maxPrice, order } = filters
  tags = tags?.map((tag) => `"${tag}"`)
  const tagsString = tags?.join(", ")
  genres = genres?.map((genre) => `"${genre}"`)
  const genresString = genres?.join(", ")
  minPrice = minPrice && minPrice.length > 0 ? minPrice : "0"

  return gql`{
    listingsByGames(
      ${order ? `orderBy: ${order} , orderDirection: desc, ` : ""} 
      where: {genres_contains: [${genresString}], numOfListings_gt: "0", tags_contains: [${tagsString}]},
    ) {
      gameName
      allListings(where: {price_gt: "${minPrice}"${
        maxPrice ? `, price_lt: "${maxPrice}"` : ""
      }}) {
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

export const GET_BESTSELLERS = gql`
  {
    itemsBoughtByGames(where: { hasListings: true }) {
      gameId
      allItemsBought {
        numOfItems
      }
    }
  }
`

export const GET_ALL_GENRES = gql`
  {
    genres(
      where: { numberOfGames_gt: "0" }
      orderBy: numberOfGames
      orderDirection: desc
    ) {
      name
      numberOfGames
    }
  }
`
export const GET_ALL_TAGS = gql`
  {
    tags(
      where: { numberOfGames_gt: "0" }
      orderBy: numberOfGames
      orderDirection: desc
    ) {
      name
      numberOfGames
    }
  }
`

export const GET_LATEST_LISTINGS = gql`
  {
    listingsByGames(
      orderBy: latestDate
      orderDirection: desc
      where: { numOfListings_gt: "0" }
    ) {
      latestDate
      gameName
      numOfListings
      gameImage
      gameId
      tags
      genres
      allListings(orderBy: price, where: { numOfItems_gt: "0" }) {
        price
      }
    }
  }
`

export const GET_TOP_RATED = gql`
  {
    listingsByGames(
      orderBy: rating
      orderDirection: desc
      where: { numOfListings_gt: "0" }
      first: 6
    ) {
      gameId
      gameImage
      gameName
      genres
      id
      numOfListings
      rating
      tags
    }
  }
`

export const GET_USER_LISTINGS = (address: string) => gql`
{
  itemListeds(where: {seller: "${address}", numOfItems_gt: "0"}) {
    price
    numOfItems
    gameId
    id
  }
}
`
