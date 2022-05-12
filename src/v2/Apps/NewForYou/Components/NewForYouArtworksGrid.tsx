import { Spacer } from "@artsy/palette"
import React, { FC, Fragment } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import ArtworkGridItemFragmentContainer from "v2/Components/Artwork/GridItem"
import { Masonry } from "v2/Components/Masonry"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { extractNodes } from "v2/Utils/extractNodes"
import { NewForYouArtworksGridQuery } from "v2/__generated__/NewForYouArtworksGridQuery.graphql"
import { NewForYouArtworksGrid_viewer } from "v2/__generated__/NewForYouArtworksGrid_viewer.graphql"

interface NewForYouArtworksGridProps {
  viewer: NewForYouArtworksGrid_viewer
}

export const NewForYouArtworksGrid: FC<NewForYouArtworksGridProps> = ({
  viewer,
}) => {
  const { artworksForUser } = viewer
  const artworks = extractNodes(artworksForUser)

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

export const NewForYouArtworksGridQueryRenderer: React.FC = () => {
  return (
    <SystemQueryRenderer<NewForYouArtworksGridQuery>
      query={graphql`
        query NewForYouArtworksGridQuery {
          viewer {
            ...NewForYouArtworksGrid_viewer
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }
        if (!props?.viewer) {
          return null
        }
        return <NewForYouArtworksGridFragmentContainer viewer={props.viewer} />
      }}
    />
  )
}

export const NewForYouArtworksGridFragmentContainer = createFragmentContainer(
  NewForYouArtworksGrid,
  {
    viewer: graphql`
      fragment NewForYouArtworksGrid_viewer on Viewer {
        artworksForUser {
          totalCount
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
