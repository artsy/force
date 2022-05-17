import { Spacer } from "@artsy/palette"
import React, { FC, Fragment } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import ArtworkGridItemFragmentContainer from "v2/Components/Artwork/GridItem"
import { Masonry } from "v2/Components/Masonry"
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
    <Masonry columnCount={[2, 3, 4]}>
      {artworks?.length > 0 &&
        artworks.map(artwork => {
          return (
            <Fragment key={artwork.internalID}>
              <ArtworkGridItemFragmentContainer artwork={artwork} />
              <Spacer mt={4} />
            </Fragment>
          )
        })}
    </Masonry>
  )
}

export const NewForYouArtworksGridFragmentContainer = createFragmentContainer(
  NewForYouArtworksGrid,
  {
    viewer: graphql`
      fragment NewForYouArtworksGrid_viewer on Viewer {
        artworksForUser {
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
