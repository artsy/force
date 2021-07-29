import React, { useState, useEffect } from "react"
import { ArrowDownIcon, color, Flex, Text } from "@artsy/palette"
import styled from "styled-components"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { useRouter } from "v2/System/Router/useRouter"
import usePoll from "../Utils/usePoll"

import { useSystemContext } from "v2/System"
import { renderWithLoadProgress } from "v2/System/Relay/renderWithLoadProgress"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import {
  UnreadMessagesToastQuery,
  UnreadMessagesToastQueryResponse,
} from "v2/__generated__/UnreadMessagesToastQuery.graphql"
import { UnreadMessagesToast_conversation } from "v2/__generated__/UnreadMessagesToast_conversation.graphql"

// TODO: refactor into one of the newer components when ready
const Container = styled(Flex)<{ bottomMargin?: boolean }>`
  background-color: #1023D7; //${color("blue100")};
  border: none;
  border-radius: 30px;
  height: 40px;
  width: 180px;
  cursor: pointer;
  position: fixed;
  bottom: -40px;
  transition: all 300ms;
  &.visible {
    bottom: ${props => (props.bottomMargin ? 180 : 80)}px;
  }
`

interface UnreadMessagesToastProps {
  onOfferable?: boolean
  onClick: () => void
  refreshCallback: () => void
  hasScrolled: boolean
  relay: RelayRefetchProp
  conversation?: UnreadMessagesToast_conversation | null
}

export const UnreadMessagesToast: React.FC<UnreadMessagesToastProps> = ({
  onOfferable,
  onClick,
  refreshCallback,
  hasScrolled,
  relay,
  conversation,
}) => {
  const { match } = useRouter()
  const [visible, setVisible] = useState(false)
  const [tabActive, setTabActive] = useState(true)

  useEffect(() => {
    const newMessages =
      conversation?.lastMessageID !== conversation?.fromLastViewedMessageID
    if (!hasScrolled && newMessages && !visible) refreshCallback()
    setVisible(hasScrolled && newMessages)
  }, [
    hasScrolled,
    conversation?.lastMessageID,
    conversation?.fromLastViewedMessageID,
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

  usePoll(
    () => {
      relay.refetch({ conversationID: conversation?.internalID }, null)
    },
    5,
    match.params?.conversationID,
    !tabActive
  )

  return (
    <Flex justifyContent="center">
      <Container
        alignItems="center"
        justifyContent="center"
        className={visible ? "visible" : ""}
        onClick={onClick}
        bottomMargin={onOfferable}
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
      }
    `,
  },
  CONVERSATION_QUERY
)

export const UnreadMessagesToastQueryRenderer: React.FC<{
  conversationID: string
  onOfferable?: boolean
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
