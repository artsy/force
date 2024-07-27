import { Text } from "@artsy/palette"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import ArtworkGrid from "Components/ArtworkGrid/ArtworkGrid"
import { NewForYouArtworksGrid_viewer$data } from "__generated__/NewForYouArtworksGrid_viewer.graphql"
import { ArtworkGridContextProvider } from "Components/ArtworkGrid/ArtworkGridContext"

interface NewForYouArtworksGridProps {
  viewer: NewForYouArtworksGrid_viewer$data
}

export const NewForYouArtworksGrid: FC<NewForYouArtworksGridProps> = ({
  viewer,
}) => {
  return (
    <>
      {viewer.artworksForUser &&
      (viewer.artworksForUser.totalCount ?? 0) > 0 ? (
        <ArtworkGridContextProvider showActivePartnerOffer>
          <ArtworkGrid
            artworks={viewer.artworksForUser}
            columnCount={[2, 3, 4]}
          />
        </ArtworkGridContextProvider>
      ) : (
        <Text variant="lg-display" mt={4} color="black60">
          Nothing yet.
        </Text>
      )}
    </>
  )
}

export const NewForYouArtworksGridFragmentContainer = createFragmentContainer(
  NewForYouArtworksGrid,
  {
    viewer: graphql`
      fragment NewForYouArtworksGrid_viewer on Viewer
        @argumentDefinitions(
          first: { type: "Int" }
          includeBackfill: { type: "Boolean!" }
          version: { type: "String" }
          maxWorksPerArtist: { type: "Int" }
        ) {
        artworksForUser(
          first: $first
          includeBackfill: $includeBackfill
          version: $version
          maxWorksPerArtist: $maxWorksPerArtist
        ) {
          totalCount
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
