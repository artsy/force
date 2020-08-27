import { AnalyticsSchema } from "v2/Artsy/Analytics"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import React, { useContext } from "react"
import { graphql } from "react-relay"
import { SystemContext } from "v2/Artsy"
import { get } from "v2/Utils/get"
import { LoadProgressRenderer } from "v2/Artsy/Relay/renderWithLoadProgress"
import {
  NotificationsMenuQuery,
  NotificationsMenuQueryResponse,
} from "v2/__generated__/NotificationsMenuQuery.graphql"
import {
  Box,
  Image,
  Link,
  Separator,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { Menu, MenuItem, MenuItemPlaceholder } from "v2/Components/Menu"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"

interface NotificationMenuItemContentProps {
  image: JSX.Element
  summary: JSX.Element
  artists: JSX.Element
}

const NotificationMenuItemContent: React.FC<NotificationMenuItemContentProps> = ({
  image,
  summary,
  artists,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width={40} height={40} bg="black5" mr={1}>
        {image}
      </Box>

      <Box>
        {summary}
        {artists}
      </Box>
    </Box>
  )
}

const NotificationMenuItemPlaceholder = () => {
  return (
    <MenuItemPlaceholder>
      <NotificationMenuItemContent
        image={<SkeletonBox width="100%" height="100%" />}
        summary={<SkeletonText variant="small">N works added</SkeletonText>}
        artists={<SkeletonText variant="small">Pending artists</SkeletonText>}
      />
    </MenuItemPlaceholder>
  )
}

export const NotificationMenuItems: React.FC<NotificationsMenuQueryResponse> = props => {
  const notifications = get(
    props,
    p => {
      return p.me.followsAndSaves.notifications.edges
    },
    []
  )

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
      {notifications.map(
        ({ node: { artists, href, image, summary } }, index) => {
          return (
            <MenuItem
              href={`${href}/works-for-sale`}
              key={index}
              aria-label={`${summary} by ${artists}`}
              onClick={() => {
                handleClick(href, AnalyticsSchema.Subject.Notification)
              }}
            >
              <NotificationMenuItemContent
                aria-hidden="true"
                image={
                  <Image
                    src={image.thumb.url}
                    width={40}
                    height={40}
                    alt={summary}
                  />
                }
                summary={<Text variant="small">{summary}</Text>}
                artists={
                  <Text variant="small" fontWeight="bold">
                    {artists}
                  </Text>
                }
              />
            </MenuItem>
          )
        }
      )}

      {notifications.length === 0 && (
        <MenuItemPlaceholder justifyContent="center">
          <Text variant="small">No new works</Text>
        </MenuItemPlaceholder>
      )}

      <Box px={2}>
        <Separator />
      </Box>

      <Link
        display="block"
        aria-label="View all notifications"
        href="/works-for-you"
        onClick={() => {
          handleClick("/works-for-you", AnalyticsSchema.Subject.ViewAll)
        }}
      >
        <Text variant="text" textAlign="center" p={2}>
          View all
        </Text>
      </Link>
    </>
  )
}

const NotificationsLoadingState: React.FC = () => {
  return (
    <>
      <NotificationMenuItemPlaceholder />
      <NotificationMenuItemPlaceholder />

      <Box px={2}>
        <Separator />
      </Box>

      <SkeletonText variant="text" textAlign="center" p={2}>
        View all
      </SkeletonText>
    </>
  )
}

/**
 * The <Menu /> component renders a QueryRenderer inside of it, which fetches
 * individual MenuItems for display. During fetch there is a custom placeholder
 */
export const NotificationsMenu: React.FC = () => {
  return (
    <Menu title="Activity" py={0} pt={1} aria-live="assertive">
      <NotificationsQueryRenderer
        render={({ error, props }) => {
          if (error) {
            return (
              <MenuItemPlaceholder justifyContent="center">
                <Text variant="small" color="red100">
                  {error.message}
                </Text>
              </MenuItemPlaceholder>
            )
          }

          if (!props) {
            return <NotificationsLoadingState />
          }

          return (
            <NotificationMenuItems
              {...(props as NotificationsMenuQueryResponse)}
            />
          )
        }}
      />
    </Menu>
  )
}

/**
 * This QueryRenderer is also shared with LoggedInActions. Once the request
 * is performed the data is cached at the network layer so menu data appears
 * immediately and doesn't require a second request.
 */
export const NotificationsQueryRenderer: React.FC<{
  render: LoadProgressRenderer<any>
}> = ({ render }) => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <QueryRenderer<NotificationsMenuQuery>
      environment={relayEnvironment}
      query={graphql`
        query NotificationsMenuQuery {
          me {
            unreadNotificationsCount
            followsAndSaves {
              notifications: bundledArtworksByArtistConnection(
                sort: PUBLISHED_AT_DESC
                first: 10
              ) @connection(key: "WorksForYou_notifications") {
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
        }
      `}
      variables={{}}
      render={render}
    />
  )
}
