import { AnalyticsSchema } from "v2/Artsy/Analytics"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import React, { useContext } from "react"
import { graphql } from "react-relay"

import { SystemContext } from "v2/Artsy"
import { get } from "v2/Utils/get"

import {
  LoadProgressRenderer,
  renderWithLoadProgress,
} from "v2/Artsy/Relay/renderWithLoadProgress"

import {
  NotificationsMenuQuery,
  NotificationsMenuQueryResponse,
} from "v2/__generated__/NotificationsMenuQuery.graphql"

import {
  Box,
  Flex,
  Image,
  Link,
  Menu,
  MenuItem,
  Sans,
  Separator,
  Serif,
} from "@artsy/palette"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"

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
      {notifications.map(({ node }, index) => {
        const { artists, href, image, summary } = node
        const worksForSaleHref = href + "/works-for-sale"
        return (
          <MenuItem
            href={worksForSaleHref}
            key={index}
            onClick={() => {
              handleClick(href, AnalyticsSchema.Subject.Notification)
            }}
          >
            <Flex alignItems="center">
              <Box width={40} height={40} bg="black5" mr={1}>
                <Image
                  src={image.resized.url}
                  width={40}
                  height={40}
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box>
                <Sans size="2">{summary}</Sans>
                <Sans size="2" weight="medium">
                  {artists}
                </Sans>
              </Box>
            </Flex>
          </MenuItem>
        )
      })}

      <Flex py={1} flexDirection="column" alignItems="center">
        <>
          {notifications.length === 0 && (
            <Flex width="100%" flexDirection="column">
              <Box pt={1} pb={3} width="100%" textAlign="center">
                <Serif size="3">No new works</Serif>
              </Box>
            </Flex>
          )}

          <Box width="100%" px={2}>
            <Separator />
          </Box>

          <Box pt={2}>
            <Sans size="2">
              <Link
                href="/works-for-you"
                onClick={() => {
                  handleClick("/works-for-you", AnalyticsSchema.Subject.ViewAll)
                }}
              >
                View all
              </Link>
            </Sans>
          </Box>
        </>
      </Flex>
    </>
  )
}

/**
 * The <Menu /> component renders a QueryRenderer inside of it, which fetches
 * individual MenuItems for display. During fetch there is a loading spinner.
 */
export const NotificationsMenu: React.FC = () => {
  return (
    <Menu title="Activity">
      <NotificationsQueryRenderer
        render={renderWithLoadProgress(
          NotificationMenuItems,
          {},
          {},
          { size: "small" }
        )}
      />
    </Menu>
  )
}

/**
 * This QueryRenderer is also shared with NotificationBadge. Once the request
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
                      resized(height: 40, width: 40) {
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
