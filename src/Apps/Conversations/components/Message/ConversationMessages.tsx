import { Box, type BoxProps, Flex, Spinner } from "@artsy/palette"
import { ConversationMessageArtwork } from "Apps/Conversations/components/Message/ConversationMessageArtwork"
import { ConversationOrderUpdate } from "Apps/Conversations/components/Message/ConversationOrderUpdate"
import { ConversationTimeSince } from "Apps/Conversations/components/Message/ConversationTimeSince"
import { LatestMessagesFlyOut } from "Apps/Conversations/components/Message/LatestMessagesFlyOut"
import {
  type Message,
  isRelevantEvent,
  useGroupedMessages,
} from "Apps/Conversations/hooks/useGroupedMessages"
import { useRefetchLatestMessagesPoll } from "Apps/Conversations/hooks/useRefetchLatestMessagesPoll"
import { useUpdateConversation } from "Apps/Conversations/mutations/useUpdateConversationMutation"
import { Sentinel } from "Components/Sentinal"
import { useRouter } from "System/Hooks/useRouter"
import { extractNodes } from "Utils/extractNodes"
import type { ConversationMessages_conversation$data } from "__generated__/ConversationMessages_conversation.graphql"
import type React from "react"
import {
  type FC,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  type RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import styled from "styled-components"
import { ConversationMessage, type Messages } from "./ConversationMessage"

const PAGE_SIZE = 15

interface ConversationMessagesProps {
  conversation: NonNullable<ConversationMessages_conversation$data>
  relay: RelayPaginationProp
}

export const ConversationMessages: FC<
  React.PropsWithChildren<ConversationMessagesProps>
> = ({ conversation, relay }) => {
  const [isFetchingAllMessages, startFetchAllTransition] = useState(false)
  const [isFetchingLoadMoreMessages, startLoadMoreTransition] = useState(false)
  const [showLatestMessagesFlyOut, setShowLatestMessagesFlyOut] =
    useState(false)

  const autoScrollToBottomRef = useRef<HTMLDivElement>(null)
  const { submitMutation: updateConversation } = useUpdateConversation()
  const { match } = useRouter()

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

  useEffect(() => {
    const conversationId = match?.params?.conversationId

    // Only mark as read if we have messages and the user is viewing them
    // (i.e., not scrolled away from the bottom)
    if (messages.length > 0 && !showLatestMessagesFlyOut && conversationId) {
      const latestMessageId = messages[0]?.internalID
      const currentLastViewedId = conversation.fromLastViewedMessageID

      if (latestMessageId && latestMessageId !== currentLastViewedId) {
        updateConversation({
          variables: {
            input: {
              conversationId,
              fromLastViewedMessageId: latestMessageId,
            },
          },
        })
      }
    }
  }, [
    messages,
    showLatestMessagesFlyOut,
    conversation.fromLastViewedMessageID,
    match?.params?.conversationId,
    updateConversation,
  ])

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
        },
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
                },
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

export const ConversationMessagesPaginationContainer =
  createPaginationContainer(
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
    },
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
    ({ behavior = "instant", block, start }: any = {}) => {
      setTimeout(() => {
        autoScrollToBottomRef?.current?.scrollIntoView({
          behavior,
          block,
          start,
        })
      }, 0)
    },
    [autoScrollToBottomRef],
  )

  useEffect(() => {
    if (lastMessageId) {
      triggerAutoScroll({
        behavior: "instant",
        block: "end",
        inline: "end",
      })
    }
  }, [lastMessageId, triggerAutoScroll])

  // Additional effect to ensure initial scroll after component mount
  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    if (lastMessageId) {
      const timeoutId = setTimeout(() => {
        triggerAutoScroll({
          behavior: "instant",
          block: "end",
          inline: "end",
        })
      }, 0)

      return () => clearTimeout(timeoutId)
    }
  }, [])

  return { triggerAutoScroll }
}

const LoadingSpinner: React.FC<
  React.PropsWithChildren<BoxProps>
> = boxProps => (
  <Box position="relative" {...boxProps} data-testid="LoadingSpinner">
    <Spinner />
  </Box>
)

const LoadAllMessagesSentinal = Sentinel
const LatestMessagesSentinel = Sentinel
const TopLoadingSpinner = LoadingSpinner
const AutoScrollToBottom = Box

const BottomLoadingSpinner: React.FC<
  React.PropsWithChildren<BoxProps & { visible: boolean }>
> = ({ visible, ...boxProps }) => {
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
  transition:
    height 0.5s ease,
    opacity 0.5s ease;

  &.active {
    height: 60px;
    opacity: 1;
    margin-bottom: 40px;
  }
`
