import React from "react"
import {
  Box,
  Flex,
  ResponsiveBox,
  Image,
  Text,
  BorderBox,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useAnalyticsContext, useSystemContext, useTracking } from "v2/System"
import {
  ActionType,
  ClickedPartnerCard,
  ContextModule,
  OwnerType,
  PageOwnerType,
} from "@artsy/cohesion"
import { FairExhibitorCard_partner } from "v2/__generated__/FairExhibitorCard_partner.graphql"
import { Media } from "v2/Utils/Responsive"
import { uniq } from "lodash"
import { FollowProfileButtonFragmentContainer as FollowProfileButton } from "v2/Components/FollowButton/FollowProfileButton"
import { RouterLink } from "v2/System/Router/RouterLink"

interface FairExhibitorCardProps {
  partner: FairExhibitorCard_partner
}

const VISIBLE_CITIES_NUM = 2

export const FairExhibitorCard: React.FC<FairExhibitorCardProps> = ({
  partner,
}) => {
  const { name, profile, locations } = partner
  const { user } = useSystemContext()
  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const tappedPartnerTrackingData: ClickedPartnerCard = {
    context_module: ContextModule.galleryBoothRail,
    context_page_owner_type: contextPageOwnerType as PageOwnerType,
    context_page_owner_id: contextPageOwnerId,
    context_page_owner_slug: contextPageOwnerSlug,
    destination_page_owner_type: OwnerType.fair,
    destination_page_owner_id: partner.internalID,
    destination_page_owner_slug: partner.slug,
    type: "thumbnail",
    action: ActionType.clickedPartnerCard,
  }

  const partnerAddress = () => {
    const { edges } = locations || {}
    const cities = uniq(edges?.map(edge => edge?.node?.city?.trim()))
    if (!cities) {
      return null
    }

    const visibleCities = cities.slice(0, VISIBLE_CITIES_NUM).join(", ")

    if (cities.length > VISIBLE_CITIES_NUM) {
      return `${visibleCities}, +${cities.length - VISIBLE_CITIES_NUM} more`
    }

    return visibleCities
  }

  return (
    <Box>
      <RouterLink
        to={partner.href}
        noUnderline
        onClick={() => tracking.trackEvent(tappedPartnerTrackingData)}
      >
        <Flex mb={1} flex={1}>
          <BorderBox width={52} height={52} p={0} mr={1}>
            {profile?.icon?.cropped && (
              <img
                src={profile?.icon?.cropped?.src}
                srcSet={profile?.icon?.cropped?.srcSet}
                alt={`Logo of ${name}`}
                width={50}
                height={50}
              />
            )}
          </BorderBox>
          <Box overflow="hidden">
            <Text variant="md" overflowEllipsis>
              {name}
            </Text>
            {locations?.totalCount && locations.edges ? (
              <Text variant="md" color="black60" overflowEllipsis>
                {partnerAddress()}
              </Text>
            ) : null}
          </Box>
          {partner.profile && (
            <Box order={2} ml="auto">
              <FollowProfileButton
                profile={partner.profile}
                user={user}
                contextModule={ContextModule.partnerHeader}
                buttonProps={{
                  size: "small",
                  variant: "secondaryOutline",
                  width: 70,
                  height: 30,
                }}
              />
            </Box>
          )}
        </Flex>
      </RouterLink>

      <Media greaterThan="xs">
        <RouterLink
          to={partner.href}
          noUnderline
          onClick={() => tracking.trackEvent(tappedPartnerTrackingData)}
        >
          <BorderBox p={0}>
            <ResponsiveBox aspectWidth={400} aspectHeight={250} maxHeight={400}>
              {profile?.image?.url ? (
                <Image
                  width="100%"
                  height="100%"
                  src={profile.image.url}
                  alt="Please make sure you describe the image"
                />
              ) : null}
            </ResponsiveBox>
          </BorderBox>
        </RouterLink>
      </Media>
    </Box>
  )
}

export const FairExhibitorCardFragmentContainer = createFragmentContainer(
  FairExhibitorCard,
  {
    partner: graphql`
      fragment FairExhibitorCard_partner on Partner {
        name
        href
        internalID
        slug
        profile {
          ...FollowProfileButton_profile
          icon {
            cropped(width: 50, height: 50) {
              src
              srcSet
            }
          }
          image {
            url(version: "medium")
          }
        }
        locations: locationsConnection(first: 20) {
          totalCount
          edges {
            node {
              city
            }
          }
        }
      }
    `,
  }
)
