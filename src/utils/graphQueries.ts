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

export function GET_BEST_PRICE(gameId: Number) {
  return gql`
  {
    listingsByGame(id: ${gameId}) {
      allListings(orderBy: price, first: 1) {
        price
      }
    }
  }`
}

export function GET_NAME(gameId: Number) {
  return gql`
  {
    itemsBoughtByGame(id: ${gameId}) {
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
  let { tags, genres, minPrice, maxPrice } = filters
  tags = tags?.map((tag) => `"${tag}"`)
  const tagsString = tags?.join(", ")
  genres = genres?.map((genre) => `"${genre}"`)
  const genresString = genres?.join(", ")

  return gql`{
  listingsByGames(
    where: {genres_contains: [${genresString}], numOfListings_gt: "0", tags_contains: [${tagsString}]},
  ) {
    gameName
    allListings(where: {price_gt: "${minPrice}", price_lt: "${maxPrice}"}) {
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

export const GET_ALL_FILTERS = gql`
  {
    allFilter(id: "filters") {
      tags
      genres
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
