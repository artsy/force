import {
  ActionType,
  ClickedGalleryGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import {
  Box,
  EntityHeader,
  Image,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { uniq } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "v2/System/Analytics/useTracking"
import { useSystemContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { extractNodes } from "v2/Utils/extractNodes"
import { PartnerCell_partner } from "v2/__generated__/PartnerCell_partner.graphql"
import { FollowProfileButtonFragmentContainer } from "v2/Components/FollowButton/FollowProfileButton"

interface PartnerCellProps {
  partner: PartnerCell_partner
}

const PartnerCell: React.FC<PartnerCellProps> = ({ partner }) => {
  const { user } = useSystemContext()
  const { trackEvent } = useTracking()

  const locations = extractNodes(partner.locationsConnection)
  const meta = uniq(locations.map(location => location.city?.trim())).join(", ")
  const image = partner.profile?.image?.cropped

  if (!partner.profile) {
    return null
  }

  return (
    <RouterLink
      to={`/partner${partner.href}`}
      display="block"
      textDecoration="none"
      width={325}
      onClick={() => {
        const trackingEvent: ClickedGalleryGroup = {
          action: ActionType.clickedGalleryGroup,
          context_module: ContextModule.featuredGalleriesRail,
          context_page_owner_type: OwnerType.home,
          destination_page_owner_id: partner.internalID,
          destination_page_owner_slug: partner.slug,
          destination_page_owner_type: OwnerType.galleries,
          type: "thumbnail",
        }

        trackEvent(trackingEvent)
      }}
    >
      <EntityHeader
        name={partner.name!}
        meta={meta}
        smallVariant
        mb={1}
        FollowButton={
          <FollowProfileButtonFragmentContainer
            user={user}
            profile={partner.profile}
            contextModule={ContextModule.partnerHeader}
            buttonProps={{ size: "small", variant: "secondaryOutline" }}
            onClick={() => {
              const trackingEvent: any = {
                action: partner.profile?.isFollowed
                  ? ActionType.unfollowedPartner
                  : ActionType.followedPartner,
                context_module: ContextModule.featuredGalleriesRail,
                context_owner_type: OwnerType.partner,
              }

              trackEvent(trackingEvent)
            }}
          />
        }
      />

      {image?.src ? (
        <Image
          src={image.src}
          srcSet={image.srcSet}
          width={325}
          height={244}
          alt=""
          lazyLoad
          style={{ display: "block" }}
        />
      ) : (
        <Text
          variant="lg"
          bg="black10"
          width={325}
          height={244}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {partner.initials}
        </Text>
      )}
    </RouterLink>
  )
}

export const PARTNER_CELL_PLACEHOLDER = (
  <Box width={325}>
    <SkeletonText variant="lg">Example Gallery</SkeletonText>

    <SkeletonText variant="md" mb={1}>
      Location
    </SkeletonText>

    <SkeletonBox width={325} height={244} />
  </Box>
)

export const PartnerCellFragmentContainer = createFragmentContainer(
  PartnerCell,
  {
    partner: graphql`
      fragment PartnerCell_partner on Partner {
        internalID
        slug
        name
        href
        initials
        locationsConnection(first: 15) {
          edges {
            node {
              city
            }
          }
        }
        profile {
          ...FollowProfileButton_profile
          isFollowed
          image {
            cropped(
              width: 325
              height: 244
              version: ["wide", "large", "featured", "larger"]
            ) {
              src
              srcSet
            }
          }
        }
      }
    `,
  }
)
