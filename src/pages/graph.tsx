import { useQuery } from "@apollo/client"
import { GET_LISTINGS_BY_GAME } from "../constants/graphQueries"

function Graph() {
  const { loading, error, data: listings } = useQuery(GET_LISTINGS_BY_GAME)
  return <div>{JSON.stringify(listings, null, " ")}</div>
}

export default Graph
