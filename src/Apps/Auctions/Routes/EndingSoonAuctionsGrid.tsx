import { Text } from "@artsy/palette"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import ArtworkGrid from "Components/ArtworkGrid/ArtworkGrid"
import { EndingSoonAuctionsGrid_viewer$data } from "__generated__/EndingSoonAuctionsGrid_viewer.graphql"

interface EndingSoonAuctionsGridProps {
  viewer: EndingSoonAuctionsGrid_viewer$data
}

export const EndingSoonAuctionsGrid: FC<EndingSoonAuctionsGridProps> = ({
  viewer,
}) => {
  return (
    <>
      {viewer.saleArtworksConnection &&
      (viewer.saleArtworksConnection.counts?.total ?? 0) > 0 ? (
        <ArtworkGrid artworks={viewer.saleArtworksConnection} />
      ) : (
        <>
          <Text variant="lg" mt={4} color="black60">
            Nothing yet.
          </Text>
        </>
      )}
    </>
  )
}

// TODO: check totalCount, it's null
// using counts.total instead
export const EndingSoonAuctionsGridFragmentContainer = createFragmentContainer(
  EndingSoonAuctionsGrid,
  {
    viewer: graphql`
      fragment EndingSoonAuctionsGrid_viewer on Viewer
        @argumentDefinitions(
          includeArtworksByFollowedArtists: { type: "Boolean!" }
          isAuction: { type: "Boolean!" }
          liveSale: { type: "Boolean!" }
        ) {
        saleArtworksConnection(
          includeArtworksByFollowedArtists: $includeArtworksByFollowedArtists
          isAuction: $isAuction
          liveSale: $liveSale
        ) {
          counts {
            total
          }
          ...ArtworkGrid_artworks
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
  }
)
