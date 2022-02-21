import { useContext } from "react"
import * as React from "react"
import { graphql } from "relay-runtime"
import { isServer } from "lib/isServer"
import styled from "styled-components"
import { NavBarMobileMenuInboxNotificationCountQuery } from "v2/__generated__/NavBarMobileMenuInboxNotificationCountQuery.graphql"
import { SystemContext } from "v2/System/SystemContext"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { getConversationCount, updateConversationCache } from "../helpers"
import { Text } from "@artsy/palette"
import { createFragmentContainer } from "react-relay"
import { NavBarMobileMenuInboxNotificationCount_me$data } from "v2/__generated__/NavBarMobileMenuInboxNotificationCount_me.graphql"

interface NavBarMobileMenuInboxNotificationCountProps {
  me?: NavBarMobileMenuInboxNotificationCount_me$data | null
}

export const NavBarMobileMenuInboxNotificationCount: React.FC<NavBarMobileMenuInboxNotificationCountProps> = ({
  me,
}) => {
  const conversationCount =
    me?.unreadConversationCount || getConversationCount()

  updateConversationCache(me?.unreadConversationCount)

  if (getConversationCount() === 0) return null

  return (
    <Container variant="xs" lineHeight={1} bg="brand" color="white100">
      {conversationCount}
    </Container>
  )
}

const NavBarMobileMenuInboxNotificationCountFragmentContainer = createFragmentContainer(
  NavBarMobileMenuInboxNotificationCount,
  {
    me: graphql`
      fragment NavBarMobileMenuInboxNotificationCount_me on Me {
        unreadConversationCount
      }
    `,
  }
)

export const NavBarMobileMenuInboxNotificationCountQueryRenderer: React.FC<{}> = () => {
  const { relayEnvironment } = useContext(SystemContext)

  return isServer ? (
    <NavBarMobileMenuInboxNotificationCount />
  ) : (
    <SystemQueryRenderer<NavBarMobileMenuInboxNotificationCountQuery>
      environment={relayEnvironment}
      query={graphql`
        query NavBarMobileMenuInboxNotificationCountQuery {
          me {
            ...NavBarMobileMenuInboxNotificationCount_me
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props || !props.me) {
          return <NavBarMobileMenuInboxNotificationCount />
        }

        return (
          <NavBarMobileMenuInboxNotificationCountFragmentContainer
            me={props.me}
          />
        )
      }}
    />
  )
}

const Container = styled(Text)`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`
