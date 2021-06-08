import { Sans } from "@artsy/palette"
import { ArtistAuctionResultsCount_results } from "v2/__generated__/ArtistAuctionResultsCount_results.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistAuctionResultsCountProps {
  results: ArtistAuctionResultsCount_results
}

export const ArtistAuctionResultsCount = ({
  results,
}: ArtistAuctionResultsCountProps) => {
  return (
    <Sans size="2" weight="medium">
      {/* @ts-expect-error STRICT_NULL_CHECK */}
      {`Showing ${results.totalCount.toLocaleString()} results`}
    </Sans>
  )
}

export const ArtistAuctionResultsCountFragmentContainer = createFragmentContainer(
  ArtistAuctionResultsCount,
  {
    results: graphql`
      fragment ArtistAuctionResultsCount_results on AuctionResultConnection {
        totalCount
      }
    `,
  }
)
