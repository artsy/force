import { Box, Spinner, color, media } from "@artsy/palette"
import { ConversationList_me } from "v2/__generated__/ConversationList_me.graphql"
import React, { useState } from "react"
import {
  RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import { ConversationSnippetFragmentContainer as ConversationSnippet } from "./ConversationSnippet"
import styled from "styled-components"
import { ConversationListHeader } from "./ConversationListHeader"

const Container = styled(Box)`
  height: 100%;
  overflow: hidden;
  border-right: 1px solid ${color("black10")};
  ${media.xs`
    border-right: none;
    border-bottom: none;
  `};
`

const ScrollContainer = styled(Box)`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`

export const PAGE_SIZE: number = 15

interface ConversationsProps {
  me: ConversationList_me
  relay: RelayPaginationProp
  selectedConversationID: string
}

const ConversationList: React.FC<ConversationsProps> = props => {
  const { me, selectedConversationID, relay } = props
  // @ts-expect-error STRICT_NULL_CHECK
  const conversations = me.conversationsConnection.edges

  const [fetchingMore, setFetchingMore] = useState(false)

  // @ts-expect-error STRICT_NULL_CHECK
  const selectedConversationIndex = conversations
    // @ts-expect-error STRICT_NULL_CHECK
    .map(e => e.node.internalID)
    .indexOf(selectedConversationID)

  const loadMore = () => {
    if (!relay.hasMore()) return
    setFetchingMore(true)
    relay.loadMore(PAGE_SIZE, error => {
      if (error) console.error(error)
      setFetchingMore(false)
    })
  }

  const handleScroll = (event: React.UIEvent<HTMLElement>): void => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget
    if (scrollHeight - scrollTop === clientHeight) {
      loadMore()
    }
  }

  return (
    <Container width={["100%", "100%", "375px"]}>
      <>
        <ConversationListHeader />
        <ScrollContainer onScroll={handleScroll}>
          {/* @ts-expect-error STRICT_NULL_CHECK */}
          {conversations.map(edge => (
            <ConversationSnippet
              // @ts-expect-error STRICT_NULL_CHECK
              isSelected={edge.node.internalID === selectedConversationID}
              // @ts-expect-error STRICT_NULL_CHECK
              conversation={edge.node}
              // @ts-expect-error STRICT_NULL_CHECK
              key={edge.cursor}
              hasDivider={
                // @ts-expect-error STRICT_NULL_CHECK
                conversations.indexOf(edge) !== selectedConversationIndex &&
                // @ts-expect-error STRICT_NULL_CHECK
                conversations.indexOf(edge) !== selectedConversationIndex - 1 &&
                // @ts-expect-error STRICT_NULL_CHECK
                conversations.indexOf(edge) !== conversations.length - 1
              }
            />
          ))}
          {fetchingMore ? (
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          ) : null}
        </ScrollContainer>
      </>
    </Container>
  )
}

export const ConversationListPaginationContainer = createPaginationContainer(
  ConversationList as React.ComponentType<ConversationsProps>,
  {
    me: graphql`
      fragment ConversationList_me on Me
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 25 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        conversationsConnection(
          first: $first
          last: $last
          before: $before
          after: $after
        ) @connection(key: "ConversationList_conversationsConnection") {
          edges {
            cursor
            node {
              id
              internalID
              lastMessage
              ...ConversationSnippet_conversation
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.me?.conversationsConnection
    },
    getFragmentVariables(prevVars) {
      return {
        ...prevVars,
      }
    },
    getVariables(props, { cursor }, { first }) {
      return {
        first,
        after: cursor,
      }
    },
    query: graphql`
      query ConversationListQuery(
        $first: Int!
        $last: Int
        $after: String
        $before: String
      ) {
        me {
          ...ConversationList_me
            @arguments(
              first: $first
              last: $last
              after: $after
              before: $before
            )
        }
      }
    `,
  }
)
