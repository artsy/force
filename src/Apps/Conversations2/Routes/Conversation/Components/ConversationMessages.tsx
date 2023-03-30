import { Box, Flex } from "@artsy/palette"
import React, { FC, useEffect, useRef, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { ConversationMessage } from "./ConversationMessage"
import { LatestMessages } from "./LatestMessages"
import { Spacer, Text } from "@artsy/palette"
import { format, differenceInDays, isSameDay, isSameMinute } from "date-fns"
import { useScrollPagination } from "Apps/Conversations2/hooks/useScrollPagination"
import { useLoadMore } from "Apps/Conversations2/hooks/useLoadMore"
import { extractNodes } from "Utils/extractNodes"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { ConversationMessages_conversation$data } from "__generated__/ConversationMessages_conversation.graphql"
import { usePoll } from "Utils/Hooks/usePoll"

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
  const bottomRef = useRef<HTMLDivElement>(null)
  const { appendElementRef } = useScrollPagination()

  const { loadMore } = useLoadMore({
    pageSize: PAGE_SIZE,
    hasNext: relay.hasMore,
    isLoadingNext: relay.isLoading,
    loadNext: relay.loadMore,
    when: hasScrolledBottom,
  })

  const messages = extractNodes(conversation?.messagesConnection)
  const lastMessageId = messages.length > 0 ? messages[0].id : null

  useEffect(() => {
    if (lastMessageId) {
      bottomRef.current?.scrollIntoView()
    }
  }, [lastMessageId])

  const refreshList = () => {
    if (!relay.isLoading()) {
      relay.refetchConnection(PAGE_SIZE, null, {
        first: messages.length,
      })
    }
  }

  const handleLatestMessagesClick = () => {
    refreshList()
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Refetch messages in the background
  usePoll({
    callback: () => refreshList(),
    intervalTime: BACKGROUND_REFETCH_INTERVAL,
    key: "conversationMessages",
  })

  return (
    <Flex flexDirection="column" overflowY="auto" p={2} flexGrow={1}>
      <Flex flexDirection="column" position="relative">
        {!!hasScrolledBottom && (
          <Sentinel
            onIntersection={() => {
              loadMore()
            }}
            testId="messages-top-sentinel"
          />
        )}

        {messages.reverse().map((message, index) => {
          const prevMessage = messages[index - 1]
          const nextMessage = messages[index + 1]

          const messageDate = new Date(message.createdAt!)
          const prevMessageDate = new Date(prevMessage?.createdAt!)
          const nextMessageDate = new Date(nextMessage?.createdAt!)
          const isSimplifiedBubble =
            message.isFromUser === prevMessage?.isFromUser
              ? isSameMinute(messageDate, prevMessageDate)
              : false

          const displayDaySeparator = prevMessage
            ? !isSameDay(messageDate, prevMessageDate)
            : true

          const isLastGroupedPartnerMessage =
            !message.isFromUser &&
            (nextMessage?.isFromUser ||
              !isSameMinute(messageDate, nextMessageDate))

          return (
            <React.Fragment key={message.id}>
              <Box
                ref={(ref: any) => {
                  if (index === 0) {
                    appendElementRef(ref, message.id)
                  }
                }}
              />
              {displayDaySeparator && (
                <>
                  {index > 0 && <Spacer y={4} />}
                  <Text color="black60" alignSelf="center">
                    {getDayAsText(messageDate)}
                  </Text>
                  <Spacer y={1} />
                </>
              )}

              <Spacer y={isSimplifiedBubble ? 0.5 : 2} />

              <ConversationMessage
                message={message}
                formattedFirstMessage={
                  conversation?.inquiryRequest?.formattedFirstMessage
                }
                simplified={isSimplifiedBubble}
                isLastGroupedPartnerMessage={isLastGroupedPartnerMessage}
              />
            </React.Fragment>
          )
        })}

        <LatestMessages
          visible={showLatestMessages}
          onClick={handleLatestMessagesClick}
        />

        <Sentinel
          onIntersection={() => {
            !hasScrolledBottom && setHasScrolledBottom(true)
            setShowLatestMessages(false)
          }}
          onOffIntersection={() =>
            !showLatestMessages && setShowLatestMessages(true)
          }
          testId="messages-bottom-sentinel"
        />

        <Box ref={bottomRef as any} />
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
              createdAt
              isFromUser
              ...ConversationMessage_message
            }
          }
        }
        inquiryRequest {
          formattedFirstMessage
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

const Sentinel: React.FC<{
  onIntersection(): void
  onOffIntersection?(): void
  testId?: string
}> = ({ onIntersection, onOffIntersection, testId }) => {
  const { ref } = useIntersectionObserver({
    once: false,
    options: { threshold: 0.2 },
    onIntersection,
    onOffIntersection,
  })

  return <Box ref={ref as any} data-testid={testId} />
}

const getDayAsText = (messageDate: Date): string => {
  const daysSinceCreated = differenceInDays(messageDate, new Date())
  if (daysSinceCreated === 0) return "Today"
  if (daysSinceCreated === -1) return "Yesterday"
  return format(messageDate, "PP")
}
