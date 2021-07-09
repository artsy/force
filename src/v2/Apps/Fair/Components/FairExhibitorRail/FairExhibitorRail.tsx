import React, { useRef } from "react"
import { Box, BoxProps, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairExhibitorRail_show } from "v2/__generated__/FairExhibitorRail_show.graphql"
import { useLazyLoadComponent } from "v2/Utils/Hooks/useLazyLoadComponent"
import { FairExhibitorRailArtworksQueryRenderer as FairExhibitorRailArtworks } from "./FairExhibitorRailArtworks"
import { FairExhibitorRailPlaceholder } from "./FairExhibitorRailPlaceholder"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useTracking } from "react-tracking"
import {
  ActionType,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/System/Analytics/AnalyticsContext"

interface FairExhibitorRailProps extends BoxProps {
  show: FairExhibitorRail_show
}

export const FairExhibitorRail: React.FC<FairExhibitorRailProps> = ({
  show,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const tracking = useTracking()
  const { isEnteredView, Waypoint } = useLazyLoadComponent({ threshold: 2000 })
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const tappedViewTrackingData: ClickedArtworkGroup = {
    context_module: ContextModule.galleryBoothRail,
    // @ts-expect-error STRICT_NULL_CHECK
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
        <Flex mb={[2, 4]} pr={[1, 0]}>
          <Box flex="1">
            <Text as="h3" variant="lg">
              <RouterLink
                to={show.href}
                noUnderline
                onClick={() => tracking.trackEvent(tappedViewTrackingData)}
              >
                {/* @ts-expect-error STRICT_NULL_CHECK */}
                {show.partner.name}
              </RouterLink>
            </Text>

            <Text as="h3" variant="lg" color="black60" mb={1}>
              {/* @ts-expect-error STRICT_NULL_CHECK */}
              {show.counts.artworks} work{show.counts.artworks === 1 ? "" : "s"}
            </Text>
          </Box>

          {show.href && (
            <Text
              variant="md"
              onClick={() => tracking.trackEvent(tappedViewTrackingData)}
            >
              <RouterLink to={show.href}>View</RouterLink>
            </Text>
          )}
        </Flex>

        <Box>
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
