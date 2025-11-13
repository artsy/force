import { FollowProfileButtonQueryRenderer } from "Components/FollowButton/FollowProfileButton"
import { RouterLink } from "System/Components/RouterLink"
import { ContextModule } from "@artsy/cohesion"
import { Avatar, type BoxProps, Flex, Text } from "@artsy/palette"
import type { EntityHeaderFair_fair$data } from "__generated__/EntityHeaderFair_fair.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface EntityHeaderFairProps extends BoxProps {
  fair: EntityHeaderFair_fair$data
  displayAvatar?: boolean
  displayLink?: boolean
  FollowButton?: JSX.Element
}

const EntityHeaderFair: FC<React.PropsWithChildren<EntityHeaderFairProps>> = ({
  fair,
  displayAvatar = true,
  displayLink = true,
  FollowButton,
  ...rest
}) => {
  const image = fair?.avatar?.cropped
  const meta = [fair.startAt, fair.endAt].filter(Boolean).join(" – ")
  const initials = fair.profile?.initials ?? fair.name?.[0]

  return (
    <Flex
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      <Flex
        {...(displayLink
          ? { as: RouterLink, to: fair.href, textDecoration: "none" }
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
          <Text variant="sm-display" lineClamp={2}>
            {fair.name}
          </Text>

          {meta && (
            <Text variant="xs" color="mono60" overflowEllipsis>
              {meta}
            </Text>
          )}
        </Flex>
      </Flex>

      {FollowButton ||
        (fair.profile && (
          <FollowProfileButtonQueryRenderer
            id={fair.profile.internalID}
            contextModule={ContextModule.fairsHeader}
            size="small"
          />
        ))}
    </Flex>
  )
}

export const EntityHeaderFairFragmentContainer = createFragmentContainer(
  EntityHeaderFair,
  {
    fair: graphql`
      fragment EntityHeaderFair_fair on Fair {
        internalID
        href
        name
        startAt(format: "MMM Do")
        endAt(format: "MMM Do YYYY")
        avatar: image {
          cropped(width: 45, height: 45) {
            src
            srcSet
          }
        }
        profile {
          internalID
          initials
        }
      }
    `,
  }
)
