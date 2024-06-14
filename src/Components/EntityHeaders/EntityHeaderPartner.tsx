import { ContextModule } from "@artsy/cohesion"
import { Avatar, BoxProps, Text, Flex, Label } from "@artsy/palette"
import { compact, uniq } from "lodash"
import { FC, Fragment } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { EntityHeaderPartner_partner$data } from "__generated__/EntityHeaderPartner_partner.graphql"
import { FollowProfileButtonQueryRenderer } from "Components/FollowButton/FollowProfileButton"

const DISPLAYABLE_BADGES = ["black-owned", "women-owned"]

export interface EntityHeaderPartnerProps extends BoxProps {
  partner: EntityHeaderPartner_partner$data
  displayAvatar?: boolean
  displayLink?: boolean
  FollowButton?: JSX.Element
  href?: string
  onClick?(): void
  onFollow?(): void
}

const EntityHeaderPartner: FC<EntityHeaderPartnerProps> = ({
  partner,
  displayAvatar = true,
  displayLink = true,
  FollowButton,
  href,
  onClick,
  onFollow,
  ...rest
}) => {
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
          ? { as: RouterLink, to: href ?? partner.href, textDecoration: "none" }
          : {})}
        display="flex"
        alignItems="center"
        minWidth={0}
        flex={1}
        onClick={onClick}
      >
        {displayAvatar && (image || initials) && (
          <Avatar size="xs" mr={1} initials={initials} lazyLoad {...image} />
        )}

        <Flex flexDirection="column" mr={1} flex={1} overflow="hidden">
          <Text variant="sm-display" lineClamp={2}>
            {partner.name}
          </Text>

          <Text variant="sm-display">
            {badges.map(badge => (
              <Fragment key={badge.slug}>
                <Label>{badge.name?.replace(" ", "-")}</Label>{" "}
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
          <FollowProfileButtonQueryRenderer
            id={partner.profile.internalID}
            contextModule={ContextModule.partnerHeader}
            size="small"
            onFollow={onFollow}
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
          internalID
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
