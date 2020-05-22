import { Sans } from "@artsy/palette"
import { AuctionResultsCount_results } from "v2/__generated__/AuctionResultsCount_results.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface AuctionResultsCountProps {
  results: AuctionResultsCount_results
}

export const AuctionResultsCount = ({ results }: AuctionResultsCountProps) => {
  return (
    <Sans size="2" weight="medium">
      {`Showing ${results.totalCount.toLocaleString()} results`}
    </Sans>
  )
}

export const AuctionResultsCountFragmentContainer = createFragmentContainer(
  AuctionResultsCount,
  {
    results: graphql`
      fragment AuctionResultsCount_results on AuctionResultConnection {
        totalCount
      }
    `,
  }
)
