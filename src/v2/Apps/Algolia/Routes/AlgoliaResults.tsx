import * as React from "react"
import { Box } from "@artsy/palette"
import { Hits, Pagination } from "react-instantsearch-dom"

const Hit = ({ hit }) => <p>{hit.name}</p>

export const AlgoliaResults = () => {
  return (
    <Box>
      <Hits hitComponent={Hit} />
      <Pagination />
    </Box>
  )
}
