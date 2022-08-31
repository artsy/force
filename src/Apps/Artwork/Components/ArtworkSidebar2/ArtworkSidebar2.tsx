import * as React from "react"

import { Flex, Separator } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebar2ArtistsFragmentContainer } from "./ArtworkSidebar2Artists"
import { ArtworkSidebar2_artwork } from "__generated__/ArtworkSidebar2_artwork.graphql"
import { ArtworkSidebar2ShippingInformationFragmentContainer } from "./ArtworkSidebar2ShippingInformation"
import { SidebarExpandable } from "Components/Artwork/SidebarExpandable"
export interface ArtworkSidebarProps {
  artwork: ArtworkSidebar2_artwork
}

export const ArtworkSidebar2: React.FC<ArtworkSidebarProps> = props => {
  const { artwork } = props
  const { isSold, isAcquireable, isOfferable } = artwork

  const artworkEcommerceAvailable = !!(isAcquireable || isOfferable)

  return (
    <Flex flexDirection="column">
      <ArtworkSidebar2ArtistsFragmentContainer artwork={artwork} />
      {!isSold && artworkEcommerceAvailable && (
        // TODO: i18n?
        <>
          <Separator />
          <SidebarExpandable label="Shipping and Taxes">
            <ArtworkSidebar2ShippingInformationFragmentContainer
              artwork={artwork}
            />
          </SidebarExpandable>
        </>
      )}
    </Flex>
  )
}

export const ArtworkSidebar2FragmentContainer = createFragmentContainer(
  ArtworkSidebar2,
  {
    artwork: graphql`
      fragment ArtworkSidebar2_artwork on Artwork {
        slug
        isSold
        isAcquireable
        isOfferable
        ...ArtworkSidebar2Artists_artwork
        ...ArtworkSidebar2ShippingInformation_artwork
      }
    `,
  }
)
