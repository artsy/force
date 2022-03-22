import { ContextModule } from "@artsy/cohesion"
import { Text, BoxProps, Flex, Avatar } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { EntityHeaderFairOrganizer_fairOrganizer } from "v2/__generated__/EntityHeaderFairOrganizer_fairOrganizer.graphql"
import { FollowProfileButtonFragmentContainer } from "../FollowButton/FollowProfileButton"

export interface EntityHeaderFairOrganizerProps extends BoxProps {
  fairOrganizer: EntityHeaderFairOrganizer_fairOrganizer
  displayAvatar?: boolean
  displayLink?: boolean
  FollowButton?: JSX.Element
}

const EntityHeaderFairOrganizer: FC<EntityHeaderFairOrganizerProps> = ({
  fairOrganizer,
  displayAvatar = true,
  displayLink = true,
  FollowButton,
  ...rest
}) => {
  const { user } = useSystemContext()

  const initials = fairOrganizer.profile?.initials ?? fairOrganizer.name?.[0]
  const image = fairOrganizer.profile?.avatar?.cropped
  const totalCount = fairOrganizer.fairsConnection?.totalCount ?? 0
  const meta =
    totalCount > 0 ? `${totalCount} Fair${totalCount === 1 ? "" : "s"}` : ""

  return (
    <Flex
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      <Flex
        {...(displayLink && fairOrganizer.profile?.href
          ? {
              as: RouterLink,
              to: fairOrganizer.profile?.href,
              textDecoration: "none",
            }
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
            {fairOrganizer.name}
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
          profile={fairOrganizer.profile!}
          contextModule={ContextModule.fairsHeader}
          buttonProps={{ size: "small", variant: "secondaryOutline" }}
        />
      )}
    </Flex>
  )
}

export const EntityHeaderFairOrganizerFragmentContainer = createFragmentContainer(
  EntityHeaderFairOrganizer,
  {
    fairOrganizer: graphql`
      fragment EntityHeaderFairOrganizer_fairOrganizer on FairOrganizer {
        internalID
        slug
        name
        fairsConnection {
          totalCount
        }
        profile {
          ...FollowProfileButton_profile
          href
          initials
          avatar: image {
            cropped(width: 45, height: 45) {
              src
              srcSet
            }
          }
        }
      }
    `,
  }
)
