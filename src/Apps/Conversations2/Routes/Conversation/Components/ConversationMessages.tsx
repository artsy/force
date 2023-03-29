import { Box, Flex, Spinner } from "@artsy/palette"
import React, { FC, useEffect, useRef, useState } from "react"
import { graphql, usePaginationFragment } from "react-relay"
import { ConversationMessage } from "./ConversationMessage"
import { LatestMessages } from "./LatestMessages"
import { Spacer, Text } from "@artsy/palette"
import { format, differenceInDays, isSameDay, isSameMinute } from "date-fns"
import { useScrollPagination } from "Apps/Conversations2/hooks/useScrollPagination"
import { useLoadMore } from "Apps/Conversations2/hooks/useLoadMore"
import { extractNodes } from "Utils/extractNodes"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"

interface ConversationMessagesProps {
  conversation: ConversationMessages_conversation$key
}

const getDayAsText = (messageDate: Date): string => {
  const daysSinceCreated = differenceInDays(messageDate, new Date())
  if (daysSinceCreated === 0) return "Today"
  if (daysSinceCreated === -1) return "Yesterday"
  return format(messageDate, "PP")
}

const PAGE_SIZE = 15

export const ConversationMessages: FC<ConversationMessagesProps> = ({
  conversation,
}) => {
  const [hasScrolledBottom, setHasScrolledBottom] = useState(false)
  const [showLatestMessages, setShowLatestMessages] = useState(false)
  const [isLoadingNewMessages, setIsLoadingNewMessages] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { appendElementRef } = useScrollPagination()

  const {
    data,
    isLoadingNext,
    hasNext,
    loadNext,
    refetch,
  } = usePaginationFragment(
    graphql`
      fragment ConversationMessages_conversation on Conversation
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          after: { type: "String" }
        )
        @refetchable(queryName: "ConversationMessagesPaginationQuery") {
        messagesConnection(first: $first, after: $after, sort: DESC)
          @required(action: NONE)
          @connection(
            key: "ConversationMessages_conversation_messagesConnection"
          ) {
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
    conversation
  )

  const { loadMore } = useLoadMore({
    pageSize: PAGE_SIZE,
    hasNext,
    isLoadingNext,
    loadNext,
    when: hasScrolledBottom,
  })

  const messages = extractNodes(data?.messagesConnection)
  const lastMessageId = messages.length > 0 ? messages[0].id : null

  useEffect(() => {
    if (lastMessageId) {
      bottomRef.current?.scrollIntoView()
    }
  }, [lastMessageId])

  const handleLatestMessagesClick = () => {
    setIsLoadingNewMessages(true)
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    refetch(
      {
        first: PAGE_SIZE,
      },
      {
        fetchPolicy: "network-only",
        onComplete: () => setIsLoadingNewMessages(false),
      }
    )
  }

  return (
    <Flex flexDirection="column" overflowY="auto" p={2} flexGrow={1}>
      <Flex flexDirection="column" position="relative">
        {isLoadingNext && (
          <Spinner my={2} display="block" position="unset" alignSelf="center" />
        )}

        {!!hasScrolledBottom && (
          <Sentinel onIntersection={loadMore} testId="messages-top-sentinel" />
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
                  data?.inquiryRequest?.formattedFirstMessage
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

        {!!isLoadingNewMessages && (
          <Spinner
            my={2}
            display="block"
            position="unset"
            alignSelf="center"
            data-testid="messages-bottom-spinner"
          />
        )}

        <Box ref={bottomRef as any} />
      </Flex>
    </Flex>
  )
}

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
