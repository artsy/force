import { createFragmentContainer, graphql } from "react-relay"
import { Sans } from "@artsy/palette"
import { ArtistAuctionResultsCount_results$data } from "v2/__generated__/ArtistAuctionResultsCount_results.graphql"

interface ArtistAuctionResultsCountProps {
  results: ArtistAuctionResultsCount_results$data
}

export const ArtistAuctionResultsCount = ({
  results,
}: ArtistAuctionResultsCountProps) => {
  return (
    <Sans size="2" weight="medium">
      {`Showing ${results.totalCount?.toLocaleString() ?? 0} results`}
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
