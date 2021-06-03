import { Sans } from "@artsy/palette"
import { Artist2AuctionResultsCount_results } from "v2/__generated__/Artist2AuctionResultsCount_results.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface Artist2AuctionResultsCountProps {
  results: Artist2AuctionResultsCount_results
}

export const Artist2AuctionResultsCount = ({
  results,
}: Artist2AuctionResultsCountProps) => {
  return (
    <Sans size="2" weight="medium">
      {/* @ts-expect-error STRICT_NULL_CHECK */}
      {`Showing ${results.totalCount.toLocaleString()} results`}
    </Sans>
  )
}

export const Artist2AuctionResultsCountFragmentContainer = createFragmentContainer(
  Artist2AuctionResultsCount,
  {
    results: graphql`
      fragment Artist2AuctionResultsCount_results on AuctionResultConnection {
        totalCount
      }
    `,
  }
)
