import React, { useRef } from "react"
import { Box, BoxProps, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionArtworksRail_sale } from "v2/__generated__/AuctionArtworksRail_sale.graphql"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { useLazyLoadComponent } from "v2/Utils/Hooks/useLazyLoadComponent"
import { AuctionArtworksRailArtworksQueryRenderer } from "./AuctionArtworksRailArtworks"
import { AuctionArtworksRailPlaceholder } from "./AuctionArtworksRailPlaceholder"

interface AuctionArtworksRailProps extends BoxProps {
  sale: AuctionArtworksRail_sale
}

/**
 * Though it is likely to exist, the sale message line may be missing.
 * In order to avoid the page shifting between the loading state and the ready state,
 * we need to hardcode the height.
 */
export const AUCTION_ARTWORKS_RAIL_HEIGHT = 233
export const AUCTION_ARTWORKS_IMAGE_HEIGHT = 160

export const AuctionArtworksRail: React.FC<AuctionArtworksRailProps> = ({
  sale,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { isEnteredView, Waypoint } = useLazyLoadComponent()

  return (
    <>
      <Waypoint />

      <Box ref={ref as any} {...rest}>
        <Box display="flex" mb={1}>
          <Box flex="1">
            <Text as="h3" variant="subtitle" fontWeight="bold">
              <RouterLink to={sale.href} noUnderline>
                {sale.name}
              </RouterLink>
            </Text>
            <Text mb={1}>{sale.formattedStartDateTime}</Text>
          </Box>

          {sale.href && (
            <Text variant="subtitle" color="black60">
              <RouterLink to={sale.href} noUnderline>
                View
              </RouterLink>
            </Text>
          )}
        </Box>

        <Box height={AUCTION_ARTWORKS_RAIL_HEIGHT}>
          {isEnteredView ? (
            <AuctionArtworksRailArtworksQueryRenderer id={sale.internalID} />
          ) : (
            <AuctionArtworksRailPlaceholder />
          )}
        </Box>
      </Box>
    </>
  )
}

export const AuctionArtworksRailFragmentContainer = createFragmentContainer(
  AuctionArtworksRail,
  {
    sale: graphql`
      fragment AuctionArtworksRail_sale on Sale {
        internalID
        slug
        href
        name
        formattedStartDateTime
      }
    `,
  }
)
