import { Box, type BoxProps, Flex, Spinner } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { ConversationMessageArtwork } from "Apps/Conversations/components/Message/ConversationMessageArtwork"
import { ConversationOrderUpdate } from "Apps/Conversations/components/Message/ConversationOrderUpdate"
import { ConversationPartnerOfferUpdate } from "Apps/Conversations/components/Message/ConversationPartnerOfferUpdate"
import { ConversationTimeSince } from "Apps/Conversations/components/Message/ConversationTimeSince"
import { LatestMessagesFlyOut } from "Apps/Conversations/components/Message/LatestMessagesFlyOut"
import { useConversationsWebsocket } from "Apps/Conversations/hooks/useConversationsWebsocket"
import {
  type Message,
  isRelevantEvent,
  useGroupedMessages,
} from "Apps/Conversations/hooks/useGroupedMessages"
import { useRefetchLatestMessagesPoll } from "Apps/Conversations/hooks/useRefetchLatestMessagesPoll"
import { useUpdateConversation } from "Apps/Conversations/mutations/useUpdateConversationMutation"
import { Sentinel } from "Components/Sentinal"
import { useTabVisible } from "Utils/Hooks/useTabVisible"
import { extractNodes } from "Utils/extractNodes"
import { getENV } from "Utils/getENV"
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

// How long after mount we treat a resize or a sentinel exit as a side effect
// of layout still settling (e.g. the partner offer CTA mounting and growing
// the reply box below us), rather than something the user did. 500ms comfortably
// covers a CTA's mount-driven layout shift while still being short enough that a
// genuinely fast scroll-up shortly after opening the conversation is respected.
const SETTLING_WINDOW_MS = 500

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
  const messageListRef = useRef<HTMLDivElement>(null)

  // True while we're still settling right after mount, so a layout-shift-induced
  // resize (Part 1) or sentinel exit (Part 2) doesn't get mistaken for the user
  // scrolling away. Shared by both effects below.
  const isSettlingRef = useRef(true)

  const toInitials = (conversation?.to as any)?.initials
  const toName = conversation?.to?.name
  const { submitMutation: updateConversation } = useUpdateConversation()

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
    showLatestMessagesFlyOut,
  })

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      isSettlingRef.current = false
    }, SETTLING_WINDOW_MS)

    return () => clearTimeout(timeoutId)
  }, [])

  // A sibling (e.g. the partner offer CTA in ConversationReply) mounting or
  // growing shrinks our own allocated height within the fixed-height flex
  // column, without changing our scrollHeight or scrollTop. That leaves the
  // bottom sentinel visually below the (now shorter) visible window, so its
  // IntersectionObserver reports an "exit" that isn't a real user scroll.
  // Re-pin to the bottom while we're still settling to correct for it.
  useEffect(() => {
    const node = messageListRef.current

    if (!node || typeof ResizeObserver === "undefined") {
      return
    }

    const observer = new ResizeObserver(() => {
      if (!isSettlingRef.current) {
        return
      }

      triggerAutoScroll({ behavior: "instant", block: "end" })
    })

    observer.observe(node)

    return () => observer.disconnect()
  }, [triggerAutoScroll])

  const isWebsocketEnabled = useFlag("amber_conversations-force-websocket")
  const isAutoRefreshEnabled = !!getENV(
    "ENABLE_CONVERSATIONS_MESSAGES_AUTO_REFRESH",
  )

  const isTabVisible = useTabVisible()

  const refreshLatestMessages = () => {
    // Don't refetch if we're scrolled away from the bottom as the user may
    // be reviewing old conversations up the list
    if (showLatestMessagesFlyOut) {
      return
    }

    refetchMessages({
      showPreloader: false,
    })
  }

  useConversationsWebsocket({
    subscriptionKey: `conversation:${conversation.internalID}`,
    enabled: isWebsocketEnabled && isAutoRefreshEnabled,
    onEvent: event => {
      if (event.type !== "message.sent") {
        return
      }

      if (event.conversation_id !== conversation.internalID) {
        return
      }

      if (!isTabVisible) {
        return
      }

      // Unlike the poll (below), the websocket only refetches once per
      // genuine new message, so we call refetchMessages directly rather
      // than going through refreshLatestMessages — this bypasses its
      // showLatestMessagesFlyOut early-return, keeping the thread fresh
      // even while the user is scrolled away reading history. This is
      // safe because useAutoScrollToBottom won't force-scroll while
      // showLatestMessagesFlyOut is true.
      refetchMessages({
        showPreloader: false,
      })
    },
  })

  // Refetch messages in the background, unless the websocket is enabled
  useRefetchLatestMessagesPoll({
    clearWhen: showLatestMessagesFlyOut || isWebsocketEnabled,
    onRefetch: refreshLatestMessages,
  })

  useEffect(() => {
    if (
      conversation.unreadByCollector &&
      conversation.internalID &&
      messages.length > 0
    ) {
      const latestMessageId = messages[0]?.internalID

      if (latestMessageId) {
        updateConversation({
          variables: {
            input: {
              conversationId: conversation.internalID,
              fromLastViewedMessageId: latestMessageId,
            },
          },
        })
      }
    }
  }, [
    conversation.unreadByCollector,
    conversation.internalID,
    messages,
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
    <Flex
      ref={messageListRef as any}
      flexDirection="column"
      overflowY="auto"
      p={2}
      flexGrow={1}
    >
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
                        toInitials={toInitials}
                        toName={toName}
                        onImageLoad={triggerAutoScroll}
                      />
                    </Fragment>
                  )
                })}
            </Fragment>
          )
        })}

        <ConversationPartnerOfferUpdate
          conversation={conversation}
          mt={4}
          mb={2}
        />

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
          onExitView={() => {
            if (isSettlingRef.current) {
              return
            }

            setShowLatestMessagesFlyOut(true)
          }}
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
          internalID
          fromLastViewedMessageID
          unreadByCollector
          to {
            name
            initials(length: 2)
          }

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
          ...ConversationPartnerOfferUpdate_conversation
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
  showLatestMessagesFlyOut: boolean
}

const useAutoScrollToBottom = ({
  messages,
  autoScrollToBottomRef,
  showLatestMessagesFlyOut,
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

  // Only auto-scroll on a new message when the user hasn't scrolled away —
  // otherwise a refetch triggered while reading older history (e.g. via the
  // websocket path) would yank their scroll position back to the bottom.
  useEffect(() => {
    if (lastMessageId && !showLatestMessagesFlyOut) {
      triggerAutoScroll({
        behavior: "instant",
        block: "end",
        inline: "end",
      })
    }
  }, [lastMessageId, triggerAutoScroll, showLatestMessagesFlyOut])

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
