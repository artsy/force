import { Box, Flex } from "@artsy/palette"
import React, { FC, useEffect, useRef, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { ConversationMessage } from "./ConversationMessage"
import { LatestMessages } from "./LatestMessages"
import { useLoadMore } from "Apps/Conversations2/hooks/useLoadMore"
import { extractNodes } from "Utils/extractNodes"
import { ConversationMessages_conversation$data } from "__generated__/ConversationMessages_conversation.graphql"
import { usePoll } from "Utils/Hooks/usePoll"
import { Sentinel } from "Components/Sentinal"
import {
  isRelevantEvent,
  useGroupedMessages,
} from "Apps/Conversations2/hooks/useGroupedMessages"
import { ConversationOrderUpdate } from "Apps/Conversations2/components/Message/ConversationOrderUpdate"
import {
  ConversationTimeSince,
  fromToday,
} from "Apps/Conversations2/components/Message/ConversationTimeSince"
import { ConversationNewMessageMarker } from "Apps/Conversations2/components/Message/ConversationNewMessageMarker"

const PAGE_SIZE = 15

const BACKGROUND_REFETCH_INTERVAL = 5000

interface ConversationMessagesProps {
  conversation: ConversationMessages_conversation$data
  relay: RelayPaginationProp
}

export const ConversationMessages: FC<ConversationMessagesProps> = ({
  conversation,
  relay,
}) => {
  const [hasScrolledBottom, setHasScrolledBottom] = useState(false)
  const [showLatestMessages, setShowLatestMessages] = useState(false)
  const autoScrollToBottomRef = useRef<HTMLDivElement>(null)

  const { loadMore } = useLoadMore({
    pageSize: PAGE_SIZE,
    hasNext: relay.hasMore,
    isLoadingNext: relay.isLoading,
    loadNext: relay.loadMore,
    when: hasScrolledBottom,
  })

  const messages = extractNodes(conversation?.messagesConnection)

  const groupedMessagesAndEvents = useGroupedMessages(
    conversation?.messagesConnection,
    conversation?.orderEvents
  )

  const refreshList = () => {
    if (!relay.isLoading()) {
      relay.refetchConnection(PAGE_SIZE, null, {
        first: messages.length,
      })
    }
  }

  const handleLatestMessagesClick = () => {
    refreshList()
    autoScrollToBottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Refetch messages in the background
  // usePoll({
  //   callback: () => refreshList(),
  //   intervalTime: BACKGROUND_REFETCH_INTERVAL,
  //   key: "conversationMessages",
  // })

  useAutoScrollToBottom({
    messages,
    autoScrollToBottomRef,
  })

  return (
    <Flex flexDirection="column" overflowY="auto" p={2} flexGrow={1}>
      <Flex flexDirection="column" position="relative">
        {!!hasScrolledBottom && (
          <Sentinel
            onEnterView={() => {
              loadMore()
            }}
            testId="messages-top-sentinel"
          />
        )}

        {groupedMessagesAndEvents.map((messageGroup, groupIndex) => {
          return (
            <>
              <ConversationTimeSince
                message={messageGroup[0]}
                exact
                mb={1}
                alignSelf="center"
              />

              {[...messageGroup].reverse().map((message, messageIndex) => {
                if (isRelevantEvent(message)) {
                  return (
                    <ConversationOrderUpdate
                      key={`event-${messageIndex}`}
                      event={message as any}
                      setShowDetails={x => x}
                    />
                  )
                }

                return (
                  <>
                    <ConversationMessage
                      key={message.internalID}
                      messageIndex={messageIndex}
                      messages={messages}
                      message={message}
                      formattedFirstMessage={
                        conversation?.inquiryRequest?.formattedFirstMessage
                      }
                    />
                  </>
                )
              })}
            </>
          )
        })}

        <LatestMessages
          visible={showLatestMessages}
          onClick={handleLatestMessagesClick}
        />

        <Sentinel
          onEnterView={() => {
            !hasScrolledBottom && setHasScrolledBottom(true)
            setShowLatestMessages(false)
          }}
          onExitView={() => !showLatestMessages && setShowLatestMessages(true)}
          testId="messages-bottom-sentinel"
        />

        <Box ref={autoScrollToBottomRef as any} />
      </Flex>
    </Flex>
  )
}

export const ConversationMessagesPaginationContainer = createPaginationContainer(
  ConversationMessages,
  {
    conversation: graphql`
      fragment ConversationMessages_conversation on Conversation
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          after: { type: "String" }
        ) {
        fromLastViewedMessageID

        messagesConnection(first: $first, after: $after, sort: DESC)
          @required(action: NONE)
          @connection(
            key: "ConversationMessages_conversation_messagesConnection"
          ) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
          }

          edges {
            node {
              id
              internalID
              createdAt
              isFromUser
              ...ConversationMessage_message
            }
          }
        }
        inquiryRequest {
          formattedFirstMessage
        }

        orderEvents: orderConnection(
          first: 10
          states: [
            APPROVED
            FULFILLED
            SUBMITTED
            REFUNDED
            CANCELED
            PROCESSING_APPROVAL
          ]
          participantType: BUYER
        ) {
          edges {
            node {
              internalID
              updatedAt
              ... on CommerceOfferOrder {
                buyerAction
              }
              orderHistory {
                ...ConversationOrderUpdate_event
                __typename
                ... on CommerceOrderStateChangedEvent {
                  createdAt
                  orderUpdateState
                  state
                  stateReason
                }
                ... on CommerceOfferSubmittedEvent {
                  createdAt
                  offer {
                    amount
                    fromParticipant
                    definesTotal
                    offerAmountChanged
                    respondsTo {
                      fromParticipant
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getFragmentVariables(prevVars, totalCount) {
      return { ...prevVars, totalCount }
    },
    getVariables(_, { cursor: after }, fragmentVariables) {
      return { ...fragmentVariables, after }
    },
    query: graphql`
      query ConversationMessagesPaginationQuery(
        $conversationId: String!
        $first: Int!
        $after: String
      ) {
        conversation(id: $conversationId) {
          ...ConversationMessages_conversation
            @arguments(first: $first, after: $after)
        }
      }
    `,
  }
)

interface UseAutoScrollToBottomProps {
  messages: any[]
  autoScrollToBottomRef: any
}

const useAutoScrollToBottom = ({
  messages,
  autoScrollToBottomRef,
}: UseAutoScrollToBottomProps) => {
  const lastMessageId = messages.length > 0 ? messages[0].internalID : null

  useEffect(() => {
    if (lastMessageId) {
      autoScrollToBottomRef.current?.scrollIntoView()
    }
  }, [lastMessageId, autoScrollToBottomRef])
}
