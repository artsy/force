import { useState, useEffect } from "react"
import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { ArrowDownIcon, Flex, Text } from "@artsy/palette"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

import { useRouter } from "v2/System/Router/useRouter"
import { extractNodes } from "v2/Utils/extractNodes"
import { useSystemContext } from "v2/System"
import { renderWithLoadProgress } from "v2/System/Relay/renderWithLoadProgress"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { usePoll } from "v2/Utils/Hooks/usePoll"

import {
  UnreadMessagesToastQuery,
  UnreadMessagesToastQueryResponse,
} from "v2/__generated__/UnreadMessagesToastQuery.graphql"
import { UnreadMessagesToast_conversation } from "v2/__generated__/UnreadMessagesToast_conversation.graphql"

// TODO: refactor into one of the newer components when ready
const Container = styled(Flex)<{ bottom?: number }>`
  background-color: ${themeGet("colors.blue100")};
  border: none;
  border-radius: 30px;
  height: 40px;
  width: 180px;
  cursor: pointer;
  position: fixed;
  bottom: -40px;
  transition: all 250ms ease-out;
  &.visible {
    bottom: ${props => props.bottom}px;
  }
`

interface UnreadMessagesToastProps {
  bottom?: number
  onClick: () => void
  refreshCallback: () => void
  hasScrolled: boolean
  relay: RelayRefetchProp
  conversation?: UnreadMessagesToast_conversation | null
  lastOrderUpdate?: string | null
}

export const UnreadMessagesToast: React.FC<UnreadMessagesToastProps> = ({
  refreshCallback,
  hasScrolled,
  relay,
  conversation,
  lastOrderUpdate,
  ...rest
}) => {
  const { match } = useRouter()
  const [visible, setVisible] = useState(false)
  const [tabActive, setTabActive] = useState(true)

  useEffect(() => {
    const activeOrder = extractNodes(conversation?.activeOrders)[0]
    const newMessages =
      conversation?.lastMessageID !== conversation?.fromLastViewedMessageID ||
      (!!activeOrder && lastOrderUpdate !== activeOrder?.updatedAt)
    if (!hasScrolled && newMessages && !visible) refreshCallback()

    setVisible(hasScrolled && newMessages)
  }, [
    hasScrolled,
    conversation?.lastMessageID,
    conversation?.fromLastViewedMessageID,
    conversation?.activeOrders,
  ])

  // So as to not spam the server when not needed
  useEffect(() => {
    const setFocus = () => {
      setTabActive(true)
    }
    const removeFocus = () => {
      setTabActive(false)
    }
    window.addEventListener("focus", setFocus)
    window.addEventListener("blur", removeFocus)
    return () => {
      window.removeEventListener("focus", setFocus)
      window.removeEventListener("blur", removeFocus)
    }
  }, [])

  usePoll({
    callback: () => {
      relay.refetch({ conversationID: conversation?.internalID }, null)
    },
    intervalTime: 10000,
    key: match.params?.conversationID,
    clearWhen: !tabActive,
  })

  return (
    <Flex justifyContent="center">
      <Container
        alignItems="center"
        justifyContent="center"
        className={visible ? "visible" : ""}
        {...rest}
      >
        <Text color="white100">Unread Messages</Text>
        <ArrowDownIcon ml={1} height="16px" fill="white100" />
      </Container>
    </Flex>
  )
}

export const CONVERSATION_QUERY = graphql`
  query UnreadMessagesToastQuery($conversationID: String!) {
    me {
      conversation(id: $conversationID) {
        ...UnreadMessagesToast_conversation
      }
    }
  }
`

export const UnreadMessagesToastRefetchContainer = createRefetchContainer(
  UnreadMessagesToast,
  {
    conversation: graphql`
      fragment UnreadMessagesToast_conversation on Conversation {
        id
        internalID
        lastMessageID
        fromLastViewedMessageID
        isLastMessageToUser
        activeOrders: orderConnection(
          last: 1
          states: [APPROVED, FULFILLED, SUBMITTED, REFUNDED]
        ) {
          edges {
            node {
              internalID
              updatedAt
            }
          }
        }
      }
    `,
  },
  CONVERSATION_QUERY
)

export const UnreadMessagesToastQueryRenderer: React.FC<{
  conversationID: string
  lastOrderUpdate?: string | null
  bottom?: number
  onClick: () => void
  refreshCallback: () => void
  hasScrolled: boolean
}> = ({ conversationID, ...rest }) => {
  const { relayEnvironment } = useSystemContext()
  if (!conversationID) return null
  return (
    <SystemQueryRenderer<UnreadMessagesToastQuery>
      environment={relayEnvironment}
      query={CONVERSATION_QUERY}
      variables={{
        conversationID,
      }}
      render={renderWithLoadProgress<UnreadMessagesToastQueryResponse>(
        ({ me }) => (
          <UnreadMessagesToastRefetchContainer
            conversation={me?.conversation}
            {...rest}
          />
        )
      )}
    />
  )
}
