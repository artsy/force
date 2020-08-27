import { Box, Flex, Spacer, Spinner } from "@artsy/palette"
import { Conversation_conversation } from "v2/__generated__/Conversation_conversation.graphql"
import React, { useEffect, useRef, useState } from "react"
import {
  RelayPaginationProp,
  RelayRefetchProp,
  createPaginationContainer,
} from "react-relay"
import { graphql } from "relay-runtime"
import Waypoint from "react-waypoint"
import { Item } from "./Item"
import { Reply } from "./Reply"
import { ConversationMessagesFragmentContainer as ConversationMessages } from "./ConversationMessages"
import { UpdateConversation } from "../Mutation/UpdateConversationMutation"
import styled from "styled-components"
import { ConversationHeader } from "./ConversationHeader"

export interface ConversationProps {
  conversation: Conversation_conversation
  showDetails: boolean
  setShowDetails: (showDetails: boolean) => void
  relay: RelayPaginationProp
  refetch: RelayRefetchProp["refetch"]
}

export const PAGE_SIZE: number = 15

const Conversation: React.FC<ConversationProps> = props => {
  const { conversation, relay, showDetails, setShowDetails } = props

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

  useEffect(scrollToBottom, [conversation, lastMessageID])

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

  return (
    <Flex flexDirection="column" flexGrow={1}>
      <ConversationHeader
        partnerName={conversation.to.name}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      />
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
              <ConversationMessages
                messages={conversation.messagesConnection}
              />
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
    </Flex>
  )
}

const MessageContainer = styled(Box)`
  flex-grow: 1;
  overflow-y: auto;
`

const NoScrollFlex = styled(Flex)`
  overflow: hidden;
  flex-grow: 1;
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
            }
          }
          ...ConversationMessages_messages
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
