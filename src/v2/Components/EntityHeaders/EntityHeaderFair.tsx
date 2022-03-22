import { ContextModule } from "@artsy/cohesion"
import { BoxProps, Flex, Text, Avatar } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { EntityHeaderFair_fair } from "v2/__generated__/EntityHeaderFair_fair.graphql"
import { FollowProfileButtonFragmentContainer } from "../FollowButton/FollowProfileButton"

export interface EntityHeaderFairProps extends BoxProps {
  fair: EntityHeaderFair_fair
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
  const { user } = useSystemContext()

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
          <Text variant="md" lineClamp={2}>
            {fair.name}
          </Text>

          {meta && (
            <Text variant="xs" color="black60" overflowEllipsis>
              {meta}
            </Text>
          )}
        </Flex>
      </Flex>

      {FollowButton || (
        <FollowProfileButtonFragmentContainer
          user={user}
          profile={fair.profile!}
          contextModule={ContextModule.fairsHeader}
          buttonProps={{ size: "small", variant: "secondaryOutline" }}
        />
      )}
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
          ...FollowProfileButton_profile
          initials
        }
      }
    `,
  }
)
