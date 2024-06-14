import { useRef } from "react"
import * as React from "react"
import { Box, BoxProps, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairBoothRail_show$data } from "__generated__/FairBoothRail_show.graphql"
import { FairBoothRailArtworksQueryRenderer as FairBoothRailArtworks } from "./FairBoothRailArtworks"
import { RouterLink } from "System/Components/RouterLink"
import { useTracking } from "react-tracking"
import {
  ActionType,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
  PageOwnerType,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import {
  initialBoothFilterState,
  useBoothsFilterContext,
} from "Apps/Fair/Components/BoothFilterContext"
import {
  paramsToSnakeCase,
  removeDefaultValues,
} from "Components/ArtworkFilter/Utils/urlBuilder"
import qs from "qs"
import { useRouter } from "System/Hooks/useRouter"

interface FairBoothRailProps extends BoxProps {
  show: FairBoothRail_show$data
}

export const FairBoothRail: React.FC<FairBoothRailProps> = ({
  show,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()
  const { filters } = useBoothsFilterContext()
  const { match } = useRouter()
  let link: string | null = null

  const tappedViewTrackingData: ClickedArtworkGroup = {
    context_module: ContextModule.galleryBoothRail,
    context_page_owner_type: contextPageOwnerType as PageOwnerType,
    context_page_owner_id: contextPageOwnerId,
    context_page_owner_slug: contextPageOwnerSlug,
    destination_page_owner_type: OwnerType.show,
    destination_page_owner_id: show.internalID,
    destination_page_owner_slug: show.slug,
    type: "viewAll",
    action: ActionType.clickedArtworkGroup,
  }

  if (show.href) {
    const params = removeDefaultValues(filters!, {
      defaultValues: initialBoothFilterState,
    })
    const preparedParams = paramsToSnakeCase(params)
    const queryString = qs.stringify({
      ...preparedParams,
      focused_booths: true,
    })
    const backHref = `${match.location.pathname}?${queryString}`
    const encodedBackHref = encodeURIComponent(backHref)

    link = `${show.href}?back_to_fair_href=${encodedBackHref}`
  }

  return (
    <>
      <Box ref={ref as any} {...rest}>
        <Flex mb={[2, 4]} pr={[1, 0]}>
          <Box flex="1">
            <Text as="h3" variant="lg-display">
              <RouterLink
                to={link}
                textDecoration="none"
                onClick={() => tracking.trackEvent(tappedViewTrackingData)}
              >
                {show.partner?.name || ""}
              </RouterLink>
            </Text>

            {show.counts?.artworks && (
              <Text as="h3" variant="lg-display" color="black60" mb={1}>
                {show.counts.artworks} work
                {show.counts.artworks === 1 ? "" : "s"}
              </Text>
            )}
          </Box>

          {link && (
            <Text
              variant="sm-display"
              onClick={() => tracking.trackEvent(tappedViewTrackingData)}
            >
              <RouterLink to={link}>View</RouterLink>
            </Text>
          )}
        </Flex>

        <Box>
          <FairBoothRailArtworks id={show.internalID} />
        </Box>
      </Box>
    </>
  )
}

export const FairBoothRailFragmentContainer = createFragmentContainer(
  FairBoothRail,
  {
    show: graphql`
      fragment FairBoothRail_show on Show {
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
