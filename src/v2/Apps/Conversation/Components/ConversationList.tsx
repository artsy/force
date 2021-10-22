import { useState } from "react";
import * as React from "react";
import {
  RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import styled from "styled-components"
import compact from "lodash/compact"
import { themeGet } from "@styled-system/theme-get"
import { Box, Spinner, media } from "@artsy/palette"

import { ConversationSnippetFragmentContainer as ConversationSnippet } from "./ConversationSnippet"
import { ConversationListHeader } from "./ConversationListHeader"

import { ConversationList_me } from "v2/__generated__/ConversationList_me.graphql"

const Container = styled(Box)`
  height: 100%;
  overflow: hidden;
  border-right: 1px solid ${themeGet("colors.black10")};
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
  const conversations = compact(me?.conversationsConnection?.edges)

  const [fetchingMore, setFetchingMore] = useState(false)

  const selectedConversationIndex = conversations
    .map(e => e?.node?.internalID)
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
          {conversations.map(edge => (
            <ConversationSnippet
              isSelected={edge?.node?.internalID === selectedConversationID}
              conversation={edge.node!}
              key={edge.cursor}
              hasDivider={
                conversations.indexOf(edge) !== selectedConversationIndex &&
                conversations.indexOf(edge) !== selectedConversationIndex - 1 &&
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
