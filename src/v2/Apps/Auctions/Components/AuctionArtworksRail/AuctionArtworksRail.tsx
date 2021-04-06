import React, { useRef } from "react"
import { Box, BoxProps, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionArtworksRail_sale } from "v2/__generated__/AuctionArtworksRail_sale.graphql"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { useLazyLoadComponent } from "v2/Utils/Hooks/useLazyLoadComponent"
import { AuctionArtworksRailArtworksQueryRenderer } from "./AuctionArtworksRailArtworks"
import { AuctionArtworksRailPlaceholder } from "../AuctionArtworksRailPlaceholder"
import { tabTypeToContextModuleMap } from "../../Utils/tabTypeToContextModuleMap"
import { useTracking } from "react-tracking"
import {
  clickedArtworkGroupHeader,
  ClickedArtworkGroupHeaderArgs,
  OwnerType,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/Artsy"

export type TabType =
  | "current"
  | "myBids"
  | "upcoming"
  | "past"
  | "worksByArtistsYouFollow"

interface AuctionArtworksRailProps extends BoxProps {
  sale: AuctionArtworksRail_sale
  tabType: TabType
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
  tabType,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { trackEvent } = useTracking()
  const { isEnteredView, Waypoint } = useLazyLoadComponent()
  const { contextPageOwnerType } = useAnalyticsContext()
  const contextModule = tabTypeToContextModuleMap[tabType]

  const trackViewSaleClick = () => {
    trackEvent(
      clickedArtworkGroupHeader({
        contextModule,
        contextPageOwnerType,
        destinationPageOwnerId: sale.internalID,
        destinationPageOwnerSlug: sale.slug,
        destinationPageOwnerType: OwnerType.sale,
        type: "viewAll",
        // FIXME: Remove this once cohesion pr has been automerged
      } as ClickedArtworkGroupHeaderArgs)
    )
  }

  return (
    <>
      <Waypoint />

      <Box ref={ref as any} {...rest}>
        <Box display="flex" mb={1}>
          <Box flex="1">
            <Text as="h3" variant="title">
              <RouterLink
                to={sale.href}
                noUnderline
                onClick={trackViewSaleClick}
              >
                {sale.name}
              </RouterLink>
            </Text>
            <Text mb={1}>{sale.formattedStartDateTime}</Text>
          </Box>

          <Text variant="subtitle" color="black60">
            <RouterLink to={sale.href} noUnderline onClick={trackViewSaleClick}>
              View all
            </RouterLink>
          </Text>
        </Box>
        {isEnteredView ? (
          <AuctionArtworksRailArtworksQueryRenderer
            id={sale.internalID}
            tabType={tabType}
          />
        ) : (
          <AuctionArtworksRailPlaceholder />
        )}
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
