import { Box, Flex, LocationIcon, Spacer, Text } from "@artsy/palette"
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
        <Text variant="subtitle" display="inline-block">
          <a href={sale.href}>{sale.name}</a>
        </Text>
      )
    }

    const partner = this.props.artwork.partner
    if (!partner) {
      return null
    }

    return partner.href ? (
      <Text variant="subtitle" display="inline-block">
        <a href={partner.href}>{partner.name}</a>
      </Text>
    ) : (
      <Text variant="subtitle" display="inline-block">
        {partner.name}
      </Text>
    )
  }
  renderLocations(locationNames) {
    return (
      <Text
        variant="caption"
        color="black60"
        display="inline-block"
        pl={1}
        pt={0.3}
      >
        {locationNames.join(", ")}
      </Text>
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
            <Flex width="100%">
              <Flex flexDirection="column" pt={0.3}>
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
