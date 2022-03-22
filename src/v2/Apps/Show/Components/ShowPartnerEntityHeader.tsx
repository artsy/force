import * as React from "react"
import { ContextModule } from "@artsy/cohesion"
import { createFragmentContainer, graphql } from "react-relay"
import { EntityHeader } from "@artsy/palette"
import { useSystemContext } from "v2/System"
import { filterLocations } from "v2/Apps/Artwork/Utils/filterLocations"
import { limitWithCount } from "v2/Apps/Artwork/Utils/limitWithCount"
import { FollowProfileButtonFragmentContainer as FollowProfileButton } from "v2/Components/FollowButton/FollowProfileButton"
import { ShowPartnerEntityHeader_partner } from "v2/__generated__/ShowPartnerEntityHeader_partner.graphql"

interface ShowEntityHeaderPartnerProps {
  partner: ShowPartnerEntityHeader_partner
}

const ShowEntityHeaderPartner: React.FC<ShowEntityHeaderPartnerProps> = ({
  partner,
}) => {
  const { user } = useSystemContext()

  if (!partner) {
    return null
  }

  const imageUrl = partner.profile?.icon?.url
  const partnerInitials = partner.initials
  const canFollow =
    partner && partner.type !== "Auction House" && !!partner.profile
  const locationNames = limitWithCount(
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    filterLocations(partner.locations),
    2
  ).join(", ")

  return (
    <EntityHeader
      name={partner.name ?? ""}
      href={
        partner.isDefaultProfilePublic && partner.href
          ? partner.href
          : undefined
      }
      meta={locationNames}
      imageUrl={imageUrl!}
      initials={partnerInitials!}
      FollowButton={
        canFollow ? (
          <FollowProfileButton
            user={user}
            profile={partner.profile!}
            contextModule={ContextModule.partnerHeader}
            buttonProps={{ size: "small", variant: "secondaryOutline" }}
          />
        ) : undefined
      }
    />
  )
}

export const ShowPartnerEntityHeaderFragmentContainer = createFragmentContainer(
  ShowEntityHeaderPartner,
  {
    partner: graphql`
      fragment ShowPartnerEntityHeader_partner on Partner {
        type
        slug
        href
        name
        initials
        locations {
          city
        }
        isDefaultProfilePublic
        profile {
          ...FollowProfileButton_profile
          icon {
            url(version: "square140")
          }
        }
      }
    `,
  }
)
