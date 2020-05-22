import { Box, Flex, LocationIcon, Serif, Spacer } from "@artsy/palette"
import { filterLocations } from "v2/Apps/Artwork/Utils/filterLocations"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtworkSidebarPartnerInfo_artwork } from "v2/__generated__/ArtworkSidebarPartnerInfo_artwork.graphql"

export interface ArtworkSidebarPartnerInfoProps {
  artwork: ArtworkSidebarPartnerInfo_artwork
}

export class ArtworkSidebarPartnerInfo extends React.Component<
  ArtworkSidebarPartnerInfoProps
  > {
  renderPartnerName() {
    const sale = this.props.artwork.sale
    if (sale) {
      return (
        <Serif size="5t" display="inline-block" weight="semibold">
          <a href={sale.href}>{sale.name}</a>
        </Serif>
      )
    }

    const partner = this.props.artwork.partner
    if (!partner) {
      return null
    }

    return partner.href ? (
      <Serif size="5t" display="inline-block" weight="semibold">
        <a href={partner.href}>{partner.name}</a>
      </Serif>
    ) : (
        <Serif size="5t" display="inline-block" weight="semibold">
          {partner.name}
        </Serif>
      )
  }
  renderLocations(locationNames) {
    return (
      <Serif size="2" display="inline-block" pl={1} pt={0.3}>
        {locationNames.join(", ")}
      </Serif>
    )
  }

  render() {
    const { artwork } = this.props
    const locationNames =
      artwork &&
      artwork.partner &&
      artwork.partner.locations &&
      artwork.partner.locations.length > 0 &&
      filterLocations(artwork.partner.locations)
    return (
      <Box>
        <Spacer mb={3} />
        {this.renderPartnerName()}
        {locationNames && locationNames.length > 0 && (
          <Box>
            <Flex width="100%" pt={1}>
              <Flex flexDirection="column">
                <LocationIcon />
              </Flex>
              <Flex flexDirection="column">
                {this.renderLocations(locationNames)}
              </Flex>
            </Flex>
          </Box>
        )}
        <Spacer mb={3} />
      </Box>
    )
  }
}

export const ArtworkSidebarPartnerInfoFragmentContainer = createFragmentContainer(
  ArtworkSidebarPartnerInfo,
  {
    artwork: graphql`
      fragment ArtworkSidebarPartnerInfo_artwork on Artwork {
        partner {
          name
          href
          locations {
            city
          }
        }
        sale {
          name
          href
        }
      }
    `,
  }
)
