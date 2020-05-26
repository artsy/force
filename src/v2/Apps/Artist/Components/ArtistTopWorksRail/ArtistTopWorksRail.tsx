import { Sans } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistTopWorksRail_topRailArtworks } from "v2/__generated__/ArtistTopWorksRail_topRailArtworks.graphql"

interface ArtistTopWorksRailProps {
  topRailArtworks: ArtistTopWorksRail_topRailArtworks
}

export const ArtistTopWorksRail: React.FC<ArtistTopWorksRailProps> = ({
  topRailArtworks,
}) => {
  return (
    <Sans size="5" color="black100" mb={2}>
      Top Works
    </Sans>
  )
}

export const ArtistTopWorksRailFragmentContainer = createFragmentContainer(
  ArtistTopWorksRail,
  {
    topRailArtworks: graphql`
      fragment ArtistTopWorksRail_topRailArtworks on Artist {
        name
        topRailArtworks: artworksConnection(first: 10, sort: ICONICITY_DESC) {
          edges {
            node {
              title
              image {
                url
              }
            }
          }
        }
      }
    `,
  }
)
