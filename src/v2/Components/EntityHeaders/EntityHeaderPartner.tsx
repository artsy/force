import { ContextModule } from "@artsy/cohesion"
import { Avatar, BoxProps, Text, Flex } from "@artsy/palette"
import { Badge } from "@artsy/palette/dist/elements/Badge/Badge" // TODO: Fix me
import { compact, uniq } from "lodash"
import { FC, Fragment } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { extractNodes } from "v2/Utils/extractNodes"
import { EntityHeaderPartner_partner } from "v2/__generated__/EntityHeaderPartner_partner.graphql"
import { FollowProfileButtonFragmentContainer } from "../FollowButton/FollowProfileButton"

const DISPLAYABLE_BADGES = ["black-owned", "women-owned"]

export interface EntityHeaderPartnerProps extends BoxProps {
  partner: EntityHeaderPartner_partner
  displayAvatar?: boolean
  displayLink?: boolean
  FollowButton?: JSX.Element
}

const EntityHeaderPartner: FC<EntityHeaderPartnerProps> = ({
  partner,
  displayAvatar = true,
  displayLink = true,
  FollowButton,
  ...rest
}) => {
  const { user } = useSystemContext()

  const locations = extractNodes(partner.locationsConnection)
  const meta = uniq(locations.map(location => location.city?.trim())).join(", ")
  const image =
    partner.profile?.icon?.cropped ?? partner.profile?.avatar?.cropped
  const initials = partner.initials ?? partner.name?.[0]
  const badges = compact(
    (partner.categories ?? []).filter(category =>
      DISPLAYABLE_BADGES.includes(category?.slug ?? "")
    )
  )
  const isFollowable =
    partner && partner.type !== "Auction House" && !!partner.profile

  return (
    <Flex
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      <Flex
        {...(displayLink
          ? { as: RouterLink, to: partner.href, textDecoration: "none" }
          : {})}
        display="flex"
        alignItems="center"
        minWidth={0}
        flex={1}
      >
        {displayAvatar && (image || initials) && (
          <Avatar size="xs" mr={1} initials={initials} lazyLoad {...image} />
        )}

        <Flex flexDirection="column" mr={1} flex={1} overflow="hidden">
          <Text variant="md" lineClamp={2}>
            {partner.name}
          </Text>

          <Text variant="md">
            {badges.map(badge => (
              <Fragment key={badge.slug}>
                <Badge>{badge.name}</Badge>{" "}
              </Fragment>
            ))}
          </Text>

          {meta && (
            <Text variant="xs" color="black60" overflowEllipsis>
              {meta}
            </Text>
          )}
        </Flex>
      </Flex>

      {isFollowable &&
        (FollowButton || (
          <FollowProfileButtonFragmentContainer
            user={user}
            profile={partner.profile!}
            contextModule={ContextModule.partnerHeader}
            buttonProps={{ size: "small", variant: "secondaryOutline" }}
          />
        ))}
    </Flex>
  )
}

export const EntityHeaderPartnerFragmentContainer = createFragmentContainer(
  EntityHeaderPartner,
  {
    partner: graphql`
      fragment EntityHeaderPartner_partner on Partner {
        internalID
        type
        slug
        href
        name
        initials
        locationsConnection(first: 15) {
          edges {
            node {
              city
            }
          }
        }
        categories {
          name
          slug
        }
        profile {
          ...FollowProfileButton_profile
          avatar: image {
            cropped(width: 45, height: 45) {
              src
              srcSet
            }
          }
          icon {
            cropped(
              width: 45
              height: 45
              version: ["untouched-png", "large", "square"]
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
