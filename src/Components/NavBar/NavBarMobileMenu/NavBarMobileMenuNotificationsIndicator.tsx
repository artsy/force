import { useContext, useEffect } from "react"
import { useState } from "react"
import { graphql } from "react-relay"
import { NavBarMobileMenuNotificationsIndicatorQuery } from "__generated__/NavBarMobileMenuNotificationsIndicatorQuery.graphql"
import { SystemContext } from "System/SystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  checkAndSyncIndicatorsCount,
  IndicatorsCountState,
} from "Components/NavBar/helpers"
import { createFragmentContainer } from "react-relay"
import { NavBarMobileMenuNotificationsIndicator_me$data } from "__generated__/NavBarMobileMenuNotificationsIndicator_me.graphql"
import { NavBarNotificationIndicator } from "Components/NavBar/NavBarNotificationIndicator"

interface NavBarMobileMenuNotificationsIndicatorProps {
  me?: NavBarMobileMenuNotificationsIndicator_me$data | null
}

export const NavBarMobileMenuNotificationsIndicator: React.FC<NavBarMobileMenuNotificationsIndicatorProps> = ({
  me,
}) => {
  const [
    indicatorCounts,
    setIndicatorCounts,
  ] = useState<IndicatorsCountState | null>(null)
  const shouldDisplayIndicator =
    indicatorCounts?.hasConversations || indicatorCounts?.hasNotifications

  useEffect(() => {
    const result = checkAndSyncIndicatorsCount({
      notifications: me?.unreadNotificationsCount,
      conversations: me?.unreadConversationCount,
    })

    setIndicatorCounts(result)
  }, [me])

  if (!shouldDisplayIndicator) {
    return null
  }

  return (
    <NavBarNotificationIndicator position="absolute" top="5px" right="5px" />
  )
}

export const NavBarMobileMenuNotificationsIndicatorFragmentContainer = createFragmentContainer(
  NavBarMobileMenuNotificationsIndicator,
  {
    me: graphql`
      fragment NavBarMobileMenuNotificationsIndicator_me on Me {
        unreadConversationCount
        unreadNotificationsCount
      }
    `,
  }
)

export const NavBarMobileMenuNotificationsIndicatorQueryRenderer: React.FC<{}> = () => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <SystemQueryRenderer<NavBarMobileMenuNotificationsIndicatorQuery>
      environment={relayEnvironment}
      query={graphql`
        query NavBarMobileMenuNotificationsIndicatorQuery {
          me {
            ...NavBarMobileMenuNotificationsIndicator_me
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (props?.me) {
          return (
            <NavBarMobileMenuNotificationsIndicatorFragmentContainer
              me={props.me}
            />
          )
        }

        return <NavBarMobileMenuNotificationsIndicator />
      }}
    />
  )
}
