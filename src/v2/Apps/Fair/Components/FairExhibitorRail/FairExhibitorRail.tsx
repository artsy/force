import React, { useRef } from "react"
import { Box, BoxProps, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairExhibitorRail_show } from "v2/__generated__/FairExhibitorRail_show.graphql"
import { useLazyLoadComponent } from "v2/Utils/Hooks/useLazyLoadComponent"
import { FairExhibitorRailArtworksQueryRenderer as FairExhibitorRailArtworks } from "./FairExhibitorRailArtworks"
import { FairExhibitorRailPlaceholder } from "./FairExhibitorRailPlaceholder"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { useTracking } from "react-tracking"
import {
  ActionType,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"

interface FairExhibitorRailProps extends BoxProps {
  show: FairExhibitorRail_show
}

/**
 * Though it is likely to exist, the sale message line may be missing.
 * In order to avoid the page shifting between the loading state and the ready state,
 * we need to hardcode the height.
 */
export const FAIR_EXHIBITOR_RAIL_HEIGHT = 233
export const FAIR_EXHIBITOR_IMAGE_HEIGHT = 160

export const FairExhibitorRail: React.FC<FairExhibitorRailProps> = ({
  show,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const tracking = useTracking()
  const { isEnteredView, Waypoint } = useLazyLoadComponent()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const tappedViewTrackingData: ClickedArtworkGroup = {
    context_module: ContextModule.galleryBoothRail,
    context_page_owner_type: contextPageOwnerType,
    context_page_owner_id: contextPageOwnerId,
    context_page_owner_slug: contextPageOwnerSlug,
    destination_page_owner_type: OwnerType.show,
    destination_page_owner_id: show.internalID,
    destination_page_owner_slug: show.slug,
    type: "viewAll",
    action: ActionType.clickedArtworkGroup,
  }

  return (
    <>
      <Waypoint />

      <Box ref={ref as any} {...rest}>
        <Box display="flex" mb={1}>
          <Box flex="1">
            <Text as="h3" variant="subtitle">
              <RouterLink
                to={show.href}
                noUnderline
                onClick={() => tracking.trackEvent(tappedViewTrackingData)}
              >
                {show.partner.name}
              </RouterLink>
            </Text>

            <Text variant="text" color="black60" mb={1}>
              {show.counts.artworks} work{show.counts.artworks === 1 ? "" : "s"}
            </Text>
          </Box>

          {show.href && (
            <Text
              variant="subtitle"
              color="black60"
              onClick={() => tracking.trackEvent(tappedViewTrackingData)}
            >
              <RouterLink to={show.href} noUnderline>
                View
              </RouterLink>
            </Text>
          )}
        </Box>

        <Box height={FAIR_EXHIBITOR_RAIL_HEIGHT}>
          {isEnteredView ? (
            <FairExhibitorRailArtworks id={show.internalID} />
          ) : (
            <FairExhibitorRailPlaceholder />
          )}
        </Box>
      </Box>
    </>
  )
}

export const FairExhibitorRailFragmentContainer = createFragmentContainer(
  FairExhibitorRail,
  {
    show: graphql`
      fragment FairExhibitorRail_show on Show {
        internalID
        slug
        href
        partner {
          ... on Partner {
            name
          }
          ... on ExternalPartner {
            name
          }
        }
        counts {
          artworks
        }
      }
    `,
  }
)
