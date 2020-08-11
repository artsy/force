import {
  Box,
  Flex,
  Image,
  Link,
  Sans,
  Spacer,
  Spinner,
  color,
} from "@artsy/palette"
import { Conversation_conversation } from "v2/__generated__/Conversation_conversation.graphql"
import { DateTime } from "luxon"
import React, { useEffect, useRef, useState } from "react"
import {
  RelayProp,
  RelayRefetchProp,
  createPaginationContainer,
} from "react-relay"
import { graphql } from "relay-runtime"
import { MessageFragmentContainer as Message } from "./Message"
import { Reply } from "./Reply"
import { TimeSince, fromToday } from "./TimeSince"
import { UpdateConversation } from "../Mutation/UpdateConversationMutation"
import styled from "styled-components"

interface ItemProps {
  item: Conversation_conversation["items"][0]["item"]
}

export type ItemType = "Artwork" | "Show"

export const Item: React.FC<ItemProps> = props => {
  const { item } = props
  if (item.__typename === "%other") return null
  const itemType = item.__typename as ItemType

  const getImage = item => {
    if (itemType === "Artwork") {
      return item.image?.url
    } else if (itemType === "Show") {
      return item.coverImage?.url
    } else {
      return null
    }
  }

  const itemDetails = item => {
    if (item.__typename === "Artwork") {
      return [
        <Sans key={1} size="4" weight="medium" color="white100">
          {item.artistNames}
        </Sans>,
        <Sans key={2} size="2" color="white100">
          {item.title} / {item.date}
        </Sans>,
        item.listPrice?.display && (
          <Sans key={3} size="2" color="white100">
            {item.listPrice?.display}
          </Sans>
        ),
      ]
    } else if (item.__typename === "Show") {
      const itemLocation = item.fair?.location?.city
      return [
        <Sans key={1} size="4" weight="medium" color="white100">
          {item.fair.name}
        </Sans>,
        <Sans key={2} size="2" color="white100">
          {itemLocation && `${itemLocation}, `}
          {item?.fair?.exhibitionPeriod}
        </Sans>,
      ]
    }
  }

  if (itemType === "Artwork" || itemType === "Show") {
    return (
      <Link
        href={item.href}
        underlineBehavior="none"
        style={{ alignSelf: "flex-end" }}
        mb={1}
      >
        <Flex flexDirection="column">
          <Image
            src={getImage(item)}
            alt={item.__typename === "Artwork" ? item.title : item.name}
            width="350px"
            borderRadius="15px 15px 0 0"
          />
          <Flex
            p={1}
            flexDirection="column"
            justifyContent="center"
            background={color("black100")}
            borderRadius="0 0 15px 15px"
          >
            {itemDetails(item)}
          </Flex>
        </Flex>
      </Link>
    )
  } else {
    return null
  }
}

type Message = Conversation_conversation["messagesConnection"]["edges"][number]["node"]
/**
 * Combines messages into groups of messages sent by the same party and
 * separated out into different groups if sent across multiple days
 * @param messages Messages in the conversation
 */
const groupMessages = (messages: Message[]): Message[][] => {
  if (messages.length === 0) {
    return []
  }
  // Make a copy of messages
  const remainingMessages = [...messages]
  const groups = [[remainingMessages.pop()]]
  while (remainingMessages.length > 0) {
    const lastGroup = groups[groups.length - 1]
    const lastMessage = lastGroup[lastGroup.length - 1]
    const currentMessage = remainingMessages.pop()

    const lastMessageCreatedAt = DateTime.fromISO(lastMessage.createdAt)
    const currentMessageCreatedAt = DateTime.fromISO(currentMessage.createdAt)
    const sameDay = lastMessageCreatedAt.hasSame(currentMessageCreatedAt, "day")

    const today = fromToday(currentMessageCreatedAt)

    if (sameDay && !today) {
      lastGroup.push(currentMessage)
    } else if (!today) {
      groups.push([currentMessage])
    } else if (lastMessage.isFromUser !== currentMessage.isFromUser) {
      groups.push([currentMessage])
    } else if (!sameDay && today) {
      groups.push([currentMessage])
    } else {
      lastGroup.push(currentMessage)
    }
  }
  return groups
}

export interface ConversationProps {
  conversation: Conversation_conversation
  relay: RelayProp
  refetch: RelayRefetchProp["refetch"]
}

export const PAGE_SIZE: number = 30

