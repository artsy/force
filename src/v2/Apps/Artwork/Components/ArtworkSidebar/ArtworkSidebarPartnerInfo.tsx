import { Flex, LocationIcon, Spacer, Text } from "@artsy/palette"
import { filterLocations } from "v2/Apps/Artwork/Utils/filterLocations"
import { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarPartnerInfo_artwork } from "v2/__generated__/ArtworkSidebarPartnerInfo_artwork.graphql"
import { RouterLink } from "v2/System/Router/RouterLink"

export interface ArtworkSidebarPartnerInfoProps {
  artwork: ArtworkSidebarPartnerInfo_artwork
}

export class ArtworkSidebarPartnerInfo extends Component<
  ArtworkSidebarPartnerInfoProps
> {
  renderPartnerName() {
    const sale = this.props.artwork.sale

    if (sale) {
      return (
        <Text variant="md">
          <RouterLink to={sale.href ?? ""}>{sale.name}</RouterLink>
        </Text>
      )
    }

    const partner = this.props.artwork.partner

    if (!partner) {
      return null
    }

    return partner.href ? (
      <Text variant="md">
        <RouterLink to={partner.href}>{partner.name}</RouterLink>
      </Text>
    ) : (
      <Text variant="md">{partner.name}</Text>
    )
  }
  renderLocations(locationNames) {
    return (
      <Text variant="xs" color="black60" pl={1}>
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
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      filterLocations(artwork.partner.locations)

    return (
      <>
        <Spacer mt={2} />

        {this.renderPartnerName()}

        {locationNames && locationNames.length > 0 && (
          <Flex mt={1}>
            <LocationIcon />

            <Flex flexDirection="column">
              {this.renderLocations(locationNames)}
            </Flex>
          </Flex>
        )}

        <Spacer mt={2} />
      </>
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
