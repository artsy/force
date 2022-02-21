import { AnalyticsSchema } from "v2/System/Analytics"
import { useTracking } from "v2/System/Analytics/useTracking"
import { useContext } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemContext } from "v2/System"
import { NavBarNotificationsQuery } from "v2/__generated__/NavBarNotificationsQuery.graphql"
import {
  Box,
  Flex,
  Image,
  Separator,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { NavBarMenuItemLink } from "./NavBarMenuItem"
import { extractNodes } from "v2/Utils/extractNodes"
import { NavBarNotifications_me$data } from "v2/__generated__/NavBarNotifications_me.graphql"

interface NavBarNotificationsItemContentProps {
  image: JSX.Element
  summary: JSX.Element
  artists: JSX.Element
}

const NavBarNotificationsItemContent: React.FC<NavBarNotificationsItemContentProps> = ({
  image,
  summary,
  artists,
}) => {
  return (
    <Flex alignItems="center">
      <Box width={40} height={40} bg="black5" mr={1}>
        {image}
      </Box>

      <Box>
        {summary}
        {artists}
      </Box>
    </Flex>
  )
}

const NavBarNotificationsItemPlaceholder = () => {
  return (
    <Skeleton px={2} py={1}>
      <NavBarNotificationsItemContent
        image={<SkeletonBox width="100%" height="100%" />}
        summary={<SkeletonText variant="xs">N works added</SkeletonText>}
        artists={<SkeletonText variant="xs">Pending artists</SkeletonText>}
      />
    </Skeleton>
  )
}

interface NavBarNotificationsProps {
  me: NavBarNotifications_me$data
}

export const NavBarNotifications: React.FC<NavBarNotificationsProps> = ({
  me,
}) => {
  const notifications = extractNodes(me?.followsAndSaves?.notifications)

  const { trackEvent } = useTracking()

  const handleClick = (href: string, subject: string) => {
    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      context_module: AnalyticsSchema.ContextModule.HeaderActivityDropdown,
      destination_path: href,
      subject,
    })
  }

  return (
    <>
      {notifications.map(({ artists, href, image, summary }, index) => {
        return (
          <NavBarMenuItemLink
            to={`${href}/works-for-sale`}
            key={index}
            aria-label={`${summary} by ${artists}`}
            onClick={() => {
              handleClick(href!, AnalyticsSchema.Subject.Notification)
            }}
          >
            <NavBarNotificationsItemContent
              aria-hidden="true"
              image={
                <Image
                  src={image?.thumb?.url}
                  width={40}
                  height={40}
                  alt=""
                  lazyLoad
                />
              }
              summary={<Text variant="xs">{summary}</Text>}
              artists={<Text variant="xs">{artists}</Text>}
            />
          </NavBarMenuItemLink>
        )
      })}

      {notifications.length === 0 && (
        <Text variant="sm" px={2} py={1} color="black60">
          No new works
        </Text>
      )}

      <Separator my={1} />

      <NavBarMenuItemLink
        aria-label="View all notifications"
        to="/works-for-you"
        onClick={() => {
          handleClick("/works-for-you", AnalyticsSchema.Subject.ViewAll)
        }}
      >
        <Text variant="sm" m="auto">
          View all
        </Text>
      </NavBarMenuItemLink>
    </>
  )
}

const NavBarNotificationsFragmentContainer = createFragmentContainer(
  NavBarNotifications,
  {
    me: graphql`
      fragment NavBarNotifications_me on Me {
        unreadNotificationsCount
        followsAndSaves {
          notifications: bundledArtworksByArtistConnection(
            sort: PUBLISHED_AT_DESC
            first: 10
          ) @connection(key: "NavBarNotifications_notifications") {
            edges {
              node {
                href
                summary
                artists
                published_at: publishedAt(format: "MMM DD")
                image {
                  thumb: cropped(height: 80, width: 80) {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
  }
)

const NavBarNotificationsPlaceholder: React.FC = () => {
  return (
    <>
      <NavBarNotificationsItemPlaceholder />
      <NavBarNotificationsItemPlaceholder />

      <Separator my={1} />

      <SkeletonText variant="sm" textAlign="center" px={2} py={1}>
        View all
      </SkeletonText>
    </>
  )
}

/**
 * The <Menu /> component renders a QueryRenderer inside of it, which fetches
 * individual MenuItems for display. During fetch there is a custom placeholder
 */
export const NavBarNotificationsQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <Flex width={230} py={1} flexDirection="column" aria-live="assertive">
      <Text variant="sm" px={2} py={1}>
        Activity
      </Text>

      <Separator my={1} />

      <SystemQueryRenderer<NavBarNotificationsQuery>
        environment={relayEnvironment}
        query={graphql`
          query NavBarNotificationsQuery {
            me {
              ...NavBarNotifications_me
            }
          }
        `}
        render={({ error, props }) => {
          if (error) {
            return (
              <Flex justifyContent="center">
                <Text variant="xs" color="red100">
                  {error.message}
                </Text>
              </Flex>
            )
          }

          if (!props || !props.me) {
            return <NavBarNotificationsPlaceholder />
          }

          return <NavBarNotificationsFragmentContainer me={props.me} />
        }}
      />
    </Flex>
  )
}
