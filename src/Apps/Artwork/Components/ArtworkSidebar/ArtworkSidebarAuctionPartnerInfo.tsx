import { Text } from "@artsy/palette"
import type { ArtworkSidebarAuctionPartnerInfo_artwork$data } from "__generated__/ArtworkSidebarAuctionPartnerInfo_artwork.graphql"
import { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface ArtworkSidebarAuctionPartnerInfoProps {
  artwork: ArtworkSidebarAuctionPartnerInfo_artwork$data
}

export class ArtworkSidebarAuctionPartnerInfo extends Component<ArtworkSidebarAuctionPartnerInfoProps> {
  render() {
    const { partner, sale_artwork, sale } = this.props.artwork

    if (sale?.is_closed) {
      return null
    }

    return (
      <>
        {partner && <Text variant="xs">{partner.name}</Text>}

        {sale_artwork && sale_artwork.estimate && (
          <Text variant="xs" color="mono60">
            Estimated value: {sale_artwork.estimate}
          </Text>
        )}
      </>
    )
  }
}

export const ArtworkSidebarAuctionPartnerInfoFragmentContainer =
  createFragmentContainer(ArtworkSidebarAuctionPartnerInfo, {
    artwork: graphql`
      fragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {
        partner {
          name
        }
        sale_artwork: saleArtwork {
          estimate
        }
        sale {
          internalID
          is_closed: isClosed
        }
      }
    `,
  })
