import { Box, Flex, Spacer, Spinner } from "@artsy/palette"
import { Conversation_conversation } from "v2/__generated__/Conversation_conversation.graphql"
import React, { useEffect, useRef, useState } from "react"
import {
  RelayProp,
  RelayRefetchProp,
  createPaginationContainer,
} from "react-relay"
import { graphql } from "relay-runtime"
import Waypoint from "react-waypoint"
import { Item } from "./Item"
import { MessageFragmentContainer as Message } from "./Message"
import { Reply } from "./Reply"
import { TimeSince, fromToday } from "./TimeSince"
import { UpdateConversation } from "../Mutation/UpdateConversationMutation"
import { groupMessages } from "../Utils/groupMessages"
import styled from "styled-components"

export interface ConversationProps {
  conversation: Conversation_conversation
  relay: RelayProp
  refetch: RelayRefetchProp["refetch"]
}

export const PAGE_SIZE: number = 15

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
  const scrollContainer = useRef(null)

  const loadMore = (): void => {
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
          behavior: "smooth",
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
            <Waypoint onEnter={loadMore} />
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
