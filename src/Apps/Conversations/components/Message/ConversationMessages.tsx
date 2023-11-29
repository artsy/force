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
import { Sentinel } from "Components/Sentinal"
import {
  Message,
  isRelevantEvent,
  useGroupedMessages,
} from "Apps/Conversations/hooks/useGroupedMessages"
import { ConversationOrderUpdate } from "Apps/Conversations/components/Message/ConversationOrderUpdate"
import { ConversationTimeSince } from "Apps/Conversations/components/Message/ConversationTimeSince"
import { ConversationMessageArtwork } from "Apps/Conversations/components/Message/ConversationMessageArtwork"
import { LatestMessagesFlyOut } from "Apps/Conversations/components/Message/LatestMessagesFlyOut"
import { useRefetchLatestMessagesPoll } from "Apps/Conversations/hooks/useRefetchLatestMessagesPoll"
import styled from "styled-components"

const PAGE_SIZE = 15

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

  const { triggerAutoScroll } = useAutoScrollToBottom({
    messages,
    autoScrollToBottomRef,
  })

  // Refetch messages in the background
  useRefetchLatestMessagesPoll({
    clearWhen: showLatestMessagesFlyOut,
    onRefetch: () => {
      // Don't refetch if we're scrolled away from the bottom as the user may
      // be reviewing old conversations up the list
      if (showLatestMessagesFlyOut) {
        return
      }

      refetchMessages({
        showPreloader: false,
      })
    },
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

    triggerAutoScroll({
      behavior: "smooth",
    })

    performRefetch()
    startLoadMoreTransition(true)
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

        {isFetchingAllMessages && <TopLoadingSpinner height={30} mb={4} />}

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
                        mb={2}
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

        <LatestMessagesFlyOut
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

        <BottomLoadingSpinner
          visible={isFetchingLoadMoreMessages}
          mt={4}
          mb={2}
        />

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
          first: { type: "Int", defaultValue: 15 }
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

  const triggerAutoScroll = useCallback(
    ({ behavior = "instant", block, start } = {}) => {
      setTimeout(() => {
        autoScrollToBottomRef?.current?.scrollIntoView({
          behavior,
          block,
          start,
        })
      }, 0)
    },
    [autoScrollToBottomRef]
  )

  useEffect(() => {
    if (lastMessageId) {
      triggerAutoScroll({
        behavior: "instant",
        block: "end",
        inline: "end",
      })
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
const AutoScrollToBottom = Box

const BottomLoadingSpinner: React.FC<BoxProps & { visible: boolean }> = ({
  visible,
  ...boxProps
}) => {
  return (
    <SpinnerWrapper className={visible ? "active" : ""}>
      <Box position="relative" {...boxProps} data-testid="LoadingSpinner">
        <Spinner />
      </Box>
    </SpinnerWrapper>
  )
}

const SpinnerWrapper = styled(Box)`
  height: 0;
  opacity: 0;
  overflow: hidden;
  transition: height 0.5s ease, opacity 0.5s ease;

  &.active {
    height: 60px;
    opacity: 1;
    margin-bottom: 40px;
  }
`
