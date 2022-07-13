import { Text } from "@artsy/palette"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import ArtworkGrid from "v2/Components/ArtworkGrid"
import { NewForYouArtworksGrid_viewer } from "v2/__generated__/NewForYouArtworksGrid_viewer.graphql"

interface NewForYouArtworksGridProps {
  viewer: NewForYouArtworksGrid_viewer
}

export const NewForYouArtworksGrid: FC<NewForYouArtworksGridProps> = ({
  viewer,
}) => {
  return (
    <>
      {viewer.artworksForUser?.totalCount! > 0 ? (
        <ArtworkGrid artworks={viewer.artworksForUser} />
      ) : (
        <Text variant="lg" mt={4} color="black60">
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
        ) {
        artworksForUser(
          first: $first
          includeBackfill: $includeBackfill
          version: $version
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