const Conversation: React.FC<ConversationProps> = props => {
  const { conversation, relay } = props

  const bottomOfPage = useRef(null)
  const initialMount = useRef(true)

  // Keeping track of this for scroll on send
  const [lastMessageID, setLastMessageID] = useState("")

  const scrollToBottom = () => {
    if (
      bottomOfPage.current !== null &&
      (initialMount.current || lastMessageID !== conversation?.lastMessageID)
    ) {
      const scrollOptions = initialMount.current ? {} : { behavior: "smooth" }
      bottomOfPage.current.scrollIntoView(scrollOptions)
      initialMount.current = false
      setLastMessageID(conversation?.lastMessageID)
    }
  }

  useEffect(scrollToBottom, [conversation])

  useEffect(() => {
    UpdateConversation(relay.environment, conversation)
  }, [conversation, relay.environment, conversation.lastMessageID])

  const inquiryItemBox = conversation.items.map((i, idx) => (
    <Item
      item={i.item}
      key={
        i.item.__typename === "Artwork" || i.item.__typename === "Show"
          ? i.item.id
          : idx
      }
    />
  ))

  // Pagination Scroll Logic
  const [fetchingMore, setFetchingMore] = useState(false)
  const [messagesTop, setMessagesTop] = useState(null)
  const scrollContainer = useRef(null)

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return
    const observer = new IntersectionObserver(
      entries => {
        const first = entries[0]
        if (first.isIntersecting && !initialMount.current) {
          _loadMore()
        }
      },
      { threshold: 0, rootMargin: `150px` }
    )

    const currentMessagesTop = messagesTop
    const currentObserver = observer
    if (currentMessagesTop) {
      currentObserver.observe(currentMessagesTop)
    }

    // Cleanup
    return () => {
      if (currentMessagesTop) {
        currentObserver.unobserve(currentMessagesTop)
      }
    }
  }, [messagesTop])

  const _loadMore = (): void => {
    if (relay.isLoading() || !relay.hasMore() || initialMount.current) return
    setFetchingMore(true)
    const scrollCursor = scrollContainer.current
      ? scrollContainer.current.scrollHeight - scrollContainer.current.scrollTop
      : 0
    relay.loadMore(PAGE_SIZE, error => {
      if (error) console.error(error)
      setFetchingMore(false)
      if (scrollContainer.current) {
        // Scrolling to former position
        scrollContainer.current.scrollTo({
          top: scrollContainer.current.scrollHeight - scrollCursor,
        })
      }
    })
  }

  const messageGroups = groupMessages(
    conversation.messagesConnection.edges.map(edge => edge.node)
  ).map((messageGroup, groupIndex) => {
    const today = fromToday(messageGroup[0].createdAt)
    return (
      <React.Fragment key={`group-${groupIndex}-${messageGroup[0].internalID}`}>
        <TimeSince
          style={{ alignSelf: "center" }}
          time={messageGroup[0].createdAt}
          exact
          mb={1}
        />
        {messageGroup.map((message, messageIndex) => {
          const nextMessage = messageGroup[messageIndex + 1]
          const senderChanges =
            nextMessage && nextMessage.isFromUser !== message.isFromUser
          const lastMessageInGroup = messageIndex === messageGroup.length - 1
          const spaceAfter = senderChanges || lastMessageInGroup ? 2 : 0.5

          return (
            <>
              <Message
                message={message}
                initialMessage={conversation.initialMessage}
                key={message.internalID}
                showTimeSince={
                  message.createdAt &&
                  today &&
                  messageGroup.length - 1 === messageIndex
                }
              />
              <Spacer mb={spaceAfter} />
            </>
          )
        })}
      </React.Fragment>
    )
  })

  return (
    <NoScrollFlex flexDirection="column" width="100%">
      <MessageContainer ref={scrollContainer}>
        <Box pb={[6, 6, 6, 0]}>
          <Spacer mt={["75px", "75px", 2]} />
          <Flex flexDirection="column" width="100%" px={1}>
            {inquiryItemBox}
            <Box ref={setMessagesTop}></Box>
            {fetchingMore ? (
              <SpinnerContainer>
                <Spinner />
              </SpinnerContainer>
            ) : null}
            {messageGroups}
            <Box ref={bottomOfPage}></Box>
          </Flex>
        </Box>
      </MessageContainer>
      <Reply
        onScroll={scrollToBottom}
        conversation={conversation}
        refetch={props.refetch}
        environment={relay.environment}
      />
    </NoScrollFlex>
  )
}

const MessageContainer = styled(Box)`
  flex-grow: 1;
  overflow-y: auto;
`

const NoScrollFlex = styled(Flex)`
  overflow: hidden;
`

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`

export const ConversationPaginationContainer = createPaginationContainer(
  Conversation,
  {
    conversation: graphql`
      fragment Conversation_conversation on Conversation
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 30 }
          after: { type: "String" }
        ) {
        id
        internalID
        from {
          name
          email
        }
        to {
          name
          initials
        }
        initialMessage
        lastMessageID
        unread
        messagesConnection(first: $count, after: $after, sort: DESC)
          @connection(key: "Messages_messagesConnection", filters: []) {
          pageInfo {
            startCursor
            endCursor
            hasPreviousPage
            hasNextPage
          }
          edges {
            node {
              id
              internalID
              createdAt
              isFromUser
              ...Message_message
            }
          }
        }
        items {
          item {
            __typename
            ... on Artwork {
              id
              date
              title
              artistNames
              href
              image {
                url(version: ["large"])
              }
              listPrice {
                __typename
                ... on Money {
                  display
                }
                ... on PriceRange {
                  display
                }
              }
            }
            ... on Show {
              id
              fair {
                name
                exhibitionPeriod
                location {
                  city
                }
              }
              href
              name
              coverImage {
                url
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.conversation?.messagesConnection
    },
    getFragmentVariables(prevVars, count) {
      return {
        ...prevVars,
        count,
      }
    },
    getVariables(props, { cursor, count }) {
      return {
        count,
        cursor,
        after: cursor,
        conversationID: props.conversation.id,
      }
    },
    query: graphql`
      query ConversationPaginationQuery(
        $count: Int
        $after: String
        $conversationID: ID!
      ) {
        node(id: $conversationID) {
          ...Conversation_conversation @arguments(count: $count, after: $after)
        }
      }
    `,
  }
)
