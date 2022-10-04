import { useState } from "react"
import * as React from "react"
import {
  RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import styled from "styled-components"
import compact from "lodash/compact"
import { Box, Flex, Spinner } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { ConversationSnippetFragmentContainer as ConversationSnippet } from "./ConversationSnippet"
import { ConversationListHeader } from "./ConversationListHeader"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import {
  MOBILE_LOGGED_IN_NAV_HEIGHT,
  DESKTOP_NAV_BAR_HEIGHT,
} from "Components/NavBar"
import { ConversationList_me$data } from "__generated__/ConversationList_me.graphql"

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

const ConstrainedHeightContainer = styled(Flex)`
  height: calc(100vh - ${DESKTOP_NAV_BAR_HEIGHT}px);
  width: 100%;
  overflow: hidden;
  flex-direction: column;
  @media ${themeGet("mediaQueries.xs")} {
    height: calc(100vh - ${MOBILE_LOGGED_IN_NAV_HEIGHT}px);
  }
`

export const PAGE_SIZE: number = 15

interface ConversationsProps {
  me: ConversationList_me$data
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
    if (fetchingMore || !relay.hasMore()) return
    setFetchingMore(true)
    relay.loadMore(PAGE_SIZE, error => {
      if (error) console.error(error)
      setFetchingMore(false)
    })
  }
  const { ref } = useIntersectionObserver({
    once: false,
    options: { threshold: 0.2 },
    onIntersection: loadMore,
  })

  return (
    <ConstrainedHeightContainer>
      <ConversationListHeader />
      <ScrollContainer>
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
        <Flex>
          {!!fetchingMore && (
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          )}
          <Box ref={ref as any} height={1} />
        </Flex>
      </ScrollContainer>
    </ConstrainedHeightContainer>
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
