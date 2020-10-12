import React from "react"
import { ContextModule, Intent } from "@artsy/cohesion"
import { createFragmentContainer, graphql } from "react-relay"
import { Clickable, EntityHeader, Text } from "@artsy/palette"
import { useSystemContext } from "v2/Artsy"
import { filterLocations } from "v2/Apps/Artwork/Utils/filterLocations"
import { limitWithCount } from "v2/Apps/Artwork/Utils/limitWithCount"
import { FollowProfileButtonFragmentContainer as FollowProfileButton } from "v2/Components/FollowButton/FollowProfileButton"
import { ShowPartnerEntityHeader_partner } from "v2/__generated__/ShowPartnerEntityHeader_partner.graphql"
import { openAuthToFollowSave } from "v2/Utils/openAuthModal"

interface ShowPartnerEntityHeaderProps {
  partner: ShowPartnerEntityHeader_partner
}

const ShowPartnerEntityHeader: React.FC<ShowPartnerEntityHeaderProps> = ({
  partner,
}) => {
  const { user, mediator } = useSystemContext()

  if (!partner) {
    return null
  }

  const imageUrl = partner.profile?.icon?.url
  const partnerInitials = partner.initials
  const canFollow =
    partner && partner.type !== "Auction House" && !!partner.profile
  const locationNames = limitWithCount(
    filterLocations(partner.locations),
    2
  ).join(", ")

  const handleOpenAuthModal = () => {
    openAuthToFollowSave(mediator, {
      intent: Intent.followPartner,
      entity: { slug: partner.slug, name: partner.name },
      contextModule: ContextModule.partnerHeader, // ?
    })
  }

  return (
    <EntityHeader
      name={partner.name}
      href={partner.isDefaultProfilePublic && partner.href}
      meta={locationNames}
      imageUrl={imageUrl}
      initials={partnerInitials}
      FollowButton={
        canFollow && (
          <FollowProfileButton
            user={user}
            profile={partner.profile}
            onOpenAuthModal={handleOpenAuthModal}
            render={profile => {
              return (
                <Clickable textDecoration="underline" data-test="followButton">
                  <Text>{profile.is_followed ? "Following" : "Follow"}</Text>
                </Clickable>
              )
            }}
          />
        )
      }
    />
  )
}

export const ShowPartnerEntityHeaderFragmentContainer = createFragmentContainer(
  ShowPartnerEntityHeader,
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
