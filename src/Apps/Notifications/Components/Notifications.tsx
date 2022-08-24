import { Flex, Text } from "@artsy/palette"
import { graphql } from "react-relay"
import { NotificationsQuery } from "__generated__/NotificationsQuery.graphql"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useContext } from "react"
import { SystemContext } from "System"
import { NotificationsListFragmentContainer } from "Components/Notifications/NotificationsList"

export const NotificationsQueryRenderer = () => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <SystemQueryRenderer<NotificationsQuery>
      environment={relayEnvironment}
      query={graphql`
        query NotificationsQuery {
          viewer {
            ...NotificationsList_viewer
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

        // TODO: Style loading state
        if (!props || !props.viewer) {
          return (
            <Flex justifyContent="center">
              <Text variant="xs">Loading</Text>
            </Flex>
          )
        }

        return <NotificationsListFragmentContainer viewer={props.viewer} />
      }}
    />
  )
}
