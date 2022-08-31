import * as React from "react"

import { Flex } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebar2ArtistsFragmentContainer } from "./ArtworkSidebar2Artists"
import { ArtworkSidebar2_artwork } from "__generated__/ArtworkSidebar2_artwork.graphql"
export interface ArtworkSidebarProps {
  artwork: ArtworkSidebar2_artwork
}

export const ArtworkSidebar2: React.FC<ArtworkSidebarProps> = props => {
  const { artwork } = props
  return (
    <Flex>
      <ArtworkSidebar2ArtistsFragmentContainer artwork={artwork} />
    </Flex>
  )
}

export const ArtworkSidebar2FragmentContainer = createFragmentContainer(
  ArtworkSidebar2,
  {
    artwork: graphql`
      fragment ArtworkSidebar2_artwork on Artwork {
        slug
        ...ArtworkSidebar2Artists_artwork
      }
    `,
  }
)
