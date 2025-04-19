import {
  ActionType,
  type ClickedArtworkGroup,
  ContextModule,
  OwnerType,
  type PageOwnerType,
} from "@artsy/cohesion"
import { Box, type BoxProps, Flex, Text } from "@artsy/palette"
import {
  initialBoothFilterState,
  useBoothsFilterContext,
} from "Apps/Fair/Components/BoothFilterContext"
import { paramsToSnakeCase } from "Components/ArtworkFilter/Utils/paramsCasing"
import { removeDefaultValues } from "Components/ArtworkFilter/Utils/urlBuilder"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useRouter } from "System/Hooks/useRouter"
import type { FairBoothRail_show$data } from "__generated__/FairBoothRail_show.graphql"
import qs from "qs"
import { useRef } from "react"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { FairBoothRailArtworksQueryRenderer as FairBoothRailArtworks } from "./FairBoothRailArtworks"

interface FairBoothRailProps extends BoxProps {
  show: FairBoothRail_show$data
}

export const FairBoothRail: React.FC<
  React.PropsWithChildren<FairBoothRailProps>
> = ({ show, ...rest }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const tracking = useTracking()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
              <Text as="h3" variant="lg-display" color="mono60" mb={1}>
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
  },
)
