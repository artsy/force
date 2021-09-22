import React, { useRef } from "react"
import { Box, BoxProps, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionArtworksRail_sale } from "v2/__generated__/AuctionArtworksRail_sale.graphql"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useLazyLoadComponent } from "v2/Utils/Hooks/useLazyLoadComponent"
import { AuctionArtworksRailArtworksQueryRenderer } from "./AuctionArtworksRailArtworks"
import { AuctionArtworksRailPlaceholder } from "../AuctionArtworksRailPlaceholder"
import { tabTypeToContextModuleMap } from "../../Utils/tabTypeToContextModuleMap"
import { useTracking } from "react-tracking"
import {
  ActionType,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
  PageOwnerType,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/System"

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

export const AuctionArtworksRail: React.FC<AuctionArtworksRailProps> = ({
  sale,
  tabType,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { trackEvent } = useTracking()
  const { isEnteredView, Waypoint } = useLazyLoadComponent({ threshold: 2000 })
  const { contextPageOwnerType } = useAnalyticsContext()
  const contextModule = tabTypeToContextModuleMap[tabType]

  const trackViewSaleClick = () => {
    trackEvent(
      tracks.clickedArtworkGroupHeader(
        contextModule,
        contextPageOwnerType!,
        sale.internalID,
        sale.slug
      )
    )
  }

  return (
    <>
      <Waypoint />

      <Box ref={ref as any} {...rest}>
        <Box display="flex" mb={[2, 4]} pr={[1, 0]}>
          <Box flex="1">
            <Text as="h3" variant="lg" color="black100">
              <RouterLink
                to={sale.href}
                noUnderline
                onClick={trackViewSaleClick}
              >
                {sale.name}
              </RouterLink>
            </Text>
            <Text as="h3" variant="lg" color="black60" mb={1}>
              {sale.formattedStartDateTime}
            </Text>
          </Box>

          <Text variant="sm" color="black100">
            <RouterLink to={sale.href} onClick={trackViewSaleClick}>
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

const tracks = {
  clickedArtworkGroupHeader: (
    contextModule: ContextModule,
    contextPageOwnerType: PageOwnerType,
    saleID: string,
    saleSlug: string
  ): ClickedArtworkGroup => ({
    action: ActionType.clickedArtworkGroup,
    context_module: contextModule,
    context_page_owner_type: contextPageOwnerType,
    destination_page_owner_id: saleID,
    destination_page_owner_slug: saleSlug,
    destination_page_owner_type: OwnerType.sale,
    type: "viewAll",
  }),
}
