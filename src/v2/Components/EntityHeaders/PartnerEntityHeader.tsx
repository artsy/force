import { ContextModule } from "@artsy/cohesion"
import { BoxProps, EntityHeader } from "@artsy/palette"
import { uniq } from "lodash"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { extractNodes } from "v2/Utils/extractNodes"
import { PartnerEntityHeader_partner } from "v2/__generated__/PartnerEntityHeader_partner.graphql"
import { FollowProfileButtonFragmentContainer } from "../FollowButton/FollowProfileButton"

interface PartnerEntityHeaderProps extends BoxProps {
  partner: PartnerEntityHeader_partner
}

const PartnerEntityHeader: FC<PartnerEntityHeaderProps> = ({
  partner,
  ...rest
}) => {
  const { user } = useSystemContext()

  const locations = extractNodes(partner.locationsConnection)
  const meta = uniq(locations.map(location => location.city?.trim())).join(", ")
  const image = partner.profile?.avatar?.cropped
  const badgedPartners = partner
    .categories!.filter(category => ["black-owned"].includes(category!.slug))
    .map(category => ({ children: category!.name }))

  return (
    <EntityHeader
      name={partner.name!}
      initials={partner.initials ?? partner.name?.[0]}
      badges={badgedPartners}
      image={image!}
      meta={meta}
      href={`/partner/${partner.slug}`}
      FollowButton={
        <FollowProfileButtonFragmentContainer
          user={user}
          profile={partner.profile!}
          contextModule={ContextModule.partnerHeader}
          buttonProps={{ size: "small", variant: "secondaryOutline" }}
        />
      }
      {...rest}
    />
  )
}

export const PartnerEntityHeaderFragmentContainer = createFragmentContainer(
  PartnerEntityHeader,
  {
    partner: graphql`
      fragment PartnerEntityHeader_partner on Partner {
        internalID
        slug
        name
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
          avatar: image {
            cropped(width: 45, height: 45) {
              src
              srcSet
            }
          }
        }
        categories {
          name
          slug
        }
      }
    `,
  }
)
