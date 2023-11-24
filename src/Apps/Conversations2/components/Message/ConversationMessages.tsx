import { Box, BoxProps, Flex, Spinner } from "@artsy/palette"
import React, {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { ConversationMessage, Messages } from "./ConversationMessage"
import { extractNodes } from "Utils/extractNodes"
import { ConversationMessages_conversation$data } from "__generated__/ConversationMessages_conversation.graphql"
import { usePoll } from "Utils/Hooks/usePoll"
import { Sentinel } from "Components/Sentinal"
import {
  Message,
  isRelevantEvent,
  useGroupedMessages,
} from "Apps/Conversations2/hooks/useGroupedMessages"
import { ConversationOrderUpdate } from "Apps/Conversations2/components/Message/ConversationOrderUpdate"
import { ConversationTimeSince } from "Apps/Conversations2/components/Message/ConversationTimeSince"
import { ConversationMessageArtwork } from "Apps/Conversations2/components/Message/ConversationMessageArtwork"
import { LatestMessages } from "Apps/Conversations2/components/LatestMessages"

const PAGE_SIZE = 15

const BACKGROUND_REFETCH_INTERVAL = 5000

interface ConversationMessagesProps {
  conversation: NonNullable<ConversationMessages_conversation$data>
  relay: RelayPaginationProp
}

export const ConversationMessages: FC<ConversationMessagesProps> = ({
  conversation,
  relay,
}) => {
  const [isFetchingAllMessages, startFetchAllTransition] = useState(false)
  const [isFetchingLoadMoreMessages, startLoadMoreTransition] = useState(false)
  const [showLatestMessagesFlyOut, setShowLatestMessagesFlyOut] = useState(
    false
  )
  const autoScrollToBottomRef = useRef<HTMLDivElement>(null)

  const groupedMessagesAndEvents = useGroupedMessages({
    messagesConnection: conversation.messagesConnection,
    orderEvents: conversation.orderEvents,
  })

  const totalCount = conversation?.messagesConnection?.totalCount ?? 0
  const messages = extractNodes(conversation?.messagesConnection)

  const enableTopListSentinal =
    showLatestMessagesFlyOut && totalCount !== messages.length

  const enableBottomRefreshSentinal = totalCount > 2

  useAutoScrollToBottom({
    messages,
    autoScrollToBottomRef,
  })

  // Refetch messages in the background
  usePoll({
    callback: () => {
      // FIXME: Move to env var
      const ENABLED = false

      if (ENABLED) {
        refetchMessages({ showPreloader: false })
      }
    },
    intervalTime: BACKGROUND_REFETCH_INTERVAL,
    key: "conversationMessages",
  })

  const refetchMessages = ({ showPreloader = true }) => {
    if (messages.length === 0) {
      return
    }

    const performRefetch = () => {
      relay.refetchConnection(
        PAGE_SIZE,
        () => {
          startLoadMoreTransition(false)
        },
        {
          first: PAGE_SIZE,
        }
      )
    }

    // If we're not showing the preloader, keep the current scroll position and
    // simply refresh the list
    if (!showPreloader) {
      performRefetch()
      return
    }

    setTimeout(() => {
      autoScrollToBottomRef.current?.scrollIntoView({
        behavior: "smooth",
      })
    }, 100)

    startLoadMoreTransition(true)
    performRefetch()
  }

  return (
    <Flex flexDirection="column" overflowY="auto" p={2} flexGrow={1}>
      <Flex flexDirection="column" position="relative">
        {enableTopListSentinal && (
          <LoadAllMessagesSentinal
            testId="LoadAllMessagesSentinal"
            onEnterView={() => {
              startFetchAllTransition(true)

              relay.refetchConnection(
                totalCount,
                () => {
                  startFetchAllTransition(false)
                },
                {
                  first: totalCount,
                }
              )
            }}
          />
        )}

        {isFetchingAllMessages && <TopLoadingSpinner my={4} />}

        {groupedMessagesAndEvents.map((messageGroup, groupIndex) => {
          return (
            <Fragment key={`group-${groupIndex}`}>
              <ConversationTimeSince
                message={messageGroup[0]}
                exact
                mt={groupIndex === 0 ? 1 : 4}
                mb={groupIndex === 0 ? 4 : 2}
                alignSelf="center"
              />

              {groupIndex === 0 && (
                <ConversationMessageArtwork
                  key={conversation?.items?.[0]?.item?.internalID}
                  item={conversation?.items?.[0]?.item as any}
                />
              )}

              {[...messageGroup]
                .reverse()
                .map((message: Message, messageIndex) => {
                  if (isRelevantEvent(message)) {
                    return (
                      <ConversationOrderUpdate
                        key={`event-${messageIndex}`}
                        event={message as any}
                        mt={4}
                        mb={1}
                      />
                    )
                  }

                  return (
                    <Fragment key={`eventMessage-${messageIndex}`}>
                      <ConversationMessage
                        key={message?.internalID}
                        messageIndex={messageIndex}
                        messages={messages as Messages}
                        message={message as NonNullable<typeof message>}
                        formattedFirstMessage={
                          conversation?.inquiryRequest?.formattedFirstMessage
                        }
                      />
                    </Fragment>
                  )
                })}
            </Fragment>
          )
        })}

        <LatestMessages
          visible={enableBottomRefreshSentinal && showLatestMessagesFlyOut}
          onClick={() => {
            refetchMessages({
              showPreloader: true,
            })
          }}
        />

        <LatestMessagesSentinel
          onEnterView={() => setShowLatestMessagesFlyOut(false)}
          onExitView={() => setShowLatestMessagesFlyOut(true)}
          testId="LatestMessagesSentinel"
        />

        {isFetchingLoadMoreMessages && <BottomLoadingSpinner mt={4} mb={2} />}

        <AutoScrollToBottom ref={autoScrollToBottomRef as any} height={20} />
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
          totalCount
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
        items {
          item {
            __typename
            ... on Artwork {
              id
              isOfferable
              isOfferableFromInquiry
              internalID
            }
            ...ConversationMessageArtwork_item
          }
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
        ) @required(action: NONE) {
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

  const triggerAutoScroll = useCallback(() => {
    setTimeout(() => {
      autoScrollToBottomRef?.current?.scrollIntoView({
        behavior: "instant",
        block: "end",
        inline: "end",
      })
    }, 0)
  }, [autoScrollToBottomRef])

  useEffect(() => {
    if (lastMessageId) {
      triggerAutoScroll()
    }
  }, [lastMessageId, autoScrollToBottomRef, triggerAutoScroll])

  return { triggerAutoScroll }
}

const LoadingSpinner: React.FC<BoxProps> = boxProps => (
  <Box position="relative" {...boxProps} data-testid="LoadingSpinner">
    <Spinner />
  </Box>
)

const LoadAllMessagesSentinal = Sentinel
const LatestMessagesSentinel = Sentinel
const TopLoadingSpinner = LoadingSpinner
const BottomLoadingSpinner = LoadingSpinner
const AutoScrollToBottom = Box
