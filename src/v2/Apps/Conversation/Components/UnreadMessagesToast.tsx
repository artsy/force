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

// I assume this will have to be refactored into one of the newer components. Potentially one of the new buttons.
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
  hasScrolled: boolean
  relay: RelayRefetchProp
  conversation?: UnreadMessagesToast_conversation | null
}

export const UnreadMessagesToast: React.FC<UnreadMessagesToastProps> = ({
  onOfferable,
  onClick,
  hasScrolled,
  relay,
  conversation,
}) => {
  const { match } = useRouter()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(
      hasScrolled &&
        conversation?.lastMessageID !== conversation?.fromLastViewedMessageID
    )
  }, [
    hasScrolled,
    conversation?.lastMessageID,
    conversation?.fromLastViewedMessageID,
  ])

  usePoll(
    () => {
      relay.refetch(
        {
          conversationID: conversation?.internalID,
        },
        null
      )
    },
    10,
    match.params?.conversationID
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
