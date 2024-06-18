import { ContextModule } from "@artsy/cohesion"
import { BoxProps, Flex, Text, Avatar } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { EntityHeaderFair_fair$data } from "__generated__/EntityHeaderFair_fair.graphql"
import { FollowProfileButtonQueryRenderer } from "Components/FollowButton/FollowProfileButton"

export interface EntityHeaderFairProps extends BoxProps {
  fair: EntityHeaderFair_fair$data
  displayAvatar?: boolean
  displayLink?: boolean
  FollowButton?: JSX.Element
}

const EntityHeaderFair: FC<EntityHeaderFairProps> = ({
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
            <Text variant="xs" color="black60" overflowEllipsis>
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
