import { useQuery } from "@apollo/client"
import { GET_LISTINGS_BY_CRITERIA } from "../utils/graphQueries"

function Graph() {
  const {
    loading,
    error,
    data: listings,
  } = useQuery(GET_LISTINGS_BY_CRITERIA(["2D"], ["RPG"]))

  console.log("listings:", listings)
  return <div>{JSON.stringify(listings, null, " ")}</div>
}

export default Graph
