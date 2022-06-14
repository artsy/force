import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import ArtworkGridItemFragmentContainer from "v2/Components/Artwork/GridItem"
import { extractNodes } from "v2/Utils/extractNodes"
import { NewForYouArtworksGrid_viewer } from "v2/__generated__/NewForYouArtworksGrid_viewer.graphql"

interface NewForYouArtworksGridProps {
  viewer: NewForYouArtworksGrid_viewer
}

export const NewForYouArtworksGrid: FC<NewForYouArtworksGridProps> = ({
  viewer,
}) => {
  const artworks = extractNodes(viewer.artworksForUser)

  return (
    <>
      {artworks?.length > 0 ? (
        <GridColumns gridRowGap={[2, 4]} alignItems="flex-end">
          {artworks.map(artwork => {
            return (
              <Column key={artwork.internalID} span={[12, 6, 4]}>
                <ArtworkGridItemFragmentContainer artwork={artwork} />
                <Spacer mt={4} />
              </Column>
            )
          })}
        </GridColumns>
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
        @argumentDefinitions(first: { type: "Int", defaultValue: 20 }) {
        artworksForUser(first: $first, includeBackfill: true)
          @connection(key: "NewForYouArtworksGrid_artworksForUser") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              internalID
              ...GridItem_artwork
            }
          }
        }
      }
    `,
  }
)
