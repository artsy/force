import React from "react"
import { Box, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useAnalyticsContext, useSystemContext, useTracking } from "v2/System"
import {
  ActionType,
  ClickedPartnerCard,
  ContextModule,
  OwnerType,
  PageOwnerType,
} from "@artsy/cohesion"
import { FairExhibitorCard_exhibitor } from "v2/__generated__/FairExhibitorCard_exhibitor.graphql"
import { FollowProfileButtonFragmentContainer as FollowProfileButton } from "v2/Components/FollowButton/FollowProfileButton"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useRouter } from "v2/System/Router/useRouter"

interface FairExhibitorCardProps {
  exhibitor: FairExhibitorCard_exhibitor
}

const VISIBLE_CITIES_NUM = 2

export const FairExhibitorCard: React.FC<FairExhibitorCardProps> = ({
  exhibitor,
}) => {
  const { name, profile, cities, slug, internalID } = exhibitor.partner!
  const { user } = useSystemContext()
  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()
  const { match } = useRouter()

  const tappedPartnerTrackingData: ClickedPartnerCard = {
    context_module: ContextModule.galleryBoothRail,
    context_page_owner_type: contextPageOwnerType as PageOwnerType,
    context_page_owner_id: contextPageOwnerId,
    context_page_owner_slug: contextPageOwnerSlug,
    destination_page_owner_type: OwnerType.fair,
    destination_page_owner_id: internalID,
    destination_page_owner_slug: slug,
    type: "thumbnail",
    action: ActionType.clickedPartnerCard,
  }

  const { focused_exhibitor: focusedExhibitorID } = match.location.query
  const focused = focusedExhibitorID === exhibitor?.partner?.internalID

  const partnerAddress = (cities: readonly (string | null)[]) => {
    const visibleCities = cities.slice(0, VISIBLE_CITIES_NUM).join(", ")

    if (cities.length > VISIBLE_CITIES_NUM) {
      return `${visibleCities}, +${cities.length - VISIBLE_CITIES_NUM} more`
    }

    return visibleCities
  }

  return (
    <RouterLink
      // use from_fair param to display navigation banner on show
      to={`/show/${exhibitor.profileID}?from_fair=true`}
      textDecoration="none"
      display="block"
      onClick={() => tracking.trackEvent(tappedPartnerTrackingData)}
    >
      <Flex id={`jump--${exhibitor.partner?.internalID}`}>
        <Box>
          <Text variant="sm-display" overflow="clip">
            {name}
          </Text>
          {cities?.length ? (
            <Text variant="sm-display" color="black60" overflow="clip">
              {partnerAddress(cities)}
            </Text>
          ) : null}
        </Box>
        {profile && (
          <Box order={2} ml="auto">
            <FollowProfileButton
              profile={profile}
              user={user}
              contextModule={ContextModule.partnerHeader}
              buttonProps={{
                size: "small",
                variant: "secondaryOutline",
                width: 70,
                height: 30,
                focus: focused,
              }}
            />
          </Box>
        )}
      </Flex>
    </RouterLink>
  )
}

export const FairExhibitorCardFragmentContainer = createFragmentContainer(
  FairExhibitorCard,
  {
    exhibitor: graphql`
      fragment FairExhibitorCard_exhibitor on FairExhibitor {
        profileID
        partner {
          name
          internalID
          slug
          cities
          profile {
            ...FollowProfileButton_profile
          }
        }
      }
    `,
  }
)
